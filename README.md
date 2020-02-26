To run locally uncomment 2 lines in database.service to connect to your firestore db
To create a definition do a `post` at go to `/definitions` and send a definition in the form 
```
{ 
  name: 'confetti',
  questions: [{
    key: 'body',
    type: 'textArea',
    validation: { required: false },
  }]
}
```
A submission can be created in a similar way but posting to `/submissions` with a submission of form
```
{
  key: 'key',
  name: 'name',
  date: DATE,
  serviceKey: 'confetti',
  questions: [{ questionKey: 'body', value: 'body data' }, ...],
  dateCreated: DATE,
}
```

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

  Nest is [MIT licensed](LICENSE).
