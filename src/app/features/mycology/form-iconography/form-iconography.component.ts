import {
  Component,
  ElementRef,
  Input,
  ViewChild,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormArray } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { IconographicContainer, Iconography } from '../models/mycology.models';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { TextFieldModule } from '@angular/cdk/text-field';
import { MatButtonModule } from '@angular/material/button';
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
  ],
  templateUrl: './form-iconography.component.html',
  styleUrl: './form-iconography.component.scss',
})
export class FormIconographyComponent implements OnChanges {
  @ViewChild('inputfile') inputfileElem!: ElementRef<HTMLInputElement>;
  constructor(private formBuilder: FormBuilder) {}

  @Input() iconographicContainer: IconographicContainer = {
    // id: undefined,
    // mushroomID: undefined,
    iconographyarray: [],
  };

  formIconography = this.formBuilder.group({
    //  id: undefined,
    //  mushroomID: undefined,
    formiconographyarray: this.formBuilder.array([]),
  });

  get formiconographyarray() {
    return this.formIconography.get('formiconographyarray') as FormArray;
  }

  ngOnChanges(changes: SimpleChanges): void {}

  handleFiles() {
    const files = Array.from(
      this.inputfileElem.nativeElement.files as FileList
    );
    let counter: number = this.iconographicContainer.iconographyarray
      ? this.iconographicContainer.iconographyarray.length + 1
      : 1;
    for (let file of files) {
      const reader = new FileReader();
      reader.onload = (event: ProgressEvent<FileReader>) => {
        const imageURL = (event.target as FileReader).result as string;
        const iconography: Iconography = {
          id: counter++,
          description: '',
          imageURL: imageURL,
        };
        const control = this.formBuilder.control<string>(
          iconography.description
        );
        this.formiconographyarray.push(control);
        this.iconographicContainer = {
          ...this.iconographicContainer,
          iconographyarray: [
            ...this.iconographicContainer.iconographyarray,
            iconography,
          ],
        };
      };
      reader.readAsDataURL(file);
    }
  }
}
