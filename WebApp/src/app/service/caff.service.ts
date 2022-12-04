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

const CAFF_BACKEND_URL = environment.apiUrl + '/Caff';
const COMMENT_BACKEND_URL = environment.apiUrl + '/Comment';

@Injectable({
  providedIn: 'root'
})
export class CaffService {

  allCaffs: Caff[] = [];

  constructor(private http: HttpClient) { }

  fetchAllCaff() {
    return this.http
      .get<Caff[]>(`${CAFF_BACKEND_URL}`)
      .pipe(
        tap(caffs => this.saveDistinctCaffs(caffs))
      );
  }


  fetchUploadedCaff() {
    return this.http
      .get<Caff[]>(`${CAFF_BACKEND_URL}/created`)
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
      .get<Caff[]>(`${CAFF_BACKEND_URL}/purchased`)
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
      .get<Caff>(`${CAFF_BACKEND_URL}/${id}`);
  }

  purchaseCaff(caff: Caff ) {
    return this.http
      .post(`${CAFF_BACKEND_URL}/${caff.id}`, {});
  }

  deleteCaff(caff: Caff) {
    return this.http
      .delete(`${CAFF_BACKEND_URL}/${caff.id}`)
      .pipe(
        tap(_ => {
          const deletedIndex = this.allCaffs.indexOf(caff);
          this.allCaffs.slice(deletedIndex, 1);
        })
      )
  }

  addCommentToCaff(caff: Caff, commentText: string) {
    const body = {
      text: commentText,
      caffId: caff.id
    };

    return this.http
      .post(`${CAFF_BACKEND_URL}/${caff.id}`, body);
  }

  downloadCaff(caff: Caff) {
    // Todo: implement downloadCaff function
    return of(null);
  }

  private saveDistinctCaffs(newCaffs: Caff[]) {
    this.allCaffs.push(...newCaffs);
    this.allCaffs = [...new Set(this.allCaffs)];
  }
}
