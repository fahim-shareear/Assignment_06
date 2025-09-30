1) What is the difference between var, let, and const?

Answer: 
        In JavaScript, var, let, and const are all used to declare variables, but they behave a bit differently:

var is the old way. It’s function-scoped, meaning if you declare it inside a function, it’s only visible there. But it ignores block boundaries, so if you declare it inside {} like an if statement, it’s still accessible outside. You can also redeclare it, and it gets “hoisted” to the top of its scope, which sometimes leads to confusing bugs.

let is newer and smarter. It’s block-scoped, so it only exists inside the {} where you declare it. You cannot redeclare it in the same block, and it’s safer because it doesn’t get auto-initialized like var. You can, however, change its value after declaring it.

const is also block-scoped, but it’s meant for constants. You cannot reassign a const variable. That said, if it’s an object or an array, you can still change the contents—it just can’t point to a completely new object or array.


2) What is the difference between map(), forEach(), and filter()?

Answer:
        map() – goes through each item in an array and creates a new array with transformed values.

forEach() – goes through each item in an array to perform an action, but doesn’t return anything.

filter() – goes through each item and creates a new array with only the items that meet a certain condition.


3) What are arrow functions in ES6?

Answer:
        Arrow functions in ES6 are a shorter, cleaner way to write functions. They also automatically keep the value of this from their surrounding context, which makes them handy in certain situations.

In short: shorter syntax and lexical this.


4) How does destructuring assignment work in ES6?

Answer: 
        Destructuring assignment in ES6 lets you extract values from arrays or objects and assign them to variables in a single step.


5) Explain template literals in ES6. How are they different from string concatenation?

Answer: 
        Template literals in ES6 are strings wrapped in backticks ( ) that allow embedding variables and expressions directly inside using ${}.

Unlike traditional string concatenation with +, they make combining text and variables easier and more readable.