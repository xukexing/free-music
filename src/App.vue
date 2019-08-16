<template>
  <div id="app">
      <Header></Header>
      <Nav></Nav>
      <transition appear
        enter-active-class="animated fadeInLeft"
        leave-active-class="animated fadeOutRight"
      >
        <router-view/>   
      </transition>
      
       <transition 
            mode="out-in"
            enter-active-class="animated fadeInUp"
            leave-active-class="animated fadeOutDown">
        <SongList></SongList>
      </transition>

      <Player></Player>
  </div>
</template>

<script>
import Header from './components/Header/Header'
import Nav from './components/Nav/Nav'
import Player from './components/Player/Player'
import SongList from './components/SongList/SongList'


export default {
  name: 'App',
  components:{
    Header,
    Nav,
    Player,
    SongList,
  }
}
</script>

<style lang="stylus" scoped>
  #app
    height 100% !important
</style>

