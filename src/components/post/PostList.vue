<template>

  <table>
    <tr>
      <th>제목</th>
      <th>글쓴이</th>
      <th>작성일자</th>
      <th>조회수</th>
    </tr>
    <tr
      v-for="post in posts"
      :key="post.id"
      @click="$router.push('/PostDetail?pk='+post.id)"
    >
      <td>{{post.title}}</td>
      <td>{{post.username}}</td>
      <td>{{post.created_at}}</td>
      <td>{{post.view_count}}</td>
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