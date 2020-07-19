# svelte-switch

[![NPM](https://img.shields.io/npm/v/svelte-switch.svg)](https://www.npmjs.com/package/svelte-switch)
[![npm bundle size (minified + gzip)](https://img.shields.io/bundlephobia/minzip/svelte-switch.svg)](https://www.npmjs.com/package/svelte-switch)

SvelteJS component for switch or toggle a boolean.The component is Svelte implementation of [react-switch](https://github.com/markusenglund/react-switch).

## Demo

[Click here for Storybook link](https://svelte-switch.netlify.app/)

## Installation

```
npm install svelte-switch

or

yarn add svelte-switch
```

## Usage

```
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

```

## API

### Props

| Prop Name             | Description                                                                              | Default Value |
| --------------------- | ---------------------------------------------------------------------------------------- | ------------- |
| accept                | Set accepted file types. See https://github.com/okonet/attr-accept for more information. | undefined     |
| disabled              |                                                                                          | false         |
| maxSize               |                                                                                          | Infinity      |
| minSize               |                                                                                          | 0             |
| multiple              | if true, multiple files can be selected at once                                          | true          |
| preventDropOnDocument | 1231                                                                                     | true          |
| noClick               | disable click events                                                                     | false         |
| noKeyboard            | disable keyboard events                                                                  | false         |
| noDrag                | disable drag events                                                                      | false         |
| containerClasses      | custom container classes                                                                 | ""            |
| containerStyles       | custom inline container styles                                                           | ""            |
| disableDefaultStyles  | don't apply default styles to container                                                  | false         |

### Events

| Event Name | Description | `event.detail` info       |
| ---------- | ----------- | ------------------------- |
| change     |             | `{event: event, checked}` |

### Examples

[Click here](https://github.com/thecodejack/svelte-switch/tree/master/stories/views) to view stories implementation

## Credits

Component is reimplementation [react-switch](https://github.com/markusenglund/react-switch). Complete credit goes to author and contributors of [react-dropzone](https://github.com/markusenglund/react-switch).

## License

MIT
