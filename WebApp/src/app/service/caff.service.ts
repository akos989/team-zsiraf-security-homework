import {Injectable} from '@angular/core';
// @ts-ignore
import neutralCallJson from '../data/example-caff-neutral.json';
// @ts-ignore
import purchasedCaffJson from '../data/example-caff-purchased.json';
// @ts-ignore
import uploadedCallJson from '../data/example-caff-uploaded.json';
import {of, tap} from "rxjs";
import {Caff} from "../model/caff.model";
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";

const BACKEND_URL = environment.apiUrl + '/Caff';

@Injectable({
  providedIn: 'root'
})
export class CaffService {

  allCaffs: Caff[] = [];

  constructor(private http: HttpClient) { }

  fetchAllCaff() {
    return this.http
      .get<Caff[]>(`${BACKEND_URL}`)
      .pipe(
        tap(caffs => this.saveDistinctCaffs(caffs))
      );
  }


  fetchUploadedCaff() {
    return this.http
      .get<Caff[]>(`${BACKEND_URL}/created`)
      .pipe(
        tap(caffs => this.saveDistinctCaffs(caffs))
      );

    // const uploadedCaffs: Caff[] = uploadedCallJson;
    // return of(uploadedCaffs).pipe(delay(1500), tap(caffs => {
    //   this.allCaffs.push(...caffs);
    //   this.allCaffs = [...new Set(this.allCaffs)];
    // }));
  }

  fetchPurchasedCaff() {
    return this.http
      .get<Caff[]>(`${BACKEND_URL}/purchased`)
      .pipe(
        tap(caffs => this.saveDistinctCaffs(caffs))
      );
    // const purchasedCaffs: Caff[] = purchasedCaffJson;
    // return of(purchasedCaffs).pipe(delay(2000), tap(caffs => {
    //   this.allCaffs.push(...caffs);
    //   this.allCaffs = [...new Set(this.allCaffs)];
    // }));
  }

  fetchCaffById(id: string) {
    const cachedCaff = this.allCaffs.find(caff => caff.id === id);
    if (cachedCaff) {
      return of(cachedCaff);
    }

    return this.http
      .get<Caff>(`${BACKEND_URL}/${id}`);
  }

  deleteCaff(caff: Caff) {
    return this.http
      .delete(`${BACKEND_URL}/${caff.id}`)
      .pipe(
        tap(_ => {
          const deletedIndex = this.allCaffs.indexOf(caff);
          this.allCaffs.slice(deletedIndex, 1);
        })
      )
  }

  private saveDistinctCaffs(newCaffs: Caff[]) {
    this.allCaffs.push(...newCaffs);
    this.allCaffs = [...new Set(this.allCaffs)];
  }
}
