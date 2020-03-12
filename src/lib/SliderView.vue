<template>
  <div class="slider-view">
    <component :is="leftComp" @transitionend="transitionend" class="left-comp" :style="leftStyleObject"></component>
    <transition :name="direction">
      <router-view
        class="self-comp"
        @touchstart.native="start"
        @touchmove.native="move"
        @touchend.native="end"
        @transitionend.native="transitionend"
      ></router-view>
    </transition>
    <component :is="rightComp" @transitionend="transitionend" class="right-comp" :style="rightStyleObject"></component>
  </div>
</template>

<script>
export default {
  mounted() {
    this.name = this.value || this.routerNameList[0];
    this.$router.push({ name: this.name });
    this.viewportWidth = document.body.clientWidth;
    let __this = this;
    window.onresize = function() {
      __this.viewportWidth = document.body.clientWidth;
    };
    // console.log(document.querySelector('.left-comp'))
    // console.log(document.querySelector('.right-comp'))
    // this.leftIndex =
    //   (this.routerNameList.indexOf(this.name) -
    //     1 +
    //     this.routerNameList.length) %
    //   this.routerNameList.length;
    // this.rightIndex =
    //   (this.routerNameList.indexOf(this.name) +
    //     1 +
    //     this.routerNameList.length) %
    //   this.routerNameList.length;
    // this.leftComp = this.compList[__this.leftIndex];
    // this.rightComp = this.compList[__this.rightIndex];
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
  computed: {
    // leftIndex() {
    //   // 先不考虑this.name为最左边组件的情况
    //   return (
    //     (this.routerNameList.indexOf(this.name) -
    //       1 +
    //       this.routerNameList.length) %
    //     this.routerNameList.length
    //   );
    // },
    // leftComp() {
    //   let __this = this;
    //   return this.compList[__this.leftIndex];
    // },
    // rightIndex() {
    //   return (
    //     (this.routerNameList.indexOf(this.name) +
    //       1 +
    //       this.routerNameList.length) %
    //     this.routerNameList.length
    //   );
    // },
    // rightComp() {
    //   let __this = this;
    //   return this.compList[__this.rightIndex];
    // }
  },
  watch: {
    $route(to, from) {
      this.name = to.name;
      if (this.flag === false) {
        return;
      }
      let toIndex = this.computedIndex(this.routerNameList, to.name);
      let fromIndex = this.computedIndex(this.routerNameList, from.name);
      console.log("bug");
      if (toIndex > fromIndex) {
        this.direction = "left";
      } else if (toIndex < fromIndex) {
        this.direction = "right";
      } else {
        this.direction = "";
      }
    },
    name() {
      this.leftIndex =
        (this.routerNameList.indexOf(this.name) -
          1 +
          this.routerNameList.length) %
        this.routerNameList.length;
      this.rightIndex =
        (this.routerNameList.indexOf(this.name) +
          1 +
          this.routerNameList.length) %
        this.routerNameList.length;
      let __this = this;
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
      this.touch.x1 = e.targetTouches[0].clientX;
      this.leftDom = document.querySelector(".left-comp");
      this.rightDom = document.querySelector(".right-comp");
      console.log('bug')
      this.translate(this.targetDom, 0);
    },
    move(e) {
      this.touch.x2 = e.targetTouches[0].clientX;
      this.totalDiff = this.touch.x2 - this.touch.x1;
      this.translate(this.targetDom, this.totalDiff);
    },
    end() {
      let left = this.targetDom.getBoundingClientRect().left;
      if (left > 0 && left < this.viewportWidth / 2) {
        this.translate(this.targetDom, 0, left / this.viewportWidth);
      } else if (left < 0 && -left < this.viewportWidth / 2) {
        this.translate(this.targetDom, 0, -left / this.viewportWidth);
      } else if (left > 0 && left > this.viewportWidth / 2) {
        this.translate(
          this.targetDom,
          this.viewportWidth,
          (this.viewportWidth - left) / this.viewportWidth
        );
        let __this = this;
        this.$router.push({ name: this.routerNameList[__this.leftIndex] });
      } else if (left < 0 && -left > this.viewportWidth / 2) {
        this.translate(
          this.targetDom,
          -this.viewportWidth,
          (this.viewportWidth + left) / this.viewportWidth
        );
        let __this = this;
        console.log(getComputedStyle(this.targetDom))
        // console.log('a')
        this.$router.push({ name: this.routerNameList[__this.rightIndex] });
      }
    },
    transitionend (e) {
      e.target.style.transitionDuration = 0
      e.target.style.transitionProperty = ''
      e.target.style.transitionTimingFunction = ''
      this.leftDom.style.transition = this.rightDom.style.transition = ''
    },
    translate(elem, diff, transitionDuration, callback) {
      if (transitionDuration) {
        let __this = this;
        setTimeout(() => {
          this.leftDom.style.transitionDuration = this.rightDom.style.transitionDuration = elem.style.transitionDuration =
            0;
          this.leftDom.style.transitionProperty = this.rightDom.style.transitionProperty = elem.style.transitionProperty =
            '';
          this.leftDom.style.transitionTimingFunction = this.rightDom.style.transitionTimingFunction = elem.style.transitionTimingFunction =
            '';
        }, transitionDuration * 1000);
        this.leftDom.style.transitionDuration = this.rightDom.style.transitionDuration = elem.style.transitionDuration =
          transitionDuration + "s";
        this.leftDom.style.transitionProperty = this.rightDom.style.transitionProperty = elem.style.transitionProperty =
          "left";
        this.leftDom.style.transitionTimingFunction = this.rightDom.style.transitionTimingFunction = elem.style.transitionTimingFunction =
          "ease";
      }
      this.leftDom.style.left = diff - this.viewportWidth + "px";
      elem.style.left = diff + "px";
      this.rightDom.style.left = diff + this.viewportWidth + "px";
    }
  }
};
</script>


<style scoped>
.left-enter-active,
.left-leave-active,
.right-enter-active,
.right-leave-active {
  position: absolute;
  transition: 1s all ease;
}

.left-enter,
.right-leave-to {
  transform: translateX(100%);
}

.right-enter,
.left-leave-to {
  transform: translateX(-100%);
}

.slider-view {
  width: 100%;
  height: 100%;
  position: absolute;
  overflow: hidden;
}

.left-comp,
.right-comp {
  position: absolute;
}

.self-comp {
  position: absolute;
  z-index: 1;
}
</style>
