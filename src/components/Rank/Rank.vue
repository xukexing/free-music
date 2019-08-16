<template>
<div ref="BsScroll" class="rank">
    <div class="ranklist">
        <div class="TopChild" v-for="item in rankList" :key="item.id">
           <router-link :to="{name:'Rank_detail',params:{
                            id:item.id,
                            title:item.topTitle,
                            pic:item.picUrl}}">
                <img :src="item.picUrl" alt="">
                <div class="toplist">
                    <p v-for=" (val,index) in item.songList" :key="index">
                        <span v-text="index+1">num</span> 
                        <span v-text="val.songname">歌曲名</span>
                        <small v-text="val.singername">歌手名</small>
                    </p>   
                </div> 
            </router-link>
        </div>
    </div> 
    <transition name="slide">
        <router-view></router-view>
    </transition>
</div>
</template>
<script>
import axios from 'axios'
import { Indicator } from 'mint-ui'
import BScroll from 'better-scroll'

export default {
    data() {
        return {
            rankList:[]
        }
    },
    created() {
        axios.get('/swiper/v8/fcg-bin/fcg_myqq_toplist.fcg',{
            params:{
                _: 1560942261090,
                g_tk: 5381,
                uin: 0,
                format: 'json',
                inCharset: 'utf-8',
                outCharset: 'utf-8',
                notice: 0,
                platform: 'h5',
                needNewCode: 1,
            }
        }).then(res=>{
            console.log(res.data.data.topList);
            this.rankList=res.data.data.topList;
            this.scroll=new BScroll(this.$refs.BsScroll);
        }).catch(err=>{
            console.log(err)
        })
    },
}
</script>
<style lang="stylus" scoped>
@import '~assets/stylus/variable.styl'

.rank
    height 11rem
    width 100%
    overflow hidden
    .ranklist
        margin 0.3rem
        .TopChild
            height 2rem
            width 100%
            margin 0.3rem 0
            background $background-light
            a
                display flex
                img 
                    height 2rem
                    width 2rem
                    object-fit cover
                .toplist
                    display flex
                    flex-direction column
                    justify-content center
                    box-sizing border-box
                    padding-left 0.3rem
                    p
                        width 4.6rem
                        overflow hidden
                        white-space nowrap
                        text-overflow ellipsis
                        line-height 0.5rem
                        span 
                            font-size $font-size-m
                            color $color-text-l
                        span:nth-of-type(1)
                            color $color-text-m
                            margin-right 0.1rem
                        small 
                            font-size $font-size-s
                            color $color-text-m
    .slide-enter-active,.slide-leave-active
        transition all 0.3s
    .slide-enter,.slide-leave-to
        transform translate3d(100%,0,0)
</style>

