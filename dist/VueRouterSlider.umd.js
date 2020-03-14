(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = global || self, global.VueRouterSlider = factory());
}(this, (function () { 'use strict';

  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  var script = {
    mounted() {
      this.name = this.value || this.routerNameList[0];
      this.$router.push({
        name: this.name
      });
      this.viewportWidth = document.body.clientWidth;

      var __this = this;

      window.onresize = function () {
        __this.viewportWidth = document.body.clientWidth;
      }; // this.distanceToBorder = this.targetDom.getBoundingClientRect().left || null

    },

    props: {
      routerNameList: {
        type: Array,
        required: true
      },
      routerPathList: {
        type: Array,
        required: true
      },
      compList: {
        type: Array,
        required: true
      }
    },

    data() {
      return {
        direction: "",
        currentIndex: null,
        name: "",
        targetDom: null,
        leftDom: null,
        rightDom: null,
        leftIndex: null,
        rightIndex: null,
        leftComp: null,
        rightComp: null,
        touch: {
          x1: null,
          x2: null
        },
        totalDiff: 0,
        viewportWidth: null,
        leftStyleObject: {},
        rightStyleObject: {},
        leftDom: null,
        rightDom: null,
        flag: true
      };
    },

    watch: {
      $route(to, from) {
        this.name = to.name; // if (this.flag === false) {
        //   return;
        // }
        // if (this.leftDom) {
        //   console.log(getComputedStyle(this.leftDom).transitionDuration);
        // }
        // console.log(this.flag);
        // let toIndex = this.computedIndex(this.routerNameList, to.name);
        // let fromIndex = this.computedIndex(this.routerNameList, from.name);
        // if (toIndex > fromIndex) {
        //   this.direction = "left";
        // } else if (toIndex < fromIndex) {
        //   this.direction = "right";
        // } else {
        //   this.direction = "";
        // }
      },

      name() {
        this.leftIndex = (this.routerNameList.indexOf(this.name) - 1 + this.routerNameList.length) % this.routerNameList.length;
        this.rightIndex = (this.routerNameList.indexOf(this.name) + 1 + this.routerNameList.length) % this.routerNameList.length;

        var __this = this;

        this.leftComp = this.compList[__this.leftIndex];
        this.rightComp = this.compList[__this.rightIndex];
      }

    },
    methods: {
      computedIndex(arr, item) {
        return arr.indexOf(item);
      },

      start(e) {
        this.flag = false;
        this.targetDom = e.targetTouches[0].target;
        this.distanceToBorder = this.targetDom.getBoundingClientRect().left;
        this.touch.x1 = e.targetTouches[0].clientX;
        this.leftDom = document.querySelector(".left-comp");
        this.rightDom = document.querySelector(".right-comp");
        this.leftDom.style.transition = this.targetDom.style.transition = this.rightDom.style.transition = "";
        this.translate(this.targetDom, 0);
      },

      move(e) {
        this.touch.x2 = e.targetTouches[0].clientX;
        this.totalDiff = this.touch.x2 - this.touch.x1;
        this.translate(this.targetDom, this.totalDiff);
      },

      end() {
        var left = this.targetDom.getBoundingClientRect().left;

        if (left > 0 && left < this.viewportWidth / 2) {
          this.translate(this.targetDom, 0, left / this.viewportWidth);
        } else if (left < 0 && -left < this.viewportWidth / 2) {
          this.translate(this.targetDom, 0, -left / this.viewportWidth);
        } else if (left > 0 && left > this.viewportWidth / 2) {
          this.translate(this.targetDom, this.viewportWidth, (this.viewportWidth - left) / this.viewportWidth);

          var __this = this;

          this.$router.push({
            name: this.routerNameList[__this.leftIndex]
          });
        } else if (left < 0 && -left > this.viewportWidth / 2) {
          this.translate(this.targetDom, -this.viewportWidth, (this.viewportWidth + left) / this.viewportWidth);

          var _this = this;

          this.$router.push({
            name: this.routerNameList[_this.rightIndex]
          });
        }
      },

      transitionend() {
        console.log("bug");
        this.flag = true;
        this.targetDom.style.transition = "";
        this.leftDom.style.transition = this.rightDom.style.transition = "";
      },

      translate(elem, diff, transitionDuration, callback) {
        if (transitionDuration) {
          //   console.log(this)
          //   this.flag = true;
          //   this.leftDom.style.transition = this.rightDom.style.transition = elem.style.transition =
          //     "";
          // }, transitionDuration * 1000);


          this.leftDom.style.transitionDuration = this.rightDom.style.transitionDuration = elem.style.transitionDuration = transitionDuration + "s";
          this.leftDom.style.transitionProperty = this.rightDom.style.transitionProperty = elem.style.transitionProperty = "left";
          this.leftDom.style.transitionTimingFunction = this.rightDom.style.transitionTimingFunction = elem.style.transitionTimingFunction = "ease";
        }

        this.leftDom.style.left = diff - this.viewportWidth + "px";
        elem.style.left = diff + "px";
        this.rightDom.style.left = diff + this.viewportWidth + "px";
      }

    }
  };

  function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier
  /* server only */
  , shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
    if (typeof shadowMode !== 'boolean') {
      createInjectorSSR = createInjector;
      createInjector = shadowMode;
      shadowMode = false;
    } // Vue.extend constructor export interop.


    const options = typeof script === 'function' ? script.options : script; // render functions

    if (template && template.render) {
      options.render = template.render;
      options.staticRenderFns = template.staticRenderFns;
      options._compiled = true; // functional template

      if (isFunctionalTemplate) {
        options.functional = true;
      }
    } // scopedId


    if (scopeId) {
      options._scopeId = scopeId;
    }

    let hook;

    if (moduleIdentifier) {
      // server build
      hook = function (context) {
        // 2.3 injection
        context = context || // cached call
        this.$vnode && this.$vnode.ssrContext || // stateful
        this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext; // functional
        // 2.2 with runInNewContext: true

        if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
          context = __VUE_SSR_CONTEXT__;
        } // inject component styles


        if (style) {
          style.call(this, createInjectorSSR(context));
        } // register component module identifier for async chunk inference


        if (context && context._registeredComponents) {
          context._registeredComponents.add(moduleIdentifier);
        }
      }; // used by ssr in case component is cached and beforeCreate
      // never gets called


      options._ssrRegister = hook;
    } else if (style) {
      hook = shadowMode ? function (context) {
        style.call(this, createInjectorShadow(context, this.$root.$options.shadowRoot));
      } : function (context) {
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
      } else {
        // inject component registration as beforeCreate hook
        const existing = options.beforeCreate;
        options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
      }
    }

    return script;
  }

  const isOldIE = typeof navigator !== 'undefined' && /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());

  function createInjector(context) {
    return (id, style) => addStyle(id, style);
  }

  let HEAD;
  const styles = {};

  function addStyle(id, css) {
    const group = isOldIE ? css.media || 'default' : id;
    const style = styles[group] || (styles[group] = {
      ids: new Set(),
      styles: []
    });

    if (!style.ids.has(id)) {
      style.ids.add(id);
      let code = css.source;

      if (css.map) {
        // https://developer.chrome.com/devtools/docs/javascript-debugging
        // this makes source maps inside style tags work properly in Chrome
        code += '\n/*# sourceURL=' + css.map.sources[0] + ' */'; // http://stackoverflow.com/a/26603875

        code += '\n/*# sourceMappingURL=data:application/json;base64,' + btoa(unescape(encodeURIComponent(JSON.stringify(css.map)))) + ' */';
      }

      if (!style.element) {
        style.element = document.createElement('style');
        style.element.type = 'text/css';
        if (css.media) style.element.setAttribute('media', css.media);

        if (HEAD === undefined) {
          HEAD = document.head || document.getElementsByTagName('head')[0];
        }

        HEAD.appendChild(style.element);
      }

      if ('styleSheet' in style.element) {
        style.styles.push(code);
        style.element.styleSheet.cssText = style.styles.filter(Boolean).join('\n');
      } else {
        const index = style.ids.size - 1;
        const textNode = document.createTextNode(code);
        const nodes = style.element.childNodes;
        if (nodes[index]) style.element.removeChild(nodes[index]);
        if (nodes.length) style.element.insertBefore(textNode, nodes[index]);else style.element.appendChild(textNode);
      }
    }
  }

  /* script */
  const __vue_script__ = script;

  /* template */
  var __vue_render__ = function() {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c(
      "div",
      { staticClass: "slider-view" },
      [
        _c(_vm.leftComp, {
          tag: "component",
          staticClass: "left-comp",
          style: _vm.leftStyleObject,
          on: { transitionend: _vm.transitionend }
        }),
        _vm._v(" "),
        _c(
          "transition",
          { attrs: { name: _vm.direction } },
          [
            _c("router-view", {
              staticClass: "self-comp",
              on: { transitionend: _vm.transitionend },
              nativeOn: {
                touchstart: function($event) {
                  return _vm.start($event)
                },
                touchmove: function($event) {
                  return _vm.move($event)
                },
                touchend: function($event) {
                  return _vm.end($event)
                }
              }
            })
          ],
          1
        ),
        _vm._v(" "),
        _c(_vm.rightComp, {
          tag: "component",
          staticClass: "right-comp",
          style: _vm.rightStyleObject,
          on: { transitionend: _vm.transitionend }
        })
      ],
      1
    )
  };
  var __vue_staticRenderFns__ = [];
  __vue_render__._withStripped = true;

    /* style */
    const __vue_inject_styles__ = function (inject) {
      if (!inject) return
      inject("data-v-e7b85814_0", { source: "\n.left-enter-active[data-v-e7b85814],\n.left-leave-active[data-v-e7b85814],\n.right-enter-active[data-v-e7b85814],\n.right-leave-active[data-v-e7b85814] {\n  position: absolute;\n  transition: 1s all ease;\n}\n.left-enter[data-v-e7b85814],\n.right-leave-to[data-v-e7b85814] {\n  transform: translateX(100%);\n}\n.right-enter[data-v-e7b85814],\n.left-leave-to[data-v-e7b85814] {\n  transform: translateX(-100%);\n}\n.slider-view[data-v-e7b85814] {\n  width: 100%;\n  height: 100%;\n  position: absolute;\n  overflow: hidden;\n}\n.left-comp[data-v-e7b85814],\n.right-comp[data-v-e7b85814] {\n  position: absolute;\n}\n.self-comp[data-v-e7b85814] {\n  position: absolute;\n  z-index: 1;\n}\n", map: {"version":3,"sources":["C:\\Node.js\\myPlugins\\vue-router-slider\\vue-router-slider\\src\\lib\\SliderView.vue"],"names":[],"mappings":";AA6LA;;;;EAIA,kBAAA;EACA,uBAAA;AACA;AAEA;;EAEA,2BAAA;AACA;AAEA;;EAEA,4BAAA;AACA;AAEA;EACA,WAAA;EACA,YAAA;EACA,kBAAA;EACA,gBAAA;AACA;AAEA;;EAEA,kBAAA;AACA;AAEA;EACA,kBAAA;EACA,UAAA;AACA","file":"SliderView.vue","sourcesContent":["<template>\n  <div class=\"slider-view\">\n    <component\n      :is=\"leftComp\"\n      @transitionend=\"transitionend\"\n      class=\"left-comp\"\n      :style=\"leftStyleObject\"\n    ></component>\n    <transition :name=\"direction\">\n      <router-view\n        class=\"self-comp\"\n        @touchstart.native=\"start\"\n        @touchmove.native=\"move\"\n        @touchend.native=\"end\"\n        @transitionend=\"transitionend\"\n      ></router-view>\n    </transition>\n    <component\n      :is=\"rightComp\"\n      @transitionend=\"transitionend\"\n      class=\"right-comp\"\n      :style=\"rightStyleObject\"\n    ></component>\n  </div>\n</template>\n\n<script>\nexport default {\n  mounted() {\n    this.name = this.value || this.routerNameList[0];\n    this.$router.push({ name: this.name });\n    this.viewportWidth = document.body.clientWidth;\n    let __this = this;\n    window.onresize = function() {\n      __this.viewportWidth = document.body.clientWidth;\n    };\n    // this.distanceToBorder = this.targetDom.getBoundingClientRect().left || null\n  },\n  props: {\n    routerNameList: {\n      type: Array,\n      required: true\n    },\n    routerPathList: {\n      type: Array,\n      required: true\n    },\n    compList: {\n      type: Array,\n      required: true\n    }\n  },\n  data() {\n    return {\n      direction: \"\",\n      currentIndex: null,\n      name: \"\",\n      targetDom: null,\n      leftDom: null,\n      rightDom: null,\n      leftIndex: null,\n      rightIndex: null,\n      leftComp: null,\n      rightComp: null,\n      touch: {\n        x1: null,\n        x2: null\n      },\n      totalDiff: 0,\n      viewportWidth: null,\n      leftStyleObject: {},\n      rightStyleObject: {},\n      leftDom: null,\n      rightDom: null,\n      flag: true,\n    };\n  },\n  watch: {\n    $route(to, from) {\n      this.name = to.name;\n      // if (this.flag === false) {\n      //   return;\n      // }\n      // if (this.leftDom) {\n      //   console.log(getComputedStyle(this.leftDom).transitionDuration);\n      // }\n      // console.log(this.flag);\n      // let toIndex = this.computedIndex(this.routerNameList, to.name);\n      // let fromIndex = this.computedIndex(this.routerNameList, from.name);\n      // if (toIndex > fromIndex) {\n      //   this.direction = \"left\";\n      // } else if (toIndex < fromIndex) {\n      //   this.direction = \"right\";\n      // } else {\n      //   this.direction = \"\";\n      // }\n    },\n    name() {\n      this.leftIndex =\n        (this.routerNameList.indexOf(this.name) -\n          1 +\n          this.routerNameList.length) %\n        this.routerNameList.length;\n      this.rightIndex =\n        (this.routerNameList.indexOf(this.name) +\n          1 +\n          this.routerNameList.length) %\n        this.routerNameList.length;\n      let __this = this;\n      this.leftComp = this.compList[__this.leftIndex];\n      this.rightComp = this.compList[__this.rightIndex];\n    },\n  },\n  methods: {\n    computedIndex(arr, item) {\n      return arr.indexOf(item);\n    },\n    start(e) {\n      this.flag = false;\n      this.targetDom = e.targetTouches[0].target;\n      this.distanceToBorder = this.targetDom.getBoundingClientRect().left\n      this.touch.x1 = e.targetTouches[0].clientX;\n      this.leftDom = document.querySelector(\".left-comp\");\n      this.rightDom = document.querySelector(\".right-comp\");\n      this.leftDom.style.transition = this.targetDom.style.transition = this.rightDom.style.transition =\n        \"\";\n      this.translate(this.targetDom, 0);\n    },\n    move(e) {\n      this.touch.x2 = e.targetTouches[0].clientX;\n      this.totalDiff = this.touch.x2 - this.touch.x1;\n      this.translate(this.targetDom, this.totalDiff);\n    },\n    end() {\n      let left = this.targetDom.getBoundingClientRect().left;\n      if (left > 0 && left < this.viewportWidth / 2) {\n        this.translate(this.targetDom, 0, left / this.viewportWidth);\n      } else if (left < 0 && -left < this.viewportWidth / 2) {\n        this.translate(this.targetDom, 0, -left / this.viewportWidth);\n      } else if (left > 0 && left > this.viewportWidth / 2) {\n        this.translate(\n          this.targetDom,\n          this.viewportWidth,\n          (this.viewportWidth - left) / this.viewportWidth\n        );\n        let __this = this;\n        this.$router.push({ name: this.routerNameList[__this.leftIndex] });\n      } else if (left < 0 && -left > this.viewportWidth / 2) {\n        this.translate(\n          this.targetDom,\n          -this.viewportWidth,\n          (this.viewportWidth + left) / this.viewportWidth\n        );\n        let __this = this;\n        this.$router.push({ name: this.routerNameList[__this.rightIndex] });\n      }\n    },\n    transitionend() {\n      console.log(\"bug\");\n      this.flag = true;\n      this.targetDom.style.transition = \"\";\n      this.leftDom.style.transition = this.rightDom.style.transition = \"\";\n    },\n    translate(elem, diff, transitionDuration, callback) {\n      if (transitionDuration) {\n        let __this = this;\n        // setTimeout(() => {\n        //   console.log(this)\n        //   this.flag = true;\n        //   this.leftDom.style.transition = this.rightDom.style.transition = elem.style.transition =\n        //     \"\";\n        // }, transitionDuration * 1000);\n        this.leftDom.style.transitionDuration = this.rightDom.style.transitionDuration = elem.style.transitionDuration =\n          transitionDuration + \"s\";\n        this.leftDom.style.transitionProperty = this.rightDom.style.transitionProperty = elem.style.transitionProperty =\n          \"left\";\n        this.leftDom.style.transitionTimingFunction = this.rightDom.style.transitionTimingFunction = elem.style.transitionTimingFunction =\n          \"ease\";\n      }\n      this.leftDom.style.left = diff - this.viewportWidth + \"px\";\n      elem.style.left = diff + \"px\";\n      this.rightDom.style.left = diff + this.viewportWidth + \"px\";\n    }\n  }\n};\n</script>\n\n\n<style scoped>\n.left-enter-active,\n.left-leave-active,\n.right-enter-active,\n.right-leave-active {\n  position: absolute;\n  transition: 1s all ease;\n}\n\n.left-enter,\n.right-leave-to {\n  transform: translateX(100%);\n}\n\n.right-enter,\n.left-leave-to {\n  transform: translateX(-100%);\n}\n\n.slider-view {\n  width: 100%;\n  height: 100%;\n  position: absolute;\n  overflow: hidden;\n}\n\n.left-comp,\n.right-comp {\n  position: absolute;\n}\n\n.self-comp {\n  position: absolute;\n  z-index: 1;\n}\n</style>\n"]}, media: undefined });

    };
    /* scoped */
    const __vue_scope_id__ = "data-v-e7b85814";
    /* module identifier */
    const __vue_module_identifier__ = undefined;
    /* functional template */
    const __vue_is_functional_template__ = false;
    /* style inject SSR */
    
    /* style inject shadow dom */
    

    
    const __vue_component__ = normalizeComponent(
      { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
      __vue_inject_styles__,
      __vue_script__,
      __vue_scope_id__,
      __vue_is_functional_template__,
      __vue_module_identifier__,
      false,
      createInjector,
      undefined,
      undefined
    );

  __vue_component__.install = function (Vue) {
    Vue.component('slider-view', __vue_component__);
  };

  return __vue_component__;

})));
//# sourceMappingURL=VueRouterSlider.umd.js.map
