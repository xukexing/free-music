<template>
    <div class="warp" v-show="songListShow">
        <div ref="BsScroll" class="BsScroll">
            <div class="songlist">
                <div class="child" @click.stop="addPlayList(item.songInfo)" v-for="(item,index) in playList" :key="index">
                    <div class="info">
                        <span v-text="item.songInfo.musicData.songname"></span>
                        <small v-text="item.songInfo.musicData.singer[0].name"></small>
                    </div>
                    <div class="delete" @click.stop="deleteSong(index)">
                        <small class="icon-clear"></small>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { mapState ,mapGetters, mapActions} from 'vuex'
import { UPDATA_CURRENTINDEX ,DELETE_SONG } from '../../store/mutations-types'
import BScroll from 'better-scroll'

export default {
    computed: {
        ...mapState(['playList','songListShow','currentIndex']),
    },
    mounted() {
        this.scroll=new BScroll(this.$refs.BsScroll);        
    },
    methods: {
        ...mapActions(['addPlayList']),
        deleteSong(index){
            console.log(index);
            if(index<=this.currentIndex){
                this.$store.commit('DELETE_SONG',[index,true]);
            }else{
                this.$store.commit('DELETE_SONG',[index,false]);
            }
        }
    },
}
</script>

<style lang="stylus" scoped>
@import '~assets/stylus/variable.styl'
.BsScroll
    background $background-light
    width 100%
    height 6rem
    position fixed
    z-index 200    
    bottom 1.32rem
    left 0
    overflow hidden
    .songlist
        width 100%
        margin 0.5rem 0
        .child
            border-bottom 1px solid $background-opt
            display flex
            box-sizing border-box
            align-items center
            justify-content space-between
            padding 0 0.5rem
            line-height 0.8rem
            position relative
            .info
                flex 1
                span 
                    font-size $font-size-m
                    color $color-text
                small 
                    font-size $font-size-s
                    color $color-text-m
            .delete
                position relative
                width 0.8rem
                height 0.8rem
                text-align center 
                small 
                    line-height 0.8rem
                    font-size   font-size $font-size-xl  
                    color $color-text-m        
</style>
