

const car = ([x,..._]) => x 

const cdr = ([_,...xs]) => xs

const cons = (x, ys) => [x,...ys]


// null? - only defined on lists
const isEmpty = (xs) => {
    if(!Array.isArray(xs)) {
        throw new Error('not a list')
    }
    return xs.length === 0
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
    if(isEmpty(s)){
        return false
    }
    const [x,...xs] = s
    return eq(k, x) ? true : isMember(k,xs)
}

const descendingMember = (k,s) =>  {
    if(isEmpty(s)) {
        return false
    }
    const [x,...xs] = s
    return eq(k,x) ?
                true :
                isAtom(x)? descendingMember(k,xs) : 
                (
                    descendingMember(k,x) ||
                    descendingMember(k,xs)
                )                        
}

// using quick sort to find a member would faster
const partition = (p,xs) => {
    return xs.reduce((acc,x)=>{
        x < p ?
            acc.small.push(x) : acc.large.push(x)
        return acc
    },{small:[],large:[]})
}
const qsort = (xs) => {
    if(isEmpty(xs)) {
        return xs
    }
    const [pivot,...ys] = xs
    const {small, large} = partition(pivot, ys)
    return [...qsort(small),pivot,...qsort(large)]
}
                       
                                

const bsearch = (key, arr, low, high) => {
    if(high < low) {
        return false
    }
    const mid = Math.floor(low + ((high - low) / 2))
    if(arr[mid] === key) {
        return true
    }
    if(key < arr[mid]) {
        return bsearch(key, arr, low, mid-1)
    } else {
        return bsearch(key, arr, mid+1, high)
    }
}

const rember = (x, xs) => {
    if(isEmpty(xs)) {
        return xs
    }
    const [y,...ys] = xs
    return eq(x, y) ? ys : [y,...rember(x,ys)]
}

const firsts = (xss) => {
    if(isEmpty(xss)) {
        return xss
    }
    const [[f,..._], ...ys] = xss
   
    return isAtom(f) ? [[f],...firsts(ys)] : firsts(ys)
}


const insertR = (s, o, n) => {
    if(isEmpty(s)) {
        return s
    }
    const [x,...xs] = s
    if(eq(x,o)){
        return [x,n,...xs]
    }
    return [x,...insertR(xs,o, n)]
}

const insertL = (s, o, n) => {
    if(isEmpty(s)) {
        return s
    }
    const [x,...xs] = s
    if(eq(x,o)){
        return [n,x,...xs]
    }
    return [x,...insertR(xs,o, n)]
}

const subs = (s, o, n) => {
    if(isEmpty(s)) {
        return s
    }
    const [x,...xs] = s
    if(eq(x,o)){
        return [n,...xs]
    }
    return [x,...subs(xs,o, n)]
}

// insertR, insertL, subs and rember can all be coded using this replace function
// and supplying necessary function
const replace = (s, o, fn) => {
    if(isEmpty(s)) {
        return s
    }
    const [x,...xs] = s
    if(eq(x,o)){
        return fn(x,xs)
    }
    return [x,...replace(xs,o,fn)]
}


const rember1 = (x, xs) => replace(xs,x,(_,ys)=>ys)
const insertR1 = (s, o, n) => replace(s, o, (x,xs)=>[x,n,...xs])
const insertL1 = (s, o, n) => replace(s, o, (x,xs)=>[n,x,...xs])
const subs1 = (s, o, n) => replace(s, o, (x,xs)=>[n,...xs])

console.log(subs1(['a','b','c','d','f','g','h'],'f','e'))