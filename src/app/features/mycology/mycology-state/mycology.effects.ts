import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map, mergeMap, of, switchMap } from 'rxjs';
import { MycologyService } from '../services/mycology.service';
import * as MycologyActions from '../mycology-state/mycology.actions';
// import { Mushroom } from '../models/mycology.models';
// import { TypedAction } from '@ngrx/store/src/models';
// import { Action } from 'rxjs/internal/scheduler/Action';
// const enum MycologyActionType {
//   deleteMushroomSucces = '[Mushroom API] Delete Mushroom Succes',
//   deleteIconographyRequest = '[Delete Mushroom Effects] Delete Iconography Request',
// }

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
      exhaustMap((mushroom) =>
        this.mycologyService.createMushroom(mushroom).pipe(
          map((mushroom) => MycologyActions.createMushroomSucces(mushroom)),
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
      exhaustMap((requestPayload) =>
        this.mycologyService
          .createIconography(requestPayload.iconographicContainer)
          .pipe(
            mergeMap((iconographicContainer) => [
              MycologyActions.createIconographySuccess(iconographicContainer),
              ...(!requestPayload.mushroom.id
                ? [
                    MycologyActions.createMushroomRequest({
                      ...requestPayload.mushroom,
                      iconographyID: iconographicContainer.id,
                    }),
                  ]
                : []),
                ...(requestPayload.mushroom.id ? [ MycologyActions.updateMushroomRequest({
                  ...requestPayload.mushroom,
                  iconographyID: iconographicContainer.id,
                }),
              ]:[])
            ])
          )
      ),
      catchError(() => of(MycologyActions.createIconographyFailed()))
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
      switchMap(({ id }) =>
        this.mycologyService
          .getMushroom(id)
          .pipe(map((mushroom) => MycologyActions.loadMushroomSucces(mushroom)))
      ),

      catchError(() => of(MycologyActions.loadMushroomFailed()))
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
        this.mycologyService.getIconography(id!).pipe(
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
      exhaustMap((mushroom) =>
        this.mycologyService.deleteMushroom(mushroom.id!).pipe(
          mergeMap(() => [
            MycologyActions.deleteMushroomSucces({ id: mushroom.id! }),
            ...(mushroom.iconographyID
              ? [
                  MycologyActions.deleteIconographyRequest({
                    iconographicContainerID: mushroom.iconographyID,
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
      exhaustMap(({ iconographicContainerID }) =>
        this.mycologyService.deleteIconography(iconographicContainerID).pipe(
          map(() =>
            MycologyActions.deleteIconographySucces({
              iconographicContainerID: iconographicContainerID,
            })
          ),
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
      exhaustMap((mushroom) =>
        this.mycologyService.updateMushroom(mushroom).pipe(
          map((mushroom) => MycologyActions.updateMushroomSucces(mushroom)),
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
      exhaustMap((requestPayload) =>
        this.mycologyService
          .updateIconography(requestPayload.iconographicContainer)
          .pipe(
            map((iconographicContainer) =>
              MycologyActions.updateIconographySucces(iconographicContainer)
            ),
            catchError(() => of(MycologyActions.updateMushroomFailed()))
          )
      )
    )
  );
}

//--------------------------------------------------------------------------------------------------------------------

@Injectable()
export class SaveMycologyDataEffects {
  constructor(
    private actions$: Actions,
    private mycologyService: MycologyService
  ) {}

  saveMycologyData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MycologyActions.saveMycologyRequest),
      mergeMap((requestPayload) => [
        ...(!requestPayload.mushroom.id &&
        !requestPayload.iconographicContainer.id
          ? [
              MycologyActions.createIconographyRequest({
                iconographicContainer: requestPayload.iconographicContainer,
                mushroom: requestPayload.mushroom,
              }),
            ]
          : [
              MycologyActions.updateIconographyRequest({
                iconographicContainer: requestPayload.iconographicContainer,
              }),
              MycologyActions.updateMushroomRequest(requestPayload.mushroom),
            ]),
        ...(!requestPayload.mushroom.id &&
        requestPayload.iconographicContainer.formiconographyarray.length === 0
          ? [MycologyActions.createMushroomRequest(requestPayload.mushroom)]
          : []),
        ...(requestPayload.mushroom.iconographyID === null &&
        requestPayload.iconographicContainer.formiconographyarray.length !== 0
          ? [
              MycologyActions.createIconographyRequest({
                iconographicContainer: requestPayload.iconographicContainer,
                mushroom: requestPayload.mushroom,
              }),
            ]
          : []),
      ]),

      catchError(() => of(MycologyActions.saveMycologyFailed()))
    )
  );
}
