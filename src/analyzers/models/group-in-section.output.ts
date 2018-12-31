import { Line } from "../line-analyzer/models";
import { SectionType } from "../../models";

export class GroupInSection {
    
    constructor(
        public name: string = SectionType.A,
        public lines: Line[] = []
    ){} 

}

