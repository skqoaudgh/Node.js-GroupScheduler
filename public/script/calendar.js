let wrapper = document.getElementById('calendar-wrapper');

let element;
let day = new Array('일', '월', '화', '수', '목', '금', '토');

let Calendar = new Date();
let year = Calendar.getFullYear();     // Returns year
let month = Calendar.getMonth();    // Returns month (0-11)
let today = Calendar.getDate();    // Returns day (1-31)
let weekday = Calendar.getDay();    // Returns day (1-31)

const today_year = year;
const today_month = month;
const today_day = today;

let DAYS_OF_WEEK = 7;
let DAYS_OF_MONTH = 31;

drawCalendar(month);

// util
function pad(n) {
    n = n + '';
    return n.length >= 2 ? n : new Array(3 - n.length).join('0') + n;
}

// calendar
function drawCalendar(month) {
    Calendar.setDate(1);
    Calendar.setMonth(month);

    element = '<table class="calendar">';

    element += '<tr><td colspan=7 class="calendar-top">';
    element += '<button type="button" class="monthButton">R</button>';
    element += '<button type="button" class="monthButton"><</button>';
    element += year + '.' + pad(month+1);
    element += '<button type="button" class="monthButton">></button></td></tr>'

    element += '<tr>'
    for(i=0; i<DAYS_OF_WEEK; i++) {
        if(i == 0 || i == 6)
            element += '<td class="calendar-week calendar-weekend">' + day[i] + '</td>';
        else
            element += '<td class="calendar-week">' + day[i] + '</td>';
    }
    element += '</tr>';
    
    element += '<tr>';
    for(i=0; i<Calendar.getDay(); i++)
        element += '<td class="calendar-day">-</td>';
    
    for(let i=0; i<DAYS_OF_MONTH; i++) {
        if(Calendar.getDate() > i) {
            let week_day = Calendar.getDay();;
    
            if(week_day == 0)
                element += '<tr>'
    
            if(week_day != DAYS_OF_WEEK) {
                let day  = Calendar.getDate();
                if(today_year == Calendar.getFullYear() && today_month == Calendar.getMonth() && today_day == Calendar.getDate())
                    element += '<td id="calendar-today" class="calendar-day">' + day + '<div class="dropdown"><div class="period-wrapper"></div><div class="creator-wrapper"></div></div>' + '</td>' + '</td>';
                else
                    element += '<td class="calendar-day">' + day + '<div class="dropdown"><div class="period-wrapper"></div><div class="creator-wrapper"></div></div>' + '</td>';
            }
        if(week_day == DAYS_OF_WEEK)
            element += '</tr>';
        }
        Calendar.setDate(Calendar.getDate()+1);
    }
    
    element += '</table>'
    
    wrapper.innerHTML = element;
    addPeriodOnSchedule(year, month);
    addEventListenerOnButton();
}

// period
function addPeriodOnSchedule(year, month) {
    const periodWrapper = document.getElementsByClassName('period-wrapper');
    const creatorWrapper = document.getElementsByClassName('creator-wrapper');
    for(let i=0; i<userPeriod.length; i++) {
        console.log(userPeriod[i]);
        let start = new Date(userPeriod[i].period[0]);
        const end = new Date(userPeriod[i].period[1]);
        while(start.getFullYear() == year && start.getMonth() == month && start.valueOf() <= end.valueOf()) {
            periodWrapper[start.getDate()-1].innerHTML += '<hr class="period-item">';
            creatorWrapper[start.getDate()-1].innerHTML += `<span>${userPeriod[i].creator}</span>`;
            start.setDate(start.getDate()+1);
        }
    }
}

// event
const calendarButton = document.getElementsByClassName('calendar-day');
for(let i=0; i<calendarButton.length; i++) {
    addEventListener('click', (event) => {

    });
}

function addEventListenerOnButton() {
    const monthButton = document.getElementsByClassName('monthButton');
    monthButton[0].addEventListener('click', (event) => {
        Calendar.setFullYear(today_year);
        month = today_month;
        year = today_year;
        drawCalendar(today_month);
    });
    monthButton[1].addEventListener('click', (event) => {
        month --;
        if(month < 0) {
            month = 11;
            year --;
        }
        drawCalendar(month);
    });
    monthButton[2].addEventListener('click', (event) => {
        month ++;
        if(month > 11) {
            month = 0;
            year ++;
        }
        drawCalendar(month);
    });
}