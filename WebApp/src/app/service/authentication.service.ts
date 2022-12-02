import { Injectable } from '@angular/core';
import {Subject} from "rxjs";
import {AuthenticationType} from "../model/authentication-type.enum";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  authenticationType = new Subject<AuthenticationType>();

  constructor() { }

  login() {
    this.authenticationType.next(AuthenticationType.user);
  }
}
