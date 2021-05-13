// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

import Router from 'vue-router';


Vue.use(Router);
Vue.use(VueSweetalert2);

//路由
import Hello from '@/components/Hello';
import Game from './components/Game.vue';

// 路由
const router = new Router({
  mode: 'history',
  routes: [
    // eslint-disable-next-line no-unused-vars
    { path: '/', component: Hello },
    { path: '/game', component: Game },
  ],
});


router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title;
  }
  next();
});

Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
  router,
}).$mount('#app');
