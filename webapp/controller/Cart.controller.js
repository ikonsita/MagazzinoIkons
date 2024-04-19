sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/ui/core/routing/History",
    "sap/m/MessageToast",
    "sap/m/Dialog",


],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, Filter, FilterOperator, History, MessageToast, Dialog) {
        "use strict";

        return Controller.extend("com.sap.magazzinoikons.controller.Cart", {

            onInit: function () {
                var filters = [];

                var IdMerci = this.getOwnerComponent().getModel("CartModel").getData().IdMerci;
                if (IdMerci.length == 0) {
                    filters.push(new sap.ui.model.Filter("IdMerci", sap.ui.model.FilterOperator.EQ, IdMerci));
                }
                for (var i = 0; i < IdMerci.length; i++) {
                    filters.push(new sap.ui.model.Filter("IdMerci", sap.ui.model.FilterOperator.EQ, IdMerci[i]));
                }
                this.getOwnerComponent().getModel().read("/MerciSet", {
                    filters: filters,
                    urlParameters: {},

                    success: function (data) {

                        this.getOwnerComponent().getModel("CartGeneralModel").setProperty("/Dati", data.results);   
                        
                        var oModel = this.getOwnerComponent().getModel("CartGeneralModel");


                        var aItems = oModel.getProperty("/Dati");
                        
                        
                        var totalPrice = 0;
        
        
        
                        aItems.forEach(function (item) {
                            totalPrice += parseFloat(item.PrezzoldMercMag);
                        });
        
                        this.getOwnerComponent().getModel("CartModel").setProperty("/PrezzoTotale", totalPrice);
        
                        var stringaConVirgola = totalPrice.toString().replace(/\./g, ',');
        
                        
        
                        var numeroDecimale = parseFloat(stringaConVirgola);
        
                        var numeroFormattato = numeroDecimale.toFixed(2);
        
                        this.getOwnerComponent().getModel("NewOrderModel").setProperty("/PrezzoTotale", numeroFormattato);
                        
                    }.bind(this),
                    error: function (error) { }.bind(this)
                });





            },

            onDelete: function (oEvent) {
                var ID = oEvent.getParameter("listItem").getBindingContext("CartGeneralModel").getObject("IdMerci");
                var aData = this.getOwnerComponent().getModel("CartModel").getProperty("/IdMerci");
                var indexToDelete = aData.findIndex(function (obj) {

                    return obj.IdMerci === ID;

                });
                console.log(indexToDelete);
                aData.splice(indexToDelete, 1);
                this.getOwnerComponent().getModel("CartModel").setProperty("/IdMerci", aData);
                MessageToast.show('Prodotto rimosso dal carrello');

                this.onInit();


            },

            onRefresh: function () { this.onInit(); },

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

            onNewInvoice: function() {

                var oModel = this.getOwnerComponent().getModel("CartModel");
                var aData = oModel.getProperty("/IdMerci");
                var iDataLength = aData.length;
                if(iDataLength == 0){
                    MessageToast.show('Nessun Prodotto nel Carrello');
                }else{
                

                
                this.oDialog ??= this.loadFragment({
                    name: "com.sap.magazzinoikons.view.fragment.buy"
                });
 
                this.oDialog.then((lDialog) => lDialog.open());
            }
            },
            onSaveNewInvoice: function() {

                var that = this;

                
                var newInvoice = this.getOwnerComponent().getModel("NewOrderModel").getData();
                
                
                this.getOwnerComponent().getModel().create("/OrdineSet",  newInvoice, {
                    method: "POST",
                    success: function(data) {
                       
                        console.log(newInvoice)
                        that.getView().byId("NewOrder").close();
                        MessageToast.show('Prodotti acquistati!');                       
                    }.bind(this),
                    error: function(error) {}.bind(this)
                });
                var oModel = this.getOwnerComponent().getModel("CartModel");
                oModel.setProperty("/IdMerci", []);
                MessageToast.show('Prodotti acquistati');
                this.onInit();


 
            },
 
            onCloseNewInvoiceDialog: function() {
                this.getView().byId("NewOrder").close();
            }
        });
    });