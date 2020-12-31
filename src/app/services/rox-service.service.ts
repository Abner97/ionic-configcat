import { Injectable } from "@angular/core";
import * as Rox from "rox-browser";
import { Observable, Subject } from "rxjs";
import { PlatformService } from "./platform.service";

@Injectable({
  providedIn: "root",
})
export class RoxServiceService {
  private add_list: Subject<boolean> = new Subject<boolean>();
  public add_listObs: Observable<boolean> = this.add_list.asObservable();
  private platformName: string;
  constructor(public platformService: PlatformService) {
    this.platformName = this.platformService.getPlatformName();
    this.initRollout().then(() => {
      console.log("Done loading Rollout");
      Rox.setCustomStringProperty("email", "abvega@bgeneral.com");
      Rox.setCustomStringProperty("platform", this.platformName);
      Rox.setCustomStringProperty("username", "ab");
    });
  }

  flags = {
    add_list: new Rox.Flag(),
    ended: new Rox.Flag(),
  };

  configurationFetchedHandler = (fetcherResults) => {
    console.log(fetcherResults);
    this.add_list.next(this.flags.add_list.isEnabled());
  };

  async initRollout() {
    const options = {
      configurationFetchedHandler: this.configurationFetchedHandler,
    };

    Rox.register("", this.flags);
    // Setup the Rollout key
    await Rox.setup("5fda7d19ccead0b18d678ff1", options);
  }

  public checkAddListFeatureStatus(): boolean {
    return this.flags.add_list.isEnabled();
  }
}
