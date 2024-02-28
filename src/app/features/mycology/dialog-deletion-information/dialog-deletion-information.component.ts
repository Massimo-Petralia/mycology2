import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-deletion-information',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule],
  templateUrl: './dialog-deletion-information.component.html',
  styleUrl: './dialog-deletion-information.component.scss',
})
export class DialogDeletionInformationComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public inputData: any,
    private dialogRef: MatDialogRef<DialogDeletionInformationComponent>
  ) {}

  text: string = '';
  ngOnInit(): void {
    console.log('data: ', this.inputData);
    if (this.inputData instanceof Array) {
      this.text = `Do you want to <strong>delete</strong> the <strong>selected mushrooms</strong> ?<br>
      This operation will also <strong>delete</strong> the
      <strong>iconographic galleries</strong> if present.`;
    } else if (typeof this.inputData.species === 'string') {
      this.text = `  Do you want to <strong>delete</strong> the mushroom
    <strong>${this.inputData.species}</strong> ?<br> This operation will also <strong>delete</strong> the
    <strong>iconographic gallery</strong> if present.`;
    }
  }

  closeDialog(del?: string) {
    this.dialogRef.close(del);
  }
}
