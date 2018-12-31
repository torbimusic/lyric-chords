import { ChordAnalyzerOutput } from './chord-analyzer-output'
import { LyricChordLine } from '../../../models';

export class LineAnalyzerOutput extends LyricChordLine {

    constructor(
        public _chords:ChordAnalyzerOutput[],
        public chordLineRaw:string,
        public lyric :string,
        public tab  :string[]
    ){
        super(lyric, _chords.map(chord => chord.toChord()))
    }

    toLyricChordLine():LyricChordLine {
        return new LyricChordLine(
            this.lyric, 
            this._chords.map(chord => chord.toChord())
        )
    }
}