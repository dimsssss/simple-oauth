<p align="center">
    <h1 align="center">
        Simple Oauth2.0 
    </h1>
    <p align="center">간단한 Oauth2.0 서비스입니다. grantType은 PKCE만 지원합니다<a href="https://github.com/dimsssss/simple-oauth"></a>.</p>
</p>

<p align="center">
    <a href="">
        <img alt="license" src="https://img.shields.io/github/license/dimsssss/toy-intergration-test">
    </a>
    <a href="">
        <img alt="npm" src="https://img.shields.io/node/v-lts/npm?label=npm&logo=npm">
    </a>
    <a href="https://expressjs.com/">
        <img alt="express" src="https://img.shields.io/node/v-lts/express?label=express&logo=express">
    </a>
    <a href="https://jestjs.io/">
        <img alt="jest" src="https://img.shields.io/node/v-lts/express?label=jest&logo=jest">
    </a>
    <a href="https://sequelize.org/">
        <img alt="sequelize" src="https://img.shields.io/node/v-lts/sequelize?label=sequelize&logo=sequelize">
    </a>
    <a href="https://dl.circleci.com/status-badge/redirect/gh/dimsssss/simple-oauth/tree/main">
        <img alt="circle-ci" src="https://dl.circleci.com/status-badge/img/gh/dimsssss/simple-oauth/tree/main.svg?style=svg">
    </a>
</p>

## 🏗 설치

### 1. 데이터베이스 설치

```shell
docker run --name=simple-oauth -e MARIADB_ROOT_PASSWORD=1234 -e MARIADB_DATABASE=simple-oauth -p 6603:3306 -d mariadb:latest
```

### 2. 웹 서버 설치

```shell
git clone https://github.com/dimsssss/simple-oauth

cd simple-oauth

npm install
```

### 3. 환경 변수 설정

```
## .env 안에 들어갈 내용
DATABASE_USER = db계정
PASSWORD = db 패스워드
DATABASE = simple-oauth(임시)
HOST = db 호스트
DATABASE_PORT = db 포트
DIALECT = 사용하는 db 종류
TIMEZONE = 타임존 설정
MIN = 커넥션 풀 최소 갯수
MAX = 커넥션 풀 최대 갯수
```

### 4. 데이터베이스 마이그레이션

```shell-
# migration
npx sequelize-cli db:migrate
```

## 🔍 프로젝트 완성 과정

https://www.notion.so/dimsss/Simple-Oauth2-0-API-e18cbd39385e40f4aabd4109010186c8

## 🌐 API Document

coming soon

## 🧾 실행

```shell
npm run dev
```
