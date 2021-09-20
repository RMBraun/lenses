const { runTests, expect } = require('./test')

const { set } = require('../set')

runTests('set', [
  function invalidInputs() {
    expect(() => set({})).toFail()
    expect(() => set({}, 'a')).toFail()

    expect(() => set([])).toFail()
    expect(() => set([], 0)).toFail()
  },
  function inputTypes() {
    expect(() => set('a', 'a', 'a')).toFail()
    expect(() => set(1, 'a', 'a')).toFail()

    expect(() => set(null, 'a', 'a')).toPass()
    expect(() => set(null, 0, 'a')).toPass()

    expect(() => set(undefined, 'a', 'a')).toPass()
    expect(() => set(undefined, 0, 'a')).toPass()

    expect(() => set({}, 'a', 'a')).toPass()
    expect(() => set({}, 0, 'a')).toPass()

    expect(() => set([], 0, 'a')).toPass()
    expect(() => set([], 'a', 'a')).toPass()
  },
  function setObject() {
    expect(set(null, 'a', 'b', 'c', 1)).toSoftEqual({ a: { b: { c: 1 } } })
    expect(set(undefined, 'a', 'b', 'c', 1)).toSoftEqual({ a: { b: { c: 1 } } })
    expect(set({}, 'a', 'b', 'c', 1)).toSoftEqual({ a: { b: { c: 1 } } })
  },
  function setArray() {
    expect(set(null, 0, 0, { a: 1 })).toSoftEqual([[{ a: 1 }]])
    expect(set(undefined, 0, 0, { a: 1 })).toSoftEqual([[{ a: 1 }]])
    expect(set([], 0, 0, { a: 1 })).toSoftEqual([[{ a: 1 }]])
    expect(set([], 1, 1, { a: 1 })).toSoftEqual([null, [null, { a: 1 }]])
  },
  function setMix() {
    expect(set(null, 0, '0', 1, { a: 1 })).toSoftEqual([{ 0: [null, { a: 1 }] }])
    expect(set(undefined, 0, '0', 1, { a: 1 })).toSoftEqual([{ 0: [null, { a: 1 }] }])
    expect(set([], 0, '0', 1, { a: 1 })).toSoftEqual([{ 0: [null, { a: 1 }] }])
  },
  function setWithModify() {
    expect(set({ a: { b: { c: 1 } } }, 'a', 'b', 'c', val => val + 5)).toSoftEqual({ a: { b: { c: 6 } } })
  },
])
