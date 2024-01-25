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
                id: mushroom.id,
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
                    id: mushroom.id!,
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
      switchMap(({ id }) =>
        this.mycologyService.getIconography(id).pipe(
          map((iconographicContainer) =>
            MycologyActions.loadIconographySucces(iconographicContainer)
          ),
          catchError(() => of(MycologyActions.loadIconographyFailed()))
        )
      )
    )
  );
}

@Injectable()
export class DeleteMushroomEffects {
  constructor(
    private actions$: Actions,
    private mycologyService: MycologyService
  ) {}

  deleteMushroom$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MycologyActions.deleteMushroomRequest),
      exhaustMap((requestPayload) =>
        this.mycologyService.deleteMushroom(requestPayload.id).pipe(
          // map(() => id ),
          mergeMap(() => [
            MycologyActions.deleteMushroomSucces({ id: requestPayload.id }),
            ...(requestPayload.haveIconography
              ? [
                  MycologyActions.deleteIconographyRequest({
                    iconographicContainerID:
                      requestPayload.iconographicContainerID,
                  }),
                ]
              : []),
          ]),

          catchError(() => of(MycologyActions.deleteMushroomFailed()))
        )
      )
    )
  );
}

@Injectable()
export class DeleteIconographyEffects {
  constructor(
    private actions$: Actions,
    private mycologyService: MycologyService
  ) {}

  deleteIconography$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MycologyActions.deleteIconographyRequest),
      switchMap(({ iconographicContainerID }) =>
        this.mycologyService.deleteIconography(iconographicContainerID).pipe(
          map(() => MycologyActions.deleteIconographySucces()),
          catchError(() => of(MycologyActions.deleteIconographyFailed()))
        )
      )
    )
  );
}

@Injectable()
export class UpdateMushroomEffects {
  constructor(
    private actions$: Actions,
    private mycologyService: MycologyService
  ) {}

  updateMushroom$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MycologyActions.updateMushroomRequest),
      exhaustMap((requestPayload) =>
        this.mycologyService.updateMushroom((requestPayload.iconographicContainer.formiconographyarray.length !== 0 ? {...requestPayload.mushroom, haveIconography: true }: {...requestPayload.mushroom, haveIconography: false })).pipe(
          mergeMap((mushroom) => [
            MycologyActions.updateMushroomSucces(mushroom),
            ...(requestPayload.mushroom.haveIconography && requestPayload.iconographicContainer.formiconographyarray.length !== 0 ? [MycologyActions.updateIconographyRequest(requestPayload.iconographicContainer)]:[]),
            ...(!requestPayload.mushroom.haveIconography && requestPayload.iconographicContainer.formiconographyarray.length !== 0 ? [MycologyActions.createIconographyRequest(requestPayload.iconographicContainer)]:[]),
            ...(requestPayload.iconographicContainer.formiconographyarray.length === 0 ? []:[]),
            ...(requestPayload.mushroom.haveIconography && requestPayload.iconographicContainer.formiconographyarray.length === 0 ? [MycologyActions.deleteIconographyRequest({iconographicContainerID: requestPayload.mushroom.id!})]:[])
            // MycologyActions.updateMushroomSucces(mushroom),
            // ...(requestPayload.mushroom.haveIconography
            //   ? [
            //       MycologyActions.updateIconographyRequest(
            //         requestPayload.iconographicContainer
            //       ),
            //     ]
            //   : []),
          ]),
          catchError(() => of(MycologyActions.updateMushroomFailed()))
          
        )
      )
    )
  );
}

@Injectable()
export class UpdateIconographyEffects {
  constructor(
    private actions$: Actions,
    private mycologyService: MycologyService
  ) {}

  updateIconography$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MycologyActions.updateIconographyRequest),
      switchMap((iconographicContainer) =>
        this.mycologyService.updateIconography(iconographicContainer).pipe(
          map((iconographicContainer) =>
            MycologyActions.updateIconographySucces(iconographicContainer)
          ),
          catchError(() => of(MycologyActions.updateIconographyFailed()))
        )
      )
    )
  );
}
