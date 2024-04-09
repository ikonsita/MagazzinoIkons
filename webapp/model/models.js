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

                    var DispMercMag = [];
                    var uniqueDispValues = {};

                    
                    data.d.results.forEach(function(entity) {
                        var ivaValue = entity.IvaMercMag;
                        var idValue = entity.IdMerci;
                        var dispValue = entity.DispMercMag;


                        if (!uniqueIvaValues[ivaValue]) {
                            uniqueIvaValues[ivaValue] = true; 
                            IvaMercMag.push(ivaValue);
                        }
                        if (!uniqueIdValues[idValue]) {
                            uniqueIdValues[idValue] = true; 
                            IdMerci.push(idValue);
                        }
                        if (!uniqueDispValues[dispValue]) {
                            uniqueDispValues[dispValue] = true; 
                            DispMercMag.push(dispValue);
                        }
                    });

                    var combinedData = {
                        "IvaMercMag": IvaMercMag,
                        "IdMerci": IdMerci,
                        "DispMercMag": DispMercMag
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
        createMagModel: function() {
            var oModel = new JSONModel();

            $.ajax({
                url: "/sap/opu/odata/sap/ZMAGAZZINO_SRV/MagazzinoSet?$format=json", 
                method: "GET",
                success: function(data) {
                    
                    var IdMagazzino = [];
                    var uniqueIdMagValues = {};

                    data.d.results.forEach(function(entity) {
        
                        var idMagValue = entity.IdMagazzino;

                        if (!uniqueIdMagValues[idMagValue]) {
                            uniqueIdMagValues[idMagValue] = true; 
                            IdMagazzino.push(idMagValue);
                        }
                    });

                    var MagazzinoData = {
                        "IdMagazzino": IdMagazzino,
                    };

                    oModel.setData(MagazzinoData); 
                    console.log(MagazzinoData);
                },
                error: function(error) {
                    console.error("Errore durante il recupero dei dati dal backend:", error);
                }
            });

            return oModel;
        },
        createOrdModel: function() {
            var oModel = new JSONModel();

            $.ajax({
                url: "/sap/opu/odata/sap/ZMAGAZZINO_SRV/OrdineSet?$format=json", 
                method: "GET",
                success: function(data) {
                    
                    var IdOrdine = [];
                    var uniqueIdOrdValues = {};

                    
                    data.d.results.forEach(function(entity) {
                    
                        var idOrdValue = entity.IdOrdine;

                        if (!uniqueIdOrdValues[idOrdValue]) {
                            uniqueIdOrdValues[idOrdValue] = true; 
                            IdOrdine.push(idOrdValue);
                        }
                    });

                    var OrdineData = {
                        "IdOrdine": IdOrdine
                    };

                    oModel.setData(OrdineData); 
                    console.log(OrdineData);
                },
                error: function(error) {
                    console.error("Errore durante il recupero dei dati dal backend:", error);
                }
            });

            return oModel;
        },
        createDataModel: function() {
			var oModel = new JSONModel({ "DispMercMag": '' });
			return oModel;
		},
        createMagazzinoModel: function() {
			var oModel = new JSONModel({"Magazzini": []});
			return oModel;
		},
        createFilterMagModel: function() {
			var oModel = new JSONModel({"Nome": ''});
			return oModel;
		},
        createNewMagModel: function() {
			return new JSONModel({
				Nome: "",
				Indirizzo: "",
				Citta: "",
                Provincia: "",
                Cap: "",
                Orari: "",
				Scaffale: "",
				Reparto: "",
                Area: ""
				
			});
		},
        createEditModel: function() {
			var oModel = new JSONModel({ 
                Nome: "",
				Indirizzo: "",
				Citta: "",
                Provincia: "",
                Cap: "",
                Orari: "",
				Scaffale: "",
				Reparto: "",
                Area: "" 
            });
			return oModel;
		}
    };
});