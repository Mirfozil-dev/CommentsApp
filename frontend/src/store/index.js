import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    comments: [],
    pagesCount: 0,
    status: '',
    currentPage: 1,
  },
  mutations: {
    setCurrentPage(state, payload) {
      state.currentPage = payload;
    },
    setPagesCount(state, payload) {
      state.pagesCount = payload;
    },
    setComments(state, payload) {
      state.comments = payload;
    },
    deleteComment(state, payload) {
      state.comments = state.comments.filter(item => item.id !== payload);
      state.status = 'Коментарий удален!';
      setTimeout(() => {
        state.status = '';
      }, 1000);
    },
    setNewComment(state, payload) {
      if (state.comments.length < 3) {
        state.comments.push(payload);
      }
      state.status = 'Коментарий добавлен!';
      setTimeout(() => {
        state.status = '';
      }, 1000);
    },
  },
  actions: {
    getPagesCount({ commit }) {
      axios.get('http://localhost:3000/comments').then(r => commit('setPagesCount', Math.ceil(r.data.length / 3)));
    },
    getComments({ commit }) {
      axios.get(`http://localhost:3000/comments?per-page=3&page=${this.getters.currentPage}`).then(r => commit('setComments', r.data));
    },
    deleteComment({ commit }, payload) {
      axios.delete(`http://localhost:3000/comments/${payload}`, {}).then(r => r.status === 204 && commit('deleteComment', payload));
    },
    addNewComment({ commit }, payload) {
      if (payload.comment_text !== '') {
        let currentDate = new Date();
        payload.created_at = currentDate.getDate() + '/' + (currentDate.getMonth() + 1) + '/' + currentDate.getFullYear() + ' ' + currentDate.getHours() + ':' + currentDate.getMinutes();
        axios.post('http://localhost:3000/comments', {
          comment_text: payload.comment_text,
          created_at: payload.created_at,
        }, {}).then(r => r.status === 201 && commit('setNewComment', r.data));
      }
    },
  },
  getters: {
    comments: state => state.comments,
    pagesCount: state => state.pagesCount,
    status: state => state.status,
    currentPage: state => state.currentPage,
  },
  modules: {},
});