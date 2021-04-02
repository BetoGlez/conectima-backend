import "reflect-metadata";
import { ApolloServer } from "apollo-server";
import { buildSchema } from "type-graphql";
import Container from "typedi";
import mongoose from "mongoose";
import dotenv from "dotenv";

// Preloads config before other imports to ensure env variables are available asap
dotenv.config();

import { ApiConstants } from "./api.constants";
import { ProjectResolvers } from "./graphql/resolvers/ProjectResolvers";
import { SprintResolvers } from "./graphql/resolvers/SprintResolvers";
import { UserResolvers } from "./graphql/resolvers/UserResolvers";
import { formatError } from "./utils/error-format";

const main = async () => {
    try {
        await mongoose.connect(ApiConstants.MONGO_DB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });

        Container.reset();
        const schema = await buildSchema({
            resolvers: [ ProjectResolvers, SprintResolvers, UserResolvers ],
            container: Container
        });

        const apolloServer = new ApolloServer({ schema, formatError });

        const server = await apolloServer.listen({ port: ApiConstants.API_PORT });
        console.log(`Server running at ${server.url}`);
    } catch(err) {
        console.error("Error initializing server: ", err);
    }
};

main();