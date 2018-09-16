# 弹窗组件

## 功能
- 全局组件，通过 `this.notify`调用，展现一个弹窗
- 支持点击出现多个，新出现的弹窗会自动排布在上一个弹窗高16像素
- 弹窗文案可配置，默认3s消失，可手动点击关闭
- 手动点击关闭某个弹窗，后续弹窗会自动向下回落一个弹窗位置
- 鼠标移入某个弹窗后，弹窗保持展现，不消失；鼠标移出后恢复3s后消失

## 代码结构
### notification.vue
- 负责渲染 DOM 结构
- 作为组件的主体
- 设置组件 props 属性

### func-notification.js
- 继承 notification.vue 组件
- 定义属性，覆盖 notification.vue 组件的属性
- 引用这个文件，就可以获得组件的属性方法配置，方便后续扩展,相当于一个中间层

### function.js
- 引用 function-notification.js 定义的属性
    const NotificationConstructor = Vue.extend(Component)
- 对外导出 notify 方法
  - 参数包括`content btn autoClose`
  - 根据参数实例化一个弹窗对象
  - 设置弹窗对象的高，可见性
  - 监听弹窗组件关闭和移除事件事件（手动关闭：先触发close 再触发closed；自动关闭只触发 closed ）

### index.js
- 注册全局组件
- 注册根组件上的`notify`方法
