import { Injectable } from "@angular/core";
import { ConfigcatService } from "./configcat.service";
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
} from "@angular/router";
import { Observable } from "rxjs";
import { NavController } from "@ionic/angular";

@Injectable({
  providedIn: "root",
})
export class RoutesGuardService implements CanActivate {
  activated = true;

  constructor(
    public configCatService: ConfigcatService,
    private navCtrl: NavController,
    private router: Router
  ) {
    const params = router.getCurrentNavigation().extras;
  }

  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const enabled = await this.configCatService.getlist_feature();
    if (!enabled) {
      this.navCtrl.navigateRoot(["/tabs/tab1"], { state: {}, animated: true });
      return false;
    }

    return true;
  }
}
