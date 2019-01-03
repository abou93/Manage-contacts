import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from '@angular/common/http';
import { ModalModule, BsModalService } from 'ngx-bootstrap/modal';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AddNewPostComponent } from './add-new-contact/add-new-contact.component';
import { EditPostComponent } from './edit-contact/edit-contact.component';
import { DeletePostComponent } from './delete-contact/delete-contact.component';
import { EtatCivilService } from './etat-civil.service';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {NgbPaginationModule, NgbAlertModule} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    AddNewPostComponent,
    EditPostComponent,
    DeletePostComponent,
    HomeComponent,
    AddNewPostComponent,
    EditPostComponent,
    DeletePostComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    ModalModule.forRoot(),
    NgbModule,
    NgbPaginationModule, NgbAlertModule
  ],
  providers: [EtatCivilService, BsModalService],
  bootstrap: [AppComponent],
  entryComponents:[AddNewPostComponent, DeletePostComponent, EditPostComponent]
})
export class AppModule { }