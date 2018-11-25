import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tercera-pagina',
  templateUrl: './tercera-pagina.component.html',
  styleUrls: ['./tercera-pagina.component.scss']
})
export class TerceraPaginaComponent implements OnInit {
  messageForm: FormGroup;
  submitted = false;
  success = false;
  separator = ';';
  smoker = ['siFumaCheck', 'noFumaCheck'];
  regularSmoker = ['siRegularSmokerCheck', 'noRegularSmokerCheck'];
  maritalStatus = ['marry1Check', 'marry2Check','marry3Check', 'marry4Check', 'marry5Check', 'marry6Check'];
  ownerOfDwelling = ['siViviendaCheck', 'noViviendaCheck'];
  motherOf = ['nroHijos','noneCheck', 'opongoCheck'];
  highSchoolQualifications = ['titulo1Check', 'titulo2Check','titulo3Check','titulo4Check', 'titulo1Check', 'otroTitulo', 'titulo6Check'];
  anotherQualifications = ['siTituloCheck', 'noTituloCheck'];
  highestQualifications = ['qualification', 'subject'];
  studentStatus = ['fullTimeCheck','parTimeCheck','neitherCheck'];
  meansOfIncome = ['salario1Check', 'salario2Check', 'salario3Check', 'salario4Check', 'salario5Check',
                  'salario6Check','salario7Check','salario8Check', 'salario9Check','salario10Check',
                  'salario11Check', 'salario12Check','salario13Check','salario14Check'];
  totalIncome = ['ingreso1Check', 'ingreso2Check', 'ingreso3Check', 'ingreso4Check', 'ingreso5Check',
                'ingreso6Check','ingreso7Check','ingreso8Check', 'ingreso9Check','ingreso10Check',
                'ingreso11Check', 'ingreso12Check','ingreso13Check','ingreso14Check','ingreso15Check','ingreso16Check'];
  
  formFields = ['smoker', 'regularSmoker', 'maritalStatus', 'ownerOfDwelling',
    'motherOf', 'highSchoolQualifications', 'anotherQualifications', 'highestQualifications',
    'studentStatus', 'meansOfIncome', 'totalIncome'];
  
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
      this.apiService.getThirdPage().subscribe(data => {
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

    let smoker = this.buildString(this.smoker, ['Si', 'No']);
    let regularSmoker = this.buildString(this.regularSmoker, ['Si', 'No']);
    let maritalStatus = this.buildString(this.maritalStatus, ['Nunca he estado casado legalmente y nunca he sido registrado en una unión civil.', 'Estoy divorciado o mi matrimonio / unión civil ha sido disuelta.',
    'Soy viudo/viuda o sobreviviendo un(a) compañero(a) de unión civil.', 'Estoy legalmente separado de mi esposo/esposa/compañera de unión civil.', 'Estoy legalmente casado.', 'Estoy legalmente registrado en una unión civil.']);
    let ownerOfDwelling = this.buildString(this.ownerOfDwelling, ['Si', 'No']);
    let motherOf = this.buildString(this.motherOf, ['','Ninguno.','Me opongo a responder esta pregunta.']);
    let highSchoolQualifications = this.buildString(this.highSchoolQualifications, ['Ninguno.', 'Certificación de la escuela de Nueva Zelanda en una o más carreras o certificación nacional nivel 1 o NCEA nivel 1.',
      'Certificación del sexto formulario de Nueva Zelanda en una o más carreras o certificación nacional nivel 2 o NZ UE antes de 1986 en una o más carreras o NCEA nivel 2.', 'Certificación de la escuela superior o de la universformControlNamead de Nueva Zelanda mediante una beca o certificación nacional nivel 2 o NCEA nivel 3 o becario de Nueva Zelanda.','', 'Otro título de escuela secundaria alcanzado en el exterior.']);
    let anotherQualifications = this.buildString(this.anotherQualifications, ['Si','No']);
    let highestQualifications = this.buildString(this.highestQualifications);
    let studentStatus = this.buildString(this.studentStatus, ['Tiempo completo (20 horas o más a la semana).', 'Tiempo parcial (menos de 20 horas a la semana).','Ninguno de estos.']);
    let meansOfIncome = this.buildString(this.meansOfIncome, ['Salario, comisiones, bonificaciones, etc., pagados por mi empleador.','Trabajo por cuenta propia, o negocio que poseo y trabajo.','Intereses, divformControlNameendos, alquileres, otras inversiones.','Pagos regulares de ACC o una aseguradora privada de entes de trabajo.','Pensión de jubilación o de jubilación de Nueva Zelanda.'
    ,'Otra jubilación, pensiones o anualformControlNameades (que no sean la jubilación de Nueva Zelanda, la pensión de veteranos o las pensiones de guerra).','Beneficio de desempleo.','Prestación por enfermedad.','Beneficio de los fines domésticos.','Beneficio de inválidos.','Asignación de estudiantes.',
    'Otros beneficios gubernamentales, pagos de apoyo a los ingresos del gobierno, pensiones de guerra o licencia parental remunerada.','Otras fuentes de ingresos, contando los pagos de apoyo de las personas que no viven en mi hogar.','No hay fuente de ingresos durante ese tiempo.']);
    let totalIncome = this.buildString(this.totalIncome,['Pérdida.','Cero ingresos.','$1 – $5,000','$5,001 – $10,000','$10,001 – $15,000','$15,001 – $20,000','$20,001 – $25,000','$25,001 – $30,000',
    '$30,001 – $35,000','$35,001 – $40,000','$40,001 – $50,000','$50,001 – $60,000','$60,001 – $70,000','$70,001 – $100,000','$100,001 – $150,000','$150,001 o más.']);

      const fields = {
        smoker, regularSmoker, maritalStatus, ownerOfDwelling, motherOf, highSchoolQualifications, anotherQualifications,
        highestQualifications, studentStatus, meansOfIncome, totalIncome
      };
      this.apiService.updateForm(fields)
        .subscribe(
          res => this.router.navigate(['tercera-pagina']),
          err => console.log("Couldn't update form")
        );
      this.success = true;
        }

  }