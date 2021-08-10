import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    personajes:[],
    personajesFavoritos: [], 
    paginacion: [],
    personajeNoEncontrado: false,
    linkAplicacion: 'http://localhost:8080/',
    background: 'https://i.guim.co.uk/img/media/b563ac5db4b4a4e1197c586bbca3edebca9173cd/0_12_3307_1985/master/3307.jpg?width=465&quality=45&auto=format&fit=max&dpr=2&s=1e7782501ddde0a9803bed9791f4eea1',
    logo:'https://occ-0-1068-92.1.nflxso.net/dnm/api/v6/LmEnxtiAuzezXBjYXPuDgfZ4zZQ/AAAABcb0yL8KdS3lxlB7w7kD6GfBTivnVVTfpiW0ZQTi6nvwWZIEpS5rU5iFeO_kJxGzEDnOaLx7iq0zM3FJc5e1gGqEGcaCkNotiOAl.png?r=d7f',
    snackBar: {
      color: '',
      text: '',
      snackBar: false,
      timeout: 4000
    },
    progress: false,
  },
  mutations: {
    saveSnackBar (state, snackBar) {
      state.snackBar.color = snackBar.color;
      state.snackBar.text = snackBar.text;
      state.snackBar.snackBar = true;
    },
    setProgress (state, value) {
      state.progress = value;
    },
    cleanSnackBar(state) {
      state.snackBar.color = '';
      state.snackBar.text = '';
      state.snackBar.snackBar = false;
    },
    setPersonajes(state, value) {
      state.personajes = value
    },
    setPersonajeFavorito(state, id) {
      state.personajes.map(personaje => {
        if (personaje.id === id)
          personaje.favorite = !personaje.favorite
      })
    },
    setPersonajesFavoritosArray(state, id) {
      let personaje = state.personajes.find(data => data.id === id)
      if(personaje.favorite)
        state.personajesFavoritos = state.personajesFavoritos.concat(personaje)
      else
        state.personajesFavoritos = state.personajesFavoritos.filter(data => data.id!==id)
    },
    setPaginacion(state, value) {
      state.paginacion = value
    },

    setPersonajeNoEncontrado(state, value) {
      state.personajeNoEncontrado = value
    },

  },
  actions: {
    onProgress({ commit }) {
      commit('setProgress', true)
    },
    offProgress({ commit }) {
      commit('setProgress', false)
    },
    setSnackBar({ commit }, snackBar) {
      commit('saveSnackBar', snackBar)
    },
    setCleanSnackBar({ commit }) {
      commit('cleanSnackBar')
    },
    savePersonajes({ commit }, personajes) {
      commit('setPersonajes', personajes)
    },
    savePersonajeFavorito({ commit }, id) {
      commit('setPersonajeFavorito', id)
      commit('setPersonajesFavoritosArray', id)
    },
    savePaginacion({ commit }, paginacion) {
      commit('setPaginacion', paginacion)
    },
    savePersonajeNoEncontrado({ commit }, valor) {
      commit('setPersonajeNoEncontrado', valor)
    },

  },
  getters: {
    
  },
  modules: {
  }
})
