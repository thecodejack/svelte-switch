<script>
  import Switch from "./../../src";

  let checkedValue = true;

  function handleChange(e) {
    const { checked } = e.detail;
    checkedValue = checked;
  }
</script>

<h1>Disabled Switch</h1>
<Switch disabled on:change={handleChange} checked={checkedValue} />
<br />
The switch is {checkedValue ? 'on' : 'off'}.
