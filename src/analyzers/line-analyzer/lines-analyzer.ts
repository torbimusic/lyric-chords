import { ChordLineAnalyzer } from './chordline-analyzer';
import { LineType, Line, LineGrouped, LineAnalyzerOutput, ChordAnalyzerOutput } from './models';
import { LineTypeDetector } from './detect-line-types';
import { GroupInSection } from '../models/group-in-section.output'
import { GroupInSectionAndLines } from '../models/group-in-section-and-lines.output'
import { GroupLinesAnalisis } from '../analisis/group-lines.analisis'

export class LinesAnalyzer {
    private lineTypeDetector = new LineTypeDetector()
    private chordLineAnalyzer = new ChordLineAnalyzer() 


    analyze(sections:GroupInSection[]):GroupLinesAnalisis {
        let groupedInLinesAndSection = sections.map(section => 
            new GroupInSectionAndLines(
                section.name, 
                this.groupInLyricChordGroupLines(section.lines)
            )
        )

        return new GroupLinesAnalisis(groupedInLinesAndSection)
    }


    // analyze(lines:string | Line[]):LineAnalyzerOutput[] {
    //     let linesToGroup:Line[]

    //     if(typeof lines === 'string'){
    //         linesToGroup = this.lineTypeDetector.detectLineTypes(lines)
    //     } else {
    //         linesToGroup = lines
    //     }

    //     linesToGroup = linesToGroup.filter(line => line.type === LineType.CHORD || LineType.LYRIC === line.type)

    //     let groupedLines = this.groupInLyricChordGroupLines(linesToGroup)
    
    //     return this.analyzeGroupedLines(groupedLines)
    // }

    groupInLyricChordGroupLines(lines:Line[]):LineGrouped[] {
        return lines.reduce((acc, curr:Line) => {
            switch(curr.type){
                case LineType.CHORD:
                    acc.push(LineGrouped.withChords(curr.raw))
                break
                case LineType.LYRIC:
                    if(acc.length > 0){
                        let last = acc[acc.length-1]
                        if(last.canAddLyric()){
                            last.lyric = curr.raw
                        } else {
                            acc.push(LineGrouped.withLyric(curr.raw))
                        }
                    } else {
                        acc.push(LineGrouped.withLyric(curr.raw))
                    }
                break
                case LineType.TAB:
                    if(acc.length > 0){
                        let last = acc[acc.length-1]
                        if(!last.hasLyric()){
                            last.tab.push(curr.raw)
                        }
                    } else {
                        acc.push(LineGrouped.withTab([curr.raw]))
                    }
                break
            }
            return acc
        }, new Array<LineGrouped>())
    }

    analyzeGroupedLines(groupedLines:LineGrouped[]):LineAnalyzerOutput[] {
        return groupedLines.map(lineGrouped => {

            let chords:ChordAnalyzerOutput[] = this.chordLineAnalyzer.apply(lineGrouped.chords)
            
            return new LineAnalyzerOutput(
                chords, 
                lineGrouped.chords, 
                lineGrouped.lyric, 
                lineGrouped.tab
            )

        })
    }

}