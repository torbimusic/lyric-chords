import { Chord } from "@torbimusic/core";
import * as song from '../../../models'

export class ChordAnalyzerOutput extends song.Chord {

    constructor(
        public value:string,
        public raw:string,
        public position:number,
        public analisis?:Chord,
    ){
        super(position, value)
    }

    toChord():song.Chord {
        return new song.Chord(this.position, this.value)
    }
}