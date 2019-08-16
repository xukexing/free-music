const getters={
    //根据当前播放的索引，计算出当前播放歌曲对象
    currentSong:function(state){
        // console.log(state.currentIndex);
        return state.playList[state.currentIndex]
    }
}

export default getters