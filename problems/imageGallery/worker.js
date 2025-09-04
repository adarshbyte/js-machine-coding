self.onmessage=(e)=>{
    if(e.data==='work'){
        console.log('work received');
        self.postMessage('work done')
    }
    console.log(e,'image cilcked')
}