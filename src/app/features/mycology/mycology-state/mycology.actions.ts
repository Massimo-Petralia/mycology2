import { createAction, props } from "@ngrx/store";
import { IconographicContainer, Mushroom } from "../models/mycology.models";

export const loadMushroomsRequest = createAction(
    '[Mushroom Table Page] Load Paginated Mushroom Table Request',
    props<{pageIndex: number}>()
)

export const loadMushroomsSucces = createAction(
    '[Mushrooms API] Load Paginated Mushroom Table Succes',
    props<{items: number, mushrooms: Mushroom[]}>()
)

export const loadMushroomsFailed = createAction(
    '[Mushrooms API] Load Paginated Mushroom Table Failed'
)
export const createMushroomRequest = createAction(
    '[Form Mushroom Page] Create Mushroom Request',
    props<{mushroom: Mushroom, iconographicContainer: IconographicContainer}>()
)

export const createMushroomSucces = createAction(
    '[Mushroom API] Create Mushroom Succes',
    props<Mushroom>()
)

export const createMushroomFailed = createAction(
    '[Mushroom API] Create Mushroom Failed'
)

export const createIconographyRequest = createAction(
    '[Create Mushroom Effects] Create Iconography Request',
    props<IconographicContainer>()
)

export const createIconographySucces = createAction(
    '[Iconography API] Create Iconography Succes',
    props<IconographicContainer>()
)

export const createIconographyFailed = createAction(
    '[Iconography API] Create Iconography Failed'
)
export const loadMushroomRequest = createAction(
    '[Form Mushroom Page] Load Mushroom Request',
    props<{id: string}>()
    )
    
    export const loadMushroomSucces = createAction(
        '[Mushroom API] Load Mushroom Succes',
        props<Mushroom>()
        )
        
        export const loadMushroomFailed = createAction(
            '[Mushroom API] Load Mushroom Failed'
            )
            
            export const loadIconographyRequest = createAction(
                '[Load Mushroom Effects] Load Iconography Request',
                props<{id: string}>()
                )
                
                export const  loadIconographySucces = createAction(
                    '[Iconography API] Load Iconography Succes',
                    props<IconographicContainer>()
                    )
                    
                    export const loadIconographyFailed = createAction(
                        '[Iconography API] Load Iconography Failed'
                        )
//-----------------------------------------------------------------------------------------------------------------------------------------------------

export const deleteMushroomRequest = createAction(
    '[Form Mushroom] Delete Mushroom Request',
    props<{id: string , haveIconography?: boolean, iconographicContainerID: string}>() //SE NON PASSI SIA ID CHE PROPRIETÀ haveIconography va tutto in PALLA
)

export const deleteMushroomSucces = createAction(
    '[Mushroom API] Delete Mushroom Succes',
    props<{id: string}>()
)

export const deleteMushroomFailed = createAction(
    '[Mushroom API] Delete Mushroom failed'
)

export const deleteIconographyRequest = createAction(
    '[Delete Mushroom Effects] Delete Iconography Request',
    props<{iconographicContainerID: string}>()
)

export const deleteIconographySucces = createAction(
    '[Iconography API] Delete Iconography Succes',
)

export const deleteIconographyFailed = createAction(
    '[Iconography API] Delete Iconography Failed'
)

