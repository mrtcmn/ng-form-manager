import {Component, EventEmitter, Input, OnInit, Output, OnDestroy} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, FormArray} from '@angular/forms';

import {Resizer} from './directives.resize';
import {FormMain, Questions, Answers, formInit} from './class/forms';


@Component({
  selector: 'form-creator-form',
  templateUrl: './formCreatorForm.component.html',
  styleUrls: ['./formCreatorForm.component.css']
})
export class formCreatorComponentForm implements OnInit, OnDestroy {
  simpleDrop: any = null;
  oldData: Array<any> = ['mc'];
  _FormGroup: FormGroup;
  selectedArea: number;

  k: any;
  controls: any;

  get questions(): FormArray {
    return this._FormGroup.get('questions') as FormArray;
  }

  questionSingle(index): FormGroup {
    return this.questions.at(index) as FormGroup;
  }

  answers(index): FormArray {
    return this.questionSingle(index).get('answers') as FormArray;
  }


  @Output() formUpdated = new EventEmitter();

  @Input() stylesConfig: any = {
    label: 'label',
    field: 'field',
    input: 'nfc-input question',
    fieldHasAdd: 'field has-addons',
    answersInput: 'nfc-input answer',
    formNameInput: 'formname',
    formDecsInput: 'formdecs',
    question: 'nfc-question',
    answer: 'nfc-answer',
    answersMain: 'nfc-answer-main',
    questionMain: 'nfc-question-main'
  };


  constructor(
    private fb: FormBuilder) {
    this.createForm();

    this._FormGroup.valueChanges
      .subscribe(values => {
        this.formUpdated.emit(values);
      });


  }


  getConsole(e) {
    console.log(e);
  }

  setClickedArea(index) {
    this.selectedArea = index;
  }


  ngOnInit() {

  }

  ngOnDestroy() {

  }


  createForm() {
    this._FormGroup = this.fb.group({
      formName: '',
      decs: '',
      questions: this.fb.array([this.fb.group({
        index: 0,
        question: '',
        questionType: 'mc',
        answerAlign: 'v',
        required: false,
        answers: this.fb.array([
          this.fb.group({value: '', index: 0})
        ])
      })])
    });
  }


  dragOn(event: any, element: any) {
    // this.question.push(this.fb.group(new Questions()));

  }


  addItem() {
    let d = new Date();
    this.questions.push(this.fb.group({
      index: d.getTime(),
      question: '',
      questionType: 'mc',
      answerAlign: 'v',
      required: false,
      answers: this.fb.array([
        this.fb.group({value: '', index: d.getTime() + 1})
      ])
    }));
    this.oldData.push('mc');
  }

  addAnswer(index: number, type?: string) {
    let d = new Date();
    if (type == 'ls') {
      this.answers(index).push(this.fb.group({max_val: 100, min_val: 0, step: 5, index: d.getTime()}));
    } else if (type == 'da') {
      this.answers(index).push(this.fb.group({date: '', index: d.getTime()}));
    } else if (type == 'ta') {
      this.answers(index).push(this.fb.group({req: false, value: '', index: d.getTime()}));
    } else {
      this.answers(index).push(this.fb.group({value: '', index: d.getTime()}));
    }

  }


  deleteAnswer(q: number, a: number) {
    this.answers(q).removeAt(a);
  }

  deleteQuestion(i) {
    this.questions.removeAt(i);
  }


  duplicateItem(i) {
    let d = new Date();
    let item = this.questions.controls[i].value;
    console.log(item);
    this.questions.push(this.fb.group({
      index: d.getTime(),
      question: item.question,
      questionType: item.questionType,
      answerAlign: item.answerAlign,
      required: item.required,
      answers: this.fb.array([])
    }));
    let c = 1;
    for (let t of item.answers) {
      let k = new Date();
      let a = k.getTime() + c;
      c++;
      let _i = this.questions.controls.length - 1;
      if (item.questionType == 'ls') {
        this.answers(_i).push(this.fb.group({max_val: t.max_val, min_val: t.min_val, step: t.step, index: c}));
      } else if (item.questionType == 'da') {
        this.answers(_i).push(this.fb.group({date: '', index: c}));
      } else if (item.questionType == 'ta') {
        this.answers(_i).push(this.fb.group({req: t.req, value: t.value, index: c}));
      } else {
        this.answers(_i).push(this.fb.group({value: t.value, index: c}));
      }

    }

    this.oldData.push(item.questionType);

  }

  questionType(event) {
    let index = event.target.attributes['wh'].value;
    let dataOld = this.oldData[index];


    if (event.target.value == 'mc' || event.target.value == 'cb' || event.target.value == 'na') {
      if (dataOld == 'ls' || dataOld == 'da' || dataOld == 'wa') {
        let indexAnswer = this.answers(index).controls.length;
        for (let k = 0; indexAnswer > k; k++) {
          this.answers(index).removeAt(0);
        }
        this.addAnswer(index);
      }

    } else {
      let indexAnswer = this.answers(index).controls.length;
      for (let k = 0; indexAnswer > k; k++) {
        this.answers(index).removeAt(0);
      }
      if (event.target.value == 'ls') {
        this.addAnswer(index, 'ls');
      } else if (event.target.value == 'da') {
        this.addAnswer(index, 'da');
      } else if (event.target.value == 'ta') {
        this.addAnswer(index, 'ta');
      } else {
        this.addAnswer(index);
      }


    }

    this.oldData[index] = event.target.value;

  }

}
