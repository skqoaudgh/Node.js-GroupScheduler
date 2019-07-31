const periodStart = document.getElementById('create-start');
const inputFile = document.getElementById('create-image');

periodStart.valueAsDate = new Date();
inputFile.addEventListener('change', fileUploadHandler);


function validateForm() {
    const name = document.forms['Form']['name'].value;
    const title = document.forms['Form']['title'].value;
    const periodStart = document.forms['Form']['periodStart'].value;
    const periodEnd = document.forms['Form']['periodEnd'].value;
    const comment = document.forms['Form']['comment'].value;

    if(title == null || title == '' || name == null || name == '' || periodStart == null || periodStart == '' 
    || periodEnd == null || periodEnd == '' || comment == null || comment == '') {
        alert('모든 항목을 채워주세요.');
        return false;
    }
    if(periodStart > periodEnd) {
        alert('시작날짜와 마감날짜가 잘못 입력되었습니다.');
        return false;
    }
}

function fileUploadHandler(event) {
    document.getElementById('fileTitle').innerHTML = event.target.files[0].name;
}