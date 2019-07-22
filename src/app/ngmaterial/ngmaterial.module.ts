import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatTabsModule} from '@angular/material/tabs';
import {MatTableModule} from '@angular/material/table';
import {MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatListModule} from '@angular/material/list';


@NgModule({
imports: [MatButtonModule, MatToolbarModule, MatTabsModule, MatTableModule, MatDialogModule, MatFormFieldModule,MatListModule],
exports: [MatButtonModule, MatToolbarModule, MatTabsModule, MatTableModule, MatDialogModule, MatFormFieldModule, MatListModule]
})
export class MaterialAppModule {}
