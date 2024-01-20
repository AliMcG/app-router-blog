# Blog Site

This is a [T3 Stack](https://create.t3.gg/) project bootstrapped with `create-t3-app`.

# Typescript, TailwindCSS, NextJS, Prisma and Postgres

This project was deveolped for a friend to have a space for their professional/personal blogs.

It was a my first solo project just using Typescript and continuing to explore NextJS as a framework, TailwindCSS for really amazing CSS and my first explore of Prisma.

## New stuff learnt
* Next.js App Router is very nice to use, the rootlayout and route layout.tsx files give a lot of flexability. 
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

# Prisma

* `npx prisma db push` - after updating the schema
