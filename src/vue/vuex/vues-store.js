import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);


const axios = require('axios').default;
const token = 'eyJpdiI6Im9mV1NTMlFZQTlJeWlLQ3liVks1MGc9PSIsInZhbHVlIjoiRTJBbUR4dHp1dWJ3ekQ4bG85WVZya3ZpRGlMQ0g5ZHk4M05UNUY4Rmd3eFM3czc2UDRBR0E4SDR5WXlVTG5DUDdSRTJTMU1KQ2lUQmVZYXZZOHJJUVE9PSIsIm1hYyI6ImE5YmNiODljZjMzMTdmMDc4NjEwN2RjZTVkNzBmMWI0ZDQyN2YzODI5YjQxMzE4MWY0MmY0ZTQ1OGY4NTkyNWQifQ=='
const ulr = 'https://frontend-test-assignment-api.abz.agency/api/v1/'
const store = new Vuex.Store({
    state: {
        users: [],
        itemsPage: 1,
        buttonDisable: false,
        buttonState: true,

    },
    mutations: {
        SET_USERS_DATA: (state, data) => {
            state.users = data.sort((a, b) => b.registration_timestamp - a.registration_timestamp);
        },
        SET_BUTTON_STATUS: (state) => {
            state.buttonDisable = !state.buttonDisable;
        },
        SET_BUTTON_STATE: (state) => {
            state.buttonState = false;
        },
        SET_ITEMS_PAGE: (state) => {
            state.itemsPage++
        },
        ADD_USERS_DATA: (state, data) => {
            state.users = state.users
                .concat(data)
                .sort((a, b) => b.registration_timestamp - a.registration_timestamp);
        },
    },
    actions: {
        GET_USERS_DATA: async ({commit, getters}) => {
            try {
                let page = getters.GET_ITEMS_PAGE
                const response = await axios(`${ulr}users?count=6&page=${page}`);

                commit('SET_USERS_DATA', response.data.users)
            } catch (e) {
                console.log(e);
            }
        },
        GET_MORE_USERS: async ({commit, getters}) => {
            try {
                commit('SET_ITEMS_PAGE');
                commit('SET_BUTTON_STATUS')

                let page = getters.GET_ITEMS_PAGE;
                const response = await axios(`${ulr}users?count=6&page=${page}`);
                let users = response.data.total_users
                let pages = response.data.total_users
                let count = 6
                console.log(users);
                console.log(`pages: ${users / 6 + 1}` );
                if (response.data.success) {
                    commit('ADD_USERS_DATA', response.data.users);
                    commit('SET_BUTTON_STATUS')
                }


            } catch (e) {
                commit('SET_BUTTON_STATE')
                console.log(e);
            }
        },
    },
    getters: {
        GET_USERS: (state) => {
            return state.users
        },
        GET_ITEMS_PAGE: (state) => {
            return state.itemsPage
        },
        GET_BUTTON_STATUS: (state) => {
            return state.buttonDisable
        },
        GET_BUTTON_STATE: (state) => {
            console.log(state.buttonState);
            return state.buttonState
        },
    },

});

export default store;
