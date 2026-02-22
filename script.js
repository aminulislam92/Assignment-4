let interviewList = [];
let rejectList = [];
let all

let total = document.getElementById("total");
let interviewCount = document.getElementById("interviewCount");
let rejectCount = document.getElementById("rejectCount");

const allFilterBtn = document.getElementById("all-filter-btn")
const interviewFilterBtn = document.getElementById("interview-filter-btn")
const rejectFilterBtn = document.getElementById("reject-filter-btn")

let allCardsSection = document.getElementById("allCards");
console.log();

let mainContainer = document.querySelector("main");

function calculateCount(){
    total.innerText = allCardsSection.children.length
    interviewCount.innerText = interviewList.length
    rejectCount.innerText = rejectList.length
}

calculateCount();

function toggleStyle(id){
   allFilterBtn.classList.remove("bg-black","text-white");
   interviewFilterBtn.classList.remove("bg-black","text-white");
   rejectFilterBtn.classList.remove("bg-black","text-white");

   allFilterBtn.classList.add("bg-gray-300","text-black");
   interviewFilterBtn.classList.add("bg-gray-300","text-black");
   rejectFilterBtn.classList.add("bg-gray-300","text-black");

   const selected = document.getElementById(id)
//    console.log(selected)
   selected.classList.add("bg-black","text-white");
   selected.classList.remove("bg-gray-300","text-black");


}