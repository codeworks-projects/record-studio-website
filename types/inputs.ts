/**
 * NOTE: in order to include types also within component's template tags, input types must be exported and manually included within the components.
 */

export interface SelectOption {
  value?: string
  name: string
}

export enum InputAspects {
  default,
  fill,
}

export enum ButtonTypes {
  primary = 'primary',
  secondary = 'secondary',
}

export enum InputColorscheme {
  primary,
  secondary,
}
