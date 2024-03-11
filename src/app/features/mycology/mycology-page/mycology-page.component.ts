import {
  Component,
  OnInit,
  OnChanges,
  Input,
  ViewChild,
  OnDestroy,
  SimpleChanges,
} from '@angular/core';
import { FormMushroomComponent } from '../form-mushroom/form-mushroom.component';
import { IconographicContainer, Mushroom } from '../models/mycology.models';
import { FormIconographyComponent } from '../form-iconography/form-iconography.component';
import { Store } from '@ngrx/store';
import { MycologyState } from '../models/mycology.models';
import * as MycologyActions from '../mycology-state/mycology.actions';
import { ReactiveFormsModule } from '@angular/forms';
import { NavigationEnd, Router, ActivatedRoute } from '@angular/router';
import {
  selectMushroomsFeature,
  selectIconographyFeature,
  selectNotificationsFeature,
} from '../mycology-state/mycology.selectors';
import { Observable, Subscription, filter } from 'rxjs';

import { Notifications } from '../models/mycology.models';

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
export class MycologyPageComponent implements OnChanges, OnInit, OnDestroy {
  constructor(
    private store: Store<MycologyState>,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  @ViewChild(FormMushroomComponent)
  formMushroomComponent!: FormMushroomComponent;
  @ViewChild(FormIconographyComponent)
  formIconographyComponent!: FormIconographyComponent;

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

  notifications$ = this.store.select(selectNotificationsFeature);

  subs = new Subscription();

  mushroomID!: string;

  mushroom!: Mushroom | null;

  notifications: Notifications | null = null;

  mushroomspecies: string = '';

  iconographicContainer: IconographicContainer = {
    formiconographyarray: [],
  };

  parameters: { [k: string]: number } = {
    page: 0,
    tableLength: 0,
  };

  ngOnChanges(changes: SimpleChanges): void {
    const { id } = changes;
    if (id) {
      if (this.mushroomID !== ':id') {
        this.store.dispatch(
          MycologyActions.loadMushroomRequest({ id: this.mushroomID }) //questo carica 1 fungo
        );
      }
    }
  }

  ngOnInit(): void {
    this.parameters = {
      tableLength: Number(this.route.snapshot.paramMap.get('tableLength')!),
      page: Number(this.route.snapshot.paramMap.get('page')!),
    };

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

    this.subs.add(
      this.notifications$.subscribe((notifications) => {
        this.notifications = notifications;
        if (this.notifications) {
          setTimeout(
            () =>
              this.store.dispatch(MycologyActions.resetNotificationsState()),
            2000
          );
        }
      })
    );

    this.subs.add(
      this.router.events.subscribe((event) => {
        if (event instanceof NavigationEnd) {
          const currentUrl = this.router.url;
          if (currentUrl === '/mycology/mushrooms/:id') {
            this.router.navigate(['mycology/mushrooms']);
          }
        }
      })
    );
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
    if (!payload.mushroom.id) {
      this.store.dispatch(MycologyActions.createMycologyRequest(payload));
    }
    if (payload.mushroom.id) {
      this.store.dispatch(MycologyActions.updateMycologyRequest(payload));
    }
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

    if (this.parameters['mushroomsLength'] <= 1) {
      const page = this.parameters['page'] - 1;
      this.store.dispatch(
        MycologyActions.updatePageIndexRequest({ pageIndex: page })
      );
    }
    this.store.dispatch(
      MycologyActions.deleteMushroomsRequest({
        mushrooms: [payload.mushroom],
      })
    );
  }

  onMushroomSpecies(mushroomspecies: string) {
    this.mushroomspecies = mushroomspecies;
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
