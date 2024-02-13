import {
  Component,
  ElementRef,
  Input,
  ViewChild,
  OnChanges,
  SimpleChanges,
  OnInit, AfterViewInit
} from '@angular/core';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormArray,
  FormGroup,
} from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { IconographicContainer, Iconography } from '../models/mycology.models';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { TextFieldModule } from '@angular/cdk/text-field';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { CustomImgComponent } from '../custom-img/custom-img.component';
import { Store } from '@ngrx/store';
import * as MycologyActions from '../mycology-state/mycology.actions';


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
export class FormIconographyComponent implements OnChanges, AfterViewInit {
  @ViewChild('inputfile') inputfileElem!: ElementRef<HTMLInputElement>;
  constructor(private formBuilder: FormBuilder, private store: Store) {}

  @Input() iconographicContainer: IconographicContainer = {
    formiconographyarray: [],
  };

  formIconography = this.formBuilder.group({
    id: this.iconographicContainer?.id,
    formiconographyarray: this.formBuilder.array<FormGroup>([]),
  });

  get formiconographyarray() {
    return this.formIconography.get('formiconographyarray') as FormArray;
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.store.dispatch(MycologyActions.resetState());
    const { iconographicContainer } = changes;
    if (
      iconographicContainer &&
      this.iconographicContainer
    ) {
      
      this.formIconography.controls.id.patchValue(
        this.iconographicContainer.id
      );

      this.formIconography.controls.formiconographyarray.clear();

      this.iconographicContainer.formiconographyarray?.forEach(
        (iconography, index) => {
          let counter = index + 1;
          this.formIconography.controls.formiconographyarray.push(
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

  ngAfterViewInit(): void {
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
    this.inputfileElem.nativeElement.value = ''

  }

  removeControl(index: number) {
    this.formIconography.controls.formiconographyarray.removeAt(index);
  }
}
