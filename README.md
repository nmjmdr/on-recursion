On Recursion

Video series:
[![IMAGE ALT TEXT](http://img.youtube.com/vi/1LFfkJ0Vu1E/0.jpg)](https://www.youtube.com/watch?v=1LFfkJ0Vu1E&list=PLnc-9WSlJzpfhubE5plSu4LXZbvoreCV7&ab_channel=paperandpen-softwaredesign "Design of faulet tolerant Job queue - Jobber")


- Try and develop an `intutive` understanding of `recursion`
- Solve problems that naturally fit the recursion approach 
- Using JavaScript, ES6

- The Little Lisper (1974) (later The Little Schemer (1980s))

- Excercises from `The Little Lisper`, 
    other sources and some of the problems defined by me

- To understand some of the basics of Lisp
    - Implement these basic concepts using JavaScript, ES6

- Lisp works on `Lists` and `Atoms`
- An `Atom` is a single charecter, string, number or an empty list
- A `List` is a collection of atoms or other lists
- An empty list is also a list (and an `Atom`)

- In terms of JavaScript:
    Atoms: 101, "Hello", 'c', []
    Lists: ['a','b','c'], [1,2,3], [['a','b','c'], [1,2,3]], [[],[]], []

========================
- (`null?`) `isEmpty` checks if the list is empty

- `isAtom` checks if a given input is an atom
    - not an array (string, charecter, or a number)
    - and an empty list

- `eq` is defined on atoms and checks if two atoms are equal


We are now ready for our first recursive function

-`lat` checks if every element of the list is an atom

- extract the first element, check if it is an atom
- if yes, then check if the reminder of list is `lat`
     - reminder of the list can be checked by invoking `lat` on the remaining list
- The end condition: an empty list returns true
- The end condition is important, it is what stops the recursive process in its tracks

+------------------------------------------------------------+
| Rules for recursion                                        |
|   - Attempt to define the problem in terms of itself       |
|   - Identify the base case (or end condition)              |
+------------------------------------------------------------+


- isMember - checks if given atom is member of a list
    - get the first element, check if its equal to the given atom
    - if yes return true, else contine looking in the reamining list
    - invoke isMember on the remaining list
    - End condition: if the list empty we return false


- descendingMember 
    - What if the list contains lists (and those lists contain lists)
        and we want to check if a given atom is part of such a list

    - Lets attempt to modify the `isMember` to handle the above



- Some more recursive functions 
    and an aspect of functional programming (Higher order functions)

    - mult: multiply all atoms of list with a constant
    - multIf: multiple an atom by a constant if a condition matches 
        - Higher order function

    - rember: removes all occurance of an atom from a list
    - subs: substitue all occurances of atom 'o' with 'n'

    - match: a functional way to achieve all the above functions
        - Another Higher order function

    - insertR: find all occurances of an atom 'o' 
        and insert an atom 'n' after it (to the right of 'o')
    - insertL: find all occurance of an atom 'o' 
        and insert an atom 'n' before it (to the left of 'o')

    - modify match to work for insertR, insertL
        - need to change (version 2) mult, multIf, rember and subs
    

- Tail recursion

    - addvec (adds all elements of an array) 
    - multVec (multiply all elements of an array)
    - Reduce (version 1)
    - Delve into how this works

    - add vector version 2
        - using the concept of an accumulator
    - Reduce (version 2)
    - difference between both the approaches
        - tail recursion
            A function call is said to be tail recursive if there is nothing to do after the function returns except return its value. (http://wiki.c2.com/?TailRecursion)
        - tail call optimization
        - tail call optimized version
            - compiler recognizes this and optimises, essentially optimises to use a iterative version 
    
    

    


    





