export class EtatCivil {
  id: number;
  nom: string;
  prenom: string;
  email: string;
  telephone: string;

  constructor(
    public nomParam: string = '',
    public prenomParam: string = '',
    public emailParam: string = '',
    public telephoneParam: string = ''
  ) {
    this.nom = nomParam;
    this.prenom = prenomParam;
    this.email = emailParam;
    this.telephone = telephoneParam;
  }/*
  constructor2(
    public nomParam: string = '',
    public prenomParam: string = '',
    public emailParam: string = '',
    public telephoneParam: string = ''
  ) {
  }*/
}
