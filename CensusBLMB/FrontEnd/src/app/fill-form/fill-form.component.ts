import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-fill-form',
  templateUrl: './fill-form.component.html',
  styleUrls: ['./fill-form.component.scss']
})
export class FillFormComponent implements OnInit {

  messageForm: FormGroup;
  submitted = false;
  success = false;
  separator = ';';

  genders = ['Masculino', 'Femenino', 'Agénero', 'Andrógino', 'Bigenéro', 'Cis', 'Cisgénero', 'Cis Femenino', 'Cis Masculino',
  'Cis Hombre', 'Cis Mujer', 'Cisgénero Femenino', 'Cisgénero Masculino', 'Cisgénero Hombre', 'Cisgénero Mujer', 'Femenino a Masculino',
  'FAM', 'Genéro Fluido', 'Genéro Inconforme', 'Genéro Cuestionando', 'Genéro Variante', 'Genéroqueer', 'Intersexo',
  'Hombre a Mujer', 'MAF', 'Ninguno', 'Neutral', 'No-binario', 'Otro', 'Pangenéro', 'Trans', 'Trans Femenino',
  'Trans Masculino', 'Trans Hombre', 'Trans Persona', 'Trans Mujer', 'Transfemenino', 'Transgénero', 'Transgénero Femenino',
  'Transgenéro Masculino', 'Transgenéro Hombre', 'Persona Transgénero', 'Transgénero Mujer', 'Transmasculino', 'Transsexual',
  'Transsexual Femenino', 'Transsexual Masculino', 'Transsexual Hombre', 'Transsexual Persona', 'Transsexual Mujer', 'Trap', 'Dos-Espiritus'];

  countries = ['Bolumbia', 'Afganistán', 'Albania', 'Alemania', 'Andorra', 'Angola', 'Antigua y Barbuda', 'Arabia Saudita',
  'Argelia', 'Argentina', 'Armenia', 'Australia', 'Austria', 'Azerbaiyán', 'Bahamas', 'Bangladés', 'Barbados',
  'Baréin', 'Bélgica', 'Belice', 'Benín', 'Bielorrusia', 'Birmania', 'Bolivia', 'Bosnia y Herzegovina', 'Botsuana',
  'Brasil', 'Brunéi', 'Bulgaria', 'Burkina Faso', 'Burundi', 'Bután', 'Cabo Verde', 'Camboya', 'Camerún', 'Canadá',
  'Catar', 'Chad', 'Chile', 'China', 'Chipre', 'Ciudad del Vaticano', 'Colombia', 'Comoras', 'Corea del Norte', 
  'Corea del Sur', 'Costa de Marfil', 'Costa Rica', 'Croacia', 'Cuba', 'Dinamarca', 'Dominica', 'Ecuador', 'Egipto',
  'El Salvador', 'Emiratos Árabes Unidos', 'Eritrea', 'Eslovaquia', 'Eslovenia', 'España', 'Estados Unidos', 'Estonia',
  'Etiopía', 'Filipinas', 'Finlandia', 'Fiyi', 'Francia', 'Gabón', 'Gambia', 'Georgia', 'Ghana', 'Granada', 'Grecia',
  'Guatemala', 'Guyana', 'Guinea', 'Guinea ecuatorial', 'Guinea-Bisáu', 'Haití', 'Honduras', 'Hungría', 'India',
  'Indonesia', 'Irak', 'Irán', 'Irlanda', 'Islandia', 'Islas Marshall', 'Islas Salomón', 'Israel', 'Italia', 'Jamaica',
  'Japón', 'Jordania', 'Kazajistán', 'Kenia', 'Kirguistán', 'Kiribati', 'Kuwait', 'Laos', 'Lesoto', 'Letonia', 'Líbano',
  'Liberia', 'Libia', 'Liechtenstein', 'Lituania', 'Luxemburgo', 'Madagascar', 'Malasia', 'Malaui', 'Maldivas', 'Malí',
  'Malta', 'Marruecos', 'Mauricio', 'Mauritania', 'México', 'Micronesia', 'Moldavia', 'Mónaco', 'Mongolia', 'Montenegro',
  'Mozambique', 'Namibia', 'Nauru', 'Nepal', 'Nicaragua', 'Níger', 'Nigeria', 'Noruega', 'Nueva Zelanda', 'Omán', 
  'Países Bajos', 'Pakistán', 'Palaos', 'Panamá', 'Papúa Nueva Guinea', 'Paraguay', 'Perú', 'Polonia', 'Portugal',
  'Reino Unido', 'República Centroafricana', 'República Checa', 'República de Macedonia', 'República del Congo',
  'República Democrática del Congo', 'República Dominicana', 'República Sudafricana', 'Ruanda', 'Rumanía', 'Rusia',
  'Samoa', 'San Cristóbal y Nieves', 'San Marino', 'San Vicente y las Granadinas', 'Santa Lucía', 'Santo Tomé y Príncipe',
  'Senegal', 'Serbia', 'Seychelles', 'Sierra Leona', 'Singapur', 'Siria', 'Somalia', 'Sri Lanka', 'Suazilandia', 'Sudán',
  'Sudán del Sur', 'Suecia', 'Suiza', 'Surinam', 'Tailandia', 'Tanzania', 'Tayikistán', 'Timor Oriental', 'Togo', 'Tonga',
  'Trinidad y Tobago', 'Túnez', 'Turkmenistán', 'Turquía', 'Tuvalu', 'Ucrania', 'Uganda', 'Uruguay', 'Uzbekistán',
  'Vanuatu', 'Venezuela', 'Vietnam', 'Yemen', 'Yibuti', 'Zambia', 'Zimbabue'];

  
  firstNames = ['firstname'];
  lastNames = ['lastname'];
  gender = ['gender']; 
  birthdate = ['birthdate'];
  address = ['address'];
  timeLivedInAddress = ['timelivedinaddress']; 
  addressFiveYearsAgo = ['addressfiveyearsago'];
  censusNightAddress = ['censusnightaddress'];
  countryOfBirth = ['countryofbirth'];
  dateOfArrival = ['dateofarrival'];
  ethnicGroup = ['ethnicgroup'];

