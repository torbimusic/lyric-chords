import { SongAnalyzer } from "../../src";
import { inputSongMock } from '../__mocks__/input'
import { deepEqual } from "assert";
import { expectedOutput } from './__mocks__/analisis.output'
import { mergeExpectedOutput } from "./__mocks__/merge.output";
import { moveExpectedOutput } from "./__mocks__/move.output";
import { removeExpectedOutput } from "./__mocks__/remove-section.output";


describe('Group In Sections analisis', () => {
    let songAnalyzer: SongAnalyzer

    beforeEach(() => {
        songAnalyzer = SongAnalyzer.from(inputSongMock)
    })

    it('simple test', () => {
        deepEqual(songAnalyzer.groupInSections().sections, expectedOutput)
    })

    it('remove section', () => {
        let groupAnalyzer = songAnalyzer.groupInSections().removeSection(1)

        deepEqual(groupAnalyzer.sections, removeExpectedOutput)
    })

    it('move section to 0', () => {
        let groupAnalyzer = songAnalyzer.groupInSections().moveSection(1, 0)

        deepEqual(groupAnalyzer.sections, moveExpectedOutput)
    })

    it('move section to higher position', () => {
        let groupAnalyzer = songAnalyzer.groupInSections().moveSection(0, 1)

        deepEqual(groupAnalyzer.sections, moveExpectedOutput)
    })

    it('merge sections', () => {
        let groupAnalyzer = songAnalyzer.groupInSections().mergeSections(0, 1)

        deepEqual(groupAnalyzer.sections, mergeExpectedOutput)
    })





})