export interface elementData {
  details: HTMLDetailsElement,
  summary: HTMLElement,
  button: HTMLElement,
  content: HTMLElement,
  parameters: {
    isOpen: boolean,
    isClosing: boolean,
    isOpening: boolean,
    animation?: any
  }
}

export interface selectors {
  details: string,
  summary: string,
  button: string,
  content: string,
  scrollbars: {
    vertical: string,
  }
}

export interface options {
  preferButtonIfExist: boolean,
}
