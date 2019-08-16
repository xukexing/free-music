import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './actions'
import getters from './getters'
import { playMode } from './configer'

Vue.use(Vuex)

const state={
    playing:false, //是否播放
    fullScreen:false, //是否全屏
    playList:[],//播放列表
    rePlayList:[],//播放列表--备份
    mode:playMode.sequence,//默认顺序播放
    currentIndex:-1,//当前播放歌曲的索引
    songListShow:false,//播放列表的显示
}

export default new Vuex.Store({
    state,
    mutations,
    getters,
    actions
})
