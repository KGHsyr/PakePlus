// 简化版隐藏文字工具
let w = 36, h = 28, b = 10;

function newSvg(w, h) {
    const style = document.createElement("style");
    style.textContent = `svg {margin-left: -${w - b * 2}px;}`;
    document.head.append(style);
    
    const screenWidth = window.innerWidth;
    const repeatCount = Math.ceil(screenWidth / (b * 2) + w / b);
    
    const svgPattern = `<svg width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg">
        <polygon points="0,0 ${b},0 ${w-b+2},${h/2} ${b},${h} 0,${h} ${w-b*2+2},${h/2}" fill="black" />
        <polygon points="${b+2},0 ${b*2-2},0 ${w},${h/2} ${b*2-2},${h} ${b+2},${h} ${w-b+4},${h/2}" fill="white" />
    </svg>`.repeat(repeatCount);
    
    const screenHeight = window.innerHeight;
    const verticalRepeat = Math.ceil(screenHeight / h);
    
    const zheXian = document.querySelector(".zhexian");
    zheXian.innerHTML = `<section>${svgPattern}</section>`.repeat(verticalRepeat);
}

newSvg(w, h);

const wenZi = document.querySelector(".wenzi");

const actions = {
    fontSize: value => wenZi.style.fontSize = value + "px",
    fontWeight: value => wenZi.style.fontWeight = value,
    letterSpacing: value => wenZi.style.letterSpacing = value + "px",
    textAlign: value => wenZi.style.textAlign = value,
    lineHeight: value => wenZi.style.lineHeight = value,
    opacity: value => wenZi.style.opacity = value,
    kuan: value => { w = value; newSvg(w, h); },
    gao: value => { h = value; newSvg(w, h); }
};

const caoZuo = document.querySelector(".caozuo");

// 防抖函数
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

caoZuo.addEventListener("input", debounce(function(event) {
    const type = event.target.type;
    
    if (type === "range" || type === "select-one") {
        if (actions[event.target.name]) {
            actions[event.target.name](event.target.value);
        }
    } else if (type === "text") {
        wenZi.innerHTML = event.target.value.replaceAll("|", "<br/>");
    }
}, 100));

// 字体文件上传
const inputFile = document.querySelector("input[type='file']");
inputFile.addEventListener("change", () => {
    let file = inputFile.files[0];
    if (file) {
        let url = URL.createObjectURL(file);
        const style = document.createElement("style");
        style.textContent = `@font-face {font-family: myFont; src: url('${url}');} .wenzi {font-family: myFont;}`;
        document.head.append(style);
    }
}); 