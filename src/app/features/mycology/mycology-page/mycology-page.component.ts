import {
  Component,
  OnInit,
  OnChanges,
  AfterViewInit,
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
import { Observable, Subscription, filter, timeout } from 'rxjs';
import { SharedParametersService } from '../services/shared-parameters.service';

export interface Notifications {
  creation: {
    isCreated: boolean;
    notification: string;
  };
  update: {
    isUpdate: boolean;
    notification: string;
  };
}

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
export class MycologyPageComponent
  implements OnChanges, OnInit, AfterViewInit, OnDestroy
{
  constructor(
    private store: Store<MycologyState>,
    private router: Router,
    private paramsService: SharedParametersService
  ) {}

  parameters: { [k: string]: any } | undefined = {
    page: <string>'',
    length: <string>'',
  };

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
  notifications!: Notifications;

  mushroomID!: string;
  mushroom!: Mushroom | null;
  iconographicContainer: IconographicContainer = {
    formiconographyarray: [],
  };

  subs = new Subscription();

  @ViewChild(FormMushroomComponent)
  formMushroomComponent!: FormMushroomComponent;
  @ViewChild(FormIconographyComponent)
  formIconographyComponent!: FormIconographyComponent;

  ngOnChanges(changes: SimpleChanges): void {
    const { id } = changes;
    if (id) {
      if (this.mushroomID !== ':id') {
        this.store.dispatch(
          MycologyActions.loadMushroomRequest({ id: this.mushroomID })
        );
      }
    }
    
  }

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

    this.subs.add(
      this.notifications$.subscribe((notifications) => {
        this.notifications = notifications;
        if (
          notifications.creation.isCreated !== notifications.update.isUpdate
        ) {
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

    // if (this.mushroomID !== ':id') {
    //   this.store.dispatch(
    //     MycologyActions.loadMushroomRequest({ id: this.mushroomID })
    //   );
    // }
  }

  ngAfterViewInit(): void {}

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
    console.log('iconographicContainer: ', payload.iconographicContainer)

    if (this.paramsService.length <= 1) {
      this.paramsService.page = this.paramsService.page - 1;
    }
    // this.router.navigate([`mycology/mushrooms`]);
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
