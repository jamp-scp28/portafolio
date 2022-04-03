import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable()
export class routingServices{
    private emittedRoute = new Subject<any>();
    changedEmitted$ = this.emittedRoute.asObservable();
    emmitChange(change: any){
        this.emittedRoute.next(change);
    }
}