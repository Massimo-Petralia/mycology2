import { Component, OnInit, OnDestroy, Input, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { MushroomTableComponent } from '../mushroom-table/mushroom-table.component';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { Store } from '@ngrx/store';
import * as MycologyActions from '../mycology-state/mycology.actions';
import { Mushroom, MycologyState } from '../models/mycology.models';
import {
  selectMushroomsFeature,
  selectItemsFeature,
} from '../mycology-state/mycology.selectors';
import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';
@Component({
  selector: 'app-mushroom-table-page',
  standalone: true,
  imports: [MushroomTableComponent, MatPaginatorModule],
  templateUrl: './mushroom-table-page.component.html',
  styleUrl: './mushroom-table-page.component.scss',
})
export class MushroomTablePageComponent implements OnInit, AfterViewInit, OnDestroy {
  constructor(private store: Store<MycologyState>, private router: Router) {}
  @ViewChild('paginator') paginator!: MatPaginator

  currentpage: number = 1;

  @Input() set page(pagenumber: number) {
    if (pagenumber !== 1) {
      this.currentpage = pagenumber;
    }
  }

  mushrooms$ = this.store.select(selectMushroomsFeature);
  mushrooms: Mushroom[] = [];

  items$!: Observable<number>;

  items: number = 0;

  subs = new Subscription();

  ngOnInit(): void {
    this.store.dispatch(
      MycologyActions.loadMushroomsRequest({ pageIndex: this.currentpage })
    );
    this.subs.add(
      this.mushrooms$.subscribe((mushrooms) => {
        this.mushrooms = mushrooms;
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
    if(this.currentpage !== 1){
      this.paginator.pageIndex = this.currentpage-1
    }
  }

  handlePagination(pageEvent: PageEvent) {
    this.currentpage = pageEvent.pageIndex + 1;
    this.store.dispatch(
      MycologyActions.loadMushroomsRequest({ pageIndex: this.currentpage })
    );
    this.router.navigate(['mushrooms/page', this.currentpage]);
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
