import { Injectable } from "@angular/core";
import { NativeStorage } from "@ionic-native/native-storage/ngx";
import { Platform } from "@ionic/angular";
import { Lista } from "../models/lista.model";
import { PlatformService } from "./platform.service";

@Injectable({
  providedIn: "root",
})
export class DeseosService {
  listas: Array<Lista> = [];
  platformName: string;

  constructor(
    private storage: NativeStorage,
    public platformService: PlatformService
  ) {
    this.platformName = this.platformService.getPlatformName();
    let listasTemp = this.cargarStorage();

    if (listasTemp !== null) {
      this.listas = listasTemp;
    }
    console.log(this.platformName);
  }

  crearLista(titulo: string) {
    const nuevaLista = new Lista(titulo);
    this.listas.push(nuevaLista);
    this.guardarStorage();
    return nuevaLista.id;
  }

  borrarLista(lista: Lista) {
    this.listas = this.listas.filter((listaData) => {
      return listaData.id !== lista.id;
    });

    this.guardarStorage();
  }

  guardarStorage() {
    this.platformName === "mobileweb" || this.platformName === "desktop"
      ? localStorage.setItem("data", JSON.stringify(this.listas))
      : this.storage.setItem("data", this.listas).then(
          () => console.log("item stored"),
          (error) => console.error("error storing item", error)
        );
  }

  obtenerLista(id: string | number) {
    id = typeof id === "number" ? id : Number(id);
    return this.listas.find((lista) => lista.id === id);
  }

  cargarStorage() {
    let data: Array<Lista> = [];
    this.platformName === "mobileweb" || this.platformName === "desktop"
      ? (data = JSON.parse(localStorage.getItem("data")))
      : this.storage.getItem("data").then((listas) => {
          return listas;
        });

    return data;
  }
}
