<script>
  import Switch from "./../../src";

  let checkedValue = true;

  function handleChange(e) {
    const { checked } = e.detail;
    checkedValue = checked;
  }
</script>

<h1>Smaller Handle</h1>
Thick switch with smaller handle radius
<Switch
  on:change={handleChange}
  checked={checkedValue}
  handleDiameter={28}
  offColor="#08f"
  onColor="#0ff"
  offHandleColor="#0ff"
  onHandleColor="#08f"
  height={40}
  width={70}
  className="react-switch"
  id="small-radius-switch" />
<br />
The switch is {checkedValue ? 'on' : 'off'}.
