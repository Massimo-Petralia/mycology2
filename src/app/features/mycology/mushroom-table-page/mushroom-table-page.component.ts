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
  selectPaginationFeature,
} from '../mycology-state/mycology.selectors';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
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
  constructor(private store: Store<MycologyState>) {}
  @ViewChild('paginator') paginator!: MatPaginator;
  @ViewChild(MushroomTableComponent) mushroomTable!: MushroomTableComponent;

  items: number = 0;

  page: number = 1;

  pagination$ = this.store.select(selectPaginationFeature);

  mushrooms$ = this.store.select(selectMushroomsFeature);

  mushrooms: Mushroom[] = [];

  subs = new Subscription();

  formFilteredSearch?: FormFilteredSearch;

  selectedMushrooms: { [key: string]: Mushroom } | null = null;

  loadMushrooms(filters: string | null, search: string | null) {
    this.store.dispatch(
      MycologyActions.loadMushroomsRequest({
        pageIndex: this.page,
        filter: filters,
        search: search,
      })
    );
  }

  ngOnInit(): void {
    this.subs.add(
      this.pagination$.subscribe((pagination) => {
        if (this.items !== 0) {
          if (pagination.totalItems < this.items) {
            this.loadMushrooms(
              this.mushroomTable.formFilteredSearch.controls.filter.value,
              this.mushroomTable.formFilteredSearch.controls.search.value
            );
          }
        }
        this.page = pagination.page;
        this.items = pagination.totalItems;

        if (this.paginator) {
          if (pagination.changePage === true) {
            this.paginator.previousPage();
            this.store.dispatch(
              MycologyActions.changePageRequest({ changePage: false })
            );
          }
        }
      })
    );

    this.subs.add(
      this.mushrooms$.subscribe((mushrooms) => {
        if (mushrooms !== null) {
          this.mushrooms = Object.values(mushrooms);
        }
      })
    );

    this.loadMushrooms('species', '');
  }

  ngAfterViewInit(): void {
    if (this.page > 1) {
      this.paginator.pageIndex = this.page! - 1;
    }
  }

  handlePagination(pageEvent: PageEvent) {
    this.page = pageEvent.pageIndex;
    this.page++;
    this.store.dispatch(
      MycologyActions.updatePageIndexRequest({ pageIndex: this.page })
    );
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

  onDeleteOption(mushroomID: string) {
    const collection = this.mushrooms.reduce(
      (collection: { [id: string]: Mushroom }, mushroom) => {
        collection[mushroom.id!] = mushroom;
        return collection;
      },
      {}
    );
    if (this.mushrooms.length - [collection[mushroomID]].length === 0) {
      this.paginator.previousPage();
    }
    this.store.dispatch(
      MycologyActions.deleteMushroomsRequest({
        mushrooms: [collection[mushroomID]],
      })
    );
  }

  onDeleteSelected(selectedMushrooms: Mushroom[]) {
    if (this.mushrooms.length - selectedMushrooms.length === 0) {
      this.paginator.previousPage();
    }
    this.store.dispatch(
      MycologyActions.deleteMushroomsRequest({
        mushrooms: selectedMushrooms,
      })
    );
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
