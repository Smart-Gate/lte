require('./bootstrap');
import Vue from 'vue';
import VueRouter from 'vue-router';
import profile from './components/Profile';
import dashboard from './components/Dashboard';
import users from './components/Users';
import { Form, HasError, AlertError } from 'vform';

window.Form = Form;
Vue.component(HasError.name, HasError)
Vue.component(AlertError.name, AlertError)
Vue.use(VueRouter);
const routes = [
    { path: '/dashboard', component:dashboard },
    { path: '/profile', component: profile },
    { path: '/users', component: users },
  ];
  const router = new VueRouter({
    mode: 'history',
    routes // short for `routes: routes`
  });

const app = new Vue({
    el: '#app',
    router

});
