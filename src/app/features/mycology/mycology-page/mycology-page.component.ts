import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { FormMushroomComponent } from '../form-mushroom/form-mushroom.component';
import { IconographicContainer, Mushroom } from '../models/mycology.models';
import { FormIconographyComponent } from '../form-iconography/form-iconography.component';
import { Store } from '@ngrx/store';
import { MycologyState } from '../models/mycology.models';
import * as MycologyActions from '../mycology-state/mycology.actions';
import { ReactiveFormsModule } from '@angular/forms';
export interface MycologyPayload {
    mushroom: Mushroom;
    iconographicContaine: IconographicContainer|null
}
import { Router } from '@angular/router';
@Component({
  selector: 'app-mycology-page',
  standalone: true,
  imports: [
    FormMushroomComponent,
    FormIconographyComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './mycology-page.component.html',
  styleUrl: './mycology-page.component.scss',
})
export class MycologyPageComponent implements OnInit {
  constructor(private store: Store, private router: Router) {}

  @Input() set page(pagenumber: number) {
    this.currentpage = pagenumber;
  }

  @Input() set id(mushroomID: number) {
    this.mushroomID = mushroomID;
  }

  currentpage!: number;
  mushroomID!: number;
  mushroom!: Mushroom;

  @ViewChild(FormMushroomComponent)
  formMushroomComponent!: FormMushroomComponent;
  @ViewChild(FormIconographyComponent)
  formIconographyComponent!: FormIconographyComponent;

  ngOnInit(): void {}

  onCreate() {
    if(this.formIconographyComponent.formIconography.controls.formiconographyarray.length !==0) {
      const mushroom: Mushroom = {...this.formMushroomComponent.formMushroom.value as Mushroom, haveIconography : true }

      const createMushroomPayload= {
        mushroom: mushroom,
        iconographicContainer: 
          this.formIconographyComponent.formIconography.value as IconographicContainer,
      }
      this.store.dispatch(MycologyActions.createMushroomRequest(createMushroomPayload))
    } else {
      const mushroom: Mushroom = {...this.formMushroomComponent.formMushroom.value as Mushroom, haveIconography : false }
      const createMushroomPayload= {
        mushroom: mushroom,
        iconographicContainer: 
          this.formIconographyComponent.formIconography.value as IconographicContainer,
      }
      this.store.dispatch(MycologyActions.createMushroomRequest(createMushroomPayload))

    }
  
    this.router.navigate(['mushrooms/page', this.currentpage])
  }
}
