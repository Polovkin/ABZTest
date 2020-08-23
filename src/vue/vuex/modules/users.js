const axios = require('axios').default;
const token = 'eyJpdiI6Im9mV1NTMlFZQTlJeWlLQ3liVks1MGc9PSIsInZhbHVlIjoiRTJBbUR4dHp1dWJ3ekQ4bG85WVZya3ZpRGlMQ0g5ZHk4M05UNUY4Rmd3eFM3czc2UDRBR0E4SDR5WXlVTG5DUDdSRTJTMU1KQ2lUQmVZYXZZOHJJUVE9PSIsIm1hYyI6ImE5YmNiODljZjMzMTdmMDc4NjEwN2RjZTVkNzBmMWI0ZDQyN2YzODI5YjQxMzE4MWY0MmY0ZTQ1OGY4NTkyNWQifQ=='
const ulr = 'https://frontend-test-assignment-api.abz.agency/api/v1/'

export default {
    state: {
        users: [],
        itemsPage: 1,
        buttonDisable: false,
        buttonState: true,
        totalPages: 0,
        buttonShow: true
    },
    mutations: {
        SET_TOTAL_PAGES: (state, data) => {
            state.totalPages = data;
        },
        SET_USERS_DATA: (state, data) => {
            state.users = data;
        },
        SET_BUTTON_STATUS: (state) => {
            state.buttonDisable = !state.buttonDisable;
        },
        SET_BUTTON_SHOW: (state, status) => {
            state.buttonShow = status;
        },
        SET_ITEMS_PAGE: (state) => {
            state.itemsPage++
        },
        RESET_ITEM_PAGE: (state) => {
            state.itemsPage=1;
        },
        ADD_USERS_DATA: (state, data) => {
            state.users = state.users.concat(data)
        },
    },
    actions: {
        GET_USERS_DATA: async ({commit, getters}) => {
            try {
                let page = getters.GET_ITEMS_PAGE
                const response = await axios(`${ulr}users?page=${page}&count=6`);

                commit('SET_TOTAL_PAGES', response.data.total_pages);
                commit('SET_USERS_DATA', response.data.users);
            } catch (e) {
                console.log(e);
            }
        },
        GET_MORE_USERS: async ({commit, getters}) => {
            try {
                commit('SET_ITEMS_PAGE');
                commit('SET_BUTTON_STATUS')

                let page = getters.GET_ITEMS_PAGE;
                let totalPages = getters.GET_TOTAL_PAGES
                if (page <= totalPages) {
                    const response = await axios(`${ulr}users?page=${page}&count=6`);
                    commit('ADD_USERS_DATA', response.data.users);
                    if (response.data.success) {
                        commit('SET_BUTTON_STATUS')
                    }
                    return true;
                } else {
                    commit('SET_BUTTON_SHOW', false)
                }

            } catch (e) {

                console.log(e);
            }
        },
    },
    getters: {
        GET_USERS: (state) => {
            return state.users.sort((a, b) => b.registration_timestamp - a.registration_timestamp);
        },
        GET_ITEMS_PAGE: (state) => {
            return state.itemsPage
        },
        GET_BUTTON_STATUS: (state) => {
            return state.buttonDisable
        },
        GET_TOTAL_PAGES: (state) => {
            return state.totalPages
        },
        BUTTON_SHOW: (state) => {
            return state.buttonShow;
        }
    },
}
