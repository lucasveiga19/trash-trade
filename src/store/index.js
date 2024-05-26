import { createStore } from 'vuex';

export default createStore({
  state: {
    matricula: localStorage.getItem('matricula') || ''
  },
  mutations: {
    setMatricula(state, matricula) {
      state.matricula = matricula;
      localStorage.setItem('matricula', matricula);  // Salvar no localStorage
    }
  },
  actions: {
    updateMatricula({ commit }, matricula) {
      commit('setMatricula', matricula);
    }
  },
  getters: {
    getMatricula(state) {
      return state.matricula;
    }
  }
});
