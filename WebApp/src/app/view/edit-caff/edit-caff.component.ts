import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from "@angular/forms";

@Component({
  selector: 'app-edit-caff',
  templateUrl: './edit-caff.component.html',
  styleUrls: ['./edit-caff.component.scss']
})
export class EditCaffComponent implements OnInit {
  files: File[] = [];

  nameFormControl = new FormControl('', [Validators.required]);
  priceFormControl = new FormControl('', [Validators.required, Validators.max(10000000), Validators.min(0)]);
  descriptionFormControl = new FormControl('', [Validators.required]);

  constructor() { }

  ngOnInit(): void {
  }

  onSelect(event: any) {
    this.files.push(...event.addedFiles);
  }

  onDeleteButtonClick() {
    this.files.splice(0, 1);
  }

  onSaveButtonClick() {

  }
}
