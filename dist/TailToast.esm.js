import { IconCheck, IconBang, IconTimes } from 'tv-icon';

/*
 * utils.js
 * Copyright (C) 2019 kevin olson <acidjazz@gmail.com>
 *
 * Distributed under terms of the APACHE license.
 */
function removeElement(el) {
  if (typeof el.remove !== 'undefined') el.remove();else el.parentNode.removeChild(el);
} // add the component w/ the specified props

function spawn(id, propsData, Component, Vue, options) {
  if (propsData && options && options.defaults) {
    propsData.defaults = options.defaults;
  }

  const Instance = Vue.extend(Component);
  return new Instance({
    el: document.getElementById(id).appendChild(document.createElement('div')),
    propsData
  });
}

//
var script = {
  components: {
    IconCheck,
    IconBang,
    IconTimes
  },
  props: {
    title: {
      type: [Boolean, String],
      required: false,
      default: false
    },
    message: {
      type: String,
      required: false,
      default: 'Please specify a <b>message</b>'
    },
    type: {
      type: String,
      required: false,
      validate: type => {
        return ['success', 'info', 'danger', 'warning'].includes(type);
      },
      default: ''
    },
    progress: {
      type: Boolean,
      required: false,
      default: true
    },
    icon: {
      type: [Boolean, String],
      required: false,
      default: false
    },
    iconPrimary: {
      type: String,
      required: false,
      default: ''
    },
    iconSecondary: {
      type: String,
      required: false,
      default: ''
    },
    timeout: {
      type: [Boolean, Number],
      required: false,
      default: 2
    },
    primary: {
      type: [Boolean, Object],
      required: false,
      default: false
    },
    secondary: {
      type: [Boolean, Object],
      required: false,
      default: false
    },
    classToast: {
      type: String,
      required: false,
      default: 'bg-white'
    },
    classTitle: {
      type: String,
      required: false,
      default: 'text-gray-900'
    },
    classMessage: {
      type: String,
      required: false,
      default: 'text-gray-500'
    },
    classClose: {
      type: String,
      required: false,
      default: 'text-gray-400'
    },
    classTimeout: {
      type: String,
      required: false,
      default: 'bg-gray-200'
    },
    defaults: {
      type: Object,
      required: false,
      default: () => ({})
    }
  },

  data() {
    return {
      active: false,
      interval: false,
      timeLeft: false,
      speed: 100
    };
  },

  computed: {
    classToastAll() {
      if (this.defaults && this.defaults.classToast) {
        return [this.classToast, this.defaults.classToast];
      }

      if (this.classToast) return [this.classToast];
      return [];
    },

    timeLeftPercent() {
      return Math.round(this.timeLeft * 100 / (this.timeout * 1000) * 100 / 100);
    },

    progressStyle() {
      return `width: ${this.timeLeftPercent}%; transition: width 0.1s linear;`;
    }

  },

  mounted() {
    this.active = true;

    if (this.timeout > 0) {
      this.timeLeft = this.timeout * 1000;
      this.interval = setInterval(() => this.updateTime(), this.speed);
    }
  },

  methods: {
    updateTime() {
      this.timeLeft -= this.speed;
      if (this.timeLeft === 0) this.destroy();
    },

    destroy() {
      this.active = false;
      clearInterval(this.interval);
      setTimeout(() => {
        this.$destroy();
        removeElement(this.$el);
      }, 1000);
    },

    primaryAction() {
      this.primary.action();
      this.destroy();
    },

    secondaryAction() {
      this.secondary.action();
      this.destroy();
    }

  }
};

