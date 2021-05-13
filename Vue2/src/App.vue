<template>
    <div id="app">
        <router-view/>
    </div>
</template>

<script>
  // import HelloWorld from"./components/HelloWorld.Vue";
  export default {
    name: 'App',
  }

</script>

<style>
    #app {

        font-family: 'Avenir', Helvetica, Arial, sans-serif;

        /*开启字体抗锯齿属性*/
        -webkit-font-smoothing: antialiased; /*Chrome，Safari*/
        -moz-osx-font-smoothing: grayscale; /*Firefox*/
        text-align: center;
        width: 100%;
        height: 100%;
    }

    * {
        margin: 0;
        padding: 0;
    }

    html, body, div, span, h1, h2, h3 {
        margin: 0;
        padding: 0;
        border: 0;
        overscroll-behavior-y: contain;
    }

</style>
