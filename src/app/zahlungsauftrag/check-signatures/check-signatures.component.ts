import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToasterPosition } from 'src/models/toast.model';
import { TaskService } from 'src/services/task.service';
import { ASBToastService } from 'src/services/toast.service';

@Component({
  selector: 'app-check-signatures',
  templateUrl: './check-signatures.component.html',
  styleUrls: ['./check-signatures.component.css']
})
export class CheckSignaturesComponent implements OnInit {
  processInstanceId: string = ''
  id: string = ''
  processInstanceVariables: any
  isLoading: boolean = true
  signBaseURL: string = ''
  signBaseToken: any
  signBaseURLComplete: string = ''
  signedDoc: any
  clientInfo: any
  signedDocBase64: any
  signatureMatch: boolean = true

  constructor(
    private ASBToastService: ASBToastService,
    private route: ActivatedRoute,
    private router: Router,
    private taskService: TaskService
  ) { }

  ngOnInit() {
    this.ASBToastService.asbInfoToastr('Data loaded', 'Information', ToasterPosition.bottomLeft, 2000, true)
    this.processInstanceId = this.route.snapshot.params['processInstanceId']
    this.id = this.route.snapshot.params['id']

    this.getProcessInstanceVars(this.processInstanceId);

  }

  getProcessInstanceVars(processInstanceId: string) {
    this.taskService.fetchProcessInstanceVars(processInstanceId).subscribe(data => {
      this.processInstanceVariables = data.body;

      this.signBaseURL = this.processInstanceVariables.signBaseURL.value
      this.signBaseToken = JSON.parse(this.processInstanceVariables.signBaseToken.value);
      this.signBaseURLComplete = this.signBaseURL + this.signBaseToken.token
      this.clientInfo = JSON.parse(this.processInstanceVariables.clientInfo.value);

      this.signedDoc = JSON.parse(this.processInstanceVariables.signedDocument.value);

    }, error => {
      this.router.navigate(['home'])
      this.ASBToastService.asbErrorToastr(error.message, 'An Error Occured!', ToasterPosition.bottomLeft, 5000, true)
    }, () => {
      this.signedDocBase64 = 'data:application/pdf;base64,' + this.signedDoc.documentSignedBase64
      this.isLoading = false;
    })
  }

  showPDF() {
    const downloadLink = document.createElement('a');
    downloadLink.href = 'data:application/pdf;base64,' + this.signedDoc.documentSignedBase64
    downloadLink.download = this.clientInfo.vorname + '-' + this.clientInfo.nachname + '-' + 'signedDoc.pdf';
    downloadLink.click();
  }

  visitSignBase() {
    window.open(this.signBaseURLComplete, '_blank');
  }

  submitTask() {
    this.taskService.submitTaskForm(this.id, {
      "variables": {
        "signCheck": {
          "type": "boolean",
          "value": true
        }
      }
    }).subscribe((data) => {
    }, error => {
      this.router.navigate(['home'])
      this.ASBToastService.asbErrorToastr(error.message, 'An Error Occured!', ToasterPosition.bottomLeft, 5000, true)
    }, () => {
      if (this.signatureMatch) {
        setTimeout(() => {
          this.ASBToastService.asbSuccessToastr('Signatures successfully crosschecked', 'Information', ToasterPosition.bottomLeft, 3000, true)
          this.router.navigate(['zahlungsauftrag/result/success'])
        }, 200);
      } else {
        this.ASBToastService.asbErrorToastr('Signatures did not match!', 'Task canceled!', ToasterPosition.bottomLeft, 3000, true)
        this.router.navigate(['home'])
      }
    })
  }
}
