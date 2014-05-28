/*global steria */

Zepto(function () {
	"use strict";

	var note = steria.models.createNote();

    steria.controllers.createNotelist(note, $('.notelist'));
    steria.controllers.createNote(note, $('.note'));

});