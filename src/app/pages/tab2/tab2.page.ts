import { Component } from "@angular/core";
import { AlertController, NavController } from "@ionic/angular";
import { Observable, Subscription } from "rxjs";
import { DeseosService } from "src/app/services/deseos.service";
import { ConfigcatService } from "../../services/configcat.service";

@Component({
  selector: "app-tab2",
  templateUrl: "tab2.page.html",
  styleUrls: ["tab2.page.scss"],
})
export class Tab2Page {
  subscription: Subscription;
  constructor(
    public deseosService: DeseosService,
    public alertController: AlertController,
    public configcatService: ConfigcatService,
    public navCtrl: NavController
  ) {}

  redirect() {}
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
  ionViewDidEnter(): void {
    this.subscription = this.configcatService.list_featureObs.subscribe(
      (enabled) => {
        if (!enabled) {
          this.showAlert();
        }
      }
    );
  }

  ionViewDidLeave() {
    this.subscription.unsubscribe();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
