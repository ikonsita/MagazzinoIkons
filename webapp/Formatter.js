sap.ui.define(function() {
	"use strict";

	var Formatter = {

		status :  function (DispMercMag) {
				if (DispMercMag === "SI") {
					return "Success";
				} else if (DispMercMag === "NO") {
					return "Error";
				} else {
					return "None";
				}
		}
	};

	console.log(Formatter)
	return Formatter;


},  /* bExport= */ true);