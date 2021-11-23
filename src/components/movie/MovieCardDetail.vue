<template>
  <v-row justify="center">
    <v-dialog
      v-model="dialog"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-img
          v-bind="attrs"
          v-on="on"
          class="white--text align-end"
          :src="movie.poster_path"
          max-height="450"
          max-width="300"
        >
        </v-img>
      </template>
      <v-card>
        <v-toolbar
          dark
          color="primary"
        >
          <v-btn
            icon
            dark
            @click="dialog = false"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>{{ movie.title }}</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn
              dark
              text
              @click="dialog = false"
            >
              OK
            </v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <v-list
          three-line
          subheader
        >
          <button @click="like">
            <v-icon v-show="likeInfo.like" color="red">mdi-heart</v-icon>
            <v-icon v-show="!likeInfo.like" color="red">mdi-heart-outline</v-icon>
          </button>
          <span v-show="likeInfo.like">{{likeInfo.count}}</span>
          <span v-show="!likeInfo.like">{{likeInfo.count}}</span>
          <v-divider></v-divider>
          <img :src="movie.poster_path" alt="poser-image">
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>장르</v-list-item-title>
              <v-list-item-subtitle v-for="genre in movie.genres" :key="genre">{{ genre }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>개봉일</v-list-item-title>
              <v-list-item-subtitle>{{ movie.release_date }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>줄거리</v-list-item-title>
              <v-list-item-subtitle>{{ movie.overview }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>  
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>리뷰</v-list-item-title>
              <div 
                v-for="review in reviews" 
                :key="review.id"
              >
                <span> 
                  <v-rating
                    :value="review.rank"
                    icon-label="custom icon label text {0} of {1}"
                    readonly
                  >
                  </v-rating>
                  {{review.username}} {{review.content}} 
                  <button @click="deleteReview"><v-icon>mdi-close</v-icon></button>
                  <v-divider></v-divider>
                </span>
              </div>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>리뷰작성</v-list-item-title>
              <v-text-field
                v-model.trim="content"
                label="세글자 이상 작성해주세요!!"
                :rules="rules"
                hide-details="auto"
              ></v-text-field>
              <v-rating
                v-model.trim="rank"
                icon-label="custom icon label text {0} of {1}"
              ></v-rating>
              <button @click="createReview">작성</button>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import axios from 'axios'

export default {
  name: 'MovieCardDetail',
  props: {
    movie: Object,
  },
  data: function () {
    return {
      show: false,
      content: null,
      rank: 3,
      rules: [
        value => !!value || 'Required.',
        value => (value && value.length >= 3) || 'Min 3 characters',
      ],
      reviews: [],
      loginUser: null,
      likeInfo: {
      },
      dialog: false,
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
    like: function () {
      axios({
        method: 'post',
        url: `http://127.0.0.1:8000/movies/${this.movie.id}/like/`,
        headers: this.setToken()
      })
        .then(res => {
          this.likeInfo = res.data
        })
        .catch(err => {
          console.log(err)
        })
    },
    getLike: function () {
      axios({
        method: 'get',
        url: `http://127.0.0.1:8000/movies/${this.movie.id}/like/`,
        headers: this.setToken()
      })
        .then(res => {
          this.likeInfo = res.data
        })
        .catch(err => {
          console.log(err)
        })
    },
    getReview: function () {
      axios({
        method: 'get',
        url: `http://127.0.0.1:8000/movies/${this.movie.id}/reviews/`,
        headers: this.setToken()
      })
        .then(res => {
          this.reviews = res.data
        })
        .catch(err => {
          console.log(err)
        })
    },
    createReview: function () {
      const reviewItem = {
        content: this.content,
        rank: this.rank,
      }
      if (reviewItem.content) {
        
        axios({
         method: 'post',
         url: `http://127.0.0.1:8000/movies/${this.movie.id}/reviews/`,
         data: reviewItem,
         headers: this.setToken()
       })
         .then(() => {
           this.content = null
           this.rank = 3
           this.getReview()
         })
         .catch(err => {
           console.log(err)
         })
      }
    },
    deleteReview: function () {
      axios({
        method: 'delete',
        url: `http://127.0.0.1:8000/movies/reviews/${this.reviews[0].id}/`,
        headers: this.setToken()
      })
        .then(() => {
          this.getReview()
        })
        .catch(err => {
          console.log(err)
        })
    },
    getDetail: function () {
      this.show = true
      this.getReview()
      this.getLike()
    },
  },
  computed: {
    countLike: function () {
      return this.movie.like_users.length
    },
  },
}
</script>

<style>

</style>