import { Component, OnInit } from '@angular/core';
import { EtatCivil } from '../../model/etat-civil.model';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
  })
export class HomeComponent implements OnInit {

  // It maintains list of etatCivils
  etatCivils: EtatCivil[] = [];
  // It maintains etatCivil Model
  regModel: EtatCivil;
  // It maintains EtatCivil form display status. By default it will be false.
  showNew: Boolean = false;
  // It will be either 'Save' or 'Update' based on operation.
  submitType: string = 'Save';
  // It maintains table row index based on selection.
  selectedRow: number;

  constructor() {
    // Add default EtatCivil data.
    this.etatCivils.push(new EtatCivil('Johan', 'Peter', 'johan@gmail.com', '+9885452'));
    this.etatCivils.push(new EtatCivil('Mohamed', 'Tariq', 'tariq@gmail.com', '+9885452'));
    this.etatCivils.push(new EtatCivil('Nirmal', 'Kumar', 'nirmal@gmail.com', '+9885452'));
  }

  ngOnInit() {
  }

  // This method associate to New Button.
  onNew() {
    // Initiate new EtatCivil.
    this.regModel = new EtatCivil();
    // Change submitType to 'Save'.
    this.submitType = 'Save';
    // display EtatCivil entry section.
    this.showNew = true;
  }

  // This method associate to Save Button.
  onSave() {
    if (this.submitType === 'Save') {
      // Push EtatCivil model object into EtatCivil list.
      this.etatCivils.push(this.regModel);
    } else {
      // Update the existing properties values based on model.
      this.etatCivils[this.selectedRow].nom = this.regModel.nom;
      this.etatCivils[this.selectedRow].prenom = this.regModel.prenom;
      this.etatCivils[this.selectedRow].email = this.regModel.email;
      this.etatCivils[this.selectedRow].telephone = this.regModel.telephone;
    }
    // Hide EtatCivil entry section.
    this.showNew = false;
  }

  // This method associate to Edit Button.
  onEdit(index: number) {
    // Assign selected table row index.
    this.selectedRow = index;
    // Initiate new EtatCivil.
    this.regModel = new EtatCivil();
    // Retrieve selected EtatCivil from list and assign to model.
    this.regModel = Object.assign({}, this.etatCivils[this.selectedRow]);
    // Change submitType to Update.
    this.submitType = 'Update';
    // Display EtatCivil entry section.
    this.showNew = true;
  }

  // This method associate to Delete Button.
  onDelete(index: number) {
    // Delete the corresponding EtatCivil entry from the list.
    this.etatCivils.splice(index, 1);
  }

  // This method associate toCancel Button.
  onCancel() {
    // Hide EtatCivil entry section.
    this.showNew = false;
  }
}
