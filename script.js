// create blank arrey ,পরে arrey চাইল্ড আইটেম পুশ করা হবে 
// interviewList -> এটা blank array হিসাবে কাজ করছে
// interviewList.length; -> এটা blank array এর child সংখ্যা হিসাবে কাজ করছে, পরে ‍array তে child data push করানো হবে।
// rejectList -> এটা blank array হিসাবে কাজ করছে
// rejectList.length; -> এটা blank array এর child সংখ্যা হিসাবে কাজ করছে, পরে ‍array তে child data push করানো হবে।

let interviewList = [];
let rejectList = [];
let currentStatus = 'all'
// নিচে DOM দিয়ে html গুলোকে ধরা হয়েছে
let total = document.getElementById("total");
let interviewCount = document.getElementById("interviewCount");
let rejectCount = document.getElementById("rejectCount");

const allFilterBtn = document.getElementById("all-filter-btn");
const interviewFilterBtn = document.getElementById("interview-filter-btn")
const rejectFilterBtn = document.getElementById("reject-filter-btn")

// allCardSection.children;-> এটা array হিসাবে কাজ করছে
// allCardSection.children.length;-> এটা array এর child সংখ্যা হিসাবে কাজ করছে
let allCardsSection = document.getElementById("allCards");


let mainContainer = document.querySelector("main");
const filterSection = document.getElementById("filtered-section");



// data push in total by function
//total.innerText,interviewCount.innerText,rejectCount.innerText -> এই ৩টি html element
// এখানে function ব্যাহারের কারন হলো paramiter দিয়ে value pass করে child item push করা হবে
// data push in total by function
function calculateCount(){
    total.innerText = allCardsSection.children.length;
    interviewCount.innerText = interviewList.length;
    rejectCount.innerText = rejectList.length;
}

calculateCount();

function toggleStyle(id){
    // console.log("click " + id)

    // if any button has black then remove
   allFilterBtn.classList.remove("bg-[#3B82F6]","text-white");
   interviewFilterBtn.classList.remove("bg-[#3B82F6]","text-white");
   rejectFilterBtn.classList.remove("bg-[#3B82F6]","text-white");
// adding bg gray for all
   allFilterBtn.classList.add("bg-gray-300","text-black");
   interviewFilterBtn.classList.add("bg-gray-300","text-black");
   rejectFilterBtn.classList.add("bg-gray-300","text-black");

   const selected = document.getElementById(id)
   currentStatus = id
//    console.log(selected)
// adding black bg for current button
   selected.classList.add("bg-[#3B82F6]","text-white");
   selected.classList.remove("bg-gray-300","text-black");

   if(id == 'interview-filter-btn'){
    allCardsSection.classList.add('hidden')
    filterSection.classList.remove('hidden')
    renderInterview();
   }else if(id == 'all-filter-btn'){
    allCardsSection.classList.remove('hidden')
    filterSection.classList.add('hidden')
   }else if(id =='reject-filter-btn'){
      allCardsSection.classList.add('hidden')
    filterSection.classList.remove('hidden')
    renderReject();
   }


}

