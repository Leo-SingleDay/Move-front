<template>

  <table>
    <tr
      v-for="post in posts"
      :key="post.id"
      :post="post"
    >
      <td>{{post.title}}</td>
      <td>{{post.created_at}}</td>
      <td>{{post.username}}</td>
      <td></td>
      
    </tr>
  </table>
</template>

<script>

import axios from 'axios'
export default {
  name:'PostList',
  data: function() {
    return {
      posts: [],
    }
  },
  methods: {
    getPosts: function () {
      axios({
        method: 'get',
        url: 'http://127.0.0.1:8000/community/',

      })
        .then(res=> {
          console.log(res)
          this.posts = res.data
        })
    }
  },
  created: function() {
    this.getPosts()
  }

}
</script>

<style>

</style>