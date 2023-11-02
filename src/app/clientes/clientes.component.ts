import { Component } from '@angular/core';
import { Cliente } from './cliente';
import { ClienteService } from '../services/cliente.service';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent {

  clientes: Cliente[] = [];

  constructor(private clienteService: ClienteService) { }

  ngOnInit() {
    this.clienteService.getClientes().pipe(
      tap(clientes => {
        console.log('ClientesComponent: tap 3');
        clientes.forEach(cliente => {
          console.log(cliente.nombre);
        });
      })
    ).subscribe(
      clientes => this.clientes = clientes
    );
  }

  delete(cliente: Cliente): void {
    let respuesta = confirm("¿Estás seguro de eliminar el cliente '" + cliente.nombre + "'?");
    if (respuesta) {
      this.clienteService.delete(cliente.id!).subscribe(
        response => {
          this.clientes = this.clientes.filter(cli => cli !== cliente)
          alert(`Cliente ${cliente.nombre} eliminado con éxito!`)
        }
      )
    }
  }

}
