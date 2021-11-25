<template>
  <div>
    <header>
      <h1 class="title_letter">COMMUNITY</h1>
    </header>
    <div>
      <template>
        <v-card>
          <v-toolbar
            style="background: var(--gray-color);"
            dark
          ><span>제목: {{post.title}}</span>
          </v-toolbar>
          <v-card-text style="background: var(--white-color);">
            <div
              v-if="post !== null"
            >
              <v-spacer></v-spacer>
              <div class="post_info_container">
                <span style="">작성날짜: {{post.created_at}}</span> |
                <span style="">닉네임: {{post.username}}</span> |
                <span>조회수: {{post.view_count}}</span>
              </div>
              <v-textarea
                readonly
                outlined
                name="input-7-4"
                label="글 내용"
                :value="post.content"
              ></v-textarea>
              
              <div></div>
              <post-form
                v-if="post !== null" :post="post"
                :identification="identification"
              ></post-form>
              <v-btn 
                @click="deletePost"
                :class="{hide_button : !identification}"
                elevation="2"
                style="background: #ff5252; color:white; margin-left: 15px;"
              >
                DELETE
              </v-btn>
            </div>
            <hr>
            
          </v-card-text>
        </v-card>
        <br><br>
        <v-card>
          <v-toolbar
            style="background: var(--gray-color);"
            dark
          ><span>댓글</span>
          </v-toolbar>
          <v-card-text style="background: var(--white-color);">
            <div>
              <comment-form
                style="margin-top: 30px;"
                v-if="post !== null" :post="post"
                @createComment="loadPost"
              >
              </comment-form>
              <br>
              <comment-list
                v-for="comment in comments"
                :key="comment.id"
                :comment="comment"
                :post="post"
                @deleteComment="loadPost"
              >
              </comment-list>
            </div>
          </v-card-text>
        </v-card>
      </template>
    </div>
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
        url: `https://jongil.click/community/${this.post.id}/`,
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
        url: `https://jongil.click/community/${this.$route.query.pk}/`,
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
          } else if (hours < 24) {
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
        } else if (hours < 24) {
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

  .post_info_container {
    text-align: right;
    margin-top: 20px;
    margin-bottom: 20px;
  }
</style>