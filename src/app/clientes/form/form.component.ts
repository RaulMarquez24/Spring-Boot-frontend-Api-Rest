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

  public errores: string[] | undefined;

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
        alert(`El cliente ${cliente.nombre} ha sido creado con exito!`)
      },
      err => {
        this.errores = err.error.errors as string[];
        console.error(err.error.errors);
      }
    );
  }

  update(): void {
    this.clienteService.update(this.cliente).subscribe(
      json => {
        this.router.navigate(['/clientes'])
        alert(`${json.mensaje}: ${json.cliente.nombre}`)
      },
      err => {
        this.errores = err.error.errors as string[];
        console.error(err.error.errors);
      }
    );
  }

}