<template>
  <div>
    <header>
      <h1>Community</h1>
      <p>글쓰기</p>
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

</style>