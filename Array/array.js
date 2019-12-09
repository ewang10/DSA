const Memory = require('./memory');
const memory = new Memory();

class Array {
    constructor() {
        this.length = 0;
        this._capacity = 0;
        this.ptr = memory.allocate(this.length);
    }

    //expands the size of the array
    _resize(size) {
        const oldPtr = this.ptr;
        this.ptr = memory.allocate(size);
        if (this.ptr === null) {
            throw new Error('Out of memory');
        }
        memory.copy(this.ptr, oldPtr, this.length);
        memory.free(oldPtr);
        this._capacity = size;
    }

    push(value) {
        if (this.length >= this._capacity) {
            this._resize((this.length + 1) * Array.SIZE_RATIO);
        }
        //console.log('value ', value);
        memory.set(this.ptr + this.length, value);
        //console.log('get value ', memory.get(this.ptr + this.length));
        this.length++;
    }

    get(index) {
        if (index < 0 || index >= this.length) {
            throw new Error('Index error');
        }
        return memory.get(this.ptr + index);
    }

    pop() {
        if (this.length === 0) {
            throw new Error('Index error');
        }
        const value = memory.get(this.ptr + this.length - 1);
        this.length--;
        return value;
    }

    insert(index, value) {
        if (index < 0 || index >= this.length) {
            throw new Error('Index error');
        }
        if (this.length >= this._capacity) {
            this._resize((this.length + 1) * Array.SIZE_RATIO);
        }
        memory.copy(this.ptr + index + 1, this.ptr + index, this.length - index);
        memory.set(this.ptr + index, value);
        this.length++;
    }

    remove(index) {
        if (index < 0 || index >= this.length) {
            throw new Error('Index error');
        }
        memory.copy(this.ptr + index, this.ptr + index + 1, this.length - index - 1);
        this.length--;
    }
}

function main() {
    Array.SIZE_RATIO = 3;

    let arr = new Array();

    arr.push(3);
    console.log(arr); //Array { length: 1, _capacity: 3, ptr: 0 }
    arr.push(5);
    arr.push(15);
    arr.push(19);
    arr.push(45);
    arr.push(10);
    console.log(arr); //Array { length: 6, _capacity: 12, ptr: 3 }
    arr.pop();
    arr.pop();
    arr.pop();
    console.log(arr); //Array { length: 3, _capacity: 12, ptr: 3 }
    console.log(arr.get(0)); //3
    arr = new Array();
    arr.push("tauhida");
    console.log(arr);
    console.log(arr.get(0)); //return NaN due to memory being an array of floats
}

//main();

function urlString(str) {
    return str.split(" ").join("%20");
}

//console.log(urlString("www.thinkful.com /tauh ida parv een"));

function filterArray(arr) {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] < 5) {
            arr.splice(i--, 1);
        }
    }
    return arr;
}

//console.log(filterArray([2,4,6,8,10]));

function maxSum(arr) {
    let maxSum = 0;
    let partialSum = 0;
    for (let item of arr) {
        partialSum += item;
        maxSum = Math.max(maxSum, partialSum);
        if (partialSum < 0) partialSum = 0;
    }
    return maxSum;
}

//console.log('maxSum ', maxSum([4, 6, -3, 5, -2, 1]));

function merge(arr1, arr2) {
    const merged = arr1.concat(arr2);
    return merged.sort((a,b) => a - b);
}

//console.log('merge ', merge([1, 3, 6, 8, 11], [2, 3, 5, 8, 9, 10]));

function removeChar(str, chars) {
    let res = "";
    for (let i = 0; i < str.length; i++) {
        const char = str.charAt(i);
        if (!chars.includes(char)) {
            res += char;
        }
    }
    return res;
}

//console.log('removeChar ', removeChar('Battle of the Vowels: Hawaii vs. Grozny', 'aeiou'));

function product(arr) {
    let n = arr.length;
    let left = new Array(n);
    let right = new Array(n);
    let prod = new Array(n);

    left[0] = 1;
    right[n - 1] = 1;
    for (let i = 1; i < n; i++) {
        left[i] = arr[i-1] * left[i-1];
    }
    for (let i = n-2; i >= 0; i--) {
        right[i] = arr[i+1] * right[i+1];
    }
    for (let i = 0; i < n; i++) {
        prod[i] = left[i] * right[i];
    }
    return prod;
}

function twoDArrayZero(arr) {
    let isColZero = false;
    let row = arr.length;
    let col = arr[0].length;

    for (let i = 0; i < row; i++) {
        if(arr[i][0]) {
            isColZero = true;
        }
        for (let j = 1; j < col; j++) {
            if (arr[i][j] === 0) {
                arr[i][0] = 0;
                arr[0][j] = 0;
            }
        }
    }

    for (let i = 0; i < row; i++) {
        for(let j = 0; j < col; j++) {
            if (arr[i][0] === 0 || arr[0][j] === 0) {
                arr[i][j] = 0;
            }
        }
    }

    if (arr[0][0] === 0) {
        for (let i = 0; i < col; i++) {
            arr[0][i] = 0;
        }
    }

    if (isColZero) {
        for (let i = 0; i < row; i++) {
            arr[i][0] = 0;
        }
    }
}

function isRotation(str1, str2) {
    return ((str1.length === str2.length) && 
    ((str1 + str1).includes(str2)));
}

console.log(isRotation("amazon", "azonam"));