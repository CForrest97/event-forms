import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import AppModule from '../src/app.module';
import { deleteAll } from '../src/common/database.service';

describe('Submissions (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
    await deleteAll('submissions_test');
    await deleteAll('definitions_test');
  });

  afterEach(async () => {
    await deleteAll('submissions_test');
    await deleteAll('definitions_test');
  });

  it('/submissions (POST)', () => request(app.getHttpServer())
    .post('/definitions')
    .send({
      name: 'name1',
      questions: [{
        key: 'body',
        type: 'textArea',
        validation: { required: true },
      }],
    })
    .expect(201)
    .then(() => request(app.getHttpServer())
      .post('/submissions')
      .send({
        key: 'key',
        name: 'name',
        date: '1582570143',
        serviceKey: 'name1',
        questions: [
          { questionKey: 'body', value: 'body data' },
        ],
        dateCreated: '1582570143',
      })
      .expect(200)));

  it('/submissions (POST)', () => request(app.getHttpServer())
    .post('/definitions')
    .send({
      name: 'name1',
      questions: [{
        key: 'body',
        type: 'textArea',
        validation: { required: true },
      }],
    })
    .expect(201)
    .then(() => request(app.getHttpServer())
      .post('/submissions')
      .send({
        key: 'key',
        name: 'name2',
        date: '1582570143',
        serviceKey: 'name1',
        questions: [
        ],
        dateCreated: '1582570143',
      })
      .expect(400)));
});
