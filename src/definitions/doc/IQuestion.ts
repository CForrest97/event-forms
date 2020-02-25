interface IQuestion {
  key: string;
  type: string;
  title?: string;
  placeholder?: string;
  options?: IOption[];
  validation?: IValidation;
}
