import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
} from "@angular/router";
import { Observable } from "rxjs";
import { RoxServiceService } from "src/app/services/rox-service.service";

@Injectable({
  providedIn: "root",
})
export class RoxGuard implements CanActivate {
  constructor(public roxService: RoxServiceService) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    console.group("Rox Guard");
    console.log(this.roxService.checkAddListFeatureStatus());
    console.groupEnd();
    return this.roxService.checkAddListFeatureStatus();
  }
}
