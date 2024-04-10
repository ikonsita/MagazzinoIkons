sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/routing/History",
    "sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
    "sap/m/Dialog",
    "sap/m/MessageToast",
    "sap/m/Button",
	"sap/m/library",
    "sap/m/Text",
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller,History,Filter,FilterOperator,Dialog,MessageToast,Button,mobileLibrary,Text) {
        "use strict";

        // shortcut for sap.m.ButtonType
	var ButtonType = mobileLibrary.ButtonType;

	// shortcut for sap.m.DialogType
	var DialogType = mobileLibrary.DialogType;

        return Controller.extend("com.sap.magazzinoikons.controller.Magazzino", {
            onInit: function() {
                var filters = [];
    
                    this.getOwnerComponent().getModel().read("/MagazzinoSet", {
                    filters: filters,
                    urlParameters: {},
                    success: function(data) {
                        
                        this.getOwnerComponent().getModel("MagazzinoModel").setProperty("/Magazzini", data.results);
                        
                    }.bind(this),
                    error: function(error) {}.bind(this)
                });
            },
            onPress(oEvent) {
                const oItem = oEvent.getSource();
                const oRouter = this.getOwnerComponent().getRouter();
                oRouter.navTo("MagObject", {
                    MagazzinoPath: window.encodeURIComponent(oItem.getBindingContext("MagazzinoModel").getPath().substr(1))
                });
            },
            onBack() {
                const oHistory = History.getInstance();
                const sPreviousHash = oHistory.getPreviousHash();
    
                if (sPreviousHash !== undefined) {
                    window.history.go(-1);
                } else {
                    const oRouter = this.getOwnerComponent().getRouter();
                    oRouter.navTo("Home", {}, true);
                }
            },
            onSearch: function (oEvent) {
                var oTableSearchState = [],
                    sQuery = oEvent.getParameter("query");
    
                if (sQuery && sQuery.length > 0) {
                    oTableSearchState = [new Filter("Nome", FilterOperator.Contains, sQuery)];
                }
    
                this.getView().byId("List").getBinding("items").filter(oTableSearchState, "Application");
            },
            onNewInvoice: function() {
                this.tDialog ??= this.loadFragment({
                    name: "com.sap.magazzinoikons.view.fragment.inserimentoMagazzino"
                });

                this.tDialog.then((aDialog) => aDialog.open());
            },
            onSaveNewInvoice: function() {
                var newInvoice = this.getOwnerComponent().getModel("NewMagModel").getData();

                var that = this;

                this.getOwnerComponent().getModel().create("/MagazzinoSet",  newInvoice, {
                    method: "POST",
                    success: function(data) {
                        
                        console.log(newInvoice)
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
	
                var that = this;

                var contentToBeSaved =  this.getView().byId("List").getSelectedItems();
                
                this.getOwnerComponent().getModel().setUseBatch(false);
                
                for(var i in contentToBeSaved){
                    
                        
                    var obj = contentToBeSaved[i].getBindingContext("MagazzinoModel").getObject();
                    
                    this.getOwnerComponent().getModel().remove("/MagazzinoSet(IdMagazzino='" + obj.IdMagazzino + "')", {
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
			
                this.getOwnerComponent().getModel().read("/MagazzinoSet", {
                    urlParameters: {},
                    
                    success: function(data) {
    
                        this.getOwnerComponent().getModel("MagazzinoModel").setProperty("/Magazzini", data.results);
                        
                    }.bind(this),
                    error: function(error) {}.bind(this)
                });
            },
            onApproveDialogPress: function () {
                var that = this;
                if (!this.oApproveDialog) {
                    this.oApproveDialog = new Dialog({
                        type: DialogType.Message,
                        title: "Confirm",
                        content: new Text({ text: "Vuoi eliminare il magazzino?" }),
                        beginButton: new Button({
                            type: ButtonType.Emphasized,
                            text: "Submit",
                            press: function () {
                                that.onDelete();
                                this.oApproveDialog.close();
                            }.bind(this)
                        }),
                        endButton: new Button({
                            text: "Cancel",
                            press: function () {
                                this.oApproveDialog.close();
                            }.bind(this)
                        })
                    });
                }
    
                this.oApproveDialog.open();
            },
            onEdit: function() {

                this.cDialog ??= this.loadFragment({
                    name: "com.sap.magazzinoikons.view.fragment.editMagazzino"
                });

                this.cDialog.then((jDialog) => jDialog.open());
            },
            onCloseEditDialog: function() {
                this.getView().byId("edit").close();
            },
            onIdMagazzinoChange: function(oEvent) {
                var oDataModel = this.getView().getModel("MagazzinoModel");
                var sSelectedId = oEvent.getSource().getSelectedKey();

                // Recupera l'array di dati
                var aDati = oDataModel.getProperty("/Magazzini");

                // Trova l'elemento corrispondente all'ID selezionato
                var oSelectedData = aDati.find(function(item) {
                    return item.IdMagazzino === sSelectedId;
                });

                // Verifica se l'elemento è stato trovato
                if (oSelectedData) {
                    // Popola gli input con i dati recuperati
                    this.getView().byId("NomeMag").setValue(oSelectedData.Nome);
                    this.getView().byId("Indir").setValue(oSelectedData.Indirizzo);
                    this.getView().byId("Cit").setValue(oSelectedData.Citta);
                    this.getView().byId("Prov").setValue(oSelectedData.Provincia);
                    this.getView().byId("Capp").setValue(oSelectedData.Cap);
                    this.getView().byId("Orar").setValue(oSelectedData.Orari);
                    this.getView().byId("Scaf").setValue(oSelectedData.Scaffale);
                    this.getView().byId("Repar").setValue(oSelectedData.Reparto);
                    this.getView().byId("Areaa").setValue(oSelectedData.Area);
       
                } else {
                    console.error("Merce non trovata per l'ID selezionato:", sSelectedId);
                }
            },
            onCloseEdittDialog: function() {
                this.getView().byId("edit").close();
            },
            onPressEdit: function(){
			
                var obj = {}; 

                obj.IdMagazzino = this.byId("IdMagazzino").getValue();

                obj.Nome = this.byId("NomeMag").getValue();
                obj.Indirizzo = this.byId("Indir").getValue();
                obj.Citta = this.byId("Cit").getValue();
                obj.Provincia = this.byId("Prov").getValue();
                obj.Cap = this.byId("Capp").getValue();
                obj.Orari = this.byId("Orar").getValue();
                obj.Scaffale = this.byId("Scaf").getValue();
                obj.Reparto = this.byId("Repar").getValue();
                obj.Area = this.byId("Areaa").getValue();

                this.getOwnerComponent().getModel().setUseBatch(false);

                this.getOwnerComponent().getModel().update("/MagazzinoSet('" + obj.IdMagazzino + "')", obj, {
                    method: "PUT",
                    success: function(data) {
                        MessageToast.show('Operazione effettuata correttamente');
                        this.onCloseEdittDialog();
                        this.onRecharge(); 
                    }.bind(this),
                    error: function(error) {
                        console.error("Errore durante l'aggiornamento dell'entità:", error);
                    }.bind(this)
                });
                
            },
        });
    });