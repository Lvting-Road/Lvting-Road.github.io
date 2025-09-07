const TABLE = {
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
};

// cv -> canvas
let cv = document.getElementById('cv');
// ctx -> context，都是 <canvas> 绘画中需要用到的
let ctx, width, height;
if (ctx = cv.getContext('2d')) {
    // 如果 <canvas> 无效，则 .getContext 也无效，故无需花费心机搭理用户的浏览器。

    function drawText(text, fontname, fontsize, color, x, y, rotateAngle = 0) {
        // 参数依次为要显示的文本、字体名称、字体大小、文字颜色、文字中心 X、文字中心 Y、文字旋转角度
        // 测量文本数据以备用
        ctx.font = `${fontsize}px ${fontname}`
        let w = ctx.measureText(text).width, h = fontsize;
        // 保存原来的设置
        ctx.save()
        // 先移动 canvas 的中心点 (0, 0) 到指定位置
        ctx.translate(x - w / 2, y + h / 2);
        ctx.rotate(-rotateAngle / 180 * 3.14);
        ctx.fillStyle = color;
        ctx.fillText(text, 0, 0);
        // 回到 ctx.save() 时的设置
        ctx.restore()
    }
    function drawRoundedRect(x, y, w, h, radius, width, bdc = null, bgc = null) {
        // aicynfauinyciin
        // 参数依次为“Ecaraycta”dcaeunyuinyfuiqyn7e2472673c28oqnydfuafacds
        ctx.lineWidth = width;
        ctx.beginPath();
        ctx.roundRect(x, y, w, h, radius);
        if (bdc) {
            ctx.strokeStyle = bdc;
            ctx.stroke();
        }
        if (bgc) {
            ctx.fillStyle = bgc;
            ctx.fill();
        }
    }
    function drawLine(x1, y1, x2, y2, color, width) {
        // 画直线（可能描述地不太准确？毕竟直线没有端点）
        // 参数依次为起点 X、起点 Y、终点 X、终点 Y、颜色、宽度
        ctx.lineWidth = width;
        ctx.strokeStyle = color;
        ctx.beginPath()
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
    }
    function drawCircle(x, y, radius, lineWidth, strokeStyle = null, fillStyle = null) {
        // 画圆
        // 参数依次为圆中心 X、圆中心 Y、圆半径、圆边框宽度、圆边框颜色、圆填充颜色
        ctx.lineWidth = lineWidth;
        ctx.strokeStyle = strokeStyle;
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, 6.28);
        if (fillStyle) {
            // 填充
            ctx.fillStyle = fillStyle;
            ctx.fill();
        }
        // 画边框
        ctx.stroke();
    }
    function drawLineIcon(x, y, color, code, option = 0) {
        // 画线路图标，返回线路图标宽度
        // 画图标背景（圆角矩形）
        // 坐标试、大小什么的是试出来的
        // 获取当字体为 38px 的 Arial 时文字占用的宽度
        ctx.font = '38px Arial';
        let w = ctx.measureText(code).width;
        if (option)
            x -= (w * 1.2 + 29) * 0.5
        // * 1.2 原因是 Line X 小字也需要占用空间，9px / 38px 约等于 1.2，所以 * 1.2 最适宜。
        drawRoundedRect(x, y, 27 + w * 1.2, 50, 5, 0, null, color);
        // 画 X 号线 Line X
        drawText(code, 'Arial', 38, '#fff', x + 2 + w / 2, y + 21);
        drawText('号线', 'SimHei', 13, '#fff', x + w + 15, y + 23);
        // 获取当字体为 9px 的 Arial 时文字占用的宽度
        ctx.font = '9px Arial';
        let temp, w2 = ctx.measureText(temp = `Line ${code}`).width;
        drawText(temp, 'Arial', 9, '#fff', x + w + w2 / 2 + 3, y + 37);
        return x + w * 1.2 + 29;
    }
    function draw() {
        // 设置为合适的窗口宽度
        cv.setAttribute('width', (width = window.innerWidth - 10));
        cv.setAttribute('height', (height = 225));

        // 获取用户设置的一些数据
        // 线路编号（X 号线的 X，暂不支持 X > 9 状态下的编号和文字编号）
        let code = document.getElementById('code').value;
        // 线路颜色
        let color = document.getElementById('color').value;
        // 线路颜色
        let current = document.getElementById('current').value;
        // 线路途经站点
        let stations = [];
        for (let tr of document.querySelectorAll('#stations tbody tr')) {
            // 每个 <tr> 里都有 3 个 <td>
            let station = [];
            for (let td of tr.children)
                station.push(td.innerText);
            stations.push(station);
        }
        // 最后一行是输入框，无内容
        stations.pop();
        console.log(stations);
// 还真的有人来翻代码啊
// -.- OvO
//         let stations = [['朝阳', 'Chaoyang', ''],
// ['曹家桥', 'Caojiaqiao', ''],
// ['潘水', 'Panshui', ''],
// ['人民路', 'Renmin Road', ''],
// ['人民广场', `People's Square`, '5'],
// ['建设一路', 'Jiansheyi Road', ''],
// ['建设三路', 'Jianshesan Road', '7'],
// ['振宁路', 'Zhenning Road', ''],
// ['飞虹路', 'Feihong Road', ''],
// ['盈丰路', 'Yingfeng Road', ''],
// ['钱江世纪城', 'Qianjiang Century City', '6'],
// ['钱江路', 'Qianjiang Road', '4,9'],
// ['庆春广场', 'Qingchun Square', ''],
// ['庆菱路', 'Qingling Road', ''],
// ['建国北路', 'North Jianguo Road', '5'],
// ['中河北路', 'North Zhonghe Road', ''],
// ['凤起路', 'Fengqi Road', '1'],
// ['武林门', 'Wulinmen', '3'],
// ['沈塘桥', 'Shentangqiao', '19'],
// ['下宁桥', 'Xianing Bridge', ''],
// ['学院路', 'Xueyuan Road', '10'],
// ['古翠路', 'Gucui Road', ''],
// ['丰潭路', 'Fengtan Road', ''],
// ['文新', 'Wenxin', ''],
// ['三坝', 'Sanba', '5'],
// ['虾龙圩', 'Xialongwei', ''],
// ['三墩', 'Sandun', ''],
// ['墩祥街', 'Dunxiang Street', ''],
// ['金家渡', 'Jinjiadu', '4'],
// ['白洋', 'Baiyang', ''],
// ['杜甫村', 'Dufucun', ''],
// ['良渚', 'Liangzhu', '']]

        // 画边框
        drawRoundedRect(5, 5, width - 10, height - 10, 20, 2, color, '#fff');

        // 画杭州地铁标志
        const logo = new Image();
        // 神经病，不加下面这行说 canvas 被污染无法导出
        // 脑残，谁定的规定
        logo.src = 'hangzhoumetro.png'
        // 图片加载完成后绘制
        logo.onload = () => ctx.drawImage(logo, 20, 10);

        // 画线路图标
        let right = drawLineIcon(225, 10, color, code);
        
        // 服务热线
        drawText('服   热', 'SimHei', 21, '#000', right + 60, 29);
        drawText('务   线', 'SimHei', 21, '#000', right + 86, 29);
        drawText('Service Hotline', 'Arial', 14, '#000', right + 73, 48);
        drawText('0571-96600', 'Arial', 24, '#000', right + 200, 36);

        // 用于标明列车前后站点的进度条
        // a：标明总共需要将 (width - 200)px 分成几段（b 不注释了）
        let a = stations.length - 1, b = width - 200;
        drawLine(100, 125, 100 + (current - 1) / a * b, 125, '#808080', 7);
        drawLine(100 + (current - 1) / a * b, 125, width - 100, 125, color, 7);
        
        // 站点
        // i：标明第几个站点
        let i = 1;
        for (let station of stations) {
            if (i > 1)
                // 在后面画上一个“→”
                drawText('→', 'SimHei', 15, '#fff', 100 + (i - 1.5) / a * b, 122);
            // 判断是否过站
            let passed = i < current;
            // 根据 a、b、i 计算圆和文字的 X 坐标
            let x = 100 + (i - 1) / a * b;
            drawCircle(x, 125, 10, 2, passed ? '#808080' : color, '#fff');
            drawText(i, 'Arial', 13, '#000', x, 122);
            // 标明车站名称、可换乘线路
            let j = 0;
            if (i % 2) {
                drawText(station[0], 'SimHei', 22, '#000', x, 87);
                drawText(station[1], 'Arial', 10, '#000', x, 105);
                if (station[2]) {
                    for (let k of station[2].split(','))
                        drawLineIcon(x, 136 + (j++) * 50, passed ? '#808080' : TABLE[k], k, 1);
                }
            } else {
                drawText(station[0], 'SimHei', 22, '#000', x, 149);
                drawText(station[1], 'Arial', 10, '#000', x, 166);
                if (station[2]) {
                    for (let k of station[2].split(',')) {
                        drawLineIcon(x, 64 - (j++) * 50, passed ? '#808080' : TABLE[k], k, 1);
                    }
                }
            }
            // 车站编号 + 1
            i += 1;
        }
    }
    window.onload = window.onresize = draw;

    function download() {
        cv.toBlob(blob => {
            var url = URL.createObjectURL(blob);
            var a = document.createElement('a');
            a.href = url;
            a.download = 'canvas-image.png';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        }, 'image/png');
    }
    function downloadAll() {
        for (let i = 1; i <= 31; ++i) {
            document.getElementById('current').value = i;
            download();
        }
    }
}
