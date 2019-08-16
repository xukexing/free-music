<template>
    <div class="player" v-if="playList.length">
        <transition 
            mode="out-in"
            enter-active-class="animated fadeInUp"
            leave-active-class="animated fadeOutDown">
                <div class="normal" v-show="fullScreen">
                    <img class="bg"  :src="currentSong.songPic" alt="">
                    <div class="top">
                        <i class="icon-back" @click="toggleScreen"></i>
                        <div class="normal_info">
                            <h2 v-text="currentSong.songInfo.musicData.songname">歌曲名</h2>
                            <h3 v-text="currentSong.songInfo.musicData.singer[0].name">歌手</h3>
                        </div>
                    </div>
                    <div class="main">
                        <mt-swipe :auto="0">
                            <mt-swipe-item>
                                <div class="normal_pic">
                                    <img :class="cdClass" :src="currentSong.songPic" alt="">
                                </div>
                                <div class="lyric">
                                    <h3 v-text="currentLineTxt">lyric</h3>
                                </div>
                            </mt-swipe-item>
                            <mt-swipe-item>
                                <div class="bscroll" ref="bscroll">
                                    <div class="r_lyric" v-if='currentLyric'>
                                        <p ref="nowLyric" class="txts" :class="{'current': currentLineNum===index}" v-for="(val,index) in currentLyric.lines" :key="index" v-text="val.txt"></p>
                                    </div>
                                </div>
                            </mt-swipe-item>
                        </mt-swipe>
                    </div>
                   
                    <div class="control">
                        <div class="progress">
                            <span v-text="format(currentTime)">0:00</span>
                            <mt-range @input="rangeInput" @change="rangeChange" v-model="rangeValue"></mt-range>
                            <span v-text="format(duration)">4:35</span>
                        </div>
                        <div class="btns">
                            <i @click="changeMode" :class="iconMode"></i>
                            <i class="icon-prev" @click="prev" :class="disableClass"></i>
                            <i :class="playIcon" @click.stop="togglePlaying" ></i>
                            <i class="icon-next" @click="next" :class="disableClass"></i>
                            <i class="icon-not-favorite"></i>
                        </div>
                    </div>
                </div>
        </transition>
        
        <transition
            enter-active-class="animated fadeInUp"
            leave-active-class="animated fadeOutDown">
                <div class="small" v-show="!fullScreen" @click="toggleScreen">
                    <div class="img">
                        <img :class="cdClass"  :src="currentSong.songPic" alt="">
                    </div>
                    <div class="mini_info">
                        <h2 v-text="currentSong.songInfo.musicData.songname">歌名</h2>
                        <h2 v-text="currentSong.songInfo.musicData.singer[0].name">歌手</h2>
                    </div>
                    <div class="mini_control">
                        <i :class="playIconMini"  @click.stop="togglePlaying"></i>
                        <canvas width="30" height="30" class="mini_progress" ref="mini_progress"></canvas>
                        <i class="icon-playlist" @click.stop="chongSongListShow"></i>
                    </div>
                </div>
        </transition>
        <!-- 自带事件 timeupdate：视频音频正在播放  canplay：视频音频准备完毕 -->
        <audio ref="audio" @timeupdate='updatetime' @canplay='ready' @error="error" :src="currentSong.songUrl" autoplay="autoplay"></audio>
    </div> 
</template>

<script>
import { mapState,mapGetters } from 'vuex'
import { UPDATA_SCREEN ,CHANGE_SONGLIST,UPDATA_PLAYING,UPDATA_CURRENTINDEX,UPDATA_PLAYING_BOOL,UPDATA_MODE,UPDATA_SEQUENCE,RANDOM_LIST} from '../../store/mutations-types'
import { playMode } from '@/store/configer'
import lyric from 'lyric-parser'
import BScroll from 'better-scroll'

