import { Component } from '@angular/core';
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
export class HomeComponent {
  title = 'AngularCRUDExample';
  postList: any[] = [];
  criteria: string;
  bsModalRef: BsModalRef;

  constructor(private blogService: EtatCivilService, private bsModalService: BsModalService) {
    //this.getPosts();
    this.loadData();
  }

  getPosts() {
    this.blogService.getEtatCivilList().subscribe(data => {
      this.postList = data;
    }, error => {
      console.log("Error while getting posts ", error);
    });
  }

  addNewPost() {
    this.bsModalRef = this.bsModalService.show(AddNewPostComponent);
    this.bsModalRef.content.event.subscribe(result => {
      if (result == 'OK') {
        setTimeout(() => {
          this.postList = [];
          this.getPosts();
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
          this.getPosts();
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
          this.getPosts();
        }, 500);
      }
    });
  }

  filterByName() {
    if (this.criteria && this.criteria !== '') {
      this.blogService.filterByCriteria(this.criteria).subscribe(data => {
        this.postList = data;
      }, error => {
        console.log("Error while getting posts ", error);
      });
    } else {
      this.loadData();
    }
  }

  itemsPerPage: number;
  totalItems: 5;
  page: number;
  previousPage: number;

  loadPage(page: number) {
    if (page !== this.previousPage) {
      this.previousPage = page;
      this.loadData();
    }
  }

  loadData() {
    this.blogService.getEtatCivilList().subscribe(
      (res: Response) => {
        this.postList = res['content'];
        this.page = res['page'];
      },
      (res: Response) => console.log("Error while getting posts ", res.json)
      )
  }

  onKeydown($event) {
    this.filterByName();
  }


}