document.querySelector("main").addEventListener("click", function(event){

    if(event.target.closest(".delete-btn")){

        const card = event.target.closest(".card");

        const fastName = card.querySelector(".fastName").innerText;
        

        // Remove from interview list
        interviewList = interviewList.filter(
            item => item.fastName !== fastName
        );

        // Remove from reject list
        rejectList = rejectList.filter(
            item => item.fasatName !== fastName
        );

        card.remove();

        calculateCount();
    }

});
// parent element থেকে যেকোন child element-এ যাওয়া (main থেকে তার যেকোন চাইল্ডে যাওয়া)
// child element থেকে তার ইমিডিয়েট প্যারেন্ট element থেকে যাওয়ার জন্য parentNode ব্যবহার করা হয়
// parent element থেকে যেকোন child element-এ যাওয়া জন্য target ব্যবহার করা হয়, (main থেকে তার যেকোন চাইল্ডে যাওয়া)
mainContainer.addEventListener('click',function(event){
    console.log(event.target.classList.contains('interview-btn'))
if(event.target.classList.contains('interview-btn')){
    
    // console.log(event.target.parentNode.parentNode)
    // e-> যদি click হয়, target-> তুমি ‍select করবা main element-এর যেকোন child, এরপর parentNode তুমি আবার পুনরাই তার immediate child-কে ধরবা, আবার পুনরাই parentNode তুমি পুনরাই তার পূর্ববর্তী immediate child-কে ধরবা
    //parentNode.querySelector তুমি শুধু পুরো card জোরে এখন একটা class name ধরবা
    //parentNode.querySelector তুমি শুধু পুরো card জোরে এখন শুধু একটাই class name ধরবা
    const parentNode = event.target.parentNode.parentNode
 //parentNode.querySelector তুমি শুধু পুরো card জোরে এখন শুধু একটাই class name ধরবা, তারপর তার innerText ধরবা
    const fastName = parentNode.querySelector('.fastName').innerText
    const developer = parentNode.querySelector('.developer').innerText
    const jobTime = parentNode.querySelector('.jobTime').innerText
    const status = parentNode.querySelector('.status').innerText
    const notes = parentNode.querySelector('.notes').innerText

     parentNode.querySelector('.status').innerText = "Interview"
    // create arrey
    const cardInfo = {
        fastName,
        developer,
        jobTime,
        status: 'Interview',
        notes
    }
    
    const fastNameExist = interviewList.find (item=>item.fastName ==cardInfo.fastName)
   
    
    // খোজে দেখো উপরের array-তে item match করেকিনা cradInfo array-এর সাথে, আর সেটা একটা variable-এ সেট করো
    // যদি variable-এর store করা item না থাকে, তবে তুমি interviewList blank array-তে cardInfo array-টি push করো
if (!fastNameExist){
    interviewList.push(cardInfo)
}
rejectList = rejectList.filter(item=> item.fastName != cardInfo.fastName);

if(currentStatus == "reject-filter-btn"){
    renderReject()
}
calculateCount()
// console.log(interviewList)
}
else if(event.target.classList.contains('reject-btn')){
    
    // console.log(event.target.parentNode.parentNode)
    // e-> যদি click হয়, target-> তুমি ‍select করবা main element-এর যেকোন child, এরপর parentNode তুমি আবার পুনরাই তার immediate child-কে ধরবা, আবার পুনরাই parentNode তুমি পুনরাই তার পূর্ববর্তী immediate child-কে ধরবা
    //parentNode.querySelector তুমি শুধু পুরো card জোরে এখন একটা class name ধরবা
    //parentNode.querySelector তুমি শুধু পুরো card জোরে এখন শুধু একটাই class name ধরবা
    const parentNode = event.target.parentNode.parentNode
 //parentNode.querySelector তুমি শুধু পুরো card জোরে এখন শুধু একটাই class name ধরবা, তারপর তার innerText ধরবা
    const fastName = parentNode.querySelector('.fastName').innerText
    const developer = parentNode.querySelector('.developer').innerText
    const jobTime = parentNode.querySelector('.jobTime').innerText
    const status = parentNode.querySelector('.status').innerText
    const notes = parentNode.querySelector('.notes').innerText

     parentNode.querySelector('.status').innerText = "Reject"
    // create arrey
    const cardInfo = {
        fastName,
        developer,
        jobTime,
        status: 'Reject',
        notes
    }
    
    const fastNameExist = rejectList.find (item=>item.fastName ==cardInfo.fastName)
   
    
    // খোজে দেখো উপরের array-তে item match করেকিনা cradInfo array-এর সাথে, আর সেটা একটা variable-এ সেট করো
    // যদি variable-এর store করা item না থাকে, তবে তুমি interviewList blank array-তে cardInfo array-টি push করো
if (!fastNameExist){
    rejectList.push(cardInfo)
}
interviewList = interviewList.filter(item=> item.fastName != cardInfo.fastName);

if(currentStatus == "interview-filter-btn"){
    renderInterview()
}
calculateCount()

// console.log(interviewList)
}
})


