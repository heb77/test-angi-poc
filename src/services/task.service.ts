import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Task } from "src/models/task.model";

@Injectable({ providedIn: 'root' })
export class TaskService {

    constructor(
        private http: HttpClient,
        private router: Router) { }

    routeZahlungsFormularTask(taskDefinitionKey: string, processInstanceId: string, id: string) {
        switch (taskDefinitionKey) {
            case 'maccSelection': return this.router.navigate(['zahlungsauftrag/processInstance/maccselection/processInstanceId/' + processInstanceId + '/id/' + id]);
            case 'inlandForm': return this.router.navigate(['zahlungsauftrag/processInstance/inland/processInstanceId/' + processInstanceId + '/id/' + id]);
            case 'auslandForm': return this.router.navigate(['zahlungsauftrag/processInstance/swift/processInstanceId/' + processInstanceId + '/id/' + id]);
            case 'docSigning': return this.router.navigate(['zahlungsauftrag/processInstance/docSigning/processInstanceId/' + processInstanceId + '/id/' + id]);
            case 'checkSignatures': return this.router.navigate(['zahlungsauftrag/processInstance/checkSignatures/processInstanceId/' + processInstanceId + '/id/' + id]);
            case 'resultForm': return this.router.navigate(['zahlungsauftrag/processInstance/result/processInstanceId/' + processInstanceId + '/id/' + id]);
            case 'errorForm': return this.router.navigate(['zahlungsauftrag/processInstance/error/processInstanceId/' + processInstanceId + '/id/' + id]);
            default: return this.router.navigate(['home']);
        }
    }

    fetchTasks(sortBy: string, sortOrder: string, firstResult: number, maxResults: number, taskDefinitionKey?: string, processInstanceId?: string, assignee?: string): Observable<any> {
        let queryParams = new HttpParams();
        queryParams = queryParams.append('sortBy', sortBy);
        queryParams = queryParams.append('sortOrder', sortOrder);
        queryParams = queryParams.append('firstResult', firstResult);
        queryParams = queryParams.append('maxResults', maxResults);
        if (taskDefinitionKey != null) {
            queryParams = queryParams.append('taskDefinitionKey', taskDefinitionKey);
        }
        if (processInstanceId != null) {
            queryParams = queryParams.append('processInstanceId', processInstanceId)
        }
        if (assignee != null) {
            queryParams = queryParams.append('assignee', assignee)
        }
        return this.http.get<Task[]>(environment.camundaBaseURL + '/task', {
            params: queryParams,
            observe: 'response'
        });
    }

    fetchTaskWithId(id: string): Observable<any> {
        return this.http.get<Task>(environment.camundaBaseURL + '/task/' + id, {
            observe: 'response'
        });
    }

    fetchProcessInstanceVars(processInstanceId: string): Observable<any> {
        return this.http.get(environment.camundaBaseURL + '/process-instance/' + processInstanceId + '/variables', {
            observe: 'response'
        });
    }

    submitTaskForm(id: string, data: any): Observable<any> {
        return this.http.post(environment.camundaBaseURL + '/task/' + id + '/submit-form', data, {
            headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
            observe: 'response'
        });
    }

    completeTask(id: string): Observable<any> {
        return this.http.post(environment.camundaBaseURL + '/task/' + id + '/complete', { "variables": {} }, {
            headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
            observe: 'response'
        })
    }

    deleteTask(data: any): Observable<any> {
        return this.http.post(environment.camundaBaseURL + '/process-instance/delete', { "deleteReason": "Following Tasks will be deleted", 'processInstanceIds': [data] }, {
            headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
            observe: 'response'
        })
    }

    // Funktion um einen Zahlungsauftrag zu erstellen
    createNewZahlungsauftrag(): Observable<any> {
        return this.http.post(environment.camundaBaseURL + '/process-definition/key/zahlungsauftrag/start', {
            "variables": {
                "personId": {
                    "value": "349456097",
                    "type": "string"
                }
            }
        }, {
            observe: 'response'
        })
    }
}