import { Component, OnInit } from '@angular/core';
import { EtatCivilService } from 'src/app/etat-civil.service';

import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";
import { AddNewPostComponent } from '../add-new-contact/add-new-contact.component';
import { DeletePostComponent } from '../delete-contact/delete-contact.component';
import { EditPostComponent } from '../edit-contact/edit-contact.component';
import { EtatCivil } from '../model/etat-civil.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  title = 'AngularCRUDExample';
  postList: any[] = [];
  criteria: string;
  itemsPerPage: number;
  totalItems: number;
  page: number;
  previousPage: number;
  bsModalRef: BsModalRef;
  sortColumn: string;
  sortDirection: string;

  constructor(private blogService: EtatCivilService, private bsModalService: BsModalService) {
    this.page = 1;
    this.sortColumn = 'id';
    this.sortDirection = 'asc';
  }

  ngOnInit() {
    this.loadData();
    this.page = 1;
    this.itemsPerPage = 5;
  }

  addNewPost() {
    this.bsModalRef = this.bsModalService.show(AddNewPostComponent);
    this.bsModalRef.content.event.subscribe(result => {
      if (result == 'OK') {
        setTimeout(() => {
          this.postList = [];
          this.page = 1;
          this.loadData();
        }, 500);
      }
    });
  }

  deletePost(etatCivil: EtatCivil) {
    this.bsModalRef = this.bsModalService.show(DeletePostComponent);
    this.bsModalRef.content.id = etatCivil.id;
    this.bsModalRef.content.nom = etatCivil.nom;
    this.bsModalRef.content.prenom = etatCivil.prenom;
    this.bsModalRef.content.event.subscribe(result => {
      console.log("deleted", result);
      if (result == 'OK') {
        setTimeout(() => {
          this.postList = [];
          this.page = 1;
          this.loadData();
        }, 500);
      }
    });
  }

  editPost(postId: number) {
    this.blogService.changeEtatCivilId(postId);

    this.bsModalRef = this.bsModalService.show(EditPostComponent);
    this.bsModalRef.content.event.subscribe(result => {
      if (result == 'OK') {
        setTimeout(() => {
          this.loadData();
        }, 500);
      }
    });
  }

  filterByName() {
    if (this.criteria && this.criteria !== '') {
      this.blogService.filterByCriteria(this.criteria, this.page).subscribe(
        res => {
          this.itemsPerPage = res['size'];
          this.totalItems = res['totalElements'];
          this.postList = res['content'];
          this.page = res['number']+1;
        }, error => console.log("Error while getting etat civil ", error)
      );
    } else {
      this.loadData();
    }
  }

  loadPage(page: number) {
    if (page !== this.previousPage) {
      this.previousPage = page;
      this.loadDataLocal();
    }
  }

  loadDataLocal() {
    console.log("Error while getting etat civil ", this.postList);
  }
  loadData() {
    this.blogService.getEtatCivilList(this.page).subscribe(
      res => {
        console.log("Error while getting etat civil ", res);
        this.itemsPerPage = res['size'];
        this.totalItems = res['totalElements'];
        this.postList = res['content'];
        this.page = res['number']+1;
      }, error => console.log("Error while getting etat civil ", error)
    );
  }

  onKeydown($event) {
    this.filterByName();
  }
}
