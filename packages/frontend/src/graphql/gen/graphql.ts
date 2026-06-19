/** Internal type. DO NOT USE DIRECTLY. */
type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
/** Internal type. DO NOT USE DIRECTLY. */
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = T | null;
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** Date custom scalar type */
  Date: { input: unknown; output: unknown; }
};

/** A Studio Ghibli film and its English details. */
export type Film = {
  __typename?: 'Film';
  /** Wide banner image URL. */
  banner: Scalars['String']['output'];
  description: Scalars['String']['output'];
  director: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  /** Poster image URL. */
  image: Scalars['String']['output'];
  /** Locales this film is translated into; always includes "en". */
  languages: Array<Scalars['String']['output']>;
  /** Release year, e.g. "2001". */
  releaseDate: Scalars['String']['output'];
  /** Running time in minutes, e.g. "124". */
  runtime: Scalars['String']['output'];
  /** Rotten Tomatoes score, e.g. "97". */
  score: Scalars['String']['output'];
  /** Short, one-line tagline. */
  tagline: Scalars['String']['output'];
  title: Scalars['String']['output'];
  /** A few short pieces of trivia about the film. */
  trivia: Array<Scalars['String']['output']>;
};

export type Query = {
  __typename?: 'Query';
  /** Fetch a single Studio Ghibli film by id. */
  film?: Maybe<Film>;
  /** List all Studio Ghibli films. */
  films: Array<Film>;
};


export type QueryFilmArgs = {
  id: Scalars['ID']['input'];
};

export type GetFilmsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetFilmsQuery = { films: Array<{ id: string, title: string, description: string, tagline: string, trivia: Array<string>, director: string, releaseDate: string, runtime: string, image: string, banner: string, score: string, languages: Array<string> }> };


export const GetFilmsDocument = gql`
    query GetFilms {
  films {
    id
    title
    description
    tagline
    trivia
    director
    releaseDate
    runtime
    image
    banner
    score
    languages
  }
}
    `;

/**
 * __useGetFilmsQuery__
 *
 * To run a query within a React component, call `useGetFilmsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetFilmsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetFilmsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetFilmsQuery(baseOptions?: Apollo.QueryHookOptions<GetFilmsQuery, GetFilmsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetFilmsQuery, GetFilmsQueryVariables>(GetFilmsDocument, options);
      }
export function useGetFilmsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetFilmsQuery, GetFilmsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetFilmsQuery, GetFilmsQueryVariables>(GetFilmsDocument, options);
        }
// @ts-ignore
export function useGetFilmsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetFilmsQuery, GetFilmsQueryVariables>): Apollo.UseSuspenseQueryResult<GetFilmsQuery, GetFilmsQueryVariables>;
export function useGetFilmsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetFilmsQuery, GetFilmsQueryVariables>): Apollo.UseSuspenseQueryResult<GetFilmsQuery | undefined, GetFilmsQueryVariables>;
export function useGetFilmsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetFilmsQuery, GetFilmsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetFilmsQuery, GetFilmsQueryVariables>(GetFilmsDocument, options);
        }
export type GetFilmsQueryHookResult = ReturnType<typeof useGetFilmsQuery>;
export type GetFilmsLazyQueryHookResult = ReturnType<typeof useGetFilmsLazyQuery>;
export type GetFilmsSuspenseQueryHookResult = ReturnType<typeof useGetFilmsSuspenseQuery>;
export type GetFilmsQueryResult = Apollo.QueryResult<GetFilmsQuery, GetFilmsQueryVariables>;