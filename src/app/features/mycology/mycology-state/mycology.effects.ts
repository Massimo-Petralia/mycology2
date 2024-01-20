import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, filter, map, of, switchMap, from } from 'rxjs';
import { MycologyService } from '../services/mycology.service';
import * as MycologyActions from '../mycology-state/mycology.actions';

@Injectable()
export class LoadMushroomsEffects {
  constructor(
    private actions$: Actions,
    private mycologyService: MycologyService
  ) {}

  loadMushrooms$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MycologyActions.loadMushroomsRequest),
      switchMap(({ pageIndex }) =>
        this.mycologyService.getMushrooms(pageIndex).pipe(
          map((response) =>
            MycologyActions.loadMushroomsSucces({
              items: response.items,
              mushrooms: response.data,
            })
          ),
          catchError(() => of(MycologyActions.loadMushroomsFailed()))
        )
      )
    )
  );
}

@Injectable()
export class CreateMushroomEffects {
  constructor(
    private actions$: Actions,
    private mycologyService: MycologyService
  ) {}

  createMushroom$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MycologyActions.createMushroom),
      exhaustMap((request) =>
        this.mycologyService.createMushroom(request.mushroom).pipe(
          switchMap((mushroom) => {
            const actionsToDispatch = [
              MycologyActions.createMushroomSucces(mushroom),

              MycologyActions.createIconographyRequest({
                ...request.iconographicContainer,
                mushroomID: mushroom.id,
              }),
            ];
            return from(actionsToDispatch);
          }),
          catchError(() => of(MycologyActions.createMushroomFailed()))
        )
      )
    )
  );
}

@Injectable()
export class CreateIconographyEffects {
    constructor(
        private actions$: Actions,
        private mycologyService: MycologyService
      ) {}

   createIconography$ = createEffect(()=> this.actions$.pipe(
    ofType(MycologyActions.createIconographyRequest),
    filter((iconographicContainer)=> (iconographicContainer && iconographicContainer.iconographyarray.length !== 0)),
    switchMap((iconographicContainer)=> this.mycologyService.createIconography(iconographicContainer).pipe(
        map((iconographicContainer)=> MycologyActions.createIconographySucces(iconographicContainer)),
        catchError(()=> of(MycologyActions.loadMushroomsFailed()))
    ))
   ))   
}
