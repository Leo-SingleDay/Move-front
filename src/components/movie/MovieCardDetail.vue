<template>
  <div>
    <b-button
      @click="getDetail"
    >
      {{movie.title}}
      moreinfo
    </b-button>

    <b-modal v-model="show" id="modal-scrollable" scrollable :title="movie.title">
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
  data: function () {
    return {
      show: false
    }
  },
  methods: {
    getDetail: function () {
      this.show = true
    }
  }

}
</script>

<style>

</style>