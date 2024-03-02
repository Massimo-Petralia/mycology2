import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { catchError, forkJoin, mergeMap, of, switchMap } from 'rxjs';
import { MycologyService } from '../services/mycology.service';
import * as MycologyActions from '../mycology-state/mycology.actions';
import { Router } from '@angular/router';

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
export class DeleteMushroomsEffects {
  constructor(
    private actions$: Actions,
    private mycologyService: MycologyService,
    private router: Router
  ) {}
  deleteMushrooms$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MycologyActions.deleteMushroomsRequest),
      switchMap(({ mushrooms }) => {
        const observables = mushrooms.map((mushroom) =>
          this.mycologyService.deleteMushrooms(mushroom.id!)
        );
        return forkJoin(observables).pipe(
          switchMap(() => {
            const deleteMushroomsSucces = MycologyActions.deleteMushroomsSucces(
              {
                deletedMushroomsNumber: mushrooms.length,
              }
            );
            if (this.router.url === `/mycology/mushrooms/${mushrooms[0].id}`) {
              this.router.navigate(['mycology/mushrooms']);
            }

            return of(deleteMushroomsSucces).pipe(
              switchMap(() => {
                const mushroomsIconographyID = mushrooms
                  .filter((mushroom) => mushroom.iconographyID !== null)
                  .map((mushroom) => mushroom.iconographyID as string);
                if (mushroomsIconographyID.length !== 0) {
                  return of(
                    MycologyActions.deleteIconographiesRequest({
                      mushroomsIconographyID: mushroomsIconographyID,
                    })
                  );
                }
                return of(deleteMushroomsSucces);
              })
            );
          }),
          catchError(() => of(MycologyActions.deleteMushroomsFailed()))
        );
      })
    )
  );
}
@Injectable()
export class DeleteIconographiesEffects {
  constructor(
    private actions$: Actions,
    private mycologyService: MycologyService
  ) {}
  deleteIconographies$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MycologyActions.deleteIconographiesRequest),
      switchMap(({ mushroomsIconographyID }) => {
        const observables = mushroomsIconographyID.map((iconographyID) =>
          this.mycologyService.deleteIconographies(iconographyID)
        );
        return forkJoin(observables).pipe(
          switchMap(() => {
            return of(MycologyActions.deleteIconographiesSucces());
          }),
          catchError(() => of(MycologyActions.deleteIconographiesFailed()))
        );
      })
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
            MycologyActions.deleteIconographiesRequest({
              mushroomsIconographyID: [
                requestPayload.iconographicContainer.id!,
              ],
            })
          );
        }
        return of();
      }),

      catchError(() => of(MycologyActions.saveMycologyFailed()))
    )
  );
}
