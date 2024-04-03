async function backgroundFunction() {
    console.log('Executing background function...');
    setTimeout(backgroundFunction, 6000); // 1 minute interval (in milliseconds)
}

backgroundFunction();