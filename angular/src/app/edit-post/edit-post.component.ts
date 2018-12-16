import { Component, OnInit, Input, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { EtatCivilService } from 'src/app/etat-civil.service';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { EtatCivil } from '../model/etat-civil.model';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.css']
})
export class EditPostComponent implements OnInit {

  editPostForm: FormGroup;
  etatCivilList: EtatCivil[] = [];
  postId: number;
  postData: any;
  event: EventEmitter<any> = new EventEmitter();

  constructor(private builder: FormBuilder, private blogService: EtatCivilService, private bsModalRef: BsModalRef) {
    this.editPostForm = this.builder.group({
      nom: new FormControl('', []),
      prenom: new FormControl('', []),
      email: new FormControl('', []),
      telephone: new FormControl('', [])
    });

    this.blogService.etatCivilIdData.subscribe(id => {
      this.postId = id;
      if (this.postId !== undefined) {
        this.blogService.getEtatCivil(this.postId).subscribe(data => {
          this.postData = data;
          
          if (this.editPostForm!=null && this.postData!=null) {
            this.editPostForm.controls['nom'].setValue(this.postData.nom);
            this.editPostForm.controls['prenom'].setValue(this.postData.prenom);
            this.editPostForm.controls['email'].setValue(this.postData.email);
            this.editPostForm.controls['telephone'].setValue(this.postData.telephone);
          }
        }, error => { console.log("Error while getting post details") });
      }
    });
  }

  onPostEditFormSubmit() {
    let postData: EtatCivil = new EtatCivil(
      this.editPostForm.get('nom').value,
      this.editPostForm.get('prenom').value,
      this.editPostForm.get('email').value,
      this.editPostForm.get('telephone').value
    );
    postData.id = this.postId;

    this.blogService.updateEtatCivil(postData).subscribe(data => {
      console.log(data);
      if(data!=null){
        this.event.emit('OK');
        this.bsModalRef.hide();
      }
    });
  }

  onClose() {
    this.bsModalRef.hide();
  }

  ngOnInit() {

  }

}