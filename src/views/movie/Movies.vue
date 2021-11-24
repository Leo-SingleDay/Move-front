<template>
  <div>
    <event-movie-list :movies="eventMovies"></event-movie-list>
    <h3 class="font-gold movie-title">추천 영화</h3>
    <movie-card :movies="recommendMovies"></movie-card>
    <h3 class="font-gold movie-title">최신 영화</h3>
    <movie-card :movies="latestMovies"></movie-card>
    <h3 class="font-gold movie-title">인기 영화</h3>
    <movie-card :movies="popularityMovies"></movie-card>
    <h3 class="font-gold movie-title">전체 영화</h3>
    <movie-all :movies="allMovies"></movie-all>
  </div>
</template>

<script>
import axios from 'axios'
import MovieAll from '@/components/movie/MovieAll.vue'
import MovieCard from '@/components/movie/MovieCard.vue'
import EventMovieList from '@/components/movie/EventMovieList.vue'

export default {
  name: 'movies',
  components: {
    MovieAll,
    MovieCard,
    EventMovieList
  },
  data: function () {
    return {
      allMovies: [],
      eventMovies: [],
      recommendMovies: [],
      latestMovies: [],
      popularityMovies: [],
    }
  },
  methods: {
    setToken: function () {
      const token = localStorage.getItem('jwt')
      const config = {
        Authorization: `JWT ${token}`
      }
      return config
    },
    getAllMovies: function() {
      axios({
        method: 'get',
        url: 'http://127.0.0.1:8000/movies/',
        headers: this.setToken()
      })
        .then(res => {
          this.allMovies = res.data
        })
        .catch(err => {
          console.log(err)
        })
    },
    getEventMovies: function() {
      axios({
        method: 'get',
        url: 'http://127.0.0.1:8000/movies/event/',
        headers: this.setToken()
      })
        .then(res => {
          this.eventMovies = res.data
        })
        .catch(err => {
          console.log(err)
        })
    },
    getRecommendMovies: function() {
      axios({
        method: 'get',
        url: 'http://127.0.0.1:8000/movies/recommend/',
        headers: this.setToken()
      })
        .then(res => {
          this.recommendMovies = res.data
        })
        .catch(err => {
          console.log(err)
        })
    },
    getLatestMovies: function() {
      axios({
        method: 'get',
        url: 'http://127.0.0.1:8000/movies/latest/',
        headers: this.setToken()
      })
        .then(res => {
          this.latestMovies = res.data
        })
        .catch(err => {
          console.log(err)
        })
    },
    getPopularityMovies: function() {
      axios({
        method: 'get',
        url: 'http://127.0.0.1:8000/movies/popularity/',
        headers: this.setToken()
      })
        .then(res => {
          this.popularityMovies = res.data
        })
        .catch(err => {
          console.log(err)
        })
    },
  },
    created: function () {
    this.getAllMovies()
    this.getEventMovies()
    this.getRecommendMovies()
    this.getLatestMovies()
    this.getPopularityMovies()
   }
}
</script>

<style>
  .bg-dark {
    background-color: var(--background-color);
  }
  .font-gold {
    color: var(--gold-color);
  }
  .movie-title {
    margin: 1rem;
    text-align: left; 
    text-decoration: underline;
    text-underline-position:under;
  }
</style>