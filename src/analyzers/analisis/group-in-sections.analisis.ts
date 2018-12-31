import { GroupInSection } from "../models/group-in-section.output";


export class GroupInSectionAnalisis {

    constructor(public sections:GroupInSection[]){
        
    }

    mergeSections(sectionAIndex:number, sectionBIndex:number):GroupInSectionAnalisis {
        const sectionA = this.sections[sectionAIndex]
        const sectionB = this.sections[sectionBIndex]
        
        sectionA.lines = sectionA.lines.concat(sectionB.lines)

        this.removeSection(sectionBIndex)

        return this
    }

    moveSection(sectionIndex:number, newIndex:number):GroupInSectionAnalisis {

        let section = this.sections.splice(sectionIndex, 1)[0]

        let recalculateNewIndex = newIndex > sectionIndex ? newIndex -1 : newIndex

        this.sections.splice(newIndex, 0, section)

        return this
    }

    removeSection(sectionIndex:number):GroupInSectionAnalisis {
        this.sections.splice(sectionIndex, 1)

        return this
    }

}