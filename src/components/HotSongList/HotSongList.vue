<template>
<div class="hotsonglist">
    <div class="info">
        <div class="bg" ref="bg">
        </div>
        <div class="top">
            <i class="icon-back" @click="$router.back()"></i>
            <p v-text="$route.params.title"></p>
        </div>
        <div class="bottom">
            <i class="icon-play"></i>
            <span>随机播放全部</span>
        </div>
    </div>
    <div  ref="songlist" class="song">
        <div class="songlist">
            <div class="list" @click="HomePlayList(item)" v-for="(item,index) in HotSongList" :key="item.id">
                <span v-text="index+1"></span>
                <div>
                    <h2 v-text="item.name"></h2>
                    <p  v-text="item.singer[0].name"></p>
                </div>
            </div>
        </div>
    </div> 
</div>
</template>
<script>
import axios from 'axios'
import BScroll from 'better-scroll'
import { mapActions } from 'vuex'
import { Indicator } from 'mint-ui'

export default {
    data() {
        return {
            HotSongList:[]
        }
    },
    created() {
        Indicator.open('Loading...');
        //根据父组件点击传过来的id查找歌曲列表
        if(this.$route.params.id){
             axios.get('https://v1.itooi.cn/tencent/songList?id='+this.$route.params.id+'&pageSize=100&page=0')
             .then(res=>{
                // console.log(res.data.data[0].songlist);
                this.HotSongList=res.data.data[0].songlist;
                //拉取完毕关闭load
                Indicator.close();
            }).catch(err=>{
                console.log(err)
            })
        }else{
            this.$router.push('/home');
        }
    },
    mounted() {
        this.$refs.bg.style.backgroundImage='url('+this.$route.params.pic+')';
        // console.log(this.$route.params.pic)
        this.scroll=new BScroll(this.$refs.songlist)
    },
    methods: {
        //歌曲列表的点击，加入播放列表
        ...mapActions(['HomePlayList']),
    },
}
</script>
<style lang="stylus" scoped>
@import '~assets/stylus/variable.styl'
    .hotsonglist
        position fixed
        top 0
        left 0
        bottom 0
        right 0
        z-index 10
        background $background
        .info
            height 0
            width 100%
            padding-bottom 70%
            position relative
            .bg
                width 100%
                height 100%
                position absolute
                z-index 5
                transform-origin top
                background-size cover
                background-image url('//y.gtimg.cn/music/photo_new/T001R300x300M000001fNHEf1SFEFN.jpg?max_age=2592000')
            .bg::after
                content ''
                height 100%
                width 100%
                display block
                background rgba(7,17,27,0.2)
            .top
                position absolute
                z-index 6
                box-sizing border-box
                padding 0.3rem 
                width 100%
                display flex
                align-items center
                .icon-back
                    font-size $font-size-xxl
                    color $theme-color
                p
                    display block 
                    margin-right 0.44rem
                    flex 1
                    text-align center
                    font-size $font-size-xl
                    color $color-text
                    overflow hidden
                    white-space nowrap
                    text-overflow ellipsis
            .bottom
                position absolute
                z-index 6
                bottom 0.4rem
                border 1px solid $theme-color
                border-radius 0.76rem
                padding 0.15rem 
                box-sizing border-box
                width 40%
                left:30%
                margin 0 auto
                display flex
                align-items center 
                justify-content center 
                background $theme-color
                .icon-play
                    font-size $font-size-xl
                    color $color-text
                    font-weight bold
                    margin-right 0.1rem
                span 
                    font-size $font-size-s
                    color $color-text
        .song
            position absolute
            overflow hidden
            height 7.4rem
            top 5.5rem
            bottom 0
            left 0
            right 0
            .songlist
                width 100%
                padding 0.2rem 0.5rem
                .list
                    padding 0.2rem 0
                    display flex
                    align-items center
                    span 
                        font-size $font-size-xxl
                        color $color-text-m
                        margin-right 0.3rem
                    span:nth-of-type(1){
                        color $theme-color                       
                    }
                    div
                        h2
                            font-size $font-size-m
                            color $color-text
                            line-height 0.4rem
                            width 7rem
                            overflow hidden
                            white-space nowrap
                            text-overflow ellipsis
                        p
                            font-size $font-size-m
                            color $color-text-m
                            line-height 0.6rem
</style>


