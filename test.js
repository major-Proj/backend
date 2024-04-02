// Promisified setTimeout function
function delay(ms) {
    return new Promise(resolve => {
      setTimeout(resolve, ms);
    });
  }
  
  // Asynchronous function to demonstrate asynchronous behavior
  async function asyncFunction() {
    console.log("Start of asyncFunction");
    
    // Wait for 1 second
    await delay(1000);
    console.log("After 1 second");
  
    // Wait for another 1.5 seconds
    await delay(1500);
    console.log("After another 1.5 seconds");
  
    console.log("End of asyncFunction");
  }
  
  // Call the asynchronous function
  console.log("Before calling asyncFunction");
  asyncFunction();
  console.log("After calling asyncFunction");
  