<template>
  <div>
    <input 
    type="text" 
    v-model.trim="title"
    >
    <div></div>
    <textarea 
      cols="30" 
      rows="10"
      v-model.trim="content"
    >
    </textarea>
    <div></div>
    <button @click="postCreate">제출</button>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name:'PostForm',
  data: function() {
    return {
      title : null,
      content : null,
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

    postCreate : function() {
      const post = {
        title : this.title,
        content : this.content,
      }
      if (post.title && post.content) {
        axios({
          method:'post',
          url: 'http://127.0.0.1:8000/community/',
          data: post,
          headers: this.setToken()
        })
          .then(res => {
            console.log(res)
            this.$router.push({ name: 'Community' })
          })
          .catch(err => {
            console.log(err)
          })
      }
      
    }
  }

}
</script>

<style>

</style>