# :heart_eyes_cat: Welcome to Ounce Server :heart_eyes_cat:

<img src="https://user-images.githubusercontent.com/45676906/86876305-602e1080-c11f-11ea-96b3-5732ecea5017.jpg" width="300" height="300">

고양이들은 입맛이 까다로워, 집사들은 성공확률이 높은 시도를 위해 먹여본 캣푸드를 따로 기록하고 있습니다. 

저희는 이러한 집사들의 고민을 해결하기 위해 직관적인 기록, 서로의 목록 공유, 입맛이 비슷한 고양이 추천 기능을 제공하고 있습니다.

### 기록부터 선택까지, 온스가 함께합니다.

:smiley_cat: <b>SOPT 26th APPJAM</b>

:smiley_cat: <b>Project Period : 2020.06.27 ~ 2020.07.18</b>

:smiley_cat: <b>[API Specification](https://github.com/We-are-Ounce/OUNCE_Server/wiki)</b>


## :rainbow: :unicorn: Peaceful Server Team :unicorn: :rainbow:
![단체사진](./ounce/img/단체사진.jpg)


<br>


### :open_file_folder: 기능 명세서 및 역할 분담

![기능1](./ounce/img/기능1.jpg)

![기능2](./ounce/img/기능2.jpg)

![기능3](./ounce/img/기능3.jpg)


<br>
### 실행하기 
* Express 앱용 프로세스 관리자 `pm2` 를 이용해 배포 합니다.
```
npm install pm2 -g
```
* Express 앱용 프로세스 관리자 pm2 를 이용해 배포 합니다.
```
 pm2 start ./bin/www --name "앱 이름"
```
* 현재 실행중인 프로세스 목록을 확인합니다.
```
 pm2 list
```
* 프로세스를 중지합니다.
```
pm2 delete --name "앱 이릅"
```
* 프로세스를 모니터 합니다.
```
pm2 moni t --name "앱 이름"
```
<br>

### :computer: package.json

:smiley_cat: jsonwebtoken

:smiley_cat: multer

:smiley_cat: multer-s3

:smiley_cat: pbkdf2

:smiley_cat: promise-mysql

:smiley_cat: rand-token

:smiley_cat: hangul-chosung-search-js

:smiley_cat: hangul-js

:smiley_cat: inko

:smiley_cat: aws-sdk

```
"dependencies": {
    "cookie-parser": "~1.4.4",
    "debug": "~2.6.9",
    "express": "~4.16.1",
    "http-errors": "~1.6.3",
    "jade": "~1.11.0",
    "jsonwebtoken": "^8.5.1",
    "morgan": "~1.9.1",
    "multer": "^1.4.2",
    "nodemon": "^2.0.4",
    "pbkdf2": "^3.0.17",
    "promise-mysql": "^4.1.3",
    "rand-token": "^1.0.1",
    "hangul-chosung-search-js": "^1.1.3",
    "hangul-js": "^0.2.6",
    "http-errors": "~1.6.3",
    "inko": "^1.1.1",
    "multer-s3": "^2.9.0",
    "aws-sdk": "^2.696.0",

  }
```

<br>

### :crystal_ball: ERD 

![ERD](./ounce/img/ERD.png)

<br>

<br>

### :globe_with_meridians: SERVER ARCHITECTURE
![아키텍처](https://user-images.githubusercontent.com/55784772/87590633-10080d00-c722-11ea-9ec4-45d4ece0dbe9.PNG)

<br>

<br>


###  :paperclip: 핵심기능 설명


####  - 캣푸드 리뷰 기록 :pencil2:
: 고양이에게 먹여본 제품을 다양한 기준으로 빠르게 기록합니다.
 
 
####  - 서로의 리뷰 공유 :page_facing_up:  
: 제품마다 남겨진 리뷰들을 모아볼 수 있고, 고양이 계정을 서로 팔로우합니다.


####  - 입맛이 비슷한 고양이 추천  :cat:  
: 내 고양이가 남긴 리뷰들의 평점을 기반으로
입맛이 비슷한 고양이를 찾아 유사도와 함께 보여줍니다.


<br>


### :eyes: 팀별 역할분담

<table>
    <tr align="center">
        <td><B>팀원<B></td>
        <td width="200"><B>역할<B></td>
        <td><B>개인 목표<B></td>
    </tr>
    <tr align="center">
        <td>
            <img src="./ounce/img/효원.jpg" width="200">
            <br>
            <a href="https://github.com/Jeong-Hyowon"><I>정효원</I></a>
        </td>
        <td width="400">
            <ul>
                <a href="https://github.com/We-are-Ounce/OUNCE_Server/tree/feature_hw">[git_branch : feature_hw]</a>
                <li>DB 설계 및 구축</li>
                <li>리뷰 조회 시 필터링 및 정렬</li>
                <li>추천  고양이 리스트 및 유사도 제공</li>
                <li>리뷰 데이터 관리 담당</li>
                <li>다른 고양이 프로필 및 리뷰 제공</li>
            </ul>
        </td>
        <td>대상</td>
    </tr>
    <tr align="center">
        <td>
            <img src="./ounce/img/예지.jpg" width="200">
            <br>
            <a href="https://github.com/yezgoget"><I>손예지</I></a>
        </td>
        <td width="400">
            <ul>
                <a href="https://github.com/We-are-Ounce/OUNCE_Server/tree/feature_yz">[git_branch : feature_yz]</a>
                <li>DB 설계 및 구축</li>
                <li>회원가입 및 로그인</li>
                <li>유저 세션 관리, 고양이 프로필 등록</li>
                <li>유저 내 여러 고양이 계정 관리</li>
                <li>팔로우 기능 담당</li>
            </ul>
        </td>
        <td>서버 </td>
    </tr>
    <tr align="center">
        <td>
            <img src="./ounce/img/정균.jpg" width="200">
            <br>
            <a href="https://github.com/wjdrbs96"><I>최정균</I></a>
        </td>
        <td width="400">
            <ul>
                <a href="https://github.com/We-are-Ounce/OUNCE_Server/tree/feature_jg">[git_branch : feature_jg]</a>
                <li>DB 설계 및 구축</li>
                <li>리뷰 작성</li>
                <li>제조사, 제품명 검색</li>
                <li>유저 검색</li>
                <li>검색 후 상세정보 제공</li>
            </ul>
        </td>
        <td>MVP</td>
    </tr>
</table>
            
## OUNCE의 다른 프로젝트
* [ANDROID](https://github.com/We-are-Ounce/OUNCE_Android)
* [IOS](https://github.com/We-are-Ounce/OUNCE_iOS)
