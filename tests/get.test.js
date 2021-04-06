const { runTests, expect, FALSEY_VALUES } = require('./test')

const { get, defaults } = require('../get')

runTests('get', [
  function emptyInput() {
    FALSEY_VALUES.forEach((value) => expect(get(value)).toEqual(value))
  },
  function noLenses() {
    const input = {}

    expect(get(input)).toEqual(input)
  },
  function getProp() {
    const input = {
      a: 1,
      b: {
        c: {
          d: 2,
        },
      },
    }

    expect(get(input, 'a')).toEqual(input.a)
    expect(get(input, 'b')).toEqual(input.b)
    expect(get(input, 'b', 'c')).toEqual(input.b.c)
    expect(get(input, 'b', 'c', 'd')).toEqual(input.b.c.d)
  },
  function getIndex() {
    const input = [{}, [{}, [0, 1, 2]]]

    expect(get(input, 0)).toEqual(input[0])
    expect(get(input, 1)).toEqual(input[1])
    expect(get(input, 1, 0)).toEqual(input[1][0])
    expect(get(input, 1, 1)).toEqual(input[1][1])
    expect(get(input, 1, 1, 0)).toEqual(input[1][1][0])
    expect(get(input, 1, 1, 1)).toEqual(input[1][1][1])
    expect(get(input, 1, 1, 2)).toEqual(input[1][1][2])
  },
  function nullPropagation() {
    expect(get({}, 'a', 'b')).toEqual(undefined)
    expect(get([], 1, 1)).toEqual(undefined)
    expect(get({ a: null }, 'a', 'b')).toEqual(null)
    expect(get([0, null], 1, 1)).toEqual(null)

    expect(get({ a: {} }, 'a', 'b', 'c')).toEqual(undefined)
    expect(get([], 1, 0, 'a')).toEqual(undefined)
  },
  function defaultsCatch() {
    const defaultValue = 'a default!'

    expect(get({}, 'a', 'b', defaults(defaultValue))).toEqual(defaultValue)
    expect(get([], 1, 1, defaults(defaultValue))).toEqual(defaultValue)
    expect(get({ a: null }, 'a', 'b', defaults(defaultValue))).toEqual(defaultValue)
    expect(get([0, null], 1, 1, defaults(defaultValue))).toEqual(defaultValue)
  },
])
