const { runTests, expect, FALSEY_VALUES } = require('./test')

const {
  toBool,
  toFloat,
  toInt,
  toNum,
  toType,
  forceBool,
  forceFloat,
  forceInt,
  forceNum,
  forceString,
  forceType,
} = require('../funcs')

const testFailures = []

const nullEntires = [null, undefined]
const truthyValues = [1, true, 'true', {}, []]
const falseyValues = [0, '', false]
const invalidNumbers = ['test', 'oog', 'booga']

runTests('toBool', [
  function nullProtection() {
    nullEntires.forEach(value => expect(toBool()(value)).toEqual(value))
  },
  function truthy() {
    truthyValues.forEach(value => expect(toBool()(value)).toEqual(true))
  },
  function falsey() {
    falseyValues.forEach(value => expect(toBool()(value)).toEqual(false))
  },
])

runTests('toFloat', [
  function nullProtection() {
    nullEntires.forEach(value => expect(toFloat()(value)).toEqual(value))
  },
  function validNumbers() {
    const validNumbers = ['0.01', '1.02', '2.03', '3.04']
    validNumbers.forEach(value => expect(toFloat()(value)).toEqual(parseFloat(value)))
  },
  function nonNumbers() {
    invalidNumbers.forEach(value => expect(toFloat()(value)).toSoftEqual(null))
  },
])

runTests('toInt', [
  function nullProtection() {
    nullEntires.forEach(value => expect(toInt()(value)).toEqual(value))
  },
  function validNumbers() {
    const validNumbers = ['0.01', '1.02', '2.03', '3.04']
    validNumbers.forEach(value => expect(toInt()(value)).toEqual(parseInt(value)))
  },
  function nonNumbers() {
    invalidNumbers.forEach(value => expect(toInt()(value)).toSoftEqual(null))
  },
])

runTests('toNum', [
  function nullProtection() {
    nullEntires.forEach(value => expect(toNum()(value)).toEqual(value))
  },
  function validNumbers() {
    const validNumbers = ['0', '1', '2', '3']
    validNumbers.forEach(value => expect(toNum()(value)).toEqual(Number(value)))
  },
  function nonNumbers() {
    invalidNumbers.forEach(value => expect(toNum()(value)).toSoftEqual(null))
  },
])

runTests('toType', [
  function nullProtection() {
    nullEntires.forEach(value => expect(toType()(value)).toEqual(value))
  },
  function toArray() {
    //length creation
    const arrayLength = 4
    expect(toType(Array)(arrayLength).length).toEqual(arrayLength)

    //default values
    const defaultValue = '1'
    expect(toType(Array)(defaultValue)).toSoftEqual(new Array(defaultValue))
  },
  function toNumber() {
    //string value
    const stringValue = '5'
    expect(toType(Number)(stringValue)).toSoftEqual(new Number(stringValue))

    //number values
    const numberValue = 6
    expect(toType(Number)(numberValue)).toSoftEqual(new Number(numberValue))
  },
  function toClass() {
    class MyTestClass {
      constructor(input) {
        this.test = input
      }
    }

    //string value
    const test = '5'
    expect(toType(MyTestClass)(test)).toSoftEqual(new MyTestClass(test))
  },
])
