# :heart_eyes_cat: Welcome to Ounce Server :heart_eyes_cat:

<img src="https://user-images.githubusercontent.com/45676906/87784220-d8f44180-c870-11ea-9821-9ea4a09e8b26.jpg" width="200" height="200">
<img src="https://user-images.githubusercontent.com/45676906/87784325-02ad6880-c871-11ea-9008-5e7f6cc57a04.jpg" width="200" height="200">



고양이들은 입맛이 까다로워, 집사들은 성공확률이 높은 시도를 위해 먹여본 캣푸드를 따로 기록하고 있습니다. 

저희는 이러한 집사들의 고민을 해결하기 위해 직관적인 기록, 서로의 목록 공유, 입맛이 비슷한 고양이 추천 기능을 제공하고 있습니다.

### 기록부터 선택까지, 온스가 함께합니다.

:smiley_cat: <b>SOPT 26th APPJAM</b>

:smiley_cat: <b>Project Period : 2020.06.27 ~ 2020.07.18</b>

:smiley_cat: <b>[API Specification](https://github.com/We-are-Ounce/OUNCE_Server/wiki)</b>


### :rainbow: :unicorn: Peaceful Server Team :unicorn: :rainbow:
![단체사진](./ounce/img/단체사진.jpg)


<br>


### :open_file_folder: 기능 명세서 및 역할 분담

![기능 명세](https://user-images.githubusercontent.com/55784772/87781603-eeb33800-c86b-11ea-9570-c3549c04fe34.PNG)




<br>



<br>

### :computer: package.json

:smiley_cat: jsonwebtoken

:smiley_cat: moment

:smiley_cat: moment-timezone

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
    "aws-sdk": "^2.713.0",
    "cookie-parser": "^1.4.5",
    "debug": "~2.6.9",
    "express": "~4.16.1",
    "hangul-chosung-search-js": "^1.1.3",
    "hangul-js": "^0.2.6",
    "http-errors": "~1.6.3",
    "inko": "^1.1.1",
    "jade": "~1.11.0",
    "jsonwebtoken": "^8.5.1",
    "moment": "^2.27.0",
    "moment-timezone": "^0.5.31",
    "morgan": "~1.9.1",
    "multer": "^1.4.2",
    "multer-s3": "^2.9.0",
    "nodemon": "^2.0.4",
    "pbkdf2": "^3.1.1",
    "promise-mysql": "^4.1.3",
    "rand-token": "^1.0.1"
  }
```

<br>

### :crystal_ball: ERD 

![ERD](https://user-images.githubusercontent.com/55784772/87702220-18208500-c7d4-11ea-8e54-f83f972f1d83.PNG)


<br>

<br>

### :globe_with_meridians: SERVER ARCHITECTURE
![아키텍처](https://user-images.githubusercontent.com/55784772/87590633-10080d00-c722-11ea-9ec4-45d4ece0dbe9.PNG)

<br>


###  :paperclip: 핵심기능 설명


####  - 캣푸드 리뷰 기록 :pencil2:
: 고양이에게 먹여본 제품을 다양한 기준으로 빠르게 기록합니다.
 
 
####  - 서로의 리뷰 공유 :page_facing_up:  
: 제품마다 남겨진 리뷰들을 모아볼 수 있고, 고양이 계정을 서로 팔로우합니다.


####  - 입맛이 비슷한 고양이 추천  :cat:  
: 내 고양이가 남긴 리뷰들의 기호도을 기반으로
입맛이 비슷한 고양이를 찾아 유사도와 함께 보여줍니다.


<br>

### :space_invader: PM2
#### 유저
<img width="400" alt="0" src="https://user-images.githubusercontent.com/55784772/87780318-6cc20f80-c869-11ea-9fcd-26ff777e3564.png">


#### 프로필
<img width="400" alt="1" src="https://user-images.githubusercontent.com/55784772/87779477-cb868980-c867-11ea-8b1d-421bd7bb6219.png">


#### 팔로우 요청, 검색, 리뷰 추가
<img width="400" alt="2" src="https://user-images.githubusercontent.com/55784772/87779769-510a3980-c868-11ea-9f58-abbc9ca1c2ab.png">

#### 리뷰 수정, 정렬
<img width="400" alt="3" src="https://user-images.githubusercontent.com/55784772/87779785-5c5d6500-c868-11ea-904a-18743ba843fb.png">

#### 필터, 추천
<img width="400" alt="4" src="https://user-images.githubusercontent.com/55784772/87779840-70a16200-c868-11ea-8be3-ad4dee22afdd.png">

<

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
        <td>인기상</td>
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
 
<br>

## OUNCE의 다른 프로젝트
* [ANDROID](https://github.com/We-are-Ounce/OUNCE_Android)
* [IOS](https://github.com/We-are-Ounce/OUNCE_iOS)
