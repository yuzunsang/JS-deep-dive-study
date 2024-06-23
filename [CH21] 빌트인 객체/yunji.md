# 21장. 빌트인 객체

## 📌 자바스크립트 객체의 분류

📍 **표준 빌트인 객체**(standard built-in objects)

- ECMAScript 사양에 정의된 객체를 말하며 애플리케이션 전역의 공통 기능 제공
- 자바스크립트 실행 환경과 관계없이 언제나 사용 가능
- 전역 객체의 프로퍼티로서 제공됨 → 별도의 선언 없이 전역 변수처럼 언제든지 참조 가능

📍 **호스트 객체**(host objects)

- 자바스크립트 실행 환경에서 추가로 제공하는 객체
- 브라우저 환경에서는 DOM, Canvas 등과 같은 클라이언트 사이드 Wep API를 호스트 객체로 제공하고 Node.js 환경에서는 Node.js 고유의 API를 호스트 객체로 제공함

**📍 사용자 정의 객체**(user-defined objects)

- 기본 제공되는 객체가 아닌 사용자가 직접 정의한 객체

## 📌 표준 빌트인 객체

- JS는 Object, String 등 40여 개의 표준 빌트인 객체를 제공
- Math, Reflect, JSON을 제외한 표준 빌트인 객체는 모두 인스턴스 생성 가능한 생성자 함수 객체
    - **생성자 함수 객체인 표준 빌트인 객체** : 프로토타입 메서드와 정적 메서드 제공
    - **생성자 함수 객체가 아닌 표준 빌트인 객체** : 정적 메서드만 제공
- 생성자 함수인 표준 빌트인 객체가 생성한 인스턴스의 프로토타입은 표준 빌트인 객체의 prototype 프로퍼티에 바인딩된 객체임
    
    ```jsx
    // String 생성자 함수에 의한 String 객체 생성
    const strObj = new String('Lee'); // String {"Lee"}
    
    // String 생성자 함수를 통해 생성한 strObj 객체의 프로토타입은 String.prototype
    console.log(Object.getPrototypeOf(strObj) === String.prototype); // true
    ```
    
- **표준 빌트인 객체**는 인스턴스 없이 호출 가능한 빌트인 정적 메서드 제공
    - Number의 prototype 프로퍼티에 바인딩된 객체인 **Number.prototype**은 다양한 기능의 빌트인 프로토타입 메서드 제공
    - 모든 Number 인스턴스가 **상속**을 통해 사용 가능
    - 인스턴스 없이 정적으로 호출할 수 있는 **정적 메서드** 제공
    
    ```jsx
    // Number 생성자 함수에 의한 Number 객체 생성
    const numObj = new Number(1.5); // Number {1.5}
    
    // toFixed는 Number.prototype의 프로토타입 메서드
    // Number.prototype.toFixed는 소수점 자리를 반올림하여 문자열로 반환함
    console.log(numObj.toFiexd()); // 2
    
    // isInteger는 Number의 정적 메서드
    // Number.isInteger는 인수가 정수인지 검사하여 그 결과를 Boolean으로 반환함
    console.log(Number.isInteger(0.5)); // false
    ```
    

## 📌 원시값과 래퍼 객체

- 원시값은 객체가 아니므로 프로퍼티나 메소드를 가질 수 없는데도 원시값인 문자열이 **마치 객체처럼 동작함**
    
    ```jsx
    const str = 'hello';
    
    // 원시 타입인 문자열이 프로퍼티와 메서드를 갖고 있는 객체처럼 동작함
    console.log(str.length); // 5
    console.log(str.toUpperCase()); // HELLO
    
    // 래퍼 객체로 프로퍼티에 접근하거나 메서드를 호출한 후, 다시 원시값으로 되돌림
    console.log(typeof str); // string
    ```
    
- 원시값에 대해 마치 객체처럼 마침표 표기법 또는 대괄호 표기법으로 접근하면 JS엔진이 일시적으로 원시값을 연관된 객체로 변환
- 즉, 원시값을 객체처럼 사용하면 **JS엔진은 암묵적으로 연관된 객체를 생성하여 생성된 객체로 프로퍼티에 접근하거나 메서드를 호출하고 다시 원시값으로 되돌림**
- 문자열, 숫자, 불리언 값에 대해 객체처럼 접근하면 생성되는 임시 객체를 **래퍼 객체**(wrapper object)라고 함

```jsx
// 1. 식별자 str은 문자열을 값으로 가지고 있다. 
const str = 'hello';

// 2. str은 암묵적으로 생성된 래퍼 객체를 가리킨다.
// str의 값 'hello'는 래퍼 객체의 [[StringData]] 내부 슬롯에 할당된다.
// 래퍼 객체에 name 프로퍼티가 동적 추가된다.
str.name = 'Lee';

// 3. str은 다시 원래의 문자열, 즉 래퍼 객체의 [[StringData]] 내부 슬롯에 할당된 원시값을 갖는다.
// 이때 2에서 생성된 래퍼 객체는 아무도 참조하지 않은 상태이므로 가비지 컬렉션의 대상이 된다.

// 4. str은 새롭게 암묵적으로 생성된(2에서 생성된 래퍼 객체와는 다른) 래퍼 객체를 가리킨다.
// 새롭게 생성된 래퍼 객체에는 name 프로퍼티가 존재하지 않는다.
console.log(str.name); // undefined
```

- 문자열, 숫자, 불리언, 심벌은 **암묵적으로 생성**되는 래퍼 객체에 의해 마치 객체처럼 사용할 수 있으며 표준 빌트인 객체인 String, Number, Boolean, Symbol의 프로토타입 메서드 또는 프로퍼티를 **참조**할 수 있음
- 따라서 String, Number, Boolean 생성자 함수를 new 연산자와 함께 호출하여 문자열, 숫자, 불리언 인스턴스를 생성할 필요가 없으며 권장하지도 않음
    - Symbol은 생성자 함수가 아님(33장)
