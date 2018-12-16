import { Component, OnInit, EventEmitter } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { EtatCivilService } from 'src/app/etat-civil.service';

@Component({
  selector: 'app-delete-post',
  templateUrl: './delete-post.component.html',
  styleUrls: ['./delete-post.component.css']
})
export class DeletePostComponent implements OnInit {

  id: number;
  nom: string;
  prenom: string;
  event: EventEmitter<any> = new EventEmitter();
  
  constructor(private bsModalRef: BsModalRef, private blogService: EtatCivilService) {

  }

  deletePost() {
    this.blogService.deleteEtatCivil(this.id).subscribe(response => {
      console.log("deleted");
    });
    this.event.emit('OK');
    this.bsModalRef.hide();
  }

  onClose() {
    this.bsModalRef.hide();

  }
  ngOnInit() {
  }
}
