import { Injectable } from "@angular/core";
import { NativeStorage } from "@ionic-native/native-storage/ngx";
import { Platform } from "@ionic/angular";
import { Lista } from "../models/lista.model";

@Injectable({
  providedIn: "root",
})
export class DeseosService {
  listas: Array<Lista> = [];
  platformName: string;

  constructor(private storage: NativeStorage, public platform: Platform) {
    const lista1 = new Lista("Recolectar piedras del infinito");
    const lista2 = new Lista("Héroes a desaparecer");
    this.listas.push(lista1, lista2);

    this.platformName = this.platform
      .platforms()
      .find((platform) => platform === "mobileweb");
    this.platformName =
      this.platformName === undefined
        ? this.platform
            .platforms()
            .find((platform) => platform === "android" || platform === "ios")
        : this.platformName;
    this.listas = this.cargarStorage();
    console.log(this.platformName);
  }

  crearLista(titulo: string) {
    const nuevaLista = new Lista(titulo);
    this.listas.push(nuevaLista);
    this.guardarStorage();
  }

  guardarStorage() {
    this.platformName === "mobileweb"
      ? localStorage.setItem("data", JSON.stringify(this.listas))
      : this.storage.setItem("data", this.listas).then(
          () => console.log("item stored"),
          (error) => console.error("error storing item", error)
        );
  }

  cargarStorage() {
    let data: Array<Lista> = [];
    this.platformName === "mobileweb"
      ? (data = JSON.parse(localStorage.getItem("data")))
      : this.storage.getItem("data").then((listas) => {
          return listas;
        });

    return data;
  }
}
