import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Constants } from './Constants';
import { Purchase, PurchaseInsert, PurchaseUpdate } from '../models/Purchase';

@Injectable({
  providedIn: 'root',
})
export class PurchaseService {
  private BASE_URL: string = `${Constants.BASE_URL}/Purchase`;

  constructor(private http: HttpClient) { }

  GetList = () => this.http.get<Purchase[]>(`${this.BASE_URL}/Read`);
  
  GetById = (id: number) => this.http.get<Purchase>(`${this.BASE_URL}/Read/${id}`);
  
  GetUserPurchases = (userId: number) => this.http.get<Purchase[]>(`${this.BASE_URL}/user/${userId}`);
  
  Insert = (obj: PurchaseInsert) => this.http.post(`${this.BASE_URL}/Create`, obj);
  
  UpdateById = (obj: PurchaseUpdate) => this.http.put(`${this.BASE_URL}/UpdateById`, obj);
  
  DeleteById = (id: number) => this.http.delete(`${this.BASE_URL}/DeleteById/${id}`);
}