# GPortfolio Contributing Guide

- [Code of Conduct](https://github.com/alexeykhr/vue-stripe-menu/blob/main/.github/CODE_OF_CONDUCT.md)
- [Pull Request Guidelines](#pull-request-guidelines)
- [Development Setup](#development-setup)

## Pull Request Guidelines

- Create all pull requests from main. Do not include other pull requests that have not been merged yet.
- Limit each pull request to one feature. If you have made several changes, please submit multiple pull requests.
- If you add a new feature provide tests that specify how the feature works.
- Respect the [coding conventions](https://www.conventionalcommits.org)
- Do not include the number of a related issue in the title of a pull request. Give the pull request a descriptive title and reference any issues from the description.

## Development Setup

The [pnpm](https://pnpm.io/) package manager is used to handle dependencies.

### Library

```shell
# Install dependencies
$ pnpm i

# Build the library
$ pnpm build:lib

# Run tests
$ pnpm tests

# Run linter
$ pnpm lint:eslint -- --fix
$ pnpm lint:prettier
$ pnpm lint:stylelint -- --fix
```

### Documentation

All commands must be executed in the `docs` folder.

```shell
# Install dependencies
$ pnpm i

# Run in dev mode
$ pnpm dev

# Build the docs
$ pnpm build
```
