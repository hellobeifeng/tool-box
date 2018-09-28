export const createError = (code, msg) => {
  const err = new Error(msg)
  err.code = code
  return err
}

// Attempt to convert a string value to a Boolean. Otherwise, return the value
// without modification so Vue can throw a warning.
export const coerceBoolean = (val) => {
  return typeof val !== 'string' ? val
    : val === 'true' ? true
      : val === 'false' ? false
        : val === 'null' ? false
          : val === 'undefined' ? false : val
}
