<!-- Come from vue-strap, 做了二次开发。
  取消了show.sync 的双向绑定，通过emit事件close来通知关闭。
  这样便于和vuex结合使用。
-->
<template>
  <div role="dialog"
    v-bind:class="{
    'modal':true,
    'fade':effect === 'fade',
    'zoom':effect === 'zoom'
    }"
    >
    <div v-bind:class="{'modal-dialog':true,'modal-lg':large,'modal-sm':small}" role="document"
      v-bind:style="{width: optionalWidth}">
      <div v-bind:class="['modal-content', isTransparent]">
        <slot name="modal-header">
          <div class="modal-header" v-if="!noHeader">
            <h4 class="modal-title" >
              <slot name="title">
                {{title}}
              </slot>
            </h4>
          </div>
          <div v-show="noHeader" class="big-close-header">
          </div>
        </slot>
        <slot name="modal-body">
          <div class="modal-body"></div>
        </slot>
        <slot name="modal-footer">
          <div class="modal-footer" v-if="!noFooter">
            <div class="button button-cancel" @click="close" v-show="isComfirm">{{ cancelText }}</div>
            <div class="button button-ok" @click="confirm">{{ okText }}</div>
          </div>
        </slot>
      </div>
    </div>
  </div>
</template>

<script>
import getScrollBarWidth from 'utils/getScrollBarWidth.js'
import EventListener from 'utils/EventListener.js'
import { coerceBoolean } from 'utils/util.js'

