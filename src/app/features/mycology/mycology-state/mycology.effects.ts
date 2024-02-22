import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { catchError, mergeMap, of, switchMap } from 'rxjs';
import { MycologyService } from '../services/mycology.service';
import * as MycologyActions from '../mycology-state/mycology.actions';
import { Router } from '@angular/router';
import { SharedParametersService } from '../services/shared-parameters.service';

@Injectable()
export class LoadMushroomsEffects {
  constructor(
    private actions$: Actions,
    private mycologyService: MycologyService
  ) {}

  loadMushrooms$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MycologyActions.loadMushroomsRequest),
      switchMap((requestPayload) =>
        this.mycologyService
          .getMushrooms(
            requestPayload.pageIndex,
            requestPayload.filter,
            requestPayload.search
          )
          .pipe(
            switchMap((response) => {
              return of(
                MycologyActions.loadMushroomsSucces({
                  items: response.items,
                  mushrooms: response.data,
                })
              );
            }),
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
    private mycologyService: MycologyService,
    private router: Router
  ) {}

  createMushroom$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MycologyActions.createMushroomRequest),
      switchMap((mushroom) =>
        this.mycologyService.createMushroom(mushroom).pipe(
          mergeMap((mushroom) => {
            this.router.navigate([`mycology/mushrooms/${mushroom.id}`]);
            return of(MycologyActions.createMushroomSucces(mushroom));
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
      switchMap((requestPayload) =>
        this.mycologyService
          .createIconography(requestPayload.iconographicContainer)
          .pipe(
            switchMap((iconographicContainer) => {
              MycologyActions.createIconographySuccess(iconographicContainer);
              if (!requestPayload.mushroom.id) {
                return of(
                  MycologyActions.createMushroomRequest({
                    ...requestPayload.mushroom,
                    iconographyID: iconographicContainer.id,
                  })
                );
              } else if (requestPayload.mushroom.id) {
                return of(
                  MycologyActions.updateMushroomRequest({
                    ...requestPayload.mushroom,
                    iconographyID: iconographicContainer.id,
                  })
                );
              }
              return of();
            }),

            catchError(() => of(MycologyActions.createIconographyFailed()))
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
      switchMap(({ id }) =>
        this.mycologyService.getMushroom(id).pipe(
          mergeMap((mushroom) => [
            MycologyActions.loadMushroomSucces(mushroom),
            ...(mushroom.iconographyID
              ? [
                  MycologyActions.loadIconographyRequest({
                    id: mushroom.iconographyID,
                  }),
                ]
              : []),
          ])
        )
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
          switchMap((iconographicContainer) => {
            return of(
              MycologyActions.loadIconographySucces(iconographicContainer)
            );
          }),
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
    private mycologyService: MycologyService,
    private router: Router
  ) {}
  deleteMushroom$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MycologyActions.deleteMushroomRequest),
      switchMap(({ mushroom }) =>
        this.mycologyService.deleteMushroom(mushroom.id!).pipe(
          switchMap(() => {
            const deleteMushroomSucces = MycologyActions.deleteMushroomSucces({
              id: mushroom.id!,
            });
            this.router.navigate(['mycology/mushrooms']);
            return of(deleteMushroomSucces).pipe(
              switchMap(() => {
                if (mushroom.iconographyID !== null) {
                  return of(
                    MycologyActions.deleteIconographyRequest({
                      iconographicContainerID: mushroom.iconographyID!,
                    })
                  );
                }
                return of(deleteMushroomSucces);
              })
            );
          }),
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
      switchMap((requestPayload) =>
        this.mycologyService
          .deleteIconography(requestPayload.iconographicContainerID)
          .pipe(
            switchMap(() => {
              return of(MycologyActions.deleteIconographySucces());
            }),
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
    private mycologyService: MycologyService,
    private paramsService: SharedParametersService
  ) {}

  updateMushroom$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MycologyActions.updateMushroomRequest),
      switchMap((mushroom) =>
        this.mycologyService.updateMushroom(mushroom).pipe(
          switchMap((mushroom) => {
            return of(MycologyActions.updateMushroomSucces(mushroom));
          }),
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
      switchMap((requestPayload) =>
        this.mycologyService
          .updateIconography(requestPayload.iconographicContainer)
          .pipe(
            switchMap((iconographicContainer) => {
              if (iconographicContainer) {
                MycologyActions.updateIconographySucces(iconographicContainer);
              }
              return of(
                MycologyActions.updateMushroomRequest(requestPayload.mushroom)
              );
            }),
            catchError(() => of(MycologyActions.updateIconographyFailed()))
          )
      )
    )
  );
}

@Injectable()
export class SaveMycologyDataEffects {
  constructor(private actions$: Actions) {}

  saveMycologyData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MycologyActions.saveMycologyRequest),
      mergeMap((requestPayload) => {
        if (
          !requestPayload.mushroom.id &&
          requestPayload.iconographicContainer.formiconographyarray.length === 0
        ) {
          return of(
            MycologyActions.createMushroomRequest(requestPayload.mushroom)
          );
        } else if (
          !requestPayload.mushroom.id &&
          requestPayload.iconographicContainer.formiconographyarray.length !== 0
        ) {
          return of(
            MycologyActions.createIconographyRequest({
              iconographicContainer: requestPayload.iconographicContainer,
              mushroom: requestPayload.mushroom,
            })
          );
        } else if (
          requestPayload.mushroom.iconographyID === null &&
          requestPayload.iconographicContainer.formiconographyarray.length === 0
        ) {
          return of(
            MycologyActions.updateMushroomRequest(requestPayload.mushroom)
          );
        } else if (
          requestPayload.mushroom.iconographyID === null &&
          requestPayload.iconographicContainer.formiconographyarray.length !== 0
        ) {
          return of(
            MycologyActions.createIconographyRequest({
              iconographicContainer: requestPayload.iconographicContainer,
              mushroom: requestPayload.mushroom,
            })
          );
        } else if (
          requestPayload.mushroom.id &&
          requestPayload.iconographicContainer.formiconographyarray.length !== 0
        ) {
          return of(
            MycologyActions.updateIconographyRequest({
              iconographicContainer: requestPayload.iconographicContainer,
              mushroom: requestPayload.mushroom,
            })
          );
        } else if (
          requestPayload.iconographicContainer.id &&
          requestPayload.iconographicContainer.formiconographyarray.length === 0
        ) {
          return of(
            MycologyActions.updateMushroomRequest({
              ...requestPayload.mushroom,
              iconographyID: null,
            }),
            MycologyActions.deleteIconographyRequest({
              iconographicContainerID: requestPayload.iconographicContainer.id!,
            })
          );
        }
        return of();
      }),

      catchError(() => of(MycologyActions.saveMycologyFailed()))
    )
  );
}
