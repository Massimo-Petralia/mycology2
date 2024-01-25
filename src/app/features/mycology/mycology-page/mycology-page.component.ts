import {
  Component,
  OnInit,
  Input,
  ViewChild,
  AfterViewInit,
  OnDestroy,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
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
export class MycologyPageComponent implements OnInit, OnChanges, OnDestroy {
  constructor(
    private store: Store<MycologyState>,
    private router: Router,
    private mycologyService: MycologyService
  ) {}

  @Input() set page(pagenumber: number) {
    this.currentpage = pagenumber;
  }

  @Input() set length(pagelength: number) {
    this.pagelength = pagelength;
  }

  @Input() set id(mushroomID: string) {
    this.mushroomID = mushroomID;
  }

  mushroom$ = this.store.select(selectMushroomFeature);
  iconographicContainer$: Observable<IconographicContainer | undefined> =
    this.store.select(selectIconographyFeature);

  currentpage!: number;
  pagelength!: number;
  mushroomID!: string;
  mushroom!: Mushroom | undefined;
  iconographicContainer: IconographicContainer = {
    formiconographyarray: [],
  };

  subs = new Subscription();

  @ViewChild(FormMushroomComponent)
  formMushroomComponent!: FormMushroomComponent;
  @ViewChild(FormIconographyComponent)
  formIconographyComponent!: FormIconographyComponent;

  ngOnChanges(changes: SimpleChanges): void {}

  ngOnInit(): void {
    if (this.mushroomID !== ':id') {
      this.store.dispatch(
        MycologyActions.loadMushroomRequest({ id: this.mushroomID })
      );
      this.subs.add(
        this.mushroom$.subscribe((mushroom) => {
          this.mushroom = mushroom;
        })
      );
    }
    this.subs.add(
      this.iconographicContainer$.subscribe((iconographicContainer) => {
        if (iconographicContainer) {
          this.iconographicContainer = iconographicContainer;
        } else return;
      })
    );
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

  onUpdate() {
    if (
      this.mushroom?.haveIconography === true &&
      this.formIconographyComponent.formIconography.controls
        .formiconographyarray.length !== 0
    ) {
      this.formIconographyComponent.formIconography.controls.id.patchValue(
               this.formIconographyComponent.iconographicContainer.id
              )
      this.store.dispatch(
        MycologyActions.updateMushroomRequest({
          mushroom: this.formMushroomComponent.formMushroom.value as Mushroom,
          iconographicContainer: this.formIconographyComponent.formIconography
            .value as IconographicContainer,
        })
      );
    } else if (
      this.mushroom?.haveIconography === false &&
      this.formIconographyComponent.formIconography.controls
        .formiconographyarray.length !== 0
    ) {
      this.formIconographyComponent.formIconography.controls.id.patchValue(
                this.mushroom.id
              )
              
      // this.formMushroomComponent.formMushroom.controls.haveIconography.patchValue(
      //   true
      // );
      this.store.dispatch(
        MycologyActions.updateMushroomRequest({
          mushroom: this.formMushroomComponent.formMushroom.value as Mushroom,
          iconographicContainer: this.formIconographyComponent.formIconography
            .value as IconographicContainer,
        })
      ); // go to CreateIconographyRequest
    } else if (
      this.mushroom?.haveIconography === false &&
      this.formIconographyComponent.formIconography.controls
        .formiconographyarray.length === 0
    ) {
      this.store.dispatch(MycologyActions.updateMushroomRequest({
        mushroom: this.formMushroomComponent.formMushroom.value as Mushroom,
        iconographicContainer: this.formIconographyComponent.formIconography
          .value as IconographicContainer,
      })) // stop updateIconographyRequest
    }
    // if (
    //   this.formMushroomComponent.formMushroom.valid &&
    //   this.formIconographyComponent.formIconography.valid
    //   //this.formIconographyComponent.formIconography.controls.formiconographyarray.length !== 0
    // ) {
    //       //
    //       this.formIconographyComponent.formIconography.controls.id.patchValue(
    //         this.formIconographyComponent.iconographicContainer.id
    //       )
    //       //
    //       //this.formMushroomComponent.formMushroom.controls.haveIconography.patchValue(true)
    //   this.store.dispatch(
    //     MycologyActions.updateMushroomRequest({
    //       mushroom: this.formMushroomComponent.formMushroom.value as Mushroom,
    //       iconographicContainer: this.formIconographyComponent.formIconography
    //         .value as IconographicContainer,
    //     })
    //   );
    // } else if (
    //   this.formIconographyComponent.iconographicContainer &&
    //   this.formIconographyComponent.formIconography.controls
    //     .formiconographyarray.length === 0
    // ) {
    //   this.formMushroomComponent.formMushroom.controls.haveIconography.patchValue(
    //     false
    //   );

    //   this.store.dispatch(
    //     MycologyActions.updateMushroomRequest({
    //       mushroom: this.formMushroomComponent.formMushroom.value as Mushroom,
    //       iconographicContainer: this.formIconographyComponent.formIconography
    //         .value as IconographicContainer,
    //     })
    //   );
    //   this.store.dispatch(
    //     MycologyActions.deleteIconographyRequest({
    //       iconographicContainerID:
    //         this.formIconographyComponent.iconographicContainer.id!,
    //     })
    //   );
    // }
  }

  onDelete() {
    this.store.dispatch(
      MycologyActions.deleteMushroomRequest({
        id: this.mushroomID,
        haveIconography: this.mushroom?.haveIconography,
        iconographicContainerID: this.iconographicContainer.id!,
      })
    );
    if (this.pagelength <= 1) {
      this.currentpage--;
      this.router.navigate([`mushrooms/page/${this.currentpage}`]);
    } else {
      this.router.navigate([`mushrooms/page/${this.currentpage}`]);
    }
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
