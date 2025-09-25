/**
 * Implement `customPromiseAllSettled(promises)`
 *
 * It should:
 * - Always resolve with an array of results
 * - Each result is an object:
 *    { status: "fulfilled", value: ... }  for success
 *    { status: "rejected", reason: ... } for failure
 * - Never short-circuit (unlike Promise.all)
 * - You CANNOT use Promise.allSettled internally
 */

async function customPromiseAllSettled(tasks){
    try{
        let result=[];
        return await new Promise((res,rej)=>{
            let completed=0
            for(let i=0;i<tasks.length;i+=1){
                tasks[i].then(r=>{
                    result[i] = { status: "fulfilled", value:r };
                }).catch(e=>{
                    result[i] = { status: "rejected", reason:e };
                }).finally(()=>{
                    completed+=1;
                    if(completed===tasks.length){
                        res(result);
                    }
                })
            }
        })
    }catch(error){

    }
}