const Node = require('./Node');

class LinkedList {
    constructor() {
        this.head = null;
    }

    insertFirst(value) {
        this.head = new Node(value, this.head);
    }

    insertLast(value) {
        if (this.head === null) {
            this.insertFirst(value);
        } else {
            let currNode = this.head;

            while (currNode.next !== null) {
                currNode = currNode.next;
            }

            currNode.next = new Node(value, null);
        }
    }

    insertBefore(value, item) {
        if (this.head === null) {
            this.insertFirst(value);
        } else {
            let currNode = this.head;
            let previousNode = this.head;

            while (currNode !== null && currNode.value !== item) {
                previousNode = currNode;
                currNode = currNode.next;
            }
            if (currNode === null) {
                console.log('Item not found');
                return;
            }
            let newNode = new Node(value, null);
            previousNode.next = newNode;
            newNode.next = currNode;
        }
    }

    insertAfter(value, item) {
        if (this.head === null) {
            this.insertFirst(item);
        } else if (this.head.next === null) {
            this.insertLast(item);
        } else {
            let currNode = this.head;
            let nextNode = this.head.next;

            while (currNode.value !== item && nextNode !== null) {
                currNode = currNode.next;
                nextNode = currNode.next;
            }

            if (nextNode === null && currNode.value !== item) {
                console.log('Item not found');
                return;
            }

            let newNode = new Node(value, null);
            currNode.next = newNode;
            newNode.next = nextNode;
        }
    }

    insertAt(position, value) {
        if (this.head === null) {
            console.log('List is empty');
            return;
        }
        let counter = 1;
        let currNode = this.head;
        let previousNode = this.head;

        while (counter !== position && currNode !== null) {
            previousNode = currNode;
            currNode = currNode.next;
            counter++;
        }
        if (currNode === null && counter !== position) {
            console.log('Position not found');
            return;
        }
        let newNode = new Node(value, null);
        previousNode.next = newNode;
        newNode.next = currNode;
    }

    find(item) {
        if (this.head === null) {
            return null;
        }

        let currNode = this.head;

        while (currNode.value !== item) {
            if (currNode.next === null) {
                return null;
            }
            currNode = currNode.next;
        }
        return currNode;
    }

    remove(item) {
        if (this.head === null) {
            return null;
        }

        if (this.head.value === item) {
            this.head = this.head.next;
            return;
        }

        let currNode = this.head;
        let previousNode = this.head;

        while (currNode !== null && currNode.value !== item) {
            previousNode = currNode;
            currNode = currNode.next;
        }

        if (currNode === null) {
            console.log('Item not found');
            return;
        }
        previousNode.next = currNode.next;
    }

}

function display(ls) {
    let currNode = ls.head;
    let res = "";
    while (currNode !== null) {
        //console.log('res ', res);
        res += currNode.value + " ";
        currNode = currNode.next;
    }
    console.log(res);
}

function size(ls) {
    let currNode = ls.head;
    let count = 0;
    while (currNode !== null) {
        count++;
        currNode = currNode.next;
    }
    return count;
}

function isEmpty(ls) {
    if (ls.head === null) return true;
    return false;
}

function findPrevious(item, ls) {
    let currNode = ls.head;
    let previousNode = ls.head
    while (currNode != null && currNode.value !== item) {
        previousNode = currNode;
        currNode = currNode.next;
    }
    if (currNode === null) {
        console.log('Item not found');
        return;
    }
    return previousNode.value;
}

function findLast(ls) {
    let currNode = ls.head;
    while (currNode.next !== null) {
        currNode = currNode.next;
    }
    return currNode.value;
}

function reverseIterative(ls) {
    if (!ls.head || !ls.head.next) return ls;
    let currNode = ls.head;
    let stack = []

    while(currNode !== null) {
        stack.push(currNode);
        currNode = currNode.next;
    }

    let reverseLs = new LinkedList();
    reverseLs.head = stack.pop();
    currNode = reverseLs.head;

    let node = stack.pop();

    while(node) {
        node.next = null;
        currNode.next = node;
        currNode = currNode.next;
        node = stack.pop();
    }
    return reverseLs;
}

function reverseRecursive(head) {
    if(head === null || head.next === null) {
       return head; 
    }
    let newHead = reverseRecursive(head.next);
    head.next.next = head;
    head.next = null;
    return newHead;
}

function thirdFromEnd(ls) {
    let currNode = ls.head;
    let stock = [];

    while (currNode !== null) {
        stock.push(currNode);
        currNode = currNode.next;
    }
    //console.log(stock)
    return stock[stock.length - 3];
}

function middleOfList(ls) {
    let currNode = ls.head;
    let stock = [];

    while (currNode !== null) {
        stock.push(currNode);
        currNode = currNode.next;
    }
    return stock[Math.floor(stock.length / 2)];
}

function cycleList(ls) {
    let tortoise = ls.head;
    let hare = ls.head;

    while(hare && hare.next) {
        tortoise = tortoise.next;
        hare = hare.next.next;
        if (tortoise === hare) return true;
    }
    return false;
}

function mergeSort(ls) {
    if (ls.next === null) {
        return ls;
    }

    let count = size(ls);
    let leftPart = ls;
    let leftPtr = ls;
    let rightPart = null;
    let righPtr = null;

    let mid = Math.floor(count/2);
    let count2 = 0;
    //console.log('mid ', mid)
    while (count2 < mid) {
        //console.log('count ', count2)
        count2++;
        //console.log(leftPtr)
        leftPtr = leftPtr.next;
    }
    rightPart = new LinkedList(leftPtr);
    leftPtr.next = null;
    return mergeSortHelper(mergeSort(leftPart), mergeSort(rightPart));
}

function mergeSortHelper(left, right) {
    let result = new LinkedList();
    let resultPtr = result.head;
    let leftPtr = left;
    let rightPtr = right;

    while(leftPtr && rightPtr) {
        let tempNode = null;
        if(leftPtr.value > rightPtr.value) {
            tempNode = rightPtr.value;
            rightPtr = rightPtr.next;
        } else {
            tempNode = leftPtr.value;
            leftPtr = leftPtr.next;
        }
        if (result.head === null) {
            result.head = new Node(tempNode, null);
            resultPtr = result.head;
        } else {
            resultPtr.next = new Node(tempNode, null);
            resultPtr = resultPtr.next;
        }
    }

    resultPtr.next = leftPtr;
    while (resultPtr.next) {
        resultPtr = resultPtr.next;
        resultPtr.next = rightPtr;
    }
    return result;
}

function main() {
    const SSL = new LinkedList();
    SSL.insertFirst("Apollo");
    SSL.insertLast("Boomer");
    SSL.insertLast("Helo");
    SSL.insertLast("Husker");
    SSL.insertLast("Starbuck");
    SSL.insertLast("Tauhida");
    SSL.remove("Husker");
    SSL.insertBefore("Athena", "Boomer");
    SSL.insertAfter("Hotdog", "Helo");
    SSL.insertAt(3, "Kat");
    SSL.remove("Tauhida");
    display(SSL);
    display(mergeSort(SSL));
    //console.log(display(reverseIterative(SSL)));
    //console.log(display(reverseRecursive(SSL.head)));
    
}

main();