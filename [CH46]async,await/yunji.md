# 46.6장. async/await

## 📌 async/await

- ES8에서 제너레이터보다 간단하고 가독성 좋게 비동기 처리를 동기 처리처럼 동작하도록 구현할 수 있게 도입됨
- **프로미스 기반** 동작
- 프로미스의 then/catch/finally 후속 처리 메서드에 콜백 함수를 전달하여 비동기 처리 결과를 후속 처리할 필요 없이 사용 가능
    - 즉, 후속 처리 메서드 없이 **동기 처리처럼 프로미스가 처리 결과를 반환하도록 구현**
    
    ```jsx
    const fetch = require('node-fetch');
    
    async function fetchTodo() {
    	const url = 'https://jsonplaceholder.tyypicode.com/todos/1';
    	
    	const response = await fetch(url);
    	const todo = await response.json();
    	console.log(todo);
    	// {userId: 1, id: 1, title: 'delectus aut autem', completed: false}
    }
    
    fetchTodo();
    ```
    

## 📌 async 함수

- **await 키워드**는 반드시 async 함수 내부에서 사용해야 함.
- async 함수는 async 키워드를 사용하여 정의하며 언제나 프로미스 반환
- 명시적으로 프로미스를 반환하지 않더라도 async 함수는 암묵적으로 반환값을 resolve하는 프로미스를 반환
    
    ```jsx
    // async 함수 선언문
    async function foo(n) { return n; }
    foo(1).then(v => console.log(v)); // 1
    
    // async 함수 표현식
    const bar = async function (n) { return n; };
    bar(2).then(v => console.log(v)); // 2
    
    // async 화살표 함수
    const baz = async n => n;
    bar(3).then(v => console.log(v)); // 3
    
    // async 메서드 
    const obj = {
    	async foo(n) { return n; }
    };
    obj.foo(4).then(v => console.log(v)); // 4
    
    // async 클래스 메서드
    class MyClass {
    	async bar(n) {return n; }
    }
    
    const myClass = new MyClass();
    myClass.bar(5).then(v => console.log(v)); // 5
    ```
    
- 클래스의 **constructor 메서드**는 async 메서드가 될 수 없음
- **constructor 메서드**는 인스턴스를 반환해야 하지만 **async 함수**는 언제나 프로미스를 반환해야 함
    
    ```jsx
    class MyClass {
    	async constructor() { }
    	// SyntaxError: Class constructor may not be an async method
    }
    
    const myClass = new MyClass();
    ```
    

## 📌 await 키워드

- **await 키워드**는 프로미스가 settled 상태가 될 때까지 대기하다가 **setteld  상태가 되면 프로미스가 resolve한 처리 결과를 반환**
    - await 키워든느 반드시 프로미스 앞에서 사용
    
    ```jsx
    const fetch = require('node-fetch');
    
    const getGithubUserName = async id => {
    	const res = await fetch(`https://api.github.com/user/${id}`); // 1
    	const { name } = await res.json(); // 2
    	console.log(name); // Ungmo Lee
    };
    
    getGithubUserName('ungmo2');
    ```
    
- 1 : fetch 함수가 수행한 HTTP 요청에 대한 서버의 응답이 도착해서 fetch 함수가 반환한 프로미스가 settled 상태가 될 때까지 대기함
- 이후 setteled 상태가 되면서 프로미스가 resolve한 처리 결과가 res 변수에 할당
    - await 키워드는 다음 실행을 일시 중지 → 프로미스가 settled 상태가 되면 다시 재개함
    
    ```jsx
    async function foo() {
    	const a = await new Promise(resolve => setTimeout(() => resolve(1), 3000));
    	const b = await new Promise(resolve => setTimeout(() => resolve(2), 2000));
    	const c = await new Promise(resolve => setTimeout(() => resolve(3), 1000));
    	
    	console.log([a, b, c]); // [1, 2, 3]
    }
    
    foo(); // 약 6초 소요
    ```
    
- 모든 프로미스에 await 키워드를 사용하는 것은 주의해야 함
- foo 함수가 수행하는 3개의 비동기 처리는 서로 연관 없이 개별적으로 수행되는 비동기 처리이므로 앞선 비동기 처리가 완료될 때까지 대기하여 순차적으로 처리할 필요가 없음
    - 다음과 같이 처리하는 것이 좋음
    
    ```jsx
    async function foo() {
    	const res = await Promise.all([
    		new Promise(resolve => SetTimeout(() => resolve(1), 3000)),
    		new Promise(resolve => SetTimeout(() => resolve(1), 3000)),
    		new Promise(resolve => SetTimeout(() => resolve(1), 3000)),
    	]);
    	
    	console.log(res); // [1, 2, 3]
    }
    
    foo(); // 약 3초 소요
    ```
    
- 앞선 비동기 처리의 결과를 가지고 다음 비동기 처리를 수행해야 하는 코드
- 따라서 비동기 처리의 처리 순서가 보장되어야 하므로 모든 프로미스에 await 키워드를 사용하여 순차적으로 처리해야 함
    
    ```jsx
    async function bar(n) {
    	const a = await new Promise(reslove => setTimeout(() => resolve(n), 3000));
    	// 두 번째 비동기 처리를 수행하려면 첫 번째 비동기 처리 결과가 필요함
    	const b = await new Promise(reslove => setTimeout(() => resolve(a + 1), 2000));
    	// 세 번째 비동기 처리를 수행하려면 두 번째 비동기 처리 결과가 필요함
    	const c = await new Promise(reslove => setTimeout(() => resolve(b + 1), 1000));
    	
    	console.log([a, b, c]); // [1, 2, 3]
    } 
    
    bar(1); // 약 6초 소요
    ```
    

## 📌 에러 처리

- 비동기 처리를 위한 **콜백 패턴의 가장 심각한 단점**은 에러 처리가 곤란하다는 것
- async/await에서 try … catch문을 사용할 수 있음
- 콜백 함수를 인수로 전달받는 비동기 함수와는 달리 프로미스를 반환하는 비동기 함수는 명시적으로 호출할 수 있기 때문에 호출자가 명확함
    
    ```jsx
    const fetch = require('node-fetch');
    
    const foo = async () => {
    	try {
    		const wrongUrl = 'https://wrong.url';
    		
    		const response = await fetch(wrongUrl);
    		const data = await response.json();
    		console.log(data);
    	} catch (err) {
    		console.log(err); // TypeError: Failed to fetch
    	}
    };
    
    foo();
    ```
    
- foo 함수의 catch문은 HTTP 통신에서 발생한 네트워크 에러뿐 아니라 try 코드 블록 내의 모든 문에서 발생한 일반적인 에러까지 모두 캐치 가능
- asyns 함수 내에서 catch문을 사용해서 에러 처리 하지 않으면 async 함수는 발생한 에러를 reject하는 프로미스를 반환함
- 따라서 async 함수를 호출하고 Promise.prototype.catch 후속 처리 메서드를 사용해 에러 캐치 가능
