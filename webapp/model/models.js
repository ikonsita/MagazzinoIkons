sap.ui.define([
    "sap/ui/model/json/JSONModel",
    "sap/ui/Device"
], 
    /**
     * provide app-view type models (as in the first "V" in MVVC)
     * 
     * @param {typeof sap.ui.model.json.JSONModel} JSONModel
     * @param {typeof sap.ui.Device} Device
     * 
     * @returns {Function} createDeviceModel() for providing runtime info for the device the UI5 app is running on
     */
    function (JSONModel, Device) {
        "use strict";

        return {
            createDeviceModel: function () {
                var oModel = new JSONModel(Device);
                oModel.setDefaultBindingMode("OneWay");
                return oModel;
        },
        createGeneralModel: function() {
			var oModel = new JSONModel({"Dati": []});
			return oModel;
		},
        createFilterModel: function() {
			var oModel = new JSONModel({"DescMag": ''});
			return oModel;
		},
        createNewInvoiceModel: function() {
			return new JSONModel({
				DescMag: "",
				CategMercMag: "",
				QuantdispMercMag: "",
				PrezzoldMercMag: "",
                IvaMercMag: "",
				ValMercMag: "",
				PesoMercMag: "",
				DimMercMag: "",
				DispMercMag: "",
				NoteMercMag: "",
                IdMagazzino: "",
                IdOrdine: ""
			});
		},
        createDominioModel: function() {
            var oModel = new JSONModel();

            $.ajax({
                url: "/sap/opu/odata/sap/ZMAGAZZINO_SRV/MerciSet?$format=json", 
                method: "GET",
                success: function(data) {
                    
                    var ivaValues = [];
                    var uniqueIvaValues = {};

                    
                    data.d.results.forEach(function(entity) {
                        var ivaValue = entity.IvaMercMag;

                        if (!uniqueIvaValues[ivaValue]) {
                            uniqueIvaValues[ivaValue] = true; 
                            ivaValues.push(ivaValue);
                        }
                    });

                    
                    oModel.setData(ivaValues); 
                },
                error: function(error) {
                    console.error("Errore durante il recupero dei dati dal backend:", error);
                }
            });

            return oModel;
        },
        createIVAModel: function() {
			var oModel = new JSONModel({"ivaValues": []});
			return oModel;
		}
    };
});