export function modalsAside(modalsInstance, selector: string) {
  const { body, } = document
  const overlay = body.querySelector('[data-modal-overlay]')

  document.addEventListener('modalOpen', (event: CustomEvent) => {
    const target = event.target as HTMLElement

    if (target.matches(selector) && modalsInstance.parameters.current === target) {
      overlay.classList.add('active')
    }
  })

  document.addEventListener('modalClose', (event: CustomEvent) => {
    const target = event.target as HTMLElement

    if (target.matches(selector) && modalsInstance.parameters.counter === 0) {
      overlay.classList.remove('active')
    }
  })

  document.addEventListener('click', (event: MouseEvent) => {
    const target = event.target as HTMLElement
    const modalCurrent = modalsInstance.parameters.current

    if (target.closest('[data-modal-overlay]') && modalCurrent) {
      const isElement = modalCurrent instanceof HTMLElement
      if (isElement && modalCurrent.matches(selector)) modalsInstance.deactivateModal(modalCurrent)
    }
  })
}