function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier /* server only */, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
    if (typeof shadowMode !== 'boolean') {
        createInjectorSSR = createInjector;
        createInjector = shadowMode;
        shadowMode = false;
    }
    // Vue.extend constructor export interop.
    const options = typeof script === 'function' ? script.options : script;
    // render functions
    if (template && template.render) {
        options.render = template.render;
        options.staticRenderFns = template.staticRenderFns;
        options._compiled = true;
        // functional template
        if (isFunctionalTemplate) {
            options.functional = true;
        }
    }
    // scopedId
    if (scopeId) {
        options._scopeId = scopeId;
    }
    let hook;
    if (moduleIdentifier) {
        // server build
        hook = function (context) {
            // 2.3 injection
            context =
                context || // cached call
                    (this.$vnode && this.$vnode.ssrContext) || // stateful
                    (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext); // functional
            // 2.2 with runInNewContext: true
            if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
                context = __VUE_SSR_CONTEXT__;
            }
            // inject component styles
            if (style) {
                style.call(this, createInjectorSSR(context));
            }
            // register component module identifier for async chunk inference
            if (context && context._registeredComponents) {
                context._registeredComponents.add(moduleIdentifier);
            }
        };
        // used by ssr in case component is cached and beforeCreate
        // never gets called
        options._ssrRegister = hook;
    }
    else if (style) {
        hook = shadowMode
            ? function (context) {
                style.call(this, createInjectorShadow(context, this.$root.$options.shadowRoot));
            }
            : function (context) {
                style.call(this, createInjector(context));
            };
    }
    if (hook) {
        if (options.functional) {
            // register for functional component in vue file
            const originalRender = options.render;
            options.render = function renderWithStyleInjection(h, context) {
                hook.call(context);
                return originalRender(h, context);
            };
        }
        else {
            // inject component registration as beforeCreate hook
            const existing = options.beforeCreate;
            options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
        }
    }
    return script;
}

/* script */
const __vue_script__ = script;
/* template */

