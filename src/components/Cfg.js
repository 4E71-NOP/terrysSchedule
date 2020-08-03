import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';

const apiBase = 'https://api.warframestat.us' || process.env.VUE_APP_API_BASE;

const state = {
	platform: 'pc',
	locale: 'en',
};

const getters = {
	locale: (state) => state.locale || 'en',
	platform: (state) => state.platform || 'pc',
	apiBase: apiBase,
};

Vue.use(Vuex);
const shouldPersist = (process.env.VUE_APP_PERSIST === undefined ? 'true' : process.env.VUE_APP_PERSIST) === 'true';

var objConfig;
if (shouldPersist) {
	objConfig = new Vuex.Store({
		state,
		getters,
		plugins: [createPersistedState()],
	});
  } else {
	objConfig = new Vuex.Store({
		state,
		getters,
		plugins: [],
	});
  }
  
const Cfg = objConfig;
export default Cfg;




