import axios from 'axios'

export default {
  // module임을 암시
  namespaced: true,
  // data를 의미
  state: () => ({
    movies: []
  }),


  // computed상태를 의미
  getters: {},


  // methods와 유사
  // 변이
  // state에 작성된 데이터를 바꿀떄
  mutations: {
    updateState(state, payload) {
      Object.keys(payload).forEach(key => {
        state[key] = payload[key]
      })
    },
    resetMovies(state) {
      state.movies = []
    }
  },


  // 비동기로 작동함
  actions: {
    async searchMovies( { state, commit }, payload) {
      const { title, type, number, year } = payload
      const OMDB_API_KEY = '7035c60c'


      const res = await axios.get(`http://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=${title}&type=${type}&y=${year}&page=1`)
      const { Search, totalResults } = res.data
      commit('updateState', {
        movies: Search
      })
      
      const total = parseInt(totalResults, 10)
      const pageLength = Math.ceil(total / 10)

      if (pageLength > 1) {
        for (let page = 2; page <= pageLength; page += 1) {
          if (page > number /10) {
            break
          }
          const res = await axios.get(`http://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=${title}&type=${type}&y=${year}&page=${page}`)
          const { Search } = res.data
          commit('updateState', {
            movies: [ ...state.movies, ...Search ]
          })
        }
      }
    }
  }
}