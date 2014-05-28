var steria = steria || {};
steria.controllers = steria.controllers || {};

steria.controllers = (function ($) {
	"use strict";

	var notecontroller = {
		render: function () {
			this.$element.empty().html(
				steria.templates.note({
					name: '',
					content: ''
				})
			);

			this.$notename = this.$element.find('.notename');
		},
		bindEvents: function () {
			this.$notename.on('keyup', this.nameChanged.bind(this));		
		},
		nameChanged: function () {
			var name = this.$notename.val().trim();
			if (name.length === 0) {
				name = "My Note";
			}
			$('h3').text(name);
		}
	};

	var notelistcontroller = {
		render: function () {
			this.$element.empty().html(
				steria.templates.notelist({
					notename: 'My Note'
				})
			);
			this.$header = this.$element.find('h3');
			this.$newbutton = this.$element.find('button');
		},
		bindEvents: function () {
			this.$newbutton.click(this.newnote.bind(this));
		},
		newnote: function () {
			steria.controllers.createNote($('.note'));
		}
	};


	return {
		createNote: function ($element) {
			var obj = Object.create(notecontroller);

			obj.$element = $element;
			obj.render();
			obj.bindEvents();

			return obj;

		},
		createNotelist: function ($element) {
			var obj = Object.create(notelistcontroller);

			obj.$element = $element;
			obj.render();
			obj.bindEvents();

			return obj;
		}
	};

}(Zepto));