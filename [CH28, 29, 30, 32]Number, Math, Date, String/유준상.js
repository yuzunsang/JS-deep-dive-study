// Number.prototype.toFixed
// toFixed는 반올림해서 소수점 고정
function toFixedMethod(num) {
  // console.log(num.toFixed());

  // console.log(typeof num.toFixed());

  console.log(num.toFixed(3));
}

// console.log(Math.PI);
// toFixedMethod(Math.PI);

// Math.round
// 반올림
function roundMethod(num) {
  console.log(Math.round(num));
}

// roundMethod(Math.PI);
// roundMethod(1.5);
// roundMethod(1.01);
// roundMethod(-1.5);
// roundMethod(-1.99);

// Math.ceil
// 천장
function ceilMethod(num) {
  console.log(Math.ceil(num));
}

// ceilMethod(1.5);
// ceilMethod(1.01);
// ceilMethod(-1.5);
// ceilMethod(-1.99);

// Math.floor
// 바닥
function floorMethod(num) {
  console.log(Math.floor(num));
}

// floorMethod(1.5);
// floorMethod(1.01);
// floorMethod(-1.5);
// floorMethod(-1.99);

// Math.random()
// 0과 0.9999999999999... 사이의 랜덤한 수
// Tip : 암호학적으로 안전한 난수 생성용으로 적합하지 X
// => 안전하게 암호화하고 싶으면 window.crypto.getRandomValues()
function randomMethod(range) {
  for (let i = 0; i < 5; i++) {
    console.log(Math.ceil(Math.random() * range));
  }
}
// 0
randomMethod(10);
// console.log(Math.random());
