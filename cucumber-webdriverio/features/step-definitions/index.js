var {Given} = require('cucumber');
var {When} = require('cucumber');
var {Then} = require('cucumber');
var chai = require('chai');
var expect = chai.expect;

chai.use(require('chai-dom'))

Given('I go to losestudiantes home screen', () => {
  browser.url('/');
  if($('button=Cerrar').isDisplayed()) {
    $('button=Cerrar').click();
  }
});

When('I open the login screen', () => {
  $('button=Ingresar').waitForExist(5000);
  $('button=Ingresar').waitForDisplayed(5000);
  $('button=Ingresar').click();
});

When('I fill a wrong email and password', () => {
  var cajaLogIn = $('.cajaLogIn');

  var mailInput = cajaLogIn.$('input[name="correo"]');
  mailInput.click();
  mailInput.setValue('wrongemail@example.com');

  var passwordInput = cajaLogIn.$('input[name="password"]');
  passwordInput.click();
  passwordInput.setValue('123467891');
});

When('I try to login', () => {
  var cajaLogIn = $('.cajaLogIn');
  cajaLogIn.$('button=Ingresar').click();
});

Then('I expect to not be able to login', () => {
  $('.aviso.alert.alert-danger').waitForDisplayed(5000);
});

When(/^I fill with (.*) and (.*)$/ , (email, password) => {
  var cajaLogIn = $('.cajaLogIn');

  var mailInput = cajaLogIn.$('input[name="correo"]');
  mailInput.click();
  mailInput.keys(email);

  var passwordInput = cajaLogIn.$('input[name="password"]');
  passwordInput.click();
  passwordInput.keys(password)
});

Then('I expect to see {string}', error => {
  $('.aviso.alert.alert-danger').waitForDisplayed(5000);
  var alertText = browser.$('.aviso.alert.alert-danger').getText();
  expect(alertText).to.include(error);
});


Then('I expect to be able to login', () => {
  $('.usrImage').waitForDisplayed(5000);
  var user = browser.$('.usrImage');
  expect(user).to.exist;
});

When(/^I fill with (.*), (.*), (.*), (.*), (.*), (.*), (.*)$/ , (name, lastName, email, university, department, password, terms) => {
  $('.cajaSignUp').waitForExist(5000);
  $('.cajaSignUp').waitForDisplayed(5000);

  var cajaSignUp = $('.cajaSignUp');

  var nameInput = cajaSignUp.$('input[name="nombre"]');
  nameInput.click();
  nameInput.keys(name);

  var lastNameInput = cajaSignUp.$('input[name="apellido"]');
  lastNameInput.click();
  lastNameInput.keys(lastName);

  var mailInput = cajaSignUp.$('input[name="correo"]');
  mailInput.click();
  mailInput.keys(email);

  if(university==='Seleccionar una universidad...'){
    var universityInput = cajaSignUp.$('select[name="idUniversidad"]');
    universityInput.click();
    universityInput.selectByVisibleText(university);

  }
  else {
    var universityInput = cajaSignUp.$('select[name="idUniversidad"]');
    universityInput.click();
    universityInput.selectByVisibleText(university);

    var departmentInput = cajaSignUp.$('select[name="idPrograma"]');
    departmentInput.click()
    departmentInput.selectByVisibleText(department);

  }

  var passwordInput = cajaSignUp.$('input[name="password"]');
  passwordInput.click();
  passwordInput.keys(password);

  if(terms === 'Y'){
    var termsInput = cajaSignUp.$('input[name="acepta"]');
    termsInput.click();
  }
});

When('I try to sign up', () => {
  var cajaSignUp = $('.cajaSignUp');
  cajaSignUp.$('button=Registrarse').click();
});

Then('I expect an error {}', error => {
  if (/ /.test(error)) {
    if(error === 'Error: Ya existe un usuario registrado con el correo'){
      $('div.text-muted').waitForDisplayed(5000);
      var alertText = browser.$('div.text-muted').getText();
      expect(alertText).to.include(error);
    }
    else{
      $('.aviso.alert.alert-danger').waitForDisplayed(5000);
      var alertText = browser.$('.aviso.alert.alert-danger').getText();
      expect(alertText).to.include(error);
    }
  }
  else{
    $('.has-error .form-control').waitForDisplayed(5000);
    var resp = browser.$('.has-error .form-control').getAttribute("name");
    console.log(resp);
    expect(resp).to.include(error);
  }
});

Then('I expect to sign up succesfully', () => {
  $('div.text-muted').waitForDisplayed(5000);
  var alertText = browser.$('div.text-muted').getText();
  expect(alertText).to.include('Verifica tu correo y activa tu cuenta');
});