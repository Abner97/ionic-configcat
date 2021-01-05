import { Component } from "@angular/core";
import { DeseosService } from "src/app/services/deseos.service";
import { AlertController, NavController } from "@ionic/angular";
import { RoxServiceService } from "src/app/services/rox-service.service";
import { Subscription } from "rxjs";

@Component({
  selector: "app-tab1",
  templateUrl: "tab1.page.html",
  styleUrls: ["tab1.page.scss"],
})
export class Tab1Page {
  private add_listFeature: boolean;
  subscription: Subscription;
  constructor(
    public deseosService: DeseosService,
    private navCtrl: NavController,
    private alertCtrl: AlertController,
    public roxService: RoxServiceService
  ) {
    this.add_listFeature = true;
  }

  ngOnInit(): void {}
  ionViewDidEnter(): void {
    this.subscription = this.roxService.add_listObs.subscribe((enabled) => {
      this.add_listFeature = enabled;
      console.log(enabled);
    });
  }
  ionViewDidLeave(): void {
    this.subscription.unsubscribe();
  }
  delete(index: number) {
    this.deseosService.listas.splice(index, 1);
    this.deseosService.guardarStorage();
  }
  async agregarLista() {
    this.add_listFeature = this.roxService.checkAddListFeatureStatus();
    const alert = await this.alertCtrl.create(
      this.add_listFeature
        ? {
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
          }
        : {
            header: "Information",
            subHeader:
              "El servicio de agregar una nueva lista no está disponible",
            buttons: [
              {
                text: "Continuar",
                role: "continue",
              },
            ],
          }
    );
    alert.present();
  }
}
