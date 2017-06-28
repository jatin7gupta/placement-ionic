import { Injectable } from '@angular/core';
import 'rxjs/Rx';
import {Http, Headers} from "@angular/http";

@Injectable()
export class CompanyService {
  http: any;
  baseURL: string;


  constructor(http: Http) {
    this.http = http;
    this.baseURL = "http://localhost:3000/api/companies";

  }

  getCompanies() {
    return this.http.get(this.baseURL)
      .map(res => res.json());
  }
  updateCompany(company, date) {
    var header = new Headers();
    header.append("Content-Type", "application/json");
    let data = {
      "name" : company.name,
      "date_of_Placement" : date
    };
    let JSONPacket = JSON.stringify(data);
    console.log(JSONPacket);
    let companyId = company._id.toString();
    console.log(this.baseURL + "/update?id=" + companyId);
    return this.http.post(this.baseURL + "/update?id=" + companyId, JSONPacket, {headers : header})
      .map(res => res.json());
  }
  delateCompany(company) {
    var header = new Headers();
    header.append("Content-Type", "application/json");
    let companyId = company._id.toString();
    return this.http.delete(this.baseURL + "/remove?id=" + companyId, {}, {headers : header})
      .map(res => res.json());

  }
}
