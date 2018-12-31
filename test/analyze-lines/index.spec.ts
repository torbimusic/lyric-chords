import { equal, deepEqual } from 'assert'
import { SongAnalyzer } from '../../src'
import { inputSongMock } from './mocks/input'
import { expectedOutput } from './mocks/analisis.output'
import { removeEmpty } from './mocks/remove-empty.output'
import { LineTypeAnalisis } from '../../src/analyzers/analisis/line-type.analisis';
import { LineType, Line } from '../../src/analyzers/line-analyzer/models';


describe('Line Type Analisis', () => {
    let songAnalyzer: SongAnalyzer

    beforeEach(() => {
        songAnalyzer = SongAnalyzer.from(inputSongMock)
    })

    let lineTypeAnalisis: LineTypeAnalisis

    beforeEach(() => {
        lineTypeAnalisis = songAnalyzer.analyzeLineTypes()
    })

    it('simple analisis', () => {
        deepEqual(lineTypeAnalisis.lines, expectedOutput)
    })

    it('remove extra empty lines', () => {
        let actual = lineTypeAnalisis.removeExtraLines().lines
        deepEqual(actual, removeEmpty)
    })

    it('change type', () => {
        equal(lineTypeAnalisis.lines[0].type, LineType.SECTION_NAME)

        lineTypeAnalisis.changeType(0, LineType.LYRIC)

        equal(lineTypeAnalisis.lines[0].type, LineType.LYRIC)
    })


})
