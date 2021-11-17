<template>
  <div>
    <p 
      v-for="movie in movies"
      :key="movie.pk"  
    >
      {{movie.title}}
    </p>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'movies',
  data: function () {
    return {
      movies : [],
    }
  },
  methods: {
    getMovies: function() {
      axios({
        method: 'get',
        url: 'http://127.0.0.1:8000/movies/',
      })
        .then(res => {
          this.movies = res.data
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  created: function () {
    this.getMovies()
  }
}
</script>

<style>

</style>