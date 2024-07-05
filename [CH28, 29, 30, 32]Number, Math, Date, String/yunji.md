# 29, 30, 32장. 메서드

## 📌 Date.parse

- 1970년 1월 1일 00:00:00(UTC)을 기점으로 인수로 전달된 지정 시간(new Date(dateString)의 인수와 동일한 형식)까지의 **밀리초를 숫자로 반환**
    
    ```jsx
    // UTC
    Date.parse('May 5, 1970 00:00:00 UTC'); // 10713600000
    
    // KST
    Date.parse('May 5, 1970 10:00:00'); // 10717200000
    
    // KST
    Date.parse('1970/05/05/12:00:00');  // 10724400000
    ```
    

## 📌 Date.prototype.toTimeString

- 사람이 읽을 수 있는 형식으로 **Date 객체의 시간**을 표현한 문자열을 반환
    
    ```jsx
    const day = new Date('2024/06/23/17:00');
    
    day.toString();  // Sun Jun 23 2024 17:00:00 GMT+0900 (한국 표준시)
    day.toTimeString();  // 17:00:00 GMT+0900 (한국 표준시)
    ```
    

## 📌 String.prototype.toUpperCase

- 대상 문자열을 **모두 대문자**로 변경한 문자열 반환
    
    ```jsx
    const hello = 'Hello, Good Morning!';
    
    hello.toUpperCase(); // HELLO, GOOD MORNING!
    ```
    
    - 반대로 대문자를 소문자로 변환하는 메서드 → **toLowerCase**

## 📌 String.prototype.trim

- 대상 문자열 앞뒤에 **공백 문자**가 있을 경우 이를 **제거한 문자열 반환**
    
    ```jsx
    const mango = '   mango  ';
    const apple = '   a pp l e  ';
    
    mango.trim(); // mango
    apple.trim(); // a pp l e
    ```
    

## 📌 String.prototype.replace

- 대상 문자열에서 **첫 번째 인수**로 전달받은 문자열 또는 정규표현식을 검색하여 **두 번째 인수로 전달한 문자열로 치환한 문자열을 반환**
    
    ```jsx
    const hello = 'Good Morning';
    
    hello.replace('Morning', 'Night'); // Good Night
    ```
    
    - **검색된 문자열이 여러 개 존재할 경우** → 첫 번째로 검색된 문자열만 반환
    
    ```jsx
    const hello = 'Good Morning Morning';
    
    hello.replace('Morning', 'Night'); // Good Night Morning
    ```
    
    - **정규 표현식 전달** → 대소문자 구별하지 않고 전역 검색함
    
    ```jsx
    const hello = 'Good Good';
    
    hello.replace(/good/gi, 'Bad'); // Bad Bad
    ```
