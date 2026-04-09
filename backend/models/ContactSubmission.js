import mongoose from 'mongoose';

const contactSubmissionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    message: {
      type: String,
      required: true,
      trim: true,
    },
    emailStatus: {
      type: String,
      enum: ['pending', 'sent', 'partial', 'failed'],
      default: 'pending',
    },
    emailError: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('ContactSubmission', contactSubmissionSchema);
