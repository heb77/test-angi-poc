import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker'

import { AppComponent } from './app.component';
import { TasklistComponent } from './tasklist/tasklist.component';
import { HeaderComponent } from './header/header.component';
import { SingleTaskComponent } from './single-task/single-task.component';
import { HomeComponent } from './home/home.component';
import { AppRoutingModule } from './app-routing.module';
import { SelectMaccComponent } from './zahlungsauftrag/select-macc/select-macc.component';
import { ShowResultComponent } from './zahlungsauftrag/show-result/show-result.component';
import { InlandComponent } from './zahlungsauftrag/inland/inland.component';
import { SwiftComponent } from './zahlungsauftrag/swift/swift.component';
import { ErrorComponent } from './zahlungsauftrag/error/error.component';
import { FooterComponent } from './footer/footer.component';
import { filterPipe, SafePipe } from 'src/pipes/custom.pipes';
import { ToastrModule } from 'ngx-toastr';
import { AuthInterceptorService } from 'src/interceptors/auth-interceptor.service';
import { LoggingInterceptorService } from 'src/interceptors/logging-interceptor.service';
import { AuthComponent } from './auth/auth.component';
import { DocumentSigningComponent } from './zahlungsauftrag/document-signing/document-signing.component';
import { CheckSignaturesComponent } from './zahlungsauftrag/check-signatures/check-signatures.component';
import { ExampleComponent } from './example/example.component';

@NgModule({
  declarations: [
    AppComponent,
    TasklistComponent,
    HeaderComponent,
    SingleTaskComponent,
    HomeComponent,
    SelectMaccComponent,
    ShowResultComponent,
    InlandComponent,
    SwiftComponent,
    ErrorComponent,
    FooterComponent,
    filterPipe,
    SafePipe,
    AuthComponent,
    DocumentSigningComponent,
    CheckSignaturesComponent,
    ExampleComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    BsDatepickerModule.forRoot(),
    ToastrModule.forRoot()
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoggingInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
