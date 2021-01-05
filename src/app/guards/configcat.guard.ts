import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
} from "@angular/router";
import { Observable } from "rxjs";
import { ConfigcatService } from "../services/configcat.service";
import { NavController } from "@ionic/angular";

@Injectable({
  providedIn: "root",
})
export class ConfigcatGuard implements CanActivate {
  activated = true;
  constructor(
    public configCatService: ConfigcatService,
    public navCtrl: NavController
  ) {}

  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const enabled = await this.configCatService.getlist_feature();
    if (!enabled) {
      this.navCtrl.navigateRoot(["/tabs/tab1"], { state: {}, animated: true });
      return false;
    }

    return true;
  }
}
