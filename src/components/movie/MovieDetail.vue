<template>
  <div>
     <span 
        v-for="movie in movies"
        :key="movie.id"
      >
        <movie-card-detail :movie="movie"></movie-card-detail>
      </span>
     
  </div>
</template>

<script>
import MovieCardDetail from '@/components/movie/MovieCardDetail.vue'
export default {
  name: 'MovieDetail',
  components: {
    MovieCardDetail
  },
  props: {
    movies: Object,
  },
  data: function () {
    return {
      show: false
    }
  },
  methods: {
    getDetail: function () {
      this.show = true
    }
  }
}
</script>

<style>

</style>