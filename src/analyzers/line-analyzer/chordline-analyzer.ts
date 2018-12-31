import { ChordAnalyzerOutput } from './models'
import { Chord } from '@torbimusic/core';

export class ChordLineAnalyzer {

    apply(chordLine:string, analyzeChord = true):ChordAnalyzerOutput[]{
        
        let chords:ChordAnalyzerOutput[] = this.obtainPositionAndChordRaw(chordLine)
        
        chords = chords.reduce((acc, chord) => {
            
            if(analyzeChord){
                
                let analyzed = Chord.parse(chord.value)
                
                if(analyzed){
                    chord.value = analyzed.toString()
                    chord.analisis = analyzed
                    acc.push(chord)    
                }
                
            } else {
                acc.push(chord)  
            }
            
            return acc
        }, [])
    
        return chords
    }

    private obtainPositionAndChordRaw(input:string):ChordAnalyzerOutput[]{
        let regex = new RegExp("[\\w#()/°,º\\+]+", 'g')

        let chords:ChordAnalyzerOutput[] = []

        let match
        
        while((match = regex.exec(input)) != null) {
            chords.push(new ChordAnalyzerOutput(
                match[0], this.obtainRawChordInput(input, match), match.index)
            )
        }

        return chords
    }

    private obtainRawChordInput(input:string, match){
        return input.substring(match.index, match.index + match[0].length)
    }   

}