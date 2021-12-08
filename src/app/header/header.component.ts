import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToasterPosition } from 'src/models/toast.model';
import { TaskService } from 'src/services/task.service';
import { ASBToastService } from 'src/services/toast.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  loggedUser: string = 'Konstantinos Tsolakidis'
  userId: string = 'XD0735'

  constructor(
    private router: Router,
    private taskService: TaskService,
    private ASBToastService: ASBToastService) { }

  ngOnInit(): void {
  }

  routeToList() {
    this.router.navigateByUrl('/ThisComponentDoesNotExist', { skipLocationChange: true }).then(() => {
      this.router.navigate(['tasks'])
    })
  }

  createNewZahlungsauftrag() {
    for (let i = 0; i < 20; i++) {
      this.taskService.createNewZahlungsauftrag().subscribe((data) => {
      }, error => {
        this.router.navigate(['home'])
        this.ASBToastService.asbErrorToastr(error.message, 'An Error Occured!', ToasterPosition.bottomLeft, 5000, true)
      }, () => {
        this.ASBToastService.asbSuccessToastr('New Zahlungsauftrag has been created!', 'Information!', ToasterPosition.bottomLeft, 5000, true)
      })
    }
  }

}