function renderInterview(){
filterSection.innerHTML = ''
for(let interview of interviewList){
    // console.log(interview)
    let div = document.createElement('div');
    div.className = 'card flex justify-between border p-8'
    div.innerHTML = `
    <div class="space-y-6">

<p class="fastName text-4xl text-[#002C5C]">${interview.fastName}</p>
<p class="developer">${interview.developer}</p>
<p class="jobTime">${interview.jobTime}</p>

<p class="status text-[#002C5C]">${interview.status}</p>

<p class="notes">${interview.notes}</p>

<div class="flex gap-5">
<button class="interview-btn border border-green-500 px-4 py-2 text-[#10B981]">
Interview
</button>

<button class="reject-btn border border-red-500 px-4 py-2 text-[#EF4444]">
Rejected
</button>
</div>

</div>
<div class="delete-btn cursor-pointer">
    <svg width="12" height="13" viewBox="0 0 12 13" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M11.5 2H9V1.5C9 1.10218 8.84196 0.720644 8.56066 0.43934C8.27936 0.158035 7.89782 0 7.5 0H4.5C4.10218 0 3.72064 0.158035 3.43934 0.43934C3.15804 0.720644 3 1.10218 3 1.5V2H0.5C0.367392 2 0.240215 2.05268 0.146447 2.14645C0.0526785 2.24021 0 2.36739 0 2.5C0 2.63261 0.0526785 2.75979 0.146447 2.85355C0.240215 2.94732 0.367392 3 0.5 3H1V12C1 12.2652 1.10536 12.5196 1.29289 12.7071C1.48043 12.8946 1.73478 13 2 13H10C10.2652 13 10.5196 12.8946 10.7071 12.7071C10.8946 12.5196 11 12.2652 11 12V3H11.5C11.6326 3 11.7598 2.94732 11.8536 2.85355C11.9473 2.75979 12 2.63261 12 2.5C12 2.36739 11.9473 2.24021 11.8536 2.14645C11.7598 2.05268 11.6326 2 11.5 2ZM4 1.5C4 1.36739 4.05268 1.24021 4.14645 1.14645C4.24021 1.05268 4.36739 1 4.5 1H7.5C7.63261 1 7.75979 1.05268 7.85355 1.14645C7.94732 1.24021 8 1.36739 8 1.5V2H4V1.5ZM10 12H2V3H10V12ZM5 5.5V9.5C5 9.63261 4.94732 9.75979 4.85355 9.85355C4.75979 9.94732 4.63261 10 4.5 10C4.36739 10 4.24021 9.94732 4.14645 9.85355C4.05268 9.75979 4 9.63261 4 9.5V5.5C4 5.36739 4.05268 5.24021 4.14645 5.14645C4.24021 5.05268 4.36739 5 4.5 5C4.63261 5 4.75979 5.05268 4.85355 5.14645C4.94732 5.24021 5 5.36739 5 5.5ZM8 5.5V9.5C8 9.63261 7.94732 9.75979 7.85355 9.85355C7.75979 9.94732 7.63261 10 7.5 10C7.36739 10 7.24021 9.94732 7.14645 9.85355C7.05268 9.75979 7 9.63261 7 9.5V5.5C7 5.36739 7.05268 5.24021 7.14645 5.14645C7.24021 5.05268 7.36739 5 7.5 5C7.63261 5 7.75979 5.05268 7.85355 5.14645C7.94732 5.24021 8 5.36739 8 5.5Z" fill="#64748B"/>
     </svg>

</div>
    `

    filterSection.appendChild(div)
}
}
function renderReject(){
filterSection.innerHTML = ''
for(let reject of rejectList){
    // console.log(interview)
    let div = document.createElement('div');
    div.className = 'card flex justify-between border p-8'
    div.innerHTML = `
    <div class="space-y-6">

<p class="fastName text-4xl text-[#002C5C]">${reject.fastName}</p>
<p class="developer">${reject.developer}</p>
<p class="jobTime">${reject.jobTime}</p>

<p class="status text-[#002C5C]">${reject.status}</p>

<p class="notes">${reject.notes}</p>

<div class="flex gap-5">
<button class="interview-btn border border-green-500 px-4 py-2 text-[#10B981]">
Interview
</button>

<button class="reject-btn border border-red-500 px-4 py-2 text-[#EF4444]">
Rejected
</button>
</div>

</div>
<div class="delete-btn cursor-pointer">
    <svg width="12" height="13" viewBox="0 0 12 13" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M11.5 2H9V1.5C9 1.10218 8.84196 0.720644 8.56066 0.43934C8.27936 0.158035 7.89782 0 7.5 0H4.5C4.10218 0 3.72064 0.158035 3.43934 0.43934C3.15804 0.720644 3 1.10218 3 1.5V2H0.5C0.367392 2 0.240215 2.05268 0.146447 2.14645C0.0526785 2.24021 0 2.36739 0 2.5C0 2.63261 0.0526785 2.75979 0.146447 2.85355C0.240215 2.94732 0.367392 3 0.5 3H1V12C1 12.2652 1.10536 12.5196 1.29289 12.7071C1.48043 12.8946 1.73478 13 2 13H10C10.2652 13 10.5196 12.8946 10.7071 12.7071C10.8946 12.5196 11 12.2652 11 12V3H11.5C11.6326 3 11.7598 2.94732 11.8536 2.85355C11.9473 2.75979 12 2.63261 12 2.5C12 2.36739 11.9473 2.24021 11.8536 2.14645C11.7598 2.05268 11.6326 2 11.5 2ZM4 1.5C4 1.36739 4.05268 1.24021 4.14645 1.14645C4.24021 1.05268 4.36739 1 4.5 1H7.5C7.63261 1 7.75979 1.05268 7.85355 1.14645C7.94732 1.24021 8 1.36739 8 1.5V2H4V1.5ZM10 12H2V3H10V12ZM5 5.5V9.5C5 9.63261 4.94732 9.75979 4.85355 9.85355C4.75979 9.94732 4.63261 10 4.5 10C4.36739 10 4.24021 9.94732 4.14645 9.85355C4.05268 9.75979 4 9.63261 4 9.5V5.5C4 5.36739 4.05268 5.24021 4.14645 5.14645C4.24021 5.05268 4.36739 5 4.5 5C4.63261 5 4.75979 5.05268 4.85355 5.14645C4.94732 5.24021 5 5.36739 5 5.5ZM8 5.5V9.5C8 9.63261 7.94732 9.75979 7.85355 9.85355C7.75979 9.94732 7.63261 10 7.5 10C7.36739 10 7.24021 9.94732 7.14645 9.85355C7.05268 9.75979 7 9.63261 7 9.5V5.5C7 5.36739 7.05268 5.24021 7.14645 5.14645C7.24021 5.05268 7.36739 5 7.5 5C7.63261 5 7.75979 5.05268 7.85355 5.14645C7.94732 5.24021 8 5.36739 8 5.5Z" fill="#64748B"/>
     </svg>

</div>
    `

    filterSection.appendChild(div)
}
}