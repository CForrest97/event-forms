import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import AppModule from '../src/app.module';
import { deleteAll } from '../src/common/database.service';

describe('Definitions (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
    await deleteAll('definitions_test');
  });

  afterEach(async () => {
    await deleteAll('definitions_test');
  });

  it('/definitions (GET)', () => request(app.getHttpServer())
    .get('/definitions')
    .expect(200)
    .expect([]));

  it('/definitions (GET)', () => request(app.getHttpServer())
    .post('/definitions')
    .send({ name: 'name', questions: [] })
    .expect(201)
    .then(() => request(app.getHttpServer())
      .get('/definitions/name')
      .expect(200)
      .expect({ questions: [], name: 'name' })));

  it('/definitions (POST)', () => request(app.getHttpServer())
    .post('/definitions')
    .send({ name: 'name', questions: [] })
    .expect(201)
    .then(() => request(app.getHttpServer())
      .get('/definitions')
      .expect(200)
      .expect([{ questions: [], name: 'name' }])));

  it('/definitions (PUT)', () => request(app.getHttpServer())
    .post('/definitions')
    .send({ name: 'name', questions: [] })
    .expect(201)
    .then(() => request(app.getHttpServer())
      .put('/definitions/name')
      .send({ name: 'name2' })
      .expect(200)
      .then(() => request(app.getHttpServer())
        .get('/definitions')
        .expect(200)
        .expect([{ questions: [], name: 'name2' }]))));

  it('/definitions (DELETE)', () => request(app.getHttpServer())
    .post('/definitions')
    .send({ name: 'name', questions: [] })
    .expect(201)
    .then(() => request(app.getHttpServer())
      .delete('/definitions/name')
      .expect(200)
      .then(() => request(app.getHttpServer())
        .get('/definitions')
        .expect(200)
        .expect([]))));
});
