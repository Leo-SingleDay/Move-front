<template>
  <v-expansion-panels
    dark
  >
    <v-expansion-panel>
      <v-expansion-panel-header>
        Like Movies
      </v-expansion-panel-header>
      <v-expansion-panel-content>
        <span v-for="movie in likeMovies" :key="movie.id">
          <img 
            :src="movie.poster_path" 
            alt="poster_image"
            width="100rem"
          >
            {{movie.title}}
        </span>
        
      </v-expansion-panel-content>
    </v-expansion-panel>
    <v-expansion-panel>
      <v-expansion-panel-header>
        Like Genres
      </v-expansion-panel-header>
      
      <v-expansion-panel-content>
        <v-simple-table>
          <thead>
            <tr>
              <th class="text-left">
                Genre
              </th>
              <th class="text-left">
                Num
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(num, genre) in likeGenres"
              :key="genre"
            >
              <td>{{ genre }}</td>
              <td>{{ num }}</td>
            </tr>
          </tbody>
        </v-simple-table>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
</template>
<script>
import axios from 'axios'

export default {
  name: 'Profile',
  data: function () {
    return {
      likeGenres: [],
      likeMovies: [],      
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
    getLikeGenres: function() {
      axios({
        method: 'get',
        url: 'https://jongil.click/movies/like-genres/',
        headers: this.setToken()
      })
        .then(res => {
          this.likeGenres = res.data
        })
        .catch(err => {
          console.log(err)
        })
    },
    getLikeMovies: function() {
      axios({
        method: 'get',
        url: 'https://jongil.click/movies/like-movies/',
        headers: this.setToken()
      })
        .then(res => {
          this.likeMovies = res.data
        })
        .catch(err => {
          console.log(err)
        })
    },
  },
  created: function () {
    this.getLikeMovies()
    this.getLikeGenres()
  }
}
</script>

<style>

</style>