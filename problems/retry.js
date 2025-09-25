/**
 * Implement `retry(fn, retries, delay)`
 *
 * - `fn`: a function that returns a Promise
 * - `retries`: number of attempts before giving up
 * - `delay`: initial wait time (ms)
 *
 * Behavior:
 * - Call fn()
 * - If it succeeds → resolve with result
 * - If it fails → wait for `delay` ms, then retry
 * - Each retry doubles the delay (exponential backoff)
 * - After all retries fail → reject with last error
 */
function sleep(delayTime){
    return new Promise((res)=>{
        setTimeout(()=>{
            res('resolved')
        },delayTime);
    })
}
async function retry(fn,retries,delay){
    try{
        let res=await fn()
        return res;
    }catch(e){
        if(retries===0){
            throw e;
        }else{
            await sleep(delay);
            return await retry(fn,retries-1,delay*2);
        }
    }
}
retry()