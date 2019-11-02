import mongoose, { Schema } from 'mongoose'
const stores = ['costco', 'sears', 'amazon', 'bestbuy', 'liverpool', 'coppel', 'ddtech', 'bestbuy']

const productSchema = new Schema(
  {
    title: {
      type: String,
      required: true
    },
    link: {
      type: String,
      required: true,
      unique: true
    },
    image: {
      type: String
    },
    price: {
      type: Number,
      required: true
    },
    store: {
      type: String,
      enum: stores,
      required: true
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

productSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      title: this.title,
      link: this.link,
      image: this.image,
      price: this.price,
      store: this.store,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full
      ? {
        ...view
        // add properties for a full view
      }
      : view
  }
}

const model = mongoose.model('Product', productSchema)

export const schema = model.schema
export default model
