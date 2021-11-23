<template>
  <v-row justify="center">
    <v-dialog
      v-model="dialog"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-img
          v-bind="attrs"
          v-on="on"
          class="white--text align-end"
          :src="movie.poster_path"
          max-height="550"
          max-width="1150"
        >
        </v-img>
      </template>
      <v-card>
        <v-toolbar
          dark
          color= var(--gray-color)
        >
          <v-btn
            icon
            dark
            @click="dialog = false"
          >
            <v-icon color = var(--gold-color)>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>{{ movie.title }}</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn
              dark
              text
              @click="dialog = false"
              color = var(--gold-color)
            >
              OK
            </v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <v-list style="background-color: var(--background-color);"
          three-line
          subheader
          dark
        >
          <iframe width="900" height="600" :src="movie.video_path" frameborder="0"></iframe>
          <v-divider></v-divider>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>장르</v-list-item-title>
              <v-list-item-subtitle v-for="genre in movie.genres" :key="genre">{{ genre }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>개봉일</v-list-item-title>
              <v-list-item-subtitle>{{ movie.release_date }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>줄거리</v-list-item-title>
              <v-list-item-subtitle><pre>{{ movie.overview }}</pre></v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  name: 'EventDetail',
  props: {
    movie: Object,
  },
  data: function () {
     return {
       dialog: false,
     }
     
  }
}
</script>

<style>
pre {
    color: var(--white-color);
}
</style>