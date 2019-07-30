let wrapper = document.getElementById('calendar');
let calendarTitle = document.getElementById('title');
let calendarButton = document.getElementsByClassName('calendar-day');
let dropdown = document.getElementsByClassName('dropdown');

let element;
const day = new Array('Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat');

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
calendarTitle.innerHTML = `${schedule.Creator}의 ${schedule.Title} 달력`

// util
function pad(n) {
    n = n + '';
    return n.length >= 2 ? n : new Array(3 - n.length).join('0') + n;
}

function isNumber(s) {
    s += '';
    s = s.replace(/^\s*|\s*$/g, '');
    if (s == '' || isNaN(s)) return false;
    return true;
}

// calendar
function drawCalendar(month) {
    Calendar.setDate(1);
    Calendar.setMonth(month);

    element = '<table class="calendar">';

    element += '<tr><td colspan=7 class="calendar-top">';
    element += '<button type="button" class="monthButton">R</button>';
    element += '<button type="button" class="monthButton"><</button>';
    element += `<span id="calendar-date">${year}.${pad(month+1)}</span>`;
    element += '<button type="button" class="monthButton">></button></td></tr>'
    
    element += '<tr>'
    for(i=0; i<DAYS_OF_WEEK; i++) {
        element += '<td class="calendar-week">' + day[i] + '</td>';
    }
    element += '</tr>';
    
    element += '<tr>';
    for(i=0; i<Calendar.getDay(); i++)
        element += '<td>&nbsp;</td>';
    
    for(let i=0; i<DAYS_OF_MONTH; i++) {
        if(Calendar.getDate() > i) {
            let week_day = Calendar.getDay();;
    
            if(week_day == 0)
                element += '<tr>'
    
            if(week_day != DAYS_OF_WEEK) {
                let day  = Calendar.getDate();
                if(today_year == Calendar.getFullYear() && today_month == Calendar.getMonth() && today_day == Calendar.getDate())
                    element += `<td id="calendar-today" class="calendar-day"><div class="dropdown"><div class="dropdown-value">${day}</div><div class="creator-wrapper"></div></td>`
                else
                    element += `<td class="calendar-day"><div class="dropdown"><div class="dropdown-value">${day}</div><div class="creator-wrapper"></div></td>`
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
    const creatorWrapper = document.getElementsByClassName('creator-wrapper');
    for(let i=0; i<userPeriod.length; i++) {
        let start = new Date(userPeriod[i].period[0]);
        const end = new Date(userPeriod[i].period[1]);
        while(start.getFullYear() == year && start.getMonth() == month && start.valueOf() <= end.valueOf()) {
            calendarButton[start.getDate()-1].style.backgroundColor = '#ff5252';
            calendarButton[start.getDate()-1].style.cursor = 'pointer';
            creatorWrapper[start.getDate()-1].innerHTML += `<span>${userPeriod[i].creator}</span>`;
            start.setDate(start.getDate()+1);
        }
    }
}

// event
for(let i=0; i<dropdown.length; i++) {
    dropdown[i].addEventListener('mouseover', mouseOverHandler);
    dropdown[i].addEventListener('mouseout', mouseOutHandler);
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

function mouseOverHandler(event) {
    if(isNumber(event.target.innerHTML))
        calendarButton[event.target.innerHTML-1].style.backgroundColor = '#ff0000';
}

function mouseOutHandler(event) {
    if(isNumber(event.target.innerHTML))
        calendarButton[event.target.innerHTML-1].style.backgroundColor = '#ff5252';
}