const url = 'https://frontend-test-assignment-api.abz.agency/api/v1/'
export default {
    state: {
        token: '',
        modalStatus: false,
        modalMsg: {
            title: "",
            msg: '',
        },
    },
    mutations: {
        SET_TOKEN: (state, data) => {
            state.token = data;
        },
        SET_MODAL_STATUS: (state, status) => {
            state.modalStatus = status;
        },
        SET_ERROR_MESSAGE: (state, data) => {
            state.modalMsg = data
        }
    },
    actions: {
        SEND_FORM: async ({getters, dispatch, commit}, data) => {

            const token = getters.GET_TOKEN

            fetch('https://frontend-test-assignment-api.abz.agency/api/v1/users',
                {
                    method: 'POST',
                    body: data,
                    headers: {
                        'Token': token,
                    },
                })
                .then(function (response) {
                    return response.json();
                }).then(function (data) {
                commit('SET_ERROR_MESSAGE', {title: 'Error', msg: data.message});
                commit('SET_MODAL_STATUS', true);
                console.log(data);

                if (data.success) {
                    commit('RESET_ITEM_PAGE');
                    dispatch('GET_USERS_DATA');
                    commit('SET_ERROR_MESSAGE', {title: 'Congratulations', msg: 'You have successfully passed the registration'});
                    commit('SET_MODAL_STATUS', true)
                } else {
                    console.log('problems')
                }
            }).catch(function (error) {
                alert(error);
            });
        },
        GET_POSITIONS_DATA: async () => {
            try {
                const response = await fetch(`${url}positions`);
                if (response.ok) {
                    let json = await response.json();
                    return await json.positions
                } else {
                    console.log("Ошибка HTTP: " + response.status);
                }
            } catch (e) {
                console.log(e);
            }

        },
        GET_NEW_TOKEN: async ({commit}) => {
            try {
                const response = await fetch(`https://frontend-test-assignment-api.abz.agency/api/v1/token`);
                if (response.ok) {
                    let json = await response.json()
                    commit('SET_TOKEN', json.token)
                } else {
                    console.log("Ошибка HTTP: " + response.status);
                }

            } catch (e) {
                console.log(e);
            }
        }
    },
    getters: {
        GET_TOKEN: (state) => {
            return state.token
        },
        GET_MODAL_STATUS: (state) => {
            return state.modalStatus
        },
        GET_MODAL_MESSAGE: (state) => {
            return state.modalMsg
        },
    },
}
