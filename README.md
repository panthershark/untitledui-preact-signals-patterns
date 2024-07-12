# Motivation / Opinions

- Component frameworks are either too abstract (do not add value) or too strict (does not align with design)
- No one likes rebuilding the same controls over and over.
- I prefer [Preact](https://preactjs.com/).
- I haven’t seen a great example of real-world [Preact Signals](https://github.com/preactjs/signals) usage.
- The DRY principle is abused and often poorly applied.
- Unit testing is lacking in most frontend projects.
- A little copying is better than a little dependency. [This is from the Go Proverbs](https://go-proverbs.github.io/)

## How did this start?

I have used UntitledUI as a design base for a bunch of projects recently. As expected, common patterns emerge. The general structure is always the same, but the design details and customization ALWAYS diverge. A common pattern for component frameworks is to add unnecessary config/dependency injection and complexity to attempt to deal with this.

That complexity is a [clever](https://www.youtube.com/watch?v=PAAkCSZUG1c&t=875s) feat of engineering, but it's complex and complexity requires maintainers.. and complexity often get abandoned; sometimes it's no one's fault, like when some standard changes.

## This repo is..

This repo is a collection of patterns and common UI controls. They are based on the UntitledUI design language system.

## This repo is not..

This repo is not meant to be included in your app. To use it, make a copy of the parts you like and use them in your app.

This is not intended to be published to NPM or another package manager. These projects never age well because there are just too many different combinations of frameworks, dependencies, etc to support.

There are a couple inevitable outcomes:

1. The project can’t control the feature requests the whole thing becomes complex and bloated; resulting in something that is hard to learn, hard to maintain, or become so generic that it isn’t helpful any longer.
2. Maintainers have to guard against bloat and complexity which usually ends up in some sort of conflict or drama; not responsive enough. terse replies. or maybe folks are unhappy their feature request or PR was not accepted.

Here is how most of us feel about drama:

![Ain't nobody got time for that](https://miro.medium.com/v2/resize:fit:720/format:webp/1*8xraf6eyaXh-myNXOXkqLA.jpeg)

## How should I use this project?

First, ⭐ star ⭐ the repo if you like it. Next, there are two ways to start.

1. Starter kit - fork/copy the full project.

Once you get your own copy

- Delete what you don’t need. YAGNI (you can add it back if you need it later)
- Replace package name, css vars, etc with yours.
- Swap dependencies or whatever else. e.g. If you want react, just swap the jsx runtime in tsconfig.
- Add what you do need. e.g. authentication, api clients, graphql/grpc/openapi codegen, etc.

2. Copy useful controls or snippets.

You might already have an app and you just need a nice control or need to grab a couple hooks.

3. Exploring patterns or best practices

Maybe your team is evaluating a few different approaches to design, frontend project structure, or a custom design language system. This would be a great option for getting everyone up to speed with one approach so y’all can quickly make a decision.

Maybe you are a backend engineer learning frontend?

Maybe you are curious about [preact](https://preactjs.com/), css modules, or [Preact Signals](https://github.com/preactjs/signals)

**License** - Everything in this repo is free for any use. No attribution needed.
