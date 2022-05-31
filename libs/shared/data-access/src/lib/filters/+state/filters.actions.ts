import { IGlobalFilter } from './filters.model';

export class SetGlobalFilter {
  static readonly type = '[Filters] SetGlobalFilter';
  constructor(public payload: IGlobalFilter) {}
}
