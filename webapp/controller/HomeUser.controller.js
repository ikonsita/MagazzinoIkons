sap.ui.define([
    "sap/ui/core/mvc/Controller",
    'sap/m/MessageToast'
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller,MessageToast) {
        "use strict";

        return Controller.extend("com.sap.magazzinoikons.controller.Home", {
            onInit: function() {
                
            },
            onOrdini : function () {
                this.getOwnerComponent().getRouter().navTo("Prodotti");
            }
        });
    });