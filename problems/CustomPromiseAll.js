/**
 * Implement a function `customPromiseAll` that behaves like Promise.all.
 *
 * It takes an array of promises and returns a new Promise that:
 * - resolves when all input promises resolve, with the results in order
 * - rejects immediately if ANY promise rejects, with the first error
 *
 * Try to do it without using `Promise.all` internally.
 */
async function customPromiseAll(promises) {
  try {
    let results = [];
    let length = promises.length;
    let completed = 0;
    await new Promise((res, rej) => {
      promises.forEach((promise,index) => {
        promise.then((r) => {
          completed += 1;
          results[index]=r;
          if (completed === length) {
            res(results);
          }
        }).catch(e=>rej(e));
      });
    });
    return results;
  } catch (error) {
    throw error;
  }
}
(async () => {
  try {
    let r = await customPromiseAll(
      Array.from({ length: 4 }).map(
        (x, i) => new Promise((res) => setTimeout(() => res(i), 100 * i))
      )
    );
    console.log(r, "result");
  } catch (e) {}
})();
