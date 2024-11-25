# DevSecOps Actions

## Requirements

- Secrets:
  - `GH_PERSONAL_ACCESS_TOKEN_WORKFLOW`: GitHub token used to be able to
     trigger the publish workflow from the release workflow.
     [See Continuous deployement section for more information.](#continuous-deployement)
  - `NPM_TOKEN`: token used to publish the project to npm site.
    [See Continuous deployement section for more information.](#continuous-deployement)
  - `DEPLOY_CI_REPORT_KEY`: SSH private key used to publish to our internal
    CI Report Page Repository.
    [See Continuous Testing section for more information.](#continuous-testing-unit-test)

## Scanning for Vulnerability

We are using [codeql tool](https://docs.github.com/en/code-security/code-scanning/introduction-to-code-scanning/about-code-scanning-with-codeql)
to scan for vulnerability.
This scanning is configured with the local [codeql-analysis.yml](./workflows/codeql-analysis.yml)
file.
More information are available on following GitHub Doc Section: [Code Scanning](https://docs.github.com/en/code-security/code-scanning)

## Code Quality

We are using this [Super linter slim version](https://github.com/marketplace/actions/super-linter)
to analyse the code quality.
This analyse is launched by the local [linter.yml](./workflows/linter.yml)
file.
It is configured by files located in the [linters](./linters/) directory.
More information are available on the [Super linter page](https://github.com/marketplace/actions/super-linter).

## Continuous Testing (Unit Test)

The [test.yml](./workflows/test.yml) workflow file defined steps dedicated to
Unit Test.
It is launch on every pull request and on develop and main branch.
Following action are made:

- Job: **Unit Tests**
  - Checkout the project and install its dependencies
  - Test the project with `ci-test` command defined in [package.json](../package.json)
  file: `npm run ci-test`
  - Test Result are deployed inside GitHub project (comments, indicator, ...)
  with the help of the [publish-test-results](https://github.com/marketplace/actions/publish-test-results)
  action.
  - Test and Coverage Result are also deployed inside GitHub project (comments,
  indicator, ...) with the help of the  [jest-coverage-report](https://github.com/marketplace/actions/jest-coverage-report)
  action.
  - Test Report are send to [testspace](https://.testspace.com/projects/)
  - Coverage Report are send to [coveralls](https://coveralls.io/github/)
  - Test and Coverage HTML reports files are also send inside our global CI Report
  Pages Repository. This step use the local SSH private key stored in the
  `DEPLOY_CI_REPORT_KEY` secret. The associated public key must be added as
  a "Deploy Keys" in the targeted Repository.
- Job: **Remove Test Report**
  - In case of a close of pull request, the related section in our global CI
  Report Pages Repository is deleted. Again the `DEPLOY_CI_REPORT_KEY` secret
  is used.

## Continuous Deployement

The [release.yml](./workflows/release.yml) workflow file defines two jobs:

- Job: **Check Future Release Version** is done on Pull Request action
(open/update)targeting the main branch. This job check if version definition
is correct or not for the next release :
  - It gets the version defined in the [package.json](../package.json) file
  and check if associated tag is already defined or not.
  - If the current branch is a release one (starting with releases/*.*.*
  following by the version number), it get also this version number and check
  also if associated tag is already defined or not.
  Then it checks also is the two given version are matching or not.
  - It add a comment on the PR (or update it) indicating if version are
  matching or not, and if future tag is avaible or not.
  It fails in case of an error in all this checks.
- Job: **Release** is used when the Pull Request is accepted (closed and merged
in main).
  - It creates the tag corresponding to the version writed in the [package.json](../package.json)
  file is created on the merged commit on the main branch.
  - It created an associated GitHub release

The [publish.yml](./workflows/publish.yml) workflow file is launch when a new
Release is defined. So the release job upper indirectly launched this workflow
when creating the release. It does the following:

- Package the Release with `npm run package --if-present`
- Publish the package to npm with `npm publish` (The secret `NPM_TOKEN` must be defined)

Note 1: A specific token need to be use to can trigger the publish workflow from
the release workflow (see [triggering-a-workflow-from-a-workflow](https://docs.github.com/en/actions/using-workflows/triggering-a-workflow#triggering-a-workflow-from-a-workflow)).
This token can be a Fine-grained personal access tokens with Read and Write
Access To Code and Workflow (fro this repository).
The associated secret name is `GH_PERSONAL_ACCESS_TOKEN_WORKFLOW`.

Note 2: To publish to npm, the publish workflow use the secret `NPM_TOKEN`
contening the token used to publish to npm site.