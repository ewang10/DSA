const HashMap = require('./Hashmap');

function findDuplicate(str) {
    const arr = str.split('');
    let result = [];
    const hash = new HashMap();
    for (let i = 0; i < arr.length; i++) {
        let flag;
        let value;
        try {
            value = hash.get(arr[i]);
        } catch (error) {
            flag = true;
        }
        if (flag) {
            hash.set(arr[i], true);
        } else {

            if (value) {
                hash.set(arr[i], !value);
            }
        }
    }

    const items = Object.values(hash._hashTable);
    items.forEach(item => {
        result.push(item.key);
    })
    return result.join('');
    /*
    items.forEach(item => {
        if (!item.value) {
            result.push(item.key);
        }
    })

    return result;
    */
}

function permutationPalindrome(string) {
    const arr = string.split('');
    const hash = new HashMap();
    let sum = 0;

    for (let i = 0; i < arr.length; i++) {
        let flag;
        let value;
        try {
            value = hash.get(arr[i]);
        } catch (error) {
            flag = true;
        }
        if (flag) {
            hash.set(arr[i], 1);
        } else {
            value++;
            hash.set(arr[i], value);
        }
    }

    const items = Object.values(hash._hashTable);
    items.forEach(item => {
        sum += (item.value % 2);
        if (sum > 2) return false;
    })
    return (sum === 1);
}

function groupAnagram(strings) {
    if (strings.length === 0) return;
    const hash = new HashMap();
    let result = [];
    strings.forEach(str => {
        const chars = str.split("").sort();
        const key = chars.join('');
        let flag;
        let value;
        try {
            value = hash.get(key);
        } catch (error) {
            flag = true;
        }
        if (flag) {
            hash.set(key, []);
            value = hash.get(key);
        }
        value.push(str)
        hash.set(key, value);
    })

    const items = Object.values(hash._hashTable);
    items.forEach(item => {
        result.push(item.value);
    })
    return result;
}

class HashMapChaining {
    constructor(initialCapacity = 8) {
        this.length = 0;
        this._capacity = initialCapacity;
        this._hashTable = [];
        this._deleted = 0;
    }

    get(key) {
        const index = this._findSlot(key);
        const items = this._hashTable[index];
        if (items === undefined) {
            throw new Error('Key error');
        }
        items.forEach(item => {
            if (item.key === key) {
                return item;
            }
        });
        throw new Error('Key error');
    }

    set(key, value) {
        const loadRatio = (this.length + this._deleted + 1) / this._capacity;
        if (loadRatio > HashMapChaining.MAX_LOAD_RATIO) {
            this._resize(this._capacity * HashMapChaining.SIZE_RATIO);
        }

        const index = this._findSlot(key);
        if (!this._hashTable[index]) {
            this.length++;
            this._hashTable[index] = [];
        }

        let items;
        items = this._hashTable[index];

        let flag;
        if (items) {
            items.forEach(item => {
                if (item.key === key && !item.DELETED) {
                    flag = true;
                    item.value = value;
                }
            });
        }
        if (!flag) {
            this._hashTable[index].push({ key, value, DELETED: false });
        }

    }

    delete(key) {
        const index = this._findSlot(key);
        const items = this._hashTable[index];
        if (items === undefined) {
            throw new Error('Key error');
        }
        items.forEach(item => {
            if (item.key === key) {
                item.DELETED = true;
                this.length--;
                this._deleted++;
            }
        });
    }

    _findSlot(key) {
        const hash = HashMapChaining._hashString(key);
        const index = hash % this._capacity;
        return index;
    }

    _resize(size) {
        let oldSlots = this._hashTable;
        this._capacity = size;
        this.length = 0;
        this._deleted = 0;
        this._hashTable = [];
        for (const slot of oldSlots) {
            if (slot !== undefined) {
                for (const item of slot) {
                    if (!item.DELETED) {
                        this.set(item.key, item.value);
                    }
                }
            }
        }
    }

    static _hashString(string) {
        let hash = 5381;
        for (let i = 0; i < string.length; i++) {
            hash = (hash << 5) + hash + string.charCodeAt(i);
            hash = hash & hash;
        }
        return hash >>> 0;
    }
}

HashMapChaining.MAX_LOAD_RATIO = 0.5;
HashMapChaining.SIZE_RATIO = 3;

function main() {
    const lor = new HashMap();

    lor.set("Hobbit", "Bilbo");
    console.log(lor);
    lor.set("Hobbit", "Frodo");
    console.log(lor);
    lor.set("Wizard", "Gandolf");
    lor.set("Human", "Aragon");
    lor.set("Elf", "Legolas");
    lor.set("Maiar", "The Necromancer");
    lor.set("RingBearer", "Gollum");
    lor.set("LadyOfLight", "Galadriel");
    lor.set("HalfElven", "Arwen");
    lor.set("Ent", "Treebeard");
    console.log(lor);
    console.log(lor.get("Maiar"));
    console.log(lor.get("Hobbit"));
    console.log(findDuplicate("google"));
    console.log(permutationPalindrome("acecarr"));
    console.log(permutationPalindrome("north"));
    console.log(groupAnagram(['east', 'cars', 'acre', 'arcs', 'teas', 'eats', 'race']));

    const Lor = new HashMapChaining();
    Lor.set("Hobbit", "Bilbo");
    console.log(Lor);
    Lor.set("Hobbit", "Frodo");
    console.log(Lor);
    Lor.set("Wizard", "Gandolf");
    Lor.set("Human", "Aragon");
    Lor.set("Elf", "Legolas");
    Lor.set("Maiar", "The Necromancer");
    Lor.set("RingBearer", "Gollum");
    Lor.set("LadyOfLight", "Galadriel");
    Lor.set("HalfElven", "Arwen");
    Lor.set("Ent", "Treebeard");
    console.log(Lor);
}

main();