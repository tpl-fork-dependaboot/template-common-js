{% set github_repository_name = environ('GITHUB_REPOSITORY').split('/') | last %}# {{ github_repository_name }}

![build status](https://github.com/{{ environ('GITHUB_REPOSITORY') }}/actions/workflows/test.yml/badge.svg)
[![Coverage Status](https://coveralls.io/repos/github/{{ environ('GITHUB_REPOSITORY') }}/badge.svg?branch={{ environ('GITHUB_REF') }})](https://coveralls.io/github/{{ environ('GITHUB_REPOSITORY') }}?branch={{ environ('GITHUB_REF') }})
[![Testspace tests count](https://img.shields.io/testspace/total/{{ environ('GITHUB_REPOSITORY_OWNER') }}/{{ environ('GITHUB_REPOSITORY') | urlencode }}/main)](https://{{ environ('GITHUB_REPOSITORY_OWNER') }}.testspace.com/projects/{{ environ('TESTSPACE_SPACE_ID') }})
![NPM Version](https://img.shields.io/npm/v/{{ github_repository_name }})
![NPM Downloads](https://img.shields.io/npm/dw/{{ github_repository_name }})

<!-- Put your README description here -->

## Code Quality

All unit test executed on each branch/PR are listed/described on
[testspace](https://{{ environ('GITHUB_REPOSITORY_OWNER') }}.testspace.com/projects/{{ environ('TESTSPACE_SPACE_ID') }}) and
on our [internal CI Report Repository](https://github.com/{{ environ('GITHUB_REPOSITORY_OWNER') }}/{{ environ('CI_REPORT_REPO_PATH') }}/tree/main/{{ github_repository_name }}/).

Coverage information and history is also avalailable on [coveralls](https://coveralls.io/github/{{ environ('GITHUB_REPOSITORY') }})
and on our [internal CI Report Repository](https://github.com/{{ environ('GITHUB_REPOSITORY_OWNER') }}/{{ environ('CI_REPORT_REPO_PATH') }}/tree/main/{{ github_repository_name }}/).

The DevSecOps pipeline used on this project are documented on [this page](./.github/DevSecOps.md).
