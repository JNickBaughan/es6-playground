const addIteratorToObject = (o) => {
    const returnValue = value => {
        return {
            done: false,
            value
        }
    }

    o[Symbol.iterator] = () => {
        
        let keys = Object.keys(o);
        let keysIndex = 0;
        let iterators = {};
        for(var key in o){
            if(typeof o[key] === "object"){
                addIteratorToObject(o[key]);
                iterators[key] = o[key][Symbol.iterator]()
            }
        }
        return {
            next() {
                
                if(keysIndex > keys.length - 1){
                    return { done: true };
                }
                
                if(typeof o[keys[keysIndex]] === "object"){
                    
                    const sub = iterators[keys[keysIndex]].next();
                    
                    if(sub.done){
                        keysIndex++;
                        return returnValue(o[keys[keysIndex - 1]]) 
                    } 
                    return {
                        done: false,
                        value: sub.value
                    }
                    
                }
                keysIndex++;
                return returnValue(o[keys[keysIndex - 1]])
            }
        }
    }
}

const foo = {
    bar: "bar",
    thisIsObject: {
        goo: "goo",
        doo: "doo"
    },
    goo: "goo",
    doo: "doo"
}

addIteratorToObject(foo);

const fi = foo[Symbol.iterator]()


console.log(fi.next())
console.log(fi.next())
console.log(fi.next())
console.log(fi.next())
console.log(fi.next())
console.log(fi.next())
console.log(fi.next())
console.log(fi.next())



const traverse = (o) => {
    if (Array.isArray(o)) {
      for (const element of o) {
        traverse(element);
      }
    } else if (typeof o === "object") {
      for (var i in o) {
        traverse(o[i]);
      }
    } else {
      console.dir(o);
    }
};