var steria = steria || {};
steria.controllers = steria.controllers || {};

steria.controllers = (function ($) {
	"use strict";

	var notecontroller = {
		render: function () {
			this.$element.empty().html(
				steria.templates.note({
					name: this.model.getName(),
					content: this.model.getContent()
				})
			);

			this.$notename = this.$element.find('.notename');
		},
		bindEvents: function () {
			this.$notename.on('keyup', this.nameChanged.bind(this));		
		},
		nameChanged: function () {
			var name = this.$notename.val().trim();
			this.model.setName(name);
		}
	};

	var notelistcontroller = {
		render: function () {
			this.$element.empty().html(
				steria.templates.notelist({
					notename: this.model.getName()
				})
			);
			this.$header = this.$element.find('h3');
			this.$newbutton = this.$element.find('button');
		},
		bindEvents: function () {

			this.$newbutton.click(this.newnote.bind(this));
			this.model.on('change:name', this.render.bind(this));

		},
		newnote: function () {
			// TODO Separate Concerns!
			steria.controllers.createNote($('.note'));
		}
	};


	return {
		createNote: function (model, $element) {
			model = model || steria.models.createNote();
			$element = $element || $('<div>').addClass('note');

			var obj = Object.create(notecontroller);

			obj.$element = $element;
			obj.model = model;
			
			obj.render();
			obj.bindEvents();

			return obj;

		},
		createNotelist: function (model, $element) {
			var obj = Object.create(notelistcontroller);

			obj.$element = $element;
			obj.model = model;

			obj.render();
			obj.bindEvents();

			return obj;
		}
	};

}(Zepto));