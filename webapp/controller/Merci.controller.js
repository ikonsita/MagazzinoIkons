sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller) {
        "use strict";

        return Controller.extend("com.sap.magazzinoikons.controller.Merci", {
            onInit: function(){
                //VARIABLES DEFINITION
                var filters = [];

                //READING TO LIST FOR LOGGED USER
                this.getOwnerComponent().getModel().read("/MerciSet", {
                    filters: filters,
                    urlParameters: {
                        //"$expand": "TODetailSet"
                    },
                    success: function(data) {
                        this.getOwnerComponent().getModel("GeneralModel").setProperty("/Dati", data.results);
                        
                    }.bind(this),
                    error: function(error) {}.bind(this)
                });
            },
        })
    });
