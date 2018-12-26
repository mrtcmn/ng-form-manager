# ng-form-manager  
Alpha

Create, modify and view your forms with Json. 

## Quick start

Recommended way to install ***ng-form-manager*** is through [npm](https://www.npmjs.com/package/ng-form-manager) package manager using the following command:

  `npm i ng-form-manager --save`
  
Or through [yarn](https://yarnpkg.com/en/package/ng-form-manager)

  `yarn add ng-form-manager`
  
## Install

1. Install as shown in the above section.

2. Import `formManagerModule` into the module that declares the component using ***ng-form-manager***:

```import { formManagerModule } from 'ng-form-manager';```

3. Add it to `[imports]` under `@NgModule`:

```imports: [ ... formManagerModule, ... ]```

4. Add Bootstrap CDN css on your `index.html` file:
Currently support only Bootstrap CSS for form components.

```<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.2.1/css/bootstrap.css" />```

## Usage

Demo application:  [Demo](https://mrtcmn.github.io/)


