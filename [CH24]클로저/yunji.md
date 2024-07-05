# 24장. 클로저

## 📌 렉시컬 스코프

→ JS엔진은 함수를 어디서 호출했는지가 아닌 **함수를 어디에 정의했는지**에 따라 상위 스코프를 결정하는 것 (정적 스코프)

⇒ 함수의 상위 스코프는 함수를 정의한 위치에 의해 정적으로 결정되고 변하지 않음

- 즉, ‘함수의 상위 스코프를 결정한다’는 것은 ‘렉시컬 환경의 외부 렉시컬 환경에 대한 참조에 저장할 참조값을 결정한다’는 것과 같음
- 렉시컬 환경의 ‘외부 렉시컬 환경에 대한 참조’에 저장할 참조값, 즉 상위 스코프에 대한 참조는 함수 정의가 평가되는 시점에 함수가 정의된 환경(위치)에 의해 결정됨
    
    → **렉시컬 스코프**
    

## 📌 함수 객체의 내부 슬롯 [[Environment]]

- 함수는 자신의 내부 슬롯 **[[Environment]]**에 자신이 정의된 환경, 상위 스코프의 참조를 저장함
- 자신이 호출되었을 때 생성될 함수 렉시컬 환경의 ‘외부 렉시컬 환경에 대한 참조’에 저장될 참조값
- 함수 객체는 내부 슬롯 [[Environment]]에 저장한 렉시컬 환경의 참조, 즉 자신이 존재하는 한 상위 스코프를 기억함
    
    ```jsx
    const x = 1;
    
    function foo() {
    	const x = 10;
    	
    	bar();
    }
    
    function bar() {
    	console.log(x);
    }
    
    foo(); // ??
    bar(); // ??
    ```
    
- **정답**
    
    **둘다 1.**
    
    - 전역 코드가 평가되는 시점에 평가되어 함수 객체를 생성하고 전역 객체 window 메서드가 됨.
    - 이때 생성된 함수 객체의 내부 슬롯 [[Environment]]에는 함수 정의가 평가된 시점, 즉 전역 코드 평가 시점에 실행 중인 실행 컨텍스트의 렉시컬 환경인 전역 렉시컬 환경의 참조가 저장됨
- **함수 코드 평가 순서**
    1. **함수 실행 컨텍스트 생성**
    2. **함수 렉시컬 환경 생성**
        
        2.1 함수 환경 레코드 생성
        
        2.2 this 바인딩
        
        2.3 외부 렉시컬 환경에 대한 참조 결정
        
- 함수 렉시컬 환경의 구성 요소인 외부 렉시컬 환경에 대한 참조에는 함수 객체의 내부 슬롯 [[Environment]]에 저장된 렉시컬 환경의 참조가 할당됨
    - **함수 정의 위치에 따라 상위 스코프를 결정**

## 📌  클로저와 렉시컬 환경

```jsx
const x = 1;

// 1
function outer() {
	const x = 10;
	const inner = function () { console.log(x); } // 2
	return inner;
}

const innerFunc = outer(); // 3
innerFunc(); // 4
```

- 3번을 실행하면 outer 함수는 inner를 반환하고 생명 주기 마감
    - 즉, outer 함수의 실행 컨텍스트는 스택에서 제거됨 (x도)
        - outer 함수의 렉시컬 환경까지 소멸하는 것은 아님!
            - **→ 왜일까 ??**
                
                inner 함수의 [[Environment]] 내부 슬롯에 의해 참조되고 있고 inner 함수는 전역 변수 innerFunc에 의해 참조되고 있으므로 가비지 컬렉션의 대상이 되지 않기 때문
                
- **외부 함수보다 중첩 함수가 더 오래 유지되는 경우** 중첩 함수는 이미 생명 주기가 종료한 외부 함수의 변수를 **참조**할 수 있음
    
    ⇒ **클로저(closure)**
    
    - 중첩 함수가 더 오래 유지가 되어도 상위 스코프의 어떤 식별자도 참조하지 않는 함수는 클로저 아님 !
        - 참조하지 않으면 메모리 낭비이기에 상위 스코프 기억 안 함
    
    ```jsx
    function foo() {
    	const x = 1;
    	const y = 2;
    	 
    	function bar() {
    		const z = 3;
    		console.log(z);
    	}
    	
    	return bar;
    }
    
    const bar = foo();
    bar();
    ```
    
- 클로저에 의해 참조되는 상위 스코프의 변수
    
    ⇒ **자유 변수(free variable)**
    
- **클로저(closure)**란 ‘**함수가 자유 변수에 닫혀 있다(closed)**’라는 의미 !
    - 자유 변수에 묶여 있는 함수

## 📌 클로저의 활용

- 클로저는 **상태(state)**를 안전하게 변경하고 유지하기 위해 사용함
- 상태를 안전하게 은닉(information hiding)하고 특정 함수에게만 상태 변경을 허용하기 위해 사용
    
    ```jsx
    let num = 0;
    
    const increase = function() {
    	return ++num;
    };
    
    console.log(increase()); // 1
    console.log(increase()); // 2
    console.log(increase()); // 3
    ```
    
