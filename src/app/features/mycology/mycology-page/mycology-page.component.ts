import { Component, OnInit, Input, ViewChild, AfterViewInit, OnDestroy, OnChanges, SimpleChanges } from '@angular/core';
import { FormMushroomComponent } from '../form-mushroom/form-mushroom.component';
import { IconographicContainer, Mushroom } from '../models/mycology.models';
import { FormIconographyComponent } from '../form-iconography/form-iconography.component';
import { Store } from '@ngrx/store';
import { MycologyState } from '../models/mycology.models';
import * as MycologyActions from '../mycology-state/mycology.actions';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import {
  selectMushroomFeature,
  selectIconographyFeature,
} from '../mycology-state/mycology.selectors';
import { Observable, Subscription } from 'rxjs';
import { MycologyService } from '../services/mycology.service';

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
export class MycologyPageComponent implements OnInit, OnChanges, OnDestroy{
  constructor(private store: Store<MycologyState>, private router: Router, private mycologyService: MycologyService ) {}

  @Input() set page(pagenumber: number) {
    this.currentpage = pagenumber;
  }

  @Input() set id(mushroomID: string) {
   this.mushroomID = mushroomID
  //  this.mycologyService.getMushroom(mushroomID).subscribe(mushroom=> {
  //   this.formMushroomComponent.formMushroom.patchValue(mushroom)
  //  })


  }

  mushroom$ = this.store.select(selectMushroomFeature);
  iconographicContainer$!: Observable<IconographicContainer|undefined>;

  currentpage!: number;
  mushroomID!: string;
  mushroom!: Mushroom|undefined;
  iconographicContainer!: IconographicContainer

  subs = new Subscription();

  @ViewChild(FormMushroomComponent)
  formMushroomComponent!: FormMushroomComponent;
  @ViewChild(FormIconographyComponent)
  formIconographyComponent!: FormIconographyComponent;

  ngOnChanges(changes: SimpleChanges): void {

  }

  ngOnInit(): void {
//     if(this.mushroomID !== ':id'){
// // debugger
// //       this.store.dispatch(MycologyActions.loadMushroomRequest({id: this.mushroomID}))
//     }
    // this.subs.add(
    //   this.mushroom$.subscribe(mushroom => {
    //     console.log('mushroom: ', mushroom)
    //   })
    // )
    if(this.mushroomID !== ':id') {
      this.store.dispatch(MycologyActions.loadMushroomRequest({id: this.mushroomID}))
      this.mushroom$.subscribe(mushroom=> {
       // console.log('mushroom: ', mushroom)
       this.mushroom = mushroom
      })
    }
  }

  onCreate() {
    if (
      this.formIconographyComponent.formIconography.controls
        .formiconographyarray.length !== 0
    ) {
      const mushroom: Mushroom = {
        ...(this.formMushroomComponent.formMushroom.value as Mushroom),
        haveIconography: true,
      };

      const createMushroomPayload = {
        mushroom: mushroom,
        iconographicContainer: this.formIconographyComponent.formIconography
          .value as IconographicContainer,
      };
      this.store.dispatch(
        MycologyActions.createMushroomRequest(createMushroomPayload)
      );
    } else {
      const mushroom: Mushroom = {
        ...(this.formMushroomComponent.formMushroom.value as Mushroom),
        haveIconography: false,
      };
      const createMushroomPayload = {
        mushroom: mushroom,
        iconographicContainer: this.formIconographyComponent.formIconography
          .value as IconographicContainer,
      };
      this.store.dispatch(
        MycologyActions.createMushroomRequest(createMushroomPayload)
      );
    }

    this.router.navigate(['mushrooms/page', this.currentpage]);
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe()
  }
}
