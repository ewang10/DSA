function countingSheeps(n) {
    if (n === 0) {
        return console.log("All sheep jumped over the fence");
    } 
    console.log(n + ": Another sheep jumps over the fence");
    countingSheeps(n - 1);
}

//countingSheeps(3);

function powerCalculator(base, exp) {
    if (exp < 0) {
        return console.log("exponent should be >= 0");
    }
    if (exp === 0) {
        return 1;
    }
    const result =  base * powerCalculator(base, exp - 1);
    console.log(result);
    return result;

}

//powerCalculator(10, 2);

function reverseString(str) {
    if (str.length === 0) {
        return "";
    }
    const res = reverseString(str.slice(1)) + str[0];
    console.log(res);
    return res;
}

//reverseString("string");

function nthTriangleNum(n) {
    if (n === 1) {
        return 1;
    }
    const res = n + nthTriangleNum(n-1);
    console.log(res);
    return res;
}

//nthTriangleNum(9);

function stringSpliter(str, arr) {
    const index = str.indexOf("/");
    arr = arr || [];
    if (index === -1) {
        return arr.push(str);
    }
    arr.push(str.slice(0, index));
    return stringSpliter(str.slice(index+1), arr);
}

//stringSpliter("20/20/2020");

function fibonacci(n) {
    if (n <= 1) {
        return n;
    }
    return fibonacci(n-1) + fibonacci(n-2);
}

//console.log(fibonacci(9));

function factorial(n) {
    if (n === 1) {
        return 1;
    }
    return n * factorial(n-1);
}

//console.log(factorial(5));

function mazeSolver(maze, col, row) {
    if (maze[col][row] === 'e') {
        return '';
    }
    if (maze[col][row] === '*') {
        if (col > 0) {
            return mazeSolver(maze, col-1, row);
        }
        if (row > 0) {
            return mazeSolver(maze, col, row-1);
        }

    }
    if (maze[col][row] === ' ') {
        maze[col][row] = '1';
        if (col < maze.length - 1) {
            return 'D' + mazeSolver(maze, col+1, row);
        }
        if (row < maze[col].length - 1) {
            return 'R' + mazeSolver(maze, col, row+1);
        }
        
        
    }
}

let mySmallMaze = [
    [' ', ' ', ' '],
    [' ', '*', ' '],
    [' ', ' ', 'e']
];
let maze = [
    [' ', ' ', ' ', '*', ' ', ' ', ' '],
    ['*', '*', ' ', '*', ' ', '*', ' '],
    [' ', ' ', ' ', ' ', ' ', ' ', ' '],
    [' ', '*', '*', '*', '*', '*', ' '],
    [' ', ' ', ' ', ' ', ' ', ' ', 'e']
];
//console.log(mazeSolver(maze, 0, 0));

function anagrams(str) {
    let res = [];
    if (str.length === 1) {
        res.push(str);
        return res;
    }
    for(let i = 0; i < str.length; i++) {
        const firstChar = str[i];
        const leftOverChar = str.substring(0, i) + str.substring(i+1);
        const inner = anagrams(leftOverChar);
        for (let j = 0; j < inner.length; j++) {
            res.push(firstChar + inner[j]);
        }
    }
    return res;
    
}

//console.log(anagrams("east"));

function findBinary(n) {
    if (n === 0) {
        return 0;
    } else {
        return (n % 2 + 10 * findBinary(Math.floor(n/2)));
    }
}

console.log(findBinary(17));