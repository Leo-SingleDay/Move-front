<template>
  <div>
    <v-textarea
      label="댓글 작성"
      auto-grow
      outlined
      rows="1"
      row-height="15"
      v-model.trim="content"
      
    >
    </v-textarea>
    <v-btn
      style="display: inline-block"
      elevation ="2"
      @click="commentCreate"
    >
      작성
    </v-btn>
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
        url: `https://jongil.click/community/${this.post.id}/comments/`,
        data: comment,
        headers: this.setToken()
      })
        .then(() => {
          this.content = null
          this.$emit("createComment")
        })
    }
  }

}
</script>

<style>

</style>