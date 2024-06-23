// flat
// 어지러운 배열을 보기 좋게(평평하게) 만들어줍니다.
function testFlat(어지러운배열) {
  console.log(어지러운배열.flat(3));
}

// testFlat([1, [2, 3], 4, [5, [6, [7]]]]);

// flatMap
// flat과 마찬가지로 평평하게 만들어주되, map 연산 => flat 연산 을 하고, 1단계 깊이 까지만 평평해집니다.
function testFlatMap(배열) {
  console.log(배열.flatMap((num) => [[num * 2]]));
}

// testFlatMap([1, 2, 3]);

// reduce
// 배열 연산에 만능인 녀석.
// map, filter, some, every, find 전부 reduce로도 구현할 수 있습니다.
// 예제 : 부호가 false이면 음수, true이면 양수 => 수의 합 구하기
function testReduce(배열, 부호) {
  console.log(
    배열.reduce((acc, cur, idx) => (부호[idx] ? acc + cur : acc - cur), 0)
  );
}

// testReduce([1, 2, 3, 4], [false, true, false, true]);

// find
// 순회하면서 true 인 원소 하나를 찾습니다.
function testFind(찾는이름) {
  const 사용자 = [
    { id: 1, 이름: "junsang" },
    { id: 2, 이름: "renny" },
    { id: 3, 이름: "tim" },
  ];

  console.log(사용자.find(({ 이름 }) => 이름 === 찾는이름));
}

// testFind("andy");
// testFind("renny");

// splice
// 특정 위치의 값을 삭제/추가 + 범위 지정할 수 있습니다.
// push, pop, unshift, shift와 달리 중간 지점의 인덱스에도 쉽게 삭제/추가 가능
function testSplice(오늘한일) {
  오늘한일.splice(3, 1, "놀았다", "asdf", "asdf", "asdf");
  console.log(오늘한일);
}

testSplice(["일어난다", "씻는다", "밥먹는다", "공부한다", "잔다"]);
