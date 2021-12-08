import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Subject, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { ASBService } from 'src/services/asb.service';

@Component({
  selector: 'app-example',
  templateUrl: './example.component.html',
  styleUrls: ['./example.component.css']
})
export class ExampleComponent implements OnInit {
  searchSubscription = new Subscription
  searchSubject = new Subject<any>();
  behaviorSubject = new BehaviorSubject<boolean>(false);
  behaviorSubscription = new Subscription

  constructor(private ASBService: ASBService) { }

  ngOnInit() {
    this.behaviorSubscription = this.behaviorSubject.subscribe((data) => {
      console.log(data)
    }, error => {
      console.log(error)
    })

    this.searchSubscription = this.searchSubject.pipe(debounceTime(400), distinctUntilChanged()).subscribe((iban) => {
      this.IBANVALIDATIONTEST(iban);
    }, error => {
      console.log(error)
    })
  }

  onSearch(ibanValue: any) {
    let iban = ibanValue.target.value
    this.searchSubject.next(iban)
  }

  IBANVALIDATIONTEST(value: any) {
    this.ASBService.validateSignPosDocument(value).subscribe((ibanValResp) => {
      console.log(ibanValResp.body.Data)
      this.behaviorSubject.next(ibanValResp.body.Data)
    }, error => {
      console.log(error)
    })
  }

  ngOnDestroy() {
    this.searchSubscription.unsubscribe();
    this.behaviorSubscription.unsubscribe();
  }

}
