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
    content += `<tr class="schedule-li" onclick="window.location='/schedule/${element._id}'">
                    <td class="schedule-item">${element.Title}</td>
                    <td class="schedule-item">${start} ~ ${end}</td>
                    <td class="schedule-item">${element.Creator}</td>
                </tr>`
});

list.innerHTML = content;