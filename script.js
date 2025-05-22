const date = new Date();
let storage = {};
const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
]

const dayLength = [
    31,
    28,
    31,
    30,
    31,
    30,
    31,
    31,
    30,
    31,
    30,
    31,
]
let dateVal = -1;

// create calendar
const createCalendar = () => {
    const allDays = document.querySelectorAll('.days div')
    allDays.forEach(allDays => {
        allDays.remove();
    });


    const allList = document.querySelectorAll('.checked');
    allList.forEach(allList => {
        allList.classList.remove('checked');
    });

    date.setDate(1);

    const prevLastDate = new Date(date.getFullYear(), date.getMonth(), 0).getDate();
    const firstWeekday = date.getDay();
    const lastWeekday = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDay();
    const nextMonthDays = 7 - 1 - lastWeekday;

    document.querySelector(".date h1").innerHTML = months[date.getMonth()];

    let today = new Date();
    let todayDate = today.getDate();
    let todayMonth = today.getMonth();

    for (let i = firstWeekday; i > 0; i--) {
        let val = prevLastDate - i + 1;
        let textNode = document.createTextNode(val);
        let newDay = document.createElement("div");
        newDay.appendChild(textNode);
        newDay.classList.add("prev-month");
        document.getElementsByClassName("days")[0].appendChild(newDay);
    }

    for (let i = 1; i <= dayLength[date.getMonth()]; i++) {
        if (i === todayDate && date.getMonth() === todayMonth) {
            let textNode = document.createTextNode(i);
            let newDay = document.createElement("div");
            newDay.appendChild(textNode);
            newDay.classList.add("today");
            let alertDate = months[date.getMonth()] + '/' + i + '/' + date.getFullYear();
            newDay.setAttribute("id", alertDate);
            document.getElementsByClassName("days")[0].appendChild(newDay);
        } else {
            let textNode = document.createTextNode(i);
            let newDay = document.createElement("div");
            newDay.appendChild(textNode);
            let alertDate = months[date.getMonth()] + '/' + i + '/' + date.getFullYear();
            newDay.setAttribute("id", alertDate);
            document.getElementsByClassName("days")[0].appendChild(newDay);
        }
    }
    
    for (let i = 0; i < nextMonthDays; i++) {
        let textNode = document.createTextNode(i);
        let newDay = document.createElement("div");
        newDay.appendChild(textNode);
        newDay.classList.add("next-month");
        document.getElementsByClassName("days")[0].appendChild(newDay);
    }
   
    let days = document.querySelectorAll('.days div');
    let clickedDay = 0;

    for (let i = 0; i < days.length; i++) {
        days[i].onclick = function() {
            dateVal = this.id;
            days[clickedDay].classList.remove('clicked-day');
            this.classList.add('clicked-day');
            clickedDay = i;
            let lists = document.querySelectorAll('li');
    
            for (let j = 0; j < lists.length; j++) {
                let habitWord = lists[j].id;
                if (storage[habitWord].includes(dateVal)) {
                    if (!lists[j].classList.contains('checked')) {
                        lists[j].classList.add('checked');
                    }
                } else {
                    if (lists[j].classList.contains('checked')) {
                        lists[j].classList.toggle('checked');
                    }
                }
            }
        }
    }

};

// search bar input
let input = document.getElementById("myInput");
let daysHighlight = [];

input.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {

        let colorBlock = document.createElement("SPAN");
        colorBlock.className = "color-block"
        let sign2 = document.createTextNode("  ");
        colorBlock.appendChild(sign2)
        
        let newHabit = document.createElement("li");
        let inputVal = input.value;
        let textNode = document.createTextNode(inputVal);
        newHabit.appendChild(colorBlock);
        newHabit.appendChild(textNode);
        newHabit.id = inputVal;
        if (inputVal != " ") {
            newHabit.classList.add("habits");
            document.getElementById("habit-show").appendChild(newHabit);
        }

        newHabit.onclick = function() {
            if (this.classList.contains('checked')) {
                this.classList.toggle('checked');
                let clickedIndex = storage[this.id].indexOf(dateVal);

                if (clickedIndex != -1) {
                    storage[this.id].splice(clickedIndex, 1);
                }
            } else {
                this.classList.toggle('checked');
                storage[this.id].push(dateVal);
            }
        }

        let delButton = document.createElement("SPAN");
        let sign = document.createTextNode("\u00D7");
        delButton.className = "delete";
        delButton.appendChild(sign);
        newHabit.appendChild(delButton);
        newHabit.id = inputVal;
        storage[input.value] = [];
        delButton.onclick = function() {
            let div = this.parentElement;
            div.style.display = "none";
        }
        
        colorBlock.onclick = function() {
            for (let i = 0; i < daysHighlight.length; i++) {
                let dayHabit = document.getElementById(daysHighlight[i]);
                if (dayHabit != null) {
                    dayHabit.classList.remove("highlight");
                }
            }
            daysHighlight = storage[inputVal];
            for (let i = 0; i < daysHighlight.length; i++) {
                let dayHabit = document.getElementById(daysHighlight[i]);
                if (dayHabit != null) {
                    dayHabit.classList.add("highlight");
                }
            }
        }
        input.value = ' ';
    }
})

document.querySelector(".prev").addEventListener("click", () => {
    date.setMonth(date.getMonth() - 1);
    createCalendar();
  });
  
  document.querySelector(".next").addEventListener("click", () => {
    date.setMonth(date.getMonth() + 1);
    createCalendar();
  });

createCalendar();
