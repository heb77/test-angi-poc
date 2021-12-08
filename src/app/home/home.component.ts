import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Task } from 'src/models/task.model';
import { ToasterPosition } from 'src/models/toast.model';
import { ASBService } from 'src/services/asb.service';
import { TaskService } from 'src/services/task.service';
import { ASBToastService } from 'src/services/toast.service';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { BehaviorSubject, Subject, Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  Tasks: Task[]
  isLoading: boolean = true
  taskDefinitionKey = null


  constructor(
    private taskService: TaskService,
    private router: Router,
    private ASBToastService: ASBToastService,
    private ASBService: ASBService,
  ) { }

  ngOnInit() {
    this.fetchTasks();
  }

  fetchTasks() {
    this.taskService.fetchTasks('name', 'asc', 0, 1000, null, null, null).subscribe(tasks => {
      this.Tasks = tasks.body;
    }, error => {
      this.router.navigate(['home'])
      this.ASBToastService.asbErrorToastr(error.message, 'An Error Occured!', ToasterPosition.bottomLeft, 5000, true)
    }, () => {
      this.isLoading = false;
    });
  }

  refreshComponent() {
    let currentUrl = this.router.url;
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload'
    this.router.navigate([currentUrl])
  }

  routeToList(taskKey: string) {
    this.router.navigate(['tasks'], { queryParams: { taskDefinitionKey: taskKey } })
  }

}