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
import { NavigationEnd, Router } from '@angular/router';
import {
  selectMushroomsFeature,
  selectIconographyFeature,
  selectNotificationsFeature,
} from '../mycology-state/mycology.selectors';
import { Observable, Subscription, filter } from 'rxjs';

import { Notifications } from '../models/mycology.models';

import { selectPaginationFeature } from '../mycology-state/mycology.selectors';

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
  constructor(private store: Store<MycologyState>, private router: Router) {}

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

  pagination$ = this.store.select(selectPaginationFeature);

  subs = new Subscription();

  mushroomID!: string;

  mushroom!: Mushroom | null;

  notifications: Notifications | null = null;

  mushroomspecies: string = '';

  iconographicContainer: IconographicContainer = {
    formiconographyarray: [],
  };

  parameters: { [k: string]: number } = {
    page: <number>0,
    mushroomsLength: <number>0,
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
    this.subs.add(
      this.pagination$.subscribe((pagination) => {
        this.parameters['page'] = pagination.page;
        //prendi la proprietà tableLength è assegnala a parameters.mushroomsLength
        this.parameters['mushroomsLength'] = pagination.tableLength!
      })
    );

    this.subs.add(
      this.mushrooms$.subscribe((mushrooms) => {
        //sono sottoscritto ai funghi
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
    // this.store.dispatch(
    //   MycologyActions.deleteMushroomsRequest({ mushrooms: [payload.mushroom] })
    // );

    if (this.parameters['mushroomsLength'] <= 1) {
      const page = this.parameters['page'] - 1;
      this.store.dispatch(
        MycologyActions.updatePageIndexRequest({ pageIndex: page })
      );
  
      console.log('table length: ', this.parameters['mushroomsLength'])
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
