import { createAction, props } from "@ngrx/store";

export const loadMushroomsRequest = createAction(
    '[Mushroom Table Page] Load Paginated Mushroom Table Request',
    props<{pageIndex: number}>()
)