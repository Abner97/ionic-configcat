import { Component, Input, OnInit } from "@angular/core";
import { Lista } from "../../models/lista.model";
import { DeseosService } from "src/app/services/deseos.service";
import { ActivatedRoute } from "@angular/router";
import { ListaItem } from "src/app/models/lista-item.model";
import { AlertController, NavController } from "@ionic/angular";
import { Subscription } from "rxjs";
import { RoxServiceService } from "src/app/services/rox-service.service";

@Component({
  selector: "app-agregar",
  templateUrl: "./agregar.page.html",
  styleUrls: ["./agregar.page.scss"],
})
export class AgregarPage implements OnInit {
  lista: Lista;
  itemName = "";
  subscription: Subscription;

  constructor(
    private deseosService: DeseosService,
    private router: ActivatedRoute,
    public roxService: RoxServiceService,
    public alertController: AlertController,
    public navCtrl: NavController
  ) {
    const listaId = this.router.snapshot.paramMap.get("listaId");

    console.log(listaId);
    this.lista = this.deseosService.obtenerLista(listaId);
  }

  ngOnInit() {}
  ionViewDidEnter(): void {
    this.subscription = this.roxService.add_listObs.subscribe((enabled) => {
      if (!enabled) {
        this.showAlert();
      }
    });
  }

  ionViewDidLeave() {
    this.subscription.unsubscribe();
  }
  addItem() {
    if (this.itemName.length === 0) {
      return;
    }
    const nuevoItem = new ListaItem(this.itemName);
    this.lista.items.push(nuevoItem);
    this.itemName = "";
    this.deseosService.guardarStorage();
  }
  delete(index: number) {
    this.lista.items.splice(index, 1);
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

  showAlert() {
    this.alertController
      .create({
        header: "Anuncio",
        subHeader: "",
        message:
          "Este servicio a sido inhabilitado temporalmente, lamentamos las molestias",
        buttons: [
          {
            text: "Ok",
            role: "ok",
            handler: (data) => {
              this.navCtrl.navigateRoot(["/tabs/tab1"], {
                state: {},
                animated: true,
              });
            },
          },
        ],
      })
      .then((res) => {
        res.present();
      });
  }
}
