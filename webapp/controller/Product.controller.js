sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
    "sap/ui/core/routing/History",
    'sap/m/MessageToast'
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, Filter, FilterOperator, History, MessageToast) {
        "use strict";

        return Controller.extend("com.sap.magazzinoikons.controller.Product", {
            onInit: function() {
                const oRouter = this.getOwnerComponent().getRouter();
                oRouter.getRoute("Product").attachPatternMatched(this.onObjectMatched, this);
            },

            onObjectMatched(oEvent) {
                this.getView().bindElement({
                    path: "/" + window.decodeURIComponent(oEvent.getParameter("arguments").MerciPath),
                    model: "ProdottiModel"
                });
            },

            onNavBack() {
                const oHistory = History.getInstance();
                const sPreviousHash = oHistory.getPreviousHash();
    
                if (sPreviousHash !== undefined) {
                    window.history.go(-1);
                } else {
                    const oRouter = this.getOwnerComponent().getRouter();
                    oRouter.navTo("Prodotti", {}, true);
                }
            },

           onAddToCart(){
                var disp = this.getOwnerComponent().getModel("ProdottiModel").getBindings().filter(binding => binding.sPath === "DispMercMag")[0].getValue();
                if(disp == "NO"){
                    MessageToast.show('Prodotto non disponibile');
                }else{                
                var ID = [this.getOwnerComponent().getModel("ProdottiModel").getBindings().filter(binding => binding.sPath === "IdMerci")[0].getValue()];
                this.getOwnerComponent().getModel("CartModel").getProperty("/IdMerci").push(ID);
                MessageToast.show('Prodotto aggiunto al carrello');}
            }
        });
    });