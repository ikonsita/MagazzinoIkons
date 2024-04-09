sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
    "sap/ui/core/routing/History"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, Filter, FilterOperator, History) {
        "use strict";

        return Controller.extend("com.sap.magazzinoikons.controller.Object", {
            onInit: function() {
                const oRouter = this.getOwnerComponent().getRouter();
                oRouter.getRoute("Page2").attachPatternMatched(this.onObjectMatched, this);
            },

            onObjectMatched(oEvent) {
                this.getView().bindElement({
                    path: "/" + window.decodeURIComponent(oEvent.getParameter("arguments").MerciPath),
                    model: "GeneralModel"
                });
            },

            onNavBack() {
                const oHistory = History.getInstance();
                const sPreviousHash = oHistory.getPreviousHash();
    
                if (sPreviousHash !== undefined) {
                    window.history.go(-1);
                } else {
                    const oRouter = this.getOwnerComponent().getRouter();
                    oRouter.navTo("Merci", {}, true);
                }
            },
        });
    });