var __vue_render__ = function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('transition', {
    attrs: {
      "enter-active-class": "transform ease-out duration-300 transition",
      "enter-class": "translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2",
      "enter-to-class": "translate-y-0 opacity-100 sm:translate-x-0",
      "leave-active-class": "transform ease-in duration-100",
      "leave-class": "opacity-100 sm:translate-x-0 translate-y-0",
      "leave-to-class": "opacity-0 sm:translate-x-1 translate-y-1 sm:translate-y-0"
    }
  }, [_vm.active && _vm.primary === false ? _c('div', {
    staticClass: "max-w-sm w-full shadow-lg rounded-lg pointer-events-auto relative mb-4 overflow-hidden",
    class: _vm.classToastAll
  }, [_vm.progress && _vm.timeout ? _c('div', {
    staticClass: "absolute left-0 bottom-0 right-0 h-1 rounded",
    class: _vm.classTimeout,
    style: _vm.progressStyle
  }) : _vm._e(), _vm._v(" "), _c('div', {
    staticClass: "rounded-lg shadow-xs overflow-hidden z-100",
    class: _vm.classToastAll
  }, [_c('div', {
    staticClass: "p-4"
  }, [_c('div', {
    staticClass: "flex items-start"
  }, [_c('div', {
    staticClass: "flex-shrink-0"
  }, [_vm.type === 'success' ? _c('div', {
    staticClass: "border-2 border-green-200 rounded-full p-1"
  }, [_c('IconCheck', {
    staticClass: "w-3 h-3",
    attrs: {
      "primary": "text-green-400",
      "secondary": "text-green-300"
    }
  })], 1) : _vm._e(), _vm._v(" "), _vm.type === 'info' ? _c('div', {
    staticClass: "border-2 border-blue-200 rounded-full p-1"
  }, [_c('IconInfo', {
    staticClass: "w-3 h-3",
    attrs: {
      "primary": "text-blue-400",
      "secondary": "text-blue-300"
    }
  })], 1) : _vm._e(), _vm._v(" "), _vm.type === 'warning' ? _c('div', {
    staticClass: "border-2 border-yellow-200 rounded-full p-1"
  }, [_c('IconBang', {
    staticClass: "w-3 h-3",
    attrs: {
      "primary": "text-yellow-400",
      "secondary": "text-yellow-300"
    }
  })], 1) : _vm._e(), _vm._v(" "), _vm.type === 'danger' ? _c('div', {
    staticClass: "border-2 border-red-200 rounded-full p-1"
  }, [_c('IconBang', {
    staticClass: "w-3 h-3",
    attrs: {
      "primary": "text-red-400",
      "secondary": "text-red-300"
    }
  })], 1) : _vm._e(), _vm._v(" "), _vm.icon !== false ? _c('div', [_c(_vm.icon, {
    tag: "component",
    staticClass: "w-6 h-6",
    attrs: {
      "primary": _vm.iconPrimary,
      "secondary": _vm.iconSecondary
    }
  })], 1) : _vm._e()]), _vm._v(" "), _c('div', {
    staticClass: "ml-3 w-0 flex-1 pt-0.5"
  }, [_vm.title ? _c('p', {
    staticClass: "text-sm leading-5 font-medium",
    class: _vm.classTitle
  }, [_vm._v(_vm._s(_vm.title))]) : _vm._e(), _vm._v(" "), _c('p', {
    staticClass: "text-sm leading-5",
    class: [_vm.classMessage, {
      'mt-1': _vm.title
    }],
    domProps: {
      "innerHTML": _vm._s(_vm.message)
    }
  })]), _vm._v(" "), _c('div', {
    staticClass: "ml-4 flex-shrink-0 flex"
  }, [_c('button', {
    staticClass: "inline-flex text-gray-400 transition ease-in-out duration-150 focus:outline-none focus:text-gray-500",
    on: {
      "click": _vm.destroy
    }
  }, [_c('IconTimes', {
    staticClass: "h-4 w-4",
    attrs: {
      "primary": _vm.classClose,
      "secondary": _vm.classClose
    }
  })], 1)])])])])]) : _vm._e(), _vm._v(" "), _vm.active && _vm.primary !== false && _vm.secondary !== false ? _c('div', {
    staticClass: "max-w-md w-full shadow-lg rounded-lg pointer-events-auto mb-4",
    class: _vm.classToastAll
  }, [_vm.progress && _vm.timeout ? _c('div', {
    staticClass: "absolute left-0 bottom-0 right-0 h-1 rounded bg-gray-100",
    style: _vm.progressStyle
  }) : _vm._e(), _vm._v(" "), _c('div', {
    staticClass: "flex rounded-lg shadow-xs"
  }, [_c('div', {
    staticClass: "w-0 flex-1 flex items-center p-4"
  }, [_c('div', {
    staticClass: "w-full"
  }, [_vm.title ? _c('p', {
    staticClass: "text-sm leading-5 font-medium",
    class: _vm.classTitle
  }, [_vm._v(_vm._s(_vm.title))]) : _vm._e(), _vm._v(" "), _c('p', {
    staticClass: "text-sm leading-5",
    class: [_vm.classMessage, {
      'mt-1': _vm.title
    }],
    domProps: {
      "innerHTML": _vm._s(_vm.message)
    }
  })])]), _vm._v(" "), _c('div', {
    staticClass: "flex border-l border-gray-200"
  }, [_c('div', {
    staticClass: "-ml-px flex flex-col"
  }, [_c('div', {
    staticClass: "h-0 flex-1 flex border-b border-gray-200"
  }, [_c('button', {
    staticClass: "-mb-px flex items-center justify-center w-full rounded-tr-lg border border-transparent px-4 py-3 text-sm leading-5 font-medium text-indigo-600 transition ease-in-out duration-150 hover:text-indigo-500 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 active:text-indigo-700 active:bg-gray-50",
    on: {
      "click": _vm.primaryAction
    }
  }, [_vm._v(_vm._s(_vm.primary.label))])]), _vm._v(" "), _c('div', {
    staticClass: "-mt-px h-0 flex-1 flex"
  }, [_c('button', {
    staticClass: "flex items-center justify-center w-full rounded-br-lg border border-transparent px-4 py-3 text-sm leading-5 font-medium text-gray-700 transition ease-in-out duration-150 hover:text-gray-500 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 active:text-gray-800 active:bg-gray-50",
    on: {
      "click": _vm.secondaryAction
    }
  }, [_vm._v(_vm._s(_vm.secondary.label))])])])])])]) : _vm._e(), _vm._v(" "), _vm.active && _vm.primary !== false && _vm.secondary === false ? _c('div', {
    staticClass: "max-w-sm w-full shadow-lg rounded-lg pointer-events-auto mb-4",
    class: _vm.classToastAll
  }, [_vm.progress && _vm.timeout ? _c('div', {
    staticClass: "absolute left-0 bottom-0 right-0 h-1 rounded bg-gray-100",
    style: _vm.progressStyle
  }) : _vm._e(), _vm._v(" "), _c('div', {
    staticClass: "rounded-lg shadow-xs overflow-hidden"
  }, [_c('div', {
    staticClass: "p-4"
  }, [_c('div', {
    staticClass: "flex items-center"
  }, [_c('div', {
    staticClass: "w-0 flex-1 flex justify-between"
  }, [_c('p', {
    staticClass: "w-0 flex-1 text-sm leading-5 font-medium text-gray-900",
    domProps: {
      "innerHTML": _vm._s(_vm.message)
    }
  }), _vm._v(" "), _c('button', {
    staticClass: "ml-3 flex-shrink-0 text-sm leading-5 font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:underline transition ease-in-out duration-150",
    on: {
      "click": _vm.primaryAction
    }
  }, [_vm._v(_vm._s(_vm.primary.label))])]), _vm._v(" "), _c('div', {
    staticClass: "ml-4 flex-shrink-0 flex"
  }, [_c('button', {
    staticClass: "inline-flex text-gray-400 focus:outline-none focus:text-gray-500 transition ease-in-out duration-150"
  }, [_c('IconTimes', {
    staticClass: "h-4 w-4",
    attrs: {
      "primary": _vm.classClose,
      "secondary": _vm.classClose
    }
  })], 1)])])])])]) : _vm._e()]);
};

