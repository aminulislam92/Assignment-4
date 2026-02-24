// create blank array, পরে array তে child item push করা হবে
let interviewList = [];
let rejectList = [];
let currentStatuse = "all";

// নিচে DOM দিয়ে html element-গুলোকে ধরা হয়েছে
let total = document.getElementById("total");
let interviewCount = document.getElementById("interviewCount");
let rejectCount = document.getElementById("rejectCount");
let jobRepot = document.getElementById("jobRepot");

const allFilterBtn = document.getElementById("all-filter-btn");
const interviewFilterBtn = document.getElementById("interview-filter-btn");
const rejectFilterBtn = document.getElementById("reject-filter-btn");

const allCardSection = document.getElementById("allCards");
const mainContainer = document.querySelector("main");
const filteredSection = document.getElementById("filtered-section");

// allCardSection.children;-> এটা array হিসাবে কাজ করছে
// allCardSection.children.length;-> এটা array এর child সংখ্যা হিসাবে কাজ করছে
// interviewList -> এটা blank array হিসাবে কাজ করছে
// interviewList.length; -> এটা blank array এর child সংখ্যা হিসাবে কাজ করছে, পরে ‍array তে child data push করানো হবে।
// rejectList -> এটা blank array হিসাবে কাজ করছে
// rejectList.length; -> এটা blank array এর child সংখ্যা হিসাবে কাজ করছে, পরে ‍array তে child data push করানো হবে।
// data push in total by function
// total.innerText, interviewCount.innerText, rejectCount.innerText -> এই ৩টি html element-এর ভিতরে value pass করা হয়েছে।
// এখানে function calculateCount() ব্যাহারের কারন হলো: array-এর length-কে সে header-এ counter value হিসেবে pass করছে
function calculateCount() {
  // total.innerText -> html element-এর ভিতরে value pass করা হয়েছে।
  total.innerText = allCardSection.children.length;
  interviewCount.innerText = interviewList.length;
  rejectCount.innerText = rejectList.length;
}
calculateCount();

// toggle button working
function toggleStyle(id) {
  // if any bnt has black then remove black bg
  allFilterBtn.classList.remove("bg-black", "text-white");
  interviewFilterBtn.classList.remove("bg-black", "text-white");
  rejectFilterBtn.classList.remove("bg-black", "text-white");

  // adding gray bg for all
  allFilterBtn.classList.add("bg-gray-300", "text-black");
  interviewFilterBtn.classList.add("bg-gray-300", "text-black");
  rejectFilterBtn.classList.add("bg-gray-300", "text-black");

  const selectBtn = document.getElementById(id);
  currentStatuse = id;

  // adding black bg for current btn
  selectBtn.classList.remove("bg-gray-300", "text-black");
  selectBtn.classList.add("bg-black", "text-white");

  // ফিল্টার অনুযায়ী কার্ডগুলো দেখানোর জন্য
  if (id == "interview-filter-btn") {
    allCardSection.classList.add("hidden");
    filteredSection.classList.remove("hidden");
    renderInterview();
  } else if (id == "all-filter-btn") {
    filteredSection.classList.add("hidden");
    allCardSection.classList.remove("hidden");
    jobRepot.innerText = allCardSection.children.length + " Jobs";
  } else if (id == "reject-filter-btn") {
    allCardSection.classList.add("hidden");
    filteredSection.classList.remove("hidden");
    renderRejected();
  }
}

// delete button working
mainContainer.addEventListener("click", function (e) {
  //
  if (e.target.closest(".delete-btn")) {
    const card = e.target.closest(".card");
    const fastName = card.querySelector(".fastName").innerText;
    // remove from interview list
    interviewList = interviewList.filter((item) => item.fastName !== fastName);

    // remove from reject list
    rejectList = rejectList.filter((item) => item.fastName !== fastName);
    card.remove();

    calculateCount();
    // update job report based on current filter
    if (currentStatuse === "interview-filter-btn") {
      if (interviewList.length === 0) {
        jobRepot.innerText = "0 Job";
      } else {
        jobRepot.innerText =
          interviewList.length +
          " of " +
          allCardSection.children.length +
          " Jobs";
      }
    } else if (currentStatuse === "reject-filter-btn") {
      if (rejectList.length === 0) {
        jobRepot.innerText = "0 Job";
      } else {
        jobRepot.innerText =
          rejectList.length + " of " + allCardSection.children.length + " Jobs";
      }
    } else {
      jobRepot.innerText = allCardSection.children.length + " Jobs";
    }
  }
});

