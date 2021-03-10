# Lenses

This package will help facilitate data retrieval, mutation, and transformation. It's aim is to:

- stay small ~7kb minified
- alleviate the need for `null` checking
- easily allow pipe/compose/chaining of data flows
- allow for a default value to be returned instead of `null` or `undefined` at <b>any point</b> within the chain
- alleviate the need to create empty data structures when trying to set a nested value

Two main function exists: `get()` and `set()` along with their curried version `_get()` and `_set()`. All other exported functions are helpers and are meant to facilitate their use.

One major difference to note between this implementation and that of Partial-Lenses is that the values returned from `get()` are <b><u>not clones</u></b>. They are the actual pointer references. Modifying these returned values are the equivalent to directly modifying the object you retrieved the values from. In general, `get()` should not be used for Object mutation. It should only be used for data retrieval. Use `set()` if you wish to mutate an Object.

It should also be noted that `undefined` and `null` will be treated as the same. i.e. a non-existent value. `get()`, `_get()` and all helper functions will actively ignore inputs that are either `undefined` or `null` and return immediately the input value.

```javascript
const { get, set, defaults } = require('@rybr/lenses')

const myInput = {
  a: {
    b: [null, { c: 1 }],
  },
}

get(myInput, 'a', 'b', 1, 'c')
//returns 1

get(myInput, 'a', 'b', 0, 'f', defaults('someValue'))
//0 nor 'f' exist so this defaults to 'someValue'
//returns 'someValue'

get(myInput, 'a', 'f', defaults('default'), (x) => x + '!')
//'f' does not exist so this adds a default value to protect the anonymous function
//returns 'default!'

const newInput = { a: 1 }

set(newInput, 'b', 1, 1)
//returns newInput which is now { a: 1, b: [ undefined, 1 ] }

set(newInput, 'c', 'd', 1)
//will automatically create an Object for 'c'
//returns newInput which is now { a: 1, b:[ undefined, 1 ], c: { d: 1 } }

set(newInput, 'c', 'd', (oldVal) => oldVal + 1)
//Navigates to 'd' and then sends the retrieved value to the provided function.
//The returned value is then used to set the value for 'd'
//returns newInput which is now { a: 1, b: [ undefined, 1 ], c: { d: 2 } }

set(
  newInput,
  'c',
  'e',
  _get(defaults(10), (oldVal) => oldVal + 1)
)
//Navigates to 'e'
//Uses _get() to specify a default value in case 'e' is undefined
//Sends the retrieved value to the provided function.
//The returned value is then used to set the value for 'e'
//returns newInput which is now { a: 1, b: [ undefined, 1 ], c: { d: 2, e: 11 } }
```

<br/>

---

# get()

> get( input, operation1, operation2, opertaion3, ..., operationN ) <br/> or <br/> \_get( operation1, operation2, opertaion3, ..., operationN )(input)

Retrieves the value for the given `input` based on the `operations` provided.

<br/>

`input`: anything you would like. It will be the input to `operation1`

<br/>

`operationN`: takes the resulting value from the previous operation as input and performs the given operation on it. The result is then passed as input to the next operation in line. If it is the last operation, the result is returned as the final value. Can be one of three types: `String`, `Number`, or `Function`

- `String`: short-hand to retrieve the value for the specified `key` from a given `Object`

- `Number`: short-hand to retrieve the value at the specified `index` from a given `Array`.

- `Function`: this can be either a custom function or one of the helper functions. The input will always be the resulting value from the previous operation.

---

# set()

> set( input, operation1, operation2, operation3, ..., operationN, value ) <br/> or <br/>\_set( operation1, operation2, operation3, ..., operationN, value )(input)

With the `input` as the entry point, navigate the path specified by the `operations` and then set the final retrieved entity equal to `value`. Data structures will be created automatically during navigation if they do not exist.

<br/>

`input`: anything you would like. It will be the input to `operation1`

