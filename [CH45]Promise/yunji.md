# 45장. 프로미스 4.5 ~

## 📌 프로미스 체이닝

```jsx
const url = 'http://jsonplaceholder.typicode.com';

// id가 1인 post의 userId를 취득
promiseGet(`${url}/post/1`)
	// 취득한 post의 userId로 user 정보를 취득
	.then(({ useId }) => promiseGet(`{url}/users/${useId}`))
	.then(userInfo => console.log(userInfo))
	.catch(err => console.error(err));
```

- **then → then → catch** 순서로 후속 처리 메서드 호출
- then, catch, finally 후속 처리 메서드는 언제나 프로미스를 반환하므로 연속적으로 호출할 수 있음
    
    → **프로미스 체이닝(promise chaining)**
    
    | 후속 처리 메서드 | 콜백 함수의 인수 | 후속 처리 메서드의 반환값 |
    | --- | --- | --- |
    | then | promiseGet 함수가 반환한 프로미스가 resolve한 값(id가 1인 post) | 콜백 함수가 반환한 프로미스 |
    | then | 첫 번째 then 메서드가 반환한 프로미스가 resolve한 값(post의 userId로 취득한 user 정보) | 콜백 함수가 반환한 값(undefined)을 resolve한 프로미스 |
    | catch 
    (에러가 발생하지 않으면 호출되지 않음) | promiseGet 함수 또는 앞선 후속 처리 메서드가 반환한 프로미스가 resolve한 값 | 콜백 함수가 반환한 값(undefined)을 resoleve한 프로미스 |
- 후속 처리 메서드는 콜백 함수가 반환한 프로미스를 반환함
- 만일 후속 처리 메서드의 콜백함수가 프로미스가 아닌 값을 반환하더라도 그 값을 암묵적으로 resolve 또는 reject하여 프로미스를 생성해 반환함
- **프로미스**는 프로미스 체이닝을 통해 비동기 처리 결과를 전달받아 후속 처리를 하므로 비동기 처리를 위한 콜백 패턴에서 발생하던 콜백 헬이 발생하지 않음
    - 다만 프로미스도 콜백 패턴을 사용하므로 콜백 함수를 사용하지 않는 것은 아님

## 📌 프로미스의 정적 메서드

