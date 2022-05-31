import { Injectable } from '@angular/core';
import { State, Action, StateContext, Selector } from '@ngxs/store';
import { patch, append } from '@ngxs/store/operators';
import { IGlobalFilter } from './filters.model';
import { SetGlobalFilter } from './filters.actions';

export class FiltersStateModel {
  globalFilters: IGlobalFilter[] = [];
}

@State<FiltersStateModel>({
  name: 'filters',
  defaults: {
    globalFilters: [],
  },
})
@Injectable()
export class FiltersState {
  @Selector()
  static getGlobalFilter(state: FiltersStateModel) {
    return state.globalFilters;
  }

  @Action(SetGlobalFilter)
  setGlobalFilter(ctx: StateContext<FiltersStateModel>, { payload }: SetGlobalFilter) {
    const state = ctx.getState().globalFilters;
    if (Object.keys(state).length === 0) {
      ctx.setState(
        patch({
          globalFilters: append([payload]),
        })
      );
    }
  }
}