<br/>

`operationN`: takes the resulting value from the previous operation as input and performs the given operation on it. The result is then passed as input to the next operation in line. If it is the last operation, the result is returned as the final value. Can be one of two types: `String` or `Number`

- `String`: short-hand to retrieve the value for the specified `key` from a given `Object`

- `Number`: short-hand to retrieve the value at the specified `index` from a given `Array`.

<br/>

`value`: anything you would like. If a `Function` is provided, it will be evaluated with the input being equal to whatever value was retrieved by the last `operation`. This will allow you to dynamically set the value based on its current value.

---

# Installation

By default the code is split so if you only want to import a specific section you may

## NodeJs / npm

```javascript
npm install -D @rybr/lenses

//everything
import { get, defaults, set, func, parse, stringify, map, filter, ...rest } from '@rybr/lenses'

//explicity import
import { get, defaults } from '@rybr/lenses/get'
import { set } from '@rybr/lenses/set'
import { func, parse, stringify, ...rest } from '@rybr/lenses/funcs'
import { map, filter, slice, ...rest } from '@rybr/lenses/protos'
```

## Browsers / \<script>

```html
//production (everything)
<script src="https://unpkg.com/@rybr/lenses/dist/lenses.min.js"></script>

//development (everything)
<script src="https://unpkg.com/@rybr/lenses/lenses.js"></script>

//production (explicity import)
<script src="https://unpkg.com/@rybr/lenses/dist/get.min.js"></script>
<script src="https://unpkg.com/@rybr/lenses/dist/set.min.js"></script>
<script src="https://unpkg.com/@rybr/lenses/dist/funcs.min.js"></script>
<script src="https://unpkg.com/@rybr/lenses/dist/protos.min.js"></script>

//development (explicity import)
<script src="https://unpkg.com/@rybr/lenses/get.js"></script>
<script src="https://unpkg.com/@rybr/lenses/set.js"></script>
<script src="https://unpkg.com/@rybr/lenses/funcs.js"></script>
<script src="https://unpkg.com/@rybr/lenses/protos.js"></script>
```

Note: This will automatically fetch the latest version. This will load globally into `window.L`

## SalesForce Controllers

Download the desired script from https://unpkg.com/@rybr/sfcc/lenses.js. <br/> I recommend placing this script in `*/cartridge/scripts/util/lenses` <br/> Use `require` from within the controllers like normal. <br/> These scripts have been bundled as `commonJs` modules and have been translated to base ES5 so they should work in the controllers.

```javascript
const L = require('*/cartridge/scripts/util/lenses')
```

Generic polyfills have been included to support several commonly used Array prototype functions found in ES6 and later versions of ES5. <br/>

Support has been added for the Java derived Collection class and those that implement this interface. These functions should work transparently with the normal JS Array. E.g.

```javascript
const L = require('*/cartridge/scripts/util/lenses')

L.get(
  someCollection, //SFCC Collection
  L.find(function (item) {
    return item && item.someProp
  })
)

L.get(
  [1, 2, 3, 4, 5], //JS Array
  L.find(function (num) {
    return num > 3
  })
)
```

---

# Helper Functions

These are to be used in conjunction primarly with `get()` These are all curried and can be used within the pipeline of the `get()`

<br/>

## func(unsafeFunction)(input)

> part of `funcs.js`

Wraps the function `unsafeFunction` so that it returns the `input` if the input is `null` or `undefined`

<br/>

## call(prototypeName, ...options)(input)

> part of `protos.js`

Attempts to use the call the function of the given `input` specified by `prototypeName`

<br />

## log(customInput, prettify = true)(input)

> part of `funcs.js`

`console.log` the `input`. Prepends the log with `customInput` (if it exists). By default it will prettify the output.

<br/>

## defaults(defaultValue)(input)

> part of `get.js`

If `input` is `null` or `undefined` then return `defaultValue` else return `input`

