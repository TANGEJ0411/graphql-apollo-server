import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import moment from 'moment';
moment().format();

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = `#graphql
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  # This "Book" type defines the queryable fields for every book in our data source.
  type Book {
    CID: String
    tickets: [tickets]
    author: String
  }
  type tickets {
    TID: String
    picture: String
  }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "books" query returns an array of zero or more Books (defined above).
  
  input tixInput{
    productID: String!
    CID: Int!
  }

  type Query {
    books: [Book]
    user(id: ID!):[Book]
    category:[String]
    tixDetail(TID: Int!, CID: String!):[tickets]
  }
`;
// Resolvers define how to fetch the types defined in your schema.
// This resolver retrieves books from the "books" array above.
const resolvers = {
  Query: {
    books: () => books,
    user: (parent, args, contextValue, info) => books.filter((book) => book.CID === args.id),
    category: () => category,
    tixDetail: (parent, args, contextValue, info) => {
      return books.filter((book) => book.CID === args.CID)[0].tickets.filter((ticket) => {
        return ticket.TID === args.TID
      })
    },
  },
};

const books = [
  {
    CID: '1',
    tickets: [{ TID: 1, picture: 'a' }, { TID: 2, picture: 'b' }, { TID: 3, picture: 'c' }, { TID: 4, picture: 'd' }, { TID: 5, picture: 'e' }, { TID: 6, picture: 'f' }],
    author: 'Kate Chopin',
  },
  {
    CID: '2',
    tickets: [{ TID: 7, picture: 'g' }, { TID: 8, picture: 'h' }, { TID: 9, picture: 'i' }],
    author: 'Paul Auster',
  },
];

const category = ['a', 'b', 'c', 'd', 'e', 'f', 'g']

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// Passing an ApolloServer instance to the `startStandaloneServer` function:
//  1. creates an Express app
//  2. installs your ApolloServer instance as middleware
//  3. prepares your app to handle incoming requests
const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log(`🚀  Server ready at: ${url}`);

// const lastLoginTime = moment(1690334929178)
// const nowLoginTime = moment(Date.now())
// const timeCheck = nowLoginTime.diff(lastLoginTime, 'days') < 3 && lastLoginTime <= nowLoginTime
// console.log(lastLoginTime, nowLoginTime, timeCheck, 'timeCheck')