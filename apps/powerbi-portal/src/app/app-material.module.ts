import { NgModule } from '@angular/core';

import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';

@NgModule({
  exports: [MatIconModule, MatButtonModule, MatMenuModule],
})
export class AppMaterialModule {}
