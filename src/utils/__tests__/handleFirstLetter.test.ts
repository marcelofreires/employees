import { handleFirstLetter } from '../handleFirstLetter'

describe('handleFirstLetter', () => {
  it('should return the first letter of a string', () => {
    const firstLetter = handleFirstLetter('Lisa Webb')

    expect(firstLetter).toBe('L')
  })

  it('should not return a space character when a string to init with it', () => {
    const firstLetter = handleFirstLetter('   Lisa Webb')

    expect(firstLetter).not.toBe(' ')
  })
});
