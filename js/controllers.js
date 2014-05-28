var steria = steria || {};
steria.controllers = steria.controllers || {};

steria.controllers = (function ($) {

	var notecontroller = {
		cacheElements: function () {
			this.$notename = this.$element.find('.notename');
		},
		bindEvents: function () {
			this.$notename.on('keyup', this.nameChanged.bind(this));		
		},
		nameChanged: function () {
			var name = this.$notename.val().trim();
			if (name.length === 0) {
				name = "New Note";
			}
			$('h3').text(name);
		}
	}

	var notelistcontroller = {
		cacheElements: function () {
			this.$header = this.$element.find('h3');
		},
		bindEvents: function () {

		}
	};


	return {
		createNote: function ($element) {
			var obj = Object.create(notecontroller);

			obj.$element = $element;
			obj.cacheElements();
			obj.bindEvents();

			return obj;

		},
		createNotelist: function ($element) {
			var obj = Object.create(notelistcontroller);

			obj.$element = $element;
			obj.cacheElements();
			obj.bindEvents();

			return obj;
		}
	};

}(Zepto));