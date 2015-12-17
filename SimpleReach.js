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

(function (window) {
    var name = 'SimpleReach';

    var constructor = function () {
        var self = this,
            forwarderSettings,
            reportingService,
            isInitialized = false,
            isTesting = false;

        self.name = name;

        function processEvent(event) {
            var reportEvent = false;

            if (isInitialized) {

                if(reportEvent && reportingService) {
                    reportingService(self, event);
                }
            }
            else {
                return 'Can\'t send to forwarder ' + name + ', not initialized';
            }
        }

        function initForwarder(settings,
            service,
            testMode,
            trackerId,
            userAttributes,
            userIdentities,
            appVersion,
            appName) {

            try {
                forwarderSettings = settings;
                reportingService = service;
                isTesting = testMode;
               

                return 'Successfully initialized: ' + name;
            }
            catch (e) {
                return 'Failed to initialize: ' + name;
            }
        }
        
        this.init = initForwarder;
        this.process = processEvent;
    };

    if (!window || !window.mParticle || !window.mParticle.addForwarder) {
        return;
    }

    window.mParticle.addForwarder({
        name: name,
        constructor: constructor
    });

})(window);
