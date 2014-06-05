Javascript Patterns and Best Practices
==========

This project contains the code for the workshop.

## Exercise 1 - Set up the project

Run the following commands in the shell (from where you want your project to be located).

```shell
npm install -g grunt-cli
git clone https://github.com/eireksten/jspatterns.git
cd jspatterns
npm install
grunt
```

Running the grunt command should output "Done, without errors". Now, open the file index.html in a browser and verify that something appears.


## Exercise 2 - JSHint

We now want to run JSHint on our project. Open `Gruntfile.js` and change the line `grunt.registerTask('default', []);` to `grunt.registerTask('default', ['jshint']);`. Then run the command `grunt` from the command line.

This should output a few jslint errors in the file `js/app.js`. Fix these errors.


## Exercise 3 - Zepto/jQuery

Modify `app.js` and `index.html`, implementing the following using jquery and zepto:

1. Download zepto / jquery (ie. from http://cdnjs.cloudflare.com/ajax/libs/zepto/1.1.3/zepto.min.js) and put it in the js/lib directory. Include it from index.html.
2. Move the script tag to the head of the file, and use the document ready event from zepto/jQuery.
3. Create a header and a text field for the name of the note
4. Update the header whenever the text field changes
5. Create a text area for the note contents
6. [Optional] Use the first line in the text area as note name.


## Exercise 4 - Module Pattern

1. Move the previously created code from app.js into its own module on the global steria object.
  - Remember to add it to `index.html`
2. Expose the functionality on a your single global object, and call it from app.js


## Exercise 5 - Controller Object

1. Create a Controller Object for a single note
2. Create a Controller Object for the list of notes (currently the header)
3. Initialize each of these separately.

Can you spot a problem with the current structuring of the application?


## Exercise 6 - Client Side Templating

* Run the following command in the shell

```shell
npm install grunt-contrib-handlebars --save-dev
```

* Add the following config to your `Gruntfile.js`

```javascript
// Added to initConfig:
handlebars: {
  options: {
    namespace: 'steria.templates',
    processName: function (filepath) {
      return filepath.substring(filepath.lastIndexOf('/') + 1, filepath.lastIndexOf('.'));
    }
  },
  build: {
    dest: "js/templates.js",
    src: [
      "templates/*.hbs"
    ]
  }
}

// Adding the task
grunt.loadNpmTasks('grunt-contrib-handlebars');
grunt.registerTask('default', ['jshint', 'handlebars']);

```

1. Download handlebars.js (http://cdnjs.cloudflare.com/ajax/libs/handlebars.js/1.3.0/handlebars.js) and include both this and `js/templates.js` in your index.html file.
2. Run grunt to precompile the templates into javascript.
3. Move the html for both the note and note lists into separate template (*.hbs) files in the templates directory (create it).
4. Render the component from javascript (add a render method to the controller objects)!
5. Add the component elements to the page from your `app.js`
6. Add a 'New Note' button (or link) to the note list
  * Should reset the note when clicked


## Exercise 7 - Data Binding

First, create a module for the event emitter

```javascript
function (target) {
    "use strict";

    var events = {};

    target.on = function (type, func, ctx) {
        events[type] = events[type] || [];
        events[type].push({
            fun: func,
            ctx: ctx
        });
    };
    
    target.off = function (type, func) {
        var listeners = events[type] || [],
            i = listeners.length = func ? listeners.length : 0;
        
        while (i-- > 0) {
          if (func === listeners[i].fun) {
                listeners.splice(i,1);
          }
        }
    };
    
    target.emit = function () { // emit(type, args...)
        var args = Array.apply([], arguments),
            listeners = events[args.shift()] || [], 
            i;

        for (i = 0; i < listeners.length; i++) {
            listeners[i].fun.apply(listeners[i].ctx, args);
        }
    };
}
```

Then,

1. Create a data model object for a note
  - Should store the name and contents of the note.
  - Have it emit events on change
2. Pass this data model object to the controllers
3. Have controller objects update their own views upon model change


## Exercise 8 - Extending the Notebook

We still have a problem with the button 'New Note', where the note list component explicitly modifies the note component. This need to be addressed.

One solution is to create a layout component that spans the whole notebook, containing both subcomponents (or possibly with the button as a third component). The button should then emit an event when a new note is to be created, and the super component could create a new note when this happens. This component would in effect be the whole app, so you could alternatively use app.js to handle this event.

Another solution is to introduce a notelist model (see below) that contains both a reference to all notes and the one that is selected. When the selected note changes, the note component should update itself based on the data in the new related model. Adding a new note would then be as simple as creating a new model and selecting it in the note list model.

#### Maintaining a list of notes

We still only have support for a single note at a time. To increase usability, we want to be able to maintain a whole list of notes at a time.

- Introduce a notelist model, and have the notelist reference this instead of a single note.
- The notelist model should relay change events from all its sub models (the notes).
- The notelist controller needs to listen to events on its new model
- When selecting a note in the notelist (in the browser), the app needs to show the correct note in the editor.

#### Styling

What is an app without proper styling? Modify your `css/style.css` file to your own preferences. You could for instance try achieving the following things.

- Left-align the notelist
- Remove bullets from the notelist
- Highlight the currently selected note
- Highlight notes on mouseover

#### Deleting notes

Now that the notebook is looking awesome, you could try expanding it to include note deletion.

#### Data Persistence

When refreshing the page, all your notes will disappear. You could try storing the models in the browsers localstorage (https://developer.mozilla.org/en-US/docs/Web/Guide/API/DOM/Storage). Persistence functionality typically belongs to the model module, and all other parts of your system should be oblivious to how it is done.

One way of approaching this is to store the model data on every change, while retrieving them upon page load (from app.js).

This will sadly require you to create your own web server to serve the app (ie. using express.js, http://expressjs.com/guide.html)