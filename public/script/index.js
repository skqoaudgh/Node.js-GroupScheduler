const list = document.getElementById('schedule-list');

let content = '<tr></tr><th>제목</th><th>기간</th><th>작성자</th></tr<th>'

Date.prototype.convertDateFormat = function() {
    var mm = this.getMonth() + 1;
    var dd = this.getDate();

    return [this.getFullYear(),
            (mm>9 ? '' : '0') + mm,
            (dd>9 ? '' : '0') + dd
           ].join('.');
};

schedule.forEach(element => {
    const start = new Date(element.StartPeriod).convertDateFormat();
    const end = new Date(element.EndPeriod).convertDateFormat();
    content += `<tr>
                    <td>${element.Title}</td>
                    <td>${start} ~ ${end}</td>
                    <td>${element.Creator}</td>
                </tr>`
    console.log(element);
});

list.innerHTML = content;