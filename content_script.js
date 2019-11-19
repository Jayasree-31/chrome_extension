chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    // listen for messages sent from background.js
    var response;
    if (request.message === 'hello!') {
      // var product_id = get_product_id(request.url);
      var promise = makeXhrRequestForRelatedProducts(request.url);
      promise.then(function(result) {
        response = {"success": true, "products": result};
        sendResponse(response);
      }, function(error){
        response = {"success": false, "error": error};
        sendResponse(response);
      });
      return true
    };
});


// function get_product_id(url){
//   var loc = new URL(url);
//   var pathname = loc.pathname;
//   var product_id = pathname.split("/")[2];
//   return product_id;
// };

function makeXhrRequestForRelatedProducts(url) {
  var loc = new URL(url);
  var pathname = loc.pathname;
  var product_id = pathname.split("/")[2];
  var hostname = loc.hostname;
  var requestUrl = "http://localhost:3001/api/v1/products/" + product_id + "/related_products?access_token="
  if(hostname == "test.supplythis.com"){
    var requestUrl = "http://apitest.supplythis.com/api/v1/products/" + product_id + "/related_products?access_token="
  }
  return makeXhrRequest('GET', requestUrl)
    .then((data) => {
      return data
    })
    .catch(err => {
      console.error('Error: ', err);
    });
};


function makeXhrRequest(method, url) {
  return new Promise((resolve, reject) => {
    let xhr = new XMLHttpRequest();
    xhr.open(method, url, true);
    xhr.onload = function(){
      if (xhr.status >= 200 && xhr.status < 300){
        return resolve(xhr.response);
      } else {
        reject(
          Error(
            JSON.stringify(
              {
                status: xhr.status,
                statusTextInElse: xhr.statusText
              }
            )
          )
        )
      }
    }
    xhr.onerror = function(){
      reject(
        Error(
          JSON.stringify(
            {
              status: xhr.status,
              statusTextInElse: xhr.statusText
            }
          )
        )
      )
    }
    xhr.send()
  })
}
