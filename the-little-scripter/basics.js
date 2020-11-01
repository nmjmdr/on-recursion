const isEmpty = (s) => {
    if(!Array.isArray(s)) {
        throw new Error('not a list')
    }
    return s.length === 0
}

const isAtom = (x) => !Array.isArray(x) || x.length === 0

const eq = (x,y) => isAtom(x) && isAtom(y) && x === y

const lat = (s) => {
    if(isEmpty(s)) {
        return true
    }
    const [x,...xs] = s
    return isAtom(x) && lat(xs)
}

const isMember = (k, s) => {
    if(isEmpty(s)) {
        return false
    }
    const [x,...xs] = s
    return eq(k,x) || isMember(k, xs)
}

const descendingMember = (k, s) => {
    if(isEmpty(s)) {
        return false
    }
    const [x,...xs] = s
    return eq(k,x) || 
        (isAtom(x) ?
            descendingMember(k, xs) :
            (
                descendingMember(k, x) ||
                descendingMember(k, xs)
            )
        )
}

const mult = (s, c) => {
    if(isEmpty(s)) {
        return s
    }
    const [x,...xs] = s
    return [x*c, ...mult(xs,c)]    
}

// higher order functions
const multIf = (s, c, cond) => {
    if(isEmpty(s)) {
        return s
    }
    const [x,...xs] = s
    return cond(x) ? [x*c, ...multIf(xs,c, cond)] :  [x, ...multIf(xs,c, cond)] 
}


const rember = (s, k) => {
    if(isEmpty(s)) {
        return s
    }
    const [x,...xs] = s
    return x === k ? [...rember(xs, k)] : [x,...rember(xs, k)]
}

const subs = (s, o, n) => {
    if(isEmpty(s)) {
        return s
    }
    const [x,...xs] = s
    return x === o? [n, ...subs(xs, o, n)] : [x, ...subs(xs, o, n)]
}

const match = (s, replace) => {
    if(isEmpty(s)) {
        return s
    }
    const [x,...xs] = s
    const r = replace(x)
    return r != null ? [...r,...match(xs, replace)] : [...match(xs, replace)]
}

const multIfv2 = (s, c, cond) => match(s, (x)=> cond(x)? [x*c] : [x])
const remberv2 = (s, k) => match(s, (x)=> x === k? null : [x] )
const subsv2 = (s, o, n) => match(s, (x)=> x === o? [n] : [x] )

const insertR = (s, o, n) => {
    if(isEmpty(s)) {
        return s
    }
    const [x,...xs] = s
    return x === o? [x,n, ...insertR(xs, o, n)] : [x, ...insertR(xs, o, n)]
}

const insertRv2 = (s, o, n) => match(s, (x)=> x === o? [x,n] : [x] )

const insertL = (s, o, n) => {
    if(isEmpty(s)) {
        return s
    }
    const [x,...xs] = s
    return x === o? [n,x,...insertL(xs, o, n)] : [x, ...insertL(xs, o, n)]
}

const insertLv2 = (s, o, n) => match(s, (x)=> x === o? [n,x] : [x] )

const occurs = (s,c) => {
    if(isEmpty(s)) {
        return 0
    }
    const [x,...xs] = s
    return x === c ? 1 + occurs(xs, c) : occurs(xs, c)
}

const addvec = (s) => {
    if(isEmpty(s)) {
        return 0
    }
    const [x,...xs] = s
    return x + addvec(xs)
}

/*
- version 1:
                addvec([1,2,3]) 
                1 + addvec([2,3]) push to stack: adress of statement to execute 1 + ...
                2 + addvec([3]) push to stack:  adress of statement to execute 2 + ...
                3 + addvec([]) push to stack:  adress of statement to execute 3 + ...
                return 0
                return 3 + 0
                return 2 + 3
                return 1 + 5
                */

const multvec = (s) => {
    if(isEmpty(s)) {
        return 1
    }
    const [x,...xs] = s
    return x * multvec(xs)
}

const reduce = (s, init, fn) => {
    if(isEmpty(s)) {
        return init
    }
    const [x,...xs] = s
    return fn(x, reduce(xs, init, fn))
}

const addvec2 = (s, acc) => {
    if(isEmpty(s)) {
        return acc
    }
    const [x,...xs] = s
    return addvec2(xs, x+acc)
}

/*
 - version 2:
                addvec2([1,2,3],0)
                addvec([2,3], 1 + 0) --- point c, (no next statement to execute, just has to return)
                addvec([3], 2 + 1) ---- point b (no next statement to execute, just has to return)
                addvec([], 3+3) ----- point a (no next statement to execute, just has to return)
                return 6           
                return 6 --------- point a 
                return 6 --------- point b
                return 6 --------- point c
*/

const addvec3 = (s, acc) => {
    while(!isEmpty(s)) {
        const [x,...xs] = s
        acc = x + acc
        s = xs
    }
    return acc
}

console.log(addvec3([1,2,3,4],0))

const multvec2 = (s, acc) => {
    if(isEmpty(x)) {
        return acc
    }
    const [x,...xs] = s
    return multvec(xs, x*acc)
}

const reduce2 = (s, acc, fn) => {
    if(isEmpty(s)) {
        return acc
    }
    const [x,...xs] = s
    return reduce2(xs, fn(x, acc), fn)
}





