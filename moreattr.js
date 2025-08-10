// 为了方便地做出各种各样的效果并方便网站的访问者，故做出此 js 脚本。

// PART 0: 为了方便后续代码调用而做出的一些函数
function newElement(htmlCode) {
    let temp = document.createElement('a');
    temp.innerHTML = htmlCode;
    return temp.firstChild;
}

// PART 1: 悬浮提示框（为了更好看不直接使用 title）
const xf_info = document.querySelector('#xf-info'); // 用于显示消息的元素
let timeout_id = undefined;
let xf_out = false;
function mouseover(ev, xf) {            // 只在鼠标刚刚悬浮上来时触发
    clearTimeout(timeout_id);           // 总是会有奇葩的用户试图在消失动画结束以前再次把鼠标放上来
    xf_info.innerHTML = xf;             // （接上一行）这时候就应该不让提示文本消失；给一个 undefined 的话 js 不会介意的
    xf_info.setAttribute('style', `left: ${ev.pageX}px; top: ${ev.pageY + 20}px; opacity: 1;`);
                                        // 设置提示框位置并显示它（ + 20 避开鼠标，下同）
}
function mousemove(ev) {                // 只在鼠标移动时触发
    xf_info.setAttribute('style', `left: ${ev.pageX}px; top: ${ev.pageY + 20}px; opacity: 1;`);
                                        // 设置提示框位置
}
function mouseout(ev) {                 // 只在鼠标离开时触发
    xf_info.setAttribute('style', `left: ${ev.pageX}px; top: ${ev.pageY + 20}px; opacity: 0;`);
}
xf_info.onmouseover = () => xf_out = false; // 记录鼠标是否悬浮在悬浮框上
xf_info.onmousemove = mousemove;
xf_info.onmouseout = (ev) => (xf_out = true, mouseout(ev)); // 如果悬浮的话就不考虑触发隐藏提示框
for (let element of document.querySelectorAll('*[xf]')) {   // xf == 悬浮
    let xf = element.getAttribute('xf');            // 获取元素想要显示的内容
    element.onmouseover = (ev) => mouseover(ev, xf);// 就算鼠标不小心移动到了悬浮框上，仍旧显示悬浮框
    element.onmousemove = mousemove;                // 就算鼠标不小心在悬浮框上移动，仍旧更新悬浮框位置
    element.onmouseout = mouseout;                  // 鼠标离开了悬浮框就隐藏悬浮框
                                                    // 但如果用户紧接着又放到元素上去了那 mouseover 还是会被调用的
}

// PART 2: 链接（用于非 <a> 标签的链接）
for (let element of document.querySelectorAll('*[link]')) {
    console.log(element);
    element.addEventListener('click', () => window.location.href = element.getAttribute('link'));
}
for (let element of document.querySelectorAll('a[href]')) {
    element.setAttribute('xf', element.getAttribute('href'));
}                                                       // 下面代码从上面复制的，以后再维护吧
for (let element of document.querySelectorAll('*[xf]')) {   // xf == 悬浮
        let xf = element.getAttribute('xf');            // 获取元素想要显示的内容
        element.onmouseover = (ev) => mouseover(ev, xf);// 就算鼠标不小心移动到了悬浮框上，仍旧显示悬浮框
        element.onmousemove = mousemove;                // 就算鼠标不小心在悬浮框上移动，仍旧更新悬浮框位置
        element.onmouseout = mouseout;                  // 鼠标离开了悬浮框就隐藏悬浮框
                                                        // 但如果用户紧接着又放到元素上去了那 mouseover 还是会被调用的
    }

// PART 3: line 属性（用于给文字地铁线路的颜色）
// TODO: 把这个改成适用于全国地铁而不是仅仅杭州
// TODO: 这个和 hangzhou.html 里的功能应该合并到一起而不是分开
const COLOR_TABLE = {
    '1': '#e8384a',
    '2': '#e17901',
    '3': '#ffcf23',
    '4': '#60c04b',
    '5': '#00afc8',
    '6': '#0077cf',
    '7': '#790f8e',
    '8': '#a80d4d',
    '9': '#c45b03',
    '10': '#daaa00',
    '16': '#ffaa52',
    '19': '#4acbe5',
    'HH': '#0077c8',
    'SX1': '#c5003e',
    'SX2': '#307fe2',
    '暂未开通': '#808080'
}
for (let element of document.querySelectorAll('[line]')) {
    let style = element.getAttribute('style') || '';// 短路机制（or）：若前面为 false 则直接返回后面
    style += 'background: linear-gradient(to right';// 注意这里仍然是背景渐变
    let lines = element.getAttribute('line');       // 类似 line="2,4,9" 这种
    for (let line of lines.split(','))              // 用 ',' 做为分隔符提取每一条线路
        style += ', ' + COLOR_TABLE[line];          // 加上一个渐变颜色
    style += '); -webkit-background-clip: text; ';  // 把背景渐变甩到文字上
    style += '-webkit-text-fill-color: transparent';// 再把文字颜色搞没
    element.setAttribute('style', style);           // 把上面那么多代码搞的样式应用上去
}
