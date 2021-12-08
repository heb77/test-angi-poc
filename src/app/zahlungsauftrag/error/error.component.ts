import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToasterPosition } from 'src/models/toast.model';
import { TaskService } from 'src/services/task.service';
import { ASBToastService } from 'src/services/toast.service';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent implements OnInit {
  processInstanceVariables: any
  processInstanceId: string = ''
  id: string = ''
  taskDefinitionKey: string
  isLoading: boolean = true

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private taskService: TaskService,
    private ASBToastService: ASBToastService) { }

  ngOnInit(): void {
    this.processInstanceId = this.route.snapshot.params['processInstanceId']
    this.id = this.route.snapshot.params['id']
    this.getProcessInstanceVars(this.processInstanceId);
  }

  getProcessInstanceVars(processInstanceId: string) {
    this.taskService.fetchProcessInstanceVars(processInstanceId).subscribe(data => {
      this.processInstanceVariables = data.body;
    }, error => {
      this.router.navigate(['home'])
      this.ASBToastService.asbErrorToastr(error.message, 'An Error Occured!', ToasterPosition.bottomLeft, 5000, true)
    }, () => {
      this.ASBToastService.asbInfoToastr('Data loaded', 'Information', ToasterPosition.bottomLeft, 2000, true)
      this.isLoading = false;
    });
  }

  backHome() {
    this.router.navigate(['home']);
  }
}