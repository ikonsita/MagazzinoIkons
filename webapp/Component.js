/**
 * eslint-disable @sap/ui5-jsdocs/no-jsdoc
 */

sap.ui.define([
        "sap/ui/core/UIComponent",
        "sap/ui/Device",
        "com/sap/magazzinoikons/model/models"
    ],
    function (UIComponent, Device, models) {
        "use strict";

        return UIComponent.extend("com.sap.magazzinoikons.Component", {
            metadata: {
                manifest: "json"
            },

            /**
             * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
             * @public
             * @override
             */
            init: function () {
                // call the base component's init function
                UIComponent.prototype.init.apply(this, arguments);

                // enable routing
                this.getRouter().initialize();

                // set the device model
                this.setModel(models.createDeviceModel(), "device");
                this.setModel(models.createGeneralModel(), "GeneralModel");
                this.setModel(models.createFilterModel(), "FilterModel");
                this.setModel(models.createNewInvoiceModel(), "NewInvoiceModel");
                this.setModel(models.createDominioModel(), "DominioModel");
                this.setModel(models.createDominioModel(), "IVAModel");
                this.setModel(models.createDataModel(), "createDataModel");
                this.setModel(models.createMagazzinoModel(), "MagazzinoModel");
                this.setModel(models.createMagModel(), "MagModel");
                this.setModel(models.createOrdModel(), "OrdModel");
                this.setModel(models.createFilterMagModel(), "FilterMagModel");
                this.setModel(models.createNewMagModel(), "NewMagModel");
                this.setModel(models.createEditModel(), "EditModel");
                this.setModel(models.createUtenteModel(), "UtenteModel");
                this.setModel(models.createLoginModel(), "LoginModel");
                this.setModel(models.createRoleModel(), "RoleModel");      
                this.setModel(models.createRegModel(), "RegModel");           
                this.setModel(models.createPassModel(), "PassModel");           
            }
        });
    }
);