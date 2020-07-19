# svelte-switch

[![NPM](https://img.shields.io/npm/v/svelte-switch.svg)](https://www.npmjs.com/package/svelte-switch)
[![npm bundle size (minified + gzip)](https://img.shields.io/bundlephobia/minzip/svelte-switch.svg)](https://www.npmjs.com/package/svelte-switch)

SvelteJS component for switch or toggle a boolean. User would be able to drag or click for toggling.

## Demo

[Click here for Storybook link](https://svelte-switch.netlify.app/)

[REPL Link](https://svelte.dev/repl/72a37aee9ae24705b7d874def7e1f270)

## Installation

```
npm install svelte-switch

or

yarn add svelte-switch
```

## Usage

```
<script>
  import Switch from "svelte-switch";

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

```

## API

### Props

| Prop Name       | Description    | Default Value      |
| --------------- | -------------- | ------------------ |
| checked         | Required field | undefined          |
| disabled        |                | false              |
| offColor        |                | "#888"             |
| onColor         |                | "#080"             |
| offHandleColor  |                | "#fff"             |
| onHandleColor   |                | "#fff"             |
| handleDiameter  |                | 0                  |
| boxShadow       |                | null               |
| activeBoxShadow |                | "0 0 2px 3px #3bf" |
| height          |                | 28                 |
| width           |                | 56                 |
| id              |                | ''                 |
| containerClass  |                | ''                 |

### Slots

| Slot Name     | Description | Default Set? |
| ------------- | ----------- | ------------ |
| checkedIcon   |             | Yes          |
| unCheckedIcon |             | Yes          |

### Events

| Event Name | Description | `event.detail` info       |
| ---------- | ----------- | ------------------------- |
| change     |             | `{event: event, checked}` |

### Examples

[Click here](https://github.com/thecodejack/svelte-switch/tree/master/stories/views) to view stories implementation

## Credits

Component is reimplementation [react-switch](https://github.com/markusenglund/react-switch). Complete credit goes to author and contributors of [react-switch](https://github.com/markusenglund/react-switch).

## License

MIT
