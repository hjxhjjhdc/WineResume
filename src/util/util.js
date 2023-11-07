/**
 *  时间转换
 */
export const secondToMinuteTime = (second) =>{
    const minute = Math.floor(second/60);
    const rest_seconds = second%60;
    return `${minute.toString().padStart(2, '0')}:${rest_seconds.toString().padStart(2, '0')}`
}
