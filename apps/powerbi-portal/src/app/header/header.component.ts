/* eslint-disable @typescript-eslint/no-empty-function */
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { SetGlobalFilter, IGlobalFilter } from '@aia.web/shared/data-access';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
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

  constructor(
    private store: Store,
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer
  ) {
    this.globalFilters = this.store.select((state) => state.filters.globalFilters);
    this.matIconRegistry.addSvgIcon(
      'logo',
      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/logo.svg')
    );
    this.matIconRegistry.addSvgIcon(
      'report',
      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/report.svg')
    );
    this.matIconRegistry.addSvgIcon(
      'user',
      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/user.svg')
    );
  }

  setGlobalFilter(filters: IGlobalFilter) {
    this.store.dispatch(new SetGlobalFilter(filters));
  }

  ngOnInit() {
    this.setGlobalFilter({ type: 'Consulting', company: 'Insight' });
  }
}
