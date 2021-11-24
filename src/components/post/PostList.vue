<template>  
  <v-card 
    class="card" 
    style=
    "
      background : var(--gray-color);
    ">
    <v-card-title style="border-bottom : 1px solid white">
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
        color="var(--gold-color)"
        dark
      ></v-text-field>
      <v-spacer></v-spacer>
      <post-form :isCreate="true"></post-form>
    </v-card-title>
    <v-data-table
      :headers="headers"
      :items="posts"
      @click:row="goDetail"
      :items-per-page="10"
      :search="search"
      dark
      style=
      "
        background : var(--gray-color)
      "
      class="row-pointer"
    >
    </v-data-table>
  </v-card>
</template>

<script>

import axios from 'axios'
import PostForm from '../../views/community/PostForm.vue'
export default {
  name:'PostList',
  data: function() {
    return {
      search : '',
      posts: [],
      headers: [
        { text:'제목', value:'title', sortable: true},
        { text:'글쓴이', value:'username', sortable: true},
        { text:'작성일자', value:'created_at', sortable: true},
        { text:'조회수', value:'view_count', sortable: true},
      ]
    }
  },
  components : {
    PostForm,
  },
  methods: {
    goDetail : function(value) {
      this.$router.push('/PostDetail?pk='+value.id)
    },
    setToken: function () {
      const token = localStorage.getItem('jwt')
      const config = {
        Authorization: `JWT ${token}`
      }
      return config
    },

    getPosts: function () {
      axios({
        method: 'get',
        url: 'http://18.116.47.173/community/',
        headers: this.setToken()

      })
        .then(res=> {
          this.posts = res.data
          this.posts = this.posts.map(post=> {
            const created = new Date(post.created_at)
            const seconds = (new Date()-created)/1000

            const minutes = Math.floor(seconds / 60)
            const hours = Math.floor(minutes / 60)
            const days = Math.floor(hours / 24)

            let result = ''
            if (seconds < 60) {
              result = '방금 전'
            } else if (minutes < 60) {
              result = minutes + "분 전"
            } else if (hours < 24) {
              result = hours + "시간 전"
            } else {
              result = days + "일 전"
            }
            return {
              ...post,
              created_at : result
            }
          })
          
        })
    },
  },
  created: function() {
    this.getPosts()
  }

}
</script>

<style>
  .card {
    background : var(--background-color)
  }
  .row-pointer > .v-data-table__wrapper > table > tbody > tr:hover {  
    cursor: pointer;
  }
</style>