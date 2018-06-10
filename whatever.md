# The master plan

The plan is to monkey-patch constructors that deal with `chunkName`.

If a `chunkName` is passed, it should be left as-is (it's the user's responsibility). If it's `null`, it should be generated.

The chunk should ideally be `chunks/[request]-[filepathHash]`, where:
- `[path]` is the path of the request (in the case of context imports it may need to be `[index]` or `[request]`)
- `[filepathHash]` is the hash of the file where the import is (so that there is no clash when `[path]` is the same between different files)

# The investigation

## import

1. `import` is parsed by ImportParserPlugin
2. From there `chunkName` is parsed from the comment and passed to either ImportDependenciesBlock or ContextDependencyHelpers.create

## ImportDependenciesBlock

This class extends AsyncDependenciesBlock and initializes it with `chunkName` as the first argument.

### AsyncDependenciesBlock

The only thing it's doing is assigning `name` (the 1st argument) to `this.chunkName`. This seems to be the perfect moment to auto-generate `chunkName`.

The things that depend on AsyncDependenciesBlock are:
- The previously mentioned ImportDependenciesBlock class
- The AMDRequireDependenciesBlock and RequireEnsureDependenciesBlock classes which extend AsyncDependenciesBlock
- A raw call in ContextModule.build when `this.async === 'lazy-once'`, with `this.chunkName` as `chunkName`
- A raw call in ContextModule.build in the fallback (lazy) case, with `chunkName` being calculated from `this.chunkName`

#### AMDRequireDependenciesBlock

It passes `null` as the `chunkName`. TODO: might be worth investigating what should happen with that.

#### RequireEnsureDependenciesBlock

It passes `chunkName` from its own arguments, which it gets from RequireEnsureDependenciesBlockParserPlugin.

The `chunkName` passed from there is a result of parsing the 4th argument of `require.ensure`. TODO: investigate.

#### ContextModule.build

`async` might come from a dependency. I found the following places that set `async`:
- ContextDependency (`false`)
- ImportEagerContextDependency (`'eager'`)
- ImportLazyContextDependency (`'lazy'`)
- ImportLazyOnceContextDependency (`'lazy-once'`)
- ImportWeakContextDependency (`'async-weak'`)
- RequireContextDependency (passed from the 4th parsed argument of `require.context`)
- RequireResolveDependencyParserPlugin (`'weak'` or `false`)

## ContextDependencyHelpers.create

`chunkName` is passed as the 6th argument of `Dep`, which is `create`'s first argument.

There are also cases where `chunkName` is not passed:
- with AMDRequireContextDependency as `Dep`
- with CommonJsRequireContextDependency as `Dep`
- with RequireResolveContextDependency as `Dep`

### import - Dep

`Dep` is one of the following:
- ImportEagerContextDependency
- ImportLazyContextDependency
- ImportLazyOnceContextDependency
- ImportWeakContextDependency

All of them extend ImportContextDependency and offload `chunkName` handling to the parent class.

### ImportContextDependency

The only thing it's doing is assigning `chunkName` to `this.chunkName`. This seems to be the perfect moment to auto-generate `chunkName`.

The only things that depend on ImportContextDependency are the previously mentioned classes.