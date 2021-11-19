<template>  
  <v-card>
    <v-card-title>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
      <v-spacer></v-spacer>
      <v-btn
        elevation="2"
        @click="$router.push('/postForm')"
      >
        작성
      </v-btn>
    </v-card-title>
    <v-data-table
      class="grey darken-2"
      :headers="headers"
      :items="posts"
      @click:row="goDetail"
      :items-per-page="5"
      :search="search"
      dark
    >
    </v-data-table>
  </v-card>
</template>

<script>

import axios from 'axios'
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
        url: 'http://127.0.0.1:8000/community/',
        headers: this.setToken()

      })
        .then(res=> {
          this.posts = res.data
          this.posts = this.posts.map(post=> {
            const created = new Date(post.created_at)
            const timeDifference = new Date(Date.now())-created

            const diff_day = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60 * 24));
            const diff_hour = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const diff_minute = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));

            let diff = ''
            if (diff_day) {
              diff = `${diff_day}일전`
            } else if(diff_hour) {
              diff = `${diff_hour}시간전`
            } else {
              diff = `${diff_minute}분전`
            }
            return {
              ...post,
              created_at : diff
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

</style>