import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Task } from 'src/models/task.model';
import { ToasterPosition } from 'src/models/toast.model';
import { TaskService } from 'src/services/task.service';
import { ASBToastService } from 'src/services/toast.service';

@Component({
  selector: 'app-tasklist',
  templateUrl: './tasklist.component.html',
  styleUrls: ['./tasklist.component.css']
})
export class TasklistComponent implements OnInit {
  Tasks: Task[] = []
  isLoading: boolean = true
  taskDefinitionKey = null

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private taskService: TaskService,
    private ASBToastService: ASBToastService) { }

  ngOnInit() {
    if (this.route.snapshot.queryParams.taskDefinitionKey != null) {
      this.taskDefinitionKey = this.route.snapshot.queryParams.taskDefinitionKey
    }
    this.fetchTasks();
  }

  openTask(id: string) {
    this.router.navigate(['singletask/' + id], { queryParams: { taskDefinitionKey: this.taskDefinitionKey } });
  }

  fetchTasks() {
    this.taskService.fetchTasks('created', 'desc', 0, 1000, this.taskDefinitionKey, null, null).subscribe(tasks => {
      this.Tasks = tasks.body;
    }, error => {
      this.router.navigate(['home'])
      this.ASBToastService.asbErrorToastr(error.message, 'An Error Occured!', ToasterPosition.bottomLeft, 5000, true)
    }, () => {
      this.isLoading = false;
    });
  }

  getAlertClasses(task: Task) {
    return {
      'alert-primary': task.taskDefinitionKey == 'maccSelection',
      'alert-info': task.taskDefinitionKey == 'inlandForm' || task.taskDefinitionKey == 'auslandForm',
      'alert-warning': task.taskDefinitionKey == 'docSigning',
      'alert-success': task.taskDefinitionKey == 'checkSignatures',
      'alert-danger': task.taskDefinitionKey == 'errorForm',
      'alert-secondary': task.taskDefinitionKey == null
    }
  }
}