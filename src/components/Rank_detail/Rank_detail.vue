<template>
<div class="detail">
    <div class="info">
        <div class="bg" ref="bg">
        </div>
        <div class="top">
            <i class="icon-back" @click="$router.back()"></i>
            <span v-text="$route.params.title"></span>
        </div>
        <div class="bottom">
            <i class="icon-play"></i>
            <span>随机播放全部</span>
        </div>
    </div>
    <div  ref="songlist" class="song">
        <div class="songlist">
            <div class="list" @click="TopPlayList(item)" v-for="(item,index) in RankSongList" :key="item.id">
                <span v-text="index+1"></span>
                <div>
                    <h2 v-text="item.name"></h2>
                    <p  v-text="item.singer"></p>
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
            RankSongList:[]
        }
    },
    created() {
        Indicator.open('Loading...');
        if(this.$route.params.id){
             axios.get('https://v1.itooi.cn/tencent/topList?id='+this.$route.params.id+'&pageSize=20&page=0&format=1')
             .then(res=>{
            console.log(res.data.data);
                this.RankSongList=res.data.data;
                Indicator.close();
            }).catch(err=>{
                console.log(err)
            })
        }else{
            this.$router.push('/rank');
        }
    },
    mounted() {
        this.$refs.bg.style.backgroundImage='url('+this.$route.params.pic+')';
        // console.log(this.$route.params.pic)
        this.scroll=new BScroll(this.$refs.songlist)
    },
    methods: {
        //歌曲列表的点击，加入播放列表
        ...mapActions(['TopPlayList']),
    },
}
</script>
<style lang="stylus" scoped>
@import '~assets/stylus/variable.styl'
    .detail
        position fixed
        top 0
        left 0
        bottom 0
        right 0
        z-index 100
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
                span
                    display block 
                    margin-right 0.44rem
                    flex 1
                    text-align center
                    font-size $font-size-xl
                    color $color-text
            
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


