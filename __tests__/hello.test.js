import { expect } from '@jest/globals'
import { hello_world } from '../src/hello'

const log = jest.spyOn(console, 'log').mockImplementation(() => {})

describe('hello', () => {
  it('say hello to me', () => {
    hello_world()
    expect(log).toHaveBeenCalledWith('Hello World')
  })
})
