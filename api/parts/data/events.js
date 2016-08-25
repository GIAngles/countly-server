var countlyEvents = {},
    common = require('./../../utils/common.js'),
    async = require('async'),
    crypto = require('crypto'),
	plugins = require('../../../plugins/pluginManager.js'), 
    //countlyConfig = require('../../config.js', 'dont-enclose');
    ES = require('elasticsearch');
    elasticClient = new ES.Client({host: 'localhost:9200'});

(function (countlyEvents) {

    countlyEvents.processEvents = function(params) {
        var customizedEvent = new Array();
        for (var i=0; i < params.qstring.events.length; i++) {
            var currEvent = params.qstring.events[i];
            var date = new Date(params.time.timestamp*1000);

            customizedEvent.push({
                app_id: params.app_id,
                ip_addr: params.ip_address,
                timestamp_num: params.time.timestamp,
                timestamp_dat: date,
                time_daily: params.time.daily,
                event: currEvent,
                app_user: params.app_user,
                app_user_id: params.app_user._id,
                app_user_cc: params.app_user.cc,
            });
            console.log('cEvent:', customizedEvent[i]);
            var index_name = 'countly';
            /* v1.00
            var objIn = {
                    index: index_name.concat('_', customizedEvent[i].app_id),
                    type: 'events',
                    id: currEvent.key.concat('_', customizedEvent[i].timestamp),
                    body: customizedEvent[i], 
            };
            */
            //v1.01: better visualize, becoz too many event and too many timestamp at 1 index to manage
            
            var objIn = {
                index: index_name.concat('_', customizedEvent[i].app_id, '_', params.time.daily),
                type: currEvent.key,
                id: customizedEvent[i].timestamp_num,
                timestamp: date,
                body: customizedEvent[i], 
            };
            //console.log('objectIn:', objIn);

            /*not stable
            var mapping = {
                index: objIn.index,
                //updateAllTypes: true,
                body: {
                    mappings: {
                        [objIn.type]: { 
                            properties: {
                                event: {
                                    properties: {
                                        dur: {
                                            type : "double"
                                        },
                                        key: {
                                            type : "string",
                                            index: "not_analyzed" //for better visualization
                                        },
                                        segmentation: {
                                            properties: {
                                                name:{
                                                    type : "string",
                                                    index: "not_analyzed" //for better visualization
                                                },
                                                TYPE:{
                                                    type : "string",
                                                    index: "not_analyzed" //for better visualization
                                                },
                                                IMG_ID:{
                                                    type : "string",
                                                    index: "not_analyzed" //for better visualization
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            };
            */
            //console.log('objectIn:', mapping);
            

            // not stable
            /*
            elasticClient.indices.create(
                mapping,
                function (error, response) {
                    //console.log('something happen');
                    //console.log('Elastic indices create error:', error);
                    //console.log('Elastic indices create response:', response);
                    elasticClient.index(
                        objIn, 
                        function (error, response) {
                            //console.log('something happen');
                            //console.log('Elastic index error:', error);
                            //console.log('Elastic index response:', response);   
                        }
                    );   
                }
            )
            */

            //v2.00: the flow of elastic have to make sure the command run in order
            // in this ver we're using callback function to do the trick
            /*
            var mapping = {
                index: objIn.index,
                type: objIn.type,
                //updateAllTypes: true,
                body: {
                    [objIn.type]: {
                        properties: {
                            event: {
                                properties: {
                                    dur: {
                                        type : "double"
                                    },
                                    key: {
                                        type : "string",
                                        index: "not_analyzed" //for better visualization
                                    },
                                    segmentation: {
                                        properties: {
                                            name:{
                                                type : "string",
                                                index: "not_analyzed" //for better visualization
                                            },
                                            TYPE:{
                                                type : "string",
                                                index: "not_analyzed" //for better visualization
                                            },
                                            IMG_ID:{
                                                type : "string",
                                                index: "not_analyzed" //for better visualization
                                            }
                                        }
                                    }
                                }
                            }
                        }        
                    }
                }
            };
            */

            //v.210: improve both visualization and query by add both analyzed string and not analyzed
            //(for popular fields only)
            var mapping = {
                index: objIn.index,
                type: objIn.type,
                body: {
                    [objIn.type]: {
                        properties: {
                            event: {
                                properties: {
                                    dur: {
                                        type : "double"
                                    },
                                    key: {
                                        type : "string",
                                        index: "not_analyzed" 
                                    },
                                    key_ana: {
                                        type : "string"
                                    },
                                    segmentation: {
                                        properties: {
                                            name:{
                                                type : "string",
                                                index: "not_analyzed" 
                                            },
                                            TYPE:{
                                                type : "string",
                                                index: "not_analyzed" 
                                            },
                                            IMG_ID:{
                                                type : "string",
                                                index: "not_analyzed" 
                                            },
                                            name_ana:{
                                                type : "string"
                                            },
                                            TYPE_ana:{
                                                type : "string"
                                            },
                                            IMG_ID_ana:{
                                                type : "string" 
                                            },
                                        }
                                    }
                                }
                            }
                        }        
                    }
                }
            };
            //any added element *_ana should be copied by their original 
            //we added *_ana for analyze, search ... by words purpose
            //and the original one is for simple visualize (statistical overeview only, not deep analytics)
            if (objIn.body.event.segmentation != undefined) {
                objIn.body.event.segmentation.name_ana = objIn.body.event.segmentation.name;
                objIn.body.event.segmentation.TYPE_ana = objIn.body.event.segmentation.TYPE;
                objIn.body.event.segmentation.IMG_ID_ana = objIn.body.event.segmentation.IMG_ID;
            }

            elasticClient.indices.create({
                    index: objIn.index
                },
                function (error, response) {
                    //console.log('something happen');
                    console.log('Elastic create error:', error);
                    console.log('Elastic create response:', response);
                    elasticClient.indices.putMapping(
                        mapping,
                        function (error, response) {
                            //console.log('something happen');
                            console.log('Elastic putMapping error:', error);
                            console.log('Elastic putMapping response:', response);
                            elasticClient.index(
                                objIn, 
                                function (error, response) {
                                    //console.log('something happen');
                                    console.log('Elastic index error:', error);
                                    console.log('Elastic index response:', response);   
                                }
                            );    
                        }
                    );   
                }
            );
        }

        common.db.collection("events").findOne({'_id':params.app_id}, {list:1, segments:1}, function (err, eventColl) {
            var appEvents = [],
                appSegments = {},
                metaToFetch = [];

            if (!err && eventColl) {
                if (eventColl.list) {
                    appEvents = eventColl.list;
                }

                if (eventColl.segments) {
                    appSegments = eventColl.segments;
                }
            }

            for (var i=0; i < params.qstring.events.length; i++) {
                var currEvent = params.qstring.events[i],
                    shortEventName = "",
                    eventCollectionName = "";
                if (!currEvent.key || !currEvent.count || !common.isNumber(currEvent.count) || (currEvent.key.indexOf('[CLY]_') == 0 && !currEvent.test)) {
                    continue;
                }

                if (plugins.getConfig("api").event_limit &&
                    appEvents.length >= plugins.getConfig("api").event_limit &&
                    appEvents.indexOf(currEvent.key) === -1) {
                    continue;
                }

                shortEventName = common.fixEventKey(currEvent.key);

                if (!shortEventName) {
                    continue;
                }

                eventCollectionName = "events" + crypto.createHash('sha1').update(shortEventName + params.app_id).digest('hex');

                if (params.qstring.events[i].timestamp) {
                    params.time = common.initTimeObj(params.appTimezone, params.qstring.events[i].timestamp);
                }

                metaToFetch.push({
                   coll: eventCollectionName,
                   id: "no-segment_" + common.getDateIds(params).zero
                });
            }

            async.map(metaToFetch, fetchEventMeta, function (err, eventMetaDocs) {
                var appSgValues = {};

                for (var i = 0; i < eventMetaDocs.length; i++) {
                    if (eventMetaDocs[i].coll && eventMetaDocs[i].meta) {
                        appSgValues[eventMetaDocs[i].coll] = eventMetaDocs[i].meta;
                    }
                }

                processEvents(appEvents, appSegments, appSgValues, params);
            });

            function fetchEventMeta(metaToFetch, callback) {
                common.db.collection(metaToFetch.coll).findOne({'_id':metaToFetch.id}, {meta:1}, function (err, eventMetaDoc) {
                    var retObj = eventMetaDoc || {};
                    retObj.coll = metaToFetch.coll;

                    callback(false, retObj);
                });
            }
        });
    };

    function processEvents(appEvents, appSegments, appSgValues, params) {
        //console.log('appEvents: ', appEvents);
        //console.log('appSegments: ', appSegments);
        //console.log('appSgValues: ', appSgValues);
        //console.log('params: ', params);
        
        var events = [],
            eventCollections = {},
            eventSegments = {},
            eventSegmentsZeroes = {},
            tmpEventObj = {},
            tmpEventColl = {},
            shortEventName = "",
            eventCollectionName = "",
            eventHashMap = {},
            forbiddenSegValues = [];

        for (var i = 1; i < 32; i++) {
            forbiddenSegValues.push(i + "");
        }

        for (var i=0; i < params.qstring.events.length; i++) {

            var currEvent = params.qstring.events[i];
            tmpEventObj = {};
            tmpEventColl = {};

            // Key and count fields are required
            if (!currEvent.key || !currEvent.count || !common.isNumber(currEvent.count)) {
                continue;
            }

            if (plugins.getConfig("api").event_limit &&
                appEvents.length >= plugins.getConfig("api").event_limit &&
                appEvents.indexOf(currEvent.key) === -1) {
                continue;
            }

			plugins.dispatch("/i/events", {params:params, currEvent:currEvent});
	    	    
            shortEventName = common.fixEventKey(currEvent.key);

            if (!shortEventName) {
                continue;
            }

            // Create new collection name for the event
            var extra = crypto.createHash('sha1').update(shortEventName + params.app_id).digest('hex');
            eventCollectionName = "events" + extra;  

            eventHashMap[eventCollectionName] = shortEventName;

            // If present use timestamp inside each event while recording
            if (params.qstring.events[i].timestamp) {
                params.time = common.initTimeObj(params.appTimezone, params.qstring.events[i].timestamp);
            }

            common.arrayAddUniq(events, shortEventName);

            if (currEvent.sum && common.isNumber(currEvent.sum)) {
                currEvent.sum = parseFloat(parseFloat(currEvent.sum).toFixed(5));
                common.fillTimeObjectMonth(params, tmpEventObj, common.dbMap['sum'], currEvent.sum);
            }
            
            if (currEvent.dur && common.isNumber(currEvent.dur)) {
                currEvent.dur = parseFloat(currEvent.dur);
                common.fillTimeObjectMonth(params, tmpEventObj, common.dbMap['dur'], currEvent.dur);
            }

            common.fillTimeObjectMonth(params, tmpEventObj, common.dbMap['count'], currEvent.count);

            var dateIds = common.getDateIds(params);

            tmpEventColl["no-segment" + "." + dateIds.month] = tmpEventObj;

            if (currEvent.segmentation) {
                for (var segKey in currEvent.segmentation){
                    var tmpSegKey = "";
                    if(segKey.indexOf('.') != -1 || segKey.substr(0,1) == '$'){
                        tmpSegKey = segKey.replace(/^\$|\./g, "");
                        currEvent.segmentation[tmpSegKey] = currEvent.segmentation[segKey];
                        delete currEvent.segmentation[segKey];
                    }
                }

                for (var segKey in currEvent.segmentation) {

                    if (plugins.getConfig("api").event_segmentation_limit &&
                        appSegments[currEvent.key] &&
                        appSegments[currEvent.key].indexOf(segKey) === -1 &&
                        appSegments[currEvent.key].length >= plugins.getConfig("api").event_segmentation_limit) {
                        continue;
                    }

                    tmpEventObj = {};
                    var tmpSegVal = currEvent.segmentation[segKey] + "";

                    if (tmpSegVal == "") {
                        continue;
                    }

                    // Mongodb field names can't start with $ or contain .
                    tmpSegVal = tmpSegVal.replace(/^\$/, "").replace(/\./g, ":");

                    if (forbiddenSegValues.indexOf(tmpSegVal) !== -1) {
                        tmpSegVal = "[CLY]" + tmpSegVal;
                    }

                    if (plugins.getConfig("api").event_segmentation_value_limit &&
                        appSgValues[eventCollectionName] &&
                        appSgValues[eventCollectionName][segKey] &&
                        appSgValues[eventCollectionName][segKey].indexOf(tmpSegVal) === -1 &&
                        appSgValues[eventCollectionName][segKey].length >= plugins.getConfig("api").event_segmentation_value_limit) {
                        continue;
                    }

                    if (currEvent.sum && common.isNumber(currEvent.sum)) {
                        common.fillTimeObjectMonth(params, tmpEventObj, tmpSegVal + '.' + common.dbMap['sum'], currEvent.sum);
                    }
                    
                    if (currEvent.dur && common.isNumber(currEvent.dur)) {
                        common.fillTimeObjectMonth(params, tmpEventObj, tmpSegVal + '.' + common.dbMap['dur'], currEvent.dur);
                    }

                    common.fillTimeObjectMonth(params, tmpEventObj, tmpSegVal + '.' + common.dbMap['count'], currEvent.count);

                    if (!eventSegmentsZeroes[eventCollectionName]) {
                        eventSegmentsZeroes[eventCollectionName] = [];
                        common.arrayAddUniq(eventSegmentsZeroes[eventCollectionName], dateIds.zero);
                    } else {
                        common.arrayAddUniq(eventSegmentsZeroes[eventCollectionName], dateIds.zero);
                    }

                    if (!eventSegments[eventCollectionName + "." + dateIds.zero]) {
                        eventSegments[eventCollectionName + "." + dateIds.zero] = {};
                    }

                    if (!eventSegments[eventCollectionName + "." + dateIds.zero]['meta.' + segKey]) {
                        eventSegments[eventCollectionName + "." + dateIds.zero]['meta.' + segKey] = {};
                    }

                    if (eventSegments[eventCollectionName + "." + dateIds.zero]['meta.' + segKey]["$each"] && eventSegments[eventCollectionName + "." + dateIds.zero]['meta.' + segKey]["$each"].length) {
                        common.arrayAddUniq(eventSegments[eventCollectionName + "." + dateIds.zero]['meta.' + segKey]["$each"], tmpSegVal);
                    } else {
                        eventSegments[eventCollectionName + "." + dateIds.zero]['meta.' + segKey]["$each"] = [tmpSegVal];
                    }

                    if (!eventSegments[eventCollectionName + "." + dateIds.zero]["meta.segments"]) {
                        eventSegments[eventCollectionName + "." + dateIds.zero]["meta.segments"] = {};
                        eventSegments[eventCollectionName + "." + dateIds.zero]["meta.segments"]["$each"] = [];
                    }

                    common.arrayAddUniq(eventSegments[eventCollectionName + "." + dateIds.zero]["meta.segments"]["$each"], segKey);
                    tmpEventColl[segKey + "." + dateIds.month] = tmpEventObj;
                }
            }

            if (!eventCollections[eventCollectionName]) {
                eventCollections[eventCollectionName] = {};
            }

            mergeEvents(eventCollections[eventCollectionName], tmpEventColl);
        }

        if (!plugins.getConfig("api").safe) {
            for (var collection in eventCollections) {
                if (eventSegmentsZeroes[collection] && eventSegmentsZeroes[collection].length) {
                    for (var i = 0; i < eventSegmentsZeroes[collection].length; i++) {
                        var zeroId = "";

                        if (!eventSegmentsZeroes[collection] || !eventSegmentsZeroes[collection][i]) {
                           continue;
                        } else {
                            zeroId = eventSegmentsZeroes[collection][i];
                        }

                        common.db.collection(collection).update({'_id': "no-segment_" + zeroId}, {$set: {"m":zeroId, "s":"no-segment"}, '$addToSet': eventSegments[collection + "." +  zeroId]}, {'upsert': true}, function(err, res) {});
                    }
                }

                for (var segment in eventCollections[collection]) {
                    var collIdSplits = segment.split("."),
                        collId = segment.replace(".","_");

                    common.db.collection(collection).update({'_id': collId}, {$set: {"m":collIdSplits[1], "s":collIdSplits[0]}, "$inc":eventCollections[collection][segment]}, {'upsert': true}, function(err, res) {});
                }
            }
        } else {
            var eventDocs = [];

            for (var collection in eventCollections) {
                if (eventSegmentsZeroes[collection] && eventSegmentsZeroes[collection].length) {
                    for (var i = 0; i < eventSegmentsZeroes[collection].length; i++) {
                        var zeroId = "";

                        if (!eventSegmentsZeroes[collection] || !eventSegmentsZeroes[collection][i]) {
                            continue;
                        } else {
                            zeroId = eventSegmentsZeroes[collection][i];
                        }

                        eventDocs.push({
                            "collection": collection,
                            "_id": "no-segment_" + zeroId,
                            "updateObj": {$set: {"m":zeroId, "s":"no-segment"}, '$addToSet': eventSegments[collection + "." +  zeroId]}
                        });
                    }
                }

                for (var segment in eventCollections[collection]) {
                    var collIdSplits = segment.split("."),
                        collId = segment.replace(".","_");

                    eventDocs.push({
                        "collection": collection,
                        "_id": collId,
                        "updateObj": {$set: {"m":collIdSplits[1], "s":collIdSplits[0]}, "$inc":eventCollections[collection][segment]},
                        "rollbackObj":eventCollections[collection][segment]
                    });
                }
            }

            async.map(eventDocs, updateEventDb, function (err, eventUpdateResults) {
                var needRollback = false;

                for (var i = 0; i < eventUpdateResults.length; i++) {
                    if (eventUpdateResults[i].status == "failed") {
                        needRollback = true;
                        break;
                    }
                }

                if (needRollback) {
                    async.map(eventUpdateResults, rollbackEventDb, function (err, eventRollbackResults) {
                        common.returnMessage(params, 500, 'Failure');
                    });
                } else {
                    common.returnMessage(params, 200, 'Success');
                }
            });

            function updateEventDb(eventDoc, callback) {
                common.db.collection(eventDoc.collection).update({'_id': eventDoc._id}, eventDoc.updateObj, {'upsert': true, 'safe': true}, function(err, result) {
                    if (err || result != 1) {
                        callback(false, {status: "failed", obj: eventDoc});
                    } else {
                        callback(false, {status: "ok", obj: eventDoc});
                    }
                });
            }

            function rollbackEventDb(eventUpdateResult, callback) {
                if (eventUpdateResult.status == "failed") {
                    callback(false, {});
                } else {
                    var eventDoc = eventUpdateResult.obj;

                    if (eventDoc.rollbackObj) {
                        common.db.collection(eventDoc.collection).update({'_id': eventDoc._id}, {'$inc': getInvertedValues(eventDoc.rollbackObj)}, {'upsert': false}, function(err, result) {});
                        callback(true, {});
                    } else {
                        callback(true, {});
                    }
                }
            }

            function getInvertedValues(obj) {
                var invObj = {};

                for (var objProp in obj) {
                    invObj[objProp] = -obj[objProp];
                }

                return invObj;
            }
        }

        if (events.length) {
            var eventSegmentList = {'$addToSet': {'list': {'$each': events}}};

            for (var event in eventSegments) {
                var eventSplits = event.split("."),
                    eventKey = eventSplits[0];

                var realEventKey = (eventHashMap[eventKey] + "").replace(/\./g,':');

                if (!eventSegmentList['$addToSet']["segments." + realEventKey]) {
                    eventSegmentList['$addToSet']["segments." + realEventKey] = {};
                }

                if (eventSegments[event]['meta.segments']) {
                    if (eventSegmentList['$addToSet']["segments." + realEventKey] && eventSegmentList['$addToSet']["segments." + realEventKey]["$each"]) {
                        common.arrayAddUniq(eventSegmentList['$addToSet']["segments." + realEventKey]["$each"], eventSegments[event]['meta.segments']["$each"]);
                    } else {
                        eventSegmentList['$addToSet']["segments." + realEventKey] = eventSegments[event]['meta.segments'];
                    }
                }
            }

            common.db.collection('events').update({'_id': params.app_id}, eventSegmentList, {'upsert': true}, function(err, res){});
        }
    }

    function mergeEvents(firstObj, secondObj) {
        for (var firstLevel in secondObj) {

            if (!secondObj.hasOwnProperty(firstLevel)) {
                continue;
            }

            if (!firstObj[firstLevel]) {
                firstObj[firstLevel] = secondObj[firstLevel];
                continue;
            }

            for (var secondLevel in secondObj[firstLevel]) {

                if (!secondObj[firstLevel].hasOwnProperty(secondLevel)) {
                    continue;
                }

                if (firstObj[firstLevel][secondLevel]) {
                    firstObj[firstLevel][secondLevel] += secondObj[firstLevel][secondLevel];
                } else {
                    firstObj[firstLevel][secondLevel] = secondObj[firstLevel][secondLevel];
                }
            }
        }
    }

}(countlyEvents));

module.exports = countlyEvents;