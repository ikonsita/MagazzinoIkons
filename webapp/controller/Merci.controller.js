sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
    "sap/m/Dialog",
    'sap/m/MessageToast',
    
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller,Filter,FilterOperator,Dialog,MessageToast) {
        "use strict";

        return Controller.extend("com.sap.magazzinoikons.controller.Merci", {
            onInit: function() {
            
                var filters = [];
    
                    this.getOwnerComponent().getModel().read("/MerciSet", {
                    filters: filters,
                    urlParameters: {},
                    success: function(data) {
                        
                        this.getOwnerComponent().getModel("GeneralModel").setProperty("/Dati", data.results);
                        
                    }.bind(this),
                    error: function(error) {}.bind(this)
                });
    
            },
            onSearch: function (oEvent) {
                var oTableSearchState = [],
                    sQuery = oEvent.getParameter("query");
    
                if (sQuery && sQuery.length > 0) {
                    oTableSearchState = [new Filter("DescMag", FilterOperator.Contains, sQuery)];
                }
    
                this.getView().byId("List1").getBinding("items").filter(oTableSearchState, "Application");
            },
            onPress(oEvent) {
                const oItem = oEvent.getSource();
                const oRouter = this.getOwnerComponent().getRouter();
                oRouter.navTo("Page2", {
                    MerciPath: window.encodeURIComponent(oItem.getBindingContext("GeneralModel").getPath().substr(1))
                });
            },
            onNewInvoice: function() {
                this.pDialog ??= this.loadFragment({
                    name: "com.sap.magazzinoikons.view.fragment.inserimentoDialog"
                });

                this.pDialog.then((oDialog) => oDialog.open());
            },
            onSaveNewInvoice: function() {
                var newInvoice = this.getOwnerComponent().getModel("NewInvoiceModel").getData();

                var that = this;

                this.getOwnerComponent().getModel().create("/MerciSet",  newInvoice, {
                    method: "POST",
                    success: function(data) {
                        
                        that.getView().byId("NewInvoice").close();
                        MessageToast.show('Operazione effettuata correttamente');
                        
                        that.onRecharge();
                        
                        
                        
                    }.bind(this),
                    error: function(error) {}.bind(this)
                });

            },

            onCloseNewInvoiceDialog: function() {
                this.getView().byId("NewInvoice").close();
            },
            onDelete: function(){
	
                var contentToBeSaved =  this.getView().byId("List1").getSelectedItems();
                var that = this;
                
                this.getOwnerComponent().getModel().setUseBatch(false);
                
                for(var i in contentToBeSaved){
                    
                        
                    var obj = contentToBeSaved[i].getBindingContext("GeneralModel").getObject();
                    
                    this.getOwnerComponent().getModel().remove("/MerciSet(IdMerci='" + obj.IdMerci + "')", {
                    method: "DELETE",
                    success: function(data) {
                        
                        //that.getView().byId("InsertDataDialog").close();
                        MessageToast.show('Operazione effettuata correttamente');
                        that.onRecharge();
                        
                        
                    }.bind(this),
                    error: function(error) {}.bind(this)
                });
                }
            },
            onRecharge: function() {
			
                this.getOwnerComponent().getModel().read("/MerciSet", {
                    urlParameters: {},
                    
                    success: function(data) {
    
                        this.getOwnerComponent().getModel("GeneralModel").setProperty("/Dati", data.results);
                        
                    }.bind(this),
                    error: function(error) {}.bind(this)
                });
            },
        });
    });