<br/>

## Prototype functions

> part of `protos.js`

Most prototype functions are available and will be curried by default so that they can be used easily with `get`

---

<br/>

# Examples

Here are some more examples with full value tracking, notes, and explanations

## Data Retrieval And Transformation With get()

```javascript
import { get, defaults, func } from '@rybr/lenses'

const myInput = {
  a: [
    null,
    {
      b: 5
    }
  ]
}

////////////////////
//    EXAMPLE 1   //
////////////////////
get(
  myInput,
  'a',                //myInput.a                | [null, { b: 5 }]
  0,                  //myInput.a[0]             | null
  'b'                 //myInput.a[0].b           | null
  'c'                 //myInput.a[0].b.c         | null
  x => x && x * 50    //(myInput.[0].b.c) * 50   | null
) //returns null

//Note how the null value is propegated even though there are other operations after the initial null is returned.

//Note how we had to manually null check when providing a custom anonymous function.
//In this case, null *will* be passed as the input. It is up to you to null check when using a custom function

//A way to avoid having to include null checks in your custom functions is to wrap them inside the func() helper function

//You could also specify a default value before each anonymous function to guarentee a non-null input

e.g.

get(
  myInput,
  'a',                //myInput.a                | [null, { b: 5 }]
  0,                  //myInput.a[0]             | null
  'b'                 //myInput.a[0].b           | null
  'c'                 //myInput.a[0].b.c         | null
  func(x => x * 50)   //(myInput.[0].b.c) * 50   | null
) //returns null

//Use this when you don't want to handle null checking

////////////////////
//    EXAMPLE 2   //
////////////////////
get(
  myInput,
  'a',                //myInput.a                | [null, { b: 5 }]
  1,                  //myInput.a[1]             | { b : 5 }
  'b'                 //myInput.a[1].b           | 5
) //returns 5

////////////////////
//    EXAMPLE 3   //
////////////////////
get(
  myInput,
  'a',                //myInput.a                   | [null, { b: 5 }]
  1,                  //myInput.a[1]                | { b : 5 }
  'c',                //myInput.a[1].c              | undefined
  defaults(25),       //myInput.a[1].c || 25        | undefined || 25
  input => input * 3  //(myInput.a[1].c || 25) * 3  | 25 * 3
) //returns 75
```

## Data Mutation With set()

```javascript
TODO
```

## Pipe, Compose, Chaining

```javascript
import { get, set, func, map } from '@rybr/lenses'

////////////////////
//    EXAMPLE 1   //
////////////////////
const myArray = [
  {a: null},
  {a: 2},
  {a: 3},
]

const addThree = map(input => get(input, 'a', defaults(0)) + 3)
const addProperty = map(input => set(input, 'b', 'new'))

get(
  myArray,
  addThree,
  addProperty,
)

//returns [ {a: 4, b: 'new' }, { a: 5, b: 'new' }, { a: 6, b: 'new' }]
//Note that myArray remains unchanged. This is because we used map which
//inherently always returns a new Array without modifying the original

//Alternatlively, you can do the same thing withought declaring the functions
//which is a little easier to read since you definitely know what the input will be into each map function in this case
get(
  myArray,
  map(input => get(input, 'a', defaults(0)) + 3),
  map(input => set(input, 'b', 'new'))
)

////////////////////
//    EXAMPLE 2   //
////////////////////
const myObject = {
  texts: {
    labels: [
      'this is a string with BAD capitals in it and illegal ** chars',
      'MORE bad ** text here'
    ]
  }
}

const toLower = func(input => input.toLowerCase())
const removeInvalidChars => func(input => input.replace('*', ''))

get(
  myObject,
  'texts',
  'labels',
  map(input => get(input, toLower, removeInvalidChars))
)
//Will return a list of modified labels however it will *NOT* modify myObject directly
//This is because `.map` never modifies the original Array
```
