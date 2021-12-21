export class User {
    constructor(
      public name: string,
      public foh: string,
      public dob: Date,
      public gender: string,
      public primary_occupation: string,
      public current_address: string,
      public mobile_number: string,
      public uan: string,
      public profilePicPath?: string,
      public _id?: string,
      public created_at?: Date
    ){}
}
