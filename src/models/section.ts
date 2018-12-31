import { LyricChordLine } from './lyric-chord-line'

export class Section {
    
    constructor(
        public name : string,
        public lines : LyricChordLine[]
    ){}

}

export enum SectionType {
    A = 'A',
    B = 'B',
    C = 'C',
    D = 'D',
    INTRO = 'INTRO',
    OUTRO = 'OUTRO',
    CODA = 'CODA',
    SOLO = 'SOLO',
    INTERLUDE = 'INTERLUDE',
    REINTRO = 'REINTRO'    
}