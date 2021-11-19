<template>
  <div>
    <div>
      <h1>Detail</h1>
      <p>제목: {{post.title}}</p>
      <p>내용: {{post.content}}</p>
      <p>작성날짜: {{post.created_at}}</p>
      <p>닉네임: {{post.username}}</p>
      <p>조회수: {{post.view_count}}</p>
      <v-btn 
        @click="deletePost"
        :class="{hide_button : identification}"
        elevation="2"
      >
        delete
      </v-btn>
      <v-btn 
        @click="$router.push({name: 'PostForm', params: {post: post}})"
        :class="{hide_button : identification}"
        elevation="2"
      >
      update
      </v-btn>
    </div>
    <div>
      <comment-form
        :post="post"
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
  </div>
</template>

<script>
import axios from 'axios'
import CommentForm from '../../components/comment/CommentForm.vue'
import CommentList from '../../components/comment/CommentList.vue'

export default {
  name: 'PostDetail',
  components: {
    CommentForm,
    CommentList
  },
  data: function() {
    return {
      post : '',
      identification : true,
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
            this.identification = false
          }

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
    },
    loadComment : function() {
      this.comments = this.comments.map(comment=> {
        const created = new Date(comment.created_at)
        const timeDifference = new Date(Date.now())-created

        const diff_day = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60 * 24));
        const diff_hour = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const diff_minute = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));

        let diff = ''
        if (diff_day) {
          diff = `${diff_day}일전`
        } else if(diff_hour) {
          diff = `${diff_hour}시간전`
        } else {
          diff = `${diff_minute}분전`
        }
        return {
          ...comment,
          created_at : diff
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