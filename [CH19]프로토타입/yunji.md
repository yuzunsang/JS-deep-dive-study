# 19장. 프로토타입

- **자바스크립트**는 명령형(imperative), 함수형(functional), 프로토타입 기반(prototype-based), 객체지향 프로그래밍(OOP: Object Oriented Programming)을 지원하는 **멀티 패러다임 프로그래밍 언어**
    - 클래스 기반 객체지향 프로그래밍 언어보다 효율적, 더 강력한 객체지향 프로그래밍 능력
- 자바스크립트를 이루고 있는 거의 **“모든 것”은 객체**
    - 원시 타입 값을 제외한 나머지 값(함수, 배열, 정규 표현식 등)들 모두 객체

## 📌 객체지향 프로그래밍

→ 프로그램을 명령어 또는 함수의 목록으로 보는 전통적인 ‘**명령형 프로그래밍**’의 절차지향적 관점에서 벗어나 여러 개의 독립적인 단위, 즉 객체의 집합으로 프로그램을 표현하려는 **프로그래밍 패러다임**

- **추상화(abstraction)** : 다양한 속성 중에서 프로그램에 필요한 속성만 간추려 표현하는 것

```jsx
// 이름과 주소 속성을 갖는 객체
const person = {
	name: 'Lee',
	address: 'Seoul'
};

console.log(person); // {name: "Lee", address: "Seoul"}
```

- 객체 → 속성을 통해 여러 개의 값을 하나의 단위로 구성한 복합적인 자료구조
- 객체지향 프로그래밍은 객체의 상태를 나타내는 데이터와 상태 데이터를 조작할 수 있는 동작을 하나의 논리적인 단위로 묶어서 생각함
- 따라서 객체는 상태 데이터와 동작을 하나의 논리적인 단위로 묶은 복합적인 자료구조
    - 상태 데이터 : **프로퍼티(property)**
    - 동작 : **메서드(method)**

## 📌 상속과 프로토타입

- **상속(inheritance)** : 어떤 객체의 프로퍼티 또는 메서드를 다른 객체가 상속받아 그대로 사용할 수 있는 것
    - 불필요한 중복 제거 → 코드 **재사용**
    
    ```jsx
    // 생성자 함수
    function Circle(radius) {
    	this.radius = radius;
    	this.getArea = function () {
    		return Math.PI * this.radius ** 2;
    	};
    }
    
    const circle1 = new Circle(1);
    const circle2 = new Circle(2);
    
    // getArea 메서드 중복 생성, 모든 인스턴스가 중복 소유
    // getArea 메서드는 하나만 생성하여 공유하는 것이 바람직
    console.log(circle1.getArea === circle2.getArea); // **false**
    console.log(circle1.getAera()); // 3.141592653589793
    console.log(circle2.getArea()); // 12.566380614359172
    ```
    
- Circle 생성자 함수는 인스턴스 생성 시 getArea 메서드 중복 생성, 중복 소유
    
    → **메모리 낭비 !!!**
    
- 프로토타입을 기반으로 상속을 구현하여 불필요한 중복 제거
    
    ```jsx
    function Circle(radius) {
    	this.radius = radius;
    }
    
    // Circle 생성자 함수가 생성한 모든 인스턴스가getArea 메서드를
    // **공유해서 사용할 수 있도록 프로토타입에 추가**
    // 프로토타입은 Circle 생성자 함수의 prototype 프로퍼티에 바인딩 되어 있음 
    Circle.prototype.getArea = function () {
    	return Math.PI * this.radius ** 2;
    };
    
    // 인스턴스 생성
    const circle1 = new Circle(1);
    const circle2 = new Circle(2);
    
    // Circle.protype으로부터 getArea를 상속 받음
    // 즉, Circle 생성자 함수가 생성하는 모든 인스턴스는 단 하나의 getArea 메서드를 공유함
    console.log(circle1.getArea === circle2.getArea); // **true**
    console.log(circle1.getAera()); // 3.141592653589793
    console.log(circle2.getArea()); // 12.566380614359172
    ```
    
- 생성자 함수가 생성할 모든 인스턴스가 공통적으로 사용할 **프로퍼티**나 **메서드**를 **프로토타입**에 미리 구현해 두면 생성자 함수가 생성할 모든 인스턴스는 별도의 구현 없이 상위 객체인 프로토타입의 자산을 **공유**하여 사용할 수 있음

