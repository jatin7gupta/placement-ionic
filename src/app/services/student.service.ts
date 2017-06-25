import { Injectable } from '@angular/core';
import 'rxjs/Rx';
import {Http, Headers} from "@angular/http";

@Injectable()
export class StudentService {
  http: any;
  baseURL: string;
  header = new Headers();

  constructor(http: Http) {
    this.http = http;
    this.baseURL = "http://localhost:3000/api/students";
    this.header.append("Content-Type", "application/json");
  }

  getStudents() {
    return this.http.get(this.baseURL)
      .map(res => res.json());
  }
  modifyStudent(student) {
    let data = {
      "name" : student.name,
      "department" : student.department,
      "rollno" : student.rollno.toString(),
      "cgpa" : student.cgpa.toString()
    };
    let JSONPacket = JSON.stringify(data);
    console.log(JSONPacket);
    let studentId=student._id.toString();
    return this.http.post(this.baseURL + "/update?id=" + studentId, JSONPacket, {headers : this.header})
      .map(res => res.json());
  }
  deleteStudent(student) {
    let studentId = student._id.toString();
    return this.http.delete(this.baseURL + "/remove?id=" + studentId, {} , {headers : this.header})
      .map(res => res.json());
  }
  addStudent(name, rollno, cgpa, department) {
    let data = {
      "name" : name,
      "department" : department,
      "rollno" : rollno.toString(),
      "cgpa" : cgpa.toString()
    };
    let JSONPacket = JSON.stringify(data);
    return this.http.post(this.baseURL + "/add", JSONPacket , {headers : this.header})
      .map(res => res.json());
  }
}
