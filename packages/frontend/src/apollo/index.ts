import { ApolloClient, from, HttpLink, InMemoryCache } from "@apollo/client";
import { GRAPHQL_URL } from "~/shared/config";

const httpLink = new HttpLink({
  uri: GRAPHQL_URL,
});

export const createCache = () =>
  new InMemoryCache({
    typePolicies: {
      // A film's copy is locale-dependent, so identifying it by `id` alone is
      // wrong: every locale returns the same id and would overwrite the shared
      // normalized entity, leaving stale text when switching languages. Storing
      // films inline (keyFields: false) keeps each `films(locale:)` result —
      // which is already cached per its locale argument — independent.
      Film: { keyFields: false },
    },
  });

const client = new ApolloClient({
  link: from([httpLink]),
  cache: createCache(),
});

export default client;
