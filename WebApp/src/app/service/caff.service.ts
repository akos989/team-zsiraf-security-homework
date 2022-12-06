import { Injectable } from '@angular/core';
// @ts-ignore
import neutralCallJson from '../data/example-caff-neutral.json';
// @ts-ignore
import purchasedCaffJson from '../data/example-caff-purchased.json';
// @ts-ignore
import uploadedCallJson from '../data/example-caff-uploaded.json';
import { map, of, tap } from 'rxjs';
import { Caff } from '../model/caff.model';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Comment } from '../model/comment.model';
import { CreateCaffDto } from '../model/create-caff-dto';
import { ModifyCaffDto } from '../model/modify-caff-dto';
import { Form } from '@angular/forms';
import { FileSaverService } from 'ngx-filesaver';

const CAFF_BACKEND_URL = environment.apiUrl + '/Caff';
const COMMENT_BACKEND_URL = environment.apiUrl + '/Comment';

@Injectable({
  providedIn: 'root',
})
export class CaffService {
  allCaffs: Caff[] = [];

  constructor(
    private http: HttpClient,
    private fileSaverService: FileSaverService
  ) {}

  fetchAllCaff() {
    return this.http
      .get<Caff[]>(`${CAFF_BACKEND_URL}`)
      .pipe(tap((caffs) => this.saveDistinctCaffs(caffs)));
  }

  fetchUploadedCaff() {
    return this.http
      .get<Caff[]>(`${CAFF_BACKEND_URL}/created`)
      .pipe(tap((caffs) => this.saveDistinctCaffs(caffs)));
  }

  fetchPurchasedCaff() {
    return this.http
      .get<Caff[]>(`${CAFF_BACKEND_URL}/purchased`)
      .pipe(tap((caffs) => this.saveDistinctCaffs(caffs)));
  }

  fetchCaffById(id: string) {
    const cachedCaff = this.allCaffs.find((caff) => caff.id === id);
    if (cachedCaff) {
      return of(cachedCaff);
    }

    return this.http.get<Caff>(`${CAFF_BACKEND_URL}/${id}`);
  }

  purchaseCaff(caff: Caff) {
    return this.http.post(`${CAFF_BACKEND_URL}/${caff.id}`, {});
  }

  deleteCaff(caff: Caff) {
    return this.http.delete(`${CAFF_BACKEND_URL}/${caff.id}`).pipe(
      tap((_) => {
        const deletedIndex = this.allCaffs.indexOf(caff);
        this.allCaffs.slice(deletedIndex, 1);
      })
    );
  }

  downloadCaff(caff: Caff) {
    const header = { Accept: 'application/octet-stream' };
    return this.http
      .get(`${CAFF_BACKEND_URL}/download/${caff.id}`, { headers: header, responseType: "blob" })
      .subscribe((res: any) => {
        const blob = new Blob([res], {type: "application/octet-stream"});
        this.fileSaverService.save(blob, caff.title + '.caff');
      });
  }

  addCommentToCaff(caff: Caff, commentText: string) {
    const body = {
      text: commentText,
      caffId: caff.id,
    };
    console.log('service: ', body);
    return this.http.post<Comment>(`${CAFF_BACKEND_URL}/${caff.id}`, body);
  }

  deleteComment(comment: Comment) {
    return this.http.delete(`${COMMENT_BACKEND_URL}/${comment.id}`);
  }

  saveCaff(createCaffDto: FormData) {
    return this.http.post<Caff>(CAFF_BACKEND_URL, createCaffDto).pipe(
      tap((newCaff) => {
        this.allCaffs.push(newCaff);
      })
    );
  }

  modifyCaff(modifyCaffDto: ModifyCaffDto) {
    return this.http.put<Caff>(CAFF_BACKEND_URL, modifyCaffDto).pipe(
      tap((newCaff) => {
        const index = this.allCaffs.findIndex((caff) => caff.id === newCaff.id);
        this.allCaffs.splice(index, 1);
        this.allCaffs.push(newCaff);
      })
    );
  }

  private saveDistinctCaffs(newCaffs: Caff[]) {
    this.allCaffs.push(...newCaffs);
    this.allCaffs = [...new Set(this.allCaffs)];
  }
}
