import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { RoutesGuardService } from "../services/routes-guard.service";
import { TabsPage } from "./tabs.page";

const routes: Routes = [
  {
    path: "tabs",
    component: TabsPage,
    children: [
      {
        path: "tab1",
        loadChildren: () =>
          import("../pages/tab1/tab1.module").then((m) => m.Tab1PageModule),
      },
      {
        path: "tab2",
        loadChildren: () =>
          import("../pages/tab2/tab2.module").then((m) => m.Tab2PageModule),
        canActivate: [RoutesGuardService],
      },
      // {
      //   path: "agregar/:listaId",
      //   loadChildren: () =>
      //     import("../pages/agregar/agregar.module").then(
      //       (m) => m.AgregarPageModule
      //     ),
      //   canActivate: [RoutesGuardService],
      // },

      {
        path: "",
        redirectTo: "/tabs/tab1",
        pathMatch: "full",
      },
    ],
  },
  {
    path: "",
    redirectTo: "/tabs/tab1",
    pathMatch: "full",
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
