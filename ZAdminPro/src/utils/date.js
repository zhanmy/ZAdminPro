// 获取日期对象
export function getDateObj (val){
    let date;
    if(val){
        date = new Date(val)
    }else{
        date = new Date()
    }
    return date
}
// 获取年
export function getYear (val){
    let date;
    if(val){
        date = new Date(val)
    }else{
        date = new Date()
    }

    let nian = date.getFullYear().toString();
    return nian;
}
// 获取月
export function getYue (val){
    let date;
    if(val){
        date = new Date(val)
    }else{
        date = new Date()
    }

    let nian = date.getFullYear();
    let yue = (date.getMonth() + 1) > 9 ? [date.getMonth() + 1] : '0' + [date.getMonth() + 1];
    return nian + '-' + yue;
}
// 获取日期
export function getDate (val){
    let date;
    if(val){
        date = new Date(val)
    }else{
        date = new Date()
    }

    let nian = date.getFullYear();
    let yue = (date.getMonth() + 1) > 9 ? [date.getMonth() + 1] : '0' + [date.getMonth() + 1];
    let ri = date.getDate() > 9 ? date.getDate() : '0' + date.getDate();
    return nian + '-' + yue + '-' + ri;
}
// 获取日期时间
export function getTime(val){
    let date;
    if(val){
        date = new Date( val )
    }else{
        date = new Date()
    }

    let nian = date.getFullYear();
    let yue = (date.getMonth() + 1) > 9 ? [date.getMonth() + 1] : '0' + [date.getMonth() + 1];
    let ri = date.getDate() > 9 ? date.getDate() : '0' + date.getDate();

    let shi = date.getHours() > 9 ?  date.getHours() : '0' + date.getHours();
    let fen = date.getMinutes() > 9 ?  date.getMinutes() : '0' + date.getMinutes();
    return nian + '-' + yue + '-' + ri + ' ' + shi + ":" + fen;
}