- 이외의 원시값, **null과 undefined는 래퍼 객체 생성 X**
    - 이를 객체처럼 사용하면 에러 발생

## 📌 전역 객체

→ 코드가 실행되기 이전 단계에서 JS엔진에 의해 어떤 객체보다도 먼저 생성되는 특수한 객체이며, 어떤 객체에도 속하지 않은 **최상위 객체**임 

- 전역 객체는 JS환경에 따라 지칭하는 이름은 제각각
    - **브라우저** : window(or self, this, frames)
    - **Node.js** : global
    
    ### 💡 globalThis
    
    - ECMASricpt2020(ES11)에서 도입된 globalThis는 브라우저 환경과 Node.js 환경에서 전역 객체를 가리키던 다양한 식별자를 통일한 식별자. 표준 사양이므로 ECMAScript 표준 사양을 준사하는 모든 환경에서 사용 가능
        
        ```jsx
        // 브라우저 환경
        globalThis === this // true
        globalThis === window // true
        globalThis === self // true
        globalThis === frames // true
        
        // Node.js 환경
        globalThis === this // true
        globalThis === global // true
        ```
        
- 전역 객체는 표준 빌트인 객체, 환경에 따른 호스트 객체, var 키워드로 선언한 전역 변수와 전역 함수를 프로퍼티로 가짐
- **전역객체 특징**
    - 전역 객체는 개발자가 의도적으로 **생성**할 수 없다.
        - 즉, 전역 객체를 생성할 수 있는 생성자 함수가 제공되지 않음
    - 전역 객체의 프로퍼티를 **참조**할 때 **window**(또는 global) 생략 가능
- **전역 객체**의 프로퍼티와 메서드는 window(global)를 생략하여 참조/호출할 수 있으므로 **전역 변수**와 **전역 함수**처럼 사용할 수 있음
    
    ### 📍 빌트인 전역 프로퍼티
    
    → **전역 객체의 프로퍼티**를 말함
    
    ### 🖇️ Infinity
    
    - 무한대를 나타내는 숫자값
    
    ### 🖇️ NaN
    
    - 숫자가 아님을 나타내는 숫자값
    
    ### 🖇️ undefined
    
    - 원시 타입 값 undefined
    
    ### 📍 빌트인 전역 함수
    
    → 애플리케이션 전역에서 호출할 수 있는 빌트인 함수로서 전역 객체의 메서드
    
    ### 🖇️ eval
    
    - JS 코드를 나타내는 **문자열을 인수**로 전달받음
    - 전달받은 문자열 코드가 **표현식**이라면 eval 함수는 문자열 코드를 런타임에 평가하여 값을 생성하고 문이라면 문자열 코드를 런타임에 실행함
    - 여러 개의 문으로 이루어져 있다면 모든 문을 실행함
        
        ```jsx
        /*
        주어진 문자열 코드를 런타임에 평가 또는 실행한다.
        @param {string} code - 코드를 나타내는 문자열
        @returns {*} 문자열 코드를 평가/실행한 결과값
        */
        eval(code)
        ```
        
    - 기존의 스코프를 **런타임에 동적**으로 수정함
    - **eval** 함수를 통해 사용자로부터 입력받은 콘텐츠를 실행하는 것은 **보안에 매우 취약**
    - JS 엔진에 의해 최적화가 수행되지 않으므로 일반적인 코드 실행에 비해 **처리 속도가 느림**
        
        **⇒ eval 함수의 사용은 금지해야 함 !!**
        
    
    ### 🖇️ isFinite
    
    - 전달받은 인수가 정상적인 **유한수인지 검사**하여 유한수이면 **true**, 무한수이면 **false** 반환
    - 숫자가 아닌 경우 숫자로 타입 변환 후 검사 수행
        - 이때 인수가 NaN으로 평가되는 값이라면 false 반환
        
        ```jsx
        /*
        전달받은 인수가 유한수인지 확인하고 그 결과를 반환한다.
        @param {number} testValue - 검사 대상 값
        @returns {boolean} 유한수 여부 확인 결과값
        */
        isFinite(testValue)
        ```
        
    
    ### 🖇️ isNaN
    
    - 전달받은 인수가 **NaN인지 검사**하여 그 결과를 **불리언 타입**으로 반환
    - 숫자가 아닌 경우 숫자로 타입 변환 후 검사 수행
    
    ### 🖇️ parseFloat
    
    - 전달받은 문자열 인수를 부동 소수점 숫자, 즉 **실수로 해석**하여 반환
    
    ### 🖇️ parseInt
    
    - 전달받은 문자열 인수를 **정수로 해석**하여 반환
    
    ### 🖇️ encodeURI / decodeURI
    
    - **encodeURI** 함수는 완전한 URI를 문자열로 전달받아 이스케이프 처리를 위해 **인코딩** 함
        
        **인코딩이란 ?**
        
        - URI의 문자들을 이스케이프 처리하는 것을 의미
        
        **URI이란 ?**
        
        - 인터넷에 있는 자원을 나타내는 유일한 주소를 말함
    - **decodeURI** 함수는 인코딩된 URI를 인수로 전달받아 이스케이프 처리 이전으로 **디코딩** 함
    
    ### 🖇️ encodeURIComponent / decodeURIComponent
    
    - **encodeURIComponent** 함수는 URI 구성 요소를 인수로 전달받아 인코딩
    - **decodeURIComponent** 함수는 매개변수로 전달된 URI 구성 요소를 디코딩
