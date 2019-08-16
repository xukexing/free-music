<template>
<div>
    <mt-index-list>
        <mt-index-section v-for="val in singerList" :key="val.index" :index="val.str">
            <mt-cell v-for="item in val.singerList" :key="item.singer_mid">
                <router-link :to="{name:'Singer_detail',params:{
                        singer_mid:item.singer_mid,
                        singer_pic:item.singer_pic,
                        singer_name:item.singer_name
                    }}">
                    <img v-lazy="item.singer_pic" alt="">
                    <span v-text="item.singer_name"></span>
                </router-link>
            </mt-cell>
        </mt-index-section>
    </mt-index-list>
    <transition name="slide">
        <router-view></router-view>
    </transition>
</div>
</template>
<script>
import axios from 'axios'
import { Indicator } from 'mint-ui'
export default {
    data() {
        return {
            singerList:[],
            sortsingerList:[],
            indexList:[]
        }
    },
    created() {
        Indicator.open('Loading...');
        axios.get('/singer/cgi-bin/musicu.fcg',{
            params:{
                "-": "getUCGI4714301019568419",
                g_tk: 5381,
                loginUin: 0,
                hostUin: 0,
                format: "json",
                inCharset: "utf8",
                outCharset: "utf-8",
                notice: 0,
                platform: "yqq.json",
                needNewCode: 0,
                data: { "comm":{"ct":24,"cv":0},
                        "singerList":{"module":"Music.SingerListServer",
                        "method":"get_singer_list",
                        "param":{"area":-100,"sex":-100,"genre":-100,"index":-100,"sin":0,"cur_page":1}}}
            }
        })
        .then(res=>{
            // console.log(res.data.singerList.data);
            this.indexList=res.data.singerList.data.tags.index;
            // console.log(this.indexList);
            for(let i=0;i<this.indexList.length;i++){
                axios.get('/singer/cgi-bin/musicu.fcg',{
                params:{
                    "-": "getUCGI4714301019568419",
                    g_tk: 5381,
                    loginUin: 0,
                    hostUin: 0,
                    format: "json",
                    inCharset: "utf8",
                    outCharset: "utf-8",
                    notice: 0,
                    platform: "yqq.json",
                    needNewCode: 0,
                    data: { "comm":{"ct":24,"cv":0},
                            "singerList":{"module":"Music.SingerListServer",
                            "method":"get_singer_list",
                            "param":{"area":-100,"sex":-100,"genre":-100,"index":this.indexList[i].id,"sin":0,"cur_page":1}}}
                    }
                })
                .then(res=>{
                    // console.log(res)
                    // 处理热门
                    if(res.data.singerList.data.index==-100){
                        this.sortsingerList.push({
                            index:res.data.singerList.data.index,
                            str:'Hot',
                            singerList:res.data.singerList.data.singerlist.slice(0,10)
                        })
                    }
                    // 处理#号
                    else if(res.data.singerList.data.index==27){
                         this.sortsingerList.push({
                            index:res.data.singerList.data.index,
                            str:'#',
                            singerList:res.data.singerList.data.singerlist.slice(0,10)
                        })
                    }
                    // 正常A-Z
                    else{
                         this.sortsingerList.push({
                            index:res.data.singerList.data.index,
                            str:String.fromCharCode(res.data.singerList.data.index+64),
                            singerList:res.data.singerList.data.singerlist.slice(0,10)
                        })
                    }
                    if(i==this.indexList.length-1){
                        Indicator.close();
                        function sortList(a,b){
                            return a.index-b.index
                        }
                        this.singerList=this.sortsingerList.sort(sortList);
                        console.log(this.singerList);
                    }
                })
                .catch(err=>{
                    console.log(err)
                })
            }
        })
        .catch(err=>{
            console.log(err)
        })
    },
}
</script>
<style lang="stylus" scoped>
@import '~assets/stylus/variable.styl'
    .slide-enter-active,.slide-leave-active
        transition all 0.3s
    .slide-enter,.slide-leave-to
        transform translate3d(100%,0,0)
    .mint-cell-wrapper
        padding 0.2rem
        .mint-cell-value
            a
                display flex
                align-items center
                width 100%
                img 
                    display block
                    width 1.2rem
                    height 1.2rem
                    border-radius 50%
                    margin-right 0.2rem
                span 
                    color $color-text-m
           
</style>

