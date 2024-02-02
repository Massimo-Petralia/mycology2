import { Component, OnInit, Input, ViewChild, OnDestroy } from '@angular/core';
import { FormMushroomComponent } from '../form-mushroom/form-mushroom.component';
import { IconographicContainer, Mushroom } from '../models/mycology.models';
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
  constructor(private store: Store<MycologyState>, private router: Router) {}

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
    formiconographyarray: [],
  };

  subs = new Subscription();

  @ViewChild(FormMushroomComponent)
  formMushroomComponent!: FormMushroomComponent;
  @ViewChild(FormIconographyComponent)
  formIconographyComponent!: FormIconographyComponent;

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

            this.subs.add(
              this.iconographicContainer$.subscribe((iconographicContainer) => {
                if (iconographicContainer !== null) {
                  this.iconographicContainer = iconographicContainer;
                }
              })
            );
          }
        })
      );
    }
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

    this.store.dispatch(MycologyActions.saveMycologyRequest(payload));

    if (!this.mushroom?.id && !this.iconographicContainer.id) {
      this.router.navigate(['mushrooms/page', this.currentpage]);
    }
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
