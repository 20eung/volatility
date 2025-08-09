# 실시간 주식 변동성 모니터링 웹 애플리케이션 (Real-time Stock Volatility Monitoring Web Application)

이 애플리케이션은 `watchlist.json` 파일에 지정된 주식 종목의 변동성을 실시간으로 추적하고 웹 페이지에 표시합니다.

## 주요 기능 (Features)

- **실시간 모니터링**: `Socket.io`를 사용하여 서버에서 가져온 최신 주식 데이터를 웹 페이지에 실시간으로 업데이트합니다.
- **주기적 데이터 수집**: `node-cron`을 이용해 15초마다 Yahoo Finance API에서 지정된 종목의 데이터를 자동으로 가져옵니다.
- **관심 종목 관리**: `watchlist.json` 파일을 통해 모니터링할 주식 종목을 쉽게 추가하고 관리할 수 있습니다.

## 기술 스택 (Tech Stack)

- **Backend**: Node.js, Express.js
- **Frontend**: HTML, JavaScript
- **Real-time Communication**: Socket.IO
- **HTTP Client**: Axios
- **Task Scheduler**: node-cron

## 실행 방법 (How to Run)

1.  **의존성 설치 (Install dependencies):**
    ```bash
    npm install
    ```

2.  **환경 변수 설정 (Set environment variables):**
    이 프로젝트는 **Financial Modeling Prep**의 API 키를 사용하여 미국 주식 정보를 가져옵니다. `.env.example` 파일을 복사하여 `.env` 파일을 만드세요.
    ```bash
    cp .env.example .env
    ```
    그 다음, 생성된 `.env` 파일을 열어 `your_fmp_api_key_here` 부분을 실제 API 키로 교체해 주세요.
    **(주의: 코드 호환성을 위해 .env 파일의 변수명인 `RAPIDAPI_KEY`는 변경하지 마세요.)**

3.  **애플리케이션 실행 (Run the application):**
    ```bash
    npm start
    ```
    이후 웹 브라우저에서 `http://localhost:3000` (또는 `server.js`에 지정된 포트)으로 접속합니다.

## 프로젝트 구조 (Project Structure)

```
/Users/20eung/Project/volatility/
├───.gitignore
├───apple-touch-icon.png
├───apple-touch-icon.svg
├───config.js
├───docker-compose.yml
├───Dockerfile
├───favicon.svg
├───index.html
├───package-lock.json
├───package.json
├───server.js
├───watchlist.json
└───.git/
```
