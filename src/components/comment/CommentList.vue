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
      <div>닉네임: {{comment.username}}</div>
      <div>
        <span>작성일: {{comment.created_at}}</span> | 
        <v-icon 
          style=
            "
              color:red;
            "
          v-if="comment.isSameUser"
          @click="commentDelete"
        >
          {{trashIcon}}
        </v-icon>
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
import { mdiTrashCan } from '@mdi/js';

export default {
  name: 'CommentList',
  props: {
    comment : Object,
    post : Object,
  },
  data: function () {
    return {
      trashIcon : mdiTrashCan,

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