import { Line, LineType } from "./models";
import { LineAnalyzerContext } from "./models/line-analyzer-context";
import { LineAnalyzer } from "./line-analyzer";

export class LineTypeDetector {
    
    constructor(private lineAnalyzer = new LineAnalyzer()){

    }
       
    detectLineTypes(songRaw:string):Array<Line>{
        return songRaw.split('\n')
            .reduce((acc:Line[], curr:string, i:number) => {
                let line:Line
                let context:LineAnalyzerContext = new LineAnalyzerContext(i)
    
                if(i > 0){
                    context = new LineAnalyzerContext(i, acc[acc.length-1])
                }
    
                line = this.lineAnalyzer.apply(curr, context)
    
                acc.push(line)
    
                return acc
            }, [])
            .reduce((acc:Line[], curr:Line) => {
                
                if(acc.length > 0 || curr.type !== LineType.EMPTY){ //first line not empty
                    if(acc.length > 0 && this.twoEmptyLinesInARow(acc[acc.length-1], curr)){
                        console.info('extra empty line')
                    } else {
                        acc.push(curr)
                    }
                }
                return acc
            }, [])
    }

    private twoEmptyLinesInARow(lineBefore:Line, currentLine:Line):boolean{
        return (lineBefore.type === LineType.EMPTY && currentLine.type === LineType.EMPTY)
        || (lineBefore.type === LineType.TRASH && currentLine.type === LineType.EMPTY)
    }

}