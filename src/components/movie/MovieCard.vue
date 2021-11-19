<template>
  <div>
    <b-carousel
      class="carousel-height hc"
      id="carousel-1"
      v-model="slide"
      :interval="4000"
      controls
      indicators
      background="#ababab"
      img-width="1024"
      img-height="480"
      style="text-shadow: 1px 1px 2px #333;"
      @sliding-start="onSlideStart"
      @sliding-end="onSlideEnd"
    >
      <span 
        v-for="movie in movies"
        :key="movie.id"
      >
        <b-carousel-slide
          :img-src="movie.poster_path"
        >
        <movie-card-detail :movie="movie"></movie-card-detail>
        </b-carousel-slide>   
      </span>
     </b-carousel>
  </div> 
</template>

<script>
import MovieCardDetail from '@/components/movie/MovieCardDetail.vue'

export default {
  name: 'MovieCard',
  components: {
    MovieCardDetail
  },
  data: function () {
    return {
      slide: 0,
      sliding: null
    }
  },
  props: {
    movies: Array,
  },
  methods: {
      onSlideStart() {
        this.sliding = true
      },
      onSlideEnd() {
        this.sliding = false
      }
  }
}
</script>

<style>
.carousel-height {
   height:300px;
   /* width: 20%; */
 }
.hc {
  width:200px;
  left:0;
  right:0;
  margin-left:auto;
  margin-right:auto;
}


</style>