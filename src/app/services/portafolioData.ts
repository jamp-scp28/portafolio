import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable()
export class portafolioData{

    url: String = 'https://myprojects-37d11-default-rtdb.firebaseio.com/projects.json';
    data = [];

    httpOptions = {
        headers: new HttpHeaders({ 
          'Authorization':'AIzaSyDSa_qWTSPXo8V2M2FEg2pdFCG0uZkcReg',
          'origin': '*',
          'allowedHeaders': ['Content-Type', 'Authorization', 'Content-Length', 'X-Requested-With', 'Accept'],
          'methods': ['GET', 'PUT', 'POST', 'DELETE', 'OPTIONS'],
          'optionsSuccessStatus': '200' // some legacy browsers (IE11, various SmartTVs) choke on 204
        })
      };
    
    constructor(private http: HttpClient){
        
    }
    
    getData(){
        return this.http.get(`${this.url}`,this.httpOptions);
    }

}

//kk `

export interface IModal {
    id?:number;
    title?: string;
    media1?: string;
    media2?: string;
    media3?: string;
    description?: string;
    tags?: string;
    link?: string;
}