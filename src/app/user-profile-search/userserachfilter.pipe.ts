import { Pipe, PipeTransform } from '@angular/core';
import { IUser } from '../user';

@Pipe({
  name: 'userserachfilter'
})
export class UserserachfilterPipe implements PipeTransform {

  transform(Users: IUser[], searchValue: any): IUser[] {
    if(!Users || !searchValue) {
      return Users;
    }
    return Users.filter(user => 
      user.name.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()) ||
      user.current_address.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()) ||
      user.foh.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()) ||
      user.mobile_number.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()) ||
      user.uan.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase())
    );
  }

}
