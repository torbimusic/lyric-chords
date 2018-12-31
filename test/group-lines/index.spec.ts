import { SongAnalyzer } from "../../src";
import { inputSongMock } from "../__mocks__/input";
import { deepEqual } from "assert";
import { expectedOutput } from "./__mocks__/analisis.output";

describe('Group Lines', () => {

    let songAnalyzer: SongAnalyzer

    beforeEach(() => {
        songAnalyzer = SongAnalyzer.from(inputSongMock)
    })

    it('simple test', () => {
        let analisis = songAnalyzer.groupLines()
        
        deepEqual(analisis.sections, expectedOutput)
    })


})