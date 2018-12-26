import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {PrettyJsonModule} from 'angular2-prettyjson';
import { formManagerModule} from '../../../dist/';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    formManagerModule,
    PrettyJsonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
