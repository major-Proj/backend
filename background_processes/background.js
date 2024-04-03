function backgroundFunction() {
    return new Promise((resolve, reject) => {
        console.log('Executing background function...');
        let i = 0;
        let sum = 0;
        for (i; i < 1000000000000000000000000; i++) {
            sum += i;
        }
        console.log(sum)
        resolve(sum);
    });

    //setTimeout(backgroundFunction, 6000); // 1 minute interval (in milliseconds)
}

module.exports = {
    backgroundFunction
}