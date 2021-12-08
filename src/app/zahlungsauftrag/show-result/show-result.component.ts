import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Subscription } from 'rxjs';
import { ToasterPosition } from 'src/models/toast.model';
import { ASBService } from 'src/services/asb.service';
import { TaskService } from 'src/services/task.service';
import { ASBToastService } from 'src/services/toast.service';

@Component({
  selector: 'app-show-result',
  templateUrl: './show-result.component.html',
  styleUrls: ['./show-result.component.css']
})
export class ShowResultComponent implements OnInit {
  imgSrc = 'src/assets/img/amRichtigenOrt.png'
  imgAlt = 'amRichtigenOrt'

  constructor(
    private router: Router,
    private asbToastr: ASBToastService
  ) { }

  ngOnInit() {
    this.asbToastr.asbSuccessToastr('Task Completed', 'Hurrraaaa!', ToasterPosition.bottomLeft, 3000, true)
  }

  backHome() {
    this.router.navigate(['home'])
  }
}