<template>
<div class="wrapper" ref="wrapper">
    <div>
        <mt-loadmore :top-method="loadTop"  ref="loadmore">
            <mt-swipe :auto="4000">
                <mt-swipe-item v-for="item in swiperList" :key="item.id">
                    <img :src="item.picUrl" alt="">
                </mt-swipe-item>
            </mt-swipe>
            <div class="hotMVlist">
                <h2>热门MV推荐</h2>
                <div class="mvWarp">
                    <div class="MV" v-for="item in hotMVlist" :key="item.mvid">
                        <router-link :to="{name:'HotMV',params:{
                                vid:item.vid,
                                title:item.title,
                                pic:item.picurl}}">
                            <img :src="item.picurl" alt="">
                            <div class="MVcontent">
                                <p v-text="item.title"></p>
                            </div>
                        </router-link>
                    </div>
                </div>
                
            </div>
            <div class="hotlist">
                <h2>热门歌单推荐</h2>
                <div class="song" v-for="item in hotList" :key="item.id">
                    <router-link :to="{name:'HotSongList',params:{
                            id:item.id,
                            title:item.songListDesc,
                            pic:item.picUrl}}">
                        <img :src="item.picUrl" alt="">
                        <div class="content">
                            <h3 v-text="item.songListAuthor"></h3>
                            <p v-text="item.songListDesc"></p>
                        </div>
                    </router-link>
                </div>
            </div>
        </mt-loadmore>
    </div>
    <transition name="slide">
        <router-view></router-view>
    </transition>
</div>
</template>
<script>
import axios from 'axios'
import BScroll from 'better-scroll'
export default {
    data:function(){
        return {
            swiperList:[],
            hotList:[],
            hotMVlist:[]
        }
    },
    created() {
        this.updataMsg()
    },
    mounted() {
        this.scroll=new BScroll(this.$refs.wrapper);
        axios.get('https://v1.itooi.cn/tencent/mv/hot?&pageSize=6&page=0')
        .then(res=>{
            // console.log(res.data.data.list);
            this.hotMVlist=res.data.data.list;
        })
        .catch(err=>{
            console.log(err)
        })
    },
    methods: {
        loadTop() {
            this.updataMsg()
            this.$refs.loadmore.onTopLoaded();
        },
        updataMsg() {
            axios.get('/swiper/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg',{
            params:{
                _: 1560142856347,
                g_tk: 5381,
                uin: 0,
                format: 'json',
                inCharset: 'utf-8',
                outCharset: 'utf-8',
                notice: 0,
                platform: 'h5',
                needNewCode: 1
            }
            })
            .then(res=>{
                // console.log(res.data.data)
                this.swiperList=res.data.data.slider
                this.hotList=res.data.data.songList
            })
            .catch(err=>{
                console.log(err)
                
            })
        }
    },  
}
</script>
<style lang="stylus" scoped>
@import '~assets/stylus/variable.styl'
    .wrapper
        overflow hidden
        position absolute
        top 1.75rem
        height 11rem
        bottom 0
        left 0
        right 0
        .mint-swipe
            height 0
            padding-bottom 40%
            .mint-swipe-items-wrap
                height 100%
                .mint-swipe-item
                    height 100%
                    img
                        height 100%
        .hotlist
            padding 0 0.3rem
            h2
                text-align center
                color $theme-color
                font-size $font-size-l
                line-height 1rem
            .song
                display flex
                padding 0.16rem 0
                a
                    img
                        display block
                        float left
                        width 1.2rem
                        height 1.2rem
                    .content
                        float left
                        padding-left 0.3rem
                        display flex
                        flex-direction column
                        justify-content  center
                        h3
                            color $color-text
                            font-size $font-size-m
                        p
                            color $color-text-s
                            font-size $font-size-m
                            line-height 0.7rem
        .hotMVlist
            padding 0 0.3rem
            h2
                text-align center
                color $theme-color
                font-size $font-size-l
                line-height 1rem
            .mvWarp
                display flex
                flex-wrap wrap
                padding 0.1rem 0 
                .MV
                    width 46%
                    margin 0.1rem 0.2rem 0.2rem
                    background $background-light
                    a
                        display flex
                        flex-direction column
                        color $color-text-l
                        img
                            display block
                            float left
                            width 100%
                            height 1.7rem
                            object-fit cover
                            border-radius 0 0.2 rem 0 0
                        .MVcontent
                            margin-top 0.1rem
                            width 3.2rem
                            float left
                            display flex
                            flex-direction column
                            justify-content  center
                            P
                                color $color-text-l
                                font-size $font-size-m
                                line-height 0.36rem
                                width 100%
                                display block
                                box-sizing border-box
                                overflow hidden
                                text-overflow ellipsis
                                display -webkit-box
                                -webkit-box-orient vertical
                                -webkit-line-clamp 2
                                padding 0.06rem 0.2rem
                .MV:nth-of-type(2n-1)
                    margin-left 0
                .MV:nth-of-type(2n)
                    margin-right 0
    .slide-enter-active,.slide-leave-active
        transition all 0.3s
    .slide-enter,.slide-leave-to
        transform translate3d(100%,0,0)


</style>

