/* eslint-disable @typescript-eslint/no-empty-function */
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { SetGlobalFilter, IGlobalFilter } from '@aia.web/shared/data-access';
import { Observable } from 'rxjs';

@Component({
  selector: 'aia-web-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  portalName = { value: 'Interactive Analytics' };
  titleName = { value: 'Global Filters' };
  typeName = { value: 'Type' };
  companyName = { value: 'Company' };
  globalFilters: Observable<[IGlobalFilter]>;

  constructor(private store: Store) {
    this.globalFilters = this.store.select((state) => state.filters.globalFilters);
  }

  setGlobalFilter(filters: IGlobalFilter) {
    this.store.dispatch(new SetGlobalFilter(filters));
  }

  ngOnInit() {
    this.setGlobalFilter({ type: 'Consulting', company: 'Insight' });
  }
}
