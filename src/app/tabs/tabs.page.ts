import { Component } from "@angular/core";
import { ConfigcatService } from "../services/configcat.service";
import { Subscription } from "rxjs";

@Component({
  selector: "app-tabs",
  templateUrl: "tabs.page.html",
  styleUrls: ["tabs.page.scss"],
})
export class TabsPage {
  listFeature: boolean; //Feature flag
  subscription: Subscription;
  constructor(public configCatService: ConfigcatService) {
    //Subscripcion a observable para escuchar cambios en el servicio
    configCatService.getlist_feature().then((enabled) => {
      this.listFeature = enabled;
    });
  }

  ngOnInit(): void {
    this.subscription = this.configCatService.list_featureObs.subscribe(
      (enabled) => {
        this.listFeature = enabled;
        console.log(enabled);
      }
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
