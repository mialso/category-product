import { VIEW_MODEL_ID } from './constant';

export const viewState = (selector) => (state) => selector(state[VIEW_MODEL_ID])
export const viewById = (id) => viewState(state => state.byId(id))
export const viewIds = viewState(state => state.ids)
export const viewCurrentId = viewState(state => state.currentId)
export const viewName = (id) => viewState(state => state.byId[id].name)
