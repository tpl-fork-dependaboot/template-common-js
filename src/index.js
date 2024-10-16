import { program } from 'commander'
import { hello_world } from './hello.js'

program.name('hw').description('Hello World Application')

program
  .command('reply')
  .description('I can say hello to you')
  .action(options => hello_world(options))

program.parse(process.argv)