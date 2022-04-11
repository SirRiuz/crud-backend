


import { GraphQLSchema } from "graphql";

import { mutation } from "./mutations";
import { query } from './querys'



var graphqlSchema = new GraphQLSchema({
  query,
  mutation
})


export { graphqlSchema }

