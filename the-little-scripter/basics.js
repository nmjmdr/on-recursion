

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

const lat = (xs) => isEmpty(xs) ? 
                        true :
                        (isAtom(car(xs)) && lat(cdr(xs)))

const isMember = (x, xs) => isEmpty(xs) ? 
                            false :
                            eq(x, car(xs)) ? true : isMember(x,cdr(xs))

const descendingMember = (x,xs) =>  {
    
    if(isEmpty(xs)) {
        return false
    }
 
    const {y, ys} = (car(xs), cdr(xs))
    return eq(x,y) ?
                true :
                isAtom(y)? descendingMember(x,ys) : descendingMember(x,y)                                        
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

console.log(insertR(['a','b','c','d','f','g','h'],'d', 'e'))