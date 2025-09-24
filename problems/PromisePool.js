/**
 * Implement a `promisePool(tasks, concurrency)`
 *
 * - `tasks`: an array of functions that return a Promise (not the promise itself)
 * - `concurrency`: how many tasks can run at a time
 *
 * Return a Promise that resolves when all tasks are done.
 */
async function batchPool(tasks, concurrency) {
  try {
    let countTillNow = 0;
    let toExecute = [];
    let finalResult = [];
    for (let i = 0; i < tasks.length; i += 1) {
      countTillNow += 1;
      toExecute.push(tasks[i]);
      if (countTillNow === concurrency) {
        let res = await Promise.all(toExecute.map((fn) => fn()));
        finalResult.push(...res);
        countTillNow = 0;
        toExecute = [];
      }
    }
    return finalResult;
  } catch (e) {
    throw e;
  }
}
function generatePromises(count) {
  return Array.from({ length: count }).map((x, i) => {
    return () => {
      return new Promise((res, rej) => {
        setTimeout(() => {
          res(i);
        }, i * 100);
      });
    };
  });
}

(async () => {
  try {
    let res = await batchPool(generatePromises(5), 2);
    console.log(res, "result");
  } catch (e) {
    console.log(e, "Error");
  }
})();