## 📌 프로토타입 객체

→ 객체지향 프로그래밍의 근간을 이루는 객체 간 **상속을 구현하기 위해 사용**

- 모든 객체는 **[[Prototype]]**이라는 **내부 슬롯**을 가짐
    - 이 내부 슬롯의 값은 **프로토타입의 참조**
- 객체 생성 방식에 따라 **프로토타입이 결정**되고 [[Prototype]]에 저장
- **모든 객체**는 하나의 프로토타입을 가지고 모든 프로토타입은 생성자 함수와 연결됨
    
    ### 📍 __**proto__** 접근자 프로퍼티
    
    - 모든 객체는 **__proto__** 접근자 프로퍼티를 통해 자신의 프로토타입, 즉 **[[Prototype]]** 내부 슬롯에 간접적으로 접근 가능
        
        ![Untitled](19%E1%84%8C%E1%85%A1%E1%86%BC%20%E1%84%91%E1%85%B3%E1%84%85%E1%85%A9%E1%84%90%E1%85%A9%E1%84%90%E1%85%A1%E1%84%8B%E1%85%B5%E1%86%B8%203bd07fecfe1c4185b4f23c95bab58199/Untitled.png)
        
        ### ✏️ __proto__는 접근자 프로퍼티다.
        
        - 내부 슬롯은 프로퍼티가 아님
            - 원칙적으로 내부 슬롯, 내부 메서드는 직접 접근, 호출하는 방법 제공 X
        - 단, 일부 내부 슬롯과 내부 메서드에 한하여 **간접적으로** 접근할 수 있는 수단을 제공하긴 함
            
            → 프로토타입에 접근 가능
            
        
        ### ✏️ __proto__ 접근자 프로퍼티는 상속을 통해 사용된다.
        
        - __proto__ 접근자 프로퍼티는 객체가 직접 소유 하는 프로퍼티가 아닌 Object.prototype의 프로퍼티임
            - 모든 객체는 상속을 통해 Object.prototype.__proto__ 접근자 프로퍼티 사용 가능
            
            ```jsx
            const person = { name: 'Lee' };
            
            // person 객체는 __proto__ 프로퍼티를 소유하지 않는다.
            console.log(person.hasOwnProperty('__proto__')); // false
            
            // __proto__ 프로퍼티는 모든 객체의 프로토타입 객체인 Object.prototype 접근자 프로퍼티다.
            console.log(Object.gerOwnPropertyDescriptor(Object.prototype, '__proto__')); 
            // {get: f, set: f, enumerable: false, configurable: true}
            
            // 모든 객체는 Object.prototype의 접근자 프로퍼티 __proto__를 상속받아 사용할 수 있다.
            console.log({}.__proto__ === Object.prototype); // true
            ```
            
        
        ### ✏️ __proto__ 접근자 프로퍼티를 통해 프로토타입에 접근하는 이유
        
        → **상호 참조**에 의해 **프로토타입 체인이 생성되는 것을 방지**하기 위해서
        
        ```jsx
        const parent = {};
        const child = {};
        
        // child의 프로토타입을 parent로 설정
        child.__proto__ = parent;
        // parent의 프로토타입을 child로 설정
        parent.__proto__ = child; // TypeError: Cyclic __proto__ value
        ```
        
        - 위 코드가 에러 없이 정상적으로 처리되면 **서로가 자신의 프로토타입이 되는** 비정상적인 프로토타입 체인이 만들어지기에 __proto__ 접근자 프로퍼티는 **에러를 발생**시킴
        - **프로토타입 체인**은 프로퍼티 검색 방향이 한쪽 방향으로만 흐르게 **단방향 링크드 리스트**로 구현되어야 함
        - 위 코드는 순환 참조하는 프로토타입 체인이므로 종점이 존재하지 않기에 **에러 발생**
            - 즉, 무한 루프
        
        ### ✏️ __proto__ 접근자 프로퍼티를 코드 내에서 직접 사용하는 것은 권장 X
        
        - __proto__ 접근자 프로퍼티는 ES5까지 포함되지 않은 비표준이었음
        - 일부 브라우저에선 지원 → 브라우저 호환성을 고려하여 ES6에서 __proto__를 **표준으로 채택**
        - 모든 객체가 __proto__를 사용할 수 있는 것은 아니기에 코드 내에서 직접 사용 권장 X
            
            ```jsx
            // obj는 프로토타입 체인의 종점이다. 따라서 Object.__proto__를 상속받을 수 없음
            const obj = Object.create(null);
            ```
            
        - 따라서 __proto__ 접근자 프로퍼티 대신
            - **프로토타입의 참조** → **Object.getPrototypeOf** 메서드 사용 권장
            - **프로토타입 교체** → **Object.setPrototypeOf** 메서드 사용 권장
            
    
    ### 📍 함수 객체의 prototype 프로퍼티
    
    - 함수 객체만이 소유하는 prototype 프로퍼티는 생성자 함수가 생성할 인스턴스의 프로토타입을 가리킴
        
        ```jsx
        // 함수 객체는 prototype 프로퍼티를 소유한다. 
        (function () {}).hasOwnProperty('prototype'); // true
        
        // 일반 객체는 prototype 프로퍼티를 소유하지 않는다.
        ({}).hasOwnProperty('prototype'); // false
        ```
        
    - prototype 프로퍼티는 생성자 함수가 생성할 객체의 프로토타입을 가리킴
    - 따라서 생성자 함수로서 호출할 수 없는 함수 **non-constructor**인 화살표 함수와 ES6 메서드 축약 표현으로 정의한 메서드는 prototype 프로퍼트를 소유하지 않으며 프로토타입도 생성하지 않음
        
        ```jsx
        // 화살표 함수는 non-constructor다.
        const person = name => {
        	this.name = name;
        };
        
        // non-constructor는 prototype 프로퍼티를 소유하지 않는다.
        console.log(Person.hasOwnProperty('prototype')); // false
        
        // non-constructor는 프로토타입을 생성하지 않는다.
        console.log(Person.prototype); // undefined
        
        // ES6의 메서드 축약 표현으로 정의한 메서드는 non-constructor다.
        const obj = {
          foo() {}
        };
        
        // non-constructor는 prototype 프로퍼티를 소유하지 않는다.
        console.log(obj.foo.hasOwnProperty('prototype')); // false
        
        // non-constructor는 프로토타입을 생성하지 않는다.
        console.log(obj.foo.prototype); // undefined
        
        ```
        
    - 모든 객체가 가지고 있는 __proto__ 접근자 프로퍼티와 함수 객체만이 가지고 있는 prototype 프로퍼티는 **결국 동일한 프로토타입을 가리킴**
        
        
        | 구분 | 소유  | 값 | 사용 주체 | 사용 목적 |
        | --- | --- | --- | --- | --- |
        | __proto__ 
        접근자 프로퍼티 | 모든 객체 | 프로토타입의 참조 | 모든 객체 | 객체가 자신의 프로토타입에 접근 또는 교체하기 위해 사용 |
        | prototype 
        프로퍼티 | constuctor | 프로토타입의 참조 | 생성자 함수 | 생성자 함수가 자신이 생성할 객체(인스턴스)의 프로토타입을 할당하기 위해 사용 |
        
    
    ### 📍 프로토타입의 constructor 프로퍼티와 생성자 함수
    
    - 모든 프로토타입은 constructor 프로퍼티를 가짐
        - **constructor** : prototype 프로퍼티로 자신을 참조하고 있는 생성자 함수를 가리킴
        
        ```jsx
        // 생성자 함수
        function Person(name) {
        	this.name = name;
        }
        
        const me = new Person('Lee');
        
        // me 객체의 생성자 함수는 Person이다.
        console.log(me.constructor === Person) // true
        ```
        
        - **me 객체**에는 constructor 프로퍼티가 없지만 me 객체의 프로토타입인 **Person.prototype**에는 constructor 프로퍼티가 있음
            - 따라서 me 객체는 프로토타입은 Person.prototype의 constructor 프로퍼티를 상속받아 사용 가능
    

