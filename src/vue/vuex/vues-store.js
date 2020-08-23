import Vue from 'vue';
import Vuex from 'vuex';
import users from './modules/users'
import form from './modules/form'

Vue.use(Vuex);


const store = new Vuex.Store({
    modules: {
        users,
        form
    }
});

export default store;

