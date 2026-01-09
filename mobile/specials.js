
function updateClock() {
const now = new Date();
const h = String(now.getHours()).padStart(2, '0');
const m = String(now.getMinutes()).padStart(2, '0');
const s = String(now.getSeconds()).padStart(2, '0');

document.getElementById("clock").textContent = `${h}:${m}:${s}`;
}

// 1秒ごとに更新
setInterval(updateClock, 1000);

// 初回実行
updateClock();

async function updateBattery() {
if (!navigator.getBattery) {
    document.getElementById("battery").textContent =
    "--%";
    return;
}

const battery = await navigator.getBattery();
const level = Math.round(battery.level * 100);

if (battery.charging) {
    document.getElementById("battery").innerHTML =
    `<font color = "#ffff00"> ⚡︎ ${level}% </font>`;
    return;
}
if (level <= 20) {
    document.getElementById("battery").innerHTML =
    `<font color = "#ff0000"> ${level}% </font>`;
    return;
}else if (level <= 70) {
    document.getElementById("battery").innerHTML =
    `<font color = "#ffa500"> ${level}% </font>`;
    return;
} else {
    document.getElementById("battery").innerHTML =
    `<font color = "#00ff00"> ${level}% </font>`;
    return;
}}

setInterval(updateBattery, 1000);
updateBattery();

function Github(){
    window.open("https://github.com/mangagroup712-design/atui?tab=readme-ov-file#atui", "_blank");
}