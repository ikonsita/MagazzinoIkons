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
		},
        createUtenteModel: function() {
			var oModel = new JSONModel({"Utenti": []});
			return oModel;
		},
        createRoleModel: function() {
            var oModel = new JSONModel();

            $.ajax({
                url: "/sap/opu/odata/sap/ZMAGAZZINO_SRV/UtenteSet?$format=json", 
                method: "GET",
                success: function(data) {
                    
                    var Email = [];
                    var uniqueEmailValues = {};

                    var Password = [];
                    var uniquePasswordValues = {};
                    
                    var Ruolo = [];
                    var uniqueRuoliValues = {};


                    
                    data.d.results.forEach(function(entity) {
                    
                        var emailValue = entity.Mail;
                        var passwordValue = entity.Password;
                        var utenteValue = entity.Ruolo;

                        if (!uniqueEmailValues[emailValue]) {
                            uniqueEmailValues[emailValue] = true; 
                            Email.push(emailValue);
                        }

                        if (!uniquePasswordValues[passwordValue]) {
                            uniquePasswordValues[passwordValue] = true; 
                            Password.push(passwordValue);
                        }

                        if (!uniqueRuoliValues[utenteValue]) {
                            uniqueRuoliValues[utenteValue] = true; 
                            Ruolo.push(utenteValue);
                        }

                    });

                    var RuoliData = {
                        "Email": Email,
                        "Password": Password,
                        "Ruolo": Ruolo
                    };

                    oModel.setData(RuoliData); 
                    console.log(RuoliData);
                },
                error: function(error) {
                    console.error("Errore durante il recupero dei dati dal backend:", error);
                }
            });

            return oModel;
        },
        createLoginModel: function() {
			return new JSONModel({
				Email: "",
				Password: "",
                Ruolo: ""
			});
		},
        createRegModel: function() {
			return new JSONModel({
				Mail: "",
				Password: "",
                Ruolo: ""
			});
		},
        createPassModel: function() {
			var oModel = new JSONModel({ 
                Password: "", 
            });
			return oModel;
		},
        createProdottiModel: function() {
			var oModel = new JSONModel({"Dati": []});
			return oModel;
		},
        createCartModel: function() {
			var oModel = new JSONModel({"IdMerci": [],  "PrezzoTotale": ''});
			return oModel;
		},
        createCartGeneralModel: function() {
			var oModel = new JSONModel({"Dati": []});
			return oModel;
		},
        createNewOrderModel: function() {
			var oModel = new JSONModel({"NumeroOrdine": '00001', "Categoria": '', "IndirizzoConsegna": '', "DettaglioOrdine":'', "DataOrdine": new Date(),"IndirizzoPartenza": 'Magazzini Ikons',"Stato": 'SPEDIZIONE', "PrezzoTotale": '', "IdFornitore": '1',"IdCliente": '1'});
			return oModel;
		},
        createOrderModel: function() {
			var oModel = new JSONModel({"Dati": []});
			return oModel;
		},

        createOrderFilterModel: function() {
			var oModel = new JSONModel({"IdOrdine": ''});
			return oModel;
		},
        createGeneralOrderModel: function() {
			var oModel = new JSONModel({"Dati": []});
			return oModel;
		}
    };
});