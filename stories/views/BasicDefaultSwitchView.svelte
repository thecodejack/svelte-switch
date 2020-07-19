<script>
  import Switch from "./../../src";

  let checkedValue = true;

  function handleChange(e) {
    const { checked } = e.detail;
    checkedValue = checked;
  }
</script>

<h1>Simple usage</h1>
Switch with default style
<Switch on:change={handleChange} checked={checkedValue} />
<br />
The switch is {checkedValue ? 'on' : 'off'}.
