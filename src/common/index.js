const Retime={
    //格式化当前时间
    format(t){
        t=t | 0;
        let m= t/60 | 0;
        let s= t%60;
        if(s<10){
            s="0"+s;
        }
        return `${m}:${s}`;
    }
}
export default Retime