var __vue_staticRenderFns__ = [];
/* style */

const __vue_inject_styles__ = undefined;
/* scoped */

const __vue_scope_id__ = undefined;
/* module identifier */

const __vue_module_identifier__ = undefined;
/* functional template */

const __vue_is_functional_template__ = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

const __vue_component__ = /*#__PURE__*/normalizeComponent({
  render: __vue_render__,
  staticRenderFns: __vue_staticRenderFns__
}, __vue_inject_styles__, __vue_script__, __vue_scope_id__, __vue_is_functional_template__, __vue_module_identifier__, false, undefined, undefined, undefined);

let installed = false;
const containerClasses = ['z-40', 'fixed', 'inset-0', 'flex', 'flex-col-reverse', 'items-end', 'justify-center', 'px-4', 'py-6', 'pointer-events-none', 'sm:p-6', 'sm:items-end', 'sm:justify-end'];
var index = {
  install(Vue, defaultOptions = {}) {
    if (installed) return;
    const CONSTRUCTOR = Vue.extend(__vue_component__);
    const CACHE = {};
    Object.assign(__vue_component__.DEFAULT_OPT, defaultOptions);

    function toast(msg, options = {}) {
      options.message = msg;
      let toast = CACHE[options.id] || (CACHE[options.id] = new CONSTRUCTOR());

      if (!toast.$el) {
        let vm = toast.$mount();
        document.querySelector(options.parent || 'body').appendChild(vm.$el);
      }

      toast.queue.push(options);
    }

    Vue.toast = Vue.prototype.$toast = toast;
    installed = true;
  }

};

export default index;
export { __vue_component__ as TailToast, containerClasses, removeElement, spawn };
