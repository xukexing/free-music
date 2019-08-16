<template>
<div class="nav">
    <router-link to="/home/"><span>推荐</span></router-link>
    <router-link to="/singer/"><span>歌手</span></router-link>
    <router-link to="/rank/"><span>排行</span></router-link>
    <router-link to="/search/"><span>搜索</span></router-link>
</div>
</template>
<script>
export default {
    
}
</script>
<style lang="stylus" scoped>
@import '~assets/stylus/variable.styl'
  .nav
    display flex
    justify-content space-between
    padding 0 0.6rem 0.2rem 
    font-size $font-size-l
    line-height 0.7rem
    a
      color $color-text-s
    .router-link-active 
      border-bottom 2px solid $theme-color
      color $theme-color

</style>

