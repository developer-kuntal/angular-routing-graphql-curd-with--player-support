import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { GraphqlMusicApiService } from '../graphql-music-api.service';
// import { ISong } from '../song'; // Use Model Here  to Update (Tommorow Task)
import { Song } from 'src/app/models/song.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-music-metatag-edit',
  templateUrl: './music-metatag-edit.component.html',
  styleUrls: ['./music-metatag-edit.component.css']
})
export class MusicMetatagEditComponent implements OnInit, OnDestroy {

  // song: any; 
  loading = true;
  error: any;

  public song = new Song();

  private querySubscription: Subscription | undefined;
  
  constructor(private _gqlMusicService: GraphqlMusicApiService, private router: ActivatedRoute) { }

  ngOnInit(): void {
    let id = this.router.snapshot.paramMap.get('id');
    this.song.id = id;
    this.querySubscription = this._gqlMusicService.getSongMetaInfoById(id).subscribe(
      (data: Song) => {
        Object.assign(this.song, data);
        this.loading = false;
        // console.log(data);
      },
      error => this.error = error
    )
  }

  ngOnDestroy() {
    this.querySubscription?.unsubscribe();
  }

  onSubmit(editSongForm: NgForm) {
    // console.log("Edit Song Metatag: ",this.song);
    this._gqlMusicService.upadteSongById(this.song).subscribe(
      data =>{
        console.log('Update Success!', data?.updateSongbyId),
        editSongForm.reset(data?.updateSongbyId);
      },
      error => console.error('Error!', error)
    )
  }

}