- 잘 동작하지만 오류 발생 가능성 있는 좋지 않은 코드 (→ 전역 변수)
    1. 카운트 상태는 increase 함수가 호출되기 전까지 변경되지 않고 유지되어야 함
    2. 카운트 상태는 increase함수만이 변경할 수 있어야 함
    
    ```jsx
    const increase = function() {
    	let num = 0;
    	return ++num;
    };
    
    console.log(increase()); // 1
    console.log(increase()); // 1
    console.log(increase()); // 1
    ```
    
    - (?)
        
        ```jsx
        const createIncreaseFunction = function() {
            let num = 0;
            return function() {
                return ++num;
            };
        };
        
        const increase = createIncreaseFunction();
        console.log(increase()); // 1
        console.log(increase()); // 2
        console.log(increase()); // 3
        
        ```
        
        - 즉시 실행 함수가 아니라면 ?!
            - IIFE를 사용하면 함수 호출 없이 변수를 즉시 초기화하고 클로저를 생성할 수 있는 반면, IIFE를 사용하지 않으면 별도로 함수를 호출하여 클로저를 생성
- 전역 변수 → 지역 변수 변경 ⇒ 의도치 않은 상태 변경은 방지
    - but, 원하는 값이 나오지 않게 됨
    - **그렇다면 어떻게 ?!**
        
        ```jsx
        // 즉시 실행 함수 사용
        const increase = (function() {
        	let num = 0;
        	return function() {
        		return ++num;
        	};
        }());
        
        console.log(increase()); // 1
        console.log(increase()); // 2
        console.log(increase()); // 3
        ```
        
        - increase 변수에 할당된 함수는 자신이 정의된 위치에 의해 결정된 상위 스코프인 즉시실행함수의 렉시컬 환경을 기억하는 클로저
        - 즉시 실행 함수가 반환한 클로저는 카운트 상태를 유지하기 위한 자유 변수 num을 언제 어디서 호출하든지 참조하고 변경할 수 있음
        - 즉시 실행 함수이므로 num을 재호출 하는 일은 없음
            - num은 은닉된 preivate 변수 → 안정적인 프로그래밍 가능
- **클로저**는 상태(state)가 의도치 않게 변경되지 않도록 안전하게 **은닉(information hiding)**하고 특정 함수에게만 상태 변경을 허용하여 **상태를 안전하게 변경하고 유지**하기 위해 사용됨

```jsx
function makeCounter(aux) {
  let counter = 0;

  return function () {
    counter = aux(counter);
    return counter;
  };
}

function increase(n) {
  return ++n;
}

function decrease(n) {
  return --n;
}

const increaser = makeCounter(increase);
console.log(increaser()); // ?
console.log(increaser()); // ?

const decreaser = makeCounter(decrease);
console.log(decreaser()); // ?
console.log(decreaser()); // ?

```

- makeCounter 함수는 보조 함수를 인자로 전달받고 함수를 반환하는 고차 함수
- makeCounter 함수를 호출해 함수를 반환할 때 반환된 함수는 자신만의 독립된 렉시컬 환경을 가짐
    - 함수를 호출하면 그때마다 새로운 makeCounter 함수 실행 컨텍스트의 렉시컬 환경이 생성되기 때문
- 자유 변수 counter를 공유하지 않아 카운트를 유지하지 않는 독립된 렉시컬 환경이 아니게 하려면 makeCounter 함수를 두 번 호출하지 말아야 함
    
    ```jsx
    const counter = (function () {
      let counter = 0;
    
      return function (aux) {
        counter = aux(counter);
        return counter;
      };
    }());
    
    function increase(n) {
      return ++n;
    }
    
    function decrease(n) {
      return --n;
    }
     
    console.log(counter(increase)); // ?
    console.log(counter(increase)); // ? 
    
    console.log(counter(decrease)); // ?
    console.log(counter(decrease)); // ?
    ```
    

## 📌 캡슐화와 정보 은닉

- **캡슐화(encapsulation)**는 객체의 상태(state)를 나타내는 프로퍼티와 프로퍼티를 참조하고 조작할 수 있는 동작(behavior)인 메서드를 하나로 묶는 것을 말함
- 객체의 특정 프로퍼티나 메서드를 감출 목적으로 사용하기도 하는데 이를 정보 은닉(infomation hiding)이라고 함
    - 정보 보호, 결합도를 낮춤

## 📌 자주 발생하는 실수

- 클로저를 사용할 때 자주 발생할 수 있는 실수 예제
    
    ```jsx
    var funcs = [];
    
    for (var i = 0; i < 3; i++) {
    	funcs[i] = function () { return i; }; // 1
    }
    
    for (var j = 0; j < funcs.length; j++) {
    	console.log(funcs[j]()); // 2
    }
    ```
    
    - 결과는 0, 1, 2가 아닌 3이 3번 출력
    
    ```jsx
    var funcs = [];
    
    for (var i = 0; i < 3; i++) {
    	funcs[i] = (function (id) { // 1
    		return function () {
    			return id; 
    		};
    	}(i));
    }
    
    for (var j = 0; j < funcs.length; j++) {
    	console.log(funcs[j]()); // 2
    }
    ```
    
    - 출력이 잘 되지만 번거로움
    - JS의 함수 레벨 스코프 특성으로 인해 for문의 변수 선언문에서 var 키워드로 선언한 변수가 전역 변수가 되기에 발생하는 현상
        - let 키워드 사용하면 됨
    
    ```jsx
    var funcs = [];
    
    for (let i = 0; i < 3; i++) {
    	funcs[i] = function () {return i;};
    }
    
    for (let j = 0; j < funcs.length; j++) {
    	console.log(funcs[j]()); // 2
    }
    ```
    
    - for문 반복될 때마다 새로운 렉시컬 환경 생성
