import {
  Component,
  ElementRef,
  Input,
  ViewChild,
  OnChanges,
  SimpleChanges,
  OnInit,
} from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormArray } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { IconographicContainer } from '../models/mycology.models';
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
export class FormIconographyComponent implements OnInit, OnChanges {
  @ViewChild('inputfile') inputfileElem!: ElementRef<HTMLInputElement>;
  constructor(private formBuilder: FormBuilder) {}

  @Input() iconographicContainer: IconographicContainer = {
    // id: undefined,
    // mushroomID: undefined,
    //haveIconography:
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

  ngOnChanges(changes: SimpleChanges): void {
    const { iconographicContainer } = changes;
    if (iconographicContainer) {
      this.iconographicContainer.formiconographyarray.forEach(
        (iconography, index) => {
          let counter = index + 1;
          (
            this.formIconography.controls.formiconographyarray as FormArray
          ).push(
            this.formBuilder.group({
              id: counter,
              imageURL: this.formBuilder.control<string>(iconography.imageURL),
              description: this.formBuilder.control<string>(
                iconography.description
              ),
            })
          );
        }
      );
    }
  }

  ngOnInit(): void {
    this.formIconography.controls.formiconographyarray.clear();
  }

  handleFiles() {
    const files = Array.from(
      this.inputfileElem.nativeElement.files as FileList
    );
    let counter: number =
      this.iconographicContainer.formiconographyarray.length !== 0
        ? this.iconographicContainer.formiconographyarray.length + 1
        : 1;
    for (let file of files) {
      const reader = new FileReader();
      reader.onload = (event: ProgressEvent<FileReader>) => {
        const imageURL = (event.target as FileReader).result as string;

        (this.formIconography.controls.formiconographyarray as FormArray).push(
          this.formBuilder.group({
            id: counter++,
            imageURL: this.formBuilder.control<string>(imageURL),
            description: this.formBuilder.control<string>(''),
          })
        );
      };
      reader.readAsDataURL(file);
    }
  }

removeControl(index: number){
  this.formIconography.controls.formiconographyarray.removeAt(index)
}

}
