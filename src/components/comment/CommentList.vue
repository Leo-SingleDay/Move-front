<template>
  <div>
    <p>내용 : {{comment.content}}</p>
    <p>작성일: {{comment.created_at}}</p>
    <p>닉네임: {{comment.username}}</p>
    <button 
      v-if="comment.isSameUser"
      @click="commentDelete"
    >
      Del
    </button>
    <hr>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'CommentList',
  props: {
    comment : Object,
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

    commentDelete : function () {
      axios({
        method: 'delete',
        url: `http://127.0.0.1:8000/community/${this.post.id}/comments/${this.comment.id}/`,
        headers: this.setToken()
      })
        .then(() => {
          this.$emit("deleteComment")
        })
    },
  },
  created: function() {

  }
}
</script>

<style>

</style>