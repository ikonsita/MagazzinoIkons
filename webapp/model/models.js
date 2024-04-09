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
                DispMercMag: "",
                PesoMercMag: "",
                DimMercMag: "",
				NoteMercMag: "",
				PrezzoldMercMag: "",
                IvaMercMag: "",
				ValMercMag: "",
                IdMagazzino: "",
                IdOrdine: "",
                Image: ""
			});
		},
        createDominioModel: function() {
            var oModel = new JSONModel();

            $.ajax({
                url: "/sap/opu/odata/sap/ZMAGAZZINO_SRV/MerciSet?$format=json", 
                method: "GET",
                success: function(data) {
                    
                    var IvaMercMag = [];
                    var uniqueIvaValues = {};
                    var IdMerci = [];
                    var uniqueIdValues = {};
                    var IdMagazzino = [];
                    var uniqueIdMagValues = {};
                    var IdOrdine = [];
                    var uniqueIdOrdValues = {};

                    
                    data.d.results.forEach(function(entity) {
                        var ivaValue = entity.IvaMercMag;
                        var idValue = entity.IdMerci;
                        var idMagValue = entity.IdMagazzino;
                        var idOrdValue = entity.IdOrdine;

                        if (!uniqueIvaValues[ivaValue]) {
                            uniqueIvaValues[ivaValue] = true; 
                            IvaMercMag.push(ivaValue);
                        }
                        if (!uniqueIdMagValues[idValue]) {
                            uniqueIdMagValues[idValue] = true; 
                            IdMerci.push(idValue);
                        }
                        if (!uniqueIdValues[idMagValue]) {
                            uniqueIdValues[idMagValue] = true; 
                            IdMagazzino.push(idMagValue);
                        }
                        if (!uniqueIdOrdValues[idOrdValue]) {
                            uniqueIdOrdValues[idOrdValue] = true; 
                            IdOrdine.push(idOrdValue);
                        }
                    });

                    var combinedData = {
                        "IvaMercMag": IvaMercMag,
                        "IdMerci": IdMerci,
                        "IdMagazzino": IdMagazzino,
                        "IdOrdine": IdOrdine
                    };

                    oModel.setData(combinedData); 
                    console.log(combinedData);
                },
                error: function(error) {
                    console.error("Errore durante il recupero dei dati dal backend:", error);
                }
            });

            return oModel;
        },
        createControlModel: function() {
			return new JSONModel({
				editable: false
			});
		},
        createDataModel: function() {
			var oModel = new JSONModel({ "DispMercMag": '' });
			return oModel;
		},
    };
});