export default {
    data() {
        return {
            //播放进度
            rangeValue:0,
            //表示当前歌曲是否准备好
            songReady:false,
            //当前播放时间
            currentTime:0,
            //当前歌曲总时长
            duration:0,
            //存放被各式化的歌词
            currentLyric:[],
            //当前播放歌曲行数
            currentLineNum:0,
            //当前播放歌词的内容
            currentLineTxt:'',
            //存放bs返回对象
            scroll:null
        }
    },
    computed: {
        ...mapState(['fullScreen','playList','rePlayList','playing','currentIndex','mode']),
        ...mapGetters(['currentSong']),
        //控制全屏播放、暂停icon
        playIcon(){
            return this.playing? 'icon-pause' : 'icon-play'
        },
         //控制mini播放、暂停icon
        playIconMini(){
            return this.playing? 'icon-pause-mini' : 'icon-play-mini'
        },
        //控制图片旋转
        cdClass(){
            return this.playing ? 'play' : 'play pause'
        },
        disableClass(){
            return this.songReady ? '' : false;
        },
        //根据播放模式更换图标
        iconMode(){
            return this.mode==0 ? 'icon-sequence' : this.mode==1 ? 'icon-loop' : 'icon-random' ;
        }
    },
    mounted() {
        
    },
    methods: {
        //显示或隐藏播放列表
        chongSongListShow(){
            this.$store.commit(CHANGE_SONGLIST)
        },
        //格式化歌词nowLyric
        getLyric(){
            if(this.playList.length){
                 if(this.currentSong.songLyric){
                    console.log("获取歌词成功")
                    this.currentLyric=new lyric(this.currentSong.songLyric,this.handlerLyric);
                    // console.log(this.currentLyric);
                    //歌在播放 歌词也应该播放
                    if(this.playing){
                        console.log("歌词播放")
                        this.currentLyric.play();
                    }
                }else{
                    //****没有歌词
                    this.currentLyric=null;
                    currentLineNum=0;
                }
            }
        },
        //格式化歌词回调
        handlerLyric(str){
            // console.log("歌词回调设置播放位置")
            // console.log(str)
            this.currentLineNum=str.lineNum;
            this.currentLineTxt=str.txt;
            // console.log(this.currentLineNum);
            // console.log(str.txt)
            if(str.lineNum>5){
                //找到当前正在播放的p
                let lineEl=this.$refs.nowLyric[str.lineNum-6];
                //让BS滚动到当前p元素
                this.scroll.scrollToElement(lineEl,1000)
            }else{
                this.scroll.scrollTo(0,0,1000);
            }
        },
        //修改播放器（全屏、迷你）
        toggleScreen(){
            this.$store.commit(UPDATA_SCREEN)
        },
        //修改播放状态
        togglePlaying(){
            if(!this.songReady){
                return
            }
            this.$store.commit(UPDATA_PLAYING);
            if(this.currentLyric){
                this.currentLyric.togglePlay();
            }
        },
        //上一曲
        prev(){
            if(!this.songReady){
                return
            }
            if(this.playList.length==1){
                this.$refs.audio.load();
                //歌词停止
                if(this.currentLyric){
                    this.currentLyric.stop();
                }
                this.getLyric()
            }else{
                let index=this.currentIndex - 1;
                if(index==-1){
                    index=this.playList.length - 1;
                }
                this.$store.commit(UPDATA_CURRENTINDEX,index);
                if(!this.playing){
                    this.$store.commit(UPDATA_PLAYING);
                }
                //上曲过后将准备状态改为false，用来下次切换
                this.songReady=false
            }
            
            
        },
        //下一曲
        next(){
            if(!this.songReady){
            // console.log("没准备好")
                return
            }
            if(this.playList.length==1){
                this.$refs.audio.load();
                //歌词停止
                if(this.currentLyric){
                    this.currentLyric.stop();
                }
                this.getLyric()
            }else{
                let index=this.currentIndex + 1;
                if(index==this.playList.length){
                    index=0;
                }
                //更新播放歌曲下标
                this.$store.commit(UPDATA_CURRENTINDEX,index)
                //开启播放状态
                if(!this.playing){
                    this.$store.commit(UPDATA_PLAYING)
                }
                //下曲过后将准备状态改为false，用来下次切换
                this.songReady=false
            }
            
        },
         //歌曲准备完毕
        ready(){
            this.songReady=true;
            this.duration=this.$refs.audio.duration;
        },
        error(){
            this.songReady=true
        },
        //获取播放时间
        updatetime(e){
            // console.log(this.$refs.audio.currentTime)
            // console.log(e.target.currentTime)
            this.currentTime=e.target.currentTime;
            //设置进度条进度0-100
            this.rangeValue=this.currentTime / this.duration *100;
            //调用绘图mini进度条
            this.drwaMiniProgress(this.currentTime);
            //当前歌曲播放完毕后的切换
            if(this.duration==this.currentTime){
                //先将播放状态设置为暂停
                this.$store.commit(UPDATA_PLAYING_BOOL,false);
                // 下一首
                this.next();
            }
        },
        //格式化时间
        format(t){
            t=t | 0;
            let m= t/60 | 0;
            let s= t%60;
            if(s<10){
                s="0"+s;
            }
            if(m<10){
                m="0"+m;
            }
            return `${m}:${s}`;
        },
        //进度条拖动进度的改变（边拖边改）
        rangeInput(){
            // console.log(this.rangeValue);
            //先将播放状态设置为暂停
            this.$store.commit(UPDATA_PLAYING_BOOL,false);
            //设置歌曲时间为当前拖动进度位置
            this.$refs.audio.currentTime=this.rangeValue/100 * this.duration;

        },
        //进度条拖动的改变（松开了才改变）
        rangeChange(){
            // console.log(this.rangeValue);
            this.$store.commit(UPDATA_PLAYING_BOOL,true);
            //根据拖动进度条的进度，设置歌词播放的位置
            if(this.currentLyric){
                this.currentLyric.seek(this.rangeValue/100 * this.duration*1000)
            }
        },
        //绘制mini进度条圆弧
        drwaMiniProgress(now){
            if(this.playList.length){
                 this.$nextTick(()=>{
                    let canvas=this.$refs.mini_progress;
                    let huabu=canvas.getContext('2d');
                    let edg=now*360/this.duration*Math.PI/180;
                    huabu.clearRect(0,0,30,30);
                    huabu.beginPath();
                    huabu.strokeStyle='#39aea9';
                    huabu.lineWidth=2;
                    huabu.arc(15,15,13,edg,360*Math.PI/180,true);
                    huabu.stroke();
                })
            }
           
        },
        // 播放模式的切换
        changeMode(){
            //先将播放状态设置为暂停
            this.$store.commit(UPDATA_PLAYING_BOOL,false);
            this.$store.commit(UPDATA_MODE);
            if(this.mode==2){
                this.$store.commit(RANDOM_LIST,this.playList)
                this.$refs.audio.loop=false;
            }else{
                console.log("顺序");
                if(this.mode==1){
                    this.$refs.audio.loop=true;
                }else{
                    this.$refs.audio.loop=false;
                    this.$store.commit(UPDATA_SEQUENCE);
                }
            }
            //开始播放
            this.$store.commit(UPDATA_PLAYING_BOOL,true);
        },
    },
    watch: {
        //监听播放状态改变
        playing(newplaying){
            if(this.playList.length){
                this.$nextTick(()=>{
                newplaying? this.$refs.audio.play(): this.$refs.audio.pause();
            })
            }
        },
        //监听当前播放歌曲的改变
        currentSong(){
            if(this.playList.length){
                this.$nextTick(()=>{
                if(this.playList.length>1){
                    //歌词停止
                    if(this.currentLyric){
                        this.currentLyric.stop();
                    }
                }   
                this.getLyric();
                this.$refs.audio.play();
                this.scroll=new BScroll(this.$refs.bscroll);
            })
            }
            
        },
        // playList(){
        //      this.$nextTick(()=>{
        //         if(this.playList.length){
        //             this.$refs.audio.pause();
        //         }
        //      })
        // },
    },  
}
</script>

