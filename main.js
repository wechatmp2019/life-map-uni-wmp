import Vue from 'vue';
import App from './App';
import store from './store/index';
import global from './components/global/global';
import { styles, toast } from './utils/index';

Vue.config.productionTip = false;
Vue.prototype.$globalData = global;
Vue.prototype.$store = store;
Vue.prototype.$styles = styles;
Vue.prototype.$toast = toast;
App.mpType = 'app';

const app = new Vue(App);
app.$mount();
