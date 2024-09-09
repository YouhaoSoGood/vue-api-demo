import { createApp } from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import App from './App.vue'
import router from './router'
import Loading from 'vue3-loading-overlay';
import 'vue3-loading-overlay/dist/vue3-loading-overlay.css';
import { currency, filterdate } from './methos/filters';
import $httpMessageState from './methos/pushMessageState'
import 'bootstrap-icons/font/bootstrap-icons.css'

import {
  Form, Field, ErrorMessage, defineRule, configure
} from 'vee-validate';
import * as AllRules from '@vee-validate/rules';
import { localize, setLocale } from '@vee-validate/i18n';
import zhTW from '@vee-validate/i18n/dist/locale/zh_TW.json';

const app = createApp(App)

// Object.keys(AllRules).forEach(rule => {
//   defineRule(rule, AllRules[rule]);
// });

Object.keys(AllRules).forEach(rule => {
  if (typeof AllRules[rule] === 'function') {
    defineRule(rule, AllRules[rule]);
  }
});

// defineRule('required', AllRules.required);
// defineRule('email', AllRules.email);

configure({
  generateMessage: localize({ zh_TW: zhTW }), // 載入繁體中文語系
  validateOnInput: true // 當輸入任何內容直接進行驗證
});
// 設定預設語系
setLocale('zh_TW');

app.component('VForm', Form);
app.component('VField', Field);
app.component('ErrorMessage', ErrorMessage);

app.config.globalProperties.$filters = {
  currency,
  filterdate
};
app.config.globalProperties.$httpMessageState = $httpMessageState
app.use(VueAxios, axios)
app.use(router)
app.component('Loading', Loading)
app.mount('#app')
