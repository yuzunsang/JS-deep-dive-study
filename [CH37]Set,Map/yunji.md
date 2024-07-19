# 37장. Set / Map

## 📌 Set

→ 중복되지 않는 유일한 값들의 집합

- 배열과 유사하지만 차이가 있음
    
    
    | 구분 | 배열 | Set 객체 |
    | --- | --- | --- |
    | 동일한 값을 중복하여 포함할 수 있다. | O | X |
    | 요소 순서에 의미가 있다. | O | X |
    | 인덱스로 요소에 접근할 수 있다. | O | X |
    
    ### 📍 Set 객체의 생성
    
    - Set 객체는 Set 생성자 함수로 생성
        - 인수 전달 x → 빈 Set 객체 생성
        
        ```jsx
        const set = new Set();
        console.log(set); // Set(0) {}
        ```
        
    - Set 생성자 함수는 이터러블을 인수로 전달받아 Set 객체 생성
        - 이터러블의 중복된 값은 Set 객체에 저장되지 않음
        - 즉, 중복요소 제거
        
        ```jsx
        const set1= new Set([1, 2, 3, 3]);
        console.log(set1); // Set(3) [1, 2, 3]
        ```
        
    
    ### 📍 요소 개수 확인
    
    - Set 객체의 요소 개수 확인 시, Set.prototype.size 프로퍼티 사용
        - size 프로퍼티는 setter 함수 없이 getter 함수만 존재하는 접근자 프로퍼티
            - 따라서 size 프로퍼티에 숫자를 할당하여 Set 객체의 요소 개수를 변경할 수 없음
        
        ```jsx
        const { size } = new Set([1, 2, 3, 3]);
        console.log(size); // 3
        ```
        
    
    ### 📍 요소 추가
    
    - Set.prototype.add 메서드 사용
        - 연속적으로 호출 가능
        
        ```jsx
        const set = new Set();
        set.add(1);
        
        console.log(set); // Set(1) {1}
        
        set.add(2).add(4);
        console.log(set); // Set(3) {1, 2, 4}
        ```
        
    
    ### 📍 요소 존재 여부 확인
    
    - Set.prototype.has 메서드 사용
        
        ```jsx
        const set = new Set([1, 2, 3]);
        
        console.log(set.has(2)); // true
        ```
        
    
    ### 📍 요소 삭제
    
    - Set.prototype.delete 메서드 사용
        
        ```jsx
        const set = new Set([1, 2, 3]);
        
        set.delete(2);
        console.log(set); // Set(2) {1, 3}
        ```
        
    - 삭제 성공 여부를 나타내는 불리언 값으로 반환하여 연속적으로 호출할 수 없음
    
    ### 📍 요소 일괄 삭제
    
    - Set.prototype.clear 메서드 사용
        
        ```jsx
        const set = new Set([1, 2, 3]);
        
        set.clear();
        console.log(set); // Set(0) {}
        ```
        
    - clear 메서드는 항상 undefiend 반환
    

## 📌 Map

- Map 객체는 키와 값의 쌍으로 이루어진 컬렉션
    - 객체와 유사하지만 다름
        
        
        | 구분 | 객체 | Map 객체 |
        | --- | --- | --- |
        | 키로 사용할 수 있는 값 | 문자열 또는 심벌 값 | 객체를 포함한 모든 값 |
        | 이터러블 | X | O |
        | 요소 개수 확인  | Object.key(obj).length | map.size |
    
    ### 📍 Map 객체의 생성
    
    - 인수 전달 x → 빈 Map 객체 생성
    - Map 생성자 함수로 생성
    - Map 생성자 함수는 이터러블을 인수로 전달받아 Map 객체를 생성
        - 인수로 전달되는 이터러블은 키와 값의 쌍으로 이루어진 요소로 구성되어야 함
        
        ```jsx
        const map1 = new Map([['k1', 'v1'], ['k2', 'v2']]);
        console.log(map1); // Map(2) {"k1" => "v1", "k2" => "v2"}
        
        const map2 = new Map([1, 2]); // TypeError
        ```
        
    - 중복된 키를 갖는 요소가 존재하면 값이 덮어써짐
        - 중복된 키를 갖는 요소는 존재할 수 없음
    
    ### 📍 요소 개수 확인
    
    - Map.prototype.size 프로퍼티 사용
    
    ### 📍 요소 추가
    
    - Map.prototype.set 메서드 사용
    
    ### 📍 요소 존재 여부 확인
    
    - Map.prototype.has 메서드 사용
    
    ### 📍 요소 일괄 삭제
    
    - Map.prototype.clear 메서드 사용
