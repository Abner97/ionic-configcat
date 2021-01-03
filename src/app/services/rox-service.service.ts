import { Injectable } from "@angular/core";
import * as Rox from "rox-browser";
import { Observable, Subject } from "rxjs";
import { PlatformService } from "./platform.service";

@Injectable({
  providedIn: "root",
})
export class RoxServiceService {
  /*
    Observable que nos permitira escuchar los cambios en la configuración de las flags
  */
  private add_list: Subject<boolean> = new Subject<boolean>();
  public add_listObs: Observable<boolean> = this.add_list.asObservable();

  private platformName: string;

  //En el constructor se inicializa la configuración de Rox.
  constructor(public platformService: PlatformService) {
    this.platformName = this.platformService.getPlatformName();

    this.initRollout().then(() => {
      console.log("Done loading Rollout");
      Rox.setCustomStringProperty("email", "abvega@bgeneral.com");
      Rox.setCustomStringProperty("platform", this.platformName);
      Rox.setCustomStringProperty("username", "ab");
    });
  }

  /*
    Aquí definimos las flags que queremos usar en la app, si la flag no existe Rox la crea.
  */
  flags = {
    add_list: new Rox.Flag(),
    ended: new Rox.Flag(),
  };

  /*
    Esta función se va a encargar de escuchar si hay algún cambio en la configuración de las flags.
  */
  configurationFetchedHandler = (fetcherResults) => {
    console.log(fetcherResults);
    this.add_list.next(this.flags.add_list.isEnabled());
  };

  /*
    Función asíncrona que ejecuta la configuración
  */
  async initRollout() {
    const options = {
      configurationFetchedHandler: this.configurationFetchedHandler,
    };

    Rox.register("", this.flags);
    // Setup the Rollout key
    await Rox.setup("5fda7d19ccead0b18d678ff1", options);
  }

  /*
    Verifica el estado de la flag add_list
  */
  public checkAddListFeatureStatus(): boolean {
    return this.flags.add_list.isEnabled();
  }
}
