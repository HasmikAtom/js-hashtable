//** Hash Table Example**// 

// @TODO: improve the hash function
const hash = (string, max) => {
    let hash = 0;
    for (let i = 0; i < string.length; i++) {
        hash += string.charCodeAt(i)
    }
    return hash % max
};

class HashTable {
    constructor(storageLimit) {
        this.storageLimit = storageLimit || 20;
    };

    storage = [];
    
    print = () => {
        console.log(this.storage)
    }

    //** Add item to Hash Table **// 
    add = (key, value) => {
        let index = hash(key, this.storageLimit);
        // checking if bucket is empty and inserting the value
        if (this.storage[index] === undefined) {
            this.storage[index] = [[key, value]];
        } else {
            let inserted = false;
            // go through each index to see if the value exists
            for (let i = 0; i< this.storage[index].length; i++) {
                if (this.storage[index][i][0] === key) {
                    //set the new value if the key exists
                    this.storage[index][i][0] = value;
                    inserted = true;
                }
            }
            // if the key does not exist, we'll push the new item
            if (inserted === false) {
                this.storage[index].push([key, value])
            }
        }
    }

    //** Remove item from Hash Table **//
    remove = (key) => {
        // lookup the index by passing to the hash function
        let index = hash(key, this.storageLimit);
        // [0] is the key, [1] is the value
        // check if there's oly one item in that bucket and that item === key
        if (this.storage[index].length === 1 && this.storage[index][0][0] === key) {
            delete this.storage[index];
        } else {
            // if there is multiple items in the bucket, the ngo through each one and delete the item that matches the key
            for (let i = 0; i < this.storage[index].length; i++) {
                if (this.storage[index][i][0] === key) {
                    delete this.storage[index][i]
                }
            }
        }
    }

    //** Lookup item in Hash Table **//
    lookup = (key) => {
        let index = hash(key, this.storageLimit)
        if (this.storage[index] === undefined) {
            // item isnt in hashtable, return undefined
            return undefined
        } else {
            // go through each element in the bucket
            for (let i = 0; i < this.storage[index].length; i++) {
                if (this.storage[index][i][0] === key) {
                    // return the value 
                    return this.storage[index][i][1]
                }
            } 
        }
    }

}

console.log(hash('quincy', 10))

let newHashTable = new HashTable(40);
newHashTable.add('key_1', 'value_1');
newHashTable.add('key_2', 'value_2');
newHashTable.add('key_3', 'value_3');
newHashTable.add('key_4', 'value_4');

newHashTable.print();