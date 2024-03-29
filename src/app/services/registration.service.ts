import {Injectable} from '@angular/core';
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

  getRegistrations() { //For calling GET function for registrations
    return this.http.get(this.baseURL)
      .map(res => res.json());
  }

  registerStudent(sId, cId) { //For registering a student to company with post function, required student ID and Company ID
    return this.http.post(this.baseURLStudents + "/register?sId=" + sId + "&cId=" + cId, {}, {headers: this.header})
      .map(res => res.json());
  }

  unregisterStudent(sId, cId) { //For unregistering a student to company with delete function, required student ID and Company ID
    return this.http.delete(this.baseURLStudents + "/unregister?sId=" + sId + "&cId=" + cId, {}, {headers: this.header})
      .map(res => res.json());
  }
}

