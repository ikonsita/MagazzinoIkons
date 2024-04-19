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
                var oRouter = this.getOwnerComponent().getRouter();

                oRouter.getRoute("Home").attachMatched(this.onRouteMatched, this);

                var filters = [];
    
                    this.getOwnerComponent().getModel().read("/UtenteSet", {
                    filters: filters,
                    urlParameters: {},
                    success: function(data) {
                        
                        this.getOwnerComponent().getModel("UtenteModel").setProperty("/Utenti", data.results);
                        
                    }.bind(this),
                    error: function(error) {}.bind(this)
                });
            },      
            onLogout: function() {
                localStorage.clear();
            },
            onLog: function() {
                this.vDialog ??= this.loadFragment({
                    name: "com.sap.magazzinoikons.view.fragment.inserimentoRegistrazione"
                });

                this.vDialog.then((iDialog) => iDialog.open());
            },
            onNewReg: function() {
                this.hDialog ??= this.loadFragment({
                    name: "com.sap.magazzinoikons.view.fragment.regDialog"
                });

                this.hDialog.then((uDialog) => uDialog.open());
            },
            onSaveNewReg: function() {
                var newReg = this.getOwnerComponent().getModel("RegModel").getData();

                var that = this;

                this.getOwnerComponent().getModel().create("/UtenteSet",  newReg, {
                    method: "POST",
                    success: function(data) {
                        that.getView().byId("Newreg").close();
                        MessageToast.show('Operazione effettuata correttamente');
                        
                    }.bind(this),
                    error: function(error) {}.bind(this)
                });

            },

            onCloseNewRegDialog: function() {
                this.getView().byId("Newreg").close();
            },                 
            onLinkPress: function(){
                var that = this;

                that.onCloseNewRegDialog();

                this.xDialog ??= this.loadFragment({
                    name: "com.sap.magazzinoikons.view.fragment.editPassword"
                });

                this.xDialog.then((iDialog) => iDialog.open());
            },
            onCloseEdittDialog: function() {
                this.getView().byId("EditPass").close();
            },
            onMailChange: function(oEvent) {
                var oDataModel = this.getView().getModel("UtenteModel");
                var sSelectedId = oEvent.getSource().getSelectedKey();

                // Recupera l'array di dati
                var aDati = oDataModel.getProperty("/Utenti");

                console.log(aDati)

                // Trova l'elemento corrispondente all'ID selezionato
                var oSelectedData = aDati.find(function(item) {
                    return item.Mail === sSelectedId;
                });

                console.log(oSelectedData)
                // Verifica se l'elemento è stato trovato
                if (oSelectedData) {

                    // Popola gli input con i dati recuperati
                    this.getView().byId("Passw").setValue(oSelectedData.Password);
                } else {
                    console.error("Mail non trovata per l'ID selezionato:", sSelectedId);
                }
            },
            onPressEdit: function(){
			
                var obj = {}; 

                obj.Mail = this.byId("Maill").getValue();

                obj.Password = this.byId("Passw").getValue();

                this.getOwnerComponent().getModel().setUseBatch(false);

                this.getOwnerComponent().getModel().update("/UtenteSet('" + obj.Mail + "')", obj, {
                    method: "PUT",
                    success: function(data) {
                        MessageToast.show('Operazione effettuata correttamente');
                        this.onCloseEdittDialog();
                    }.bind(this),
                    error: function(error) {
                        console.error("Errore durante l'aggiornamento dell'entità:", error);
                    }.bind(this)
                });
                
            },
            onMerci : function () {
                this.getOwnerComponent().getRouter().navTo("Merci");
            },
            onMagazzino : function () {
                this.getOwnerComponent().getRouter().navTo("Magazzino");
            }
        });
    });