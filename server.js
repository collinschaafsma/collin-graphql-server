require('dotenv').config()

import { ApolloServer, gql } from 'apollo-server';
import { StravaAPI } from './datasources/strava';

const typeDefs = gql`
  type Activity {
    id: Int!
    name: String!
    type: String!
    moving_time: String!
    start_date: String!
  }

  type Query {
    activity(id: Int!): Activity
    activities: [Activity]
  }
`;

const resolvers = {
  Query: {
    activity: (root, { id }, { dataSources }) =>
      dataSources.stravaAPI.getActivity(id),
    activities: (root, args, { dataSources }) => dataSources.stravaAPI.getActivities(),
  },
  Activity: {
    name: ({ name }) => name,
    type: ({ type }) => type,
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => ({
    stravaAPI: new StravaAPI(),
  }),
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
