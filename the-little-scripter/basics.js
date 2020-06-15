

const car = ([x,..._]) => x 

const cdr = ([_,...xs]) => xs

const cons = (x, ys) => [x,...ys]

const cond = (c, ex, ey) => {
   const exp = c ? ex : ey
   return typeof(exp) == 'function' ? exp() : exp
}

// null? - only defined on lists
const isEmpty = (xs) => cond(Array.isArray(xs), xs.length === 0, ()=>{ throw new Error('not a list') })

const isAtom = (x) => !Array.isArray(x) || x.length === 0

const eq = (x,y) => isAtom(x) && isAtom(y) && x === y

const lat = (xs) => isEmpty(xs) ? 
                        true :
                        (isAtom(car(xs)) && lat(cdr(xs)))

const isMember = (x, xs) => isEmpty(xs) ? 
                            false :
                            (
                                eq(x, car(xs)) ? true : isMember(x,cdr(xs))
                            )

const descendingMember = (x,xs) =>  cond(
                                            isEmpty(xs),
                                            false,
                                            ()=>{
                                                const y = car(xs)
                                                const ys = cdr(xs)
                                                return cond(eq(x,y),
                                                  true,
                                                  isAtom(y)? descendingMember(x,ys) : descendingMember(x,y)
                                                )  
                                            }
                                        )
                                    

console.log(descendingMember(1,[2,3,4,[5,[4,[6,0]]]]))