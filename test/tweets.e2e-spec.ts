import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import request from 'supertest';
import { AppModule } from '../src/app.module';

describe('TweetController e2e', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = module.createNestApplication();
    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  test('POST /tweets', async () => {
    const { body } = await request(app.getHttpServer())
      .post('/tweets')
      .send({ content: 'First tweet', screenName: 'Pedro Freitas' })
      .expect(201);

    expect(body._id).toBeDefined();
    expect(body).toMatchObject({
      content: 'First tweet',
      screenName: 'Pedro Freitas',
    });
  });
});
