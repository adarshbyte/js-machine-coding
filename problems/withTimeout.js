/**
 * Implement a function `withTimeout(promise, ms)`
 *
 * - Takes a promise and a timeout (ms)
 * - If the promise resolves/rejects before timeout → return its result
 * - If the timeout expires first → reject with "Timeout"
 *
 * You CANNOT use Promise.race() directly, implement logic yourself.
 */
let timeout = (ms) => {
  return new Promise((res, rej) => {
    setTimeout(() => {
      rej("timeout");
    }, ms);
  });
};
async function withTimeout(promise, ms) {
  try {
   return await new Promise((res,rej)=>{
        let timerid = setTimeout(()=>{
            rej('timeout')
        },ms)
        promise.then(r=>{
            clearTimeout(timerid)
            res(r);
        }).catch(e=>{
            clearTimeout(timerid);
            rej(e);
        })
    })
  } catch (e) {}
}
