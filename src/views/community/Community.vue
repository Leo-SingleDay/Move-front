<template>
  <div>
    <header>
      <h1 class="title2">COMMUNITY</h1>
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

.title2 {
  color : var(--gold-color);
  font-weight: 600;
  letter-spacing: 0.05em;
}
</style>