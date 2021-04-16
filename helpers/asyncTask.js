const asyncTask = (id, timeout, willFulFilled) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (willFulFilled === true) {
        // ce console.log simule un side effect
        console.log(`Log: task${id} done after ${timeout} seconds`)
        // la valeur de retour est contenu dans le resolve
        resolve(`result from task${id}`)
      } else {
        reject(new Error(`faillure from task${id}`))
      }
    }, timeout * 1000)
  })
}

// HOW TO RUN 3 ASYNC AND ONLY IF ALL ARE NOT BLOCKED (`true` in our example) AND ONLY THEN THE 4TH FUNCTION RUNS!!!!
const main = async () => {
  try {
    const p1 = asyncTask(1, 2, true)
    const p2 = asyncTask(2, 4, true)
    const p3 = asyncTask(3, 2, true)

    const results = await Promise.all([p1, p2, p3])
    for (const result of results) {
      console.log(result)
    }

    const p4 = asyncTask(4, 1, true)
    const rest4 = await p4

    console.log(rest4)
  } catch (e) {
    console.error(e.message)
  }
}
// main()

const main2 = async () => {
  let promises = []
  for (let i = 1; i < 10; ++i) {
    if (i === 4) {
      promises.push(asyncTask(i, i, false))
    }
    promises.push(asyncTask(i, i, true))
  }
  try {
    let results = await Promise.all(promises)
    for (const result of results) {
      console.log(`got result: ${result}`)
    }
  } catch (e) {
    console.error(e.message)
  }
}

// main2()

const main3 = async () => {
  try {
    const p1 = asyncTask(1, 2, true)
    const p2 = asyncTask(2, 4, false)
    const p3 = asyncTask(3, 2, true)

    const results = await Promise.all([p1, p2, p3])
    console.log(results)
  } catch (e) {
    console.error(e.message)
  }
}

main3()
