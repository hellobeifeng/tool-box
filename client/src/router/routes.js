
import Home from '../layout/Home.vue'
import Readme from '../layout/MainPage.vue'
import ComponentsList from '../views/aboutVue/componentsList.vue'

export default [
  {
    path: '/',
    redirect: '/index/readme', // 重定向到默认首页
    hidden: true
  },
  {
    path: '/index',
    component: Home,
    redirect: 'noredirect',
    name: 'index',
    noDropdown: true,
    children: [
      {
        path: 'readme',
        component: Readme,
        name: '系统说明',
        meta: {
          title: '系统说明'
        }
      }
    ]
  },
  {
    path: '/vue',
    component: Home,
    redirect: 'noredirect',
    name: 'vue 相关',
    noDropdown: true,
    children: [
      {
        path: 'components',
        component: ComponentsList
      }
    ]
  }
]
