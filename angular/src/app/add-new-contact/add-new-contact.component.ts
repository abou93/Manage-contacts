import { Component, OnInit, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { EtatCivilService } from 'src/app/etat-civil.service';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { EtatCivil } from '../model/etat-civil.model';

@Component({
  selector: 'app-add-new-post',
  templateUrl: './add-new-contact.component.html',
  styleUrls: ['./add-new-contact.component.css']
})
export class AddNewPostComponent implements OnInit {

  addNewPostForm: FormGroup;
  etatCivilDTO: EtatCivil = new EtatCivil();
  event: EventEmitter<any>=new EventEmitter();

  constructor(private builder: FormBuilder, private blogService: EtatCivilService, private bsModalRef: BsModalRef) {
    this.addNewPostForm = this.builder.group({
      nom: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^([a-zA-Z]){2,}$')
      ])),
      prenom: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^([a-zA-Z]){2,}$')
      ])),
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$') 
      ])),
      telephone: new FormControl('', Validators.compose([
        Validators.pattern('^[0-9]{10}$')
      ]))
    });

  }

  onPostFormSubmit(){
    let postData: EtatCivil = new EtatCivil(
      this.addNewPostForm.get('nom').value,
      this.addNewPostForm.get('prenom').value,
      this.addNewPostForm.get('email').value,
      this.addNewPostForm.get('telephone').value
    );
  
    this.blogService.addEtatCivil(postData).subscribe(data=>{
      console.log(data);
      if(data!=null){
        this.event.emit('OK');
        this.bsModalRef.hide();
      }
    });
  }
  
  thereAreError(patern: string) : boolean {
    if (this.addNewPostForm.get(patern).value === '') {
      return true;
    } else if (this.addNewPostForm.get(patern).valid) {
      return true;
    } else {
      return false;
    }
  }

  onClose(){
    this.bsModalRef.hide();
  }

  ngOnInit() {
  }

}
