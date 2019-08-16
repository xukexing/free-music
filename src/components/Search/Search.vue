<template>
<div class="search_warp">
   <div class="search">
      <div class="searVal">
         <span class="icon-search"></span>
         <input type="text" ref="inputVal" @focus="focusInput" @keyup="deleShow" v-model="valu" name="sear" placeholder="搜索歌曲、歌单、专辑">
         <i class="icon-delete" :class="deleteBtnShow" @click="clearContent"></i>
      </div>
      <span :class="clearShow" @click="quxiao" >取消</span>
   </div>
   <div class="hotSearch">
      <h2>热门搜索</h2>
      <span v-for="item in hostSearch" @click="changeInputValue(item.k)" v-text="item.k" :key="item.n">歌曲</span>
   </div>
   <div class="hostory"  ref="hostory" :class="historyShows">
      <h3 v-for="item in searchData" :key="item.index">
         <span class="iconfont icon-yinle"></span>
         <span v-text="item.songname" @click="SearchAddplaylist(item)">内容</span>
         <span class="icon-play-mini"></span>
      </h3>
   </div>
</div>
</template>
<script>
import { mapState ,mapGetters, mapActions} from 'vuex'
import axios from 'axios'

export default {
    data() {
       return {
          //输入框内容的清空的按钮显示
         deleteBtnShow:'delete_hide',
          //输入框内容的清空
          searchDeteleShow:false,
          //搜索框右边取消的显示
          clearShow:'hide',
          //搜索历史显示
          historyShows:'history_hide',
          //输入值
          valu:'',
          //热门搜索list
          hostSearch:[],
          //搜索到的data
          searchData:[],
       }
    },
    mounted() {
       axios.get('/swiper/splcloud/fcgi-bin/gethotkey.fcg')
       .then(res=>{
         //  console.log(res.data.data.hotkey);
          this.hostSearch=res.data.data.hotkey.slice(0,9);
       })
       .catch(err=>{
          console.log(err);
       })
    },
    methods: {
        ...mapActions(['SearchAddplaylist']),
        //获取焦点，右侧取消按钮显示 搜索列表清空 准备下次所以结果数据承载
       focusInput(){
         this.clearShow='show';
         this.searchData=[];
       },
       //右侧取消按钮点击  ->按钮隐藏 、数据承载列表隐藏 、 搜索列表清空准备下次所以结果数据承载
       quxiao(){
         this.clearShow='hide';
         this.historyShows='history_hide';
         this.searchData=[];
       },
       deleShow(){
          this.deleteBtnShow='delete_show';       
       },
       //清空输入框内容同时再次获取焦点 ，
       clearContent(){
          this.valu="";
          this.$refs.inputVal.focus();
          //清除按钮隐藏
          this.deleteBtnShow='delete_hide';
          //用来承载数据列表隐藏
         this.historyShows='history_hide';
       },
       changeInputValue(val){
          this.valu=val;
       }
    },
    watch: {
       //监听输入框输入，输入改变一次就获取一次数据并加入searchData数组中
       valu(){
          if(this.valu.length){
             axios.get('https://v1.itooi.cn/tencent/search?keyword='+this.valu+'&type=song&pageSize=8&page=0')
            .then(res=>{
               // console.log(res.data.data.list);
               this.searchData=res.data.data.list;
               //搜索结果的列表显示承载数据
               this.historyShows='history_show';
               //输入框内清除按钮显示
               this.deleteBtnShow='delete_show';
               //右侧取消按钮显示
               this.clearShow='show';
            })
            .catch(err=>{
               // this.$refs.hostory.innerhtml("暂无结果");
            })
          }
       }
    },
}
</script>
<style lang="stylus" scoped>
@import '~assets/stylus/variable.styl'
@import '../../assets/fonts/iconfont_logo/iconfont.css'
.search_warp
   box-sizing border-box
   padding 0.3rem 0.4rem
   position relative 
   .search
         display flex 
         justify-content space-between
         align-items center     
      .searVal
         flex 1
         height 0.7rem
         display flex
         position relative
         .icon-search
            font-size $font-size-xxl
            display block
            border 1px solid $background
            background $color-text-l
            border-right none 
            height 100%
            width 0.7rem
            text-align center
            line-height 0.7rem
            color $background-dialog
            border-radius 0.1rem 0 0 0.1rem
         input 
            flex 1
            height 100%
            font-size $font-size-s
            border 1px solid $background
            border-left none
            border-right none
            background $color-text-l
            border-radius 0 0.1rem 0.1rem 0
         .icon-delete
            position absolute
            right 0
            font-size $font-size-xs
            display block
            border 1px solid $background
            border-left none 
            height 100%
            width 0.7rem
            text-align center
            line-height 0.7rem
            color $background-dialog
            border-radius 0 0.1rem 0.1rem 0
            &.delete_hide
               display none
            &.delete_show
               display inline
      span
         font-size $font-size-m
         margin-left 0.1rem
         color $color-text-l
         &.hide
            display none
         &.show
            display inline
   .hotSearch
      margin-top 0.5rem
      text-align center
      h2
         font-size $font-size-s
         font-weight bold
         color $color-text-m
         margin-bottom 0.3rem
         text-align left
         padding-left 0.2rem
      span 
         display inline-block
         padding 0 0.3rem
         line-height 0.48rem
         background $color-text-s
         border-radius 0.24rem
         font-size $color-text-l
         color $color-text-l
         margin 0 0.15rem 0.1rem
   .hostory 
      background $background-light
      color $color-text-l
      position absolute
      transition all 1s
      top 1.3rem
      left 5%
      bottom 0
      right 0
      height 0
      overflow hidden
      width 90%
      border-radius 0.2rem
      &.history_hide
         height 0
      &.history_show
         height 6rem
      h3
         margin 0 0.2rem
         display flex
         justify-content space-between
         align-items center
         line-height 0.6rem
         span 
            font-size $font-size-m
            color $color-text-s
         span:nth-of-type(2)
            display inline-block
            flex 1
            color $color-text-m
         span:nth-of-type(1)
            font-size $font-size-l
            margin-right 0.2rem
      h3:nth-of-type(1)
         margin-top 0.3rem
</style>