## 📌 리터럴 표기법에 의해 생성된 객체의 생성자 함수와 프로퍼티

- 생성자 함수에 의해 생성된 인스턴스는 프로토타입의 **constructor 프로퍼티**에 의해 생성자 함수와 연결됨
    - 이때 **constructor** **프로퍼티**가 가리키는 생성자 함수는 인스턴스를 생성한 생성자 함수
- 하지만 리터럴 표기법에 의한 객체 생성 방식과 같이 명시적으로 new 연산자와 함께 생성자 함수를 호출하여 인스턴스를 생성하지 않는 객체 생성 방식도 있음
- 프로토타입과 생성자 함수는 단독으로 존재할 수 없고 항상 **쌍(pair)**으로 존재함

## 📌 프로토타입의 생성 시점

- constructor는 함수 정의가 평가되어 함수 객체를 생성하는 시점에 프로토타입도 더불어 생성됨
    
    ```jsx
    console.log(Person.prototype); // {constructor: f}
    
    // 생성자 함수
    function Person(name) {
    	this.name = name;
    }
    ```
    
    - non-constructor는 프로토타입이 생성되지 않음
    
    ```jsx
    // 화살표 함수는 non-constructor
    const Person = name => {
    	this.name = name;
    }; 
    
    // non-constructor는 프로토타입이 생성되지 않음
    console.log(Person.prototype); // undefined
    ```
    

