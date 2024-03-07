import {
  Component,
  OnInit,
  AfterViewInit,
  OnDestroy,
  ViewChild,
  Input,
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
  constructor(private store: Store<MycologyState>) {}
  @ViewChild('paginator') paginator!: MatPaginator;
  @ViewChild(MushroomTableComponent) mushroomTable!: MushroomTableComponent;

  @Input() items: number = 0;

  pagination$: Observable<{
    totalItems: number;
    page: number;
  }> | null = null;

  mushrooms$ = this.store.select(selectMushroomsFeature);

  mushrooms: Mushroom[] = [];

  page: number = 1;

  subs = new Subscription();

  formFilteredSearch?: FormFilteredSearch;

  selectedMushrooms: { [key: string]: Mushroom } | null = null;

  ngOnInit(): void {
    this.pagination$ = this.store.select(selectPaginationFeature);
    this.subs.add(
      this.pagination$.subscribe((pagination) => {
        if (this.items !== 0) {
          if (pagination.totalItems < this.items) {
            this.store.dispatch(
              MycologyActions.loadMushroomsRequest({
                pageIndex: this.page,
                filter: 'species',
                search: '',
              })
            );
          }
        }

        this.page = pagination.page;
        this.items = pagination.totalItems;
      })
    );

    this.store.dispatch(
      MycologyActions.loadMushroomsRequest({
        pageIndex: this.page,
        filter: 'species',
        search: '',
      })
    );

    this.subs.add(
      this.mushrooms$.subscribe((mushrooms) => {
        if (mushrooms !== null) {
          this.mushrooms = Object.values(mushrooms);
        }
      })
    );
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

  onDelete(mushroomID: string) {
    const collection = this.mushrooms.reduce(
      (collection: { [id: string]: Mushroom }, mushroom) => {
        collection[mushroom.id!] = mushroom;
        return collection;
      },
      {}
    );
    this.store.dispatch(
      MycologyActions.deleteMushroomsRequest({
        mushrooms: [collection[mushroomID]],
      })
    );
    if (this.mushrooms.length <= 1) {
      const page = this.page - 1;

      this.store.dispatch(
        MycologyActions.updatePageIndexRequest({ pageIndex: page })
      );
    }
  }

  onDeleteSelected(mushrooms: Mushroom[]) {
    this.store.dispatch(
      MycologyActions.deleteMushroomsRequest({ mushrooms: mushrooms })
    );
    if (this.mushrooms.length <= 1) {
      const page = this.page - 1;

      this.store.dispatch(
        MycologyActions.updatePageIndexRequest({ pageIndex: page })
      );
    }
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
