import { Injectable } from '@angular/core';
import { CLIENTES } from '../clientes/clientes.json';
import { Cliente } from '../clientes/cliente';
import { Observable, of, throwError  } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { DatePipe, formatDate, registerLocaleData } from '@angular/common';
import { GLOBAL } from './global';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  private urlEndpoint:string = GLOBAL.url+'clientes';
  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});

  constructor(private http: HttpClient) { }

  getClientes(): Observable<Cliente[]> {
    // return of(CLIENTES);
    return this.http.get(this.urlEndpoint).pipe(
      map( response => {
        let clientes = response as Cliente[];
        return clientes.map(cliente => {
          cliente.nombre = cliente.nombre?.toUpperCase();
          if (cliente.createAt != undefined && cliente.createAt != null) {
            // cliente.createAt = formatDate(cliente.createAt, 'EEEE dd, MMMM yyyy', 'es')
          }
          return cliente;
        });
      }
      )
    );
  }

  create(cliente: Cliente) : Observable<Cliente> {
    return this.http.post(this.urlEndpoint, cliente, {headers: this.httpHeaders}).pipe(
      map( (response: any) => response.cliente as Cliente),
      catchError(err => {

        if (err.status==400) {
          return throwError(()=>err);
        }

        alert('Error: '+err.error.mesaje)
        return throwError(()=>err)
      })
    )
  }

  getCliente(id: number): Observable<Cliente>{
    return this.http.get<Cliente>(`${this.urlEndpoint}/${id}`)
  }

  update(cliente: Cliente): Observable<any> {
    return this.http.put<any>(`${this.urlEndpoint}/${cliente.id}`, cliente, {headers: this.httpHeaders}).pipe(
      catchError(err => {
        
        if (err.status==400) {
          return throwError(()=>err);
        }

        alert('Error: '+err.error.mesaje)
        return throwError(()=>err)
      })
    )
  }

  delete(id: number): Observable<Cliente> {
    return this.http.delete<Cliente>(`${this.urlEndpoint}/${id}`, {headers: this.httpHeaders})
  }
}
