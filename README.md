> The example repository is maintained from a [monorepo](https://github.com/nextauthjs/next-auth/tree/main/apps/examples/nextjs). Pull Requests should be opened against [`nextauthjs/next-auth`](https://github.com/nextauthjs/next-auth).

<p align="center">
   <br/>
   <a href="https://authjs.dev" target="_blank">
   <img height="64" src="https://authjs.dev/img/logo/logo-sm.png" />
   </a>
   <a href="https://nextjs.org" target="_blank">
   <img height="64" src="https://nextjs.org/static/favicon/android-chrome-192x192.png" />
   </a>
   <h3 align="center"><b>NextAuth.js</b> - Example App</h3>
   <p align="center">
   Open Source. Full Stack. Own Your Data.
   </p>
   <p align="center" style="align: center;">
      <a href="https://npm.im/next-auth">
        <img alt="npm" src="https://img.shields.io/npm/v/next-auth?color=green&label=next-auth&style=flat-square">
      </a>
      <a href="https://bundlephobia.com/result?p=next-auth-example">
        <img src="https://img.shields.io/bundlephobia/minzip/next-auth?label=size&style=flat-square" alt="Bundle Size"/>
      </a>
      <a href="https://www.npmtrends.com/next-auth">
        <img src="https://img.shields.io/npm/dm/next-auth?label=downloads&style=flat-square" alt="Downloads" />
      </a>
      <a href="https://npm.im/next-auth">
        <img src="https://img.shields.io/badge/TypeScript-blue?style=flat-square" alt="TypeScript" />
      </a>
   </p>
</p>

## Overview

NextAuth.js is a complete open-source authentication solution.

Go to [next-auth.js.org](https://next-auth.js.org) for more information and documentation.

The base project this was shamelessly stolen from [https://github.com/nextauthjs/next-auth-example](https://github.com/nextauthjs/next-auth-example)

## Getting Started

### 1. Clone the repository and install dependencies

```
git clone git@github.com:tiongg/sgid-next-auth.git
cd next-auth-sgid
pnpm i
```

### 2. Configure your local environment

Copy the .env.local.example file in this directory to .env.local (which will be ignored by Git):

```
cp .env.local.example .env.local
```

Add details for one or more providers (e.g. Google, Twitter, GitHub, Email, etc).

#### Database

A database is needed to persist user accounts and to support email sign in. However, you can still use NextAuth.js for authentication without a database by using OAuth for authentication. If you do not specify a database, [JSON Web Tokens](https://jwt.io/introduction) will be enabled by default.

You **can** skip configuring a database and come back to it later if you want.

For more information about setting up a database, please check out the following links:

- Docs: [next-auth.js.org/adapters/overview](https://next-auth.js.org/adapters/overview)

### 3. Configure SGID

1. Review and update SgidProvider options in `pages/api/auth/[...nextauth].js` as needed.

2. When setting up sgid, configure the callback URL to `{server}/api/auth/callback/sgid`
   in the [sgid dev portal](https://developer.id.gov.sg)

e.g. `http://localhost:3000/api/auth/callback/sgid`

### 4. Start the application

To run your site locally, use:

```
pnpm run dev
```

## Using it outside of this project

1. Copy `pages/api/providers/sgid.provider.ts` and paste it into your app

2. Configure profile as needed

## Acknowledgements

[https://github.com/nextauthjs/next-auth-example](https://github.com/nextauthjs/next-auth-example): The base template
[https://github.com/opengovsg/sgid-client](https://github.com/opengovsg/sgid-client): Sgid Client
