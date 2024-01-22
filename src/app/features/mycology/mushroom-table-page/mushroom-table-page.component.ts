import { Component, OnInit, OnDestroy } from '@angular/core';
import { MushroomTableComponent } from '../mushroom-table/mushroom-table.component';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator'
import { Store } from '@ngrx/store';
import * as MycologyActions from '../mycology-state/mycology.actions';
import { Mushroom, MycologyState } from '../models/mycology.models';
import { selectFeature } from '../mycology-state/mycology.selectors';
import {  selectMushroomsFeature } from '../mycology-state/mycology.selectors'
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-mushroom-table-page',
  standalone: true,
  imports: [MushroomTableComponent, MatPaginatorModule],
  templateUrl: './mushroom-table-page.component.html',
  styleUrl: './mushroom-table-page.component.scss'
})
export class MushroomTablePageComponent implements OnInit, OnDestroy {
  constructor(private store : Store<MycologyState>){}

  page : number = 1

mushrooms$ = this.store.select(selectMushroomsFeature)
mushrooms: Mushroom[] = []

subs = new Subscription()

ngOnInit(): void {
  this.store.dispatch(MycologyActions.loadMushroomsRequest({pageIndex: this.page}))
  this.subs.add(
    this.mushrooms$.subscribe(mushrooms => {
      this.mushrooms = mushrooms
    })
  )
}

handlePagination(pageEvent: PageEvent) {
  
}

ngOnDestroy(): void {
  this.subs.unsubscribe()
}

}
