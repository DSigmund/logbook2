# logbook

This is a very simple LogBook that works from the Command-Line.

## Installation

`npm install -g my-logbook`

## Configuration

Create a File _.logbook-config.json_ in your Home-Directory, which looks like this:

```json
{
  "file": "/path/to/save/file.json",
  "results":"/path/to/save/file.html",
  "myName": "Show in HTML"
}
```

* file: The JSON-File to write the logs to.
* results: The HTML-File containing the exported LogBook
* myName: Your Name in the HTML-File!

## Usage

To add an entry just call:  
`l <entry>`

Where _entry_ is of your choice.

It may contain plaintext, although some special tags may be used:

* @something : is used to mark a context, project, etc.
* +mything : is used to mark a task
* #thisthing : is used to mark tags

To get a nice HTML with a nice LogBook as HTML:  
`createBook`

## Contribution

Look at the Code and then fork it and create a pull-request.  
Id love to hear your suggestions!

## Author

* Dominik Sigmund <dominik.sigund@webdad.eu>

## License

See LICENSE
