<template>
  <div>
    <h1>Detail</h1>
    <p>제목: {{post.title}}</p>
    <p>내용: {{post.content}}</p>
    <p>작성날짜: {{post.created_at}}</p>
    <p>닉네임: {{post.username}}</p>
    <p>조회수: {{post.view_count}}</p>
    <button @click="deletePost">delete</button>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'PostDetail',
  data: function() {
    return {
      post : '',
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

    deletePost : function () {
      axios({
        method: 'delete',
        url: `http://127.0.0.1:8000/community/${this.post.id}/`,
        headers: this.setToken()
      })
        .then(() => {
          this.$router.push('/Community')
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  created : function() {
    axios({
      method: 'get',
      url: `http://127.0.0.1:8000/community/${this.$route.query.pk}/`,
      headers: this.setToken()
    })
      .then(res => {
        
        this.post = res.data
        const created = new Date(this.post.created_at)
        const timeDifference = new Date(Date.now())-created

        const diff_day = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60 * 24));
        const diff_hour = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const diff_minute = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));

        if (diff_day) {
          this.post.created_at = `${diff_day}일전`
        } else if(diff_hour) {
          this.post.created_at = `${diff_hour}시간전`
        } else {
          this.post.created_at = `${diff_minute}분전`
        }
        
      })
      .catch(err => {
        console.log(err)
      })
  }

}
</script>

<style>

</style>