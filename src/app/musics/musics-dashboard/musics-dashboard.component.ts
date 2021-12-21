import { Component, OnDestroy, OnInit } from '@angular/core';
import { Apollo, ApolloBase, gql } from 'apollo-angular';
import { map, Observable, Subscription } from 'rxjs';
import { GraphqlMusicApiService } from '../graphql-music-api.service';
import { ISong } from '../song';

import * as moment from 'moment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-musics-dashboard',
  templateUrl: './musics-dashboard.component.html',
  styleUrls: ['./musics-dashboard.component.css']
})

export class MusicsDashboardComponent implements OnInit, OnDestroy {

  songs: any;
  loading = true;
  error: any;
  url: any;
  public searchValue: any;

  keyword ='name';
  // catagories = [
  //   "Title",
  //   "Album",
  //   "Artist",
  //   "Lyric",
  // ];

  isCatagory = "select";
  album: any;
  artist: any;
  lyric: any;

  totalLength:any;
  page:number = 1;
  pageIndex: number = 0;
  // totalLength = this.users.length;

  paginate(event: any) {
    this.pageIndex=event;
  }

  private querySubscription: Subscription | undefined;
  
  constructor(private _gqlMusicService: GraphqlMusicApiService, private router: Router ) { }

  ngOnInit(): void {
    // this.catagories[0].toLocaleLowerCase();
    this.querySubscription = this._gqlMusicService.getAllSongs().subscribe(
      (data: ISong[]) => {

        this.songs = data;

        this.album = [...new Map(data.map((item) => [item["album"], item])).values()];
        this.artist = [...new Map(data.map((item) => [item["artist"], item])).values()];
        this.lyric = [...new Map(data.map((item) => [item["lyric"], item])).values()];
   
        // console.log(this.lyric.length);
        
        this.totalLength = data.length;
        this.loading = false;
        console.log(data);

      },
      error => this.error = error
    )
  }

  ngOnDestroy() {
    this.querySubscription?.unsubscribe();
  }

  onClick(song: ISong) {
    // console.log(user)
    this.router.navigate(['/music-metatag-edit',song.id])
  }

  filterSongs(songs: any) {
    console.log("Filter: ",songs);
    
  }

  setCatagory(event: any) {
    // console.log(event.target.value.toLocaleLowerCase());
    // console.log("PPPPPPP");
    this.isCatagory = event.target.value.toLocaleLowerCase();
    // this.isCatagory = 'title';
  }

  selectEvent(item: any) {
    // do something with selected item
  }

  onChangeSearch(search: string) {
    // fetch remote data from here
    // And reassign the 'data' which is binded to 'data' property.
  }
  
  onFocused(e: any){
    // do something when input is focused
  }

  auduioObj = new Audio();
  audioEvents = [
    "ended",
    "error",
    "play",
    "playing",
    "pause",
    "timeupdate",
    "canplay",
    "lodedmetadata",
    "loadstart"
  ];

  // files = [
  //   {
  //     url: './assets/songs/Mere Nishaan (Oh My God).mp3',
  //     name: 'Mere Nishaan (Oh My God)'
  //   },
  //   {
  //     url: './assets/songs/The Mercury Song (Mercury).mp3',
  //     name: 'The Mercury Song (Mercury)'
  //   },
  // ];

  currentTime = "00:00:00";
  duration = "00:00:00";
  durationInsec = 0;
  seek = 0;

  play(){
    this.auduioObj.play();
    console.log("play");
  }

  pause() {
    this.auduioObj.pause();
    console.log("pause");
  }

  stop() {
    this.auduioObj.pause();
    this.auduioObj.currentTime = 0;
    console.log("stop");
  }

  openFile(filename: any) {
    // this.url  = "E:\\Songs-Zip-File\\Hindi\\Hindi\\"+filename;
    this.url = "http://localhost:8080//"+filename;
    console.log(this.url);
    // this.auduioObj.src = url;
    // this.auduioObj.load();
    // this.auduioObj.play();
    this.stremObserver(this.url).subscribe(event => {});
  }

  setVolume(evn: any) {
    // console.log(evn.target.value);
    this.auduioObj.volume = evn.target.value;
  }

  addEvents(obj: any, events: any, handler: any) {
    events.forEach((event: any) => {
      obj.addEventListener(event, handler);
    });
  }

  removeEvents(obj: any, events: any, handler: any) {
    events.forEach((event: any) => {
      obj.removeEventListener(event, handler);
    });
  }

  stremObserver(url: string) {
    return new Observable(observer => {
      
      this.auduioObj.src = url;
      this.auduioObj.load();
      this.auduioObj.play();
      
      const handler = ( event: Event ) => {
        // console.log(event);
        this.seek = this.auduioObj.currentTime;
        this.durationInsec = this.auduioObj.duration;
        this.duration = this.timeFormat(this.auduioObj.duration);
        this.currentTime = this.timeFormat(this.auduioObj.currentTime);
      }

      this.addEvents(this.auduioObj, this.audioEvents, handler);

      return () => {
        this.auduioObj.pause();
        this.auduioObj.currentTime = 0;

        this.removeEvents(this.auduioObj, this.audioEvents, handler);
      }
    });
  }

  timeFormat(time: any, format="HH:mm:ss") {
    const momentTime = time * 1000;
    return moment.utc(momentTime).format(format);
  }

  setSeekTo(evnt: any) {
    this.auduioObj.currentTime = evnt.target.value;
  }

}
