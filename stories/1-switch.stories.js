import { action } from "@storybook/addon-actions";

import BasicDefaultSwitchView from "./views/BasicDefaultSwitchView.svelte";
import DisabledSwitchView from "./views/DisabledSwitchView.svelte";
import CustomStyleSwitchView from "./views/CustomStyleSwitchView.svelte";
import SmallerHandleSwitchView from "./views/SmallerHandleSwitchView.svelte";
import CustomIconsSwitchView from "./views/CustomIconsSwitchView.svelte";

import intro from "./../README.md";

export default {
  title: "Examples",
  parameters: {
    notes: { Introduction: intro },
  },
};

export const BasicDefaultSwitch = () => ({
  Component: BasicDefaultSwitchView,
  props: {},
});

export const DisabledSwitch = () => ({
  Component: DisabledSwitchView,
  props: {},
});

export const CustomStyleSwitch = () => ({
  Component: CustomStyleSwitchView,
  props: {},
});

export const SmallerHandleSwitch = () => ({
  Component: SmallerHandleSwitchView,
  props: {},
});

export const CustomIconsSwitch = () => ({
  Component: CustomIconsSwitchView,
  props: {},
});
