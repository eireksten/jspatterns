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

Modify `app.js` and `index.html`, implementing the following using jquery or zepto:

1. Move the script tag to the head of the file, and use the document ready event from zepto/jQuery.
2. Create a header for displaying the note name and a text field for editing the name of the note.
3. Update the header whenever the text field changes.
4. Create a text area for the note contents.
5. [Optional] Use the first line in the text area as note name instead of a separate file.


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

Now its time to update our project to support handlebars templates. Open `Gruntfile.js` and change the line `grunt.registerTask('default', ['jshint']);` to `grunt.registerTask('default', ['jshint', 'handlebars']);`. Then run the command `grunt` from the command line.

1. Run grunt to precompile the templates into javascript.
2. Move the html for both the note and note lists into their corresponding templates/*.hbs files.
3. Add a render method to the controller objects. Generate the html for the component in this method and store it in the controller objects element field!
4. Add the component elements to the page from your `app.js` file
5. Add a 'Clear Note' button (or link) to the note, with the obvious functionality


## Exercise 7 - Data Binding

This project includes an event mixin that can add the event functions `on`, `off` and `emit` on an object. It can be used by calling `steria.eventsmixin(object);` on the object you want to enable the events functionality on.

1. Create a data model object for a note
  - Should store the name and contents of the note.
  - Have it emit events on change
2. Pass this data model object to the controllers and have them store a reference to it.
3. Have controller objects update their own views upon model change, by listening to the events triggered by the data object.


## Exercise 8 - Extending the Notebook

We still have a problem with the button 'New Note', where the note list component explicitly modifies the note component. This need to be addressed.

One solution is to create a layout component that spans the whole notebook, containing both subcomponents (or possibly with the button as a third component). The button should then emit an event when a new note is to be created, and the super component could create a new note when this happens. This component would in effect be the whole app, so you could alternatively use app.js to handle this event.

Another solution is to allow a notelist model (see below) to contain a reference to the currently selected note. When the selected note changes, it should trigger an event and the note component should update itself based on the data in the new related model. Adding a new note would then be as simple as creating a new model and selecting it in the note list model.

#### Maintaining a list of notes

We still only have support for a single note at a time. To increase usability, we want to be able to maintain a whole list of notes at a time.

- Introduce a notelist model, and have the notelist reference this instead of a single note.
- Expand the notelist with functionality for adding a new note (not yet selecting it).
- The notelist model should relay change events from all its sub models (the notes).
- The notelist controller needs to listen to events on its new model.
- When selecting a note in the notelist (in the browser), the app needs to show the correct note in the editor. Also, when editing a note, the correct entry needs to be updated.

#### Styling

What is an app without proper styling? Modify your `css/style.css` file to your own preferences. An example of a shortcoming in the current design is that the selected note isn't highlighted in the list.

#### Deleting notes

Now that the notebook is looking awesome, you could try expanding it to include note deletion.

#### Data Persistence

When refreshing the page, all your notes will disappear. You could try storing the models in the browsers localstorage (https://developer.mozilla.org/en-US/docs/Web/Guide/API/DOM/Storage). Persistence functionality typically belongs to the model module, and all other parts of your system should be oblivious to how it is done.

One way of approaching this is to store the model data on every change, while retrieving them upon page load (from app.js).

This will sadly require you to create your own web server to serve the app (ie. using express.js, http://expressjs.com/guide.html)