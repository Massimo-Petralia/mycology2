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
import {
  Features,
  IconographicContainer,
  MicroscopicFeatures,
  Morphology,
  Mushroom,
  Taxonomy,
} from '../models/mycology.models';
import { FormIconographyComponent } from '../form-iconography/form-iconography.component';
import { Store } from '@ngrx/store';
import { MycologyState } from '../models/mycology.models';
import * as MycologyActions from '../mycology-state/mycology.actions';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import {
  selectMushroomsFeature,
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

  mushrooms$ = this.store.select(selectMushroomsFeature);

  iconographicContainer$: Observable<IconographicContainer | null> =
    this.store.select(selectIconographyFeature);

  currentpage!: number;
  pagelength!: number;
  mushroomID!: string;
  mushroom!: Mushroom | null;
  iconographicContainer: IconographicContainer = {
    id: '',
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
        this.mushrooms$.subscribe((mushrooms) => {
          if (mushrooms !== null) {
            this.mushroom = (mushrooms as { [id: string]: Mushroom })[
              this.mushroomID
            ];

            if (
              mushrooms[this.mushroomID] &&
              mushrooms[this.mushroomID].iconographyID
            ) {
              this.store.dispatch(
                MycologyActions.loadIconographyRequest({
                  id: mushrooms[this.mushroomID].iconographyID!,
                })
              );
              this.subs.add(
                this.iconographicContainer$.subscribe(
                  (iconographicContainer) => {
                    if (iconographicContainer !== null) {
                      this.iconographicContainer = iconographicContainer;
                    }
                  }
                )
              );
            }
          }
        })
      );
    }
  }

  onCreate() {
    const mycologyData = {
      mushroom: this.formMushroomComponent.formMushroom.value as Mushroom,
      iconographicContainer: this.formIconographyComponent.formIconography
        .value as IconographicContainer,
    };
    if (this.formIconographyComponent.formiconographyarray.length !== 0) {
      this.store.dispatch(
        MycologyActions.createIconographyRequest({
          iconographicContainer: mycologyData.iconographicContainer,
          mushroom: mycologyData.mushroom,
        })
      );
    } else
      this.store.dispatch(
        MycologyActions.createMushroomRequest(mycologyData.mushroom)
      );

    this.router.navigate(['mushrooms/page', this.currentpage]);
  }

  onUpdate() {
    const mycologyData = {
      mushroom: this.formMushroomComponent.formMushroom.value as Mushroom,
      iconographicContainer: this.formIconographyComponent.formIconography
        .value as IconographicContainer,
    };

    this.store.dispatch(
      MycologyActions.saveMycologyRequest({
        mushroom: mycologyData.mushroom,
        iconographicContainer: mycologyData.iconographicContainer,
      })
    );
    debugger
  }

  onDelete() {
    this.store.dispatch(MycologyActions.deleteMushroomRequest(this.mushroom!));

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
