function linearSearch(arr, value) {
    let counter = 0;
    for (let i = 0; i < arr.length; i++) {
        counter++;
        if (arr[i] === value) {
            return counter;
        }
    }
    console.log('Item not found after ' + counter + ' searches');
    return;
}

function binarySearchUtil(arr, value, start, end, counter) {
    const start = start === undefined ? 0 : start;
    const end = end === undefined ? arr.length : end;

    if (end > start) {
        console.log('Item not found after ' + counter + ' searches');
        return;
    }

    const index = Math.floor((start + end) / 2);
    const item = arr[index];

    if (item === value) {
        counter++;
        return counter;
    } else if (item > value) {
        counter++;
        return binarySearchUtil(arr, value, start, index - 1, counter);
    } else if (item < value) {
        counter++;
        return binarySearchUtil(arr, value, index + 1, end, counter);
    }
}

function binarySearch(arr, value, start, end) {
    return binarySearchUtil(arr, value, start, end, 0);
}


class BinarySearchTree {
    constructor(key = null, value = null, parent = null) {
        this.key = key;
        this.value = value;
        this.parent = parent;
        this.left = null;
        this.right = null;
    }

    insert(key, value) {
        if (this.key === null) {
            this.key = key;
            this.value = value;
        } else if (key < this.key) {
            if (this.left === null) {
                this.left = new BinarySearchTree(key, value, this);
            } else {
                this.left.insert(key, value);
            }
        } else {
            if (this.right === null) {
                this.right = new BinarySearchTree(key, value, this);
            } else {
                this.right.insert(key, value);
            }
        }
    }

    find(key) {
        if (key === this.key) {
            return this.value;
        } else if (key < this.key && this.left) {
            return this.left.find(key);
        } else if (key > this.key && this.right) {
            return this.right.find(key);
        } else {
            throw new Error('Key error');
        }
    }

    remove(key) {
        if (key === this.key) {
            if (this.left && this.right) {
                const successor = this.right._findMin();
                this.key = successor.key;
                this.value = successor.value;
                this.successor.remove(successor.key);
            } else if (this.left) {
                this._replaceWith(this.left);
            } else if (this.right) {
                this._replaceWith(this.right);
            } else {
                this._replaceWith(null);
            }
        } else if (key < this.key && this.left) {
            this.left.remove(key);
        } else if (key > this.key && this.right) {
            this.right.remove(key);
        } else {
            throw new Error('Key error');
        }
    }

    _replaceWith(node) {
        if (this.parent) {
            if (this === this.parent.left) {
                this.parent.left = node;
            } else if (this === this.parent.right) {
                this.parent.right = node;
            }

            if (node) {
                node.parent = this.parent;
            }
        } else {
            if (node) {
                this.key = node.key;
                this.value = node.value;
                this.left = node.left;
                this.right = node.right;
            } else {
                this.key = null;
                this.value = null;
                this.left = null;
                this.right = null;
            }
        }
    }

    _findMin() {
        if (!this.left) {
            return this;
        }
        return this.left._findMin();
    }

    //LRP
    postOrder(values = []) {
        if (this.left) {
            values = this.left.postOrder(values);
        }
        if (this.right) {
            values = this.right.postOrder(values);
        }
        values.push(this.value);
        return values;
    }

    //PLR
    preOrder(values = []) {
        values.push(this.value);
        if (this.left) {
            values = this.left.preOrder(values);
        }
        if (this.right) {
            values = this.right.preOrder(values);
        }
        return values;
    }

    //LPR
    inOrder(values = []) {
        if (this.left) {
            values = this.left.inOrder(values);
        }
        values.push(this.value);
        if (this.right) {
            values = this.right.inOrder(values);
        }
        return values;
    }

    bfs(values = []) {
        const queue = [];
        let node = this;
        queue.push(this);
        while(queue.length) {
            node = queue.shift();
            values.push(node.value);
            if (node.left) {
                queue.push(node.left);
            }
            if (node.right) {
                queue.push(node.right);
            }
        }
        return values;
    }
}



function maxProfit(arr) {
    let min = Number.MAX_VALUE;
    let minIndex;
    let max = Number.MIN_VALUE;
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] < min) {
            min = arr[i];
            minIndex = i;
        }
    } 

    for (let i = 0; i < arr.length; i++) {
        if (arr[i] > max && i > minIndex) {
            max = arr[i];
        }
    }
    console.log('Max profit: $' + (max - min));

}

function main() {
    const bst = new BinarySearchTree();
    bst.insert(25, 25);
    bst.insert(15, 15);
    bst.insert(50, 50);
    bst.insert(10, 10);
    bst.insert(24, 24);
    bst.insert(35, 35);
    bst.insert(70, 70);
    bst.insert(4, 4);
    bst.insert(12, 12);
    bst.insert(18, 18);
    bst.insert(31, 31);
    bst.insert(44, 44);
    bst.insert(66, 66);
    bst.insert(90, 90);
    bst.insert(22, 22);
    console.log(bst.preOrder());
    console.log(bst.inOrder());
    console.log(bst.postOrder());
    const command = new BinarySearchTree();
    command.insert("Captain Picard", "Captain Picard");
    command.insert("Commander Riker", "Commander Riker");
    command.insert("Commander Data", "Commander Data");
    command.insert("Lt. Cmdr. Worf", "Lt. Cmdr. Worf");
    command.insert("Lt. Cmdr. LaForge", "Lt. Cmdr. LaForge");
    command.insert("Lt. Cmdr. Crusher", "Lt. Cmdr. Crusher");
    command.insert("Lieutenant security-officer", "Lieutenant security-officer");
    command.insert("Lieutenant Selar", "Lieutenant Selar");
    console.log(command.bfs());
    maxProfit([128, 97, 121, 123, 98, 97, 105]);
}

main();