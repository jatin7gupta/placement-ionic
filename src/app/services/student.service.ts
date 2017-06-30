import {Injectable} from '@angular/core';
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

  getStudents() { //For getting the list of students through GET function
    return this.http.get(this.baseURL)
      .map(res => res.json());
  }

  modifyStudent(student) { //For updating the students with their respective data.
    let data = {
      "name": student.name,
      "department": student.department,
      "rollno": student.rollno.toString(),
      "cgpa": student.cgpa.toString()
    };
    let JSONPacket = JSON.stringify(data);
    let studentId = student._id.toString();
    return this.http.post(this.baseURL + "/update?id=" + studentId, JSONPacket, {headers: this.header})
      .map(res => res.json());
  }

  deleteStudent(student) { //For Deleting the students
    let studentId = student._id.toString();
    return this.http.delete(this.baseURL + "/remove?id=" + studentId, {}, {headers: this.header})
      .map(res => res.json());
  }

  addStudent(name, rollno, cgpa, department) { //For adding the students with their respective data.
    let data = {
      "name": name,
      "department": department,
      "rollno": rollno.toString(),
      "cgpa": cgpa.toString()
    };
    let JSONPacket = JSON.stringify(data);
    return this.http.post(this.baseURL + "/add", JSONPacket, {headers: this.header})
      .map(res => res.json());
  }
}
