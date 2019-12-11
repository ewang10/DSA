class _Node {
    constructor(data, next) {
        this.value = data;
        this.next = next;
        this.prev = null;
    }
}

class Queue {
    constructor() {
        this.first = null;
        this.last = null;
    }
    enqueue(value) {
        const node = new _Node(value, null);
        if (this.first === null) {
            this.first = node;
        }
        
        if (this.last) {
            node.prev = this.last;
            this.last.next = node;
        }
        this.last = node;
    }
    dequeue() {
        if (this.first === null) {
            return;
        }
        const node = this.first;
        this.first = node.next;
        if (this.last === node) {
            this.last = null;
        }
        return node;
    }
}

function peek(queue) {
    return queue.first;
}

function isEmpty(queue) {
    return (queue.first === null && queue.last === null);
}

function display(queue) {
    let curr = queue.first;
    let str = '';

    while(curr !== null) {
        str+=curr.value + ' ';
        curr = curr.next;
    }
    console.log(str);
}

function dancePair(dancers) {
    let mSpares = new Queue();
    let fSpares = new Queue();
    let mCounter = 0;
    let fCounter = 0;

    for (let i = 0; i < dancers.length; i++) {
        if (dancers[i].charAt(0) === "M") {
            mSpares.enqueue(dancers[i]);
            mCounter++;
        } else {
            fSpares.enqueue(dancers[i]);
            fCounter++;
        }
    }
    while (mCounter > 0 && fCounter > 0) {
        console.log(`Female dance is ${fSpares.dequeue().value}, and the male dancer is ${mSpares.dequeue().value}`);
        mCounter--;
        fCounter--;
    }
    if (mCounter > 0) {
        console.log(`There are ${mCounter} male dancers waiting to dance`);
    } else {
        console.log(`There are ${fCounter} female dancers waiting to dance`);
    }
}

function main() {
    let starTrekQ = new Queue();
    starTrekQ.enqueue("Kirk");
    starTrekQ.enqueue("Spock");
    starTrekQ.enqueue("Uhura");
    starTrekQ.enqueue("Sulu");
    starTrekQ.enqueue("Chekov");
    console.log(peek(starTrekQ).value);
    console.log(isEmpty(starTrekQ));
    starTrekQ.dequeue();
    starTrekQ.dequeue();
    display(starTrekQ);
    let dancers = ['F Jane', 'M Frank', 'M John', 'M Sherlock', 'F Madonna', 'M David', 'M Christopher', 'F Beyonce'];
    dancePair(dancers);
}

main();