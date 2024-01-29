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

  mushroom$: Observable<Mushroom | undefined> = this.store.select(
    selectMushroomFeature
  );
  iconographicContainer$: Observable<IconographicContainer | undefined> =
    this.store.select(selectIconographyFeature);

  currentpage!: number;
  pagelength!: number;
  mushroomID!: string;
  mushroom!: Mushroom | undefined;
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
    }
    this.subs.add(
      this.iconographicContainer$.subscribe((iconographicContainer) => {
        if (iconographicContainer) {
          this.iconographicContainer = iconographicContainer;
        } else return;
      })
    );
    this.subs.add(
      this.mushroom$.subscribe((mushroom) => {
        this.mushroom = mushroom;
        debugger;
      })
    );
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
  }

  onDelete() {
    const mycologyData = {
      mushroom: this.formMushroomComponent.formMushroom.value as Mushroom,
      iconographicContainer: this.formIconographyComponent.formIconography
        .value as IconographicContainer,
    };

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
