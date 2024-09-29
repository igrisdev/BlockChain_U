import mongoose from 'mongoose'

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(
      `mongodb+srv://jmalvarez:igrisDev1@cluster0.kvqmphp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
    )

    console.log(`MongoDB Connected`)
  } catch (error) {
    console.error(error.message)
    process.exit(1)
  }
}
