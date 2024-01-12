import { Component, Input } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Mushroom } from '../models/mycology.models';
import { MatExpansionModule } from '@angular/material/expansion'

@Component({
  selector: 'app-form-mushroom',
  standalone: true,
  imports: [ReactiveFormsModule, MatExpansionModule],
  templateUrl: './form-mushroom.component.html',
  styleUrl: './form-mushroom.component.scss',
})
export class FormMushroomComponent {
  constructor(private formbuilder: FormBuilder) {}
  @Input() mushroom!: Mushroom;

  formMushroom = this.formbuilder.group({
    taxonomy: this.formbuilder.group({
      species: this.formbuilder.control<string>('', Validators.required),
      AA: this.formbuilder.control<string>(''),
      gender: this.formbuilder.control<string>(''),
      family: this.formbuilder.control<string>(''),
      synonymous: this.formbuilder.control<string>(''),
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
}
