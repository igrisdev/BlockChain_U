import mongoose from 'mongoose'

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(`mongodb://localhost:27017/test`, {
      useNewUrlParser: true,
    })
    console.log(`MongoDB Connected: {conn.connection.host}`)
  } catch (error) {
    console.error(error.message)
    process.exit(1)
  }
}
