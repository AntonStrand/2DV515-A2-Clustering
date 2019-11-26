import Type from 'union-type'

const isUint = x => Number.isInteger (x) && x > 0
const isEmpty = x => x.length === 0

const NumberInput = Type ({
  Valid: [Number],
  Invalid: [],
  Default: []
})

const toNumberInput = n =>
  !isEmpty (n) && isUint (Number (n))
    ? NumberInput.Valid (Number (n))
    : isEmpty (n)
      ? NumberInput.Default
      : NumberInput.Invalid

/** isValidNumberInput :: InputNumber -> Boolean */
const isValidNumberInput = NumberInput.case ({
  Valid: () => true,
  _: () => false
})

/** getNumber :: InputNumber -> Number */
const getNumber = NumberInput.case ({
  Valid: n => n,
  _: () => { throw new Error ('Check if input number is valid first.') }
})

/** showError :: InputNumber -> String | Boolean */
const showError = NumberInput.case ({
  Invalid: () => 'It has to be a positive integer.',
  _: () => false
})

export { NumberInput, toNumberInput, isValidNumberInput, getNumber, showError }
