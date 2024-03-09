import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { catchError, forkJoin, map, of, switchMap } from 'rxjs';
import { MycologyService } from '../services/mycology.service';
import * as MycologyActions from '../mycology-state/mycology.actions';
import { Router } from '@angular/router';
import { Action } from '@ngrx/store';

@Injectable()
export class MicologyEffects {
  constructor(
    private actions$: Actions,
    private mycologyService: MycologyService,
    private router: Router
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
            map((response) => {
              return MycologyActions.loadMushroomsSucces({
                items: response.items,
                mushrooms: response.data,
              });
            }),
            catchError(() => of(MycologyActions.loadMushroomsFailed()))
          )
      )
    )
  );

  createMushroom$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MycologyActions.createMushroomRequest),
      switchMap((mushroom) =>
        this.mycologyService.createMushroom(mushroom).pipe(
          map((mushroom) => {
            this.router.navigate([`mycology/mushrooms/${mushroom.id}`]);
            return MycologyActions.createMushroomSucces(mushroom);
          }),
          catchError(() => of(MycologyActions.createMushroomFailed()))
        )
      )
    )
  );

  createIconography$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MycologyActions.createIconographyRequest),
      switchMap((requestPayload) =>
        this.mycologyService
          .createIconography(requestPayload.iconographicContainer)
          .pipe(
            switchMap((iconographicContainer) => {
              let actions: Action[] = [
                MycologyActions.createIconographySuccess(iconographicContainer),
              ];

              if (!requestPayload.mushroom.id) {
                actions = [
                  ...actions,
                  MycologyActions.createMushroomRequest({
                    ...requestPayload.mushroom,
                    iconographyID: iconographicContainer.id,
                  }),
                ];
              }
              if (requestPayload.mushroom.id) {
                actions = [
                  ...actions,
                  MycologyActions.updateMushroomRequest({
                    ...requestPayload.mushroom,
                    iconographyID: iconographicContainer.id,
                  }),
                ];
              }
              return actions;
            }),

            catchError(() => of(MycologyActions.createIconographyFailed()))
          )
      )
    )
  );

  loadMushroom$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MycologyActions.loadMushroomRequest),
      switchMap(({ id }) =>
        this.mycologyService.getMushroom(id).pipe(
          switchMap((mushroom) => {
            let actions: Action[] = [
              MycologyActions.loadMushroomSucces(mushroom),
            ];
            if (mushroom.iconographyID) {
              actions = [
                ...actions,
                MycologyActions.loadIconographyRequest({
                  id: mushroom.iconographyID,
                }),
              ];
            }
            return actions;
          })
        )
      ),
      catchError(() => of(MycologyActions.loadMushroomFailed()))
    )
  );

  loadIconography$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MycologyActions.loadIconographyRequest),
      switchMap(({ id }) =>
        this.mycologyService.getIconography(id!).pipe(
          map((iconographicContainer) => {
            return MycologyActions.loadIconographySucces(iconographicContainer);
          }),
          catchError(() => of(MycologyActions.loadIconographyFailed()))
        )
      )
    )
  );

  deleteMushrooms$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MycologyActions.deleteMushroomsRequest),
      switchMap(({ mushrooms }) => {
        const observables = mushrooms.map((mushroom) =>
          this.mycologyService.deleteMushrooms(mushroom.id!)
        );
        return forkJoin(observables).pipe(
          switchMap(() => {
            let actions: Action[] = [
              MycologyActions.deleteMushroomsSucces({
                deletedMushroomsNumber: mushrooms.length,
              }),
            ];
            // se changePage è su true restituisci anche chamgePage action <true>
            if (this.router.url === `/mycology/mushrooms/${mushrooms[0].id}`) {
              this.router.navigate(['mycology/mushrooms']);
            }

            return of(actions).pipe(
              switchMap(() => {
                const mushroomsIconographyID = mushrooms
                  .filter((mushroom) => mushroom.iconographyID !== null)
                  .map((mushroom) => mushroom.iconographyID as string);
                if (mushroomsIconographyID.length !== 0) {
                  actions = [
                    ...actions,
                    MycologyActions.deleteIconographiesRequest({
                      mushroomsIconographyID: mushroomsIconographyID,
                    }),
                  ];
                }
                return actions;
              })
            );
          }),
          catchError(() => of(MycologyActions.deleteMushroomsFailed()))
        );
      })
    )
  );

  deleteIconographies$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MycologyActions.deleteIconographiesRequest),
      switchMap(({ mushroomsIconographyID }) => {
        const observables = mushroomsIconographyID.map((iconographyID) =>
          this.mycologyService.deleteIconographies(iconographyID)
        );
        return forkJoin(observables).pipe(
          map(() => {
            return MycologyActions.deleteIconographiesSucces();
          }),
          catchError(() => of(MycologyActions.deleteIconographiesFailed()))
        );
      })
    )
  );

  updateMushroom$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MycologyActions.updateMushroomRequest),
      switchMap((mushroom) =>
        this.mycologyService.updateMushroom(mushroom).pipe(
          map((mushroom) => {
            return MycologyActions.updateMushroomSucces(mushroom);
          }),
          catchError(() => of(MycologyActions.updateMushroomFailed()))
        )
      )
    )
  );

  updateIconography$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MycologyActions.updateIconographyRequest),
      switchMap((requestPayload) =>
        this.mycologyService
          .updateIconography(requestPayload.iconographicContainer)
          .pipe(
            switchMap((iconographicContainer) => {
              let actions: Action[] = [
                MycologyActions.updateIconographySucces(iconographicContainer),
              ];
              if (iconographicContainer) {
                actions = [
                  ...actions,
                  MycologyActions.updateMushroomRequest(
                    requestPayload.mushroom
                  ),
                ];
              }
              return actions;
            }),
            catchError(() => of(MycologyActions.updateIconographyFailed()))
          )
      )
    )
  );

  updatePageIndex$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MycologyActions.updatePageIndexRequest),
      map(({ pageIndex }) =>
        MycologyActions.updatePageIndexSuccess({ pageIndex: pageIndex })
      )
    )
  );

  createMycology$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MycologyActions.createMycologyRequest),
      switchMap((requestPayload) => {
        let actions: Action[] = [];
        if (
          !requestPayload.mushroom.id &&
          requestPayload.iconographicContainer.formiconographyarray.length === 0
        ) {
          actions = [
            ...actions,
            MycologyActions.createMushroomRequest(requestPayload.mushroom),
          ];
        }
        if (
          !requestPayload.mushroom.id &&
          requestPayload.iconographicContainer.formiconographyarray.length !== 0
        ) {
          actions = [
            ...actions,
            MycologyActions.createIconographyRequest({
              mushroom: requestPayload.mushroom,
              iconographicContainer: requestPayload.iconographicContainer,
            }),
          ];
        }
        return actions;
      }),
      catchError(() => of(MycologyActions.createMycologyFailed()))
    )
  );

  updateMycology$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MycologyActions.updateMycologyRequest),
      switchMap((requestPayload) => {
        let actions: Action[] = [];
        if (
          requestPayload.mushroom.iconographyID === null &&
          requestPayload.iconographicContainer.formiconographyarray.length === 0
        ) {
          actions = [
            MycologyActions.updateMushroomRequest(requestPayload.mushroom),
          ];
        }
        if (
          requestPayload.mushroom.iconographyID === null &&
          requestPayload.iconographicContainer.formiconographyarray.length !== 0
        ) {
          actions = [
            MycologyActions.createIconographyRequest({
              iconographicContainer: requestPayload.iconographicContainer,
              mushroom: requestPayload.mushroom,
            }),
          ];
        }
        if (
          requestPayload.mushroom.iconographyID !== null &&
          requestPayload.iconographicContainer.formiconographyarray.length !== 0
        ) {
          actions = [
            MycologyActions.updateIconographyRequest({
              iconographicContainer: requestPayload.iconographicContainer,
              mushroom: requestPayload.mushroom,
            }),
          ];
        }
        if (
          requestPayload.mushroom.iconographyID !== null &&
          requestPayload.iconographicContainer.formiconographyarray.length === 0
        ) {
          actions = [
            MycologyActions.updateMushroomRequest({
              ...requestPayload.mushroom,
              iconographyID: null,
            }),
            MycologyActions.deleteIconographiesRequest({
              mushroomsIconographyID: [
                requestPayload.iconographicContainer.id!,
              ],
            }),
          ];
        }
        return actions;
      }),
      catchError(() => of(MycologyActions.updateMycologyFailed()))
    )
  );
}
