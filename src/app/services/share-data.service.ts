import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShareDataService {

  private users$ = new BehaviorSubject<any>([]);

  constructor() { }

  addUser(user) {
    let users = [user, ...[this.users$]];
    this.users$.next(users);
  }
  removeUser(user) {
    let users = this.users$.getValue().filter(u => u !== user);
    this.users$.next(users);
  }
  getUsers() {
    return this.users$.asObservable();
  }
}
