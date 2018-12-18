import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { BehaviorSubject, Observable } from "rxjs";
import { EtatCivil } from './model/etat-civil.model';

@Injectable({
  providedIn: 'root'
})
export class EtatCivilService {
    private readonly baseURL: string;

    etatCivilSource = new  BehaviorSubject<number>(0);
    etatCivilIdData: any;

    constructor(private http: HttpClient){
        this.baseURL ="http://localhost:8080/api/etatCivils";
        this.etatCivilIdData= this.etatCivilSource.asObservable();
    }

    getEtatCivilList(page: number) : any {
        console.log(this.baseURL+"?page="+page);
        const valReturn:Observable<any> = this.http.get(this.baseURL+"?page="+page);
        return valReturn;
    }

    addEtatCivil(etatCivil: EtatCivil) : Observable<Object> {
        const valReturn:Observable<any> = this.http.post(this.baseURL + "/create", etatCivil);
        return valReturn;
    }
    
    deleteEtatCivil(id: number) : Observable<Object> {
        const valReturn:Observable<any> = this.http.delete(`${this.baseURL}/${id}`, { responseType: 'text' });
        return valReturn;
    }

    updateEtatCivil(etatCivil: any): Observable<Object> {
        const valReturn:Observable<any> = this.http.put(`${this.baseURL}/update/${etatCivil.id}`, etatCivil);
        return valReturn;
    }

    getEtatCivil(etatCivilId: number): Observable<Object> {
        const valReturn:Observable<any> = this.http.get(`${this.baseURL}/getById/${etatCivilId}`);
        return valReturn;
    }

    changeEtatCivilId(etatCivilId: number){
        this.etatCivilSource.next(etatCivilId);
    }

    filterByCriteria(criteria: string) :any {
        const valReturn:Observable<any> = this.http.get(`${this.baseURL}/findByCriteria/${criteria}`);
        return valReturn; 
    }
}