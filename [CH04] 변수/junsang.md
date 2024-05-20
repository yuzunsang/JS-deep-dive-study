# [4장] 변수 정리

## 변수란?

---

변수(variable)는 하나의 값을 저장하기 위해 확보한 메모리 공간 자체 또는 그 메모리 공간을 식별하기 위해 붙인 이름을 의미합니다.

변수는 박스, 값은 박스 안에 담는 물건으로 생각하면 쉽습니다.

![Untitled](%5B4%E1%84%8C%E1%85%A1%E1%86%BC%5D%20%E1%84%87%E1%85%A7%E1%86%AB%E1%84%89%E1%85%AE%20%E1%84%8C%E1%85%A5%E1%86%BC%E1%84%85%E1%85%B5%209c7a42a4074e439a9249a8a9ec75f5f4/Untitled.png)

위의 그림을 코드로 나타내보면, 아래와 같이 됩니다.

```jsx
let message; // 1... message라는 박스 선언
message = "Hello"; // 2... "Hello" 라는 물건을 담음
```

1번 코드를 변수 선언이라고 하고,

2번 코드를 변수에 값 할당이라고 합니다.

그리고 박스 안의 값을 쉽게 참조해 오기 위해 message라는 변수명을 라벨지로 붙입니다.

이 message는 박스를 식별할 수 있는 식별자의 역할을 합니다.

---

## 변수 선언 및 값의 할당

자바스크립트에서 변수를 선언하는 키워드는 var, let, const가 있습니다.

변수 선언은 선언 단계 ⇒ 할당 단계를 거칩니다.

<aside>
💡 var의 변수 선언은 선언과 초기화가 동시에 일어납니다.
이 말은 따로 값을 할당하지 않아도 자동으로 undefined가 할당된다는 의미입니다.

</aside>

값은 아래와 같이 재할당도 가능합니다.
다만 const는 재할당이 불가합니다.

```jsx
var message = "Hello";
message = "Hi"; // O

let num = 1;
num = 2; // O

const name = "junsang";
name = "javascript"; // X
```

## 식별자 네이밍 규칙

---

식별자 이름은 반드시 정해진 규칙에 따라 지어야 합니다.

1. $, _ (달러 표시, 언더스코어 표시) 를 제외한 특수문자 X
2. 이름 맨 앞에 숫자 X
3. 예약어 X (for, if, switch, function, …)

각각의 언어 혹은 상황마다 쓰이는 네이밍 컨벤션이 여러 개 있습니다.

- 카멜 케이스
    
    ```jsx
    var userIdPassword; // 첫 단어 제외하고 단어의 첫 글자를 대문자로
    ```
    
    자바스크립트에서 변수명을 지을 때 보통 사용.
    
- 스네이크 케이스
    
    ```jsx
    var i_am_snake; // 단어를 _ 로 이음
    ```
    
    파이썬에서 주로 사용.
    
- 파스칼 케이스
    
    ```jsx
    class MyCustomer; // 단어의 첫 글자를 대문자로(첫 단어도 대문자)
    ```
    
    자바스크립트에서는 클래스 이름을 주로 파스칼 케이스로 짓습니다.
    
- 헝가리안 케이스
    
    ```jsx
    var numCurrentAccount; // 앞에 타입을 붙여줌
    ```
    
    C언어에서 주로 사용하나 현재 사용을 지양하는 추세라고 합니다.
    

## 변수 호이스팅

---

hoisting은 “끌어올리다” 라는 뜻입니다.

변수 호이스팅은 마치 변수 선언이 코드 선두로(정확히는 스코프 선두로) 끌어올려지는 효과를 말합니다.

호이스팅되는 식별자로는 var, let, const, 함수, 클래스가 있습니다.

자바스크립트 엔진 내부에서

런타임 실행 이전에 코드를 전체적으로 쭉 스캔해서 변수 선언문을 호이스팅하고,

이후에 순차적으로 코드를 평가하게 됩니다.

```jsx
console.log(num);
var num = 100;
```

따라서 이 코드를 실행하면 참조에러가 발생하지 않고, undefined를 출력하게 됩니다.

```jsx
var num; // 변수 선언이 호이스팅되면서 위로 끌어올려진 것처럼 코드가 실행
console.log(num);
num = 100;
```

var의 호이스팅 때문에 실행 결과를 예측하기 힘들고 의도대로 동작하지 않을 가능성이 높아지게 됩니다.

이러한 위험 때문에 ES6에서 let/const 개념이 도입되었습니다.

var과 달리 let/const은 실제 선언문과 호이스팅되는 위치 사이에 TDZ(Temporal Dead Zone)가 존재합니다.

TDZ는 참조를 금지하는 구역을 의미합니다.

아래 코드를 보면, let, const는 var와 어떻게 다르게 실행되는 지 확인할 수 있습니다.

```jsx
// let과 const의 TDZ
console.log(count); // ReferenceError
console.log(greeting); // ReferenceError
// TDZ
let count = 10;
const greeting = "Hello";
```

ReferenceError가 나올 때 let/const는 그러면 호이스팅되지 않는 것인가? 라고 생각하실 수도 있지만

그렇지 않고, 호이스팅은 되나 TDZ에 의해 참조가 막혔다 라는 표현이 제일 적절합니다.

참조 - [https://medium.com/korbit-engineering/let과-const는-호이스팅-될까-72fcf2fac365](https://medium.com/korbit-engineering/let%EA%B3%BC-const%EB%8A%94-%ED%98%B8%EC%9D%B4%EC%8A%A4%ED%8C%85-%EB%90%A0%EA%B9%8C-72fcf2fac365)