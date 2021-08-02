const start = document.querySelector("#start");
const quiz = document.querySelector('#quiz')
const input = document.querySelector("#answer");
const answerBox = document.querySelector("#answer-box");
const count = document.querySelector("#count")
const passButton = document.querySelector("#pass")
const complete = document.querySelector("#complete")
const resultButton = document.querySelector("#result");


let visited=[]
let passed=[]

start.addEventListener("click", () => {
    start.style.display = "none";
    quiz.style.display = "block";
    startQuiz();
})

resultButton.addEventListener("click", () => {
    const xhr = new XMLHttpRequest();
    const data = new FormData()

    data.append('correct', 47 - passed.length)
    data.append('pass', passed.length)
    data.append('passList', passed)
    xhr.open('POST', '/', true);
    xhr.send(data)
    
    
    window.location.href = "/result"

    visited = []
    passed = []
})

function startQuiz() {
    let prefecture = getRandomPrefecture()
    let titleText = prefecture.getAttribute("title")
    console.log(titleText)

    input.addEventListener('keyup', (e) => {
        if (e.keyCode == 13){
            const inputText = e.target.value
            if (visited.length === 47) {
                quiz.style.display = "none";
                complete.style.display = "block";
            } else if (inputText.toLowerCase() === titleText.toLowerCase()) {
                answerBox.innerText = "Correct!";

                input.value = "";
                prefecture.style.fill = "#006d77";


                prefecture = getRandomPrefecture();
                titleText = prefecture.getAttribute("title")
                count.innerText = visited.length
                console.log(titleText)
            } else {
                answerBox.innerText = "Try again!";
            }
        }
    })


    passButton.addEventListener("click", () => {
        passed.push(titleText)
        if (visited.length === 47) {
            quiz.style.display = "none";
            complete.style.display = "block";
        } else {
            input.value = "";
            prefecture.style.fill = "#006d77";


            prefecture = getRandomPrefecture();
            titleText = prefecture.getAttribute("title")
            count.innerText = visited.length
            console.log(titleText)
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