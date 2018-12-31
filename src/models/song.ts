import { Section } from './section'

export class Song {
    
    constructor(
        public sections:Section[] = [],
        public tonality:string = '',
        public title?:string,
    ){}

}
