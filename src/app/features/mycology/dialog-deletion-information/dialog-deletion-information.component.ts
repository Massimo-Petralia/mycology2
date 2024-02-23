import { Component, EventEmitter, Input, Output, Inject } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { Mushroom } from '../models/mycology.models';
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
  @Input() mushroom: Mushroom | null = null;

  delete = new EventEmitter();

  onDelete() {
    this.delete.emit();
  }

  closeDialog(del?: string) {
    this.dialogRef.close(del);
  }
}
