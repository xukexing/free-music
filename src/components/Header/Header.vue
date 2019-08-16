<template>
  <div class="header">
      <h1 class="iconfont icon-yinle"><span>FreeMusic</span></h1>
      <span class="icon-mine"></span>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="stylus" scoped>
@import '~assets/stylus/variable.styl'
@import '../../assets/fonts/iconfont_logo/iconfont.css'
.header 
  position relative
  height 0.88rem
  text-align center
  color $theme-color
  display flex
  justify-content space-between
  align-items center
  padding 0 0.3rem
  font-size $font-size-xl
  .icon-yinle
    font-size $font-size-xxl
    font-weight bold
    span
      font-size $font-size-xl
      margin-left 0.2rem
      font-weight normal
</style>
