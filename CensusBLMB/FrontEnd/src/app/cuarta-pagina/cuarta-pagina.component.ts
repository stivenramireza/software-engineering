import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-cuarta-pagina',
  templateUrl: './cuarta-pagina.component.html',
  styleUrls: ['./cuarta-pagina.component.scss']
})
export class CuartaPaginaComponent implements OnInit {
  messageForm: FormGroup;
  submitted = false;
  success = false;
  separator = ';';

  jobStatus = ['WIncome','WFamilia','WCurrent','WNone'];
  typeOfEmployee = ['RPaid','RSelf','ROwn','RFam'];
  jobOccupation = ['Ocupa'];
  tasksOrDuties = ['Duty'];
  nameOfBusiness = ['BName'];
  mainActivityOfBusiness = ['AMain'];
  siteOfWork = ['AtHome','AtWork'];
  buildingName = ['NBusy'];
  businessStreet = ['SBusy'];
  businessRural = ['RBusy'];
  businessCity = ['CBusy'];
  hoursPerWeek = ['WHours','OHours'];
  wayOfTraveling = ['Home','DWork','Bus','Train','Private','Company','Pass','CoBus','Moto','Cycle','Walk','Other'];
  lookingForWork = ['LYes','LNo'];
  meansOfLookingToWork = ['WAd','WApply','WContact', 'WFriends','WCareer','WOther'];
  readyToWork = ['DYes','DNo'];
  activitiesDoneWithoutPay = ['NHouse','NCareH','NIllH','NCare','NIll','NOther','None'];
  phoneNumber = ['Area','Number'];

  formFields = ['jobStatus','typeOfEmployee','jobOccupation','tasksOrDuties','nameOfBusiness','mainActivityOfBusiness',
                'siteOfWork', 'buildingName','businessStreet','businessRural','businessCity','hoursPerWeek',
                'wayOfTraveling','lookingForWork','meansOfLookingToWork','readyToWork',
                'activitiesDoneWithoutPay','phoneNumber'];
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
    this.apiService.getFourthPage().subscribe(data => {
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

    let jobStatus = this.buildString(this.jobStatus, ['Income','Family','DontWorkThatWeek','None']);
    let typeOfEmployee = this.buildString(this.typeOfEmployee,['Paid','Self','OwnBusiness','Family']);
    let jobOccupation = this.buildString(this.jobOccupation);
    let tasksOrDuties = this.buildString(this.tasksOrDuties);
    let nameOfBusiness = this.buildString(this.nameOfBusiness);
    let mainActivityOfBusiness = this.buildString(this.mainActivityOfBusiness);
    let siteOfWork = this.buildString(this.siteOfWork,['Home','OutOfHome']);
    let buildingName = this.buildString(this.buildingName);
    let businessStreet = this.buildString(this.businessStreet);
    let businessRural = this.buildString(this.businessRural);
    let businessCity = this.buildString(this.businessCity);
    let hoursPerWeek = this.buildString(this.hoursPerWeek);
    let wayOfTraveling = this.buildString(this.wayOfTraveling,['Home','DidNotWork','Bus','Train','PrivateCar','CompanyCar',
    'Passanger','CompanyBus','Moto','Cycle','Walk', undefined]);
    let lookingForWork = this.buildString(this.lookingForWork,['Yes','No']);
    let meansOfLookingToWork = this.buildString(this.meansOfLookingToWork,['Advertisement','Apply','Contact','Friends',
    'Career','Other']);
    let readyToWork = this.buildString(this.readyToWork,['Yes','No']);
    let activitiesDoneWithoutPay = this.buildString(this.activitiesDoneWithoutPay,['HouseholdWwrk','CareKidsHome',
    'CareIllRelativesHome','CareKids','CareIllRelatives','Other','None']);
    let phoneNumber = this.buildString(this.phoneNumber);

    const fields = {jobStatus, typeOfEmployee, jobOccupation, tasksOrDuties,
      nameOfBusiness, mainActivityOfBusiness, siteOfWork, buildingName, businessStreet,
      businessRural, businessCity, hoursPerWeek, wayOfTraveling, lookingForWork,
      meansOfLookingToWork, readyToWork, activitiesDoneWithoutPay, phoneNumber};

      this.apiService.updateForm(fields)
      .subscribe(
        res => this.router.navigate(['cuarta-pagina']),
        err => console.log("Couldn't update form")
      );
    this.success = true;
   
  }

}
