<template>
  <div id="app">
    <vue-typer
      :text='["Wanna see a MOVIE?","Move to M O V E !"]'
      :repeat='Infinity'
      :shuffle='true'
      initial-action='typing'
      :pre-type-delay='200'
      :type-delay='175'
      :pre-erase-delay='2000'
      :erase-delay='150'
      erase-style='select-all'
      :erase-on-complete='false'
      caret-animation='blink'
    ></vue-typer>
  </div>
</template>

<script>

export default {

};
</script>
<style>
.vue-typer {
  font-family: Copperplate, 'Copperplate Gothic Light', fantasy;
}

.vue-typer .custom.char.typed {
  color: #607D8B;
}
.vue-typer .custom.char.selected {
  color: #607D8B;
  background-color: transparent;
  text-decoration: line-through;
}

.vue-typer .custom.caret {
  display: none;
}
</style>