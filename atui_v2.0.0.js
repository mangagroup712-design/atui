const CITY_CODE_TABLE = {
    "北海道": "016010", "青森県": "020010", "岩手県": "030010", "宮城県": "040010", "秋田県": "050010", "山形県": "060010",
    "福島県": "070010", "茨城県": "080010", "栃木県": "090010", "群馬県": "100010", "埼玉県": "110010", "千葉県": "120010",
    "東京都": "130010", "神奈川県": "140010", "新潟県": "150010", "富山県": "160010", "石川県": "170010", "福井県": "180010",
    "山梨県": "190010", "長野県": "200010", "岐阜県": "210010", "静岡県": "220010", "愛知県": "230010", "三重県": "240010",
    "滋賀県": "250010", "京都府": "260010", "大阪府": "270000", "兵庫県": "280010", "奈良県": "290010", "和歌山県": "300010",
    "鳥取県": "310010", "島根県": "320010", "岡山県": "330010", "広島県": "340010", "山口県": "350010", "徳島県": "360010",
    "香川県": "370000", "愛媛県": "380010", "高知県": "390010", "福岡県": "400010", "佐賀県": "410010", "長崎県": "420010",
    "熊本県": "430010", "大分県": "440010", "宮崎県": "450010", "鹿児島県": "460010", "沖縄県": "471010"
};

let atuilist = ["アツ", "atsu", "激アツ", "アッツ", "atu", "アッツ島"];
let currentMode = "normal";

const dateData0 = new Date();
const dateData1 = dateData0.getHours();
let lavel = "";
if (dateData1 >= 3 && dateData1 < 10) lavel = "Good Morning!";
else if (dateData1 >= 10 && dateData1 < 16) lavel = "Hello!";
else if (dateData1 >= 16 && dateData1 < 20) lavel = "Good Evening!";
else lavel = "Good Night!";
document.getElementById("div1").innerHTML =`<b> ${lavel} </b>`;

function printLog(text, isUser = false) {
    const logBox = document.getElementById("message-log");
    const div = document.createElement("div");
    div.className = "log-entry " + (isUser ? "user-msg" : "bot-msg");
    div.textContent = text;
    logBox.appendChild(div);
    logBox.scrollTop = logBox.scrollHeight;
}

function printHTML(html) {
    const logBox = document.getElementById("message-log");
    const div = document.createElement("div");
    div.className = "log-entry bot-msg";
    div.innerHTML = `<center><div class="info-card">${html}</div></center>`;
    logBox.appendChild(div);
    logBox.scrollTop = logBox.scrollHeight;
}

document.getElementById('myTextBox').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') getStringValue();
});

function getStringValue() {
    
    const inputElement = document.getElementById('myTextBox');
    const val = inputElement.value.trim();
    console.log("MODE:", currentMode, "VAL:", val);
    if (!val) return;

    printLog(val, true);
    inputElement.value = "";

    if (currentMode === "weather_waiting") handleWeather(val);
    else if (currentMode === "qr_waiting") handleQR(val);
    else if (currentMode === "post_num" ) handlePost(val);
    else if (currentMode === "shiritori") handleShi(val);
    else handleNormal(val);
}

function handleNormal(val) {
    setTimeout(() => {
    if (val.includes("天気")) {
        printLog("都道府県名または地域コードを入力してください。地域コード表を表示する場合は\"コード\"と入力してください。");
        currentMode = "weather_waiting";
    }else if (val.includes("QR") || val.includes("qr")) {
        printLog("URLまたはテキストを入力してください。");
        currentMode = "qr_waiting";
    } else if (val.includes("電卓")) {
        printLog("電卓を起動します。");
        window.open('HotCalculator.html', 'Atui電卓', 'width=320,height=470');
    } else if (val.includes("暇") || val.includes("ひま")) {
        printLog("暇つぶし動画を再生します。");
        printLog("𝒀𝑶𝑼 𝑮𝑬𝑻 𝑹𝑰𝑪𝑲𝑹𝑶𝑳𝑳𝑬𝑫");
        window.open("https://shattereddisk.github.io/rickroll/rickroll.mp4");
    } else if (val.includes("勉強")) {
        printLog("新規タブで開きます。");
        window.open("https://note-study.studio.site/", "_blank");
    }else if (val.includes("郵便")){
        printLog("郵便番号または住所を入力してください。")
        currentMode = "post_num"
    }else if (val.includes("しりとり")){
        const overlay = document.getElementById('fade-overlay');
        if (overlay) {
            overlay.classList.add('is-active');
        }
        setTimeout(() => { location.href = "shiritori.html"; }, 514);
    }else if (val.includes("help") || val.includes("ヘルプ")) {
        printLog("新規タブでGithubを開きます。");
        window.open("https://github.com/mangagroup712-design/atui?tab=readme-ov-file#atui");
    } else {
        printLog(atuilist[Math.floor(Math.random() * atuilist.length)]);
    }
    }, 200);
}

