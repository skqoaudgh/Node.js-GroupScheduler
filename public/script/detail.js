function validateForm() {
    const name = document.forms['Form']['name'].value;
    const myStart = new Date(startPeriod[0].value, startPeriod[1].value-1, startPeriod[2].value).convertDateFormat();
    const myEnd = new Date(endPeriod[0].value, endPeriod[1].value-1, endPeriod[2].value).convertDateFormat();
    const periodStart = document.getElementById('periodStart').value;
    const periodEnd = document.getElementById('periodEnd').value;
    const today = new Date().convertDateFormat();
    if(name == null || name == '' || myStart == null || myStart == '' || myEnd == null || myEnd == '') {
        alert('모든 항목을 채워주세요.');
        return false;
    }

    if(myStart > myEnd || myStart < periodStart || myEnd > periodEnd) {
        alert('시작날짜와 마감날짜가 잘못 입력되었습니다.');
        return false;
    }

    if(periodEnd < today) {
        alert('이 일정은 이미 마감되었습니다.');
    }
}

Date.prototype.convertDateFormat = function() {
  var mm = this.getMonth() + 1;
  var dd = this.getDate();

  return [this.getFullYear(),
          (mm>9 ? '' : '0') + mm,
          (dd>9 ? '' : '0') + dd
         ].join('-');
};