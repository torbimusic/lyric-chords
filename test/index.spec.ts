import { equal, deepEqual } from 'assert'



describe('Song Analyzer', () => {
    require('./analyze-lines/index.spec')
    require('./group-in-sections/index.spec')
    require('./group-lines/index.spec')
})