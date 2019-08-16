<template>
<div class="detail">
    <div class="info">
        <div class="bg" ref="bg">
        </div>
        <div class="top">
            <i class="icon-back" @click="$router.back()"></i>
            <span v-text="$route.params.singer_name"></span>
        </div>
        <div class="bottom">
            <i class="icon-play"></i>
            <span>随机播放全部</span>
        </div>
    </div>
    <div  ref="songlist" class="song">
        <div class="songlist">
            <div class="list" @click="addPlayList(item)" v-for="item in songList" :key="item.mid">
                <h2 v-text="item.musicData.songname"></h2>
                <p  v-text="item.musicData.albumname"></p>
            </div>
        </div>
    </div> 
</div>
</template>
<script>
import axios from 'axios'
import BScroll from 'better-scroll'
import { mapActions } from 'vuex'

export default {
    data(){
        return{
            songList:[]
        }
    },
    mounted() {
        this.$refs.bg.style.backgroundImage='url('+this.$route.params.singer_pic+')';
        this.scroll=new BScroll(this.$refs.songlist)
    },
    created() {
        if(this.$route.params.singer_mid){
            // axios.get('/singer/cgi-bin/musicu.fcg',{
            // params:{
            //     '-': 'getUCGI9951872358712928',
            //     g_tk: 5381,
            //     loginUin: 0,
            //     hostUin: 0,
            //     format: 'json',
            //     inCharset: 'utf8',
            //     outCharset: 'utf-8',
            //     notice: 0,
            //     platform: 'yqq.json',
            //     needNewCode: 0,
            //     data: {"comm":{"ct":24,"cv":0},
            //     "singer":{"method":"get_singer_detail_info",
            //     "param":{"sort":5,"singermid":this.$route.params.singer_mid,"sin":0,"num":10},
            //     "module":"music.web_singer_info_svr"}}
            //     }
            // })
            // .then(res=>{
            //     // console.log(res.data.singer.data.songlist)
            //     this.songList=res.data.singer.data.songlist
            // })
            // .catch(err=>{
            //     console.log(err)
            // })
        axios.get('https://v1.itooi.cn/tencent/song/artist?id='+this.$route.params.singer_mid).then(res=>{
            console.log(this.$route.params.singer_mid);
            console.log(res);
                this.songList=res.data.data
        }).catch(err=>{ 
            console.log(err);
        })
        }else{
            this.$router.push('/singer');
        } 
    },
    methods: {
        //歌曲列表的点击，加入播放列表
        ...mapActions(['addPlayList']),
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
                background rgba(7,17,27,0.5)
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
                .icon-play
                    font-size $font-size-xl
                    color $theme-color
                    font-weight bold
                    margin-right 0.1rem
                span 
                    font-size $font-size-s
                    color $theme-color
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
                    h2
                        font-size $font-size-m
                        color $color-text
                        line-height 0.4rem
                    p
                        font-size $font-size-m
                        color $color-text-m
                        line-height 0.6rem
</style>


