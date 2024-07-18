import 'restyle.css'
import 'restyle.css/dist/checkboxes.css'
import 'src/styles/main.scss'
import 'src/components'
import { modalsInstance } from 'src/scripts/modals-instance'
import { globalScrollController } from 'src/scripts/global-scroll-controller'

document.addEventListener('DOMContentLoaded', () => {
  modalsInstance.init()
  globalScrollController.listen()
})
