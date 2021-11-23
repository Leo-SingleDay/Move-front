<template>
  <!-- 로그인상태일 경우 nav바 -->
  <v-app v-if="isLogin">
    <v-app-bar
      app
      class="app-bar"
      dark
      style="
        border-bottom: 1px solid var(--gold-color);
        background: var(--background-color);
      "
    >
      <v-app-bar-nav-icon></v-app-bar-nav-icon>
      <v-toolbar-title>M O V E !</v-toolbar-title>
      <v-spacer></v-spacer>
      <div id="nav">
        <span v-if="isLogin"> 
          <router-link to="/movies">Movies</router-link> |  
          <router-link to="/community">Community</router-link> |  
          <router-link @click.native="logout" to="#">Logout</router-link>
        </span>
        <span v-else>
          <router-link to="/login">Login</router-link> |
          <router-link to="/signup">Signup</router-link>
        </span>
        
      </div>
      
    </v-app-bar>
    <hr>

    <v-main>
      <v-container grid-list-md>
        <sign-up></sign-up>
        <router-view 
        @login="isLogin=true"
      />
      </v-container>
    </v-main>

    <v-footer app>
      
    </v-footer>
  </v-app>
  <!-- 로그인 아닐경우 인덱스화면 보여주기 -->
  <v-app v-else id="app" style="background: none">
    <v-main>
      <v-container grid-list-md>
        <router-view
        @login="isLogin=true"
      />
      </v-container>
    </v-main>
  </v-app>
</template>



<script>
import video from '../src/assets/film_065___4K_res.mp4'

export default {
  name: '',
  components : {

  },
  data: function () {
    return {
      isLogin: false,
      video: video,
    }
  },
  methods: {
    logout: function () {
      this.isLogin = false
      localStorage.removeItem('jwt')
      this.$router.push({ name: 'Intro' })
    }
  },
  created: function () {
    const token = localStorage.getItem('jwt')

    if (token) {
      this.isLogin = true
    }
  }
}
</script>

<style>
:root {
  --gold-color: rgb(255, 200, 75);
  --background-color: rgb(34, 40, 49);
  --white-color: rgb(238, 238, 238);
  --gray-color: rgb(75, 85, 99);
  /* 컬러 속성 쓰는법 :
  color : var(--background-color) */
}

#app {
  font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: var(--white-color);
  background: var(--background-color);
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: gray;
  margin-right: 10px;
  margin-left: 10px;
}

#nav a.router-link-exact-active {
  color: white;
}

.title_letter {
  color : var(--gold-color);
  font-weight: 600;
  letter-spacing: 0.05em;
  margin-bottom : 40px;
}
</style>
