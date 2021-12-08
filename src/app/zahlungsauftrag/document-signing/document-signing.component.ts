import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToasterPosition } from 'src/models/toast.model';
import { ASBService } from 'src/services/asb.service';
import { TaskService } from 'src/services/task.service';
import { ASBToastService } from 'src/services/toast.service';

@Component({
  selector: 'app-document-signing',
  templateUrl: './document-signing.component.html',
  styleUrls: ['./document-signing.component.css']
})
export class DocumentSigningComponent implements OnInit {
  processInstanceId: string = '';
  id: string = '';
  processInstanceVariables: any;
  isLoading: boolean = true;
  resultASB: any
  documentData: any
  signingUrl: string = ''
  docSignedData: string = ''
  taskDefinitionKey: string = ''

  constructor(
    private ASBToastService: ASBToastService,
    private route: ActivatedRoute,
    private router: Router,
    private taskService: TaskService,
    private asbService: ASBService) { }

  ngOnInit() {
    this.ASBToastService.asbInfoToastr('Data loaded', 'Information', ToasterPosition.bottomLeft, 2000, true)
    this.processInstanceId = this.route.snapshot.params['processInstanceId']
    this.id = this.route.snapshot.params['id']

    this.getProcessInstanceVars(this.processInstanceId);
  }

  getProcessInstanceVars(processInstanceId: string) {
    this.taskService.fetchProcessInstanceVars(processInstanceId).subscribe(data => {
      this.processInstanceVariables = data.body;

      this.documentData = JSON.parse(this.processInstanceVariables.documentZahlungsaufrag.value);
    }, error => {
      this.router.navigate(['home'])
      this.ASBToastService.asbErrorToastr(error.message, 'An Error Occured!', ToasterPosition.bottomLeft, 5000, true)
    }, () => {
      this.isLoading = false;
    })
  }

  validateSignedDoc() {
    this.asbService.validateSignPosDocument(this.documentData.signPos.taskId).subscribe((resp) => {
      this.docSignedData = resp.body.Data
    }, error => {
      this.router.navigate(['home'])
      this.ASBToastService.asbErrorToastr(error.message, 'An Error Occured!', ToasterPosition.bottomLeft, 5000, true)
    }, () => {
      if (this.docSignedData == 'Finished') {
        this.submitTask(this.id);
      } else {
        this.ASBToastService.asbWarningToastr('Please sign the Document!', 'Information', ToasterPosition.bottomLeft, 5000, true)
      }
    })
  }

  visitSigningURL() {
    this.signingUrl = this.documentData.signPos.signingUrl;
    window.open(this.signingUrl, '_blank');
  }

  submitTask(id: string) {
    this.taskService.submitTaskForm(id, {
      "variables": {
        "docSigned": {
          "type": "boolean",
          "value": true
        }
      }
    }).subscribe((data) => {
    }, error => {
      this.router.navigate(['home'])
      this.ASBToastService.asbErrorToastr(error.message, 'An Error Occured!', ToasterPosition.bottomLeft, 5000, true)
    }, () => {
      setTimeout(() => {
        this.ASBToastService.asbSuccessToastr('Document has been signed', 'Information', ToasterPosition.bottomLeft, 3000, true)
        this.fetchTaskWithProcessInstanceIdAsQP();
      }, 200);
    })
  }

  fetchTaskWithProcessInstanceIdAsQP() {
    this.taskService.fetchTasks('name', 'asc', 0, 1000, null, this.processInstanceId, null).subscribe(returnTask => {
      this.taskDefinitionKey = returnTask.body[0].taskDefinitionKey;
      this.id = returnTask.body[0].id;
    }, error => {
      this.router.navigate(['home'])
      this.ASBToastService.asbErrorToastr(error.message, 'An Error Occured!', ToasterPosition.bottomLeft, 5000, true)
    }, () => {
      this.taskService.routeZahlungsFormularTask(this.taskDefinitionKey, this.processInstanceId, this.id);
    })
  }
}
