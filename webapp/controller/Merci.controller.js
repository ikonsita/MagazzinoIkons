sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
    "sap/m/Dialog",
    'sap/m/MessageToast',
    "sap/ui/core/routing/History",
    "sap/m/Button",
	"sap/m/library",
    "sap/m/Text"
    
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller,Filter,FilterOperator,Dialog,MessageToast,History,Button,mobileLibrary,Text) {
        "use strict";

        
        // shortcut for sap.m.ButtonType
        var ButtonType = mobileLibrary.ButtonType;

        // shortcut for sap.m.DialogType
        var DialogType = mobileLibrary.DialogType;

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
                this.nDialog ??= this.loadFragment({
                    name: "com.sap.magazzinoikons.view.fragment.inserimentoDialog"
                });

                this.nDialog.then((kDialog) => kDialog.open());
            },
            onSaveNewInvoice: function() {
                var newInvoice = this.getOwnerComponent().getModel("NewInvoiceModel").getData();

                var sPrezzoValue = newInvoice.PrezzoldMercMag;
                if (isNaN(parseFloat(sPrezzoValue)) || parseFloat(sPrezzoValue) <= 0) {
                    MessageToast.show("Inserire un prezzo valido maggiore di zero");
                    return; // Interrompi il salvataggio se il prezzo non è valido
                }

                // Verifica se la quantità è un numero positivo
                var sQuantitaValue = newInvoice.QuantdispMercMag;
                if (isNaN(parseFloat(sQuantitaValue)) || parseFloat(sQuantitaValue) <= 0) {
                    MessageToast.show("Inserire una quantità valida maggiore di zero");
                    return; // Interrompi il salvataggio se la quantità non è valida
                }

                var that = this;

                this.getOwnerComponent().getModel().create("/MerciSet",  newInvoice, {
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

                that.onCloseChoiceDialog();

                var contentToBeSaved =  this.getView().byId("List1").getSelectedItems();
                
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
            onEdit: function() {
                
                this.mDialog ??= this.loadFragment({
                    name: "com.sap.magazzinoikons.view.fragment.editDialog"
                });

                this.mDialog.then((lDialog) => lDialog.open());
            },
            onCloseEditDialog: function() {
                this.getView().byId("edit").close();
            },
            onIdMerciChange: function(oEvent) {
                var oDataModel = this.getView().getModel("GeneralModel");
                var sSelectedId = oEvent.getSource().getSelectedKey();

                // Recupera l'array di dati
                var aDati = oDataModel.getProperty("/Dati");

                // Trova l'elemento corrispondente all'ID selezionato
                var oSelectedData = aDati.find(function(item) {
                    return item.IdMerci === sSelectedId;
                });

                // Verifica se l'elemento è stato trovato
                if (oSelectedData) {
                    // Popola gli input con i dati recuperati
                    this.getView().byId("DescMag").setValue(oSelectedData.DescMag);
                    this.getView().byId("Categoria").setValue(oSelectedData.CategMercMag);
                    this.getView().byId("Quantita").setValue(oSelectedData.QuantdispMercMag);
                    this.getView().byId("Disponibilita").setValue(oSelectedData.DispMercMag);
                    this.getView().byId("Peso").setValue(oSelectedData.PesoMercMag);
                    this.getView().byId("Dimensioni").setValue(oSelectedData.DimMercMag);
                    this.getView().byId("Note").setValue(oSelectedData.NoteMercMag);
                    this.getView().byId("Prezzo").setValue(oSelectedData.PrezzoldMercMag);
                    this.getView().byId("Iva").setValue(oSelectedData.IvaMercMag);
                    this.getView().byId("Valuta").setValue(oSelectedData.ValMercMag);
                    this.getView().byId("IdMagazzino").setValue(oSelectedData.IdMagazzino);
                    this.getView().byId("IdOrdine").setValue(oSelectedData.IdOrdine);
                    this.getView().byId("Immaggine").setValue(oSelectedData.Imagee);
                } else {
                    console.error("Merce non trovata per l'ID selezionato:", sSelectedId);
                }
            },
            onCloseEdittDialog: function() {
                this.getView().byId("closedit").close();
            },
            onPressEdit: function(){
			
                var obj = {}; 

                obj.IdMerci = this.byId("IdMerci").getValue();

                obj.Image = this.byId("Immaggine").getValue();
                obj.DescMag = this.byId("DescMag").getValue();
                obj.CategMercMag = this.byId("Categoria").getValue();
                obj.QuantdispMercMag = this.byId("Quantita").getValue();
                obj.PrezzoldMercMag = this.byId("Prezzo").getValue();
                obj.IvaMercMag = this.byId("Iva").getValue();
                obj.ValMercMag = this.byId("Valuta").getValue();
                obj.PesoMercMag = this.byId("Peso").getValue();
                obj.DimMercMag = this.byId("Dimensioni").getValue();
                obj.DispMercMag = this.byId("Disponibilita").getValue();
                obj.NoteMercMag = this.byId("Note").getValue();
                obj.IdMagazzino = this.byId("IdMagazzino").getValue();
                obj.IdOrdine = this.byId("IdOrdine").getValue();

                this.getOwnerComponent().getModel().setUseBatch(false);

                this.getOwnerComponent().getModel().update("/MerciSet('" + obj.IdMerci + "')", obj, {
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
            onApproveDialogPress: function () {
                var that = this;
                if (!this.oApproveDialog) {
                    this.oApproveDialog = new Dialog({
                        type: DialogType.Message,
                        title: "Confirm",
                        content: new Text({ text: "Vuoi eliminare la merce?" }),
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
        });
    });
