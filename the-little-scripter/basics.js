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

