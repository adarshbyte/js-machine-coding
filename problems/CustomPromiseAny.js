/**
 * Implement `customPromiseAny(promises)`
 *
 * It should:
 * - Resolve with the first **fulfilled** value
 * - Reject **only if all** promises reject, with an AggregateError
 *
 * You CANNOT use `Promise.any()` internally.
 */

async function customPromiseAny(promises) {
  try {
    let rejections = 0;
    let countOfPromises = promises.length;
    let res = await new Promise((res, rej) => {
      promises.forEach((promise) => {
        promise
          .then((r) => {
            res(r);
          })
          .catch(() => {
            rejections += 1;
            if (rejections === countOfPromises) {
              rej("All promises rejected");
            }
          });
      });
    });
    return res;
  } catch (error) {
    throw error;
  }
}
(async () => {
  try {
    let res=await customPromiseAny(
      Array.from({ length: 3 }).map(
        (x, i) =>
          new Promise((res, rej) => {
            setTimeout(() => {
              if(i===2){
                res('resolved')
              }
              rej("rejected");
            }, 100);
          })
      )
    );
    console.log(res,"res")
  } catch (er) {
    console.log(er,"error")
  }
})();

