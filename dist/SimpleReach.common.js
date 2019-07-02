Object.defineProperty(exports, '__esModule', { value: true });

/*!
 * isobject <https://github.com/jonschlinkert/isobject>
 *
 * Copyright (c) 2014-2017, Jon Schlinkert.
 * Released under the MIT License.
 */

function isObject(val) {
  return val != null && typeof val === 'object' && Array.isArray(val) === false;
}

var isobject = /*#__PURE__*/Object.freeze({
  'default': isObject
});

function getCjsExportFromNamespace (n) {
	return n && n['default'] || n;
}

var isobject$1 = getCjsExportFromNamespace(isobject);

//
//  Copyright 2015 mParticle, Inc.
//
//  Licensed under the Apache License, Version 2.0 (the "License");
//  you may not use this file except in compliance with the License.
//  You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
//  Unless required by applicable law or agreed to in writing, software
//  distributed under the License is distributed on an "AS IS" BASIS,
//  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
//  See the License for the specific language governing permissions and
//  limitations under the License.

    

    var name = 'SimpleReach',
        moduleId = 87,
        SimpleReachCustomFlags = {
            Title: 'SimpleReach.Title',
            Url: 'SimpleReach.Url',
            Date: 'SimpleReach.Date',
            Authors: 'SimpleReach.Authors',
            Channels: 'SimpleReach.Channels',
            Tags: 'SimpleReach.Tags',
            ContentHeight: 'SimpleReach.ContentHeight'
        },
        MessageType = {
            PageView: 3
        };

    var constructor = function () {
        var self = this,
            forwarderSettings,
            reportingService,
            isInitialized = false,
            isTesting = false,
            pid = null;

        self.name = name;

        function processEvent(event) {
            var reportEvent = false;

            if (isInitialized) {

                if (event.EventDataType == MessageType.PageView) {
                    reportEvent = true;
                    processSimpleReachEvent(event);
                }

                if (reportEvent && reportingService) {
                    reportingService(self, event);
                }
            }
            else {
                return 'Can\'t send to forwarder ' + name + ', not initialized';
            }
        }

        function copyCustomFlags(sourceObj, destObj) {
            if (sourceObj.hasOwnProperty(SimpleReachCustomFlags.Title)) {
                destObj.title = sourceObj[SimpleReachCustomFlags.Title];
            }

            if (sourceObj.hasOwnProperty(SimpleReachCustomFlags.Url)) {
                destObj.url = sourceObj[SimpleReachCustomFlags.Url];
            }

            if (sourceObj.hasOwnProperty(SimpleReachCustomFlags.Date)) {
                destObj.date = sourceObj[SimpleReachCustomFlags.Date];
            }

            if (sourceObj.hasOwnProperty(SimpleReachCustomFlags.Authors)) {
                destObj.authors = sourceObj[SimpleReachCustomFlags.Authors];
            }

            if (sourceObj.hasOwnProperty(SimpleReachCustomFlags.Channels)) {
                destObj.channels = sourceObj[SimpleReachCustomFlags.Channels];
            }

            if (sourceObj.hasOwnProperty(SimpleReachCustomFlags.Tags)) {
                destObj.tags = sourceObj[SimpleReachCustomFlags.Tags];
            }

            if (sourceObj.hasOwnProperty(SimpleReachCustomFlags.ContentHeight)) {
                destObj.content_height = sourceObj[SimpleReachCustomFlags.ContentHeight];
            }
        }

        function processSimpleReachEvent(event) {
            var eventData = {
                title: event.EventAttributes.title,
                pid: pid
            };

            if (event.CustomFlags) {
                copyCustomFlags(event.CustomFlags, eventData);
            }
            
            window.SPR.Reach.collect(eventData);
        }

        function initForwarder(settings,
            service,
            testMode,
            trackerId,
            userAttributes,
            userIdentities,
            appVersion,
            appName,
            customFlags) {

            var simpleReachConfig = {};

            try {
                forwarderSettings = settings;
                reportingService = service;
                isTesting = testMode;
                pid = settings.pid;

                simpleReachConfig.pid = pid;
                simpleReachConfig.ignore_errors = false;

                if (customFlags) {
                    copyCustomFlags(customFlags, simpleReachConfig);
                }

                window.__reach_config = simpleReachConfig;

                if (isTesting !== true) {
                    (function () {
                        var s = document.createElement('script');
                        s.async = true;
                        s.type = 'text/javascript';
                        s.src = document.location.protocol + '//d8rk54i4mohrb.cloudfront.net/js/reach.js';
                        (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(s);
                    })();
                }

                isInitialized = true;

                return 'Successfully initialized: ' + name;
            }
            catch (e) {
                return 'Failed to initialize: ' + name;
            }
        }

        this.init = initForwarder;
        this.process = processEvent;
    };

    function getId() {
        return moduleId;
    }

    function register(config) {
        if (!config) {
            window.console.log('You must pass a config object to register the kit ' + name);
            return;
        }

        if (!isobject$1(config)) {
            window.console.log('\'config\' must be an object. You passed in a ' + typeof config);
            return;
        }

        if (isobject$1(config.kits)) {
            config.kits[name] = {
                constructor: constructor
            };
        } else {
            config.kits = {};
            config.kits[name] = {
                constructor: constructor
            };
        }
        window.console.log('Successfully registered ' + name + ' to your mParticle configuration');
    }

    if (window && window.mParticle && window.mParticle.addForwarder) {
        window.mParticle.addForwarder({
            name: name,
            constructor: constructor,
            getId: getId
        });
    }

    var SimpleReach = {
        register: register
    };
var SimpleReach_1 = SimpleReach.register;

exports.default = SimpleReach;
exports.register = SimpleReach_1;
