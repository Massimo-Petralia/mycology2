import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
  OnInit,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { IconographicContainer, Mushroom } from '../models/mycology.models';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatInputModule } from '@angular/material/input';
import { TextFieldModule } from '@angular/cdk/text-field';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

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
  ],
  templateUrl: './form-mushroom.component.html',
  styleUrl: './form-mushroom.component.scss',
})
export class FormMushroomComponent implements OnChanges {
  constructor(private formbuilder: FormBuilder) {}

  @Input() mushroom!: Mushroom | null;

  @Output() save = new EventEmitter();

  @Output() delete = new EventEmitter();

  //@Output() update = new EventEmitter();

  ngOnChanges(changes: SimpleChanges): void {
    const { mushroom } = changes;
    if (mushroom) {
      this.formMushroom.patchValue(this.mushroom!);
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
      synonymous: this.formbuilder.control<string>(''),
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
      window.alert(
        'You must specify a name in the Species field of the Taxonomy form'
      );
      return;
    } else {
      this.save.emit();
    }
  }

  // onUpdate() {
  //   this.update.emit();
  // }

  onDelete() {
    this.delete.emit();
  }
}
