export interface ISong {
    id?:        string,
    name?:      string,
    title?:     string,
    artist?:    string,
    album?:     string,
    year?:      string,
    duration_in_sec?: number,
    bitrate?:   number,
    lyric?:     string,
    uploaded_at?: string
}