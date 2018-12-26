import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'app';
  tabID = 1;

  classNames = {
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
  editableForm = false;
  data = {
    'formData': {
      'decs': 'Little bit info here. Maybe instruction of form.',
      'formName': 'Form Headline',
      'questions': [{
        'answerAlign': 'v',
        'answers': [{'index': 0, 'value': 'Answer1'}, {'index': 1545565211386, 'value': 'Answer2'}, {
          'index': 1545565211857,
          'value': 'Answer3'
        }],
        'index': 0,
        'question': 'Multiple choise question. Select below.',
        'questionType': 'mc',
        'required': false
      }, {
        'answerAlign': 'v',
        'answers': [{'index': 1545565221864, 'value': 'Bees'}, {'index': 1545565240948, 'value': 'Ants'}, {
          'index': 1545565244333,
          'value': 'Bears'
        }],
        'index': 1545565221863,
        'question': 'Checkbox question. Select below.',
        'questionType': 'cb',
        'required': false
      }, {
        'answerAlign': 'v',
        'answers': [{'index': 1545565259589, 'max_val': 100, 'min_val': 0, 'step': 5}],
        'index': 1545565255274,
        'question': 'Linear scale question.',
        'questionType': 'ls',
        'required': false
      }, {
        'answerAlign': 'v',
        'answers': [{'index': 1545565295725, 'value': 'Please describe yourself? What are your instrest?'}],
        'index': 1545565291757,
        'question': 'Who are you?',
        'questionType': 'wa',
        'required': false
      }, {
        'answerAlign': 'v',
        'answers': [{'index': 1545565328850, 'value': 'How old are you?'}, {
          'index': 1545565360882,
          'value': 'How many times checking you email per day?'
        }],
        'index': 1545565328849,
        'question': 'Please anser these questions.',
        'questionType': 'na',
        'required': false
      }]
    }, 'metas': {'byUserDispName': 'Murat Çimen', 'byUserId': 'Y6AlaWsuc0ShfrIDFCUPtEg6rvc2', 'updated': 1545565443054}
  };

  emptyData = {
    'formData': {
      'formName': 'Form Name',
      'decs': '',
      'questions': [
        {
          'index': 0,
          'question': '',
          'questionType': 'mc',
          'answerAlign': 'v',
          'required': false,
          'answers': [
            {
              'value': 'Answer 1',
              'index': 0
            }
          ]
        }]
    },
    'metas': {}
  };

  inputDataChangeDemo ={
    "formData": {
    "formName": "Demo Name",
    "decs": "None.",
    "questions": [
      {
        "index": 0,
        "question": "Example",
        "questionType": "wa",
        "answerAlign": "v",
        "required": false,
        "answers": [
          {
            "value": "",
            "index": 1545783465610
          }
        ]
      }
    ]},
    "metas" : {}
  };
  demoArryVar;
  demoArry = [[{ index: 0, answers: [{index: 1545783465610, value: "Example"}] }],[{ index: 0, answers: [{index: 1545783465610, value: "Another value."}] }],[{index: 0, answers: [{index: 1545783465610, value: "Different value."}] }]];

  vals = this.data;
  tempData;

  basicFormInputDatas: any;
  basicFormDatas: any;


  emptyDataLoader () {
    this.vals = this.emptyData;
  }

  tabToogler(_id: number) {
    this.tabID = _id;
  }

  toogleEditable() {
    this.editableForm ? this.editableForm = false : this.editableForm = true;
    this.vals = this.tempData;
  }

  formUpdatedEditableHandler(e) {
    let _data = {
      'formData': {},
      'metas': {}
    };

    _data.formData = e;
    _data.metas = this.data.metas;
    this.tempData = _data;
    this.basicFormDatas = e;
  }


  formUpdatedBasic(e) {
    this.basicFormInputDatas = e;
  }

  formUpdatedDemo(e) {
    console.log(e);
  }

  formInputChangeDemo(e) {

    this.demoArryVar = this.demoArry[e];


  }
}
