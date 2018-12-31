export class LineGrouped {

    constructor(
        public chords: string = "",
        public lyric: string = "",
        public tab: string[] = []
    ) { }

    static withLyric(lyric: string): LineGrouped {
        return new LineGrouped('', lyric)
    }

    static withChords(chords: string): LineGrouped {
        return new LineGrouped(chords)
    }

    static withTab(tab: string[]): LineGrouped {
        return new LineGrouped('', '', tab)
    }

    canAddLyric(): boolean {
        return !this.hasLyric() && !this.hasTab()
    }

    hasChord(): boolean {
        return this.chords.length > 0
    }

    hasTab(): boolean {
        return this.tab.length > 0
    }

    hasLyric(): boolean {
        return this.lyric.length > 0
    }
}