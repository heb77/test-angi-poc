import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({ providedIn: 'root' })
export class ASBService {

    constructor(
        private http: HttpClient) { }

    validateSignPosDocument(id: string): Observable<any> {
        return this.http.get(environment.asbHost + '/s-signpos/documents/' + id + '/status', {
            observe: 'response'
        });
    }

    validateIBAN(value: any): Observable<any> {
        return this.http.post(environment.asbHostE + '/iban/validate', { "iban": value }, {
            observe: 'response'
        });
    }
}