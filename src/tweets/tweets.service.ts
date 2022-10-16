import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';

import { CreateTweetDto } from './dto/create-tweet.dto';
import { UpdateTweetDto } from './dto/update-tweet.dto';
import { Tweet, TweetDocument } from './entities/tweet.entity';

@Injectable()
export class TweetsService {
  constructor(
    @InjectModel(Tweet.name)
    private readonly tweetModel: Model<TweetDocument>,
  ) {}

  async create(createTweetDto: CreateTweetDto) {
    const tweet = new this.tweetModel(createTweetDto);
    await tweet.save();
    return tweet;
  }

  async findAll() {
    const tweets = await this.tweetModel.find().exec();
    return tweets;
  }

  async findOne(id: string) {
    const tweet = await this.tweetModel.findById(id).exec();
    return tweet;
  }

  update(id: string, updateTweetDto: UpdateTweetDto) {
    return `This action updates a #${id} tweet`;
  }

  remove(id: string) {
    return `This action removes a #${id} tweet`;
  }
}