// parent element থেকে যেকোন child element-এ যাওয়া জন্য target ব্যবহার করা হয়, (main থেকে তার যেকোন চাইল্ডে যাওয়া)
// child element থেকে তার immediate parent element-এ যাওয়ার জন্য- parentNode ব্যবহার করা হয়
// e-> যদি click হয়, target-> তুমি ‍select করবা main element-এর যেকোন child, এরপর parentNode তুমি আবার পুনরাই তার immediate child-কে ধরবা, আবার পুনরাই parentNode তুমি পুনরাই তার পূর্ববর্তী immediate child-কে ধরবা
//
mainContainer.addEventListener("click", function (e) {
  if (e.target.classList.contains("interview-btn")) {
    const parentNode = e.target.parentNode.parentNode;
    //parentNode.querySelector তুমি শুধু পরো card জোডে এখন শুধু একটাই class name ধরবা, তারপর তার innerText ধরবা
    const fastName = parentNode.querySelector(".fastName").innerHTML;
    const developer = parentNode.querySelector(".developer").innerHTML;
    const jobTime = parentNode.querySelector(".jobTime").innerHTML;
    const status = parentNode.querySelector(".status").innerHTML;
    const notes = parentNode.querySelector(".notes").innerHTML;

    // status change for dynamicly "interview"
    parentNode.querySelector(".status").innerText = "interview";

    // create array
    const cardInfo = {
      fastName,
      developer,
      jobTime,
      status: "interview", // status change for dynamicly- "interview"
      notes,
    };

    // খোজে দেখো উপরের array-তে item match করেকিনা cradInfo array-এর সাথে, আর সেটা একটা variable-এ সেট করো
    const fastNameExist = interviewList.find(
      (item) => item.fastName == cardInfo.fastName,
    );

    // যদি variable-এর store করা item না থাকে, তবে তুমি interviewList blank array-তে cardInfo array-টি push করো
    if (!fastNameExist) {
      interviewList.push(cardInfo);
    }

    // interview থেকে filter করে rejectList-এ পাঠানো
    rejectList = rejectList.filter(
      (item) => item.fastName != cardInfo.fastName,
    );
    //black array-তে item push হওয়ার পরে, counter function টি কে এখানে আবার কলকরা হলো interview counter-এ count show করার জন্য
    calculateCount();

    if (currentStatuse == "reject-filter-btn") {
      // click করার পরে যতে card div-টি render হয় filtered-section-এ, এইজন্য render function-টি এখানে কলকরা হয়েছে
      // এটি একটি render function / card create function
      renderRejected();
    }
  } else if (e.target.classList.contains("reject-btn")) {
    const parentNode = e.target.parentNode.parentNode;
    //parentNode.querySelector তুমি শুধু পরো card জোডে এখন শুধু একটাই class name ধরবা, তারপর তার innerText ধরবা
    const fastName = parentNode.querySelector(".fastName").innerHTML;
    const developer = parentNode.querySelector(".developer").innerHTML;
    const jobTime = parentNode.querySelector(".jobTime").innerHTML;
    const status = parentNode.querySelector(".status").innerHTML;
    const notes = parentNode.querySelector(".notes").innerHTML;

    // status change for dynamicly "Rejected"
    parentNode.querySelector(".status").innerText = "Rejected";

    // create array
    const cardInfo = {
      fastName,
      developer,
      jobTime,
      status: "Rejected", // status change for dynamicly- "Rejected"
      notes,
    };

    // খোজে দেখো উপরের array-তে item match করেকিনা cradInfo array-এর সাথে, আর সেটা একটা variable-এ সেট করো
    const fastNameExist = rejectList.find(
      (item) => item.fastName == cardInfo.fastName,
    );

    // যদি variable-এর store করা item না থাকে, তবে তুমি interviewList blank array-তে cardInfo array-টি push করো
    if (!fastNameExist) {
      rejectList.push(cardInfo);
    }

    // rejectList থেকে filter করে interviewList-এ পাঠানো
    interviewList = interviewList.filter(
      (item) => item.fastName != cardInfo.fastName,
    );

    if (currentStatuse == "interview-filter-btn") {
      // click করার পরে যতে card div-টি render হয় filtered-section-এ, এইজন্য render function-টি এখানে কলকরা হয়েছে
      // এটি একটি render function / card create function
      renderInterview();
    }

    //black array-তে item push হওয়ার পরে, counter function টি কে এখানে আবার কলকরা হলো interview counter-এ count show করার জন্য
    calculateCount();
  }
});

