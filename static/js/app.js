const startButton = document.querySelector("#start");
const quiz = document.querySelector('#quiz');
const input = document.querySelector("#answer");
const answerBox = document.querySelector("#answer-box");
const count = document.querySelector("#count");
const passButton = document.querySelector("#pass");
const complete = document.querySelector("#complete");
const resultButton = document.querySelector("#result");

let dataFile = JSON.parse('{"JP-01": "北海道","JP-02": "青森", "JP-03":"岩手", "JP-04": "宮城", "JP-05": "秋田", "JP-06": "山形", "JP-07": "福島", "JP-08": "茨城", "JP-09": "栃木", "JP-10": "群馬", "JP-11": "埼玉", "JP-12": "千葉", "JP-13": "東京", "JP-14": "神奈川", "JP-15": "新潟","JP-16": "富山","JP-17": "石川","JP-18": "福井","JP-19": "山梨","JP-20": "長野","JP-21": "岐阜","JP-22": "静岡","JP-23": "愛知","JP-24": "三重","JP-25": "滋賀","JP-26": "京都","JP-27": "大阪","JP-28": "兵庫","JP-29": "奈良","JP-30": "和歌山","JP-31": "鳥取","JP-32": "島根","JP-33": "岡山","JP-34": "広島","JP-35": "山口","JP-36": "徳島","JP-37": "香川","JP-38": "愛媛","JP-39": "高知","JP-40": "福岡","JP-41": "佐賀","JP-42": "長崎","JP-43": "熊本","JP-44": "大分","JP-45": "宮崎","JP-46": "鹿児島","JP-47": "沖縄"}')

let visited=[]
let passed=[]

const langageBox = document.querySelector("#langage")
let lang = langageBox.value

langageBox.addEventListener("change", () => {
    lang = langageBox.value
})

startButton.addEventListener("click", () => {
    startButton.style.display = "none";
    quiz.style.display = "block";

    startQuiz();

    if (lang == "jp") input.placeholder = "都道府県名";
    langageBox.disabled = true;
})

resultButton.addEventListener("click", () => {
    visited = []
    passed = []
})

function startQuiz() {
    let prefObj = getRandomPrefecture()

    let prefName = prefObj.getAttribute("title")
    if (lang === "jp") prefName = dataFile[prefObj.id];
    console.log(prefName)

    input.addEventListener('keyup', (e) => {
        if (e.keyCode == 13){
            const inputText = e.target.value
            if (visited.length === 47) {
                getResultScore()
            } else if (inputText.toLowerCase() === prefName.toLowerCase()) {
                answerBox.innerText = "Correct!";

                input.value = "";
                prefObj.style.fill = "#006d77";

                prefObj = getRandomPrefecture()

                prefName = prefObj.getAttribute("title")
                if (lang === "jp") prefName = dataFile[prefObj.id];

                count.innerText = visited.length
                console.log(prefName)
            } else {
                answerBox.innerText = "Try again!";
            }
        }
    })

    passButton.addEventListener("click", () => {
        passed.push(prefName)
        if (visited.length === 47) {
            getResultScore()
        } else {
            input.value = "";
            prefObj.style.fill = "#006d77";

            prefObj = getRandomPrefecture()

            prefName = prefObj.getAttribute("title")
            if (lang === "jp") prefName = dataFile[prefObj.id];
            
            console.log(prefName)
            count.innerText = visited.length
        }
    })
}

function getRandomPrefecture() {
    let prefectureNum = Math.floor(Math.random()*47+1);

    while (visited.includes(prefectureNum)) {
        prefectureNum = Math.floor(Math.random()*47+1);
    }

    visited.push(prefectureNum)

    if (prefectureNum < 10) {
        prefectureNum = "0" + prefectureNum
    }

    const selected = document.querySelector("#JP-" + prefectureNum);
    selected.style.fill = "red";

    return selected;
}


function getResultScore() {
    quiz.style.display = "none";
    complete.style.display = "block";

    const correctValue = document.querySelector('#correctValue')
    const passedValue = document.querySelector('#passedValue')
    const passedList = document.querySelector('#passedList')
    correctValue.value = 47 - passed.length
    passedValue.value = passed.length
    passedList.value = passed
}
