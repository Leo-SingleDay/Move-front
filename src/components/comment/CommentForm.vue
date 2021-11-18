<template>
  <div>
    <textarea 
      cols="30" 
      rows="10"
      v-model.trim="content"
      >
      
    </textarea>
    <button
      @click="commentCreate"
    >
    작성</button>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'CommentForm',
  data: function() {
    return {
      content : null,
    }
  },
  props: {
    post : Object,
  },
  methods: {
    setToken: function () {
      const token = localStorage.getItem('jwt')
      const config = {
        Authorization: `JWT ${token}`
      }
      return config
    },

    commentCreate : function () {
      const comment = {
        content : this.content,
      }
      axios({
        method: 'post',
        url: `http://127.0.0.1:8000/community/${this.post.id}/comments/`,
        data: comment,
        headers: this.setToken()
      })
        .then(() => {
          this.content = null
        })
    }
  }

}
</script>

<style>

</style>