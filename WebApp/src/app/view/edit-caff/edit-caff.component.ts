import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {Caff} from "../../model/caff.model";
import {CaffService} from "../../service/caff.service";
import {CreateCaffDto} from "../../model/create-caff-dto";
import {SuccessDialogComponent} from "../../dialog/success-dialog/success-dialog.component";
import {first} from "rxjs";
import {MatDialog} from "@angular/material/dialog";
import {ModifyCaffDto} from "../../model/modify-caff-dto";

@Component({
  selector: 'app-edit-caff',
  templateUrl: './edit-caff.component.html',
  styleUrls: ['./edit-caff.component.scss']
})
export class EditCaffComponent implements OnInit {
  mode = 'create';
  caff: Caff;
  files: File[] = [];

  nameFormControl = new FormControl('', [Validators.required]);
  priceFormControl = new FormControl('', [Validators.required, Validators.max(10000000), Validators.min(0)]);
  descriptionFormControl = new FormControl('', [Validators.required]);

  constructor(private router: Router,
              private caffService: CaffService,
              private route: ActivatedRoute,
              private dialog: MatDialog) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('id')) {
        this.mode = 'modify';

        const caffId = paramMap.get('id');
        if (caffId) {
          this.caffService.fetchCaffById(caffId);
        }
      } else {
        this.mode = 'create';
      }
    });
  }

  onSelect(event: any) {
    this.files.push(...event.addedFiles);
  }

  onDeleteButtonClick() {
    this.files.splice(0, 1);
  }

  onSaveButtonClick() {
    if (this.isFormValid()) {
      if (this.mode === 'create') {
        this.createCaffFile();
      } else {
        this.modifyCaffFile();
      }
    } else {
      this.markAllFormControlsDirtyAndTouched();
    }
  }

  createCaffFile() {
    const createCaffDto: CreateCaffDto = {
      title: this.nameFormControl.value,
      description: this.descriptionFormControl.value,
      price: this.priceFormControl.value,
    }

    this.caffService.saveCaff(createCaffDto)
      .subscribe(response => {
        this.openSuccessDialog();
      });
  }

  modifyCaffFile() {
    const modifyCaffDto: ModifyCaffDto = {
      id: this.caff?.id,
      title: this.nameFormControl.value,
      description: this.descriptionFormControl.value,
      price: this.priceFormControl.value,
    }

    this.caffService.modifyCaff(modifyCaffDto)
      .subscribe(response => {
        this.openSuccessDialog();
      });
  }

  openSuccessDialog() {
    let message = 'You have successfully saved a new CAFF file!';
    if (this.mode === 'modify') {
      message = 'You have successfully modified your CAFF file!'
    }

    const dialogRef = this.dialog.open(SuccessDialogComponent, {
      position: {
        top: '20rem',
      },
      data: {
        text: message,
      },
    });

    dialogRef.afterClosed().pipe(first()).subscribe(() => {
      if (this.mode === 'create') {
        this.router.navigate(['/client/uploaded']);
      } else {
        this.router.navigate(['/admin']);
      }
    });
  }

  isFormValid(): boolean {
    return this.nameFormControl.valid
      && this.priceFormControl.valid
      && this.descriptionFormControl.valid;
  }

  markAllFormControlsDirtyAndTouched() {
    this.nameFormControl.markAsTouched();
    this.nameFormControl.markAsDirty();
    this.priceFormControl.markAsDirty();
    this.priceFormControl.markAsTouched();
    this.descriptionFormControl.markAsTouched();
    this.descriptionFormControl.markAsDirty();
  }
}
