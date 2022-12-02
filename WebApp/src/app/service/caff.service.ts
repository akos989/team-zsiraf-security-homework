import { Injectable } from '@angular/core';
// @ts-ignore
import neutralCallJson from '../data/example-caff-neutral.json';
// @ts-ignore
import purchasedCaffJson from '../data/example-caff-purchased.json';
// @ts-ignore
import uploadedCallJson from '../data/example-caff-uploaded.json';
import {delay, of} from "rxjs";
import {Caff} from "../model/caff.model";

@Injectable({
  providedIn: 'root'
})
export class CaffService {

  constructor() { }

  fetchAllCaff() {
    const neutralCaffs: Caff[] = neutralCallJson;
    return of(neutralCaffs).pipe(delay(3000));
  }

  fetchUploadedCaff() {
    const uploadedCaffs: Caff[] = uploadedCallJson;
    return of(uploadedCaffs).pipe(delay(1500));
  }

  fetchPurchasedCaff() {
    const purchasedCaffs: Caff[] = purchasedCaffJson;
    return of(purchasedCaffs).pipe(delay(2000));
  }
}