// rendering function-> renderInterview()
// create every card in interview when click
function renderInterview() {
  //প্রথমে filteredSection খালি থাকেবে
  filteredSection.innerHTML = "";
  //
  if (interviewList.length == 0) {
    jobRepot.innerText = "0 Job";
  } else {
    jobRepot.innerText =
      interviewList.length + " of " + allCardSection.children.length + " Jobs";
  }
  //
  if (interviewList.length == 0) {
    filteredSection.innerHTML = `
    <div class="bg-white rounded text-center py-10 md:py-30 space-y-1.5 md:space-y-4 px-4">
 
               <img src="jobs.png" class="mx-auto w-20 opacity-60">
                <h2 class="text-2xl text-[#002C5C] font-semibold">
                    No jobs available
                </h2>
                <p class="text-gray-300 text-sm">
                    Check back soon for new job opportunities
                </p>
    </div>
    `;
  }
  // for loop
  for (let interview of interviewList) {
    let div = document.createElement("div");
    div.classList = `card flex justify-between border p-8`;
    div.innerHTML = `
      <div class="space-y-6">

                    <p class="fastName text-2xl font-medium md:text-4xl text-[#002C5C]">${interview.fastName}</p>
                    <p class="developer text-gray-500">${interview.developer}</p>
                    <p class="jobTime text-gray-500">${interview.jobTime}</p>

                    <p class="status text-[#002C5C] bg-[#EEF4FF] inline-block px-4 py-2 rounded">${interview.status}</p>

                    <p class="notes">${interview.notes}</p>

                    <div class="flex gap-5">
                        <button class="interview-btn cursor-pointer border border-green-500 px-4 py-2 text-[#10B981] rounded text-sm font-semibold">
                            Interview
                        </button>

                        <button class="reject-btn cursor-pointer border border-red-500 px-4 py-2 text-[#EF4444] rounded text-sm font-semibold">
                            Rejected
                        </button>
                    </div>

                </div>
                <div class="delete-btn cursor-pointer mt-3">
                    <svg width="12" height="13" viewBox="0 0 12 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M11.5 2H9V1.5C9 1.10218 8.84196 0.720644 8.56066 0.43934C8.27936 0.158035 7.89782 0 7.5 0H4.5C4.10218 0 3.72064 0.158035 3.43934 0.43934C3.15804 0.720644 3 1.10218 3 1.5V2H0.5C0.367392 2 0.240215 2.05268 0.146447 2.14645C0.0526785 2.24021 0 2.36739 0 2.5C0 2.63261 0.0526785 2.75979 0.146447 2.85355C0.240215 2.94732 0.367392 3 0.5 3H1V12C1 12.2652 1.10536 12.5196 1.29289 12.7071C1.48043 12.8946 1.73478 13 2 13H10C10.2652 13 10.5196 12.8946 10.7071 12.7071C10.8946 12.5196 11 12.2652 11 12V3H11.5C11.6326 3 11.7598 2.94732 11.8536 2.85355C11.9473 2.75979 12 2.63261 12 2.5C12 2.36739 11.9473 2.24021 11.8536 2.14645C11.7598 2.05268 11.6326 2 11.5 2ZM4 1.5C4 1.36739 4.05268 1.24021 4.14645 1.14645C4.24021 1.05268 4.36739 1 4.5 1H7.5C7.63261 1 7.75979 1.05268 7.85355 1.14645C7.94732 1.24021 8 1.36739 8 1.5V2H4V1.5ZM10 12H2V3H10V12ZM5 5.5V9.5C5 9.63261 4.94732 9.75979 4.85355 9.85355C4.75979 9.94732 4.63261 10 4.5 10C4.36739 10 4.24021 9.94732 4.14645 9.85355C4.05268 9.75979 4 9.63261 4 9.5V5.5C4 5.36739 4.05268 5.24021 4.14645 5.14645C4.24021 5.05268 4.36739 5 4.5 5C4.63261 5 4.75979 5.05268 4.85355 5.14645C4.94732 5.24021 5 5.36739 5 5.5ZM8 5.5V9.5C8 9.63261 7.94732 9.75979 7.85355 9.85355C7.75979 9.94732 7.63261 10 7.5 10C7.36739 10 7.24021 9.94732 7.14645 9.85355C7.05268 9.75979 7 9.63261 7 9.5V5.5C7 5.36739 7.05268 5.24021 7.14645 5.14645C7.24021 5.05268 7.36739 5 7.5 5C7.63261 5 7.75979 5.05268 7.85355 5.14645C7.94732 5.24021 8 5.36739 8 5.5Z"
                            fill="#64748B" />
                    </svg>

                </div>
      `;
    filteredSection.appendChild(div);
  }
}

