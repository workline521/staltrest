import Modals from 'src/modules/modals/modals'
import { globalScrollController } from 'src/scripts/global-scroll-controller'

export const modalsInstance = new Modals({
  hooks: {
    beforeOpen() {
      globalScrollController.update()
    },
    open() {
      globalScrollController.lock()
      globalScrollController.update()
    },
    beforeClose() {
      globalScrollController.update()
    },
    close() {
      if (this.parameters.counter === 0) globalScrollController.unlock()
      globalScrollController.update()
    },
  },
})
