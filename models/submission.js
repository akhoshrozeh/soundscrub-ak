import { Schema, model, models } from 'mongoose';

const SubmissionSchema = new Schema({
  creator: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  title: {
    type: String,
    required: [true, "Submission requires a title"],
  },
  artist: {
    type: String,
    required: [true, "Submission requires an artist"],
  },
  link: {
    type: String,
    required: [true, "Submission requires a link"],
  },
  isAccepted: {
    type: Boolean,
    default: false,
  },
  genre: {
    type: String,
    default: "",
    },
  coverImage: {
    type: String,
    default: null,
  },
  releaseDate: {
    type: Date,
    default: Date.now,
  },
  description: {
    type: String,
    default: "",
  },
  tags: {
    type: [String],
  },
  upvotes: [{
    type: Schema.Types.ObjectId,
    ref: 'User',
  }],
}, {
  timestamps: true,
});

const Submission = models.Submission || model('Submission', SubmissionSchema);

export default Submission;
