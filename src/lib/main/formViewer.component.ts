import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output, OnDestroy} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, FormArray} from '@angular/forms';

// import { Resizer } from './directives.resize';
import {FormMain, Questions, Answers, formInit} from './class/forms';


@Component({
  selector: 'ng-form-manager',
  templateUrl: './formViewer.component.html',
  styleUrls: ['./style.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class formViewer implements OnInit, OnDestroy {

  oldData: Array<any> = ['mc'];
  _FormGroup: FormGroup;
  _FormGroup2: FormArray;
  selectedArea: number;
  _formData: any;
  cameData: any;
  k: any;

  @Input() editable: false;
  @Input() stylesConfig: any = {
    formname: 'nfc-fv-formName',
    formdecs: 'nfc-fv-formDecs',
    questionText: 'h3',
    questionSlider: 'nfc-slider',
    answersMain: 'nfc-edit-answers',
    answersG: '',
    answerGroup: 'form-group',
    answerNumber: '',
    verticalInputs: 'form-inline',
    borderless: 'borderless-input',
    edit_answer: 'nfc-edit-answer',
    field: 'field',
    input: 'form-control',
    fieldHasAdd: 'field has-addons',
    answersInput: 'form-control nfc-edit-inputs',
    edit_formName: 'formname nfc-edit-inputs',
    edit_formDecs: 'formdecs nfc-edit-inputs',
    question: 'nfc-question',
    answer: 'nfc-answer',
    questionMain: 'nfc-question-main',
    radio: 'nfc-radio'
  };

  @Input() set formData(data: any) {
    if (data != null) {
      let questionArray = data['formData'].questions;
      let indexForms = this._FormGroup2.length;
      for (let k = 0; indexForms > k; k++) {
        this._FormGroup2.removeAt(0);
      }

      for (let i = 0; i < questionArray.length; i++) {
        let qType = questionArray[i].questionType;


        let answersArray = questionArray[i].answers;
        switch (qType) {
          case ('mc'): {
            this._FormGroup2.push(this.fb.group({
              index: questionArray[i].index,
              answers: this.fb.array([
                this.fb.group({index: questionArray[i].answers[0].index})
              ])
            }));
            break;
          }
          case ('cb'): {
            this._FormGroup2.push(this.fb.group({
              index: questionArray[i].index,
              answers: this.fb.array([
                this.fb.group({index: questionArray[i].answers[0].index, select: ''})
              ])
            }));

            for (let k = 1; k < answersArray.length; k++) {
              this.answers(i).push(this.fb.group(
                {index: answersArray[k].index, select: ''}
              ));
            }
            break;
          }
          case ('wa'): {
            this._FormGroup2.push(this.fb.group({
              index: questionArray[i].index,
              answers: this.fb.array([
                this.fb.group({index: questionArray[i].answers[0].index, value: ''})
              ])
            }));
            break;
          }
          case ('ls'): {
            this._FormGroup2.push(this.fb.group({
              index: questionArray[i].index,
              answers: this.fb.array([
                this.fb.group({index: questionArray[i].answers[0].index, value: ''})
              ])
            }));
            break;
          }
          case ('na'): {
            let ansaRR = this.fb.array([]);
            for (let t of answersArray) {
              ansaRR.push(this.fb.group({index: t.index, value: ''}));
            }

            this._FormGroup2.push(this.fb.group({
              index: questionArray[i].index,
              answers: ansaRR
            }));

            console.log(this._FormGroup2);
            break;
          }
          case ('ta'): {
            this._FormGroup2.push(this.fb.group({
              index: questionArray[i].index,
              answers: this.fb.array([
                this.fb.group({index: questionArray[i].answers[0].index, select: ''})
              ])
            }));
            break;
          }
        }


      }

      console.log(this._FormGroup2);
      this._formData = data;
      this.createForm2(this._formData);
      this._FormGroup.valueChanges
        .subscribe(values => {
          console.log(values);
          this.formUpdatedEditable.emit(values);
        });

    }
  }

  @Input() set formInputData(data: any) {
    this.cameData = data;
    try {
      console.log('bu ise fc');
      console.log(this.cameData);
      this._FormGroup2.setValue(this.cameData);

    } catch (e) {
      console.log(e);
    }

  }

  @Input() justView = false;

  @Output() formUpdated = new EventEmitter();
  @Output() formUpdatedEditable = new EventEmitter();


  constructor(
    private fb: FormBuilder) {
    this.createForm();

    this._FormGroup2.valueChanges
      .subscribe(values => {
        console.log(this._FormGroup2);
        this.formUpdated.emit(values);
      });
  }

  ngOnInit() {

  }

  ngOnDestroy() {

  }

  createForm() {
    this._FormGroup2 = this.fb.array([this.fb.group({
      index: 0,
      answers: this.fb.array([
        this.fb.group({index: 0})
      ])
    })]);
  }

  get fg1Questions(): FormArray {
    return this._FormGroup.get('questions') as FormArray;
  }

  fg1questionSingle(index): FormGroup {
    return this.fg1Questions.at(index) as FormGroup;
  }

  fg1answers(index): FormArray {
    return this.fg1questionSingle(index).get('answers') as FormArray;
  }

  fg1addAnswer(index: number, data?: any, type?: string) {
    if (type == 'ls') {
      this.fg1answers(index).push(this.fb.group({max_val: data.max_val, min_val: data.min_val, step: data.step, index: data.index}));
    } else if (type == 'da') {
      this.fg1answers(index).push(this.fb.group({date: data.date, index: data.index}));
    } else if (type == 'ta') {
      this.fg1answers(index).push(this.fb.group({req: data.req, value: data.value, index: data.index}));
    } else {
      this.fg1answers(index).push(this.fb.group({value: data.value, index: data.index}));
    }

  }


  fg1_normaladdAnswer(index: number, type?: string) {
    let d = new Date();
    if (type == 'ls') {
      this.fg1answers(index).push(this.fb.group({max_val: 100, min_val: 0, step: 5, index: d.getTime()}));
    } else if (type == 'da') {
      this.fg1answers(index).push(this.fb.group({date: '', index: d.getTime()}));
    } else if (type == 'ta') {
      this.fg1answers(index).push(this.fb.group({req: false, value: '', index: d.getTime()}));
    } else {
      this.fg1answers(index).push(this.fb.group({value: '', index: d.getTime()}));
    }

  }

  fg1questionAdd(_qArray: any) {
    this.fg1Questions.push(this.fb.group({
      index: _qArray.index,
      question: _qArray.question,
      questionType: _qArray.questionType,
      answerAlign: _qArray.answerAlign,
      required: _qArray.required,
      answers: this.fb.array([])
    }));

  }

  fg1addItem() {
    let d = new Date();
    this.fg1Questions.push(this.fb.group({
      index: d.getTime(),
      question: 'New question...',
      questionType: 'mc',
      answerAlign: 'v',
      required: false,
      answers: this.fb.array([
        this.fb.group({value: '', index: d.getTime() + 1})
      ])
    }));
    this.oldData.push('mc');
  }

  deleteAnswer(q: number, a: number) {
    this.fg1answers(q).removeAt(a);
  }

  deleteQuestion(i) {
    this.fg1Questions.removeAt(i);
  }

  duplicateItem(i) {
    let d = new Date();
    let item = this.fg1Questions.controls[i].value;
    console.log(item);
    this.questions.push(this.fb.group({
      index: d.getTime(),
      question: item.question,
      questionType: item.questionType,
      answerAlign: item.answerAlign,
      required: item.required,
      answers: this.fb.array([])
    }));

    for (let t of item.answers) {
      let k = new Date();
      let _i = this.questions.controls.length - 1;
      if (item.questionType == 'ls') {
        this.fg1answers(_i).push(this.fb.group({max_val: t.max_val, min_val: t.min_val, step: t.step, index: k.getTime()}));
      } else if (item.questionType == 'da') {
        this.fg1answers(_i).push(this.fb.group({date: '', index: k.getTime()}));
      } else if (item.questionType == 'ta') {
        this.fg1answers(_i).push(this.fb.group({req: t.req, value: t.value, index: k.getTime()}));
      } else {
        this.fg1answers(_i).push(this.fb.group({value: t.value, index: k.getTime()}));
      }

    }

    this.oldData.push(item.questionType);

  }


  createForm2(data: any) {

    console.log('c2');
    console.log(data);
    if (data != null) {
      let questionArray = data['formData'].questions;
      this._FormGroup = this.fb.group({
        formName: data['formData'].formName,
        decs: data['formData'].decs,
        questions: this.fb.array([])
      });

      for (let i = 0; i < questionArray.length; i++) {
        let qType = questionArray[i].questionType;


        let answersArray = questionArray[i].answers;
        switch (qType) {
          case ('mc'): {
            this.fg1questionAdd(questionArray[i]);
            for (let k = 0; k < answersArray.length; k++) {
              this.fg1addAnswer(i, answersArray[k], 'mc');
            }
            break;
          }
          case ('cb'): {
            this.fg1questionAdd(questionArray[i]);
            for (let k = 0; k < answersArray.length; k++) {
              this.fg1addAnswer(i, answersArray[k], 'cb');
            }
            break;
          }
          case ('wa'): {
            this.fg1questionAdd(questionArray[i]);
            this.fg1addAnswer(i, answersArray[0], 'wa');
            break;
          }
          case ('ls'): {
            this.fg1questionAdd(questionArray[i]);
            this.fg1addAnswer(i, answersArray[0], 'ls');
            break;
          }
          case ('na'): {
            this.fg1questionAdd(questionArray[i]);
            for (let k = 0; k < answersArray.length; k++) {
              this.fg1addAnswer(i, answersArray[k], 'na');
            }
            break;
          }
          case ('ta'): {
            this.fg1questionAdd(questionArray[i]);
            this.fg1addAnswer(i, answersArray[0], 'ta');
            break;
          }
        }


      }


      console.log(this._FormGroup);


    }
  }


  questionType(event) {
    let index = event.target.attributes['wh'].value;
    let dataOld = this.oldData[index];


    if (event.target.value == 'mc' || event.target.value == 'cb' || event.target.value == 'na') {
      if (dataOld == 'ls' || dataOld == 'da' || dataOld == 'wa') {
        let indexAnswer = this.fg1answers(index).controls.length;
        for (let k = 0; indexAnswer > k; k++) {
          this.fg1answers(index).removeAt(0);
        }
        this.fg1_normaladdAnswer(index);
      }

    } else {
      let indexAnswer = this.fg1answers(index).controls.length;
      for (let k = 0; indexAnswer > k; k++) {
        this.fg1answers(index).removeAt(0);
      }
      if (event.target.value == 'ls') {
        this.fg1_normaladdAnswer(index, 'ls');
      } else if (event.target.value == 'da') {
        this.fg1_normaladdAnswer(index, 'da');
      } else if (event.target.value == 'ta') {
        this.fg1_normaladdAnswer(index, 'ta');
      } else {
        this.fg1_normaladdAnswer(index);
      }


    }

    this.oldData[index] = event.target.value;

  }

  get questions(): FormArray {
    console.log(this._FormGroup2);
    return this._FormGroup2;
  }

  questionSingle(index): FormGroup {
    return this.questions.at(index) as FormGroup;
  }

  answers(index): FormArray {
    return this.questionSingle(index).get('answers') as FormArray;
  }


}