- Promise는 주로 생성자 함수로 사용되지만 함수도 객체이므로 메서드를 가질 수 있음
- **5가지 정적 메서드** 제공
    1. **Promise.resolve/Promise.reject 메서드**
        - 이미 존재하는 값을 래핑하여 프로미스를 생성하기 위해 사용함
        - **Promise.resolve 메서드**는 인수로 전달받은 **resolve**하는 프로미스를 생성
        
        ```jsx
        // 베열을 resolve하는 프로미스 생성
        const resolvedPormise = Promise.resolve([1, 2, 3]);
        resolevedPromise.then(console.log); // [1, 2, 3]
        
        // 위 코드는 다음과 동일하게 동작함
        const resolvedPromise = new Promise(resolve => resolve([1, 2, 3]));
        resolvedPromise.then(console.log); // [1, 2, 3]
        ```
        
        - **Promise.reject 메서드**는 인수로 전달받은 값을 **reject**하는 프로미스 생성
        
        ```jsx
        // 에러 객체를 reject하는 프로미스 생성
        const rejectedpromise = Promise.reject(new Error('Error!'));
        rejectedPromise.catch(console.log); // Error: Error!
        
        // 위 코드는 다음과 동일하게 동작함
        const rejectedpromise = new Promise((_, reject) => reject(new Error('Error!')));
        rejectedPromise.catch(console.log); // Error: Error!
        ```
        
    2. **Promise.all 메서드**
        - **Promise.all 메서드**는 여러 개의 비동기 처리를 모두 **병렬 처리**할 때 사용함
            
            ```jsx
            const requestData1 = () =>
            	new Promise(resolve => setTimeout(() => resolve(1), 3000));
            const requestData2 = () =>
            	new Promise(resolve => setTimeout(() => resolve(2), 2000));
            const requestData3 = () =>
            	new Promise(resolve => setTimeout(() => resolve(3), 1000));
            	
            // 세 개의 비동기 처리를 순차적으로 처리
            const res = [];
            requestData1()
            	.then(data => {
            		res.push(data);
            		return requestData2();
            	})
            	.then(data => {
            	res.push(data);
            	return requestData3();
            })
            	.then(data => {
            		res.push(data);
            		console.log(res); // [1, 2, 3] => 약 6초 소요
            	})
            	.catch(console.error);
            ```
            
        - 위 코드는 앞선 비동기 처리가 완료하면 다음 비동기 처리를 수행하여 비동기 처리를 순차적으로 진행함
            - 3 → 2 → 1 = **6초**
        - 위 비동기 처리는 서로  의존x, 개별적 수행
            - 앞선 비동기 처리 결과를 다음 비동기 처리가 사용하지 않음
                - 따라서 순차적으로 처리할 필요 없음
            
            ```jsx
            const requestData1 = () =>
            	new Promise(resolve => setTimeout(() => resolve(1), 3000));
            const requestData2 = () =>
            	new Promise(resolve => setTimeout(() => resolve(2), 2000));
            const requestData3 = () =>
            	new Promise(resolve => setTimeout(() => resolve(3), 1000));
            	
            // 세 개의 비동기 처리를 병렬로 처리
            Promise.all([requestData1(), requestData2(), requestData3()])
            	.thsn(console.log) // [1, 2, 3] => 약 3초 소용
            	.catch(console.error); 
            ```
            
        - Promise.all 메서드는 프로미스를 요소로 갖는 배열 등의 이터러블을 인수로 전달받음
            - 전달받은 모든 프로미스가 **fulfilled 상태**가 되면 모든 처리 결과를 배열에 저장하여 새로운 프로미스 반환
            - 위 코드는 다음과 같이 동작함
                1. 첫 번째 프로미스는 3초 후에 1을 resolve한다.
                2. 두 번째 프로미스는 2초 후에 2을 resolve한다.
                3. 세 번째 프로미스는 1초 후에 3을 resolve한다.
            - 전달받은 모든 프로미스가 모두 fulfilled 상태가 되면 종료.
            - 따라서 Promise.all 메서드가 종료하는 데 걸리는 시간은 가장 늦게 fulfilled 상태가 되는 프로미스의 처리 시간보다 조금 더 김
                - 즉, 위 예제는 3초보다 조금 더 소요.
        - 인수로 전달받은 배열의 프로미스가 하나라도 rejected 상태가 되면 나머지 프로미스가 fulfilled 상태가 되는 것을 기다리지 않고 즉시 종료
    3. **Promise.race 메서드**
        - Promise.all 메서드와 동일하게 프로미스를 요소로 갖는 배열 등의 이터러블을 인수로 전달 받음
        - 모든 프로미스가 fulfulled 상태가 되는 것을 기다르는 것이 아니라 가정 먼저 fulfilled 상태가 된 프로미스의 처리 결과를 resolve하는 새로운 프로미스를 반환
            
            ```jsx
            Promise.race([
            	new Promise(resolve => setTimeout(() => resolve(1), 3000)); 
            	new Promise(resolve => setTimeout(() => resolve(2), 2000)); 
            	new Promise(resolve => setTimeout(() => resolve(3), 1000));
            ]) 
            	.thsn(console.log) // 3
            	.catch(console.log); 
            ```
            
        - 프로미스가 rejected 상태가 되면  Promise.all 메서드와 동일하게 처리
            - Promise.race 메서드에 전달된 프로미스가 하나라도 rejected 상태가 되면 에러를 reject하는 새로운 프로미스를 즉시 반환함
        
        ```jsx
        Promise.race([
        	new Promise((_, resolve) => setTimeout(() => resolve(1), 3000)); 
        	new Promise((_, resolve) => setTimeout(() => resolve(2), 2000)); 
        	new Promise((_, resolve) => setTimeout(() => resolve(3), 1000));
        ]) 
        	.thsn(console.log)  
        	.catch(console.log); // Error: Error 3
        ```
        
    4. **Promise.allSettled 메서드**
        - Promise.allSettled 메서드는 프로미스를 요소로 갖는 배열 등의 이터러블을 인수로 전달 받음
        - 전달받은 프로미스가 모두 settled 상태(fulfilled or rejected)가 되면 처리 결과를 배열로 반환
        
        ```jsx
        Promise.allSettled([
        	new Promise(resolve => setTimeout(() => resolve(1), 2000)),
        	new Promise((_, reject) => setTimeout(() => reject(new Error('Error')), 1000))
        ]).then(console.log);
        /*
        [
        	{status: "fulfilled", value: 1},
        	{status: "rejected", reason: Error: Error! at <anonymous>:3:54}
        ]
        */
        ```
        
        - 상태 상관없이 Promise.allSettled 메서드가 인수로 전달받은 모든 프로미스들의 처리 결과가 모두 담겨 있음
        - **프로미스의 처리 결과**
            - 프로미스가 fulfilled 상태인 경우 비동기 처리 상태를 나타내는 status 프로퍼티와 처리 결과를 나타내는 value 프로퍼티를 가짐
            - 프로미스가 rejected 상태인 경우 비동기 처리 상태를 나타내는 status 프로퍼티와 에러를 나타내는 reason 프로퍼티를 가짐

## 📌 마이크로태스크 큐

```jsx
setTimeout (() =>  console.log(1), 0);

Promise.resolve()
	.then(() => console.log(2))
	.then(() => console.log(3));
```

- 후속 처리 메서드는 비동기로 동작하므로 1, 2, 3의 순으로 출력될 것 같지만 2, 3 ,1 순으로 출력됨
    - 후속 처리 메서드의 콜백 함수는 태스크 큐가 아닌 마이크로태스크 큐에 저장되기 때문
- 마이크로태스크 큐에는 프로미스의 후속 처리 메서드의 콜백 함수가 일시 저장되는 곳
- 콜백 함수나 이벤트 핸들러를 일시 저장한다는 점에서 태스크 큐와 동일하지만 마이크로태스트 큐는 태스크 큐보다 우선순위가 높음
    - 즉, 이벤트 루프는 콜 스택이 비면 마이크로태스크 큐에서 대기하는 함수를 가져와서 실행
    - 이후 마이크로태스크 큐가 비면 태스크 큐에 대기하고 있는 함수를 가져와 실행함
    - **! 콜스택 → 마이크로태스크 큐 → 태스크 큐 !**

## 📌 fetch

- **fetch 함수**는 XMLHttpRequest 객체와 마찬가지로 HTTP 요청 전송 기능을 제공하는 클라이언트 사이드 Wep API
    - XMLHttpRequest ****객체보다 사용법이 간단하고 프로미스를 지원하기에 콜백 패턴의 단점에서 자유로움
- HTTP 요청을 전송할 URL, HTTP 요청 메서드, HTTP 요청 헤더, 페이로드 등을 설정하여 전달
    
    ```jsx
    const promise = fetch(url, [, options])
    ```
    
- HTTP 응답을 나타내는 Response 객체를 래핑한 Promise 객체를 반환
- then을 통해 프로미스가 resolve한 Response 객체를 전달받을 수 있음
