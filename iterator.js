const addIteratorToObject = (o) => {
    const returnValue = ({value, done = false}) => {
        return {
            done,
            value
        }
    }

    o[Symbol.iterator] = () => {
        
        let keys = Object.keys(o);
        let keysIndex = 0;
        let iterators = {};
        let handleObject = function(key, o){
            const iteration = iterators[key].next();
            
            if(iteration.done){
                keysIndex++
                if(keysIndex > keys.length - 1){
                    return returnValue({ done: true})
                }
                const currentKey = keys[keysIndex];
                const currentValue = o[currentKey];
                if(typeof currentValue === "object"){
                    return handleObject(currentKey, o)
                }else{
                    keysIndex++;
                    return returnValue({value: currentValue}) 
                }
                
            } 
            return returnValue({ value: iteration.value});
        }

        for(var key in o){
            if(typeof o[key] === "object"){
                addIteratorToObject(o[key]);        
                iterators[key] = o[key][Symbol.iterator]()
            }
        }
        return {
            next() {

                if(keysIndex > keys.length - 1){
                    return returnValue({ done: true})
                }
                const currentKey = keys[keysIndex];
                const currentValue = o[currentKey];
                if(typeof currentValue === "object"){
                    return handleObject(currentKey, o)
                }

                keysIndex++;
                return returnValue({ value: currentValue})
            }
        }
    }
}

const foo = {
    bar: "one",
    thisIsObject: {
        goo: "two",
        doo: "three",
    },
    hoo: {
        oo: "four",
        teww: {
            tboo: "five",
            oo: "six",
            jj: "seven"
        },
    },
    too: "eight",
    eww: {
        boo: "nine"
    },
    goo: "ten",
    doo: "eleven",
    hh: {
        oo: "12",
        jj: {
            tboo: "13",
            oo: "14",
            jj: "15"
        },
    },



}

addIteratorToObject(foo);

const fi = foo[Symbol.iterator]()


console.log(fi.next().value)
console.log(fi.next().value)
console.log(fi.next().value)
console.log(fi.next().value)
console.log(fi.next().value)
console.log(fi.next().value)
console.log(fi.next().value)
console.log(fi.next().value)
console.log(fi.next().value)
console.log(fi.next().value)
console.log(fi.next().value)
console.log(fi.next().value)
console.log(fi.next().value)
console.log(fi.next().value)
console.log(fi.next().value)
console.log(fi.next().value)
console.log(fi.next().value)
console.log(fi.next().value)
console.log(fi.next().value)
console.log(fi.next().value)



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