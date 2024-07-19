# 36장. 디스트럭처링 할당

### 📍 디스트럭처링 할당 (destructuring assignment)

- 구조화된 배열과 같은 이터러블 또는 객체를 destructuring(비구조화, 구조 파괴)하여 1개 이상의 변수에 개별적으로 할당하는 것
    - 배열과 같은 이터러블 또는 객체 리터럴에서 필요한 겂만 추출하여 변수에 할당할 때 유용

## 📌 배열 디스트럭처링 할당

- 구조화된 배열을 디스트럭처링 하여 1개 이상의 변수에 할당
    
    ```jsx
    // ES5
    var arr = [1, 2, 3];
    
    var one = arr[0];
    var two = arr[1];
    var three = arr[2];
    
    // ES6
    
    const [one, two, three] = arr;
    console.log(one, two, three); // 1, 2, 3
    ```
    
- 배열 디스트럭처링 대상(할당문의 우변)은 이터러블이어야 하며 할당 기준은 배열의 인덱스
    - 즉, 순서대로 할당됨
- 이터러블을 할당하지 않으면 에러가 발생하지만 변수의 개수와 이터러블 요소의 개수가 일치하지는 않아도 됨
- **Rest 요소** 사용
    - Rest 파라미터와 마찬가지로 마지막에 위치해야 함
    
    ```jsx
    const [x, ...y] = [1, 2, 3];
    console.log(x, y); // 1 [2, 3]
    ```
    

## 📌 객체 디스트럭처링 할당

- ES5에선 객체의 각 프로퍼티를 객체로부터 디스트럭처링하여 변수에 할당하기 위해선 **프로퍼티 키**를 사용
- ES6에선 객체로부터 추출하여 1개 이상의 변수에 할당함
    - 객체 디스트럭처링 할당의 대상은 객체이어야 하며, 할당 기준은 프로퍼티 키
        - 즉, 순서는 의미 없고 이름만 일치하면 됨
    
    ```jsx
    // ES5
    var user = { firstName: 'Ungmo', lastName: 'Lee' };
    
    var firstName = user.firstName;
    var lastName = user.lastName;
    
    console.log(firstName, lastName); // Ungmo Lee
    
    // ES6
    const { firstName, lastName } = user;
    console.log(firstName, lastName); // Ungmo Lee
    ```
    
- 우변에 객체 또는 객체로 평가될 수 있는표현식을 할당하지 않으면 에러 발생
- 객체의 프로퍼티 키와 다른 변수 이름으로 프로퍼티 값을 할당하려면 변수를 선언해야 함
    
    ```jsx
    const user = { firstName: 'Ungmo', lastName: 'Lee' };
    const { lastName: ln, firstName: fn } = user;
    
    console.log(fn, ln); // Ungmo Lee
    ```
    
- 객체를 인수로 전달받는 함수의 매개변수에도 사용 가능
    
    ```jsx
    function printTodo(todo) {
    	console.log(`할일 ${todo.content}은 ${todo.completed ? '완료' : '미완료'} 상태입니다.`);
    }
    
    printTodo({ id: 1, content: 'HTML', completed: true }); // 할일 HTML은 완료 상태입니다.
    ```
