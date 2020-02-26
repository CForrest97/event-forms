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

  it('/definitions (GET)', async () => {
    const response = await request(app.getHttpServer())
      .get('/definitions');

    expect(response.body).toEqual([]);
  });

  it('/definitions (POST + GET)', async () => {
    const postResponse = await request(app.getHttpServer())
      .post('/definitions')
      .send({ name: 'name', questions: [] });
    expect(postResponse.status).toEqual(201);
    const getResponse = await request(app.getHttpServer())
      .get('/definitions');

    expect(getResponse.body).toEqual([{ name: 'name', questions: [] }]);
  });

  it('/definitions (PUT)', async () => {
    const postResponse = await request(app.getHttpServer())
      .post('/definitions')
      .send({ name: 'name1', questions: [] });
    expect(postResponse.status).toEqual(201);
    const putResponse = await request(app.getHttpServer())
      .put('/definitions/name1')
      .send({ name: 'name2' });
    expect(putResponse.status).toEqual(200);
    const getResponse = await request(app.getHttpServer())
      .get('/definitions/name2');

    expect(getResponse.body).toEqual({ name: 'name2', questions: [] });
  });

  it('/definitions (DELETE)', async () => {
    const postResponse = await request(app.getHttpServer())
      .post('/definitions')
      .send({ name: 'name', questions: [] });
    expect(postResponse.status).toEqual(201);
    const deleteResponse = await request(app.getHttpServer())
      .delete('/definitions/name');
    expect(deleteResponse.status).toEqual(200);
    const getResponse = await request(app.getHttpServer())
      .get('/definitions/name');

    expect(getResponse.status).toEqual(404);
  });
});
