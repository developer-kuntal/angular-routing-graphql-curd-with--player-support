import { Component, OnInit } from '@angular/core';
import { Employee } from '../models/employee.model';

@Component({
  selector: 'app-list-employees',
  templateUrl: './list-employees.component.html',
  styleUrls: ['./list-employees.component.css']
})

export class ListEmployeesComponent implements OnInit {
  employess: Employee[] = [
    {
      id: 1,
      name: "Mark",
      gender: "Male",
      contactPreference: "Email",
      email: "mark@pragimtech.com",
      dateOfBirth: new Date("10/25/1988"),
      department: "IT",
      isActive: true,
      photoPath: 'assets/images/1.png'
    },
    {
      id: 2,
      name: "Mary",
      gender: "Female",
      contactPreference: "Email",
      phoneNumber: 2345978640,
      email: "mary@pragimtech.com",
      dateOfBirth: new Date("10/25/1998"),
      department: "IT",
      isActive: true,
      photoPath: 'assets/images/2.png'
    },
    {
      id: 2,
      name: "Bob",
      gender: "Male",
      contactPreference: "Email",
      phoneNumber: 2347978640,
      email: "bob@pragimtech.com",
      dateOfBirth: new Date("10/25/1998"),
      department: "IT",
      isActive: true,
      photoPath: 'assets/images/3.png'
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
