const ulr = 'https://frontend-test-assignment-api.abz.agency/api/v1/'
import 'whatwg-fetch'

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
                const response = await window.fetch(`${ulr}users?page=${page}&count=6`)

                if (response.ok) {
                    let json = await response.json();
                    commit('SET_TOTAL_PAGES', json.total_pages);
                    commit('SET_USERS_DATA', json.users);
                } else {
                    console.log("HTTP error: " + response.status);
                }

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
                    const response = await window.fetch(`${ulr}users?page=${page}&count=6`);
                    if (response.ok) {
                        let json = await response.json();
                        commit('ADD_USERS_DATA', json.users);
                        if (json.success) {
                            commit('SET_BUTTON_STATUS')
                        }
                        return true;
                    }

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
