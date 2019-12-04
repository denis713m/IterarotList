'use strict'

class ListItem {
    constructor(value, next = null, prev = null)
    {
        this.value = value;
        this.next = next;
        this.prev = prev;
    }
}
//double-linked
class List {
    constructor(){
        this.head = null;
        this.tail = null;
        this.size = 0;
    }

    addFront(value){
        const newHead = new ListItem(value, this.head, null);
        if(this.head){
            this.head.prev = newHead;
        }
        this.head = newHead;
        if(! this.tail){
            this.tail = newHead;
        }
        this.size++;
    }




    addEnd(value){
        const newItem = new ListItem(value, null, this.tail);
        if(this.tail){
            this.tail.next = newItem;
        }
        this.tail = newItem;
        if(! this.head){
            this.head = newItem;
        }
        this.size++;
    }

    [Symbol.iterator](){
        let current = this.head;

        return {
            next(){
                if (current) {
                    const value = current.value;
                    current = current.next;
                    return{
                        value: value,
                        done: false,
                    }
                } else{
                    return {
                        done: true,
                    };
                }
            }
        }
    }

    addAfter(node, value){
        if(node instanceof ListItem){
            if(this.tail === node){
                this.addEnd(value);
                return;
            }

            const newItem = new ListItem(value, node.next, node);

            node.next = newItem;
            newItem.next.prev = newItem;
            this.size++;
        }
    }

    insertTo(index, value){
        if (this.size === 0 || index === ( this.size - 1 ) )
        {
            this.addEnd(value);
            return;
        }
        if (index === 0) {
            this.addFront(value);
            return;
        }
    }

};

const list = new List();

list.addEnd("Mia");
list.addEnd(54);
list.addEnd(null);
list.addEnd({name:{firstName: "Test", lastName: "test2"}});
list.addEnd(function () {
    console.log("I'm function")
});

list.addFront("PrevMia");

for(let v of list){
    console.log(v);
}

//подготовка для обхода своим итерратором
const range = {
    from: 1,
    to: 37,
    [Symbol.iterator](){
        let current = this.from
        let last = this.to;
        return new Object({
            next(){
                if (current <= last) {
                    return new Object({
                        value: current++,
                        done: false//проверяется непосредственно циклом for...of
                    });
                } else{
                    return new Object({
                        done: true,
                    });
                }
            }
        });
    }
};
