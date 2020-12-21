import { Injectable } from "@angular/core";
import * as configcat from "configcat-js";
import { IConfigCatClient } from "configcat-common/lib/ConfigCatClient";
import { Observable, Subject } from "rxjs";
import { LogLevel } from "configcat-common";
import { Platform } from "@ionic/angular";

@Injectable({
  providedIn: "root",
})
export class ConfigcatService {
  private configCatClient: IConfigCatClient;
  private platformName: string;

  private list_feature: Subject<boolean> = new Subject<boolean>();
  public list_featureObs: Observable<boolean> = this.list_feature.asObservable();

  constructor(public platform: Platform) {
    let logger = configcat.createConsoleLogger(LogLevel.Info); // Setting log level to 3 (Info)
    this.platformName = this.platform
      .platforms()
      .find((platform) => platform === "android" || platform === "ios");

    console.log(this.platformName);
    //Configuracion de cliente
    this.configCatClient = configcat.createClientWithAutoPoll(
      "VqDYCHA8hUSDB78ion6qaQ/C8uDWiW6HU-GRdDf-INAgQ",
      {
        // <-- This is the actual SDK Key for your Production environment
        pollIntervalSeconds: 5, //tiempo en segundos para hacer pull de la configuraciónn de config cat
        logger: logger,
        configChanged: async () => {
          //deteccion de cambios en la configuración

          //actualización del sujeto
          this.list_feature.next(await this.getlist_feature());
        },
      }
    );
  }

  //función para saber si un feature está encendido o apagado
  async getlist_feature(): Promise<boolean> {
    return await this.configCatClient.getValueAsync("prueba", false);
  }
}
