import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AboutPageComponent } from './about-page/about-page.component';
import { WizardComponent } from './wizard/wizard.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { RouterModule, Routes } from '@angular/router';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule, MatButtonModule, MatInputModule, MatSlideToggleModule, MatFormFieldModule, MatStepperModule } from '@angular/material';
import { HttpClientModule } from '@angular/common/http';
import { Nl2BrPipeModule } from 'nl2br-pipe';

const appRoutes: Routes = [
  { path: 'about', component: AboutPageComponent },
  { path: '', component: WizardComponent },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    AboutPageComponent,
    WizardComponent,
    NotFoundComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true }
    ),
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatInputModule,
    MatSlideToggleModule,
    MatFormFieldModule,
    MatStepperModule,
    HttpClientModule,
    Nl2BrPipeModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
