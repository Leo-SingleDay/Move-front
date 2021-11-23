<template>
	<div>
		<div class="center2">
      <vue-typer
        :text='["Wanna see a Movie?","  Move to M O V E ! "]'
        :repeat='Infinity'
        :shuffle='false'
        initial-action='typing'
        :pre-type-delay='70'
        :type-delay='70'
        :pre-erase-delay='2000'
        :erase-delay='40'
        erase-style='backspace'
        :erase-on-complete='true'
        caret-animation='blink'
      ></vue-typer>
    </div>
    <div id="indexBtn" class="center">
			<signup></signup>
      |
			<login></login>
    </div>
    <div class="video-background">
      <div class="video-foreground">
        <video muted autoplay loop id="back_video">
          <source :src="video" type="video/mp4">
        </video>
      </div>
    </div>
    <div class="video-film"></div>
	</div>
</template>

<script>
import video from '../../../src/assets/film_065___4K_res.mp4'
import Signup from '../accounts/Signup.vue'
import Login from '../accounts/Login.vue'

export default {
  name: '',
  components : {
		Signup,
		Login
  },
  data: function () {
    return {
      video: video,
    }
  },
}
</script>

<style>
* {
	box-sizing: border-box;
}

.video-film {
	box-shadow: rgba(0, 7, 15, 0.7) 0 0 0 9999px;
	z-index: 100;
}

.video-background {
	background: #000;
	position: fixed;
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;
	z-index: -99;
}

.video-foreground, .video-background video {
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	pointer-events: none;
}

@media ( min-aspect-ratio : 16/9) {
	.video-foreground {
		height: 300%;
		top: -100%;
	}
}

@media ( max-aspect-ratio : 16/9) {
	.video-foreground {
		width: 300%;
		left: -100%;
	}
}

#visual-btn {
	margin: auto;
	z-index: 50;
	color: #fff;
	font-size: 20px;
	border: 2px solid #fff;
  width: 120px;
	padding: 12px 24px;
	border-radius: 5px;
	cursor: pointer;
	background-color: rgba(0, 0, 0, 0);
}

#visual-btn:hover {
	color: var(--gold-color);
	border: 2px solid var(--gold-color);
}

#indexBtn {
	position: fixed;
	text-align: center
}

.center {
	justify-content: center;
	position: absolute;
	top: 80%;
	left: 45%;
	margin: -50px 0 0 -50px;
}

.center2 {
  position: fixed;
	top: 60%;
	left: 39%;
	margin: -10px 0 0 -10px;
}

/* vue typer */
.vue-typer {
  font-family: Copperplate, 'Copperplate Gothic Light', fantasy;
  font-size: 30pt;
}

.vue-typer .custom.char.typed {
  color: white;
}
.vue-typer .custom.char.selected {
  color: white;
  background-color: transparent;
  text-decoration: line-through;
}

.vue-typer .custom.caret {
  display: none;
}
</style>