Feature: Sign up into losestudiantes
    As an user I want to create my account within losestudiantes website in order to rate teachers

Scenario Outline: Sign up failed with wrong inputs

  Given I go to losestudiantes home screen
    When I open the login screen
    And I fill with <name>, <lastName>, <email>, <university>, <department>, <password>, <terms>
	And I try to sign up
    Then I expect an error <error>
	
	Examples:
	| name    | lastName | email                         | university                     | department                           | password     | terms | error                                                |
	|         | Chacón   | laura@uniandes.edu.co         | Universidad de los Andes       | Ingeniería de Sistemas y Computación | Uniandes2020 | Y     | nombre                                               |
    | a       | Chacón   | laura@uniandes.edu.co         | Universidad de los Andes       | Ingeniería de Sistemas y Computación | Uniandes2020 | Y     | nombre                                               |
	| Daniela |          | laura@uniandes.edu.co         | Universidad de los Andes       | Ingeniería de Sistemas y Computación | Uniandes2020 | Y     | apellido                                             |
	| Daniela | a        | laura@uniandes.edu.co         | Universidad de los Andes       | Ingeniería de Sistemas y Computación | Uniandes2020 | Y     | apellido                                             |
	| Daniela | Chacón   |                               | Universidad de los Andes       | Ingeniería de Sistemas y Computación | Uniandes2020 | Y     | Ingresa tu correo                                    |
	| Daniela | Chacón   | l                             | Universidad de los Andes       | Ingeniería de Sistemas y Computación | Uniandes2020 | Y     | Ingresa un correo valido                             |
	| Daniela | Chacón   | laura@uniandes.edu.co         | Seleccionar una universidad... | Ingeniería de Sistemas y Computación | Uniandes2020 | Y     | idUniversidad                                        |	
    | Daniela | Chacón   | laura@uniandes.edu.co         | Universidad de los Andes       | Selecciona tu pregrado...            | Uniandes2020 | Y     | idPrograma                                           |
	| Daniela | Chacón   | laura@uniandes.edu.co         | Universidad de los Andes       | Ingeniería de Sistemas y Computación |              | Y     | Ingresa una contraseña                               |
    | Daniela | Chacón   | laura@uniandes.edu.co         | Universidad de los Andes       | Ingeniería de Sistemas y Computación | a            | Y     | La contraseña debe ser al menos de 8 caracteres      |
	| Daniela | Chacón   | laura@uniandes.edu.co         | Universidad de los Andes       | Ingeniería de Sistemas y Computación | Uniandes2020 | N     | Debes aceptar los términos y condiciones             |
	| Daniela | Chacón   | l.chacon@uniandes.edu.co      | Universidad de los Andes       | Ingeniería de Sistemas y Computación | Uniandes2020 | Y     | Error: Ya existe un usuario registrado con el correo |

Scenario Outline: Sign up succesfull

  Given I go to losestudiantes home screen
    When I open the login screen
    And I fill with <name>, <lastName>, <email>, <university>, <department>, <password>, <terms>
	And I try to sign up
    Then I expect to sign up succesfully
	
	Examples:
	  Examples:
	| name    | lastName | email                         | university                     | department                           | password     | terms |
	| Daniela | Chacón   | laura12345@uniandes.edu.co        | Universidad de los Andes       | Ingeniería de Sistemas y Computación | Uniandes2020 | Y     |