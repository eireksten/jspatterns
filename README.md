Javascript Patterns and Best Practices
==========

This project contains the code for the workshop.

## Exercise 1 - Set up the project

Run the following commands in the shell (from where you want your project to be located).

```shell
npm install -g grunt-cli
git clone https://github.com/eireksten/jspatterns.git
cd jspatterns
git checkout 987cb349dfca3f7b011be61a742fde92ec5df7c5
npm install
grunt
```

Running the grunt command should output "Done, without errors". Now, open the file index.html in a browser and verify that something appears.


## Exercise 2 - JSHint

From the project directory, run the following commands. Your grunt configuration now contains JSHint, and you will receive an error report upon building.

```shell
git checkout c874f73c761a10c38fb4e76b1f8335d22dbac5e2
npm install
grunt
```

Fix the jshint errors.


## Exercise 3 - Zepto/jQuery

Modify `app.js` and `index.html`, implementing the following using jquery and zepto:

1. Include zepto / jquery from [http://cdnjs.com](http://cdnjs.com)
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

1. Move the html for both the note and note lists into separate template (*.hbs) files in the templates directory (create it).
2. Render the component from javascript (add a render method to the controller objects)!
3. Add the component elements to the page from your `app.js`
4. Add a 'New Note' button (or link) to the note list
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
            i = list.length = func ? listeners.length : 0;
        
        while (i-- > 0) {
          if (func === list[i].fun) {
                list.splice(i,1);
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

Now that we have the basics in place, you can extend the notebook with the following

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
- 