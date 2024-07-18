import 'src/modules/modals/modals.scss'
import { Hooks, Options, Parameters } from 'src/modules/modals/modals.types'
import { throwEvent } from 'src/scripts/helpers.ts'

class Modals {
  private static readonly events = {
    beforeOpen: 'modalBeforeOpen',
    open: 'modalOpen',
    beforeClose: 'modalBeforeClose',
    close: 'modalClose',
  }
  public parameters: Parameters
  public options: Options
  private readonly hooks: Hooks
  private readonly onOpen: any
  private readonly onClose: any
  private readonly onBeforeOpen: any
  private readonly onBeforeClose: any
  // eslint-disable-next-line no-unused-vars
  private readonly onClick: (event) => void
  // eslint-disable-next-line no-unused-vars
  private readonly onKeyUp: (event) => void

  constructor({ hooks, }) {
    this.options = {
      selectors: {
        modal: '[data-modal]',
        buttonOpen: '[data-modal-open]',
        buttonClose: '[data-modal-close]',
        buttonToggle: '[data-modal-toggle]',
        header: 'header',
      },
      transition: {
        duration: 333,
        style: () => {
          return 'all ' + this.options.transition.duration + 'ms'
        },
      },
    }
    this.hooks = {
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      beforeOpen() {
      },
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      open() {
      },
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      beforeClose() {
      },
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      close() {
      },
      ...hooks,
    }

    this.onOpen = this.hooks.open.bind(this)
    this.onClose = this.hooks.close.bind(this)
    this.onBeforeOpen = this.hooks.beforeOpen.bind(this)
    this.onBeforeClose = this.hooks.beforeClose.bind(this)
    this.onClick = this.handleClick.bind(this)
    this.onKeyUp = this.handleKeyUp.bind(this)

    this.parameters = {
      counter: 0,
      all: [],
      current: false,
    }
  }

  public update(): void {
    const { documentElement: html, } = document
    html.style.setProperty('--modal-transition', this.options.transition.style())
  }

  public activateModal(modal: HTMLElement, trigger?: any): void {
    throwEvent(modal, Modals.events.beforeOpen, { trigger: trigger, })
    this.onBeforeOpen()

    modal.classList.add('active')
    this.parameters.all.push(modal)
    this.parameters.current = modal
    this.parameters.counter++

    this.onOpen()

    throwEvent(modal, Modals.events.open, { trigger: trigger, })
  }

  public deactivateModal(modal: HTMLElement, trigger?: any): void {
    throwEvent(modal, Modals.events.beforeClose, { trigger: trigger, })
    this.onBeforeClose()

    modal.classList.remove('active')

    new Promise((resolve) => {

      setTimeout(() => {
        this.parameters.all = this.parameters.all.slice(0, -1)
        const lastModal = this.parameters.all[this.parameters.all.length - 1]
        this.parameters.current = lastModal ? lastModal : false
        this.parameters.counter--

        resolve()
      }, this.options.transition.duration)

    }).then(() => {
      this.onClose()
      return throwEvent(modal, Modals.events.close, { trigger: trigger, })
    })
  }

  public toggleModal(modal: HTMLElement, trigger?: any): void {
    if (this.parameters.counter > 0) {
      this.deactivateModal(modal, trigger)
    } else {
      this.activateModal(modal, trigger)
    }
  }

  public init(): void {
    this.update()

    const { body, } = document
    const { selectors, } = this.options

    const activeModals = body.querySelectorAll(selectors.modal + '.active')
    if (activeModals.length > 0) {
      activeModals.forEach((modal: HTMLElement) => {
        this.activateModal(modal)
      })
    }

    this.listen()
  }

  private listen(): void {
    document.removeEventListener('click', this.onClick)
    document.removeEventListener('keyup', this.onKeyUp)

    document.addEventListener('click', this.onClick)
    document.addEventListener('keyup', this.onKeyUp)
  }

  private handleClick(event: MouseEvent): void {
    const { body, } = document
    const { selectors, } = this.options

    const { target, }: { target: HTMLElement } = event
    const conditions = {
      buttonOpen: target.closest(selectors.buttonOpen),
      buttonClose: target.closest(selectors.buttonClose),
      buttonToggle: target.closest(selectors.buttonToggle),
    }

    if (conditions.buttonOpen) {
      const { buttonOpen: button, } = conditions
      const attribute = selectors.buttonOpen.slice(1, -1)
      const modal: HTMLElement = body.querySelector('[data-modal=' + button.getAttribute(attribute) + ']')
      if (modal) this.activateModal(modal, button)
    }
    if (conditions.buttonClose) {
      const { buttonClose: button, } = conditions
      let modal: HTMLElement

      if (button.getAttribute(selectors.buttonClose)) {
        const attribute = selectors.buttonClose.slice(1, -1)
        modal = body.querySelector('[data-modal=' + button.getAttribute(attribute) + ']')
      } else {
        modal = button.closest(selectors.modal)
      }

      if (modal) this.deactivateModal(modal, button)
    }
    if (conditions.buttonToggle) {
      const { buttonToggle: button, } = conditions
      const attribute = selectors.buttonToggle.slice(1, -1)
      const modal: HTMLElement = body.querySelector('[data-modal=' + button.getAttribute(attribute) + ']')
      if (modal) this.toggleModal(modal, button)
    }
  }

  private handleKeyUp(event: KeyboardEvent): void {
    const { body, } = document

    if (event.code === 'Escape' &&
      this.parameters.counter > 0 &&
      this.parameters.current instanceof HTMLElement) {

      this.deactivateModal(this.parameters.current, {
        type: 'keyup',
        key: 'Escape',
        element: false,
        boundedWith: body.querySelector('[data-modal-open]'),
      })

    }
  }
}

export default Modals
