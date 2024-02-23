import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { Mushroom } from '../models/mycology.models';

@Component({
  selector: 'app-dialog-deletion-information',
  standalone: true,
  imports: [MatDialogModule],
  templateUrl: './dialog-deletion-information.component.html',
  styleUrl: './dialog-deletion-information.component.scss',
})
export class DialogDeletionInformationComponent {
  @Input() mushroom?: Mushroom;

  @Output() delete = new EventEmitter();

  @Output() closeall = new EventEmitter();

  onDelete() {
    this.delete.emit();
  }

  onClose() {
    this.closeall.emit();
  }
}
