import {
  Component,
  EventEmitter,
  Input,
  Output,
  OnChanges,
  SimpleChanges,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Mushroom } from '../models/mycology.models';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatInputModule } from '@angular/material/input';
import { TextFieldModule } from '@angular/cdk/text-field';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { Notifications } from '../models/mycology.models';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { DialogDeletionInformationComponent } from '../dialog-deletion-information/dialog-deletion-information.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';
import { tooltip } from '../models/mycology-tooltip-data.model';

@Component({
  selector: 'app-form-mushroom',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatExpansionModule,
    MatInputModule,
    TextFieldModule,
    MatButtonModule,
    CommonModule,
    MatButtonToggleModule,
    MatDialogModule,
    DialogDeletionInformationComponent,
    MatTooltipModule,
    MatIconModule
  ],
  templateUrl: './form-mushroom.component.html',
  styleUrl: './form-mushroom.component.scss',
})
export class FormMushroomComponent implements OnChanges {
  constructor(private formbuilder: FormBuilder, public dialog: MatDialog) {}

  tooltip :Mushroom = tooltip

  @ViewChild('invalidFieldDialogBox') invalidFieldDialogBox!: TemplateRef<any>;

  @Input() mushroom!: Mushroom | null;

  @Input() notifications!: Notifications;

  @Output() save = new EventEmitter();

  @Output() delete = new EventEmitter();

  @Output() mushroomspecies = new EventEmitter<string>();

  subs = new Subscription();

  ngOnChanges(changes: SimpleChanges): void {
    const { mushroom } = changes;
    if (mushroom) {
      this.formMushroom.patchValue(this.mushroom!);
      this.mushroomspecies.emit(this.mushroom?.taxonomy.species!);
    }
  }

  formMushroom = this.formbuilder.group({
    id: this.mushroom?.id,
    iconographyID: this.mushroom?.iconographyID
      ? this.mushroom.iconographyID
      : undefined,
    taxonomy: this.formbuilder.group({
      species: this.formbuilder.control<string>('', Validators.required),
      gender: this.formbuilder.control<string>(''),
      family: this.formbuilder.control<string>(''),
      order: this.formbuilder.control<string>(''),
      commonName: this.formbuilder.control<string>(''),
      AA: this.formbuilder.control<string>(''),
    }),
    morphology: this.formbuilder.group({
      cap: this.formbuilder.control<string>(''),
      gills: this.formbuilder.control<string>(''),
      stalk: this.formbuilder.control<string>(''),
      flesh: this.formbuilder.control<string>(''),
    }),
    features: this.formbuilder.group({
      habitat: this.formbuilder.control<string>(''),
      edibility: this.formbuilder.control<string>(''),
      note: this.formbuilder.control<string>(''),
    }),
    microscopicFeatures: this.formbuilder.group({
      spores: this.formbuilder.control<string>(''),
      pileipellis: this.formbuilder.control<string>(''),
      cystidia: this.formbuilder.control<string>(''),
    }),
  });

  onSave() {
    if (!this.formMushroom.valid) {
      this.dialog.open(this.invalidFieldDialogBox);
    } else {
      this.save.emit();
    }
  }

  onDelete() {
    this.delete.emit();
  }

  openDialog() {
    let subs = new Subscription();
    const dialogRef = this.dialog.open(DialogDeletionInformationComponent, {
      data: { species: this.mushroom?.taxonomy.species },
    });

    subs = dialogRef.afterClosed().subscribe((result) => {
      if (result === 'delete') {
        this.onDelete();
      }
    });
  }
}
