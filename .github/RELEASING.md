# Releasing

Maintainers choose the release version in a pull request. Commit messages do not
trigger automatic version bumps or npm releases.

1. Create a branch from `master`.
2. Update `package.json` with `npm version patch --no-git-tag-version`, or choose
   the required minor, major, or explicit version.
3. Add the release notes to `CHANGELOG.md` and open a PR into `master`.
4. Merge the PR after its CI checks pass.

The `Release` workflow compares the package versions before and after the push
to `master`. It requires an associated merged PR. Dependency-only changes and
direct version pushes do not publish a package.

The workflow checks out the exact merged commit and installs dependencies.
`npm publish` runs the `prepublishOnly` script to build the package. The release
workflow relies on the PR's CI checks and does not run them again. It publishes
stable versions with the `latest` npm tag and prerelease versions with `next`.
It then creates a `v<version>` tag and a GitHub release with generated notes.

If a release fails, rerun its failed jobs in GitHub Actions. The workflow skips
versions that already exist on npm and GitHub releases that already exist, so a
retry can finish creating the GitHub release without publishing the package again.

## npm trusted publisher

Configure the `utility` package's trusted publisher on npm with:

- Organization: `node-modules`
- Repository: `utility`
- Workflow filename: `release.yml`
- Environment: leave empty
- Allowed action: `npm publish`

The workflow uses Node.js 24, npm 11, and `id-token: write` for OIDC authentication.
It does not use an npm token or the `GIT_TOKEN` secret. GitHub release creation
uses the repository's built-in `GITHUB_TOKEN`.

See the [npm trusted publishing documentation](https://docs.npmjs.com/trusted-publishers/)
for the package settings.
