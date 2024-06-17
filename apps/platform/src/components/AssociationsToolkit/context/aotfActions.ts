import { Action, ActionType, Pagination, RowInteractorsKey } from "../types";

export function onPaginationChange(pagination: Pagination): Action {
  return {
    type: ActionType.PAGINATE,
    pagination: pagination,
  };
}

export function setInteractors(id: RowInteractorsKey, source: string): Action {
  return {
    type: ActionType.SET_INTERACTORS,
    payload: { id, source },
  };
}
