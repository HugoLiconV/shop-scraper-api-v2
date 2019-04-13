import mongoose, { Schema } from 'mongoose'

const logSchema = new Schema(
  {
    product: {
      type: Schema.ObjectId,
      ref: 'Product',
      required: true
    },
    price: {
      type: Number
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

logSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      product: this.product.view(full),
      price: this.price,
      createdAt: this.createdAt
    }

    return full
      ? {
        ...view
        // add properties for a full view
      }
      : view
  }
}

const model = mongoose.model('Log', logSchema)

export const schema = model.schema
export default model
