import * as Types from './mutations-types'
import axios from 'axios'

const actions={
    //加入播放列表
    addPlayList({commit},item){
        // console.log(item)
        //拉取播放地址和歌曲图片
        // axios.get('https://v1.itooi.cn/tencent/pic?id='+item.musicData.songmid)
        // axios.get('/singer/cgi-bin/musicu.fcg',{
        //     params:{
        //         '-': 'getUCGI49576123520589377',
        //         g_tk: 143200557,
        //         loginUin: 0,
        //         hostUin: 0,
        //         format: 'json',
        //         inCharset:' utf8',
        //         outCharset: 'utf-8',
        //         notice: 0,
        //         platform: 'yqq.json',
        //         needNewCode: 0,
        //         data: {"comm":{"ct":24,"cv":0},
        //         "songinfo":{"method":"get_song_detail_yqq",
        //         "param":{"song_type":0,"song_mid":item.musicData.songmid,"song_id":200255722},
        //         "module":"music.pf_song_detail_svr"}}
        //     }
        // })
        // .then(res=>{
        //     // console.log(res);
        //     //拉取图片
        //     let pic=res.data.songinfo.data.track_info.album.mid;
        //     let picPath='//y.gtimg.cn/music/photo_new/T002R300x300M000'+pic+'.jpg?max_age=2592000';
            let picPath='https://v1.itooi.cn/tencent/pic?id='+item.musicData.songmid;

            let playPath='https://v1.itooi.cn/tencent/url?id='+item.musicData.songmid+'&quality=128';
            // console.log(picPath);
            //拉取歌曲播放地址
            // axios.get('https://v1.itooi.cn/tencent/url?id='+item.musicData.songmid+'&quality=128').then(res=>{
            //     console.log(res)
                // let playPath=res.config.url;
                axios.get('https://v1.itooi.cn/tencent/lrc?id='+item.musicData.songmid)
                .then(resLy=>{
                    // console.log(resLy.data);
                    let lyric=resLy.data;
                    let mySongInfo={
                        songInfo:item,
                        songPic:picPath,
                        songUrl:playPath,
                        songLyric:lyric
                    }
                    // console.log(resLy.data);
                    // console.log(mySongInfo)
                    //提交给mutations
                    commit(Types.ADD_PLAYLIST,mySongInfo)
                }).catch(err=>{
                    console.log(err);
                })
            // }).catch(err=>{
            //     console.log(err)
            // })
            // axios.get('/singer/cgi-bin/musicu.fcg',{
            //     params:{
            //         '-': 'getplaysongvkey8868733314455202',
            //         g_tk: 143200557,
            //         loginUin: 0,
            //         hostUin: 0,
            //         format: 'json',
            //         inCharset: 'utf8',
            //         outCharset: 'utf-8',
            //         notice: 0,
            //         platform: 'yqq.json',
            //         needNewCode: 0,
            //         data: {"req":{"module":"CDN.SrfCdnDispatchServer",
            //         "method":"GetCdnDispatch",
            //         "param":{"guid":"2486534121","calltype":0,"userip":""}},
            //         "req_0":{"module":"vkey.GetVkeyServer",
            //         "method":"CgiGetVkey","param":{"guid":"2486534121",
            //         "songmid":[item.musicData.songmid],"songtype":[0],"uin":"0",
            //         "loginflag":1,"platform":"20"}},
            //         "comm":{"uin":0,"format":"json","ct":24,"cv":0}}
            //     }
            // })
        //     .then(res=>{
        //         console.log(res)
        //             console.log(res.data.req_0.data.midurlinfo[0].purl);
        //             console.log(res.data.req.data.sip[1]);
        //             let http=res.data.req.data.sip[1];
        //             let pth=res.data.req_0.data.midurlinfo[0].purl;
        //             let playPath=http+pth;

        //             console.log(playPath);
        //             axios.get('https://v1.itooi.cn/tencent/lrc?id='+item.musicData.songmid).then(resLy=>{
        //             // console.log(resLy.data);
        //             let lyric=resLy.data;
        //             let mySongInfo={
        //                 songInfo:item,
        //                 songPic:picPath,
        //                 songUrl:playPath,
        //                 songLyric:lyric
        //             }
        //             // console.log(resLy.data);
        //             console.log(mySongInfo)
        //             //提交给mutations
        //             commit(Types.ADD_PLAYLIST,mySongInfo)
        //         }).catch(err=>{
        //             console.log(err);
        //         })
        //     })
        //     .catch(err=>{
        //         console.log(err)
        //     })
        // })
        // .catch(err=>{
        //     console.log(err)
        // })
    },
    //排行榜歌曲加入播放列表
    TopPlayList({commit},item){
        console.log(item)
        item.musicData={
                        songname:item.name,
                        songmid:item.id,
                        singer:[{name:item.singer}]
                    };
        axios.get('https://v1.itooi.cn/tencent/lrc?id='+item.id).then(resLy=>{
            // console.log(resLy.data);
            let lyric=resLy.data;
            let mySongInfo={
                songInfo:item,
                songPic:item.pic,
                songUrl:item.url,
                songLyric:lyric
            }
            // console.log(mySongInfo)
            //提交给mutations
            commit(Types.ADD_PLAYLIST,mySongInfo)
        }).catch(err=>{
            console.log(err);
        })
    },
    //获取搜索功能的歌曲所以信息并加入播放列表
    SearchAddplaylist({commit},item){
        item.musicData={
            singer:[{songmid:item.songmid,name:item.singer[0].name}],
            songname:item.songname,
            songmid:item.songmid,
        }
         //拉取播放地址和歌曲图片
        // axios.get('https://v1.itooi.cn/tencent/pic?id='+item.musicData.songmid)
        // axios.get('/singer/cgi-bin/musicu.fcg',{
        //     params:{
        //         '-': 'getUCGI49576123520589377',
        //         g_tk: 143200557,
        //         loginUin: 0,
        //         hostUin: 0,
        //         format: 'json',
        //         inCharset:' utf8',
        //         outCharset: 'utf-8',
        //         notice: 0,
        //         platform: 'yqq.json',
        //         needNewCode: 0,
        //         data: {"comm":{"ct":24,"cv":0},
        //         "songinfo":{"method":"get_song_detail_yqq",
        //         "param":{"song_type":0,"song_mid":item.songmid,"song_id":200255722},
        //         "module":"music.pf_song_detail_svr"}}
        //     }
        // })
        // .then(res=>{
        //     console.log(res);
            //拉取图片
            // let pic=res.data.songinfo.data.track_info.album.mid;
            let picPath='https://v1.itooi.cn/tencent/pic?id='+item.songmid;
            console.log(picPath);
            // let picPath='//y.gtimg.cn/music/photo_new/T002R300x300M000'+pic+'.jpg?max_age=2592000';
            console.log('https://v1.itooi.cn/tencent/url?id='+item.songmid+'&quality=128');
            let playPath='https://v1.itooi.cn/tencent/url?id='+item.songmid+'&quality=128';
            //拉取歌曲播放地址
            // axios.get('https://v1.itooi.cn/tencent/url?id='+item.songmid+'&quality=128')
            // .then(res=>{
            //     console.log(res)
                // let playPath=res.config.url;
                axios.get('https://v1.itooi.cn/tencent/lrc?id='+item.songmid).then(resLy=>{
                    // console.log(resLy.data);
                    let lyric=resLy.data;
                    // let playPath="http://dl.stream.qqmusic.qq.com/C6000039iujO1v8sis.m4a?guid=BZQLL&vkey=F118B58E0EF187AA93AAA2540BF8F65C59421249D0BA1046D731206108D242A7BA9CA830E346313E7F57EC4C084871BC68C09566097D236F&uin=0&fromtag=8"
                    let mySongInfo={
                        songInfo:item,
                        songPic:picPath,
                        songUrl:playPath,
                        songLyric:lyric
                    }
                    //提交给mutations
                    commit(Types.ADD_PLAYLIST,mySongInfo)
                    // console.log(mySongInfo)
                }).catch(err=>{
                    console.log(err);
                })
            // }).catch(err=>{
            //     console.log(err)
            // })
        // })
        // .catch(err=>{
        //     console.log(err)
        // })
    },

    
    //获取首页热门歌曲所有信息并加入播放列表
    HomePlayList({commit},item){
        item.musicData={
            singer:[{songmid:item.singer[0].mid,name:item.singer[0].name}],
            songname:item.name,
            songmid:item.mid,
        }
         //拉取播放地址和歌曲图片
        // axios.get('https://v1.itooi.cn/tencent/pic?id='+item.musicData.songmid)
        // axios.get('/singer/cgi-bin/musicu.fcg',{
        //     params:{
        //         '-': 'getUCGI49576123520589377',
        //         g_tk: 143200557,
        //         loginUin: 0,
        //         hostUin: 0,
        //         format: 'json',
        //         inCharset:' utf8',
        //         outCharset: 'utf-8',
        //         notice: 0,
        //         platform: 'yqq.json',
        //         needNewCode: 0,
        //         data: {"comm":{"ct":24,"cv":0},
        //         "songinfo":{"method":"get_song_detail_yqq",
        //         "param":{"song_type":0,"song_mid":item.mid,"song_id":200255722},
        //         "module":"music.pf_song_detail_svr"}}
        //     }
        // })
        // .then(res=>{
        //     // console.log(res);
        //     //拉取图片
        //     let pic=res.data.songinfo.data.track_info.album.mid;
        //     let picPath='//y.gtimg.cn/music/photo_new/T002R300x300M000'+pic+'.jpg?max_age=2592000';
            let picPath='https://v1.itooi.cn/tencent/pic?id='+item.mid;
            // console.log(picPath);
            //拉取歌曲播放地址
            let playPath='https://v1.itooi.cn/tencent/url?id='+item.mid+'&quality=128';
            console.log(playPath);
            // axios.get('https://v1.itooi.cn/tencent/url?id='+item.mid+'&quality=128').then(res=>{
            //     // console.log(res)
            //     let playPath=res.config.url;
                axios.get('https://v1.itooi.cn/tencent/lrc?id='+item.mid).then(resLy=>{
                    // console.log(resLy.data);
                    let lyric=resLy.data;
                    let mySongInfo={
                        songInfo:item,
                        songPic:picPath,
                        songUrl:playPath,
                        songLyric:lyric
                    }
                    // console.log(mySongInfo)
                    //提交给mutations
                    commit(Types.ADD_PLAYLIST,mySongInfo)
                }).catch(err=>{
                    console.log(err);
                })
        //     }).catch(err=>{
        //         console.log(err)
        //     })
        // })
        // .catch(err=>{
        //     console.log(err)
        // })
    },
}

export default actions