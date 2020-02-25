interface ISubmission {
  key: string;
  name: string;
  date: Date;
  serviceKey: string;
  questions: IQuestionSubmission[];
  dateCreated: Date;
}
