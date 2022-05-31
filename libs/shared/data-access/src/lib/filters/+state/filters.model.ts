export interface IGlobalFilter {
  type: string;
  company: string;
}

export interface IGlobalFilterStateModel {
  globalFilters: IGlobalFilter;
}
