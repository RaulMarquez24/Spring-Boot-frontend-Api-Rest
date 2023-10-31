import { Component } from '@angular/core';
import { Cliente } from '../cliente';
import { ClienteService } from 'src/app/services/cliente.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent {

  public titulo: string = "Crear cliente"
  public cliente: Cliente = new Cliente();

  constructor(
    private clienteService: ClienteService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.cargarCliente();
  }

  cargarCliente(): void {
    this.activatedRoute.params.subscribe(params => {
      let id = params['id']
      if (id) {
        this.clienteService.getCliente(id).subscribe((cliente) => this.cliente = cliente)
      }
    })
  }

  create(): void {
    this.clienteService.create(this.cliente).subscribe(
      cliente => {
        this.router.navigate(['/clientes'])

        // Mostrar modal de confirmación
        alert(`Cliente ${cliente.nombre} creado con éxito!`)
      }
    );
  }

  update(): void {
    this.clienteService.update(this.cliente).subscribe(
      cliente => {
        this.router.navigate(['/clientes'])

        // Mostrar modal de confirmación
        alert(`Cliente ${cliente.nombre} actualizado con éxito!`)
      }
    );
  }

}