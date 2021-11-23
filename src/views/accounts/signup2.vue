<template>
  <div>
    <header>
      <h1 class="title_letter">COMMUNITY</h1>
    </header>
    <div
        
      >
      <template>
        <v-card 
          style=
          "
            width: 1000px;
          "
        >
          <v-toolbar
            style="background: var(--background-color);"
            dark
          >POST DETAIL
          </v-toolbar>
          <v-card-text style="background: var(--white-color);">
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
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'Login',
	data: function() {
    return {
      credentials: {
        username: '',
        password: '',
      },
      show1: false,
      valid: true,
      rules : {
        required: value => !!value || 'Required.',
        min: v => v.length >= 6 || 'Min 6 characters',
      },
    }
  },
	methods: {
		login: function () {
      axios({
        method: 'post',
        url: 'http://127.0.0.1:8000/accounts/api-token-auth/',
        data: this.credentials,
      })
        .then(res => {
          console.log(res)
          localStorage.setItem('jwt', res.data.token)
          this.$emit('login')
          this.$router.push({ name: 'Community'})
          this.$router.go()
        })
        .catch(() => {
          this.credentials.username = ''
          this.credentials.password = ''
          alert('회원정보를 다시 확인해주세요.')
        })
    }
	},
}
</script>