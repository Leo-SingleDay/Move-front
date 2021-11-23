<template>
  <div>
    
        <swiper 
          class="swiper" 
          :options="swiperOption"
        >
          <swiper-slide 
            v-for="movie in movies"
            :key="movie.id"
            
          >
           <!-- :style="{'background-image': 'url('+ movie.poster_path +')'}" -->
              <movie-card-detail :movie="movie"></movie-card-detail>
        
            
          </swiper-slide>
          
          <div class="swiper-pagination swiper-pagination-white" slot="pagination"></div>
          <div class="swiper-button-prev swiper-button-white" slot="button-prev"></div>
          <div class="swiper-button-next swiper-button-white" slot="button-next"></div>
        </swiper>
  </div> 
</template>

<script>
  import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
  import 'swiper/css/swiper.css'
  import MovieCardDetail from '@/components/movie/MovieCardDetail'

  export default {
    name: 'swiper-example-fade-effect',
    title: 'Fade effect',
    components: {
      Swiper,
      SwiperSlide,
      MovieCardDetail
    },
    props: {
    movies: Array
    },
        data() {
      return {
        swiperOption: {
          effect: 'coverflow',
          grabCursor: true,
          centeredSlides: true,
          slidesPerView: 'auto',
          coverflowEffect: {
            rotate: 50,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows : true
          },
          pagination: {
            el: '.swiper-pagination'
          }
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .example-3d {
    width: 100%;
    height: 450px;
    padding-top: 50px;
    padding-bottom: 50px;
  }
  .swiper {
    height: 100%;
    width: 100%;
    .swiper-slide {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 300px;
      height: 300px;
      text-align: center;
      font-weight: bold;
      font-size: 20px;
      background-color: var(--background-color);
      background-position: center;
      background-size: 400px 300px;
      color: white;
    }
    .swiper-pagination {
      .swiper-pagination-bullet.swiper-pagination-bullet-active {
        background-color: white;
      }
    }
  }
</style>
