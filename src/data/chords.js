/**
 * Ukulele chord dictionary for standard GCEA tuning.
 * Fingering format: "XXXX" = fret numbers for strings 4(G), 3(C), 2(E), 1(A)
 */

export const UKULELE_CHORDS = {
  // Major chords
  C: "0003",
  "C#": "1114",
  Db: "1114",
  D: "2220",
  "D#": "3331",
  Eb: "3331",
  E: "4442",
  F: "2010",
  "F#": "3121",
  Gb: "3121",
  G: "0232",
  "G#": "5343",
  Ab: "5343",
  A: "2100",
  "A#": "3211",
  Bb: "3211",
  B: "4322",

  // Minor chords
  Cm: "0333",
  "C#m": "1444",
  Dbm: "1444",
  Dm: "2210",
  "D#m": "3321",
  Ebm: "3321",
  Em: "0432",
  Fm: "1013",
  "F#m": "2120",
  Gbm: "2120",
  Gm: "0231",
  "G#m": "4342",
  Abm: "4342",
  Am: "2000",
  "A#m": "3111",
  Bbm: "3111",
  Bm: "4222",

  // Dominant 7th chords
  C7: "0001",
  "C#7": "1112",
  Db7: "1112",
  D7: "2223",
  "D#7": "3334",
  Eb7: "3334",
  E7: "1202",
  F7: "2313",
  "F#7": "3424",
  Gb7: "3424",
  G7: "0212",
  "G#7": "1323",
  Ab7: "1323",
  A7: "0100",
  "A#7": "1211",
  Bb7: "1211",
  B7: "2322",

  // Minor 7th chords
  Cm7: "3333",
  "C#m7": "4444",
  Dbm7: "4444",
  Dm7: "2213",
  "D#m7": "3324",
  Ebm7: "3324",
  Em7: "0202",
  Fm7: "1011",
  "F#m7": "2424",
  Gbm7: "2424",
  Gm7: "0211",
  "G#m7": "4342",
  Abm7: "4342",
  Am7: "0000",
  "A#m7": "1111",
  Bbm7: "1111",
  Bm7: "2222",

  // Major 7th chords
  Cmaj7: "0002",
  "C#maj7": "1113",
  Dbmaj7: "1113",
  Dmaj7: "2224",
  "D#maj7": "3330",
  Ebmaj7: "3330",
  Emaj7: "1300",
  Fmaj7: "5500",
  "F#maj7": "3121",
  Gbmaj7: "3121",
  Gmaj7: "0232",
  "G#maj7": "5343",
  Abmaj7: "5343",
  Amaj7: "1100",
  "A#maj7": "3210",
  Bbmaj7: "3210",
  Bmaj7: "3211",

  // Diminished chords (dim = dim7 on uke)
  Cdim: "2323",
  "C#dim": "3434",
  Dbdim: "3434",
  Ddim: "1212",
  "D#dim": "2323",
  Ebdim: "2323",
  Edim: "0101",
  Fdim: "1212",
  "F#dim": "2323",
  Gbdim: "2323",
  Gdim: "0120",
  "G#dim": "1231",
  Abdim: "1231",
  Adim: "0123",
  "A#dim": "1234",
  Bbdim: "1234",
  Bdim: "1202",

  // Augmented chords
  Caug: "1003",
  Daug: "2110",
  Eaug: "1003",
  Faug: "2110",
  Gaug: "0332",
  Aaug: "2110",
  Baug: "0332",

  // Sus2 chords
  Csus2: "0230",
  Dsus2: "2200",
  Esus2: "4420",
  Fsus2: "0010",
  Gsus2: "0230",
  Asus2: "2200",
  Bsus2: "4220",

  // Sus4 chords
  Csus4: "0013",
  Dsus4: "2230",
  Esus4: "4400",
  Fsus4: "3010",
  Gsus4: "0233",
  Asus4: "2200",
  Bsus4: "4420",
};

/**
 * Simplified chord substitutions for playability.
 * Applied when the original chord is hard to play.
 */
export const SIMPLIFIED_CHORDS = {
  B: "B7",
  "F#m": "F#m7",
  Cdim: "C7",
  Gdim: "G7",
  Adim: "A7",
  Ddim: "D7",
};

/**
 * Capo suggestion table: key → { capo, playKey }
 * Suggests a capo position to make the key easier to play.
 */
export const CAPO_SUGGESTIONS = {
  B: { capo: 2, playKey: "A" },
  "F#": { capo: 2, playKey: "E" },
  Gb: { capo: 2, playKey: "E" },
  "C#": { capo: 1, playKey: "C" },
  Db: { capo: 1, playKey: "C" },
  "D#": { capo: 3, playKey: "C" },
  Eb: { capo: 3, playKey: "C" },
  "G#": { capo: 1, playKey: "G" },
  Ab: { capo: 1, playKey: "G" },
  "A#": { capo: 3, playKey: "G" },
  Bb: { capo: 3, playKey: "G" },
};
