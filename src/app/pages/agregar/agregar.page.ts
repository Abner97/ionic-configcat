import { Component, Input, OnInit } from "@angular/core";
import { Lista } from "../../models/lista.model";
import { DeseosService } from "src/app/services/deseos.service";
import { ActivatedRoute } from "@angular/router";
import { ListaItem } from "src/app/models/lista-item.model";

@Component({
  selector: "app-agregar",
  templateUrl: "./agregar.page.html",
  styleUrls: ["./agregar.page.scss"],
})
export class AgregarPage implements OnInit {
  lista: Lista;
  itemName = "";

  constructor(
    private deseosService: DeseosService,
    private router: ActivatedRoute
  ) {
    const listaId = this.router.snapshot.paramMap.get("listaId");

    console.log(listaId);
    this.lista = this.deseosService.obtenerLista(listaId);
  }

  ngOnInit() {}

  addItem() {
    if (this.itemName.length === 0) {
      return;
    }
    const nuevoItem = new ListaItem(this.itemName);
    this.lista.items.push(nuevoItem);
    this.itemName = "";
    this.deseosService.guardarStorage();
  }

  checkChanged(item: ListaItem) {
    const pendientes = this.lista.items.filter(
      (itemData) => !itemData.completado
    ).length;

    if (pendientes === 0) {
      this.lista.terminadaEn = new Date();
      this.lista.terminada = true;
    } else {
      this.lista.terminadaEn = null;
      this.lista.terminada = false;
    }

    this.deseosService.guardarStorage();
  }
}
