# AngularStructure

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.2.4 and demonstrates core Angular concepts and best practices.

## Development server

Run `npm start` (or `ng serve`) for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `npm test` (or `ng test`) to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Angular Features

This training project includes implementations of the following Angular concepts:

### Components
- **Dashboard Component**: Main landing page showcasing the application overview
- **Users Management**: Display and edit user information with forms
- **Products Management**: Manage product data with CRUD operations
- **Lifecycle Demo**: Demonstrates Angular lifecycle hooks
- **Notification List**: Shows notifications to users
- **Navbar**: Navigation component for application routing
- **Login Form**: Authentication form component
- **User Profile**: User information display component

### Routing
- Configured with Angular Router using standalone routing configuration
- Route guards protecting authenticated routes
- Route data with page titles
- Wildcard routing for 404 Not Found pages
- Lazy-loaded modules for feature organization

### Services
- **User Service**: Handles user data and API operations
- **Product Service**: Manages product data and CRUD operations
- **Notification Service**: Manages user notifications
- **Analytics Service**: Tracks analytics events

### Guards
- **Auth Guard**: Protects routes requiring authentication with `canActivate` protection

### Interceptors
- **Logging Interceptor**: Intercepts HTTP requests and responses for logging purposes

### Custom Directives
- **Click Outside Directive**: Detects clicks outside an element
- **Debounce Click Directive**: Debounces rapid click events
- **Highlight Directive**: Applies highlight styling to elements
- **Loading Directive**: Shows loading state on elements

### Pipes
- **Async Transform Pipe**: Handles async data transformations
- **Currency Format Pipe**: Formats currency values
- **Highlight Pipe**: Highlights text within content
- **Safe HTML Pipe**: Safely renders HTML content
- **Status Badge Pipe**: Formats status values as badges
- **Truncate Pipe**: Truncates long text with ellipsis

### Forms
- **Reactive Forms**: Implemented in edit forms for user and product data
- Form validation and error handling
- Edit forms with route parameters

### Animations
- Global animations configuration enabled via `provideAnimations()`
- Animation support for component transitions

### Styling
- **SCSS**: Global and component-level styles with SCSS preprocessor
- Component-scoped styles for encapsulation

### Modules
- **Feature Modules**: Organized modules for products and product details
- Standalone components configuration

## Project Structure

```
src/
├── app/
│   ├── components/          # Reusable UI components
│   ├── directives/          # Custom directives
│   ├── guards/              # Route guards
│   ├── interceptors/        # HTTP interceptors
│   ├── services/            # Business logic services
│   ├── pipes/               # Custom pipes
│   ├── modules/             # Feature modules
│   ├── app.config.ts        # Application configuration
│   ├── app.routes.ts        # Route definitions
│   └── app.component.ts     # Root component
├── main.ts                  # Application entry point
└── styles.scss              # Global styles
```

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.

For more information about Angular features used in this project, visit the [Angular Documentation](https://angular.dev).
