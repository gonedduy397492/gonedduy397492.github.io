const pages = document.querySelectorAll(".page");
const music = document.getElementById("bgMusic");
const musicBtn = document.getElementById("musicBtn");

function toggleMusic(){
  if(music.paused){
    music.play();
    musicBtn.innerText = "暫停音樂";
  } else {
    music.pause();
    musicBtn.innerText = "播放音樂";
  }
}

// 頁面淡入
function showPage(id){
  pages.forEach(p=>{
    p.classList.remove("active");
  });
  setTimeout(()=>{
    document.getElementById(id).classList.add("active");
  },600);
}

// 5題資料
const questions = [
  {q:"1.當你回到家，最希望空間變成哪一種狀態？", options:[
    {text:"A. 安靜、被包覆、慢慢鬆下來", result:["moon"]},
    {text:"B. 清爽、乾淨、呼吸變深", result:["beyond","ocean","grounded"]},
    {text:"C. 有陽光、有活力、有精神", result:["blessings"]},
    {text:"D. 浪漫、溫柔、有情緒流動", result:["rose","bloom"]}
  ]},
  {q:"2.你最近比較接近哪一種生活節奏？", options:[
    {text:"A. 很忙，很累，需要被好好安放", result:["moon"]},
    {text:"B. 普通，但想讓生活更有儀式感", result:["rose","bloom","beyond","ocean","grounded"]},
    {text:"C. 有點悶，希望轉換心情", result:["blessings"]}
  ]},
  {q:"3.如果用一個場景形容你喜歡的味道？", options:[
    {text:"A. 森林芬多精", result:["grounded","beyond"]},
    {text:"B. 海邊微風", result:["ocean"]},
    {text:"C. 花園裡慢慢綻放的花", result:["bloom","rose"]},
    {text:"D. 午後陽光", result:["blessings"]}
  ]},
  {q:"4.你通常什麼時候最想點香氛？", options:[
    {text:"A. 睡前 / 洗完澡後", result:["moon"]},
    {text:"B. 白天工作或閱讀時", result:["grounded","ocean","beyond","rose"]},
    {text:"C. 週末或與重要的人相處時", result:["blessings","bloom"]}
  ]},
  {q:"5.你比較不喜歡哪一種味道？", options:[
    {text:"A. 太甜、太濃的", exclude:["bloom","rose"]},
    {text:"B. 太冷、太空氣感的", exclude:["grounded","ocean"]},
    {text:"C. 沒有特別排斥", exclude:[]}
  ]}
];

let current = 0;
let scores = {};

const resultTextMap = {
  bloom:"綻放 - 溫柔玫瑰與天竺葵",
  rose:"玫瑰森林 - 林間盛開的優雅玫瑰",
  blessings:"大吉大利 - 帶來愉悅與好運",
  moon:"月光城堡 - 放鬆身心，陪伴休息",
  grounded:"日出森林 - 感受大地沉靜",
  beyond:"無界 - 木質微辣，自在無限",
  ocean:"湛藍海洋 - 清爽呼吸，自由海風"
};

function startQuiz(){
  showPage("quizPage");
  current=0;
  scores={};
  loadQuestion();
}

function loadQuestion(){
  const q = questions[current];
  document.getElementById("question").innerText = q.q;
  const optionsDiv = document.getElementById("options");
  optionsDiv.innerHTML = "";

  q.options.forEach((o,index)=>{
    const btn = document.createElement("button");
    btn.innerText = o.text;
    btn.onclick = ()=>selectOption(o);
    optionsDiv.appendChild(btn);

    setTimeout(()=>{ btn.classList.add("show"); }, index*150);
  });
}

function selectOption(option){
  if(option.result){
    option.result.forEach(r=>{
      scores[r] = (scores[r]||0)+1;
    });
  }
  if(option.exclude){
    option.exclude.forEach(r=>delete scores[r]);
  }
  current++;
  if(current<questions.length){
    loadQuestion();
  } else {
    showResult();
  }
}

function showResult(){
  let final = Object.keys(scores).reduce((a,b)=>scores[a]>scores[b]?a:b);
  document.getElementById("resultImg").src=`images/${final}.png`;
  document.getElementById("resultText").innerText = ""; // 隱藏文字
  showPage("resultPage");
}

function restart(){
  current=0;
  scores={};
  showPage("startPage");
}
