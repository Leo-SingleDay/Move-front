<template>
      <div>
        <v-row>
            <v-col
              v-for="movie in movies"
              :key="movie.id"
              class="d-flex child-flex"
              cols="4"
            >
              <v-card
                class="mx-auto"
                max-width="300"
                max-height="400"
                color= var(--background-color)
              >
              <movie-card-detail :movie="movie"></movie-card-detail>
                 
              </v-card>
            </v-col>
        </v-row>
      </div>
</template>

<script>
import MovieCardDetail from '@/components/movie/MovieCardDetail.vue'

export default {
  name: 'MovieAll',
  components: {
    MovieCardDetail,
  },
  props: {
    movies: Array,
  },
  data: function () {
    return {
      show: false,
      overlay: false,
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