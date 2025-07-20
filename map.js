class Node{
    constructor(){
        this.value = null;
        this.next = null;
    }
}

export class Hashmap{

    constructor(){
        this.loadfactor = 0.75; // threshold
        this.size = 0;
        this.load = 0; // load = size/capacity
        this.capacity = 16;
        this.buckets = new Array(this.capacity).fill(null);
    }

    hash(key){
        let hashcode = 0;

        const primenumber = 31;
        for ( let i = 0 ; i < key.length ; i++){
            hashcode = primenumber * hashcode + key.charCodeAt(i);
            hashcode = hashcode % this.capacity;
        }
        return hashcode;
    }

    reHash(){
        this.size = 0;
        let oldHash = this.buckets;
        this.buckets = new Array(this.capacity).fill(null);

        for ( let i = 0 ; i < oldHash.length ;i++){
            if ( oldHash[i] !== null){
                let temp = oldHash[i];
                while(temp !== null){
                    let hashcode = this.hash(temp.value[0]);
                    this.set(temp.value[0],temp.value[1]);
                    temp = temp.next;
                }
            }
        }
    }

    set(key,num){

        let hashcode = this.hash(key);

        if ( this.buckets[hashcode] === null){ // the bucket is empty
            let node = new Node();
            node.value = [key,num];
            node.next = null;
            let head = node;
            this.buckets[hashcode] = head;

            this.size += 1;
            this.load = this.size / this.capacity;
            if ( this.load >= this.loadfactor ){
                this.capacity = this.capacity * 2
                this.load = this.size / this.capacity;
                this.reHash();
            }            
            return;

        }

        else {
            let temp = this.buckets[hashcode];
            if(temp !== null){
                while ( temp.next !== null){
                    if ( temp.value[0] === key){
                        temp.value[1] = num;
                        return;
                    }
                    temp = temp.next;
                }
            }

            // handling last node:
            if ( temp.value[0] === key ){
                temp.value[1] = num;
                return;
            }

            let node = new Node();
            node.value = [key,num];
            node.next = null;
            temp.next = node;
            this.size += 1;
            this.load = this.size / this.capacity;
            if ( this.load >= this.loadfactor ){
                this.capacity = this.capacity * 2
                this.load = this.size / this.capacity;
                this.reHash();
            } 
            return;
        }
    }

    get(key){
        let hashcode = this.hash(key);

        if ( this.buckets[hashcode] !== null){
            let temp = this.buckets[hashcode];
            while ( temp !== null){
                if ( temp.value[0] === key){
                    return temp.value[1];
                }
                temp = temp.next;
            }
        }
        return null;
    }

    has(key){
        let hashcode = this.hash(key);

        if ( this.buckets[hashcode] !== null){
            let temp = this.buckets[hashcode];
            while ( temp !== null){
                if (temp.value[0] === key){
                    return true;
                }
                temp = temp.next;
            }
        }
        return false;
    }

    remove(key){
        for ( let i = 0 ; i < this.buckets.length ; i++){
            let temp = this.buckets[i];
            if ( temp !== null){
                // one node:
                if ( temp.next === null){
                    if ( temp.value[0] === key){
                        this.buckets[i] = null;
                        return true;
                    }
                }

                // two / + nodes :
                else {

                    if ( temp.value[0] === key ){
                        this.buckets[i] = temp.next;
                        return true;
                    }

                    let prev = temp; // 1st node
                    let curr = prev.next; // 2nd node

                    while ( curr !== null ){
                        if ( curr.value[0] === key){
                            prev.next = curr.next;
                            return true;
                        }
                        prev = prev.next;
                        curr = curr.next;
                    }

                }

            }
        }
        return false;
    }

    length(){
        let keylength = 0;

        for ( let i = 0 ; i < this.buckets.length ; i++){
            if ( this.buckets[i] !== null){
                let temp = this.buckets[i];
                while (temp !== null){
                    keylength += 1
                    temp = temp.next;
                }
            }
        }

        return keylength;
    }

    clear(){
        this.size = 0;
        this.load = 0;
        this.capacity = 16; //base
        this.buckets = new Array(this.capacity).fill(null);
    }

    keys(){
        let keysArray = [];

        for ( let i = 0 ; i < this.buckets.length ; i++){

            if ( this.buckets[i] !== null){
                let temp = this.buckets[i];
                while ( temp !== null){
                    keysArray.push(temp.value[0]);
                    temp = temp.next;
                }
            }
        }
        return keysArray;
    }

    values(){
        let valuesArray = [];
        for ( let i = 0 ; i < this.buckets.length ; i++){
            if ( this.buckets[i] !== null){
                let temp = this.buckets[i];
                while ( temp !== null){
                    valuesArray.push(temp.value[1]);
                    temp = temp.next;
                }
            }
        }
        return valuesArray;
    }

    entries(){
        let entriesArray = [];

        for ( let i = 0 ; i < this.buckets.length ; i++){

            if ( this.buckets[i] !== null){
                let temp = this.buckets[i];
                while ( temp !== null){
                    entriesArray.push(temp.value);
                    temp = temp.next;
                }
            }
        }
        return entriesArray;
    }

}