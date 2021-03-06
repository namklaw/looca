import Vue from 'vue'
import {
  Button,
  Carousel,
  Icon,
  Menu,
  Layout,
  Form,
  Input,
  Select,
  Tabs,
  Checkbox,
  Spin,
  Message,
  Modal,
  Dropdown,
  Upload,
  List,
  Table,
  TreeSelect,
  Radio,
} from 'vue-antd-ui';
import MainLayout from './../components/layout/MainLayout.vue'
const widget1 = () =>
  import ('./../components/forIndex/widget1.vue')
const widget2 = () =>
  import ('./../components/forIndex/widget2.vue')
const widget3 = () =>
  import ('./../components/forIndex/widget3.vue')
const widget4 = () =>
  import ('./../components/forIndex/widget4.vue')
const widget5 = () =>
  import ('./../components/forIndex/widget5.vue')

Vue.component("widget1", widget1)
Vue.component("widget2", widget2)
Vue.component("widget3", widget3)
Vue.component("widget4", widget4)
Vue.component("widget5", widget5)
Vue.prototype.$message = Message
Vue.prototype.$modal = Modal
console.log('%c Modal','color:red',Radio)
function registerComponentChild(vue, parentAntComponent) {
  var parent = parentAntComponent
  for (let key in parent) {
    let child = parent[key]
    if (child.name && child.name[0] === "A") {
      vue.component(child.name, child)
    }
  }
}

Vue.component("MainLayout", MainLayout)
Vue.component(Button.name, Button)
Vue.component(Modal.name, Modal)
Vue.component(Upload.name, Upload)
Vue.component(Spin.name, Spin)
Vue.component(Input.name, Input)
Vue.component(Dropdown.name, Dropdown)
registerComponentChild(Vue, Input)
Vue.component(Icon.name, Icon)
Vue.component(Carousel.name, Carousel)
Vue.component(Checkbox.name, Checkbox)
Vue.component(Menu.name, Menu)
registerComponentChild(Vue, Menu)
Vue.component(Layout.name, Layout)
registerComponentChild(Vue, Layout)
Vue.component(List.name, List)
registerComponentChild(Vue, List)
Vue.component(Select.name, Select)
registerComponentChild(Vue, Select)
Vue.component(Tabs.name, Tabs)
registerComponentChild(Vue, Tabs)
Vue.component(Form.name, Form)
registerComponentChild(Vue, Form)
Vue.component(Table.name, Table)
registerComponentChild(Vue, Table)
Vue.component(TreeSelect.name, TreeSelect)
registerComponentChild(Vue, Radio)
Vue.component(Radio.name, Radio)
registerComponentChild(Vue, TreeSelect)
