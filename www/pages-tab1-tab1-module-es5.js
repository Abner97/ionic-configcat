(function () {
  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  (window["webpackJsonp"] = window["webpackJsonp"] || []).push([["pages-tab1-tab1-module"], {
    /***/
    "4w7E":
    /*!*************************************!*\
      !*** ./src/app/guards/rox.guard.ts ***!
      \*************************************/

    /*! exports provided: RoxGuard */

    /***/
    function w7E(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "RoxGuard", function () {
        return RoxGuard;
      });
      /* harmony import */


      var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! tslib */
      "mrSG");
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! @angular/core */
      "fXoL");
      /* harmony import */


      var src_app_services_rox_service_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! src/app/services/rox-service.service */
      "WxBz");

      var RoxGuard = /*#__PURE__*/function () {
        function RoxGuard(roxService) {
          _classCallCheck(this, RoxGuard);

          this.roxService = roxService;
        }

        _createClass(RoxGuard, [{
          key: "canActivate",
          value: function canActivate(next, state) {
            return this.roxService.checkAddListFeatureStatus();
          }
        }]);

        return RoxGuard;
      }();

      RoxGuard.ctorParameters = function () {
        return [{
          type: src_app_services_rox_service_service__WEBPACK_IMPORTED_MODULE_2__["RoxServiceService"]
        }];
      };

      RoxGuard = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
        providedIn: "root"
      })], RoxGuard);
      /***/
    },

    /***/
    "JGGF":
    /*!*******************************************!*\
      !*** ./src/app/pages/tab1/tab1.page.scss ***!
      \*******************************************/

    /*! exports provided: default */

    /***/
    function JGGF(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony default export */


      __webpack_exports__["default"] = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJ0YWIxLnBhZ2Uuc2NzcyJ9 */";
      /***/
    },

    /***/
    "LhMw":
    /*!*****************************************!*\
      !*** ./src/app/pages/tab1/tab1.page.ts ***!
      \*****************************************/

    /*! exports provided: Tab1Page */

    /***/
    function LhMw(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "Tab1Page", function () {
        return Tab1Page;
      });
      /* harmony import */


      var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! tslib */
      "mrSG");
      /* harmony import */


      var _raw_loader_tab1_page_html__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! raw-loader!./tab1.page.html */
      "p9Ql");
      /* harmony import */


      var _tab1_page_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! ./tab1.page.scss */
      "JGGF");
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! @angular/core */
      "fXoL");
      /* harmony import */


      var src_app_services_deseos_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
      /*! src/app/services/deseos.service */
      "Z16M");
      /* harmony import */


      var _ionic_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
      /*! @ionic/angular */
      "TEn/");
      /* harmony import */


      var src_app_services_rox_service_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
      /*! src/app/services/rox-service.service */
      "WxBz");

      var Tab1Page = /*#__PURE__*/function () {
        function Tab1Page(deseosService, navCtrl, alertCtrl, roxService) {
          _classCallCheck(this, Tab1Page);

          this.deseosService = deseosService;
          this.navCtrl = navCtrl;
          this.alertCtrl = alertCtrl;
          this.roxService = roxService;
          this.add_listFeature = roxService.checkAddListFeatureStatus();
        }

        _createClass(Tab1Page, [{
          key: "ngOnInit",
          value: function ngOnInit() {}
        }, {
          key: "ionViewDidEnter",
          value: function ionViewDidEnter() {
            var _this = this;

            this.subscription = this.roxService.add_listObs.subscribe(function (enabled) {
              _this.add_listFeature = enabled;
              console.log(enabled);
            });
          }
        }, {
          key: "ionViewDidLeave",
          value: function ionViewDidLeave() {
            this.subscription.unsubscribe();
          }
        }, {
          key: "agregarLista",
          value: function agregarLista() {
            return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
              var _this2 = this;

              var alert;
              return regeneratorRuntime.wrap(function _callee$(_context) {
                while (1) {
                  switch (_context.prev = _context.next) {
                    case 0:
                      _context.next = 2;
                      return this.alertCtrl.create(this.add_listFeature ? {
                        header: "Nueva lista",
                        inputs: [{
                          name: "titulo",
                          type: "text",
                          placeholder: "Nombre de la lista"
                        }],
                        buttons: [{
                          text: "Cancelar",
                          role: "cancel",
                          handler: function handler() {
                            console.log("Cancelar");
                          }
                        }, {
                          text: "Crear",
                          handler: function handler(data) {
                            if (data.titulo.length === 0) {
                              return;
                            }

                            var listaId = _this2.deseosService.crearLista(data.titulo); // this.deseosService.crearLista(data.titulo);


                            _this2.navCtrl.navigateForward(["/tabs/tab1/agregar", listaId]);
                          }
                        }]
                      } : {
                        header: "Information",
                        subHeader: "El servicio de agregar una nueva lista no está disponible",
                        buttons: [{
                          text: "Continuar",
                          role: "continue"
                        }]
                      });

                    case 2:
                      alert = _context.sent;
                      alert.present();

                    case 4:
                    case "end":
                      return _context.stop();
                  }
                }
              }, _callee, this);
            }));
          }
        }, {
          key: "goToList",
          value: function goToList(id) {
            this.navCtrl.navigateForward(["/tabs/tab1/agregar", id]);
          }
        }]);

        return Tab1Page;
      }();

      Tab1Page.ctorParameters = function () {
        return [{
          type: src_app_services_deseos_service__WEBPACK_IMPORTED_MODULE_4__["DeseosService"]
        }, {
          type: _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["NavController"]
        }, {
          type: _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["AlertController"]
        }, {
          type: src_app_services_rox_service_service__WEBPACK_IMPORTED_MODULE_6__["RoxServiceService"]
        }];
      };

      Tab1Page = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["Component"])({
        selector: "app-tab1",
        template: _raw_loader_tab1_page_html__WEBPACK_IMPORTED_MODULE_1__["default"],
        styles: [_tab1_page_scss__WEBPACK_IMPORTED_MODULE_2__["default"]]
      })], Tab1Page);
      /***/
    },

    /***/
    "mV/h":
    /*!***************************************************!*\
      !*** ./src/app/pages/tab1/tab1-routing.module.ts ***!
      \***************************************************/

    /*! exports provided: Tab1PageRoutingModule */

    /***/
    function mVH(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "Tab1PageRoutingModule", function () {
        return Tab1PageRoutingModule;
      });
      /* harmony import */


      var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! tslib */
      "mrSG");
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! @angular/core */
      "fXoL");
      /* harmony import */


      var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! @angular/router */
      "tyNb");
      /* harmony import */


      var src_app_guards_rox_guard__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! src/app/guards/rox.guard */
      "4w7E");
      /* harmony import */


      var _tab1_page__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
      /*! ./tab1.page */
      "LhMw");

      var routes = [{
        path: "",
        component: _tab1_page__WEBPACK_IMPORTED_MODULE_4__["Tab1Page"]
      }, {
        path: "agregar/:listaId",
        loadChildren: function loadChildren() {
          return __webpack_require__.e(
          /*! import() | pages-agregar-agregar-module */
          "pages-agregar-agregar-module").then(__webpack_require__.bind(null,
          /*! ../../pages/agregar/agregar.module */
          "PNSq")).then(function (m) {
            return m.AgregarPageModule;
          });
        },
        canActivate: [src_app_guards_rox_guard__WEBPACK_IMPORTED_MODULE_3__["RoxGuard"]]
      }];

      var Tab1PageRoutingModule = function Tab1PageRoutingModule() {
        _classCallCheck(this, Tab1PageRoutingModule);
      };

      Tab1PageRoutingModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(routes)],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]]
      })], Tab1PageRoutingModule);
      /***/
    },

    /***/
    "p9Ql":
    /*!*********************************************************************************!*\
      !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/pages/tab1/tab1.page.html ***!
      \*********************************************************************************/

    /*! exports provided: default */

    /***/
    function p9Ql(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony default export */


      __webpack_exports__["default"] = "<ion-header [translucent]=\"true\" class=\"ion-no-border\">\n  <ion-toolbar>\n    <ion-title> Pendientes </ion-title>\n  </ion-toolbar>\n</ion-header>\n\n<ion-content [fullscreen]=\"true\">\n  <ion-list>\n    <ion-item *ngFor=\"let lista of deseosService.listas\">\n      <ion-label (click)=\"goToList(lista.id)\">{{lista.titulo}}</ion-label>\n    </ion-item>\n  </ion-list>\n  <ion-fab vertical=\"bottom\" horizontal=\"end\" slot=\"fixed\">\n    <ion-fab-button color=\"tertiary\" (click)=\"agregarLista()\">\n      <ion-icon name=\"add\"></ion-icon>\n    </ion-fab-button>\n  </ion-fab>\n</ion-content>\n";
      /***/
    },

    /***/
    "uMfO":
    /*!*******************************************!*\
      !*** ./src/app/pages/tab1/tab1.module.ts ***!
      \*******************************************/

    /*! exports provided: Tab1PageModule */

    /***/
    function uMfO(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "Tab1PageModule", function () {
        return Tab1PageModule;
      });
      /* harmony import */


      var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! tslib */
      "mrSG");
      /* harmony import */


      var _ionic_angular__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! @ionic/angular */
      "TEn/");
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! @angular/core */
      "fXoL");
      /* harmony import */


      var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! @angular/common */
      "ofXK");
      /* harmony import */


      var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
      /*! @angular/forms */
      "3Pt+");
      /* harmony import */


      var _tab1_page__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
      /*! ./tab1.page */
      "LhMw");
      /* harmony import */


      var _explore_container_explore_container_module__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
      /*! ../../explore-container/explore-container.module */
      "qtYk");
      /* harmony import */


      var _tab1_routing_module__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(
      /*! ./tab1-routing.module */
      "mV/h");

      var Tab1PageModule = function Tab1PageModule() {
        _classCallCheck(this, Tab1PageModule);
      };

      Tab1PageModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["NgModule"])({
        imports: [_ionic_angular__WEBPACK_IMPORTED_MODULE_1__["IonicModule"], _angular_common__WEBPACK_IMPORTED_MODULE_3__["CommonModule"], _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormsModule"], _explore_container_explore_container_module__WEBPACK_IMPORTED_MODULE_6__["ExploreContainerComponentModule"], _tab1_routing_module__WEBPACK_IMPORTED_MODULE_7__["Tab1PageRoutingModule"]],
        declarations: [_tab1_page__WEBPACK_IMPORTED_MODULE_5__["Tab1Page"]]
      })], Tab1PageModule);
      /***/
    }
  }]);
})();
//# sourceMappingURL=pages-tab1-tab1-module-es5.js.map