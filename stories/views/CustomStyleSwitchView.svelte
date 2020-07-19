<script>
  import Switch from "./../../src";

  let checkedValue = true;

  function handleChange(e) {
    const { checked } = e.detail;
    checkedValue = checked;
  }
</script>

<h1>Custom styling</h1>
Switch with style inspired by Material Design
<Switch
  checked={checkedValue}
  on:change={handleChange}
  onColor="#86d3ff"
  onHandleColor="#2693e6"
  handleDiameter={30}
  unCheckedIcon={false}
  boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
  activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
  height={20}
  width={48}
  containerClass="react-switch"
  id="material-switch">
  <span slot="checkedIcon" />
  <span slot="unCheckedIcon" />
</Switch>
<br />
The switch is {checkedValue ? 'on' : 'off'}.
<br />
<br />
Icons are removed by passing empty named slots
