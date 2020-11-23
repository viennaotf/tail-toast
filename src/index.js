import TailToast from './TailToast.vue'
import { spawn, removeElement } from './utils.js'

// import options from './options'

let installed = false, options = {}

const containerClasses = [
  'z-40', 'fixed', 'inset-0', 'flex', 'flex-col-reverse', 'items-end', 'justify-center',
  'px-4', 'py-6', 'pointer-events-none', 'sm:p-6', 'sm:items-end', 'sm:justify-end'
]

export default {
  install(Vue) {
    if (installed) return

    const toasts = document.createElement('div')
    containerClasses.forEach(c => toasts.classList.add(c))
    if (options.defaults && options.defaults.containerClasses) {
      toasts.classList.add(options.defaults.containerClasses)
    }
    toasts.setAttribute('id', 'toasts')
    document.body.appendChild(toasts)

    const ToastProgrammatic = {
      show (props) {
        if (typeof props === 'string') props = { message: props }
        return spawn('toasts', props, TailToast, Vue, options)
      },
      success (props) {
        return spawn('toasts', {type: 'success', message: props}, TailToast, Vue, options)
      },
      info (props) {
        return spawn('toasts', {type: 'info', message: props}, TailToast, Vue, options)
      },
      danger (props) {
        return spawn('toasts', {type: 'danger', message: props}, TailToast, Vue, options)
      },
      warning (props) {
        return spawn('toasts', {type: 'warning', message: props}, TailToast, Vue, options)
      },
    }
    Vue.toast = Vue.prototype.$toast = ToastProgrammatic
    installed = true
  }
}

export { TailToast, spawn, removeElement, containerClasses }
