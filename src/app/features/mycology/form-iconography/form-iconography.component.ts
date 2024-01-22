import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormArray } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { IconographicContainer, Iconography } from '../models/mycology.models';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { TextFieldModule } from '@angular/cdk/text-field';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { CustomImgComponent } from '../custom-img/custom-img.component';
@Component({
  selector: 'app-form-iconography',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatInputModule,
    TextFieldModule,
    MatButtonModule,
    MatExpansionModule,
    CustomImgComponent,
  ],
  templateUrl: './form-iconography.component.html',
  styleUrl: './form-iconography.component.scss',
})
export class FormIconographyComponent {
  @ViewChild('inputfile') inputfileElem!: ElementRef<HTMLInputElement>;
  constructor(private formBuilder: FormBuilder) {}

  @Input() iconographicContainer: IconographicContainer = {
    // id: undefined,
    // mushroomID: undefined,
    formiconographyarray: [],
  };

  formIconography = this.formBuilder.group({
    //  id: undefined,
    //  mushroomID: undefined,
    formiconographyarray: this.formBuilder.array([]),
  });

  get formiconographyarray() {
    return this.formIconography.get('formiconographyarray') as FormArray;
  }

  handleFiles() {
    const files = Array.from(
      this.inputfileElem.nativeElement.files as FileList
    );
    let counter: number = this.iconographicContainer.formiconographyarray
      ? this.iconographicContainer.formiconographyarray.length + 1
      : 1;
    for (let file of files) {
      const reader = new FileReader();
      reader.onload = (event: ProgressEvent<FileReader>) => {
        const imageURL = (event.target as FileReader).result as string;
       
        (this.formIconography.controls.formiconographyarray as FormArray).push(this.formBuilder.group({
          imageURL: this.formBuilder.control<string>(imageURL),
          description: this.formBuilder.control<string>('')
        }))

      };
      reader.readAsDataURL(file);
    }
  }
}
