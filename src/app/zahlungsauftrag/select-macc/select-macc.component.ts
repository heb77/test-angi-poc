import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToasterPosition } from 'src/models/toast.model';
import { ClientInfo } from 'src/models/zahlungsauftrag/maccSelection/clientInfo.model';
import { MaccInfo } from 'src/models/zahlungsauftrag/maccSelection/maccInfo.model';
import { selectMaccVariables } from 'src/models/zahlungsauftrag/maccSelection/variables.model';
import { TaskService } from 'src/services/task.service';
import { ASBToastService } from 'src/services/toast.service';

@Component({
  selector: 'app-select-macc',
  templateUrl: './select-macc.component.html',
  styleUrls: ['./select-macc.component.css']
})
export class SelectMaccComponent implements OnInit {
  clientInfo: ClientInfo = {}
  maccInfo: MaccInfo = {}
  processInstanceVariables: any
  processInstanceId: string = ''
  id: string = ''
  taskDefinitionKey: string
  isLoading: boolean = true
  maccForm: FormGroup;
  submitData: selectMaccVariables

  constructor(
    private route: ActivatedRoute,
    private taskService: TaskService,
    private router: Router,
    private ASBToastService: ASBToastService) { }

  ngOnInit() {
    this.processInstanceId = this.route.snapshot.params['processInstanceId']
    this.id = this.route.snapshot.params['id']
    this.getProcessInstanceVars(this.processInstanceId);

    this.maccForm = new FormGroup({
      'maccs': new FormControl(null, [Validators.required, Validators.minLength(5)]),
      'paymentMethodSelect': new FormControl(null, [Validators.required])
    })
  }

  getProcessInstanceVars(processInstanceId: string) {
    this.taskService.fetchProcessInstanceVars(processInstanceId).subscribe(data => {
      this.processInstanceVariables = data.body;

      this.clientInfo = JSON.parse(this.processInstanceVariables.clientInfo.value);

      this.maccInfo = JSON.parse(this.processInstanceVariables.maccInfo.value);
    }, error => {
      this.router.navigate(['home'])
      this.ASBToastService.asbErrorToastr(error.message, 'An Error Occured!', ToasterPosition.bottomLeft, 5000, true)
    }, () => {
      this.ASBToastService.asbInfoToastr('Data loaded', 'Information', ToasterPosition.bottomLeft, 2000, true)
      this.isLoading = false;
    });
  }

  onSubmit(taskFormData: any) {
    this.submitData = {
      "variables": {
        "zahlungstyp": {
          "type": "string",
          "value": taskFormData.paymentMethodSelect
        },
        "positionId": {
          "type": "string",
          "value": taskFormData.maccs.positionId
        },
        "positionName": {
          "type": "string",
          "value": taskFormData.maccs.name
        }
      }
    }
    this.submitTask(this.id, this.submitData);
  }

  submitTask(id: string, data: selectMaccVariables) {
    this.taskService.submitTaskForm(id, data).subscribe(responseData => {
    }, error => {
      this.router.navigate(['home'])
      this.ASBToastService.asbErrorToastr(error.message, 'An Error Occured!', ToasterPosition.bottomLeft, 5000, true)
    }, () => {
      this.ASBToastService.asbSuccessToastr('Account selection has been submited', 'Information', ToasterPosition.bottomLeft, 3000, true)
      this.fetchTaskWithProcessInstanceIdAsQP();
    })
  }

  fetchTaskWithProcessInstanceIdAsQP() {
    this.taskService.fetchTasks('name', 'asc', 0, 19, null, this.processInstanceId, null).subscribe(returnTask => {
      this.taskDefinitionKey = returnTask.body[0].taskDefinitionKey;
      this.id = returnTask.body[0].id;
    }, error => {
      this.router.navigate(['home'])
      this.ASBToastService.asbErrorToastr(error.message, 'An Error Occured!', ToasterPosition.bottomLeft, 5000, true)
    }, () => {
      this.taskService.routeZahlungsFormularTask(this.taskDefinitionKey, this.processInstanceId, this.id);
    })
  }

  backToTaskList() {
    this.router.navigate(['home']);
  }
}
