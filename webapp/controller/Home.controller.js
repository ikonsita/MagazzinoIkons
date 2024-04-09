sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/routing/History"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller,History) {
        "use strict";

        return Controller.extend("com.sap.magazzinoikons.controller.Home", {
            onInit: function() {
                
            },
            onMerci : function () {
                this.getOwnerComponent().getRouter().navTo("Merci");
            },
            onMagazzino : function () {
                this.getOwnerComponent().getRouter().navTo("Magazzino");
            },
        });
    });