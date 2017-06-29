import { Injectable } from '@angular/core';
import 'rxjs/Rx';
import {Http, Headers} from "@angular/http";

@Injectable()
export class RegistrationService {
  http: any;
  baseURL: string;
  baseURLStudents: string;
  header = new Headers();

  constructor(http: Http) {
    this.http = http;
    this.baseURL = "http://localhost:3000/api/registrations";
    this.baseURLStudents = "http://localhost:3000/api/students";
    this.header.append("Content-Type", "application/json");

  }

  getRegistrations() {
    return this.http.get(this.baseURL)
      .map(res => res.json());
  }
  registerStudent(sId, cId) {
    return this.http.post(this.baseURLStudents + "/register?sId="+ sId + "&cId=" +cId, {} , {headers : this.header})
      .map(res => res.json());
  }
  unregisterStudent(sId, cId) {
    return this.http.delete(this.baseURLStudents + "/unregister?sId="+ sId + "&cId=" +cId, {} , {headers : this.header})
      .map(res => res.json());
  }
}

