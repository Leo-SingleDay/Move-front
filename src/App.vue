
<template>
  <v-app>
    <v-app-bar
      app
      color="grey darken-2 accent-4"
      dense
      dark
    >
    <v-app-bar-nav-icon></v-app-bar-nav-icon>
    <v-toolbar-title>Page title</v-toolbar-title>
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
    <v-main>

      <v-container grid-list-md>
        <router-view 
        @login="isLogin=true"
      />
      </v-container>
    </v-main>

    <v-footer app>
      
    </v-footer>
  </v-app>
</template>



<script>
export default {
  name: 'App',
  data: function () {
    return {
      isLogin: false,
    }
  },
  methods: {
    logout: function () {
      this.isLogin = false
      localStorage.removeItem('jwt')
      this.$router.push({ name: 'Login' })
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
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: gray;
}

#nav a.router-link-exact-active {
  color: white;
}
</style>
