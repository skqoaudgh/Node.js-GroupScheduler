const list = document.getElementById('schedule-list');

let content =   `<tr class="schedule-li">
                    <th class="schedule-head">제목</th>
                    <th class="schedule-head">기간</th>
                    <th class="schedule-head">작성자</th>
                </tr>`

Date.prototype.convertDateFormat = function() {
    var mm = this.getMonth() + 1;
    var dd = this.getDate();

    return [this.getFullYear(),
            (mm>9 ? '' : '0') + mm,
            (dd>9 ? '' : '0') + dd
           ].join('-');
};

schedule.forEach(element => {
    const start = new Date(element.StartPeriod).convertDateFormat();
    const end = new Date(element.EndPeriod).convertDateFormat();
    if(end < new Date().toISOString()) {
        content += `<tr class="schedule-li" style="color: red; cursor: default;">`;
    }
    else {
        content += `<tr class="schedule-li" onclick="window.location='/auth/${element._id}'">`;
    }
    content += `    <td class="schedule-item">${element.Title}</td>
                    <td class="schedule-item">${start} ~ ${end}</td>
                    <td class="schedule-item">${element.Creator}</td>
                </tr>`
});

if(schedule.length == 0) {
    content = '<tr><th style="padding: 10px; font-size: 20px; color: #666666;">확인할 수 있는 일정이 없습니다. 일정을 만들어보세요!</th></tr>';
}

list.innerHTML = content;