<style lang="stylus" scoped>
@import '~assets/stylus/variable.styl'
.player
    .normal
        position fixed
        width 100%
        height 100%
        top 0
        left 0
        z-index 200
        background $background
        .bg 
            position absolute
            width 100%
            height 100%
            object-fit cover
            z-index -1
            filter blur(15px)
            opacity 0.6
        .top
            padding 0.3rem 0.3rem
            .icon-back
                font-size $font-size-xxxl
                line-height $font-size-xxxl
                color $theme-color
                transform rotate(-90deg)
                position relative
                z-index 10
            .normal_info
                position absolute
                top 0.3rem
                left 0
                right 0
                margin 0 auto
                h2
                    text-align center
                    font-size $font-size-xl
                    line-height 0.6rem
                h3
                    text-align center
                    font-size $font-size-l
                    line-height 0.6rem
        .main
            overflow hidden
            height 8.5rem
            margin-top 0.4rem
            .normal_pic
                width 5.6rem
                height 5.6rem
                box-sizing border-box
                border 0.2rem solid $color-text-s
                border-radius 50%
                position relative
                margin 0 auto
                top 8%
                img
                    width 100%
                    height 100%
                    border-radius 50%
                    &.play
                        animation rotate 15s linear infinite
                    &.pause
                        animation-play-state paused
            .lyric
                width 90% 
                margin 0 auto
                margin-top 1.4rem
                h3
                    text-align center
                    font-size $font-size-l
                    line-height $font-size-xl
            .bscroll
                position absolute
                width 100%
                height 7.5rem
                overflow hidden
                top 0
                left 0
                right 0
                bottom 0
                .r_lyric
                    padding 0 1rem 
                    margin 0 auto
                    .txts
                        font-size $font-size-m
                        color $color-text-m
                        line-height 0.52rem
                        text-align center 
                        &.current
                            color $color-text
                            font-size $font-size-l
        .control
            position relative
            bottom -0.5rem
            box-sizing border-box
            width 100%
            margin 0 auto
            padding 0 0.8rem
            .progress
                width 100%
                display flex
                align-items center
                justify-content space-between
                span 
                    font-size $font-size-s
                    color $font-size-s
                .mt-range
                    margin-left 0.22rem
                    flex 1
            .btns
                margin-top 0.4rem
                display flex
                align-items center
                justify-content space-between
                font-size $font-size-xxxl
                i:nth-of-type(3)
                    font-size $font-size-xxxxl
                &.disable  
                   color $color-text-m 
    .small
        width 100%
        height 10%
        bottom 0
        left 0
        z-index 200
        background $background-light
        position fixed
        display flex
        align-items center
        box-sizing border-box
        padding 0 0.1rem 0 0.4rem
        .img 
            width 0.9rem
            height 0.9rem
            margin-right 0.3rem
            img 
                width 100%
                height 100%
                border-radius 50%
                &.play
                    animation rotate 15s linear infinite
                &.pause
                    animation-play-state paused
        .mini_info
            flex 1
            h2
                font-size $font-size-m
            h2:nth-of-type(2)
                color $color-text-m
                margin-top 0.1rem
        .mini_control
            position relative
            i
                font-size $font-size-xxxl
                margin 0 0.1rem
                color $color-text-m
            .mini_progress
                position absolute
                top -0.0030rem
                left 0.1rem
                z-index -1
@keyframes rotate
    0%
        transform rotate(0)
    100%
        transform rotate(360deg)
</style>
