import {
  Component,
  OnInit,
  AfterViewInit,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import { MushroomTableComponent } from '../mushroom-table/mushroom-table.component';
import {
  MatPaginator,
  MatPaginatorModule,
  PageEvent,
} from '@angular/material/paginator';
import { Store } from '@ngrx/store';
import * as MycologyActions from '../mycology-state/mycology.actions';
import { Mushroom, MycologyState } from '../models/mycology.models';
import {
  selectMushroomsFeature,
  selectItemsFeature,
} from '../mycology-state/mycology.selectors';
import { Observable, Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { SharedParametersService } from '../services/shared-parameters.service';
import { FormFilteredSearch } from '../models/mycology.models';
@Component({
  selector: 'app-mushroom-table-page',
  standalone: true,
  imports: [CommonModule, MushroomTableComponent, MatPaginatorModule],
  templateUrl: './mushroom-table-page.component.html',
  styleUrl: './mushroom-table-page.component.scss',
})
export class MushroomTablePageComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  constructor(
    private store: Store<MycologyState>,
    private paramsService: SharedParametersService
  ) {}
  @ViewChild('paginator') paginator!: MatPaginator;
  @ViewChild(MushroomTableComponent) mushroomTable!: MushroomTableComponent;

  page: number | undefined;

  provvisoria: any;

  mushrooms$ = this.store.select(selectMushroomsFeature);
  mushrooms: Mushroom[] = [];

  items$!: Observable<number>;

  items: number = 0;

  subs = new Subscription();

  formFilteredSearch?: FormFilteredSearch;

  ngOnInit(): void {
    this.page = this.paramsService.page;
    this.store.dispatch(
      MycologyActions.loadMushroomsRequest({
        pageIndex: this.page!,
        filter: 'species',
        search: '',
      })
    );
    this.subs.add(
      this.mushrooms$.subscribe((mushrooms) => {
        if (mushrooms !== null) {
          this.mushrooms = Object.values(
            mushrooms as { [id: string]: Mushroom }
          );
        }
      })
    );
    this.items$ = this.store.select(selectItemsFeature);
    this.subs.add(
      this.items$.subscribe((items) => {
        this.items = items;
      })
    );
  }

  ngAfterViewInit(): void {
    if (this.page !== 1) {
      this.paginator.pageIndex = this.page! - 1;
    }
  }

  handlePagination(pageEvent: PageEvent) {
    this.page = pageEvent.pageIndex;
    this.page++;
    this.store.dispatch(
      MycologyActions.loadMushroomsRequest({
        pageIndex: this.page,
        filter: this.mushroomTable.formFilteredSearch.controls.filter.value,
        search: this.mushroomTable.formFilteredSearch.controls.search.value,
      })
    );
  }

  onFormSearch(formFilteredSearch: FormFilteredSearch) {
    this.store.dispatch(
      MycologyActions.loadMushroomsRequest({
        pageIndex: this.page!,
        filter: formFilteredSearch.filter,
        search: formFilteredSearch.search,
      })
    );
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
