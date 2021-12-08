import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToasterPosition } from 'src/models/toast.model';
import { ClientInfo } from 'src/models/zahlungsauftrag/maccSelection/clientInfo.model';
import { MaccInfo } from 'src/models/zahlungsauftrag/maccSelection/maccInfo.model';
import { selectInlandVariables } from 'src/models/zahlungsauftrag/maccSelection/variables.model';
import { TaskService } from 'src/services/task.service';
import { ASBToastService } from 'src/services/toast.service';

@Component({
  selector: 'app-inland',
  templateUrl: './inland.component.html',
  styleUrls: ['./inland.component.css']
})
export class InlandComponent implements OnInit {
  clientInfo: ClientInfo = {}
  maccInfo: MaccInfo = {}
  zahlungsAuftrag: any = {}
  processInstanceVariables: any
  processInstanceId: string = ''
  taskDefinitionKey: string = ''
  id: string = ''
  isLoading: boolean = true
  loadingSpinner: boolean = false
  inlandForm: FormGroup;
  minDate: Date;
  submitData: selectInlandVariables

  constructor(
    private route: ActivatedRoute,
    private taskService: TaskService,
    private fb: FormBuilder,
    private router: Router,
    private ASBToastService: ASBToastService) {
    this.minDate = new Date();
  }

  ngOnInit() {
    this.ASBToastService.asbInfoToastr('Data loaded', 'Information', ToasterPosition.bottomLeft, 2000, true)
    this.processInstanceId = this.route.snapshot.params['processInstanceId']
    this.id = this.route.snapshot.params['id']

    this.getProcessInstanceVars(this.processInstanceId);

    this.inlandForm = this.fb.group({
      'paymentDateExecution': [null, [Validators.required]],
      'currency': ['CHF', [Validators.required]],
      'amount': [null, [Validators.required]],
      'iban': [null, [Validators.required]],
      'bankkonto': [null],
      'empfaengerVorname': [null],
      'empfaengerName': [null, [Validators.required]],
      'empfaengerStr': [null],
      'empfaengerStrNr': [null],
      'empfaengerPlz': [null],
      'empfaengerOrt': [null],
      'empfaengerLand': ['CH', [Validators.required]],
      'mitteilungFuerBeguenstigster': [null],
      'mitteilungFuerAuftraggeber': [null],
      'bic': [null],
      'clearing': [null, [Validators.required]],
      'bankName': [null, [Validators.required]],
      'bankStr': [null],
      'bankStrNr': [null],
      'bankPLZ': [null],
      'bankOrt': [null],
      'bankLand': ['CH', [Validators.required]]
    })
  }

