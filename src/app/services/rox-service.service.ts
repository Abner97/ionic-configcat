import { Injectable } from "@angular/core";
import * as Rox from "rox-browser";

@Injectable({
  providedIn: "root",
})
export class RoxServiceService {
  flags = {
    prueba: new Rox.Flag(),
  };

  configurationFetchedHandler = (fetcherResults) => {
    console.log(fetcherResults);
  };

  async initRollout() {
    const options = {
      configurationFetchedHandler: this.configurationFetchedHandler,
    };

    // Setup the Rollout key
    await Rox.setup("5fda7d19ccead0b18d678ff1", options);

    // Boolean flag example
    if (this.flags.prueba.isEnabled()) {
      console.log("prueba flag is true");
      // TODO:  Put your code here that needs to be gated
    }
  }

  constructor() {
    this.initRollout().then(function () {
      console.log("Done loading Rollout");
    });
  }
}
