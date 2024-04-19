sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller) {
        "use strict";

        return Controller.extend("com.sap.magazzinoikons.controller.Profile", {
            onInit: function() {
            
                var filters = [];
   
                this.getOwnerComponent().getModel().read("/OrdineSet", {
                filters: filters,
                urlParameters: {},
                success: function(data) {
                   
                    this.getOwnerComponent().getModel("OrderModel").setProperty("/Dati", data.results);
                   
                }.bind(this),
                error: function(error) {}.bind(this)

            });

            },

            onToPage1 : function () {
                this.getOwnerComponent().getRouter().navTo("Prodotti");
            },
            
            onPress(oEvent) {
                var ID = this.getOwnerComponent().getModel("OrderModel").getBindings().filter(binding => binding.sPath === "IdOrdine")[0].getValue();
                console.log(ID);
                this.getOwnerComponent().getModel("OrderFilterModel").setProperty("/IdOrdine", ID);

                const oItem = oEvent.getSource();
                const oRouter = this.getOwnerComponent().getRouter();
                oRouter.navTo("Order", {
                    OrderPath: window.encodeURIComponent(oItem.getBindingContext("OrderModel").getPath().substr(1))
                });
            },

        });
    });