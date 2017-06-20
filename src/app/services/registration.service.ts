import { Injectable } from '@angular/core';
import 'rxjs/Rx';
import {Http} from "@angular/http";

@Injectable()
export class RegistrationService {
  http: any;
  baseURL: string;

  constructor(http: Http) {
    this.http = http;
    this.baseURL = "http://localhost:3000/api/registrations";
  }

  getRegistrations() {
    return this.http.get(this.baseURL)
      .map(res => res.json());
  }
}
