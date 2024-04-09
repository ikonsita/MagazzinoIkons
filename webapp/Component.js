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
                this.setModel(models.createControlModel(), "ControlModel");
                this.setModel(models.createDataModel(), "createDataModel");
            }
        });
    }
);