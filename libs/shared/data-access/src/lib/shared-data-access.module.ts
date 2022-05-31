import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { environment } from '../environments/environment';
import { NgxsModule } from '@ngxs/store';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsStoragePluginModule } from '@ngxs/storage-plugin';
import { FiltersState } from './filters/+state/filters.state';

@NgModule({
  imports: [
    CommonModule,
    NgxsModule.forRoot([FiltersState], {
      developmentMode: !environment.production,
    }),
    NgxsStoragePluginModule.forRoot({ key: 'filters' }),
    NgxsReduxDevtoolsPluginModule.forRoot({ disabled: environment.production }),
  ],
})
export class SharedDataAccessModule {}