  formFields = [ 'firstNames', 'lastNames', 'gender','birthdate','address','timeLivedInAddress', 'addressFiveYearsAgo',
                 'censusNightAddress', 'countryOfBirth','dateOfArrival','ethnicGroup']

  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private router: Router) {}

  private getFormValue(fieldName: string, value?: String) {
      const val = this.messageForm.controls[fieldName].value;
      return val ? (value ? value : val.toString().trim()) : '';
  }

  private getValues(dbValue: string, formNames: string[]) {
    if (!dbValue)
      return;
    let values = dbValue.split(this.separator);
    for (let i = 0; i < formNames.length; ++i) {
      this.messageForm.controls[formNames[i]].setValue(values[i]);
    }
  }

  private buildString(tagNames: string[], alternativeNames?: String[]) {
    let str = '';
    const n = tagNames.length - 1;
    for (let i = 0; i <= n; ++i) {
      str += this.getFormValue(tagNames[i],
        alternativeNames ? alternativeNames[i] : undefined);
      if (i !== n)
        str += this.separator;
    }
    return str;
  }

  private buildForm() {
    const form = {};
    this.formFields.forEach(value => {
      this[value].forEach(element => {
        form[element] = [''];
      });
    });
    return form;
  }

  ngOnInit() {
    this.messageForm = this.formBuilder.group(this.buildForm());
    this.apiService.getFirstPage().subscribe(data => {
      this.formFields.forEach(value => {
        this.getValues(data['form'][value], this[value]);
      });
    });
  }

  onSubmit() {
    this.submitted = true;
    if (this.messageForm.invalid) {
      return;
    }

    let firstNames = this.buildString(this.firstNames);
    let lastNames = this.buildString(this.lastNames);
    let gender = this.buildString(this.gender);
    let birthdate = this.buildString(this.birthdate);
    let address = this.buildString(this.address);
    let timeLivedInAddress = this.buildString(this.timeLivedInAddress);
    let addressFiveYearsAgo = this.buildString(this.addressFiveYearsAgo);
    let censusNightAddress = this.buildString(this.censusNightAddress);
    let countryOfBirth = this.buildString(this.countryOfBirth);
    let dateOfArrival = this.buildString(this.dateOfArrival);
    let ethnicGroup = this.buildString(this.ethnicGroup);


    const fields = {
      firstNames, lastNames, gender, birthdate, address, timeLivedInAddress, addressFiveYearsAgo,
      censusNightAddress, countryOfBirth, dateOfArrival, ethnicGroup
    };
    this.apiService.updateForm(fields)
      .subscribe(
        res => this.router.navigate(['fill-form']),
        err => console.log("Couldn't update form")
      );
    this.success = true;
  }
}

