import { expect } from '@jest/globals'
import { hello_world } from '../src/hello'

describe('hello', () => {
  it('say hello to me', () => {
    hello_world()
    expect(true)
  })
})
