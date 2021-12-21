import { Injectable } from '@angular/core';
import { Apollo, ApolloBase, gql } from 'apollo-angular';
import { map, Observable, switchMap } from 'rxjs';
import { Song } from '../models/song.model';
import { ISong } from './song';

const GET_ALL_SONGS = gql`
query{
  getAllSongs{
    title
    artist
    year
    name
    id
    lyric
    album
    bitrate
    uploaded_at
    duration_in_sec
  }
}
`;

const GET_SONG_METAINFO_BY_ID = gql`
query getSongMetaTag($id: ID!){
  getSongById(id:$id) {
    id,
    name,
    title,
    artist,
    album,
    lyric,
    bitrate,
    duration_in_sec,
    uploaded_at
  }
}
`;

const UPDATE_SONG_BY_ID = gql`
mutation update_song_meta($id: ID!, $name: String, $title: String, 
  $artist: String, $album: String, $year: String, $duration: Int, 
  $bitrate: Int, $lyric: String) {
  updateSongbyId(
    id: $id,
    name: $name,
    title: $title,
    artist: $artist,
    album: $album,
    year: $year,
    duration_in_sec: $duration,
    bitrate: $bitrate,
    lyric: $lyric
  ) {    
    id,
    name,
    title,
    artist,
    album,
    year,
    name,
    duration_in_sec,
    bitrate,
    lyric,
    uploaded_at
  }
}`;

@Injectable({
  providedIn: 'root'
})
export class GraphqlMusicApiService {
  
  private apollo: ApolloBase;
  constructor(private apolloProvider: Apollo) {
    this.apollo = this.apolloProvider.use('graphqlMusicsClient');
  }

  getAllSongs(): Observable<ISong[]> {
    return this.apollo.watchQuery<any>({
      query: GET_ALL_SONGS
    })
    .valueChanges
    .pipe(
      map(result => result?.data && result?.data?.getAllSongs)
    )
  }

  getSongMetaInfoById( id: string | null | undefined ): Observable<Song> {
    return this.apollo.watchQuery<any>({
      query: GET_SONG_METAINFO_BY_ID,
      variables: {
        id: id
      }
    })
    .valueChanges
    .pipe(
      map(result => result?.data && result?.data?.getSongById)
    )
  }

  upadteSongById(song: any): Observable<any> {
    // console.log(song);
    return this.apollo.mutate({
      mutation: UPDATE_SONG_BY_ID,
      variables: {
        id: song.id,
        name: song.name,
        title: song.title,
        artist: song.artist,
        album: song.album,
        year: song.year,
        duration: song.duration_in_sec,
        bitrate: song.bitrate,
        lyric: song.lyric,
      }
    }).pipe(
      map(result => {
        // console.log("RRR: ",result);
        return result?.data;
        // return response?.data && response?.data?.updateSongbyId
      })
    )
  }

}
