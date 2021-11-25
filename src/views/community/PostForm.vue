<template>
  <v-dialog
    transition="dialog-top-transition"
    max-width="1000"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        :class="{hide_button : !isCreate}"
        style=
        "
          background: var(--gold-color);
        "
        v-bind="attrs"
        v-on="on"
      >작성</v-btn>
      
      <v-btn
        :class="{hide_button : !identification}"
        style=
        "
          background: #4caf50; color: white;
        "
        v-bind="attrs"
        v-on="on"
      >UPDATE</v-btn>
    </template>
    <template v-slot:default="dialog">
      <v-card 
        style=
        "
          width: 1000px;
        "
      >
        <v-toolbar
          v-if="!identification"
          style="background: var(--background-color);"
          dark
        >POST CREATE
        </v-toolbar>
        <v-toolbar
          v-if="identification"
          style="background: var(--background-color);"
          dark
        >POST UPDATE
        </v-toolbar>
        <v-card-text style="background: var(--background-color);">
          <div class="form-container">
            <v-textarea
              label="제목을 입력하세요."
              auto-grow
              outlined
              rows="1"
              row-height="15"
              v-model.trim="title"
              dark
            ></v-textarea>
            <v-textarea
              outlined
              name=""
              label="내용을 입력하세요."
              v-model.trim="content"
              dark
            ></v-textarea>
            <div></div>
            <v-btn 
              @click="postCreate"
              :class="{hide_button : identification}"
              elevation="2"
            >
              작성
            </v-btn>
            <v-btn 
              :class="{hide_button : !identification}"
              @click="postUpdate"
              elevation="2"
            >
              수정
            </v-btn>
          </div>
        </v-card-text>
        <v-card-actions class="justify-end" style="background: var(--background-color);">
          <v-btn
            text
            @click="dialog.value = false"
            style="color: var(--white-color);"
          >Close</v-btn>
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>

<script>
import axios from 'axios'

export default {
  name:'PostForm',
  data: function() {
    return {
      title : '',
      content : '',
      id : '',
    }
  },
  props: {
    post : Object,
    identification : Boolean,
    isCreate : Boolean,
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
          url: 'https://jongil.click/community/',
          data: post,
          headers: this.setToken()
        })
          .then(res => {
            this.$router.push('/PostDetail?pk='+res.data.id)
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
          url: `https://jongil.click/community/${post.id}/`,
          data: post,
          headers: this.setToken()
        })
          .then(() => {
            // this.$router.push('/PostDetail?pk='+post.id)
            this.$router.push('/Community')
          })
          .catch(err => {
            console.log(err)
          })
      }
    }
    
  },
  created: function () {
    if (this.identification){
      this.title = this.post.title
      this.content = this.post.content
      this.id = this.post.id
    }
  }

}
</script>

<style>
  .hide_button {
    display: none;
  }

  .form-container {
    background: var(--background-color);
    padding: 30px;
    border: 1px solid var(--white-color);
  }
</style>