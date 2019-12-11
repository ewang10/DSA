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

function main() {
    const starTrek = new Stack();
    starTrek.push("Kirk");
    starTrek.push("Spock");
    starTrek.push("McCoy");
    starTrek.push("Scotty");
    display(starTrek);
}

main();