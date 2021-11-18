<template>
  <div>
  
    <movie-detail :movies="movies"></movie-detail>
    <!-- <p 
      v-for="movie in movies"
      :key="movie.pk"  
    >
      {{movie.title}}
      
      
    </p> -->
  </div>
</template>

<script>
import axios from 'axios'
import MovieDetail from '@/components/movie/MovieDetail.vue'

export default {
  components: { MovieDetail },
  name: 'movies',
  component: {
    MovieDetail,
  },
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