  getProcessInstanceVars(processInstanceId: string) {
    this.taskService.fetchProcessInstanceVars(processInstanceId).subscribe(data => {
      this.processInstanceVariables = data.body;

      this.clientInfo = JSON.parse(this.processInstanceVariables.clientInfo.value);
      this.maccInfo = JSON.parse(this.processInstanceVariables.maccInfo.value);
    }, error => {
      this.router.navigate(['home'])
      this.ASBToastService.asbErrorToastr(error.message, 'An Error Occured!', ToasterPosition.bottomLeft, 5000, true)
    }, () => {
      if (this.processInstanceVariables.hasOwnProperty('zahlungsauftrag')) {
        this.zahlungsAuftrag = JSON.parse(this.processInstanceVariables.zahlungsauftrag.value);
        this.inlandForm.patchValue({
          'paymentDateExecution': this.zahlungsAuftrag.zahlungsauftrag.ausfuehrungsgDatum,
          'currency': this.zahlungsAuftrag.zahlungsauftrag.currency,
          'amount': this.zahlungsAuftrag.zahlungsauftrag.amount,
          'iban': this.zahlungsAuftrag.zahlungsauftrag.beneficiary.beneficiaryIban,
          'bankkonto': this.zahlungsAuftrag.zahlungsauftrag.beneficiary.beneficiaryKontoNummer,
          'empfaengerVorname': this.zahlungsAuftrag.zahlungsauftrag.beneficiary.beneficiaryVorname,
          'empfaengerName': this.zahlungsAuftrag.zahlungsauftrag.beneficiary.beneficiaryNachname,
          'empfaengerStr': this.zahlungsAuftrag.zahlungsauftrag.beneficiary.beneficiaryStrasse,
          'empfaengerStrNr': this.zahlungsAuftrag.zahlungsauftrag.beneficiary.beneficiaryStrassenNr,
          'empfaengerPlz': this.zahlungsAuftrag.zahlungsauftrag.beneficiary.beneficiaryPlz,
          'empfaengerOrt': this.zahlungsAuftrag.zahlungsauftrag.beneficiary.beneficiaryOrt,
          'empfaengerLand': this.zahlungsAuftrag.zahlungsauftrag.beneficiary.beneficiaryCountry,
          'mitteilungFuerBeguenstigster': this.zahlungsAuftrag.zahlungsauftrag.beneficiary.beneficiaryRemark,
          'mitteilungFuerAuftraggeber': this.zahlungsAuftrag.zahlungsauftrag.bookingText,
          'bic': this.zahlungsAuftrag.zahlungsauftrag.beneficiary.beneficiaryBankBic,
          'clearing': this.zahlungsAuftrag.zahlungsauftrag.beneficiary.beneficiaryBankSwiftCode,
          'bankName': this.zahlungsAuftrag.zahlungsauftrag.beneficiary.beneficiaryBankName,
          'bankStr': this.zahlungsAuftrag.zahlungsauftrag.beneficiary.beneficiaryBankStreet,
          'bankStrNr': this.zahlungsAuftrag.zahlungsauftrag.beneficiary.beneficiaryStrassenNr,
          'bankPLZ': this.zahlungsAuftrag.zahlungsauftrag.beneficiary.beneficiaryPlz,
          'bankOrt': this.zahlungsAuftrag.zahlungsauftrag.beneficiary.beneficiaryBankCity,
          'bankLand': this.zahlungsAuftrag.zahlungsauftrag.beneficiary.beneficiaryBankCountry
        })
      }
      if (this.processInstanceVariables.hasOwnProperty('ibanResult')) {
        if (this.processInstanceVariables.ibanResult.value == false) {
          this.ASBToastService.asbErrorToastr('IBAN Validation wrong', 'An Error Occured!', ToasterPosition.bottomLeft, 6000, true)
        }
      }
      this.isLoading = false;
    })
  }

  onSubmit(inlandFormData: any) {
    this.loadingSpinner = true;
    this.submitData = {
      "variables": {
        "zahlungsauftrag": {
          "type": "string",
          "value": JSON.stringify({
            "zahlungsauftrag": {
              "currency": inlandFormData.currency,
              "amount": inlandFormData.amount,
              "ausfuehrungsgDatum": inlandFormData.paymentDateExecution,
              "auftragsArt": "020049",
              "beneficiary": {
                "beneficiaryVorname": inlandFormData.empfaengerVorname,
                "beneficiaryNachname": inlandFormData.empfaengerName,
                "beneficiaryStrasse": inlandFormData.empfaengerStr,
                "beneficiaryStrassenNr": inlandFormData.empfaengerStrNr,
                "beneficiaryPlz": inlandFormData.empfaengerPlz,
                "beneficiaryOrt": inlandFormData.empfaengerOrt,
                "beneficiaryCountry": inlandFormData.empfaengerLand,
                "beneficiaryBankBic": inlandFormData.bic,
                "beneficiaryBankName": inlandFormData.bankName,
                "beneficiaryBankCity": 'New York',
                "beneficiaryBankStreet": inlandFormData.bankStr,
                "beneficiaryBankStreetNr": inlandFormData.bankStrNr,
                "beneficiaryBankCountry": inlandFormData.bankLand,
                "beneficiaryIban": inlandFormData.iban,
                "beneficiaryKontoNummer": inlandFormData.bankkonto,
                "beneficiaryBankSwiftCode": inlandFormData.clearing,
                "beneficiaryRemark": inlandFormData.mitteilungFuerBeguenstigster
              },
              "client": {
                "anrede": this.clientInfo.domiziladresse.salut,
                "vorname": this.clientInfo.name,
                "nachname": this.clientInfo.vorname,
                "strasse": this.clientInfo.domiziladresse.street,
                "strassenNr": this.clientInfo.domiziladresse.strNo,
                "plz": this.clientInfo.domiziladresse.zip,
                "ort": this.clientInfo.domiziladresse.city,
                "Land": this.clientInfo.domiziladresse.country,
                "customerIBAN": 'CH5937564386716534896',
                "AccountName": this.processInstanceVariables.positionName.value,
                "bpId": this.processInstanceVariables.bpId.value,
                "personId": this.processInstanceVariables.personId.value,
                "bpSortAlpha": this.clientInfo.bpKey
              },
              "bookingText": inlandFormData.mitteilungFuerAuftraggeber
            }
          })
        },
        "zahlungsauftragIban": {
          "type": "string",
          "value": inlandFormData.iban
        }
      }
    }
    this.submitTask(this.id, this.submitData);
  }

