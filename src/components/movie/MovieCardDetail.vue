<template>
  <div>

    <b-modal id="modal-scrollable" scrollable :title="movie.title">
      <p class="my-4">
        {{ movie.overview }}
      </p>
    </b-modal>
  </div>
</template>

<script>
export default {
  name: 'MovieCardDetail',
  props: {
    movie: Object
  },

}
</script>

<style>

</style>