function print(a, b) {
  console.log(a + ": " + b)
}

// for test
// let tab = [
//   [
//     [1, 1],
//     [1, 1]
//   ],
//   [[1, 1]],
//   [[1]],
//   [[1], [1], [1]]
// ]

let tab = [
  [
    [1, 7, 3],
    [11, 17, 7],
    [-3, -5],
    [5, 13]
  ],
  [
    [2, 4, 6, 8, 10],
    [1, 3, 5]
  ],
  [[0]],
  [[0], [1], [2], [1]]
]

function recursive_flat(tab, final_start) {
  for (const el of tab) {
    if (el instanceof Array) {
      recursive_flat(el, final_start)
    } else {
      final_start.push(el)
    }
  }

  return final_start
}

myFinal = recursive_flat(tab, [])
console.log(myFinal)
sum = myFinal.reduce((a, b) => a + b, 0)
console.log(sum)
