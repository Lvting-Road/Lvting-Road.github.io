// 用于给城市地铁线路页面提供各种效果的 Js 脚本

const TABLE = {
    'hz': { // 杭州
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
    }
}

const empty = name => document.createElement(name);
const select = (target, x) => Array.from(target.querySelectorAll(x));

function load(city, target=document.body) {
    // city: 城市名称（参考上表）
    // target: 要应用样式的所有元素共有的上层节点（不写默认 <body>）

    // 奇怪死了 按下面这样写不管遍历什么都是跳一个遍历一个的
    // for(let each of target.querySelectorAll('.line')) {
    //     console.log(1);
    // }

    select(target, '.line').forEach(line => {
        let table = empty('table');             // 新建一张空白表格
        let thead = empty('thead');             // 生成表头
        thead.innerHTML = '<tr><th></th><th style="width: 60%;">站名</th><th>线路</th></tr>';
        table.appendChild(thead);               // 使表头成为表格的子元素
        let tbody = empty('tbody');             // 生成表身
        select(line, '[L]').forEach(st => {     // 遍历车站，st 是 station 的简写
            let name = st.innerText;            // 提取站名
            let lines = st.getAttribute('L');   // 提取经过此站的线路（像 "1" "1,5" "1,3,19" 这样）
            let tr = empty('tr');               // 生成空行
            // 第一列显示一个代表站点的圆圈
            let td = empty('td');
            // 换乘站用实心圆圈，普通站用空心
            td.innerHTML = `<a L="${lines}">${lines.includes(',') ? '●' : '○'}</a>`;
            tr.appendChild(td);
            // 第二列显示站名
            td = empty('td');
            td.setAttribute('xf', name);
            td.appendChild(st);
            tr.appendChild(td);
            // 第二列显示线路
            td = empty('td');
            td.innerHTML = `<a>${lines}</a>`
            tr.appendChild(td);
            // 添加这行，现在它看起来像："● 绿汀路 3,5,16"（还是黑色）
            tbody.appendChild(tr);
        });
        table.appendChild(tbody);
        // 添加表格
        line.parentElement.appendChild(table);
        // 原来的 (以前叫 togenerate) 就不要了
        line.parentElement.removeChild(line);
    });
    // 加载完了这个城市的所有线路，染色！
    // 先获取城市的配色
    let subTable = TABLE[city];
    select(target, '[L]').forEach(st => {
        let lines = st.getAttribute('L');
        let colors = '';
        for (let line of lines.split(',')) {
            // 根据每条线路的编号记录要画上去的颜色
            colors += ', ' + subTable[line];
        }
        st.setAttribute('style', `background: linear-gradient(to right${colors});\
background-clip: text; -webkit-text-fill-color: transparent`);
    });
}
