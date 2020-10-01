# Frontend (ChestUi)

## Structure

The webpage has a static side navigation and title. You can navigate to specific pages on the left side of the page by using the side navigation.

Currently available pages are:
- Patient Dashboard
- File Analysis

The layout of the page dynamically changes when reducing the width of the browser window. This behavior also  simplifies viewing the webpage on handheld devices like smartphones.

## Patient Dashboard
The Patient Dashboard page currently offers following features:
- Add a patient (name + multiple files)
- Upload files
- Remove patients

## File Analysis
Page to upload images and view prediction result.

*Todo:* Call Rest API (post) when uploading an image.

## Angular CLI

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 10.1.1.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
