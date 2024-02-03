import { Schema, model, models } from 'mongoose';

const ReleaseSchema = new Schema({
  creator: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  title: {
    type: String,
    required: [true, "Release requires a title"],
  },
  artist: {
    type: String,
    required: [true, "Release requires an artist"],
  },
  link: {
    type: String,
    required: [true, "Release requires a link"],
  },
  isAccepted: {
    type: Boolean,
    default: false,
  },
  upvotes: [{
    type: Schema.Types.ObjectId,
    ref: 'User',
  }],
  upvotesLength: {
    type: Number,
    default: 0
  },
  coverImage: {
    type: String,
    default: null,
  },
  audioUrl: {
    type: String,
    default: null
  },
  description: {
    type: String,
    default: "",
  },
  releaseType: {
    type: String,
    default: "",
  },
  tags: {
    type: [String],
  },
  releaseDate: {
    type: Date,
    default: Date.now,
  },
  postDate: {
    type: Date,
    default: null,
  },
}, {
  strict: false,
  timestamps: true,
});

const Release = models.Release || model('Release', ReleaseSchema);

export default Release;