// rendering function-> renderRejected()
// create every card in rejected when click
function renderRejected() {
  //প্রথমে filteredSection খালি থাকেবে
  filteredSection.innerHTML = "";
  //
  if (rejectList.length == 0) {
    jobRepot.innerText = "0 Job";
  } else {
    jobRepot.innerText =
      rejectList.length + " of " + allCardSection.children.length + " Jobs";
  }
  // jobRepot.innerText = allCardSection.children.length;
  if (rejectList.length == 0) {
    filteredSection.innerHTML = `
    <div class="text-center py-20 space-y-4">
 
               <img src="jobs.png" class="mx-auto w-20 opacity-60">
                <h2 class="text-blue-500 font-semibold">
                    No jobs available
                </h2>
                <p class="text-gray-400 text-sm">
                    Check back soon for new job opportunities
                </p>
    </div>
    `;
  }

  // for loop
  for (let rejected of rejectList) {
    let div = document.createElement("div");
    div.classList = `card flex justify-between border p-8`;
    div.innerHTML = `
      <div class="space-y-6">

                    <p class="fastName text-2xl font-medium md:text-4xl text-[#002C5C]">${rejected.fastName}</p>
                    <p class="developer text-gray-500">${rejected.developer}</p>
                    <p class="jobTime text-gray-500">${rejected.jobTime}</p>

                    <p class="status text-[#002C5C] bg-[#EEF4FF] inline-block px-4 py-2 rounded">${rejected.status}</p>

                    <p class="notes">${rejected.notes}</p>

                    <div class="flex gap-5">
                        <button class="interview-btn cursor-pointer border border-green-500 px-4 py-2 text-[#10B981] rounded text-sm font-semibold">
                            Interview
                        </button>

                        <button class="reject-btn cursor-pointer border border-red-500 px-4 py-2 text-[#EF4444] rounded text-sm font-semibold">
                            Rejected
                        </button>
                    </div>

                </div>
                <div class="delete-btn cursor-pointer mt-3">
                    <svg width="12" height="13" viewBox="0 0 12 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M11.5 2H9V1.5C9 1.10218 8.84196 0.720644 8.56066 0.43934C8.27936 0.158035 7.89782 0 7.5 0H4.5C4.10218 0 3.72064 0.158035 3.43934 0.43934C3.15804 0.720644 3 1.10218 3 1.5V2H0.5C0.367392 2 0.240215 2.05268 0.146447 2.14645C0.0526785 2.24021 0 2.36739 0 2.5C0 2.63261 0.0526785 2.75979 0.146447 2.85355C0.240215 2.94732 0.367392 3 0.5 3H1V12C1 12.2652 1.10536 12.5196 1.29289 12.7071C1.48043 12.8946 1.73478 13 2 13H10C10.2652 13 10.5196 12.8946 10.7071 12.7071C10.8946 12.5196 11 12.2652 11 12V3H11.5C11.6326 3 11.7598 2.94732 11.8536 2.85355C11.9473 2.75979 12 2.63261 12 2.5C12 2.36739 11.9473 2.24021 11.8536 2.14645C11.7598 2.05268 11.6326 2 11.5 2ZM4 1.5C4 1.36739 4.05268 1.24021 4.14645 1.14645C4.24021 1.05268 4.36739 1 4.5 1H7.5C7.63261 1 7.75979 1.05268 7.85355 1.14645C7.94732 1.24021 8 1.36739 8 1.5V2H4V1.5ZM10 12H2V3H10V12ZM5 5.5V9.5C5 9.63261 4.94732 9.75979 4.85355 9.85355C4.75979 9.94732 4.63261 10 4.5 10C4.36739 10 4.24021 9.94732 4.14645 9.85355C4.05268 9.75979 4 9.63261 4 9.5V5.5C4 5.36739 4.05268 5.24021 4.14645 5.14645C4.24021 5.05268 4.36739 5 4.5 5C4.63261 5 4.75979 5.05268 4.85355 5.14645C4.94732 5.24021 5 5.36739 5 5.5ZM8 5.5V9.5C8 9.63261 7.94732 9.75979 7.85355 9.85355C7.75979 9.94732 7.63261 10 7.5 10C7.36739 10 7.24021 9.94732 7.14645 9.85355C7.05268 9.75979 7 9.63261 7 9.5V5.5C7 5.36739 7.05268 5.24021 7.14645 5.14645C7.24021 5.05268 7.36739 5 7.5 5C7.63261 5 7.75979 5.05268 7.85355 5.14645C7.94732 5.24021 8 5.36739 8 5.5Z"
                            fill="#64748B" />
                    </svg>

                </div>
      `;
    filteredSection.appendChild(div);
  }
}
