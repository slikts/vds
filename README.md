# vds

[![NPM version](http://badge.fury.io/js/vds.svg)](http://badge.fury.io/js/vds)
[![GitHub version](https://badge.fury.io/gh/slikts%2Fvds.svg)](https://badge.fury.io/gh/slikts%2Fvds)
[![Dependency Status](https://david-dm.org/slikts/vds.svg)](https://david-dm.org/slikts/vds)
[![Open Source Love](https://badges.frapsoft.com/os/mit/mit.svg?v=102)](https://github.com/ellerbrock/open-source-badge/)
[![Build Status](https://travis-ci.org/slikts/vds.svg?branch=master)](https://travis-ci.org/slikts/vds)

CLI tool for outputting Latvian name days. Useful as a [Hangoutsbot][hangoutsbot] spawn plugin. [Data source][vardadienas].

## Usage

```sh
npm install -g vds
# Show today's names
vds
# Look up names for a specific date
vds -- 10-12
# Look up dates for a name using fuzzy matching
vds -- Barbara
```

[hangoutsbot]: https://github.com/hangoutsbot/hangoutsbot
[vardadienas]: https://github.com/slikts/vardadienas
