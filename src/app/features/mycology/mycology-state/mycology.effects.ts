import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import {
  catchError,
  exhaustMap,
  filter,
  map,
  of,
  switchMap,
  from,
  mergeMap,
} from 'rxjs';
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
      ofType(MycologyActions.createMushroomRequest),
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

  createIconography$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MycologyActions.createIconographyRequest),
      filter(
        (iconographicContainer) =>
          iconographicContainer.formiconographyarray.length !== 0
      ),
      switchMap((iconographicContainer) =>
        this.mycologyService.createIconography(iconographicContainer).pipe(
          map((iconographicContainer) =>
            MycologyActions.createIconographySucces(iconographicContainer)
          ),
          catchError(() => of(MycologyActions.loadMushroomsFailed()))
        )
      )
    )
  );
}

@Injectable()
export class LoadMushroomEffects {
  constructor(
    private actions$: Actions,
    private mycologyService: MycologyService
  ) {}

  loadMushroom$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MycologyActions.loadMushroomRequest),
      exhaustMap(({ id }) =>
        this.mycologyService.getMushroom(id).pipe(
          mergeMap((mushroom) => [
            MycologyActions.loadMushroomSucces(mushroom),
            ...(mushroom.haveIconography
              ? [
                  MycologyActions.loadIconographyRequest({
                    mushroomID: mushroom.id!,
                  }),
                ]
              : []),
          ]),
          catchError(() => of(MycologyActions.loadMushroomFailed()))
        )
      )
    )
  );
}

@Injectable()
export class LoadIconographyEffects {
  constructor(
    private actions$: Actions,
    private mycologyService: MycologyService
  ) {}

  loadIconography$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MycologyActions.loadIconographyRequest),
      switchMap(({ mushroomID }) =>
        this.mycologyService.getIconography(mushroomID).pipe(
          map((iconographicContainer) =>
            MycologyActions.loadIconographySucces(iconographicContainer)
          ),
          catchError(() => of(MycologyActions.loadIconographyFailed()))
        )
      )
    )
  );
}
