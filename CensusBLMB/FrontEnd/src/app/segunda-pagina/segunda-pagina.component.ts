import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-segunda-pagina',
  templateUrl: './segunda-pagina.component.html',
  styleUrls: ['./segunda-pagina.component.scss']
})
export class SegundaPaginaComponent implements OnInit {
  messageForm: FormGroup;
  submitted = false;
  success = false;
  separator = ';';
  
  religions = ['Sin Religion', 'Budista', 'Hindú', 'Musulmán', 'Judío',
    'Cristiano', 'Anglicano', 'Católico', 'Presbiteriano', 'Metodista', 'Rätana',
    'Ringatü', 'Otro'];

  languages = ['InglesCheck', 'EspanolCheck', 'FrancesCheck', 'PortuguesCheck',
    'OtherLanguages', 'NoLanguage'];
  indigenous = ['SiIndioCheck', 'NoIndioCheck', 'NoSabeIndioCheck'];
  tribe = ['SiTribuCheck', 'NoTribuCheck'];
  tribeName = ['TribuNombreCampo'];
  tribeLocation = ['TribuLugarCampo'];
  healthProblems = ['VistaCheck', 'EscuchaCheck', 'CaminarCheck', 'ManosCheck',
    'AprendizajeCheck', 'ComunicarCheck', 'NingunaCheck'];
  disability = ['SiDiscapacidadCheck', 'NoDiscapacidadCheck'];
  religion = ['religion'];
  relativesLivingInHouse = ['marriedCheck', 'freeUCheck', 'freeUHomoCheck',
    'Boy(girl)friendCheck', 'Boy(girl)friendHomoCheck', 'parentsCheck',
    'son(s)/daughter(s)Check', 'brother(s)/sister(s)Check', 'flatmateCheck',
    'othersCheck', 'personasCampo', 'AloneCheck'];

  formFields = ['languages', 'indigenous', 'tribe', 'tribeName',
    'tribeLocation', 'healthProblems', 'disability', 'religion',
    'relativesLivingInHouse'];

  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private router: Router) { }

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
    this.apiService.getSecondPage().subscribe(data => {
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

    let languages = this.buildString(this.languages, ['English', 'Spanish',
      'French', 'Portuguese', undefined, 'None']);
    let indigenous = this.buildString(this.indigenous, ['Yes', 'No', 'Unknown']);
    let tribe = this.buildString(this.tribe, ['Yes', 'No']);
    let tribeName = this.buildString(this.tribeName);
    let tribeLocation = this.buildString(this.tribeLocation);
    let healthProblems = this.buildString(this.healthProblems, ['Sight', 'Hearing',
      'Walking', 'Hands', 'Learning', 'Communication', 'None']);
    let disability = this.buildString(this.disability, ['Yes', 'No']);
    let religion = this.buildString(this.religion);
    let relativesLivingInHouse = this.buildString(this.relativesLivingInHouse,
      ['Spouse', 'Partner', 'HomoPartner', 'BoyGirlfriend', 'HomoBoyGirlfriend',
        'Parents', 'Children', 'Siblings', 'Roommate', undefined, 'Alone']);


    const fields = {
      languages, indigenous, tribe, tribeName, tribeLocation, healthProblems,
      disability, relativesLivingInHouse, religion
    };
    this.apiService.updateForm(fields)
      .subscribe(
        res => this.router.navigate(['segunda-pagina']),
        err => console.log("Couldn't update form")
      );
    this.success = true;
  }
}
