<script>
  import Switch from "./../../src";

  let checkedValue = true;

  function handleChange(e) {
    const { checked } = e.detail;
    checkedValue = checked;
  }
</script>

<h1>Custom Icons</h1>
Switch with default style
<Switch on:change={handleChange} checked={checkedValue}>
  <div
    style=" display: flex; justify-content: center; align-items: center; height:
    100%; font-size: 15px; color: orange; padding-right: 2px; "
    slot="unCheckedIcon">
    Off
  </div>
  <svg
    viewBox="0 0 10 10"
    height="100%"
    width="100%"
    fill="aqua"
    slot="checkedIcon">
    <circle r={3} cx={5} cy={5} />
  </svg>
</Switch>
<br />
The switch is {checkedValue ? 'on' : 'off'}.
