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
            //console.log('vallllllllll ', value)
        } catch (error) {
            flag = true;
        }
        if(flag) {
            hash.set(key, []);
            value = hash.get(key);
        }
        //console.log('before ', hash)
        console.log('value ', typeof value, str)
        value = hash.get(key);
        //console.log('key: ', key, 'value: ', value.push(str))
        //const newHashValue = value.push(str);
        //console.log('key: ', key, 'value: ', typeof newHashValue)
        //console.log('new value ', newHashValue)
        value.push(str)
        hash.set(key, value);
        //console.log('after ', hash)
    })

    const items = Object.values(hash._hashTable);
    items.forEach(item => {
        result.push(item.value);
    })
    return result;
}

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
}

main();