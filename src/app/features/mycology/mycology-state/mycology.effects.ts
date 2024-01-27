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
      filter(
        ({ iconographicContainer }) =>
          iconographicContainer.formiconographyarray.length !== 0
      ),
      switchMap((requestPayload) =>
        this.mycologyService
          .createIconography(requestPayload.iconographicContainer)
          .pipe(
            mergeMap((response) => [
              MycologyActions.createIconographySucces(
                requestPayload.iconographicContainer
              ),
              ...(requestPayload.mushroom.haveIconography === false
                ? [
                    MycologyActions.updateMushroomRequest({
                      ...requestPayload.mushroom,
                      haveIconography: true,
                      iconographyID: response.id
                    })
                  ]
                : [
                    MycologyActions.createMushroomRequest({
                      ...requestPayload.mushroom,
                      iconographyID: response.id,
                    }),
                  ]),
            ]),
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
      exhaustMap(({ id }) =>
        this.mycologyService.getMushroom(id).pipe(
          mergeMap((mushroom) => [
            MycologyActions.loadMushroomSucces(mushroom),
            ...(mushroom.iconographyID
              ? [
                  MycologyActions.loadIconographyRequest({
                    id: mushroom.iconographyID!,
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
      exhaustMap((mushroom) =>
        this.mycologyService.deleteMushroom(mushroom.id!).pipe(
          map(() => MycologyActions.deleteMushroomSucces({ id: mushroom.id! })),
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
      exhaustMap((iconographicContainer) =>
        this.mycologyService
          .deleteIconography(iconographicContainer.id!)
          .pipe(
            map(() =>
              MycologyActions.deleteIconographySucces({
                iconographicContainerID: iconographicContainer.id!,
              })
            )
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
        this.mycologyService.updateIconography(requestPayload.iconographicContainer).pipe(
          mergeMap((iconographicContainer) =>[

            MycologyActions.updateIconographySucces(iconographicContainer),
            ...(requestPayload.iconographicContainer.formiconographyarray.length !==0 ? [ MycologyActions.updateMushroomRequest({...requestPayload.mushroom!, iconographyID: iconographicContainer.id})]:[])
          ]
          ),
         // filter(() => (requestPayload.iconographicContainer.formiconographyarray.length !==0)),
         // MycologyActions.updateMushroomRequest({...requestPayload.mushroom, iconographyID: iconographicContainer.id}),
          catchError(() => of(MycologyActions.updateMushroomFailed()))
        )
      )
    )
  );
}

//--------------------------------------------------------------------------------------------------------------------

// @Injectable()
// export class SaveMycologyDataEffects {
//   constructor(
//     private actions$: Actions,
//     private mycologyService: MycologyService
//   ) {}

//   saveMycologyData$ = createEffect(() =>
//     this.actions$.pipe(
//       ofType(MycologyActions.saveMycologyRequest),
//       switchMap((requestPayload) => {
//         const actionsToDispatch = [
//           MycologyActions.updateMushroomRequest(requestPayload.mushroom),
//           ...(requestPayload.iconographicContainer.formiconographyarray
//             .length !== 0
//             ? [
//                 MycologyActions.updateIconographyRequest(
//                   requestPayload.iconographicContainer
//                 ),
//               ]
//             : []),
//           ...(requestPayload.iconographicContainer.formiconographyarray
//             .length === 0
//             ? [
//                 [
//                   MycologyActions.deleteIconographyRequest(
//                     requestPayload.iconographicContainer
//                   ),
//                   ...(requestPayload.mushroom.haveIconography === true
//                     ? [
//                         MycologyActions.updateMushroomRequest({
//                           ...requestPayload.mushroom,
//                           haveIconography: false,
//                         }),
//                       ]
//                     : []),
//                 ],
//               ]
//             : []),
//           ...(requestPayload.iconographicContainer.formiconographyarray
//             .length !== 0 && requestPayload.mushroom.haveIconography === false
//             ? [
//                 MycologyActions.createIconographyRequest({
//                   iconographicContainer: requestPayload.iconographicContainer,
//                   mushroom: requestPayload.mushroom,
//                 }),
//               ]
//             : []),
//         ];
//         return from(actionsToDispatch);
//       }),
//       map(() => MycologyActions.saveMycologySucces()),
//       catchError(() => of(MycologyActions.saveMycologyFailed()))
//     )
//   );
// }
