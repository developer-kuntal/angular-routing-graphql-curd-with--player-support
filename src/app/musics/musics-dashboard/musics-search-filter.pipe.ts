import { Pipe, PipeTransform } from '@angular/core';
import { ISong } from '../song';

@Pipe({
  name: 'musicsSearchFilter'
})
export class MusicsSearchFilterPipe implements PipeTransform {

  transform(Songs: ISong[], searchValue: any): ISong[] {
    if(!Songs || !searchValue) {
      return Songs;
    }
    return Songs.filter(song => 
      song.name?.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()) ||
      song.album?.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()) ||
      song.artist?.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()) ||
      song.year?.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()) ||
      song.title?.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()) ||
      song.lyric?.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase())
    );
  }

}
