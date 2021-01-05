import { Component, Input, OnInit, ViewChild } from "@angular/core";
import { DeseosService } from "../../services/deseos.service";
import { AlertController, IonList, NavController } from "@ionic/angular";
import { Lista } from "../../models/lista.model";

@Component({
  selector: "app-listas",
  templateUrl: "./listas.component.html",
  styleUrls: ["./listas.component.scss"],
})
export class ListasComponent implements OnInit {
  @ViewChild(IonList) lista: IonList;
  @Input() terminada = true;

  constructor(
    public deseosService: DeseosService,
    public navCtrl: NavController,
    public alertController: AlertController
  ) {}

  ngOnInit() {}

  delete(lista: Lista) {
    this.deseosService.borrarLista(lista);
  }
  goToList(id: string | number) {
    this.terminada
      ? this.navCtrl.navigateForward([`/tabs/tab2/agregar`, id])
      : this.navCtrl.navigateForward([`/tabs/tab1/agregar`, id]);
  }

  async editList(lista: Lista) {
    const alert = await this.alertController
      .create({
        header: "Editar Lista",
        inputs: [
          {
            name: "titulo",
            type: "text",
            value: lista.titulo,
            placeholder: "Nombre de la lista",
          },
        ],
        buttons: [
          {
            text: "Actualizar",
            role: "update",
            handler: (data) => {
              if (data.titulo.length === 0) {
                return;
              }
              lista.titulo = data.titulo;
              this.deseosService.guardarStorage();
              this.lista.closeSlidingItems();
            },
          },
          {
            text: "Cancelar",
            role: "cancel",
            handler: (data) => {
              this.lista.closeSlidingItems();
            },
          },
        ],
      })
      .then((res) => {
        res.present();
      });
  }
}
