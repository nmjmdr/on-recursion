

const car = ([x,..._]) => x 

const cdr = ([_,...xs]) => xs

const cons = (x, ys) => [x,...ys]

const cond = (c, ex, ey) => {
   const exp = c ? ex : ey
   return typeof(exp) == 'function' ? exp() : exp
}

const isNull = (xs) => cond(Array.isArray(xs), xs.length === 0, ()=>{ throw new Error('not a list') })

const isAtom = (x) => !Array.isArray(x) || x.length === 0

const eq = (x,y) => isAtom(x) && isAtom(y) && x === y

const lat = (xs) => isNull(xs) ? 
                        true :
                        (isAtom(car(xs)) && lat(cdr(xs)))

