import { Line, LineType } from "../line-analyzer/models";

export class LineTypeAnalisis {

    constructor(
        public lines:Line[]
    ){}

    changeType(lineIndex:number, type:LineType):LineTypeAnalisis {
        this.lines[lineIndex].type = type 
        return this
    }

    removeTrash():LineTypeAnalisis {
        this.lines = this.lines.filter(line => line.type !== LineType.TRASH)

        return this
    }

    removeTabs():LineTypeAnalisis {
        this.lines = this.lines.filter(line => line.type !== LineType.TAB)

        return this
    }

    removeExtraLines():LineTypeAnalisis {
        this.lines = this.lines.reduce((acc:Line[], line:Line, i:number) => {
            let lastLine = i === (this.lines.length -1)

            if(acc.length === 0 && this.isNotEmptyLine(line)){
                acc.push(line)
            } else if(line.type !== LineType.EMPTY){
                acc.push(line)
            } else if(!lastLine && this.isNotEmptyLine(acc[acc.length -1])){
                acc.push(line)
            }
            
            return acc
        }, [])

        return this
    }

    private isNotEmptyLine(line:Line):boolean{
        return line.type !== LineType.TRASH 
            && line.type !== LineType.EMPTY
    }

}