### <img width="30" height="30" src="/src/assets/images/favicon.ico">  NGNF

---

#### Development servers

##### <img width="20" height="20" src="/src/assets/images/Angular.png">  [Angular UI](https://github.com/angular/angular-cli) version 9.1.0
* Run `ng serve` from the root folder.
* Navigate to `http://localhost:4200/`. 
* The app will automatically reload if you change any of the source files.


##### <img width="25" height="15" src="/src/assets/images/php.png">  [PHP Server](https://www.php.net/ChangeLog-7.php) version 7.4.4.
* Run `php -S localhost:8080 -t ./ngnf-php` from the root folder.
* The api we be accessible from `localhost:8080/`.


##### <img width="30" height="17" src="/src/assets/images/MySQL.png">  [MySQL Database Server](https://dev.mysql.com/doc/relnotes/mysql/5.7/en/news-5-7-22.html) version 5.7
* Copy `./ngnf-php/config/database_demo.php` to `database.php` and add your database connection details.
* MySQL database scripts are stored in `./ngnf-ng/ngnf-mysql/`.


---

#### Code scaffolding
Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.


#### Build
Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.


#### Running unit tests
Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).


#### Running end-to-end tests
Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).


#### Further help
To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
