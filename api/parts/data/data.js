var data = {},
  ES = require('elasticsearch'),
  elasticClient = new ES.Client({host: 'localhost:9200'});


//this is where the data indexed in
function objInElastic(customizedEvent, date) {
  var index_name = 'countly';
  var objIn = {
    //where you can change index name looks like
    //for example, u can add "alpha" or change time suffix
    index: index_name.concat('_', customizedEvent.app_id, '_', customizedEvent.time_daily),
    type: customizedEvent.event.key,
    id: customizedEvent.timestamp_num,
    timestamp: date,
    body: customizedEvent
  };
  objIn.body.event.key_ana = objIn.body.event.key;
  if (objIn.body.event.segmentation != undefined) {
    objIn.body.event.segmentation.name_ana = objIn.body.event.segmentation.name;
    objIn.body.event.segmentation.TYPE_ana = objIn.body.event.segmentation.TYPE;
    objIn.body.event.segmentation.IMG_ID_ana = objIn.body.event.segmentation.IMG_ID;
  }
  return objIn;
}

//define the type before you index the data in elastic
function mapElastic(objIn) {
  var mapping = {
    index: objIn.index,
    type: objIn.type,
    body: {
      [objIn.type]: {
        properties: {
          event: {
            properties: {
              dur: {
                type: "double"
              },
              key: {
                type: "string",
                index: "not_analyzed"
              },
              key_ana: {
                type: "string"
              },
              segmentation: {
                properties: {
                  name: {
                    type: "string",
                    index: "not_analyzed"
                  },
                  TYPE: {
                    type: "string",
                    index: "not_analyzed"
                  },
                  IMG_ID: {
                    type: "string",
                    index: "not_analyzed"
                  },
                  name_ana: {
                    type: "string"
                  },
                  TYPE_ana: {
                    type: "string"
                  },
                  IMG_ID_ana: {
                    type: "string"
                  }
                }
              }
            }
          }
        }
      }
    }
  };
  return mapping;
}


data.send = function (params) {
  params.qstring.events.forEach(function saveElasticSearch (currEvent){
    var date = new Date(params.time.timestamp * 1000);

    var _customizedEvent = {
      app_id: params.app_id,
      ip_addr: params.ip_address,
      timestamp_num: params.time.timestamp,
      timestamp_dat: date,
      time_daily: params.time.daily,
      event: currEvent,
      app_user: params.app_user,
      app_user_id: params.app_user._id,
      app_user_cc: params.app_user.cc
    };

    var objIn = objInElastic(_customizedEvent, date);
    var mapping = mapElastic(objIn);

    elasticClient.indices.create({
        index: objIn.index
      },
      function (error, response) {
        //console.log('Elastic create error:', error);
        //console.log('Elastic create response:', response);
        elasticClient.indices.putMapping(
          mapping,
          function (error, response) {
            //console.log('Elastic putMapping error:', error);
            //console.log('Elastic putMapping response:', response);
            elasticClient.index(
              objIn,
              function (error, response) {
                //console.log('Elastic index error:', error);
                //console.log('Elastic index response:', response);
              }
            );
          }
        );
      }
    );
  });
};

module.exports = data; 
