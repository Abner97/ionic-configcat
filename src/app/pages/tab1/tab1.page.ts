import { Component } from "@angular/core";
import { DeseosService } from "src/app/services/deseos.service";
import { AlertController, NavController } from "@ionic/angular";

@Component({
  selector: "app-tab1",
  templateUrl: "tab1.page.html",
  styleUrls: ["tab1.page.scss"],
})
export class Tab1Page {
  constructor(
    public deseosService: DeseosService,
    private navCtrl: NavController,
    private alertCtrl: AlertController
  ) {}

  async agregarLista() {
    //
    const alert = await this.alertCtrl.create({
      header: "Nueva lista",
      inputs: [
        {
          name: "titulo",
          type: "text",
          placeholder: "Nombre de la lista",
        },
      ],
      buttons: [
        {
          text: "Cancelar",
          role: "cancel",
          handler: () => {
            console.log("Cancelar");
          },
        },
        {
          text: "Crear",
          handler: (data) => {
            if (data.titulo.length === 0) {
              return;
            }
            const listaId = this.deseosService.crearLista(data.titulo);
            // this.deseosService.crearLista(data.titulo);
            this.navCtrl.navigateForward([`/tabs/tab1/agregar`, listaId]);
          },
        },
      ],
    });
    alert.present();
  }

  goToList(id: string | number) {
    this.navCtrl.navigateForward([`/tabs/tab1/agregar`, id]);
  }
}
