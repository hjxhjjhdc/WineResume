export const musicLyricFun = (lrc,sT) =>{
    // 最开始获取到的歌词列表是字符串类型（不好操作）
    let lrcArr = lrc.split('\n');
// 接收修正后的歌词数组
    let result = [];
// 获取所要用到的dom列表
   let doms = {
        // audio: document.querySelector("audio"),
        ul: document.querySelector("ul"),
        container: document.querySelector(".wine-music-lyric")
    }
// 将歌词数组转成由对象组成的数组，对象有time和word两个属性（为了方便操作）
    for (let i = 0; i < lrcArr.length; i++) {
        var lrcData = lrcArr[i].split(']');
        var lrcTime = lrcData[0].substring(1);
        var obj = {
            time: parseTime(lrcTime),
            word: lrcData[1]
        }
        result.push(obj);
    }
// 将tiem转换为秒的形式
    function parseTime(lrcTime) {
        let lrcTimeArr = lrcTime.split(":")
        return +lrcTimeArr[0] * 60 + +lrcTimeArr[1];
    }
// 获取当前播放到的歌词的下标
    function getIndex() {
        let Time = sT;
        for (let i = 0; i < result.length; i++) {
            if (result[i].time > Time) {
                return i - 1;
            }
        }
    }
// 创建歌词列表
    function createElements() {
        let frag = document.createDocumentFragment(); // 文档片段
        for (let i = 0; i < result.length; i++) {
            let li = document.createElement("li");
            li.innerText = result[i].word;
            frag.appendChild(li);
        }
        doms.ul.appendChild(frag);
    }
    createElements();
// 获取显示窗口的可视高度
    let containerHeight = doms.container.clientHeight;
// 获取歌词列表的可视高度
// 设置最大最小偏移量，防止显示效果不佳
    let minOffset = 0;
    let maxOffset = doms.ul.clientHeight - containerHeight;
// 控制歌词滚动移动的函数
    function setOffset() {
        let liHeight = doms.ul.children[0].clientHeight;
        let index = getIndex();
        // 计算滚动距离
        let offset = liHeight * index - containerHeight / 2 + liHeight / 2;
        if (offset < minOffset) {
            offset = minOffset;
        };
        if (offset > maxOffset) {
            offset = maxOffset;
        };
        // 滚动
        doms.ul.style.transform = `translateY(-${offset}px)`;
        // 清除之前的active
        let li = doms.ul.querySelector(".active")
        if (li) {
            li.classList.remove("active");
        }
        // 为当前所唱到的歌词添加active
        li = doms.ul.children[index];
        if (li) {
            li.classList.add("active");
        }
    }
    return result
}