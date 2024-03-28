/*global QUnit*/

sap.ui.define([
	"comsap/magazzinoikons/controller/Merci.controller"
], function (Controller) {
	"use strict";

	QUnit.module("Merci Controller");

	QUnit.test("I should test the Merci controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});
