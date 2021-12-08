import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Task } from 'src/models/task.model';
import { ToasterPosition } from 'src/models/toast.model';
import { TaskService } from 'src/services/task.service';
import { ASBToastService } from 'src/services/toast.service';

@Component({
  selector: 'app-single-task',
  templateUrl: './single-task.component.html',
  styleUrls: ['./single-task.component.css']
})
export class SingleTaskComponent implements OnInit {
  singleTask: Task
  taskDefinitionKey = null
  isLoading: boolean = true
  deleteProcessInstanceIds: []
  id: string = ''
  processInstanceId: string = ''
  processInstanceVariables: any

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private taskService: TaskService,
    private ASBToastService: ASBToastService) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id']
    this.fetchTaskWithId(this.id);
  }

  fetchTaskWithId(id: string) {
    this.taskService.fetchTaskWithId(id).subscribe(task => {
      this.processInstanceId = task.body.processInstanceId;
      this.taskDefinitionKey = task.body.taskDefinitionKey;
      this.singleTask = task.body;
    }, error => {
      this.router.navigate(['home'])
      this.ASBToastService.asbErrorToastr(error.message, 'An Error Occured!', ToasterPosition.bottomLeft, 5000, true)
    }, () => {
      this.taskService.fetchProcessInstanceVars(this.processInstanceId).subscribe((data) => {
        this.processInstanceVariables = data.body
      }, error => {
        this.router.navigate(['home'])
        this.ASBToastService.asbErrorToastr(error.message, 'An Error Occured!', ToasterPosition.bottomLeft, 5000, true)
      }, () => {
        this.ASBToastService.asbInfoToastr('Data loaded', 'Information', ToasterPosition.bottomLeft, 2000, true)
        this.isLoading = false;
      })
    })
  }

  startTask() {
    this.taskService.routeZahlungsFormularTask(this.taskDefinitionKey, this.processInstanceId, this.id);
  }

  deleteTask() {
    this.taskService.deleteTask(this.processInstanceId).subscribe(data => {
    }, error => {
      this.router.navigate(['home'])
      this.ASBToastService.asbErrorToastr(error.message, 'An Error Occured!', ToasterPosition.bottomLeft, 5000, true)
    }, () => {
      this.router.navigate(['home'])
      this.ASBToastService.asbSuccessToastr('Task with ID: ' + this.processInstanceId + ' has been deleted!', 'Information', ToasterPosition.bottomLeft, 3500, true)
    })
  }

  backToTaskList() {
    this.router.navigate(['tasks'], { queryParams: { taskDefinitionKey: this.taskDefinitionKey } });
  }
}
