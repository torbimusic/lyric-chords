import { LineGrouped } from "../line-analyzer/models";
import { SectionType } from "../../models/section";


export class GroupInSectionAndLines {


    constructor(
        public name: string = SectionType.A,
        public lines: LineGrouped[] = []
    ){

    }
}