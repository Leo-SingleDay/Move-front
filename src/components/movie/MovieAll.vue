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
        >
          <v-img
            class="white--text align-end"
            height="70%"
            :src="movie.poster_path"
          >
            <v-card-title>Top 10 Australian beaches</v-card-title>
          </v-img>

          <v-card-subtitle class="pb-0">
            Number 10
          </v-card-subtitle>

          <v-card-text class="text--primary">
            <div>Whitehaven Beach</div>

            <div>Whitsunday Island, Whitsunday Islands</div>
          </v-card-text>

          <v-card-actions>
            <movie-card-detail :movie="movie"></movie-card-detail>
          </v-card-actions>
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
    MovieCardDetail
  },
  props: {
    movies: Array,
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