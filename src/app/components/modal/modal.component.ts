import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import IModalData from 'src/app/interfaces/IModalData';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent {
  constructor(
    public dialogRef: MatDialogRef<ModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IModalData,
  ) {}

  onCancel(): void {
    this.dialogRef.close();
  }

  onConfirm() {
    this.data.onConfirm();
  }
}
