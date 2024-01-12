import { Component, OnInit } from '@angular/core';
import { MushroomTableComponent } from '../mushroom-table/mushroom-table.component';
import { MatPaginatorModule } from '@angular/material/paginator'
import { Store } from '@ngrx/store';
import * as MycologyActions from '../mycology-state/mycology.actions';
import { MycologyState } from '../models/mycology.models';
import { selectFeature } from '../mycology-state/mycology.selectors';


@Component({
  selector: 'app-mushroom-table-page',
  standalone: true,
  imports: [MushroomTableComponent, MatPaginatorModule],
  templateUrl: './mushroom-table-page.component.html',
  styleUrl: './mushroom-table-page.component.scss'
})
export class MushroomTablePageComponent implements OnInit {
  constructor(private store : Store<MycologyState>){}

  page : number = 1

ngOnInit(): void {
  this.store.dispatch(MycologyActions.loadMushroomsRequest({pageIndex: this.page}))
}
}
