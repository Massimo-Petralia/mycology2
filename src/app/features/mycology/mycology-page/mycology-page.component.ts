import { Component, OnInit, Input, ViewChild, OnDestroy } from '@angular/core';
import { FormMushroomComponent } from '../form-mushroom/form-mushroom.component';
import { IconographicContainer, Mushroom } from '../models/mycology.models';
import { FormIconographyComponent } from '../form-iconography/form-iconography.component';
import { Store } from '@ngrx/store';
import { MycologyState } from '../models/mycology.models';
import * as MycologyActions from '../mycology-state/mycology.actions';
import { ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import {
  selectMushroomsFeature,
  selectIconographyFeature,
} from '../mycology-state/mycology.selectors';
import { Observable, Subscription, filter } from 'rxjs';

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
export class MycologyPageComponent implements OnInit, OnDestroy {
  constructor(
    private store: Store<MycologyState>,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  // @Input() set page(pagenumber: number) {
  //   this.currentpage = pagenumber;
  // }

  // @Input() set length(pagelength: number) {
  //   this.pagelength = pagelength;
  // }

  @Input() set id(mushroomID: string) {
    this.mushroomID = mushroomID;
  }

  mushrooms$ = this.store
    .select(selectMushroomsFeature)
    .pipe(filter((mushrooms) => !!mushrooms)) as Observable<{
    [id: string]: Mushroom;
  }>;

  iconographicContainer$ = this.store
    .select(selectIconographyFeature)
    .pipe(
      filter((iconographicContainer) => !!iconographicContainer)
    ) as Observable<IconographicContainer>;

  //currentpage!: number;
  //pagelength!: number;
  mushroomID!: string;
  mushroom!: Mushroom | null;
  iconographicContainer: IconographicContainer = {
    formiconographyarray: [],
  };
  parameters = {
    page: <string | null>'',
    length: <string | null>'',
  };
  subs = new Subscription();

  @ViewChild(FormMushroomComponent)
  formMushroomComponent!: FormMushroomComponent;
  @ViewChild(FormIconographyComponent)
  formIconographyComponent!: FormIconographyComponent;

  ngOnInit(): void {
    this.subs.add(
      this.mushrooms$.subscribe((mushrooms) => {
        this.mushroom = mushrooms[this.mushroomID];
      })
    );

    this.subs.add(
      this.iconographicContainer$.subscribe((iconographicContainer) => {
        this.iconographicContainer = iconographicContainer;
      })
    );

    if (this.mushroomID !== ':id') {
      this.store.dispatch(
        MycologyActions.loadMushroomRequest({ id: this.mushroomID })
      );
    }

    const params = this.route.snapshot.queryParamMap;
    this.parameters = {
      page: params.get('page'),
      length: params.get('length'),
    };
    console.log('parameters: ', this.parameters)
  }

  onSave() {
    const payload = {
      mushroom: <Mushroom>this.formMushroomComponent.formMushroom.value,
      iconographicContainer: <IconographicContainer>(
        this.formIconographyComponent.formIconography.value
      ),
    };
    if (!payload.mushroom.id) {
      delete payload.mushroom['id'];
    }
    if (!payload.iconographicContainer.id) {
      delete payload.iconographicContainer['id'];
    }
    debugger;
    this.store.dispatch(MycologyActions.saveMycologyRequest(payload));

    this.router.navigate([`mycology/mushrooms`]);

    // if (!this.mushroom?.id && !this.iconographicContainer.id) {
    //   this.router.navigate(['mushrooms/page', this.currentpage]);
    // }
  }

  onDelete() {
    const payload = {
      mushroom: <Mushroom>this.formMushroomComponent.formMushroom.value,
      iconographicContainer: <IconographicContainer>(
        this.formIconographyComponent.formIconography.value
      ),
    };
    if (!payload.iconographicContainer.id) {
      delete payload.iconographicContainer['id'];
    }
    this.store.dispatch(
      MycologyActions.deleteMushroomRequest({ mushroom: payload.mushroom })
    );
    this.router.navigate([`mycology/mushrooms`]);
    // if (this.pagelength <= 1) {
    //   this.currentpage--;
    //   this.router.navigate([`mushrooms/page/${this.currentpage}`]);
    // } else {
    //   this.router.navigate([`mushrooms/page/${this.currentpage}`]);
    // }
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
