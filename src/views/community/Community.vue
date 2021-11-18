<template>
  <div>
    <header>
      <h1>Community</h1>
      <button><router-link to="/postForm">글쓰기</router-link></button>
    </header>
    <section>
      <post-list></post-list>
    </section>
  </div>
</template>

<script>
import PostList from '../../components/post/PostList.vue'

export default {
  name: 'Community',
  components: {
    PostList,
  },
  
}
</script>

<style>
button a {
  font-weight: bold;
  color: black;
}
</style>