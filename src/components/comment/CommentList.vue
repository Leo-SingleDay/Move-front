<template>
  <div>
    <div
      style=
        "
          background: var(--background-color);
          display: flex;
          justify-content: space-between;
          align-items: center;
          color: white;
          height: 50px;
          padding: 10px;
        "
    >
      <div>제목: {{post.title}}</div>
      <div>
        <span>작성일: {{comment.created_at}}</span> | 
        <span>닉네임: {{comment.username}}</span> | 
        <button 
          style=
            "
              background: red;
              padding: 3px;
              border-radius: 3px;
            "
          v-if="comment.isSameUser"
          @click="commentDelete"
        >
          Del
        </button>
      </div>
    </div>
    <v-textarea
      auto-grow
      outlined
      rows="1"
      row-height="15"
      :value="comment.content"
      readonly
    ></v-textarea>
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