  submitTask(id: string, data: any) {
    this.taskService.submitTaskForm(id, data).subscribe((responseData: any) => {
    }, error => {
      this.router.navigate(['home'])
      this.ASBToastService.asbErrorToastr(error.message, 'An Error Occured!', ToasterPosition.bottomLeft, 5000, true)
    }, () => {
      setTimeout(() => {
        this.ASBToastService.asbSuccessToastr('Inland Form has been submited', 'Information', ToasterPosition.bottomLeft, 3000, true)
        this.fetchTaskWithProcessInstanceIdAsQP();
      }, 200);
    })
  }

  fetchTaskWithProcessInstanceIdAsQP() {
    this.taskService.fetchTasks('name', 'asc', 0, 1000, null, this.processInstanceId, null).subscribe(returnTask => {
      this.taskDefinitionKey = returnTask.body[0].taskDefinitionKey;
      this.id = returnTask.body[0].id;
    }, error => {
      this.router.navigate(['home'])
      this.ASBToastService.asbErrorToastr(error.message, 'An Error Occured!', ToasterPosition.bottomLeft, 5000, true)
    }, () => {
      /*       this.getProcessInstanceVars(this.processInstanceId) // is needed ?  */
      this.loadingSpinner = false;
      this.router.navigate(['wrongIban'])
      setTimeout(() => {
        this.taskService.routeZahlungsFormularTask(this.taskDefinitionKey, this.processInstanceId, this.id);
      }, 50);
    })
  }

  resetForm() {
    this.inlandForm.reset();
    window.scrollTo(0, 0);
  }

  backToTaskList() {
    this.router.navigate(['home']);
  }

  // FUNCTION TO CREATE TEST DATA
  setTestForm() {
    this.inlandForm.patchValue({
      'paymentDateExecution': '10-02-1993',
      'currency': 'CHF',
      'amount': 1000,
      'iban': 'CH9600761042063237780',
      'bankkonto': 'Test Bank Konto',
      'empfaengerVorname': 'Konstantinos',
      'empfaengerName': 'Tsolakidis',
      'empfaengerStr': 'Suedallee',
      'empfaengerStrNr': '20b',
      'empfaengerPlz': 5034,
      'empfaengerOrt': 'Suhr',
      'empfaengerLand': 'CH',
      'mitteilungFuerBeguenstigster': 'Mitteilung fuer Beguenstigter',
      'mitteilungFuerAuftraggeber': 'Mitteilung fuer Auftraggeber',
      'bic': '1234ABC',
      'clearing': '1002',
      'bankName': 'AKB',
      'bankStr': 'Test strasse',
      'bankStrNr': '10a',
      'bankPLZ': 5000,
      'bankOrt': 'Aarau',
      'bankLand': 'CH'
    })
  }
}
