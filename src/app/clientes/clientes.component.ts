import { Component } from '@angular/core';
import { Cliente } from './cliente';
import { ClienteService } from '../services/cliente.service';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent {

  clientes: Cliente[] = [];

  constructor(private clienteService: ClienteService) { }

  ngOnInit() {
    this.clienteService.getClientes().subscribe(
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
