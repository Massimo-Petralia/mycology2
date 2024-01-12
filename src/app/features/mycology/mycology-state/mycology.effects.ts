import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map, of, switchMap } from 'rxjs';
import { MycologyService } from '../services/mycology.service';
import * as MycologyActions from '../mycology-state/mycology.actions'

@Injectable()
export class LoadMushroomsEffects {
    constructor(private actions$: Actions, private mycologyService: MycologyService ) {}

    loadMushrooms$ = createEffect(() => this.actions$.pipe(
        ofType(MycologyActions.loadMushroomsRequest),
        switchMap(({pageIndex}) => this.mycologyService.getMushrooms(pageIndex).pipe(
            map(response => MycologyActions.loadMushroomsSucces({items: response.items, mushrooms: response.data})),
            catchError(()=> of(MycologyActions.loadMushroomsFailed()))
           )))
    )

}