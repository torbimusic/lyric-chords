import { LineType } from './line-type'

export class Line {
    constructor(
        public type:LineType,
        public raw:string
    ){}

    public static fromTypeAsString(line:any):Line{
        return new Line(LineType[<string>line.type], line.raw)
    }
}