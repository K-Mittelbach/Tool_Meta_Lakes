const { ApolloServer } = require('apollo-server');
const fs = require('fs');
const path = require('path');
const { PrismaClient } = require('@prisma/client');

const resolvers = {
  Query: {
    Lakes: async(parent,args,context) => {
      return context.prisma.lake.findMany()
    },
  },
  Mutation: {
    post: (parent, args, context) => {
       const addNewLake = context.prisma.lake.create({
         data:{
          name: args.name,
          longitude: args.longitude,
          latitude: args.latitude,
          maxDepth: args.maxDepth,
          surfaceLevel: args.surfaceLevel,
          surfaceArea: args.surfaceArea,
          catchmentArea: args.catchmentArea,
          countries: args.countries,
          isEdited: args.isEdited,
          isReviewed: args.isReviewed
         },
      })
      return addNewLake
    },
  },
}

const prisma = new PrismaClient()

const server = new ApolloServer({
  typeDefs: fs.readFileSync(
      path.join(__dirname, 'schema.graphql'),
      'utf-8'
  ),
  resolvers,
  context:{
    prisma,
  }
})

server
  .listen()
  .then(({ url }) =>
    console.log(`Server is running on ${url}`)
  );