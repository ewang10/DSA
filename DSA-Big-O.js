//let ticks = 0;

function hanoi(disk, from, to, buffer) {
    if (disk > 1) {
        hanoi(disk-1, from, buffer, to);
        ticks++;
        hanoi(disk-1, buffer, to, from);
        ticks++;
    }
    return;
}

//hanoi(7, "A", "C", "B");
//console.log(ticks);

function countingSheepsIterative(n) {
    for (let i = n; i > 0; i--) {
        console.log(i + ": Another sheep jumps over the fence");
    }
    console.log("All sheep jumped over the fence");
}

//countingSheepsIterative(3);

function powerCalculatorIterative(base, exp) {
    let res = 1;
    if (exp < 0) {
        console.log("exponent should be >= 0");
        return;
    }
    for (let i = 0; i < exp; i++) {
        res *= base;
    }
    return res;
}

//console.log(powerCalculatorIterative(10,2));

function reverseStringIterative(str) {
    const strLen = str.length;
    const revStr = [];
    for (let i = strLen - 1; i >= 0; i--) {
        revStr.push(str[i]);
    }
    return revStr.join("");
}

//console.log(reverseStringIterative("string"));

function nthTriangleNumIterative(n) {
    let sum = 0;
    for (let i = 1; i <= n; i++) {
        sum += i;
    }
    return sum;
}

//console.log(nthTriangleNumIterative(3));

function stringSpliterIterative(str) {
    const delimiter = "/";
    const arr = [""];
    let j = 0;

    for (let i = 0; i < str.length; i++) {
        if (str.charAt(i) === delimiter) {
            arr.push('');
            j++
        } else {
            arr[j] += str.charAt(i);
        }
    }
    return arr;
}

//console.log(stringSpliterIterative("20/20/2020"));

function fibonacciIterative(n) {
    let previousPreviousNum;
    let previousNum = 0;
    let currNum = 1;

    for (let i = 1; i < n; i++) {
        previousPreviousNum = previousNum;
        previousNum = currNum;
        currNum = previousPreviousNum + previousNum;
    }

    return currNum;
} 

//console.log(fibonacciIterative(7));

function factorialIterative(n) {
    let res = 1;
    for (let i = n; i > 0; i--) {
        res *= i;
    }
    return res;
}

//console.log(factorialIterative(3));