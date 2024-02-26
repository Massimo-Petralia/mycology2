import { Component, Inject } from '@angular/core';
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
export class DialogDeletionInformationComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public inputData: any,
    private dialogRef: MatDialogRef<DialogDeletionInformationComponent>
  ) {}

  closeDialog(del?: string) {
    this.dialogRef.close(del);
  }
}
