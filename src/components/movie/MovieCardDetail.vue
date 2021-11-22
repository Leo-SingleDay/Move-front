<template>
  <div>
    <b-button
      @click="getDetail"
    >
      {{movie.title}}
      moreinfo
    </b-button>

    <b-modal v-model="show" id="modal-scrollable" scrollable :title="movie.title">
      <button @click="like">
        <v-icon v-show="likeInfo.like" color="red">mdi-heart</v-icon>
        <v-icon v-show="!likeInfo.like" color="red">mdi-heart-outline</v-icon>
      </button>
      <span v-show="likeInfo.like">{{likeInfo.count}}</span>
      <span v-show="!likeInfo.like">{{countLike}}</span>
      

      <span class="my-4">
        <img :src="movie.poster_path" alt="poser-image">
        <h4>장르</h4>
        <span v-for="genre in movie.genres" :key="genre">{{ genre }} </span>
        <h4>개봉일</h4>
        <p>{{ movie.release_date }}</p>
        <h4>줄거리</h4>
        <p>{{ movie.overview }}</p>
      </span>
      <h4>리뷰</h4>
      <div 
        v-for="review in reviews" 
        :key="review.id"
      >
        <span> id: {{review.username}} 평점: {{review.rank}} {{review.content}} 
          <button @click="deleteReview">X</button>
        </span>
      </div>  
      <div>
        <h4>리뷰 작성</h4>
        <input v-model="content" >
        <input v-model="rank" type="number">
        <button @click="createReview">작성</button>
      </div>
      
    </b-modal>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'MovieCardDetail',
  props: {
    movie: Object
  },
  data: function () {
    return {
      show: false,
      content: null,
      rank: null,
      newContent: null,
      newRank: null,
      reviews: [],
      loginUser: null,
      likeInfo: {
        count: 0,
      },
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
         .then((res) => {
           res.data.isEdit = false
          //  console.log(res)
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
          // console.log(res)
          this.getReview()
        })
        .catch(err => {
          console.log(err)
        })
    },
    getDetail: function () {
      this.show = true
      this.getReview()
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