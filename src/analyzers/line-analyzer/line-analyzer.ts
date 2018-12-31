import { Chord } from '@torbimusic/core'
import { LineAnalyzerContext } from './models/line-analyzer-context';
import { Line, LineType } from './models'
import { SectionType } from '../../models'
import { Notation } from '@torbimusic/core/dist/constants';

export class LineAnalyzer {
    
    apply(raw:string, context?:LineAnalyzerContext):Line {
        let line:Line 

        if(this.isSectionNameLine(raw, context)){
            line = new Line(LineType.SECTION_NAME, raw)
        } else {
            line = this.applyWithoutContext(raw)
        }

        return line
    }

    applyWithoutContext(raw:string):Line {
        let line:Line

        if(this.isEmptyLine(raw)){
            line = new Line(LineType.EMPTY, raw)
        }
        else if(this.isTabLine(raw)){
            line = new Line(LineType.TAB, raw)
        }
        else if(this.isChordLine(raw)){
            line = new Line(LineType.CHORD, raw)
        }  
        else {
            line = new Line(LineType.LYRIC, raw)
        }

        return line
    }

    isSectionNameLine(raw:string, context:LineAnalyzerContext):boolean {
        let isSectionNameLine = false
        
        if(context && context.isBeginOfSection()){
            let text = raw.trim()
            let isSectionName = SectionType[text] !== undefined
            let beginInLetter = raw.charAt(0).match(/[A-Z]/) !== null

            isSectionNameLine = isSectionName && beginInLetter
        }

        return isSectionNameLine
    }

    isChordLine(raw:string):boolean{
        let isIt = 0
        let isNot = 0
        
        raw
            .trim().split(' ')
            .filter(word => word.trim().length > 0)
            .map(word => {
                if(word.length > 6 || word[0].toUpperCase() !== word[0]){
                    return null
                } else {
                    return this.chordUsesAtLeastHalfOfLetters(Chord.parse(word), word)
                }
            })
            .forEach(chord => chord ? isIt++ : isNot++)
        
        // separation of words
        let spaces = raw.split(' ').filter(word => word.trim().length === 0)
        let letters = raw.split('').filter(letter => letter.trim().length > 0)

        if(spaces.length > letters.length){
            isIt *= 1.1
        } 

        return isIt * 1.1 > isNot
    }

    chordUsesAtLeastHalfOfLetters(chord:Chord, word){
        return chord 
            && (chord.toString().length >= word.length / 2 
            || chord.toString(Notation.SOUTHERN_EUROPEAN).length > word.length / 2)
    }


    isTabLine(raw:string):boolean{
        let isIt = 0
        let isNot = 0
        let middleScoreCount = 0
        let notMiddleScoreCount = 0
        raw
        // .trim()
            .split('')
            // .filter(word => word.trim().length > 0)
            .forEach(word => {
                if(word.match("[-]?[\\d]?[\|]?")[0].length > 0){
                    isIt++
                } else {
                    isNot++
                }
                if(word.includes('-')){
                    middleScoreCount++
                } else {
                    notMiddleScoreCount++
                }

            })
        

        return isIt * 1.1 + middleScoreCount * 1.3  > isNot + notMiddleScoreCount 
    }

    isEmptyLine(raw:string):boolean{
        return raw.trim().length === 0
    }

}