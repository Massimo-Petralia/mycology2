import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { IconographicContainer, Mushroom } from '../models/mycology.models';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatInputModule } from '@angular/material/input';
import { TextFieldModule } from '@angular/cdk/text-field';
import { MatButtonModule } from '@angular/material/button';
import { FormIconographyPageComponent } from '../form-iconography-page/form-iconography-page.component';
import { FormIconographyComponent } from '../form-iconography/form-iconography.component';

@Component({
  selector: 'app-form-mushroom',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatExpansionModule,
    MatInputModule,
    TextFieldModule,
    MatButtonModule,
    FormIconographyPageComponent
  ],
  templateUrl: './form-mushroom.component.html',
  styleUrl: './form-mushroom.component.scss',
})
export class FormMushroomComponent {
  constructor(private formbuilder: FormBuilder) {}
@ViewChild('FormIconographyComponent') formIconographyComponent!: FormIconographyComponent

  @Input() mushroom!: Mushroom;

  @Output() create = new EventEmitter<Mushroom>();

  formMushroom = this.formbuilder.group({
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

  onCreate() {
    const iconographicContainer: IconographicContainer = {iconographyarray: this.formIconographyComponent.formiconographyarray.value}
    if (!this.formMushroom.valid) {
      window.alert(
        'You must specify a name in the Species field of the Taxonomy form'
      );
      return;
    } else {
      //this.create.emit(this.formMushroom.value)
    }
  }
}
