import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { NgxPaginationModule } from 'ngx-pagination';
import { NgProgressModule } from 'ngx-progressbar';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    NgxPaginationModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    NgProgressModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