export default {
  props: {
    noFooter: {
      type: Boolean,
      default: false
    },
    noHeader: {
      type: Boolean,
      default: false
    },
    okText: {
      type: String,
      default: '确认'
    },
    cancelText: {
      type: String,
      default: '取消'
    },
    title: {
      type: String,
      default: ''
    },
    show: {
      require: true,
      type: Boolean
    },
    width: {
      default: null
    },
    isComfirm: {
      type: Boolean,
      default: false
    },
    callback: {
      type: Function,
      default: null
    },
    effect: {
      type: String,
      default: null
    },
    backdrop: {
      type: Boolean,
      default: true
    },
    large: {
      type: Boolean,
      default: false
    },
    small: {
      type: Boolean,
      default: false
    },
    transparent: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      closeTimer: null,
      isTransparent: this.transparent
    }
  },
  watch: {
    transparent () {
      this.isTransparent = this.transparent
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.$watch('show', (val) => {
        const el = this.$el
        const body = document.body
        const scrollBarWidth = getScrollBarWidth()
        if (val) {
          if (this.closeTimer) {
            clearTimeout(this.closeTimer)
          }
          el.querySelector('.modal-content').focus()
          el.style.display = 'block'
          setTimeout(() => el.classList.add('in'), 0)
          body.classList.add('modal-open')
          if (scrollBarWidth !== 0) {
            body.style.paddingRight = scrollBarWidth + 'px'
          }
          if (this.backdrop) {
            this._blurModalContentEvent = EventListener.listen(this.$el, 'click', (e) => {
              if (e.target === el) this.$emit('close')
            })
          }
        } else {
          if (this._blurModalContentEvent) this._blurModalContentEvent.remove()
          el.classList.remove('in')
          this.closeTimer = setTimeout(() => {
            el.style.display = 'none'
            body.classList.remove('modal-open')
            body.style.paddingRight = '0'
          }, 300)
        }
      }, { immediate: true })
    })
  },
  computed: {
    optionalWidth: function () {
      if (this.width === null) {
        return null
      } else if (Number.isInteger(this.width)) {
        return this.width + 'px'
      }
      return this.width
    },
    coerceShow: function () {
      return coerceBoolean(this.show)
    },
    coerceBackDrop: function () {
      return coerceBoolean(this.backdrop)
    },
    coerceLarge: function () {
      return coerceBoolean(this.large)
    },
    coerceSmall: function () {
      return coerceBoolean(this.small)
    }
  },
  methods: {
    close () {
      this.$emit('close')
      this.callback && this.callback(false)
    },
    confirm () {
      this.$emit('close')
      this.callback && this.callback(true)
    }
  }
}
</script>
<style scoped>
/* style from bootstrap */
.button {
  height: 25px;
  line-height: 25px;
  padding: 0 25px;
  display: inline-block;
  font-size: 12px;
  border-radius: 3px;
  cursor: pointer;
  border: 1px solid #e9e9e9;
}
.button-ok {
  background-color: #0cbe06;
  border-color: #0cbe06;
  color: white;
}
.button-ok:hover {
  background-color: #06cb00;
}
.button-cancel {
  background-color: #f9f9f9;
  color: #0cbe06;
}
.button-cancel:hover {
  background-color: #f2f2f2;
  color: #0cbe06;
}
.modal-open {
  overflow: hidden;
}
.modal {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1001;
  display: none;
  overflow: hidden;
  -webkit-overflow-scrolling: touch;
  outline: 0;
}
.modal.fade .modal-dialog {
  -webkit-transition: -webkit-transform .3s ease-out;
       -o-transition:      -o-transform .3s ease-out;
          transition:         transform .3s ease-out;
  -webkit-transform: translate(0, -25%);
      -ms-transform: translate(0, -25%);
       -o-transform: translate(0, -25%);
          transform: translate(0, -25%);
}
.modal-dialog {
  -webkit-transform: translate(0, -50%);
      -ms-transform: translate(0, -50%);
       -o-transform: translate(0, -50%);
          transform: translate(0, -50%);
}
.modal-open .modal {
  overflow-x: hidden;
  overflow-y: hidden;
}
.modal-dialog {
  position: absolute;
  width: auto;
  margin: auto;
  left: 0;
  right: 0;
  top: 50%;
}
.modal-content {
  position: relative;
  padding: 10px;
  box-sizing: border-box;
  background-color: #fff;
  -webkit-background-clip: padding-box;
          background-clip: padding-box;
  outline: 0;
}
.transparent {
  border: 0;
  background: transparent;
  box-shadow: none;
}
.modal-backdrop {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  background-color: #000;
}
.modal-backdrop.fade {
  filter: alpha(opacity=0);
  opacity: 0;
}
.modal-backdrop.in {
  filter: alpha(opacity=50);
  opacity: .5;
}
.modal-header {
  min-height: 16.42857143px;
  padding-bottom: 8px;
  border-bottom: 1px solid #e3e3e3;
  color: #0cbe06;
}
.big-close-header {
  position: relative;
  height: 20px;
}
.close:hover {
  color: #0cbe06;
}
.big-close:hover {
  color: #0cbe06;
}
.modal-title {
  margin: 0;
  line-height: 1.42857143;
}
.modal-body {
  position: relative;
  padding: 15px;
}
.modal-footer {
  padding: 15px;
  text-align: center;
}
.modal-footer .button + .button {
  margin-bottom: 0;
  margin-left: 5px;
}
.modal-footer .button-group .button + .button {
  margin-left: -1px;
}
.modal-footer .button-block + .button-block {
  margin-left: 0;
}
.modal-scrollbar-measure {
  position: absolute;
  top: -9999px;
  width: 50px;
  height: 50px;
  overflow: scroll;
}
@media (min-width: 768px) {
  .modal-dialog {
    width: 600px;
  }
  .transparent {
    box-shadow: none;
  }
  .modal-sm {
    width: 300px;
  }
}
@media (min-width: 992px) {
  .modal-lg {
    width: 900px;
  }
}

/* style from vue-strap */
.modal {
  transition: all 0.3s ease;
}
.modal.in {
  background-color: rgba(0,0,0,0.5);
}
.modal.zoom .modal-dialog {
    -webkit-transform: scale(0.1);
    -moz-transform: scale(0.1);
    -ms-transform: scale(0.1);
    transform: scale(0.1);
    top: 300px;
    opacity: 0;
    -webkit-transition: all 0.3s;
    -moz-transition: all 0.3s;
    transition: all 0.3s;
}
.modal.zoom.in .modal-dialog {
    -webkit-transform: scale(1);
    -moz-transform: scale(1);
    -ms-transform: scale(1);
    transform: scale(1);
    -webkit-transform: translate3d(0, -300px, 0);
    transform: translate3d(0, -300px, 0);
    opacity: 1;
}
</style>
