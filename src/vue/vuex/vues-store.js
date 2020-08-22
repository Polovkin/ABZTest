import Vue from 'vue';
import Vuex from 'vuex';
import database from './database';

Vue.use(Vuex);


const axios = require('axios').default;
const key = 'http://jsonplaceholder.typicode.com/users';
const csv = 'https://gs.statcounter.com/screen-resolution-stats/all/chart.php?device=Desktop%20%26%20Mobile%20%26%20Tablet%20%26%20Console&device_hidden=desktop%2Bmobile%2Btablet%2Bconsole&multi-device=true&statType_hidden=resolution&region_hidden=UA&granularity=monthly&statType=Screen%20Resolution&region=Ukraine&fromInt=201905&toInt=202005&fromMonthYear=2019-05&toMonthYear=2020-05&csv=1';
const store = new Vuex.Store({
  state: {
    counter: 0,
  },
  mutations: { // Что изменить
    CHANGE_COUNTER: (state) => {
      state.counter++;
    },
  },
  actions: { // Асинхронный вызов мутации
    GET_CSV: async () => {
      function csvJSON(csv) {
        const lines = csv.split('\n')
        const result = []
        const headers = lines[0].split(',')

        for (let i = 1; i < lines.length; i++) {
          if (!lines[i])
            continue
          const obj = {}
          const currentline = lines[i].split(',')

          for (let j = 0; j < headers.length; j++) {
            obj[headers[j]] = currentline[j]
          }
          result.push(obj)
        }
        return result
      }

      function Size(key, value) {
        this.width = key.split('x')[0];
        this.height = key.split('x')[1];
        this.fullSize = key;
        this.percent = value;
      }

      try {
        const response = await axios.get(csv)
        const data = csvJSON(response.data).map((e) => {
          let value = ["\"Market Share Perc. (May 2019 - May 2020)\""];
          let key = ["\"Screen Resolution\""];
          return new Size(e[key].replace(/['"]+/g, ''), e[value].replace(/['"]+/g, ''))
        })

        return data;
      } catch (e) {
        console.error(e);
      }
    },
    COUNTER_PLUS({commit}) {
      commit('CHANGE_COUNTER');
    },
    GET_DATA: async () => {
      try {
        const response = await axios.get(key)
        return await response.data;
      } catch (e) {
        console.error(e);
      }
    },
    GET_COMMENTS: async () => {
      try {
        const response = await fetch(key2);
        return await response.json();
      } catch (e) {
        console.error(e);
      }
    },
    CREATE_USER: async () => {
      const newUser = await fetch('https://jsonplaceholder.typicode.com/users', {
        method: 'POST',
        body: JSON.stringify({
          'id': 2,
          'name': 'Ervin Howell',
          'username': 'Antonette',
          'email': 'Shanna@melissa.tv',
          'address': {
            'street': 'Victor Plains',
            'suite': 'Suite 879',
            'city': 'Wisokyburgh',
            'zipcode': '90566-7771',
            'geo': {
              'lat': '-43.9509',
              'lng': '-34.4618',
            },
          },
          'phone': '010-692-6593 x09125',
          'website': 'anastasia.net',
          'company': {
            'name': 'Deckow-Crist',
            'catchPhrase': 'Proactive didactic contingency',
            'bs': 'synergize scalable supply-chains',
          },
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      });
      return await newUser.json();
    },
  },
  getters: { // вернуть значение
    COUNTER_STATE(state) {
      return state.counter;
    },
  },
  modules: {
    database,
  }
});

export default store;
