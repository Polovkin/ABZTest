//import '@babel/polyfill';
import Vue from 'vue';
import Users from './Users.vue';
import Registration from './Registration.vue';
import store from './vuex/vues-store';

Vue.config.productionTip = false;

new Vue({
    store,
    render: (h) => h(Users),
}).$mount('#users');


new Vue({
    store,
    render: (h) => h(Registration),
}).$mount('#registration');
