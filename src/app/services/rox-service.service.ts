import { Injectable } from "@angular/core";
import * as Rox from "rox-browser";
import { Observable, Subject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class RoxServiceService {
  private add_list: Subject<boolean> = new Subject<boolean>();
  public add_listObs: Observable<boolean> = this.add_list.asObservable();

  constructor() {
    this.initRollout().then(function () {
      console.log("Done loading Rollout");
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

    // Boolean flag example
    if (this.flags.add_list.isEnabled()) {
      console.log("add list flag is true");
      // TODO:  Put your code here that needs to be gated
    }
  }

  public checkAddListFeatureStatus(): boolean {
    return this.flags.add_list.isEnabled();
  }
}