function handleWeather(val) {
    if (currentMode == "weather_waiting" && val.includes("コード")){
        printLog("地域コード表を新規タブで開きます。");
        printLog(`都道府県名または地域コードを入力してください。`);
        window.open("https://weather.tsukumijima.net/primary_area.xml")
    } else {
    let ids = CITY_CODE_TABLE[val] || (!isNaN(val) && val.length >= 2 ? val : null);
    if (!ids) {
        printLog("都道府県が見つかりませんでした。通常モードに戻ります。");
        currentMode = "normal";
        return;
    }
    printLog(`${val}の天気を調べています...`);
    fetch(`https://weather.tsukumijima.net/api/forecast/city/${ids}`)
        .then(res => res.json())
        .then(data => {
            const date = data.forecasts[0];
            const temp = date.temperature;
            const rain = date.chanceOfRain;
            let temp_max = temp.max.celsius ?? "--";
            let temp_min = temp.min.celsius ?? "--";
            
            const html = `<center>
                <h1>${data.location.city}の${date.dateLabel}の天気</h1>
                <h2><p>${data.location.city}の${date.dateLabel}の天気は<b>${date.telop}</b>です。
                <p><font color='#ff0000'>最高気温: ${temp_max}℃</font>                    
                <p><font color='#03a1fc'>最低気温: ${temp_min}℃</font><br><br></h2>
                <h2><p class="ra">降水確率<font size="4"></h2>
                <h3><p class="ti">
                00:00~06:00：${rain.T00_06}<br>
                06:00~12:00：${rain.T06_12}<br>
                12:00~18:00：${rain.T12_18}<br>
                18:00~24:00：${rain.T18_24}<br></font></h3>
                <br><br><font size="2.1">データ提供：${data.copyright.title}
                <br><font color='#ff0000'><a href="https://weather.tsukumijima.net/primary_area.xml" target="_blank">より詳細な天気予報はこちら (市町村単位)
                </a></font></center>`;
            

            printHTML(html);

        })
        .catch(() => printLog("データの取得に失敗しました。正しいコードを入力したことを確認して、もう一度お試しください。通常モードに戻ります。"));
    currentMode = "normal";
}}

function handleQR(val) {
    const url = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(val)}`;
    const html = `<h4>${val}</h4><img src="${url}"><br>`;
    printHTML(html);
    currentMode = "normal";

    logBox.scrollTo({
        top: logBox.scrollHeight,
        behavior: "smooth"
    });  
}
    


function handlePost(val) {
const isZipCode = !isNaN(val) && val.length === 7;
if (isZipCode) {


    printLog("郵便番号から住所に変換します。");
    // 郵便番号APIを叩く（valをそのまま渡す）
    fetch(`https://jp-postal-code-api.ttskch.com/api/v1/${val}.json`)
        .then(res => {
            if (!res.ok) throw new Error();
            return res.json();
        })
        .then(data => {
            // 例：dataの中から住所を組み立てて表示
            const addr = data.addresses[0];
            printLog(`住所：${addr.ja.prefecture}${addr.ja.address1}${addr.ja.address2}`);
        })
        .catch(() => printLog("入力エラー。正しい住所を入力してください。"));

        

} else if (val.length >= 2) {

    
    printLog("住所から郵便番号に変換します。");
    const xhr = new XMLHttpRequest();
    xhr.open("GET", `https://corsproxy.io/?https://api.excelapi.org/post/zipcode?address=${val}`, true);
    xhr.onload = function () {
        if (this.response == ""){
            printLog(`郵便番号検索エラー`)
        }else{
            printLog(`郵便番号：${this.response}`);
        }
    }
        xhr.onerror = function () {
        printLog("通信エラーが発生しました。");
        handlePost(val);
    };
    
    // 5. 送信
    xhr.send();

} else {
    printLog("入力エラー。正しい郵便番号を入力してください。");
    handlePost(val);
}
currentMode = "normal";
}




printLog("今日はどうされましたか？");


