<template>
      <swiper class="swiper" :options="swiperOption">
        <swiper-slide 
          v-for="movie in movies"
          :key="movie.id"
          :style="{'background-image': 'url('+ movie.poster_path +')'}"
        >
          
           
              <event-detail :movie="movie"></event-detail>
           
          
        </swiper-slide>
        <div class="swiper-pagination swiper-pagination-white" slot="pagination"></div>
        <div class="swiper-button-prev swiper-button-white" slot="button-prev"></div>
        <div class="swiper-button-next swiper-button-white" slot="button-next"></div>
      </swiper>
  
</template>

<script>
  import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
  import 'swiper/css/swiper.css'
  import EventDetail from '@/components/movie/EventDetail.vue'

  export default {
    name: 'EventMovieList',
    title: 'Fade effect',
    components: {
      Swiper,
      SwiperSlide,
      EventDetail
    },
    props: {
      movies: Array
    },
    data() {
      return {
        swiperOption: {
          spaceBetween: 30,
          effect: 'fade',
          pagination: {
            el: '.swiper-pagination',
            clickable: true
          },
          autoplay: {
            delay: 3000,
            disableOnInteraction: false
          },
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
          }
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import './base.scss';
  .swiper {
    height: 500px;
    .swiper-slide {
      background-position: center;
      background-size: 1150px 550px;
    }
  }
</style>