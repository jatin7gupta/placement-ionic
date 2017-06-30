import {Injectable} from '@angular/core';
import 'rxjs/Rx';
import {Http, Headers} from "@angular/http";

@Injectable()
export class CompanyService {
  http: any;
  baseURL: string;
  header = new Headers();

  constructor(http: Http) {
    this.http = http;
    this.baseURL = "http://localhost:3000/api/companies";
    this.header.append("Content-Type", "application/json");
  }

  getCompanies() { //For calling a GET function
    return this.http.get(this.baseURL)
      .map(res => res.json());
  }

  updateCompany(company, date) { //For updating the Companies, required date and name of the company
    let data = {
      "name": company.name,
      "date_of_Placement": date
    };
    let JSONPacket = JSON.stringify(data); // To convert everything to JSON
    let companyId = company._id.toString();
    return this.http.post(this.baseURL + "/update?id=" + companyId, JSONPacket, {headers: this.header})
      .map(res => res.json());
  }

  deleteCompany(company) { //For deleting a company, required company ID
    let companyId = company._id.toString();
    return this.http.delete(this.baseURL + "/remove?id=" + companyId, {}, {headers: this.header})
      .map(res => res.json());
  }

  addCompany(name, date_of_Placement) { // For adding new companies, required name and date of placement
    let data = {
      "name": name,
      "date_of_Placement": date_of_Placement
    };
    let JSONPacket = JSON.stringify(data);
    return this.http.post(this.baseURL + "/add", JSONPacket, {headers: this.header})
      .map(res => res.json());
  }
}
