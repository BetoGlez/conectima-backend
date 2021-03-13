import "reflect-metadata";
import { ApolloServer } from "apollo-server";
import { buildSchema } from "type-graphql";
import dotenv from "dotenv";

// Preloads config before other imports to ensure env variables are available asap
dotenv.config();

import { ApiConstants } from "./api.constants";
import { ProjectQueryResolvers } from "./graphql/resolvers/project/queries/ProjectQueryResolvers";

const main = async () => {
    try {
        const schema = await buildSchema({
            resolvers: [ ProjectQueryResolvers ]
        });

        const apolloServer = new ApolloServer({ schema });

        const server = await apolloServer.listen({ port: process.env.API_PORT || ApiConstants.DEFAULT_API_PORT });
        console.log(`Server running at ${server.url}`);
    } catch(err) {
        console.error("Error initializing server: ", err);
    }
};

main();