const isEmpty = (s) => {
    if(!Array.isArray(s)) {
        throw new Error('not a list')
    }
    return s.length === 0
}

const addvec = (s) => {
    if(isEmpty(s)) {
        return 0
    }
    const [x,...xs] = s
    return x + addvec(xs)
}

/*
    addvec([1,2,3])
    1 + addvec([2,3]), push to stack => address of statement 1 + ...
    
    2 + addvec([3]), push to stack => address of statement 2 + ...

    3 + addvec([]), push to stack => address of statement 3 + ..

    return 0
    unwind the stack
    return 3 + 0 

    return 2 + 3

    return 1 + 5 = 6

*/



const multvec = (s) => {
    if(isEmpty(s)) {
        return 1
    }
    const [x,...xs] = s
    return x * multvec(xs)
}

const reduce = (s, seed, fn) => {
    if(isEmpty(s)) {
        return seed
    }
    const [x,...xs] = s
    return fn(x, reduce(xs, seed, fn))
} 


// [1,2,3]
// acc = 0, acc = 1 + acc, acc = 2 + acc, acc = 3 + acc, return acc

const addvec2 = (s, acc) => {
    if(isEmpty(s)) {
        return acc
    }
    const [x,...xs] = s
    return addvec2(xs, x+acc)
}

/*
addvec2([1,2,3],0)
addvec2([2,3],1+0) , at this point it has to return the value, point a
addvec2([3],2+1),  point b
addvec2([], 3+3) point c

return 6 ---> point c
return 6 ---> point b
return 6 ---> point a

tail recursion

*/

const addvec3 = (s) => {
    var acc = 0
    while(!isEmpty(s)) {
        const [x,...xs] = s
        acc = x + acc
        s = xs
    }
    return acc
}

const reduce2 = (s, acc, fn) => {
    if(isEmpty(s)) {
        return acc
    }
    const [x,...xs] = s
    acc = fn(x, acc)
    return reduce2(xs,acc,fn)
}

console.log(reduce2([1,2,3,4],1,(x,acc)=>x*acc))