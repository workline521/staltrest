import { elementData, selectors, options } from 'src/modules/details/details.types'
import './details.scss'

export class Details {
  private static readonly optionsDefault: options = { preferButtonIfExist: true, }
  public elements: elementData[]
  public selectors: selectors
  public options: options
  private readonly easing: string
  private readonly durationMin: number
  private readonly durationMax: number
  private readonly durationPerHeight: number
  // eslint-disable-next-line no-unused-vars
  private readonly onClick: (event) => void

  constructor(optionsCustom?: options) {
    this.selectors = {
      details: '[data-details=details]',
      summary: '[data-details=summary]',
      button: '[data-details=button]',
      content: '[data-details=body]',
      scrollbars: { vertical: 'has-vertical-scrollbar', },
    }
    this.elements = []
    this.durationMin = 250
    this.durationMax = 500
    this.durationPerHeight = 0.33
    this.easing = 'linear'
    this.onClick = this.handleClick.bind(this)

    this.options = {
      ...Details.optionsDefault,
      ...optionsCustom,
    }
  }

  public init(): void {
    this.updateElements()
    this.listen()
  }

  public updateElements(): void {
    const { body, } = document

    const details: HTMLElement[] = Array.from(body.querySelectorAll(this.selectors.details))
    if (details.length > 0) this.elements = this.updateElementsData(details)
  }

  private listen(): void {
    document.removeEventListener('click', this.onClick)
    document.addEventListener('click', this.onClick)
  }

  private shrink(data: elementData): void {
    data.parameters.isClosing = true
    data.details.classList.add('is-closing')

    const startHeight: string = data.details.offsetHeight + 'px'
    const endHeight: string = data.summary.offsetHeight + 'px'

    if (data.parameters.animation) data.parameters.animation.cancel()

    data.parameters.animation = data.details.animate({
      height: [
        startHeight,
        endHeight,
      ],
    }, {
      duration: this.calculateDuration(data.details.offsetHeight, data.summary.offsetHeight),
      easing: this.easing,
    })

    data.parameters.animation.onfinish = () => this.onAnimationFinish(data, false)
    data.parameters.animation.oncancel = () => data.parameters.isClosing = false
  }

  private open(data: elementData): void {
    data.details.style.height = data.details.offsetHeight + 'px'
    data.details.open = true
    window.requestAnimationFrame(() => this.expand(data))
  }

  private calculateDuration(startHeight: number, endHeight: number): number {
    let duration = this.durationMin

    const valueAddedDuration: number = Math.abs(endHeight - startHeight)
    duration = duration + (valueAddedDuration * this.durationPerHeight)

    if (duration > this.durationMax) duration = this.durationMax

    duration = Math.round(duration)

    return duration
  }

  private expand(data: elementData): void {
    data.parameters.isOpening = true
    data.details.classList.add('is-opening')

    const startHeight: string = data.details.offsetHeight + 'px'
    const endHeight: string = data.summary.offsetHeight + data.content.offsetHeight + 'px'

    if (data.parameters.animation) data.parameters.animation.cancel()

    data.parameters.animation = data.details.animate({
      height: [
        startHeight,
        endHeight,
      ],
    }, {
      duration: this.calculateDuration(data.details.offsetHeight, data.summary.offsetHeight + data.content.offsetHeight),
      easing: this.easing,
    })

    data.parameters.animation.onfinish = () => this.onAnimationFinish(data, true)
    data.parameters.animation.oncancel = () => data.parameters.isOpening = false
  }

  private onAnimationFinish(data: elementData, open: boolean): void {
    data.details.open = open
    data.parameters.isOpen = open
    data.parameters.animation = null
    data.parameters.isClosing = false
    data.parameters.isOpening = false
    data.details.style.height = data.details.style.overflow = ''
    this.setupScrollbarStyles(data.details)
    this.updateDetailsStyles(data.details, open)
    data.details.classList.remove('is-closing')
    data.details.classList.remove('is-opening')
  }

  private hasVerticalScrollbar(element: HTMLElement): boolean {
    return element.scrollHeight > element.clientHeight
  }

  private setupScrollbarStyles(element: HTMLElement): void {
    const hasVerticalScrollbar: boolean = this.hasVerticalScrollbar(element)

    if (hasVerticalScrollbar === false) {
      element.classList.remove(this.selectors.scrollbars.vertical)
    } else {
      element.classList.add(this.selectors.scrollbars.vertical)
    }
  }

  private updateDetailsStyles(element: HTMLElement, isOpen: boolean): void {
    if (isOpen) {
      element.classList.add('open')
    } else {
      element.classList.remove('open')
    }
  }

  private handleClick(event: MouseEvent): void {
    const target = event.target as HTMLElement

    const condition = target.closest(this.selectors.summary) || target.closest(this.selectors.button)

    if (condition && !target.closest('a[href]')) {
      event.preventDefault()

      const summary = target.closest(this.selectors.summary)
      const data: elementData = this.elements.find((data: elementData) => {
        return data.summary === summary ? data : false
      })

      data.details.style.overflow = 'hidden'
      if (data.parameters.isClosing || !data.parameters.isOpen) {
        this.open(data)
      } else if (data.parameters.isOpening || data.parameters.isOpen) {
        this.shrink(data)
      }
    }
  }

  private updateElementsData(elements: HTMLElement[]): elementData[] {
    return elements.map((element: HTMLDetailsElement) => {
      return {
        details: element,
        summary: element.querySelector(this.selectors.summary),
        button: element.querySelector(this.selectors.button),
        content: element.querySelector(this.selectors.content),
        parameters: {
          isOpen: element.hasAttribute('open'),
          isClosing: false,
          isOpening: false,
        },
      }
    })
  }
}
