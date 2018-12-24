export class FormMain {
    formName = '';
    decs = '';
    questions: Questions[];
}
export class Questions {
    question = '';
    index = 0;
    questionType = '';
    answers: Answers[];
}
export class Answers {
    value = '';
    index = 0;
}
export const formInit =
    {
        formName: '',
        decs: '',
        questions: [{
            index: 0,
            question : '',
            questionType: '',
            answers: [
                { value: '', index: 0 }
            ]
        }]
    };
