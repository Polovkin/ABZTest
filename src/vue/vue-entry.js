//import '@babel/polyfill';
import Vue from 'vue';
import Users from './Users.vue';
import Registration from './Registration.vue';
import store from './vuex/vues-store';
import Vuelidate from 'vuelidate'
import VueMask from 'v-mask'

Vue.config.productionTip = false;
Vue.use(Vuelidate);
Vue.use(VueMask, {
    placeholders: {
        D: /\d/,
    }
})
new Vue({
    store,
    render: (h) => h(Users),
}).$mount('#users');


new Vue({
    store,
    render: (h) => h(Registration),
}).$mount('#registration');
