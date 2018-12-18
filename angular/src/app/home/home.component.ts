import { Component, OnInit } from '@angular/core';
import { EtatCivilService } from 'src/app/etat-civil.service';

import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";
import { AddNewPostComponent } from '../add-new-post/add-new-post.component';
import { DeletePostComponent } from '../delete-post/delete-post.component';
import { EditPostComponent } from '../edit-post/edit-post.component';
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
  bsModalRef: BsModalRef;
  itemsPerPage: number;
  totalItems: number;
  page: number;
  previousPage: number;

  constructor(private blogService: EtatCivilService, private bsModalService: BsModalService) {
    //this.getPosts();
    this.page = 1;
    this.itemsPerPage = 5;
  }
/*
  getPosts() {
    this.blogService.getEtatCivilList().subscribe(data => {
      this.postList = data;
    }, error => {
      console.log("Error while getting posts ", error);
    });
  }
*/
  addNewPost() {
    this.bsModalRef = this.bsModalService.show(AddNewPostComponent);
    this.bsModalRef.content.event.subscribe(result => {
      if (result == 'OK') {
        setTimeout(() => {
          this.postList = [];
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
      this.blogService.filterByCriteria(this.criteria).subscribe(res => {
        this.postList = res['content'];
        this.page = res['number']-1;
        this.totalItems = res['totalElements'];
        this.itemsPerPage = res['size'];
      }, error => {
        console.log("Error while getting posts ", error);
      });
    } else {
      this.loadData();
    }
  }

  loadPage(page: number) {
    if (page !== this.previousPage) {
      this.previousPage = page;
      this.loadData();
    }
  }

  loadData() {
    this.blogService.getEtatCivilList(this.page).subscribe(
      res => {
        this.postList = res['content'];
        this.page = res['number'];
        this.totalItems = res['totalElements'];
        this.itemsPerPage = res['size'];
      },
      error => {
        console.log("Error while getting posts ", error);
      });
  }

  onKeydown($event) {
    this.filterByName();
  }


  ngOnInit() {
    this.loadData();
  }
}