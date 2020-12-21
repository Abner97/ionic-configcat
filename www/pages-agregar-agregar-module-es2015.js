(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["pages-agregar-agregar-module"],{

/***/ "6ZK6":
/*!*************************************************!*\
  !*** ./src/app/pages/agregar/agregar.page.scss ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJhZ3JlZ2FyLnBhZ2Uuc2NzcyJ9 */");

/***/ }),

/***/ "Ba5q":
/*!***********************************************!*\
  !*** ./src/app/pages/agregar/agregar.page.ts ***!
  \***********************************************/
/*! exports provided: AgregarPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AgregarPage", function() { return AgregarPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _raw_loader_agregar_page_html__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! raw-loader!./agregar.page.html */ "YY69");
/* harmony import */ var _agregar_page_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./agregar.page.scss */ "6ZK6");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "fXoL");




let AgregarPage = class AgregarPage {
    constructor() { }
    ngOnInit() {
    }
};
AgregarPage.ctorParameters = () => [];
AgregarPage = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["Component"])({
        selector: 'app-agregar',
        template: _raw_loader_agregar_page_html__WEBPACK_IMPORTED_MODULE_1__["default"],
        styles: [_agregar_page_scss__WEBPACK_IMPORTED_MODULE_2__["default"]]
    })
], AgregarPage);



/***/ }),

/***/ "PNSq":
/*!*************************************************!*\
  !*** ./src/app/pages/agregar/agregar.module.ts ***!
  \*************************************************/
/*! exports provided: AgregarPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AgregarPageModule", function() { return AgregarPageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "3Pt+");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic/angular */ "TEn/");
/* harmony import */ var _agregar_routing_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./agregar-routing.module */ "gMPf");
/* harmony import */ var _agregar_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./agregar.page */ "Ba5q");







let AgregarPageModule = class AgregarPageModule {
};
AgregarPageModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["IonicModule"],
            _agregar_routing_module__WEBPACK_IMPORTED_MODULE_5__["AgregarPageRoutingModule"]
        ],
        declarations: [_agregar_page__WEBPACK_IMPORTED_MODULE_6__["AgregarPage"]]
    })
], AgregarPageModule);



/***/ }),

/***/ "YY69":
/*!***************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/pages/agregar/agregar.page.html ***!
  \***************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<ion-header class=\"ion-no-border\">\n  <ion-toolbar>\n    <ion-buttons slot=\"start\">\n      <ion-back-button></ion-back-button>\n    </ion-buttons>\n    <ion-title>Agregar lista</ion-title>\n  </ion-toolbar>\n</ion-header>\n\n<ion-content>\n  <ion-list>\n    <ion-item>\n      <ion-label position=\"floating\">New Item</ion-label>\n      <ion-input></ion-input\n    ></ion-item>\n  </ion-list>\n\n  <ion-list>\n    <ion-list-header>\n      <ion-label>Tareas por hacer</ion-label>\n    </ion-list-header>\n    <ion-item>\n      <ion-checkbox slot=\"start\"></ion-checkbox>\n      <ion-label>Recordar comer </ion-label>\n    </ion-item>\n  </ion-list>\n</ion-content>\n");

/***/ }),

/***/ "gMPf":
/*!*********************************************************!*\
  !*** ./src/app/pages/agregar/agregar-routing.module.ts ***!
  \*********************************************************/
/*! exports provided: AgregarPageRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AgregarPageRoutingModule", function() { return AgregarPageRoutingModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _agregar_page__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./agregar.page */ "Ba5q");




const routes = [
    {
        path: '',
        component: _agregar_page__WEBPACK_IMPORTED_MODULE_3__["AgregarPage"]
    }
];
let AgregarPageRoutingModule = class AgregarPageRoutingModule {
};
AgregarPageRoutingModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(routes)],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]],
    })
], AgregarPageRoutingModule);



/***/ })

}]);
//# sourceMappingURL=pages-agregar-agregar-module-es2015.js.map