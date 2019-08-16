<template>
<div class="hotMV">
    <div class="info">
        <div class="top">
            <i class="icon-back" @click="$router.back()"></i>
            <p ref="info" v-text="$route.params.title"></p>
        </div>
        <video class="videos" loop="loop"  ref="vidoPic" height='260px' width="100%" autoplay='autoplay' :src="this.mvURL" controls="controls" :poster="$route.params.pic"></video>
    </div>
    <div  ref="songlist" class="song">
        <div class="songlist">
            <div class="list" @click="PlayMV(item,index)" v-for="(item,index) in MVlist" :key="item.vid">
                <div class="control">
                    <img :src="item.picurl" alt="">
                    <span class="icon-play-mini"></span>
                </div>
                <div>
                    <h2 v-text="item.title" ref="num" :class="{'current': currentLineNum===index}"></h2>
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
            MVlist:[],
            mvURL:'',
            nowinfo:null,
            currentLineNum:0,
        }
    },
    created() {
        //根据父组件点击传过来的id查找mv
        if(this.$route.params.vid){
            console.log('正在查找')
             axios.get(' https://v1.itooi.cn/tencent/mvUrl?id='+this.$route.params.vid+'&quality=480')
             .then(res=>{
                // console.log(res.config.url);
                this.mvURL=res.config.url;
                console.log('正在完毕')

            }).catch(err=>{
                console.log(err)
            })
        }else{
            this.$router.push('/home');
        }
    },
    mounted() {
        // console.log(this.$route.params.pic)
        this.scroll=new BScroll(this.$refs.songlist);
        axios.get('https://v1.itooi.cn/tencent/mv/hot?&pageSize=20&page=0')
                .then(res=>{
                    // console.log(res);
                    this.MVlist=res.data.data.list;
                })
                .catch(err=>{
                    console.log(err)
                });
    },
    methods: {
        //点击播放
        PlayMV(item,index){
            // this.$refs.vidoPic.pause();
            console.log('正在切换')
             axios.get(' https://v1.itooi.cn/tencent/mvUrl?id='+item.vid+'&quality=480')
             .then(res=>{
                console.log(res.config.url);
                this.mvURL=res.config.url;
                // axios.get('https://v1.itooi.cn/tencent/mv/hot?&pageSize=20&page=0')
                // .then(res=>{
                // console.log(res);
                let nowMV=this.MVlist.find(it=>it.vid==item.vid);
                this.$refs.info.innerHTML=nowMV.title;
                this.$refs.vidoPic.setAttribute('poster',nowMV.picurl);
                // this.$refs.vidoPic.play();
                // })
                // .catch(err=>{
                //     console.log(err)
                // })
                console.log('切换完毕')
            }).catch(err=>{
                console.log(err)
            })
            this.currentLineNum=index;
        }
    },
    
}
</script>
<style lang="stylus" scoped>
@import '~assets/stylus/variable.styl'
    .hotMV
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
            .videos
                position relative
                top 0.85rem
                z-index 250
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
            top 6.2rem
            bottom 0
            left 0
            right 0
            box-sizing border-box
            padding 0 0 0.2rem
            .songlist
                width 100%
                padding 0.2rem 0.5rem
                .list
                    padding 0.2rem 0
                    display flex
                    align-items center
                    .control
                        position relative
                        text-align center
                        img 
                            width 0.8rem
                            height 0.73rem
                            object-fit cover
                            margin-right 0.3rem
                        img:after
                            content ''
                            display block
                            height 100%
                            width 100%
                            background $background-dialog
                        span 
                            width 100%
                            height 100%
                            position absolute
                            left -0.14rem
                            top 0.2rem
                            font-size $font-size-xl
                            color $color-text-l
                    div
                        h2
                            font-size $font-size-m
                            color $color-text
                            line-height 0.4rem
                            width 6rem
                            overflow hidden
                            white-space nowrap
                            text-overflow ellipsis
                            $.current
                                color $theme-color
</style>