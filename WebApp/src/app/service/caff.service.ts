import {Injectable} from '@angular/core';
// @ts-ignore
import neutralCallJson from '../data/example-caff-neutral.json';
// @ts-ignore
import purchasedCaffJson from '../data/example-caff-purchased.json';
// @ts-ignore
import uploadedCallJson from '../data/example-caff-uploaded.json';
import {delay, of, tap} from "rxjs";
import {Caff} from "../model/caff.model";

@Injectable({
  providedIn: 'root'
})
export class CaffService {

  allCaffs: Caff[] = [];

  constructor() { }

  fetchAllCaff() {
    const neutralCaffs: Caff[] = neutralCallJson;
    return of(neutralCaffs).pipe(delay(3000), tap(caffs => {
      this.allCaffs.push(...caffs);
      this.allCaffs = [...new Set(this.allCaffs)];
    }));
  }

  fetchUploadedCaff() {
    const uploadedCaffs: Caff[] = uploadedCallJson;
    return of(uploadedCaffs).pipe(delay(1500), tap(caffs => {
      this.allCaffs.push(...caffs);
      this.allCaffs = [...new Set(this.allCaffs)];
    }));
  }

  fetchPurchasedCaff() {
    const purchasedCaffs: Caff[] = purchasedCaffJson;
    return of(purchasedCaffs).pipe(delay(2000), tap(caffs => {
      this.allCaffs.push(...caffs);
      this.allCaffs = [...new Set(this.allCaffs)];
    }));
  }

  getCaffById(id: string): Caff | undefined {
    const neutralCaffs: Caff[] = neutralCallJson;
    return neutralCaffs.find(caff => caff.id === id);
  }
}
