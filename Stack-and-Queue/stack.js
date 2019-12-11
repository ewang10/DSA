const Node = require('../LinkedList/Node');

class Stack {
    constructor() {
        this.top = null;
    }

    push(data) {
        if (this.top === null) {
            this.top = new Node(data, null);
        } else {
            const newNode = new Node(data, this.top);
            this.top = newNode;
        }

    }

    pop() {
        if (this.top === null) {
            return;
        }
        const node = this.top;
        this.top = node.next;
        return node;
    }
}

function peek(stack) {
    return stack.top;
}

function isEmpty(stack) {
    if (stack.top === null) {
        return true;
    }
    return false;
}

function display(stack) {
    let currentNode = stack.top;
    let str = "";
    while (currentNode !== null) {
        str += currentNode.value + " ";
        //console.log(currentNode.value)
        currentNode = currentNode.next;
    }
    console.log(str);
}

function is_palindrome(s) {
    s = s.toLowerCase().replace(/[^a-zA-Z0-9]/g, "");
    let stack = new Stack();
    for (let i = 0; i < s.length; i++) {
        stack.push(s.charAt(i));
    }
    for (let i = 0; i < s.length; i++) {
        if (stack.pop().value !== s.charAt(i)) {
            return false;
        }
    }
    return true;
}

function matchParenthesis(char1, char2) {
    if (char1 === "(" && char2 === ")") {
        return true;
    } else if (char1 === "[" && char2 === "]") {
        return true;
    } else if (char1 === "{" && char2 === "}") {
        return true;
    } else if (char1 === "'" && char2 === "'") {
        return true;
    } else if (char1 === '"' && char2 === '"') {
        return true;
    } else {
        return false;
    }
}

function is_matchParenthesis(exp) {
    let stack = new Stack();
    for (let i = 0; i < exp.length; i++) {
        if (exp[i] === "{" || exp[i] === "[" || exp[i] === "(" || exp[i] === "'" || exp[i] === '"') {
            stack.push(exp[i]);
        }
        if (exp[i] === "}" || exp[i] === "]" || exp[i] === ")" || exp[i] === "'" || exp[i] === '"') {
            if (isEmpty(stack)) {
                return false;
            } else if (!matchParenthesis(stack.pop().value, exp[i])) {
                return false;
            }
        }
    }
    if (isEmpty(stack)) {
        return true;
    } else {
        return false;
    }
}

function sort(stack) {
    let tempStack = new Stack();
    while (!isEmpty(stack)) {
        const temp = stack.pop();

        while (!isEmpty(tempStack) && peek(tempStack).value < temp.value) {
            stack.push(tempStack.pop().value);
        }
        tempStack.push(temp.value);
    }
    return tempStack;
}

function size(stack) {
    let counter = 0;
    let curr = stack.top;
    while (curr !== null) {
        counter++;
        curr = curr.next;
    }
    return counter;
}

function enqueue(sq1, data) {
    sq1.push(data);
}

function dequeue(sq1, sq2) {
    const sq1Len = size(sq1);
    const sq2Len = size(sq2);

    if (sq2Len === 0) {
        if (sq1Len === 0) {
            console.log('Queue is empty; cannot dequeue');
            return;
        }
        let counter = 0;
        while (counter < sq1Len) {
            sq2.push(sq1.pop());
            counter++;
        }
    }
    return sq2.pop();
}

let stackQueue1 = new Stack();
let stackQueue2 = new Stack();

function main() {
    const starTrek = new Stack();
    starTrek.push("Kirk");
    starTrek.push("Spock");
    starTrek.push("McCoy");
    starTrek.push("Scotty");
    //display(starTrek);
    console.log(is_palindrome("dad"));
    console.log(is_palindrome("A man, a plan, a canal: Panama"));
    console.log(is_palindrome("1001"));
    console.log(is_palindrome("Tauhida"));

    let exp = ['{', '(', '"', '"', ')', '}', '[', ']', "'", '"'];
    console.log(is_matchParenthesis(exp));
    display(sort(starTrek));


    enqueue(stackQueue1, "Kirk");
    enqueue(stackQueue1, "Spock");
    enqueue(stackQueue1, "McCoy");
    enqueue(stackQueue1, "Scotty");
    console.log(dequeue(stackQueue1, stackQueue2).value);

}

main();