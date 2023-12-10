const Loading = () => {

  const sleep =  (ms) => {
    return new Promise(resolve => setTimeout(resolve, 1000000));
  }
  
  // console.log('Loading Start');
  // sleep().then(() => { console.log('Loading Done'); });
  return (
    <>
    </>
  )
}

export default Loading