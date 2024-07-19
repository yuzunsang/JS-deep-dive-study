# 39장. DOM

## 📌 어트리뷰트

### 📍 어트리뷰트 노드와 attributes 프로퍼티

- HTML 어트리뷰트는 요소의 시작 태그에 **어트리뷰트 이름 = “어트리뷰트 값”** 형식으로 정의
    
    ```jsx
    <input id="user" type="text" value="hello">
    ```
    
- HTML 문서가 파싱될 때 어트리뷰트는 어트리뷰트 노드로 변환되어 요소 노드와 연결됨
- 모든 어트리뷰트 노드의 **참조**는 유사 배열 객체이자 이터리블인 **NamedNodeMap** 객체에 담겨서 요소 노드의 attributes 프로터티에 저장됨
    - **Element.prototype.attributes** 프로퍼티로 취득할 수 있음
- attributes 프로퍼티는 getter만 존재하는 읽기 전용 프로퍼티이며 요소 노드의 모든 어트리뷰트 노드의 참조가 담긴 NamedNodeMap 객체를 변환함

### 📍 HTML 어트리뷰트 조작

- 요소 노드의 attributes 프로퍼티는 읽기 전용 접근자 프로퍼티이며 attributes.id.value와 같이 attributes 프로퍼티를 통해야만 HTML 어트리뷰트 값을 취득할 수 있기에 불편함
- **Element.prototype.getAttribute/setAttribute 메서드**
    - attributes 프로퍼티를 통하지 않고 요소 노드에서 메서드를 통해 직접 HTML 어트리뷰트 값을 취득하거나 변경 가능하기에 편리함
    - HTML 어트리뷰트 값 - **참조**
        - **Element.prototype.getAttribute(attributeName)**
    - HTML 어트리뷰트 값 - **변경**
        - **Element.prototype.setAttribute(attributeName)**
    
    ```html
    <!DOCTYPE html>
    <html>
    <body>
    	<input id="user" type="text" value="hello">
    	<script>
    		const $input = document.getElementById('user');
    		
    		const inputValue = $input.getAttribute('value');
    		console.log(inputValue); // hello
    		
    		$input.setAttribute('value', 'Good Mornig');
    		console.log($input.getAttribute('value')); // Good Morning
    	</script>
    </body>
    </hml>
    ```
    
    - 특정 HTML 어트리뷰트가 **존재하는지 확인**
        - **Element.prototype.hasAttribute(attributeName)**
    - 특정 HTML 어트리뷰트 **삭제**
        - **Element.prototype.removeAttribute(attributeName)**

### 📍 HTML 어트리뷰트 vs DOM 프로퍼티

- 요소 노드 객체에는 HTML 어트리뷰트에 대응하는 프로퍼티(이하 DOM 프로퍼티)가 존재함
    - 이 DOM 프로퍼티들은 HTML 어트리뷰트 값을 초기값으로 가지고 있음
    
    ```html
    <!DOCTYPE html>
    <html>
    <body>
    	<input id="user" type="text" value="hello">
    	<script>
    		const $input = document.getElementById('user');
    		
    		// 요소 노드의 vlaue 프로퍼티 값을 변경
    		$input.value = 'Good Morning'
    		
    		// 요소 노드의 vlaue 프로퍼티 값을 참조
    		console.log($input.value); // Good Morning
    	</script>
    </body>
    </hml>
    ```
    
