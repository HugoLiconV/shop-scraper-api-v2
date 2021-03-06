import mongoose, { Schema } from 'mongoose'

const trackedProductSchema = new Schema(
  {
    user: {
      type: Schema.ObjectId,
      ref: 'User',
      required: true
    },
    product: {
      type: Schema.ObjectId,
      ref: 'Product',
      required: true
    },
    initialPrice: {
      type: Number,
      required: true
    },
    wasPurchased: {
      type: Boolean,
      required: true,
      default: false
    },
    purchasedAt: {
      type: Number
    },
    desiredPrice: {
      type: Number,
      required: true
    },
    notify: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: (obj, ret) => {
        delete ret._id
      }
    }
  }
)

trackedProductSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      product: this.product.view(full),
      desiredPrice: this.desiredPrice,
      notify: this.notify,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      initialPrice: this.initialPrice,
      wasPurchased: this.wasPurchased,
      purchasedAt: this.purchasedAt
    }

    return full
      ? {
        ...view,
        user: this.user.view(full)
        // add properties for a full view
      }
      : view
  }
}

const model = mongoose.model('TrackedProduct', trackedProductSchema)

export const schema = model.schema
export default model
