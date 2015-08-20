Application Installation Requirements
=====================================
In order for this application to work you must install these components. <br />

#### Install Local Server
```
$ sudo npm install http-server -g
password: ****
/usr/local/bin/http-server -> /usr/local/lib/node_modules/http-server/bin/http-server
/usr/local/bin/hs -> /usr/local/lib/node_modules/http-server/bin/http-server
http-server@0.8.0 /usr/local/lib/node_modules/http-server
├── opener@1.4.1
├── corser@2.0.0
├── colors@1.0.3
├── http-proxy@1.11.1 (eventemitter3@1.1.1, requires-port@0.0.1)
├── optimist@0.6.1 (wordwrap@0.0.3, minimist@0.0.10)
├── union@0.4.4 (qs@2.3.3)
├── portfinder@0.4.0 (async@0.9.0, mkdirp@0.5.1)
└── ecstatic@0.7.6 (url-join@0.0.1, mime@1.3.4, minimist@1.1.3, he@0.5.0)

$ http-server
Starting up http-server, serving ./ on: http://0.0.0.0:8080
Hit CTRL-C to stop the server
...
```
<br />
#### Install Node Modules
```
$ npm install
geofire@3.2.2 node_modules/geofire
├── rsvp@3.0.21
└── firebase@2.2.9 (faye-websocket@0.9.3)
```
<br />
#### Install Bower
```
$ npm install -g bower
/usr/local/bin/bower -> /usr/local/lib/node_modules/bower/bin/bower
bower@1.4.1 /usr/local/lib/node_modules/bower
├── is-root@1.0.0
├── junk@1.0.2
├── user-home@1.1.1
├── stringify-object@1.0.1
├── abbrev@1.0.7
├── chmodr@0.1.0
├── archy@1.0.0
├── graceful-fs@3.0.8
├── opn@1.0.2
├── lru-cache@2.6.5
├── bower-logger@0.2.2
├── bower-endpoint-parser@0.2.2
├── lockfile@1.0.1
├── nopt@3.0.3
├── retry@0.6.1
├── tmp@0.0.24
├── request-progress@0.3.1 (throttleit@0.0.2)
├── q@1.4.1
├── chalk@1.1.0 (supports-color@2.0.0, escape-string-regexp@1.0.3, ansi-styles@2.1.0, strip-ansi@3.0.0, has-ansi@2.0.0)
├── which@1.1.1 (is-absolute@0.1.7)
├── shell-quote@1.4.3 (array-reduce@0.0.0, array-map@0.0.0, array-filter@0.0.1, jsonify@0.0.0)
├── semver@2.3.2
├── bower-json@0.4.0 (intersect@0.0.3, deep-extend@0.2.11, graceful-fs@2.0.3)
├── fstream@1.0.7 (inherits@2.0.1)
├── p-throttler@0.1.1 (q@0.9.7)
├── mkdirp@0.5.0 (minimist@0.0.8)
├── promptly@0.2.0 (read@1.0.6)
├── glob@4.5.3 (inherits@2.0.1, once@1.3.2, inflight@1.0.4, minimatch@2.0.10)
├── fstream-ignore@1.0.2 (inherits@2.0.1, minimatch@2.0.10)
├── insight@0.5.3 (object-assign@2.1.1, async@0.9.2, lodash.debounce@3.1.1, os-name@1.0.3, tough-cookie@0.12.1)
├── rimraf@2.4.2 (glob@5.0.14)
├── tar-fs@1.8.1 (pump@1.0.0, tar-stream@1.2.1)
├── decompress-zip@0.1.0 (mkpath@0.1.0, touch@0.0.3, readable-stream@1.1.13, binary@0.3.0)
├── update-notifier@0.3.2 (is-npm@1.0.0, string-length@1.0.1, semver-diff@2.0.0, latest-version@1.0.1)
├── request@2.53.0 (caseless@0.9.0, aws-sign2@0.5.0, forever-agent@0.5.2, stringstream@0.0.4, oauth-sign@0.6.0, tunnel-agent@0.4.1, isstream@0.1.2, json-stringify-safe@5.0.1, qs@2.3.3, node-uuid@1.4.3, combined-stream@0.0.7, form-data@0.2.0, mime-types@2.0.14, http-signature@0.10.1, bl@0.9.4, tough-cookie@2.0.0, hawk@2.3.1)
├── github@0.2.4 (mime@1.3.4)
├── bower-registry-client@0.3.0 (graceful-fs@2.0.3, request-replay@0.2.0, rimraf@2.2.8, lru-cache@2.3.1, async@0.2.10, mkdirp@0.3.5, request@2.51.0)
├── cardinal@0.4.4 (ansicolors@0.2.1, redeyed@0.4.4)
├── mout@0.11.0
├── bower-config@0.6.1 (osenv@0.0.3, graceful-fs@2.0.3, optimist@0.6.1, mout@0.9.1)
├── configstore@0.3.2 (object-assign@2.1.1, xdg-basedir@1.0.1, uuid@2.0.1, osenv@0.1.3, js-yaml@3.3.1)
├── handlebars@2.0.0 (optimist@0.3.7, uglify-js@2.3.6)
└── inquirer@0.8.0 (figures@1.3.5, ansi-regex@1.1.1, mute-stream@0.0.4, through@2.3.8, readline2@0.1.1, chalk@0.5.1, lodash@2.4.2, cli-color@0.3.3, rx@2.5.3)
```
<br />
#### Install Bower Components
```
$ bower install
bower cached        git://github.com/angular/bower-material.git#0.9.8
bower validate      0.9.8 against git://github.com/angular/bower-material.git#~0.9.7
bower cached        git://github.com/angular/bower-angular-messages.git#1.4.4
bower validate      1.4.4 against git://github.com/angular/bower-angular-messages.git#~1.4.0
bower cached        git://github.com/angular/router.git#0.5.3
bower validate      0.5.3 against git://github.com/angular/router.git#~0.5.3
bower cached        git://github.com/firebase/geofire-js.git#3.2.2
bower validate      3.2.2 against git://github.com/firebase/geofire-js.git#~3.2.2
bower cached        git://github.com/firebase/firebase-bower.git#2.2.9
bower validate      2.2.9 against git://github.com/firebase/firebase-bower.git#2.2.x
bower cached        git://github.com/components/rsvp.js.git#3.0.21
bower validate      3.0.21 against git://github.com/components/rsvp.js.git#3.0.x
bower cached        git://github.com/angular/bower-angular.git#1.4.4
bower validate      1.4.4 against git://github.com/angular/bower-angular.git#1.4.4
bower cached        git://github.com/angular/bower-angular-aria.git#1.4.4
bower validate      1.4.4 against git://github.com/angular/bower-angular-aria.git#^1.3.15 || >1.4.0-beta.0
bower cached        git://github.com/angular/bower-angular-animate.git#1.4.4
bower validate      1.4.4 against git://github.com/angular/bower-angular-animate.git#^1.3.0 || >1.4.0-beta.0
bower install       geofire#3.2.2
bower install       angular-new-router#0.5.3
bower install       angular-messages#1.4.4
bower install       firebase#2.2.9
bower install       rsvp#3.0.21
bower install       angular-material#0.9.8
bower install       angular-aria#1.4.4
bower install       angular-animate#1.4.4
bower install       angular#1.4.4

geofire#3.2.2 bower_components/geofire
├── firebase#2.2.9
└── rsvp#3.0.21

angular-new-router#0.5.3 bower_components/angular-new-router

angular-messages#1.4.4 bower_components/angular-messages
└── angular#1.4.4

firebase#2.2.9 bower_components/firebase

rsvp#3.0.21 bower_components/rsvp

angular-material#0.9.8 bower_components/angular-material
├── angular#1.4.4
├── angular-animate#1.4.4
└── angular-aria#1.4.4

angular-aria#1.4.4 bower_components/angular-aria
└── angular#1.4.4

angular-animate#1.4.4 bower_components/angular-animate
└── angular#1.4.4

angular#1.4.4 bower_components/angular
```