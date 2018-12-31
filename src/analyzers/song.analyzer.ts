import { LineTypeAnalisis } from "./analisis/line-type.analisis";
import { Song } from "../models";
import { GroupInSectionAnalisis } from "./analisis/group-in-sections.analisis";
import { LineTypeDetector } from "./line-analyzer/detect-line-types";
import { GroupInSections } from "./line-analyzer/group-in-sections";
import { LinesAnalyzer } from '../analyzers/line-analyzer/lines-analyzer'
import { GroupLinesAnalisis } from "./analisis/group-lines.analisis";

export class SongAnalyzer {
    private lineTypeAnalisis:LineTypeAnalisis
    private groupInSectionAnalisis:GroupInSectionAnalisis
    private groupLinesAnalisis:GroupLinesAnalisis

    private constructor(private songRaw:string){

    }

    static from(songString:string):SongAnalyzer {
        return new SongAnalyzer(songString)
    }

    analyzeLineTypes():LineTypeAnalisis {
        let lines = new LineTypeDetector().detectLineTypes(this.songRaw)
        this.lineTypeAnalisis = new LineTypeAnalisis(lines)

        return this.lineTypeAnalisis
    }

    groupInSections():GroupInSectionAnalisis {
        if(!this.lineTypeAnalisis){
            this.analyzeLineTypes()
                .removeExtraLines()
                .removeTrash()
        }

        this.groupInSectionAnalisis = new GroupInSections()
            .groupInSections(this.lineTypeAnalisis.lines)

        return this.groupInSectionAnalisis
    }

    groupLines():GroupLinesAnalisis {

        if(!this.groupInSectionAnalisis){
            this.groupInSections()
        }

        this.groupLinesAnalisis = new LinesAnalyzer().analyze(this.groupInSectionAnalisis.sections)

        return this.groupLinesAnalisis
    }

    analyzeChords(){
        if(!this.groupLinesAnalisis){
            this.groupLines()
        }

        

        return 
    }

    getSong():Song {
        return
    }

}