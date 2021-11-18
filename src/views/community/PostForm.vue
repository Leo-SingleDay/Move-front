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
    <button 
      @click="postCreate"
      :class="{hide_button : !identification}"  
    >만들기</button>
    <button 
      :class="{hide_button : identification}"
      @click="postUpdate"
    >수정하기</button>
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
      identification : true,
      id : null,
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
    },
    postUpdate : function() {
      const post = {
        id : this.id,
        title : this.title,
        content : this.content
      }
      if (post.title && post.content) {
        axios({
          method:'put',
          url: `http://127.0.0.1:8000/community/${post.id}/`,
          data: post,
          headers: this.setToken()
        })
          .then(() => {
            this.$router.push('/PostDetail?pk='+post.id)
          })
          .catch(err => {
            console.log(err)
          })
      }
    }
    
  },
  created: function () {
    
    if (this.$route.params.post){
      this.title = this.$route.params.post.title
      this.content = this.$route.params.post.content
      this.id = this.$route.params.post.id
      this.identification = false
    }
  }

}
</script>

<style>
  .hide_button {
    display: none;
  }
</style>