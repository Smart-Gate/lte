require('./bootstrap');
import Vue from 'vue';
import VueRouter from 'vue-router';
import profile from './components/Profile';
import dashboard from './components/Dashboard';
import users from './components/Users';
import { Form, HasError, AlertError } from 'vform';
import Moment from 'moment';
import VueProgressBar from 'vue-progressbar';
import Swal from 'sweetalert2';


window.Form = Form;
window.Swal = Swal;
Vue.component(HasError.name, HasError)
Vue.component(AlertError.name, AlertError);
const options = {
  color: '#bffaf3',
  failedColor: '#874b4b',
  thickness: '5px',
  transition: {
    speed: '0.2s',
    opacity: '0.6s',
    termination: 3000
  },
  autoRevert: true,
  location: 'left',
  inverse: false
};
Vue.use(VueRouter);
Vue.use(VueProgressBar, options);
let Fire = new Vue();
window.Fire = Fire;
const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  onOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer)
    toast.addEventListener('mouseleave', Swal.resumeTimer)
  }
});
window.Toast = Toast;

Vue.filter('upText',function(text){
  return text.charAt(0).toUpperCase()+text.slice(1);
});
Vue.filter('myDate',function(created){
  return Moment(created).format('LL');
});
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
