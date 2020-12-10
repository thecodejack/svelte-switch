<script>
  import { onMount, onDestroy, createEventDispatcher } from "svelte";

  import defaultCheckedIcon from "./CheckedIcon.svelte";
  import defaultUncheckedIcon from "./UncheckedIcon.svelte";
  import getBackgroundColor from "./../utils";

  //props
  export let checked;
  export let disabled = false;
  export let offColor = "#888";
  export let onColor = "#080";
  export let offHandleColor = "#fff";
  export let onHandleColor = "#fff";
  export let handleDiameter;
  export let unCheckedIcon = defaultUncheckedIcon;
  export let checkedIcon = defaultCheckedIcon;
  export let boxShadow = null;
  export let activeBoxShadow = "0 0 2px 3px #3bf";
  export let height = 28;
  export let width = 56;
  export let id = "";
  export let containerClass = "";

  const dispatch = createEventDispatcher();

  //state
  let state = {
    handleDiameter: 0,
    checkedPos: 0,
    uncheckedPos: 0,
    pos: 0,
    lastDragAt: 0,
    lastKeyUpAt: 0,
    startX: null,
    hasOutline: null,
    dragStartingTime: null,
    checkedStateFromDragging: false
  };

  let inputRef = null;

  state.handleDiameter = handleDiameter || height - 2;
  state.checkedPos = Math.max(
    width - height,
    width - (height + state.handleDiameter) / 2
  );
  state.uncheckedPos = Math.max(0, (height - state.handleDiameter) / 2);

  state.pos = checked ? state.checkedPos : state.uncheckedPos;
  state.lastDragAt = 0;
  state.lastKeyUpAt = 0;

  //event handlers

  function onDragStart(clientX) {
    inputRef && inputRef.focus && inputRef.focus();
    state.startX = clientX;
    state.hasOutline = true;
    state.dragStartingTime = Date.now();
  }

  function onDrag(clientX) {
    let { startX, isDragging, pos } = state;
    const startPos = checked ? state.checkedPos : state.uncheckedPos;
    const mousePos = startPos + clientX - startX;
    // We need this check to fix a windows glitch where onDrag is triggered onMouseDown in some cases
    if (!isDragging && clientX !== startX) {
      state.isDragging = true;
    }
    const newPos = Math.min(
      state.checkedPos,
      Math.max(state.uncheckedPos, mousePos)
    );
    // Prevent unnecessary rerenders
    if (newPos !== pos) {
      state.pos = newPos;
    }
  }

  function onDragStop(event) {
    let { pos, isDragging, dragStartingTime } = state;
    const halfwayCheckpoint = (state.checkedPos + state.uncheckedPos) / 2;

    // Simulate clicking the handle
    const timeSinceStart = Date.now() - dragStartingTime;
    if (!isDragging || timeSinceStart < 250) {
      onChangeTrigger(event);

      // Handle dragging from checked position
    } else if (checked) {
      if (pos > halfwayCheckpoint) {
        state.pos = state.checkedPos;
      } else {
        onChangeTrigger(event);
      }
      // Handle dragging from unchecked position
    } else if (pos < halfwayCheckpoint) {
      state.pos = state.uncheckedPos;
    } else {
      onChangeTrigger(event);
    }

    state.isDragging = false;
    state.hasOutline = false;
    state.lastDragAt = Date.now();
  }

  function onMouseDown(event) {
    event.preventDefault();
    // Ignore right click and scroll
    if (typeof event.button === "number" && event.button !== 0) {
      return;
    }

    onDragStart(event.clientX);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
  }

  function onMouseMove(event) {
    event.preventDefault();
    onDrag(event.clientX);
  }

  function onMouseUp(event) {
    onDragStop(event);
    window.removeEventListener("mousemove", onMouseMove);
    window.removeEventListener("mouseup", onMouseUp);
  }

  function onTouchStart(event) {
    state.checkedStateFromDragging = null;
    onDragStart(event.touches[0].clientX);
  }

  function onTouchMove(event) {
    onDrag(event.touches[0].clientX);
  }

  function onTouchEnd(event) {
    event.preventDefault();
    onDragStop(event);
  }

  function onInputChange(event) {
    // This condition is unfortunately needed in some browsers where the input's change event might get triggered
    // right after the dragstop event is triggered (occurs when dropping over a label element)
    if (Date.now() - state.lastDragAt > 50) {
      onChangeTrigger(event);
      // Prevent clicking label, but not key activation from setting outline to true - yes, this is absurd
      if (Date.now() - state.lastKeyUpAt > 50) {
        state.hasOutline = false;
      }
    }
  }

  function onKeyUp() {
    state.lastKeyUpAt = Date.now();
  }

  function setHasOutline() {
    state.hasOutline = true;
  }

  function unsetHasOutline() {
    state.hasOutline = false;
  }

  function onClick(event) {
    event.preventDefault();
    inputRef.focus();
    onChangeTrigger(event);
    state.hasOutline = false;
  }

  function onChangeTrigger(event) {
    checked = !checked;
    dispatch("change", {
      checked: checked,
      event,
      id
    });
  }

  $: if (!state.isDragging) {
    state.pos = checked ? state.checkedPos : state.uncheckedPos;
  }

  //Hack since components should always to starting with Capital letter and props are camelCasing
  let CIcon = checkedIcon;
  let UIcon = unCheckedIcon;

  //styles

  let rootStyle = "";

  $: rootStyle = `
    position: relative;
    display: inline-block;
    text-align: left;
    opacity: ${disabled ? 0.5 : 1};
    direction: ltr;
    border-radius: ${height / 2}px;
    transition: opacity 0.25s;
    touch-action: none;
    webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    user-select: none;
  `;

  let backgroundStyle = "";
  $: backgroundStyle = `
    height: ${height}px;
    width: ${width}px;
    margin: ${Math.max(0, (state.handleDiameter - height) / 2)}px;
    position: relative;
    background: ${getBackgroundColor(
      state.pos,
      state.checkedPos,
      state.uncheckedPos,
      offColor,
      onColor
    )};
    border-radius: ${height / 2}px;
    cursor: ${disabled ? "default" : "pointer"};
    transition: ${state.isDragging ? null : "background 0.25s"};
  `;

  let checkedIconStyle = "";
  $: checkedIconStyle = `
    height: ${height}px;
    width: ${Math.min(
      height * 1.5,
      width - (state.handleDiameter + height) / 2 + 1
    )}px;
    position: relative;
    opacity:
      ${(state.pos - state.uncheckedPos) /
        (state.checkedPos - state.uncheckedPos)};
    pointer-events: none;
    transition: ${state.isDragging ? null : "opacity 0.25s"};
  `;

  let uncheckedIconStyle = "";
  $: uncheckedIconStyle = `
    height: ${height}px;
    width: ${Math.min(
      height * 1.5,
      width - (state.handleDiameter + height) / 2 + 1
    )}px;
    position: absolute;
    opacity:
      ${1 -
        (state.pos - state.uncheckedPos) /
          (state.checkedPos - state.uncheckedPos)};
    right: 0px;
    top: 0px;
    pointer-events: none;
    transition: ${state.isDragging ? null : "opacity 0.25s"};
  `;

  let handleStyle = "";
  $: handleStyle = `
    height: ${state.handleDiameter}px;
    width: ${state.handleDiameter}px;
    background: ${getBackgroundColor(
      state.pos,
      state.checkedPos,
      state.uncheckedPos,
      offHandleColor,
      onHandleColor
    )};
    display: inline-block;
    cursor: ${disabled ? "default" : "pointer"};
    border-radius: 50%;
    position: absolute;
    transform: translateX(${state.pos}px);
    top: ${Math.max(0, (height - state.handleDiameter) / 2)}px;
    outline: 0;
    box-shadow: ${state.hasOutline ? activeBoxShadow : boxShadow};
    border: 0;
    transition: ${
      state.isDragging
        ? null
        : "background-color 0.25s, transform 0.25s, box-shadow 0.15s"
    };
  `;

  let inputStyle = "";
  $: inputStyle = `
    border: 0px;
    clip: rect(0 0 0 0);
    height: 1px;
    margin: -1px;
    overflow: hidden;
    padding: 0px;
    position: absolute;
    width: 1px;
  `;
</script>

<style>

</style>

<div class={containerClass} style={rootStyle}>
  <div
    class="react-switch-bg"
    style={backgroundStyle}
    on:click={disabled ? null : onClick}
    onMouseDown={e => e.preventDefault()}>
    <div style={checkedIconStyle}>
      <slot name="checkedIcon">
        <CIcon />
      </slot>
    </div>
    <div style={uncheckedIconStyle}>
      <slot name="unCheckedIcon">
        <UIcon />
      </slot>
    </div>
  </div>
  <div
    class="react-switch-handle"
    style={handleStyle}
    on:click={e => e.preventDefault()}
    on:mousedown={disabled ? null : onMouseDown}
    on:touchstart={disabled ? null : onTouchStart}
    on:touchmove={disabled ? null : onTouchMove}
    on:touchend={disabled ? null : onTouchEnd}
    on:touchcancel={disabled ? null : unsetHasOutline} />
  <input
    type="checkbox"
    role="switch"
    {disabled}
    style={inputStyle}
    bind:this={inputRef}
    on:focus={setHasOutline}
    on:blur={unsetHasOutline}
    on:keyup={onKeyUp}
    on:change={onInputChange} />
</div>
