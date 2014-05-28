var steria = steria || {};

steria.models = (function () {
	"use strict";

	var note = {
		setName: function (name) {
			this.name = name;
			this.emit('change');
			this.emit('change:name', this.name);
		},
		setContent: function (content) {
			this.content = content;
			this.emit('change');
			this.emit('change:content', this.content);
		},
		getName: function () {
			return this.name;
		},
		getContent: function () {
			return this.content;
		}
	};

	return {
		createNote: function (name, content) {
			var obj = Object.create(note);

			steria.eventsmixin(obj);

			name = name || 'My Note';
			content = content || '';

			obj.setName(name);
			obj.setContent(content);

			return obj;
		}
	};


}());