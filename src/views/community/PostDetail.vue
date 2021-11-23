<template>
  <div
    
  >
    <header>
      <h1 class="title_letter">COMMUNITY</h1>
    </header>
    <section
      style="border: 1px solid white"
    >
      <div
        v-if="post !== null"
      >
        <span>제목: {{post.title}}</span>
        <v-spacer></v-spacer>
        <span>내용: {{post.content}}</span>
        <span>작성날짜: {{post.created_at}}</span>
        <span>닉네임: {{post.username}}</span>
          <span>조회수: {{post.view_count}}</span>
        <v-btn 
          @click="deletePost"
          :class="{hide_button : !identification}"
          elevation="2"
        >
          delete
        </v-btn>
        <post-form
          v-if="post !== null" :post="post"
          :identification="identification"
        ></post-form>
      </div>
      <div>
        <comment-form
          v-if="post !== null" :post="post"
          @createComment="loadPost"
        >
        </comment-form>
        <h2>Comment</h2>
        <comment-list
          v-for="comment in comments"
          :key="comment.id"
          :comment="comment"
          :post="post"
          @deleteComment="loadPost"
        >
        </comment-list>
      </div>
    </section>
  </div>
</template>

<script>
import axios from 'axios'
import CommentForm from '../../components/comment/CommentForm.vue'
import CommentList from '../../components/comment/CommentList.vue'
import PostForm from './PostForm.vue'

export default {
  name: 'PostDetail',
  components: {
    CommentForm,
    CommentList,
    PostForm,
  },
  data: function() {
    return {
      post : null,
      identification : false,
      comments : [],
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
    },
    loadPost : function () {
      axios({
        method: 'get',
        url: `http://127.0.0.1:8000/community/${this.$route.query.pk}/`,
        headers: this.setToken()
      })
        .then(res => {
          this.comments = res.data.comments
          this.loadComment()
          this.post = res.data.data
          if (res.data.isSameUser) {
            this.identification = true
          }
          const created = new Date(this.post.created_at)
          const seconds = (new Date()-created)/1000
          const minutes = Math.floor(seconds / 60)
          const hours = Math.floor(minutes / 60)
          const days = Math.floor(hours / 24)

          let result = ''
          if (seconds < 60) {
            result = '방금 전'
          } else if (minutes < 60) {
            result = minutes + "분 전"
          } else if (hours < 60) {
            result = hours + "시간 전"
          } else {
            result = days + "일 전"
          }
          this.post.created_at = result
          

        })
        .catch(err => {
          console.log(err)
        })
    },
    loadComment : function() {
      this.comments = this.comments.map(comment=> {
        const created = new Date(comment.created_at)
        const seconds = (new Date()-created)/1000

        const minutes = Math.floor(seconds / 60)
        const hours = Math.floor(minutes / 60)
        const days = Math.floor(hours / 24)

        let result = ''
        if (seconds < 60) {
          result = '방금 전'
        } else if (minutes < 60) {
          result = minutes + "분 전"
        } else if (hours < 60) {
          result = hours + "시간 전"
        } else {
          result = days + "일 전"
        }
        return {
          ...comment,
          created_at : result
        }
      })
    },

  },
  created : function() {
    this.loadPost()
  }

}
</script>

<style>
  .hide_button {
    display: none;
  }
</style>