- DOM에서 중복 관리되고 있는 것처럼 보임 (근데 **X**
    1. 요소 노드의 attributes 프로퍼티에서 관리하는 어트리뷰트 노드
    2. HTML 어트리뷰트에 대응하는 요소 노드의 프로퍼티(DOM 프로퍼티)
- **HTML 어트리뷰트의 역할**
    - **HTML 요소의 초기 상태를 지정하는 것**
    - 즉, HTML 어트리뷰트 값은 HTML 요소의 초기 상태를 의미하며 변하지 않음
- 요소 노드는 2개의 상태, 초기 상태와 최신 상태를 관리해야 함
- 요소 노드의 초기 상태는 어트리뷰트 노트가 관리하고 최신 상태는 DOM 프로퍼티가 관리함
    
    **어트리뷰트 노드**
    
    - HTML 어트리뷰트로 지정한 HTML 요소의 초기 상태는 **어트리뷰트 노드에서 관리**
    - 사용자의 입력에 의해 상태가 변경되어도 변하지 않고 **초기 상태 그대로 유지**
    
    **DOM 프로퍼티**
    
    - 사용자가 입력한 최신 상태는 HTML 어트리뷰트에 대응하는 요소 노드의 **DOM 프로퍼티가 관리함**
    - DOM 프로퍼티는 사용자의 입력에 의한 상태 변화에 반응하여 **언제나 최신 상태 유지**
        
        ```html
        <!DOCTYPE html>
        <html>
        <body>
        	<input id="user" type="text" value="hello">
        	<script>
        		const $input = document.getElementById('user');
        		
        		// 사용자가 input 요소의 입력 필드에 값 입력할 때마다 input 요소 노드의 value 프로퍼티 값,
        		// 즉 최신 상태 값을 취득. value 프로퍼티 값은 사용자의 입력에 의해 동적으로 변경
        		$input.oninput = () => {
        			console.log('value 프로퍼티 값', $input.value);  
        		};
        		
        		// getAttribute 메서드로 취득한 HTML 어트리뷰트 값, 즉 초기 상태 값은 변하지 않고 유지됨
        		console.log('value 프로퍼티 값', $input.getAttribute('value'));  
        	</script>
        </body>
        </hml>
        ```
        
    - DOM 프로퍼티에 값을 할당하는 것은 HTML 요소의 최신 상태 값을 변경하는 것
        - 즉 사용자가 상태를 변경하는 행위
    - HTML 요소에 지정한 어트리뷰트 값에는 어떠한 영향도 주지 않음
        
        ```html
        <!DOCTYPE html>
        <html>
        <body>
        	<input id="user" type="text" value="hello">
        	<script>
        		const $input = document.getElementById('user');
        		
        		// DOM 프로퍼티에 값을 할당하여 HTML 요소의 최신 상태를 변경
        		$input.value = 'bye';
        		
        		console.log($input.value); // bye
        		
        		// getAttribute 메서드로 취득한 HTML 어트리뷰트 값, 즉 초기 상태 값은 변하지 않고 유지됨
        		console.log('value 프로퍼티 값', $input.getAttribute('value')); // hello
        	</script>
        </body>
        </hml>
        ```
        
    - 단, 모든 DOM 프로퍼티가 사용자의 입력에 의해 변경된 최신 상태를 관리하는 것은 아님
        - **input 요소**의 사용자에 입력에 의한 상태 변화는 value 프로퍼티가 관리하고 **checkbox 요소**는 checked 프로퍼티가 관리.
        - id 어트리뷰트에 대응하는 id 프로퍼티는 사용자의 입력과 아무런 관계가 없음
            - id 어트리뷰트와 id 프로퍼티는 사용자 입력과 관계없이 항상 동일한 값 유지
            - 즉, id 어트리뷰트 값이 변하면 id 프로퍼티 값도 변하고 그 반대도 마찬가지
    - 이처럼 사용자 입력에 의한 상태 변화와 관계있는 DOM 프로퍼티만 최신 상태 값을 관리
    - 그 외의 사용자 입력에 의한 상태 변화와 관계없는 어트리뷰트와 DOM 프로퍼티는 항상 동일 값으로 연동
    
    **HTML 어트리뷰트와 DOM 프로퍼티의 대응 관계**
    
    - **대부분의 HTML 어트리뷰트는 HTML 어트리뷰트 이름과 동일한 DOM 프로퍼티와 1:1 대응**
    - 단, 다음과 같은 상황에서는 1:1이 아니며 HTML 어트리뷰트 이름과 DOM 프로퍼티 키가 반드시 일치하는 것은 아님
        - id 어트리뷰트와 id 프로퍼티는 1:1 대응하며 동일한 값으로 연동한다.
        - input 요소의 value 어트리뷰트는 value 프로퍼티와 1:1 대응한다. 하지만 value 어트리뷰트는 초기 상태를, value 프로퍼티는 최신 상태를 갖는다.
        - class 어트리뷰트는 className, classList 프로퍼티와 대응한다.
        - for 어트리뷰트는 htmlFor 프로퍼티와 1:1 대응한다.
        - td 요소의 colspan 어트리뷰트는 대응하는 프로퍼티가 존재하지 않는다.
        - textContent 프로퍼티는 대응하는 어트리뷰트가 존재하지 않는다.
        - 어트리뷰트 이름은 대소문자를 구별하지 않지만 대응하는 프로퍼티 키는 카멜 케이스를 따른다.
    
    **DOM 프로퍼티 값의 타입**
    
    - **getAttribute 메서드**로 취득한 어트리뷰트 값은 **언제나 문자열**
    - 하지만 **DOM 프로퍼티**로 취득한 최신 상태 값은 문자열이 아닐 수도 있음
        
        ```html
        <!DOCTYPE html>
        <html>
        <body>
        	<input type="checkbox" checked>
        	<script>
        		const $checkbox = document.getElementById('input[type=checkbox]');
        		
        		// getAttribute 메서드로 취득한 어트리뷰트 값은 언제나 문자열
        		console.log($checked.getAttribute('checked')); // ''	
        		
        		// DOM 프로퍼티로 취득한 최신 상태 값은 문자열이 아닐 수도 있음
        		conole.log($checkbox.checked); // true
        		</script>
        </body>
        </hml>
        ```
        

### 📍 data 어트리뷰트와 dataset 프로퍼티

- data 어트리뷰트와 dataset 프로퍼티를 사용하면 HTML 요소에 정의한 사용자 정의 어트리뷰트와 자바스크립트 간에 데이터를 교환할 수 있음
- **data 어트리뷰트**는 data-user-id, data-role과 같이 data-접두사 다음에 임의의 이름을 붙여 사용함
    
    ```html
    <!DOCTYPE html>
    <html>
    <body>
    	<ul class="users">
    		<li id="1" data-user-id="3223" data-role="admin">Lee</li>
    		<li id="2" data-user-id="7823" data-role="subcriber">Kim</li>
    	</ul>
    </body>
    </hml>
    ```
    
- data 어트리뷰트의 값은 **HTMLElemennt.dataset 프로퍼티**로 취득할 수 있음
- dataset 프로퍼티는 HTML 요소의 모든 data 어트리뷰트의 정보를 제공하는 **DOMStringMap** 객체를 반환함
    - **DOMStringMap 객체**는 data 어트리뷰트의 data- 접두사 다음에 붙인 임의의 이름을 카멜 케이스로 변환한 프로퍼티를 가지고 있음
    - 이 프로퍼티로 data 어트리뷰트 값을 **취득**하거나 **변경** 가능
    
    ```html
    <!DOCTYPE html>
    <html>
    <body>
    	<ul class="users">
    		<li id="1" data-uer-id="3223" data-role="admin">Lee</li>
    		<li id="2" data-uer-id="7823" data-role="subcriber">Kim</li>
    	</ul>
    	<script>
    		const user = [...document.querySelector('.users').children];
    		
    		const user = user.find(user => user.dataset.userId === '3223');
    		console.log(user.dataset.role); // "admin"
    		
    		// id가 3223인 요소 노드의 data-role 값을 변경
    		user.dataset.role = 'subscriber';
    		// dataset 프로퍼티는 DOMStringMap 객체를 반환
    		console.log(user.dataset); // DOMStringMap {userId: "3223", role: "subscriber"}
    	</script>
    </body>
    </html>
    ```
    

## 📌 스타일

### 📍 인라인 스타일 조작

- **HTMLElement.prototype.style 프로퍼티**는 setter와 getter 모두 존재하는 접근자 프로퍼티로서 요소 노드의 인라인 스타일을 취득하거나 추가 또는 변경함
- **style 프로퍼티를 참조**하면 **CSSStyleDeclaration** 타입의 객체를 반환
    - CSSStyleDeclaration 객체는 다양한 CSS 프로퍼티에 대응하는 프로퍼티를 가지고 있으며 이 프로퍼티에 값을 할당하면 해당 CSS 프로퍼티가 인라인 스타일로 HTML 요소에 추가되거나 변경됨
    - CSS 프로퍼티는 **케밥 케이스**를 따름
    - 이에 대응하는 CSSStyleDeclaration 객체의 프로퍼티 키는 카멜 케이스를 따름
        
        ```css
        # CSS 프로퍼티 background-color에 대응하는 CSSStyleDeclaration 객체의 프로퍼티는 backgroundColor
        $div.style.backgroundColor = "yello";
        ```
        
    - 케밥 케이스의 CSS 프로퍼티를 그대로 사용하려면 객체의 마침표 표기법 대신 **대괄호 표기법 사용**
        
        ```css
        $div.style['background-color'] = "yello";
        ```
        
    - px, em 등의 크기 단위가 필요한 width 프로퍼티와 같은 경우에 값 할당 시 단위 생략 ?
        
        → **CSS 프로퍼티는 적용 안됨.**
        

### 📍 클래스 조작

**className**

- **Element.prototype.className 프로퍼티**는 setter와 getter 모두 존재하는 접근자 프로퍼티로서 HTML 요소의 class 어트리뷰트 값을 취득하거나 변경함
- 요소 노드의 className 프로퍼티를 참조하면 class 어트리뷰트 값을 문자열로 반환하고 요소 노드의 className 프로퍼티에 문자열을 할당하면 class 어트리뷰트 값을 할당한 문자열로 변경함
- className 프로퍼티는 문자열을 반환하므로 공백으로 구분된 여러 개의 클래스를 반환하는 경우 다루기가 불편함

**classList**

- **Element.prototype.classList 프로퍼티**는 class 어트리뷰트의 정보를 담은 DOMTokenList 객체를 반환함
- DOMTokenList 객체는 class 어트리뷰트의 정보를 나타내는 컬렉션 객체로서 유사 배열 객체이면서 이터러블
    - 다음과 같이 유용한 메서드 제공
        - **add(…className)**
            
            add 메서드는 인수로 전달한 1개 이상의 문자열을 class 어트리뷰트 값으로 추가함
            
        - **remove(…className)**
            
            remove 메서드는 인수로 전달한 1개 이상의 문자열과 일치하는 클래스를 class 어트리뷰트에서 삭제함
            
            (일치하는 클래스가 없으면 에러 없이 무시)
            
        - **item(index)**
            
            item 메서드는 인수로 전달한 index에 해당하는 클래스를 class 어트리뷰트에서 반환함
            
        - **contains(className)**
            
            contains 메서드는 인수로 전달한 문자열과 일치하는 클래스가 class 어트리뷰트에 포함되어 있는지 확인
            
            (boolean 값)
            
        - **replace(oldClassName, newClassName)**
            
            replace 메서드는 class 어트리뷰트에서 첫 번째 인수로 전달한 문자열을 두 번째 인수로 전달한 문자열로 변경
            
        - **toggle(className[, force])**
            
            toggle 메서드는 class 어트리뷰트에 인수로 전달한 문자열과 일치하는 클래스가 존재하면 제거하고 존재하지 않으면 추가함
            
    - 이 밖에도 forEach, entries, keys, values, supports 메서드 제공함
