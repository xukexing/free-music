import * as Types from './mutations-types'

const mutations={
    [Types.ADD_PLAYLIST](state,item){
        // console.log(item);
        let music=state.playList.find(val=>val.songInfo.musicData.songmid===item.songInfo.musicData.songmid);
        if(!music){
            //往播放列表中添加歌曲
            state.playList=[...state.playList,item];
            state.rePlayList=[...state.rePlayList,item];
            // 索引
            // console.log(state.playList.length-1);
            //当用户单击歌曲时将索引设置为当前播放的索引
            state.currentIndex=state.playList.length-1;
        }else{
            // 歌曲存在找当前歌曲索引
            // console.log(state.playList.indexOf(music));
            //当用户单击歌曲时将索引设置为当前播放的索引
            state.currentIndex=state.playList.indexOf(music);
        }
        // console.log(state.playList);
        //显示全屏播放器
        state.fullScreen=true;
        //设置播放状态为播放
        state.playing=true;
        
        
    },
    //修改播放器显示状态
    [Types.UPDATA_SCREEN](state){
        state.fullScreen=!state.fullScreen;
        state.songListShow=false;
    },
    //修改播放状态
    [Types.UPDATA_PLAYING](state){
        state.playing=!state.playing;
    },
    //拖进度条时暂停播放
    [Types.UPDATA_PLAYING_BOOL](state,bool){
        state.playing=bool;
    },
    //修改当前播放的索引（上、下一曲）
    [Types.UPDATA_CURRENTINDEX](state,index){
        state.currentIndex=index;
        //console.log(state.currentIndex);
    },
    // //修改播放模式
    [Types.UPDATA_MODE](state){
        //0 1 2
        state.mode=(state.mode+1)%3;
    },
    //随机播放列表
    [Types.RANDOM_LIST](state,item){
        // console.log(item)
        let arr=[];
        while(arr.length<item.length){
            let num=parseInt(Math.random()*(item.length-1-0+1));
            if(arr.indexOf(num)==-1){
                arr.push(num);
            }
        }
        for(let i=0;i<state.playList.length;i++){
            arr[i]=item[arr[i]]; 
            state.playList=arr;
        }
        // console.log(state.playList)
    },
    //顺序播放
    [Types.UPDATA_SEQUENCE](state){
        state.playList=state.rePlayList;
    },
    //播放列表的显示或隐藏
    [Types.CHANGE_SONGLIST](state){
        state.songListShow=!state.songListShow;
    },
    //删除播放列表歌曲
    [Types.DELETE_SONG](state,arr){
        // console.log(arr)
        state.playList.splice(arr[0],1);
        state.rePlayList.splice(arr[0],1);
        if(state.playList.length>0){
            if(arr[1]){
                state.currentIndex=state.currentIndex-1;
            }else{
                state.currentIndex=state.currentIndex;
            }
            // console.log(state.playList)
        }else{
            state.playing=false;
            state.fullScreen=false;
            state.currentIndex=-1;
            state.songListShow=false;
        }
    }
}

export default mutations