<template>
  <div>
    <b-button 
      v-for="movie in movies"
      :key="movie.pk"  
      v-b-modal.modal-scrollable
    >
      {{ movie.title }}
    </b-button>

    <b-modal id="modal-scrollable" scrollable title="Scrollable Content">
      <p class="my-4" v-for="i in 20" :key="i">
        Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis
        in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
      </p>
    </b-modal>
  </div>
</template>

<script>
export default {
  name: 'MovieDetail',
  props: {
    movies: Object,
  }
}
</script>

<style>

</style>