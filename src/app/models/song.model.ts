export class Song {
    constructor(
        public id?:        string | undefined | null,
        public name?:      string,
        public title?:     string,
        public artist?:    string,
        public album?:     string,
        public year?:      string,
        public duration_in_sec?:  number,
        public bitrate?:   number,
        public lyric?:     string,
        public uploaded_at?: string
    ){}
}
