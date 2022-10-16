import { MongooseModule } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';

import { Tweet, TweetSchema } from './entities/tweet.entity';
import { TweetsService } from './tweets.service';

describe('TweetsService', () => {
  let service: TweetsService;
  let module: TestingModule;

  beforeEach(async () => {
    const uri =
      'mongodb://root:root@mongo-db:27017/tweets_service_tests?authSource=admin';
    module = await Test.createTestingModule({
      imports: [
        MongooseModule.forRoot(uri),
        MongooseModule.forFeature([{ name: Tweet.name, schema: TweetSchema }]),
      ],
      providers: [TweetsService],
    }).compile();

    service = module.get<TweetsService>(TweetsService);
  });

  afterEach(async () => {
    await module.close();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a new tweet', async () => {
    const tweet = await service.create({
      content: 'tweet_by_service',
      screenName: 'Peitinho Service',
    });
    expect(tweet).toMatchObject({
      content: 'tweet_by_service',
      screenName: 'Peitinho Service',
    });

    const tweetCreated = await service['tweetModel'].findById(tweet._id);
    expect(tweetCreated._id).toBeDefined();
    expect(tweetCreated).toMatchObject({
      content: 'tweet_by_service',
      screenName: 'Peitinho Service',
    });
  });
});
