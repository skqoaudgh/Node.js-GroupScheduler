const startPeriod = document.getElementsByClassName('startPeriod');
const endPeriod = document.getElementsByClassName('endPeriod');

window.onload = function() {
    initDateDropdown();
}

for(let i=0; i<2; i++) {
    startPeriod[i].addEventListener('change', adjustStartDayField);
    endPeriod[i].addEventListener('change', adjustEndDayField);
}

function initDateDropdown() {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();
    const date = today.getDate();
    for(let i=0; i<10; i++) {
        startPeriod[0].options[i] = new Option(year+i, year+i);
        startPeriod[0].options[0] = new Option(year, year, true, true);

        endPeriod[0].options[i] = new Option(year+i, year+i);
        endPeriod[0].options[0] = new Option(year, year, true, true);
    }
    for(let i=0; i<12; i++) {
        startPeriod[1].options[i] = new Option(i+1, i+1);
        startPeriod[1].options[month] = new Option(month+1, month+1, true, true);

        endPeriod[1].options[i] = new Option(i+1, i+1);
        endPeriod[1].options[month] = new Option(month+1, month+1, true, true);     
    }
    const max = new Date(year, month+1, 0);
    for(let i=0; i<max.getDate(); i++) {
        startPeriod[2].options[i] = new Option(i+1, i+1);
        startPeriod[2].options[date] = new Option(date, date, true, true);

        endPeriod[2].options[i] = new Option(i+1, i+1);
        endPeriod[2].options[date] = new Option(date, date, true, true);       
    }
}

function adjustStartDayField() {
    const year = startPeriod[0].value;
    const month = startPeriod[1].value;
    const max = new Date(year, month, 0);
    for(let i=0; i<max.getDate(); i++) {
        startPeriod[2].options[i].value = i+1;
        startPeriod[2].options[i].text = i+1;
    }
    for(let i=startPeriod[2].length; i>=max.getDate(); i--) {
        startPeriod[2].remove(i);
    }
}

function adjustEndDayField() {
    const year = endPeriod[0].value;
    const month = endPeriod[1].value;
    const max = new Date(year, month, 0);
    for(let i=0; i<max.getDate(); i++) {
        endPeriod[2].options[i].value = i+1;
        endPeriod[2].options[i].text = i+1;
    }
    for(let i=endPeriod[2].length; i>=max.getDate(); i--) {
        endPeriod[2].remove(i);
    }
}