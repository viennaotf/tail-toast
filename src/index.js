import TailToast from './TailToast.vue'
import { spawn, removeElement } from './utils.js'

let installed = false

const containerClasses = [
  'z-40', 'fixed', 'inset-0', 'flex', 'flex-col-reverse', 'items-end', 'justify-center',
  'px-4', 'py-6', 'pointer-events-none', 'sm:p-6', 'sm:items-end', 'sm:justify-end'
]

export default {
  install(Vue) {
    if (installed) return
    const CONSTRUCTOR = Vue.extend(TailToast)
    const CACHE = {}

    function toast(msg, options = {}) {
      options.message = msg
      let toast = CACHE[options.id] || (CACHE[options.id] = new CONSTRUCTOR)
      if (!toast.$el) {
        let vm = toast.$mount()
        document.querySelector(options.parent || 'body').appendChild(vm.$el)
      }
      toast.queue.push(options)
    }
    Vue.toast = Vue.prototype.$toast = toast
    installed = true
  }
}

export { TailToast, spawn, removeElement, containerClasses }
