let page = document.getElementsByClassName("navbar row")[0];
let searchBar = document.getElementsByClassName("st-search")[0];
let wrapper = document.getElementsByClassName("wrapper")[0];
if(products != undefined){
  var proObj = JSON.parse(products);
  var products = proObj.products;
  if (products != undefined){
    page.style.marginTop = "47px";
    searchBar.style.marginTop = "47px";
    wrapper.style.marginTop = "80px";
    var html = '<div class="navbar rel-pro"><div class="rp-txt">Related Products Available</div><div class="dropdown rp-dp"><button class="dropbtn">' + products.length + ' Products found<i class="fa fa-caret-down"></i></button><div class="dropdown-content"><ul class="rl-pro-list">'
    for (var index in products) {
      var product = products[index];
        html +=  "<li><div class='pro-list'><div class='pr-img'><img src='" + product.imageUrl + "'></div><div class='pr-name'>" + product.name + "<br/>Mfg: "+ product.manufacturer + "<br/>MRP: Rs." + product.price +"</div></div></li>"
    };
    html += '</ul></div></div><div class="rel-pro-cls"> ×</div></div>';
    appendHtml(wrapper, html);
    document.getElementsByClassName("rel-pro-cls")[0].addEventListener("click", closeNavbar);
  }
}

function appendHtml(el, str) {
  var div = document.createElement('div');
  div.className = "rel-pro-navbar";
  div.setAttribute('id', 'rel-pro-id');
  div.innerHTML = str;
  el.parentNode.insertBefore(div, el);
}

function closeNavbar(){
  var navbar = document.getElementById("rel-pro-id");
  navbar.style.display = "none";
  page.style.marginTop = "0px";
  searchBar.style.marginTop = "0px";
  wrapper.style.marginTop = "0px";
}
