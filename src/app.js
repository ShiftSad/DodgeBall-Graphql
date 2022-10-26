import { ApolloServer } from 'apollo-server-express';
import resolvers from './resolver';
import typeDefs from './typeDefs';
import mongoose from "mongoose";
import express from 'express';
import morgan from "morgan";
import dotenv from 'dotenv';
import cors from "cors";
dotenv.config();

const port = process.env.PORT || 4000;

async function startServer() {
    const app = express();
    const server = new ApolloServer({typeDefs, resolvers});

    await server.start();
    app.use(morgan(':method :url :status :res[content-length] - :response-time ms'))
    app.use(cors({
        origin: '135.148.153.168'
    }))
    server.applyMiddleware({app});

    await mongoose.connect(process.env.MONGO_URL, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
    })
    console.log('🍃 Connected to MongoDB')

    app.listen(port, () => console.log(`🚀 Running on http://localhost:${port}/graphql`));
}
startServer()