## 📌 객체 생성 방식과 프로토타입의 결정

- 객체는 다양한 생성 방법이 있음
    - **객체 리터럴**
    - **Object 생성자 함수**
    - **생성자 함수**
    - **Object.create 메서드**
    - **클래스(ES6)**
- 세부적인 생성 방식의 차이는 있으나 OrdinaryObjectCreate에 의해 생성된다는 공통점
- 프로토타입은 추상 연산 OrdinaryObjectCreate에 전달되는 인수에 의해 결정됨
    
    ### 📍 객체 리터럴에 의해 생성된 객체의 프로토타입
    
    - JS엔진은 객체 리터럴을 평가하여 객체를 생성할 때 추상 연산 OrdinaryObjectCreate를 호출
        - 객체 리터럴에 의해 생성되는 객체의 프로토타입은 **Object.prototype**
    
    ### 📍 Object 생성자 함수에 의해 생성된 객체의 프로토타입
    
    - Object 생성자 함수에 의해 생성된 객체는 Object.prototype을 **프로토타입**으로 가지며 Object.prtotype을 **상속** 받음
    - 객체 리터럴과의 **차이점**
        - **객체 리터럴 방식** : 객체 리터럴 내부에 프로퍼티 추가
        - **Object 생성자 함수 방식** : 일단 빈 객체 생성 후 프로퍼티 추가
    
    ### 📍 생성자 함수에 의해 생성된 객체의 프로토타입
    
    - 생성자 함수에 의해 생성되는 객체의 프로토타입은 생성자 함수의 prototype 프로퍼티에 **바인딩**되어 있는 객체

## 📌 프로토타입 체인

```jsx
function Person(name) {
	this.name = name;
}

// 프로토타입 메서드
Person.prototype.sayHello = function () {
	console.log(`Hi! My name is ${this.name}`};
};

const me = new Person('Lee');

// hasOwnProperty는 Object.prototype의 메서드다.
console.log(me.hasOwnProperty('name')); // true

// Person.prototype의 프로토타입은 Object.prototype임
Object.getPrototypeOf(me) === Person.prototype; // true
```

- Person 생성자 함수에 의해 생성된 me 객체는 Object.prototype의 메서드인 **hasOwnProperty**를 호출할 수 있음
    - me 객체가 Person.prototype뿐만 아닌 Object.prototype도 상속 받았다는 것
    - me 객체의 프로토타입은 Person.prototype
- **자바스크립트는 객체의 프로퍼티에 접근하려 할 때 해당 객체에 접근하려는 프로퍼티가 없다면 [[Prototype]] 내부 슬롯의 참조를 따라 자신의 부모 역할을 하는 프로토타입의 프로퍼티를 순차적으로 검색함**
    - 이를 **프로토타입 체인**
- **프로토타입 체인** : JS가 객체지향 프로그래밍의 **상속**과 **프로퍼티 검색**을 위한 메커니즘
- **Object.prototype**을 프로토타입 **체인의 종점**이라 함
    - Object.prototype의 프로토타입 즉, **[[Prototype]]** 내부 슬롯의 값은 null
- **스코프 체인과 프로토타입 체인은 서로 연관없이 별도로 동작하는 것이 아니라 서로 협력하여 식별자와 프로퍼티를 검색하는 데 사용됨**
