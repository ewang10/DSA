const LinkedList = require('../LinkedList/LinkedList');

function qSort(array, start = 0, end = array.length) {
    if (start >= end) {
        return array;
    }

    const mid = partition(array, start, end);
    array = qSort(array, start, mid);
    array = qSort(array, mid + 1, end);
    return array;
}

function partition(array, start, end) {
    const pivot = array[end - 1];
    let j = start;
    for (let i = start; i < end - 1; i++) {
        if (array[i] <= pivot) {
            swap(array, i, j);
            j++;
        }
    }
    swap(array, end - 1, j);
    return j;
}

function swap(array, i, j) {
    const temp = array[j];
    array[j] = array[i];
    array[i] = temp;
}

function mSort(array) {
    if (array.length <= 1) {
        return array;
    }
    const mid = Math.floor(array.length/2);
    let left = array.slice(0, mid);
    let right = array.slice(mid, array.length);
    left = mSort(left);
    right = mSort(right);
    return merge(array, left, right);
}

function merge(array, left, right) {
    let leftIndex = 0;
    let rightIndex = 0;
    let outputIndex = 0;
    while (leftIndex < left.length && rightIndex < right.length) {
        if (left[leftIndex] < right[rightIndex]) {
            array[outputIndex++] = left[leftIndex++];
        } else {
            array[outputIndex++] = right[rightIndex++];
        }
    }
    for (let i = leftIndex; i < left.length; i++) {
        array[outputIndex++] = left[i];
    }

    for (let i = rightIndex; i < right.length; i++) {
        array[outputIndex++] = right[i];
    }
    return array;
}

function sortList(node) {
    if (node === null || node.next === null) {
        return node;
    }

    let left;
    let right;
    let prev = null;
    let fast = node;
    let slow = node;

    while (fast !== null && fast.next !== null) {
        fast = fast.next.next;
        prev = slow;
        slow = slow.next;
    }

    prev.next = null;
    left = node;
    right = slow;
    left = sortList(left);
    right = sortList(right);
    return mergeList(left, right);
}

function mergeList(left, right) {
    let ls = new LinkedList();
    let current = ls;
    while (left !== null && right !== null) {

        if (left.value < right.value) {
            current.next = left;
            left = left.next;
        } else {
            current.next = right;
            right = right.next;
        }
        current = current.next;
    }
    current.next = (left === null) ? right : left;

    return ls.next;
}

function display(node) {
    let res = '';
    while (node !== null) {
        res += node.value + ' ';
        node = node.next;
    }
    console.log(res);
}

function shuffle(arr) {
    for (let i = 0; i < arr.length; i++) {
        const rnd = Math.floor(Math.random() * arr.length);
        swap(arr, i, rnd);
    }
    console.log(arr);
}

function main() {
    let data = [89, 30, 25, 32, 72, 70, 51, 42, 25, 24, 53, 55, 78, 50, 13,
        40, 48, 32, 26, 2, 14, 33, 45, 72, 56, 44, 21, 88, 27, 68, 15, 62,
        93, 98, 73, 28, 16, 46, 87, 28, 65, 38, 67, 16, 85, 63, 23, 69, 64,
        91, 9, 70, 81, 27, 97, 82, 6, 88, 3, 7, 46, 13, 11, 64, 76, 31, 26,
        38, 28, 13, 17, 69, 90, 1, 6, 7, 64, 43, 9, 73, 80, 98, 46, 27, 22, 
        87, 49, 83, 6, 39, 42, 51, 54, 84, 34, 53, 78, 40, 14, 5];
    console.log(mSort(data));
    console.log(qSort(data));

    let ls = new LinkedList();
    ls.insertLast(3);
    ls.insertLast(9);
    ls.insertLast(1);
    ls.insertLast(14);
    ls.insertLast(17);
    ls.insertLast(24);
    ls.insertLast(22);
    ls.insertLast(20);
    display(sortList(ls.head))
    shuffle([6,2,6,25,1,1111]);
}

main();