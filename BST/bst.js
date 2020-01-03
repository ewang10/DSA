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
                successor.remove(successor.key);
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
}

function bstHeight(bst) {
    if (!bst) {
        return 0;
    }
    let left = 1 + bstHeight(bst.left);
    let right = 1 + bstHeight(bst.right);
    return Math.max(left, right);
}

function isBST(bst) {

    if (bst.left && bst.left.key > bst.key) {
        return false;
    } else if (bst.right && bst.right.key < bst.key) {
        return false;
    } else if (!bst.left || !bst.right) {
        return true;
    }
    let left = isBST(bst.left);
    let right = isBST(bst.right);
    return left && right;
}

function rightNodes(bst, nodes) {
    if (!bst.right) {
        return nodes;
    }
    if (bst.right.left) {
        nodes.push(bst.right.left);
        return rightNodes(bst.right.left, nodes);
    }
    if (bst.right) {
        nodes.push(bst.right);
        return rightNodes(bst.right, nodes);
    }
}

function thirdLargest(bst, count) {
    if (bst === null || count >= 3) {
        return;
    }
    thirdLargest(bst.right, count);
    count++;
    //console.log('count ', count)
    if (count === 3) {
        console.log('3rd largest node is: ' + bst.key);
        return;
    }
    thirdLargest(bst.left, count);
}

function isBalanced(bst) {
    if (bst.left === null && bst.right === null) {
        return true;
    } else if ((!bst.left && bst.right) || (!bst.right && bst.left)) {
        return false;
    }
    return isBalanced(bst.left) && isBalanced(bst.right);
}


function isSameBST(arr1, arr2) {
    if (arr1.length !== arr2.length) {
        return false;
    }
    if (arr1.length === 0) {
        return true;
    }

    if(arr1[0] === arr2[0]) {
        const arr1Left = [];
        const arr1Right = [];

        const arr2Left = [];
        const arr2Right =[];

        for (let i = 1; i < arr1.length; i++) {
            if (arr1[i] < arr1[0]) {
                arr1Left.push(arr1[i]);
            } else {
                arr1Right.push(arr1[i]);
            }

            if (arr2[i] < arr2[0]) {
                arr2Left.push(arr2[i]);
            } else {
                arr2Right.push(arr2[i]);
            }
        }

        return isSameBST(arr1Left, arr2Left) && isSameBST(arr1Right, arr2Right);
    }
    return false;
}

function main() {
    const bst = new BinarySearchTree();
    bst.insert(3, 0);
    bst.insert(1, 0);
    bst.insert(4, 0);
    bst.insert(6, 0);
    bst.insert(9, 0);
    bst.insert(2, 0);
    bst.insert(5, 0);
    bst.insert(7, 0);
    console.log(bst);
    console.log(bstHeight(bst));
    console.log(isBST(bst));
    console.log(isBalanced(bst));
    const bstLetters = new BinarySearchTree();
    bstLetters.insert("E", 0);
    bstLetters.insert("A", 0);
    bstLetters.insert("S", 0);
    bstLetters.insert("Y", 0);
    bstLetters.insert("Q", 0);
    bstLetters.insert("U", 0);
    bstLetters.insert("E", 0);
    bstLetters.insert("S", 0);
    bstLetters.insert("T", 0);
    bstLetters.insert("I", 0);
    bstLetters.insert("O", 0);
    bstLetters.insert("N", 0);
    console.log(bstLetters);
    thirdLargest(bstLetters, 0);
    console.log(isSameBST([3, 5, 4, 6, 1, 0, 2], [3, 1, 5, 2, 4, 6, 0]));
}

main();