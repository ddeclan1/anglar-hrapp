import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EmpComponent } from './emp/emp.component';

@NgModule({ //Module configuration
  declarations: [ //List of all types in this module
    AppComponent, EmpComponent
  ],
  imports: [ //List of all other modules referred to in this module
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [], //<4.x, List of services in this module
  bootstrap: [AppComponent] //Startup component name
})
export class AppModule { }
