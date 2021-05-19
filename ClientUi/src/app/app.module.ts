import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { GlobalModule } from './global/global.module'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoaderInterceptor } from './http-interceptors/loader-interceptor';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { StudentDetailsComponent } from './home/student-details/student-details.component';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    StudentDetailsComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    GlobalModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
