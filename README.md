# Store

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.2.1.

## Running the project

Run `npm install` to install all required dependencies.
Run `npm start` for a dev server. The project should be opened in a new window in your default browser. Otherwise navigate to [http://localhost:4200/](http://localhost:4200/). The application will automatically reload if you change any of the source files.

## Running unit tests

Run `npm test` to execute the unit tests via [Karma](https://karma-runner.github.io).
Run `npm run test-cc` to execute the unit tests once via [Karma](https://karma-runner.github.io) and generate a code coverage report.

## ESLint

The project uses [ESLint](https://eslint.org/) and the separate plugin [ESLint Stylistic](https://eslint.style).
Using ESList allows for a more consistent project and a better development experience.
Run `npm run lint` to execute the linter validation.

It has the following additional rules:
| Rule | Setting |
| :--------------------------------------------------- | :------ |
| No unreachable code                                  | error   |
| Only capitalized comments                            | error   |
| No alerts                                            | error   |
| No console logs                                      | error   |
| Maximum row length of 120                            | warning |
| Parenthesis around arrow function parameters         | error   |
| Arrow spacing around arrow function arrows           | error   |
| Brace styling                                        | error   |
| Trailing comas for multiple lines                    | error   |
| Coma spacing after comas                             | error   |
| New role in the end of the file                      | error   |
| No space before function parenthesis when calling    | error   |
| An indent of two spaces                              | error   |
| Enforcing only single quotes                         | error   |
| Spacing in the beggining of comments                 | error   |
| No spacing before function parenthesis when defining | error   |

## TO DO

- Implement linting before commit locally
- Implement linting after push to GitHub
- Implement test execution after push to GitHub

## References for future use

- `theme.service.spec.ts` - Testing logic in the constructor
- `login.component.ts` - Implementation of template-driven forms
- `register.component.ts` - Implementation of reactive forms
- `input.component.ts` - Implementation of ControlValueAccessor
- `search.component.ts` - Implementation of an input waiting for the user to stop typing
- `search.component.spec.ts` - Testing RxJS debounceTime
