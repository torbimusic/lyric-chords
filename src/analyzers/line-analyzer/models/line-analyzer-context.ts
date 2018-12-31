import { Line, LineType } from ".";

export class LineAnalyzerContext {
    
    constructor(
        public index:number,
        public previousLine?:Line,
        public nextLine?:Line
    ){

    }

    isBeginOfSection():boolean {
        return this.index === 0 || this.previousLine.type === LineType.EMPTY
    }
}

