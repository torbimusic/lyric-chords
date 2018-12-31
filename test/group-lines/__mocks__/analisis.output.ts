import { GroupInSectionAndLines } from "../../../src/analyzers/models/group-in-section-and-lines.output";

export const expectedOutput = [
    {
        name: 'A',
        lines: [
            {
                chords: "    G            B7",
                lyric: "Flaca, no me claves",
                tab: []
            },
            {
                chords: "         Em              C",
                lyric: "tus puñales por la espalda",
                tab: []
            },
            {
                chords: "           G            D",
                lyric: "tan profundo, no me duelen,",
                tab: []
            },
            {
                chords: "             G    D",
                lyric: "no me hacen mal.   ",
                tab: []
            }
        ],
        
    },
    {
        name: 'A',
        lines: [
            {
                chords: "G              B7",
                lyric: "Lejos, en el centro",
                tab: []
            },
            {
                chords: "           Em        C",
                lyric: "de la tierra, las raíces",
                tab: []
            },
            {
                chords: "       G            D",
                lyric: "del amor, donde estaban",
                tab: []
            },
            {
                chords: "       G   D",
                lyric: "quedarán.",
                tab: []
            }
        ]
    }
]