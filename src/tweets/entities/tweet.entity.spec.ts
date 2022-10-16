import mongoose, { Mongoose, Model } from 'mongoose';

import { Tweet, TweetSchema } from './tweet.entity';

describe('Tweets', () => {
  describe('Class', () => {
    test('Should create a new tweet', () => {
      const sut = new Tweet({
        content: 'new tweet',
        screenName: 'Peitinho',
      });

      expect(sut).toMatchObject({
        content: 'new tweet',
        screenName: 'Peitinho',
      });
    });
  });

  describe('MongoDb', () => {
    let connection: Mongoose;
    let TweetModel: Model<Tweet>;

    beforeEach(async () => {
      connection = await mongoose.connect(
        'mongodb://root:root@mongo-db:27017/tweets_entity_tests?authSource=admin',
      );
      TweetModel = connection.model('Tweet', TweetSchema);
    });

    afterEach(async () => {
      await mongoose.disconnect();
    });

    test('Should create a new tweet mongo document', async () => {
      const tweet = new TweetModel({
        content: 'new Tweet',
        screenName: 'Peitinho',
      });

      await tweet.save();
    });
  });
});
