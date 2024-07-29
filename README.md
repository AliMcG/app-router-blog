# Blog Site

## Typescript, TailwindCSS, NextJS, Prisma and MongoDB

This project was deveolped for a friend to have a space for their professional/personal blogs.

It was a my first solo project just using Typescript and continuing to explore NextJS as a framework, TailwindCSS for really amazing CSS and my first exploration of Prisma.

## New stuff learnt

* Next.js App Router is very nice to use, the rootlayout and layout.tsx files give a lot of flexability.
* Heroicons are very easy to use.
* dynamic routing in NextJS is simple to set up.
* Typescript is awesome but tricky. This type safe fetch request was my first introduction to generics in Typescript:

```tsx
export async function typeSafeFetch<T>(
  request: RequestInfo,
  body?: RequestInit,
): Promise<T> {
  const response = await fetch(request, body);
  const result = (await response.json()) as T;
  return result;
}
```

* I still love TailwindCSS

## Prisma

The Prisma schema is a both the blue print for the database and also the type definitions for all associated types

## Helpful commands

* `npx prisma format` - when making changes to the schema use this command to auto format the types and their relations.
* `npx prisma db push` - after updating the schema, to push the new changes to the database.

## Testing

## Cypress Testing

End-to-End testing of the whole app.

* Add tests for visiting user ✅
* Add tests for authenticated USER
* Add tests for authenticated ADMIN

### Cypress testing notes

* A big pain point - how to sign in programmtically with Google and `next-auth`
  * Cypress documentation has very helpful - to set up up a custom login function for the cypress tests
  * `next-auth` and `prisma` create and save the session cookie in the database.
  * Not possible to mock the session cookie just using cypress.
  * But it is possible to create a new session for the Google user and `POST` that session to the database! Then pass the new session cookie to the `cypress.setCookie` function.

Resources used to configure Google auth for cypress:

<https://docs.cypress.io/guides/end-to-end-testing/google-authentication#Custom-Command-for-Google-Authentication>

<https://www.youtube.com/watch?v=SzhulGxprCw>

## Jest

Unit tests for the `tRPC` routers.

* Add tests for tRPC routers:
* locate ✅
* create
* update
* delete

### Jest testing notes

Resources used to write unit tests for `tRPC` routers:

<https://trpc.io/docs/server/server-side-calls>

<https://github.com/trpc/examples-next-prisma-starter/blob/main/src/server/routers/post.test.ts>

<https://create.t3.gg/en/usage/trpc#sample-integration-test>

## CI/CD

As part of a CI/CD pipeline this projects uses the awaesome power to [GitHub actions](https://docs.github.com/en/actions) to automate Cypress testing on a schedule.

The [schedule](https://docs.github.com/en/actions/using-workflows/events-that-trigger-workflows#schedule) event uses the [cron syntax](https://pubs.opengroup.org/onlinepubs/9699919799/utilities/crontab.html#tag_20_25_07) to schedule the workflow.

Check out the workflow logs for [Cypress CI Jobs](https://github.com/AliMcG/app-router-blog/actions)

The [cypress.yml](https://github.com/AliMcG/app-router-blog/blob/main/.github/workflows/cypress.yml) in the `.github/workflows` folder details the schedule for this project.

This is a [T3 Stack](https://create.t3.gg/) project bootstrapped with `create-t3-app`.
