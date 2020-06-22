# WE Calendar - Making schedules with many peaple
위캘린더는 여러 사람들과 약속이나 일정을 만들 때 사용할 수 있는 캘린더 웹사이트입니다.
누구나 간단하게 일정을 생성할 수 있고 보안코드와 링크를 공유하여 사용자들이 참여하여 쉽게 일정을 조율할 수 있습니다.
각 참여자들의 일정 현황을 달력을 통해 쉽게 확인할 수 있고 다양한 부가 기능도 제공합니다.

## Tech Stack
* Node.js
* ejs View Template
* MongoDB

## Feature
* (홈, 일정생성) 링크를 가지는 상단 네비게이션 바.
* 일정 시작기간 내림차순으로, 마감된 일정은 하단으로 정렬하여 출력.
* (작성자, 일정이름, 설명, 기간, 사진)를 가지고 누구나 일정 생성.
* 사진 업로드는 multer 패키지를 이용하며, "현재시간에 대한 Date 객체의 원시값 + 파일이름"의 형식으로 저장.
* 일정생성 시, 5자리의 임의의 숫자가 보안코드로써 일정 정보와 함께 저장되며 상세 일정에 접근 시 필요.
* 상세 일정 페이지에서 작성자가 입력한 일정의 정보 확인.
* 상세 일정 페이지에서 각 참여자의 가능/불가능 기간을 입력.
* 달력 페이지에서 모든 참여자의 일정을 종합하여 불가능한 날짜가 빨간색으로 표시.
* 불가능한 날짜에 마우스 포인터를 올리면 해당 기간에 불가능한 참여자의 이름이 출력.
* 일정의 공유 버튼을 누르면 bitly API로 일정의 축약된 링크가 클립보드에 복사됨.
* 생성, 오류 등의 알림 메시지는 connect-flash 패키지를 이용.
* gzip Compression 사용

## Routing
* get '/' - 메인 홈페이지
* post '/schedule' - 보안코드 전송
* get '/auth/:id' - 보안코드 입력 페이지 요청
* get '/schedule/:id' - 상세 일정 요청
* get '/schedule/calendar/:id' - 일정 달력 요청
* get '/create' - 일정 생성 페이지 요청
* post '/create' - 일정 생성 폼 전송
* post '/detail' - 일정에 대한 참여자의 기간 전송

## Screenshot
![screen](https://user-images.githubusercontent.com/10339017/62419910-ce738300-b6c5-11e9-9fa3-8638972bb3d7.jpg)

## Install
```
// First, install node modules
npm install

// You need nodemon to run this node. (optional)
npm install -g nodemon

// Run node with nodemon
npm start

// If you don`t wanna use nodemon
node server.js
```
