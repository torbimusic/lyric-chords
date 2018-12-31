import { Line, LineType } from "./models";
import { GroupInSectionAnalisis } from "../analisis/group-in-sections.analisis";
import { GroupInSection } from "../models/group-in-section.output";
import { SectionType } from "../../models/section";

export class GroupInSections {

    groupInSections(lines: Line[]): GroupInSectionAnalisis {

        let output = lines.reduce((acc: GroupInSection[], curr: Line, i: number) => {

            if (i === 0 ) {
                acc.push(this.createNewSection(curr))
            } else if (isNotEmptyOrTrash(curr)) {
                let currentSection = acc[acc.length-1]

                if(curr.type === LineType.SECTION_NAME){
                    currentSection.name = SectionType[curr.raw.trim()]
                } else {
                    currentSection.lines.push(curr)
                }                

            } else {
                acc.push(new GroupInSection())
            }

            return acc
        }, [])

        return new GroupInSectionAnalisis(output)
    }

    private createNewSection(line:Line):GroupInSection {
        let section = new GroupInSection()

        if (line.type === LineType.SECTION_NAME) {
            section.name = SectionType[line.raw.trim()]
        } else {
            section.lines.push(line)
        }

        return section
    }

}

function isNotEmptyOrTrash(line: Line): boolean {
    return line.type !== LineType.EMPTY && line.type !== LineType.TRASH
}

