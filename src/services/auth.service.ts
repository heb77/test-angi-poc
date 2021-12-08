import { Injectable } from "@angular/core";
import { BehaviorSubject, ReplaySubject, Subject } from "rxjs";

@Injectable({ providedIn: 'root' })
export class AuthService {
    userSubject = new Subject<boolean>();
    userReplaySubject = new ReplaySubject<boolean>();
    userBehaviorSubject = new BehaviorSubject<boolean>(true);

    constructor() { }

    /*     createDummyUser() {
            const expirationDate = new Date(new Date().getTime() + 1800000)
            const newUser = new User('konstantinos@test.ch', 'Konstantinos', 'Tsolakidis', 'thisisatesttoken', expirationDate)
            this.user.next(newUser)
        } */
}