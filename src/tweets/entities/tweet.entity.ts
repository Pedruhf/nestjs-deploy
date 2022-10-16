import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TweetDocument = Tweet & Document;

type TweetProps = {
  content: string;
  screenName: string;
};

@Schema()
export class Tweet {
  @Prop({ required: true })
  public content: string;

  @Prop({ required: true })
  public screenName: string;

  constructor(props: TweetProps) {
    Object.assign(this, props);
  }
}

export const TweetSchema = SchemaFactory.createForClass(Tweet);
