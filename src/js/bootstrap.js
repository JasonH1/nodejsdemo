(function() {
  jsonp = function (url, callback) {
    var script = document.createElement("script");
    var head = document.getElementsByTagName('head')[0];
    script.type = "text/javascript";
    script.src = url;
    head.insertBefore(script, head.firstChild);
    script.onload = function () {
      callback && callback();
      callback = null;
    };
    script.onreadystate = function () {
      if (this.readyState == 'complete') {
        callback && callback();
        callback = null;
      }
    };
  };

  console.log('bootstrap');
  //console.log(document.currentScript.getAttribute('source'));
  //console.log(document.currentScript.getAttribute('data-source'));
  //var target = document.createElement('div');
  //target.setAttribute('data-celeb-name', 'justin-bieber');
  //target.setAttribute('style', 'width: 600px; height:400px;');
  //target.setAttribute('id', 'visualization');

  jsonp('https://www.google.com/jsapi', function() {
    //var target = document.createElement('div');
    //target.setAttribute('data-celeb-name', 'justin-bieber');
    //target.setAttribute('style', 'width: 600px; height:400px;');
    //target.setAttribute('id', 'visualization');
    //document.currentScript.parentNode.insertAfter(target,document.currentScript);
    document.write('<div id="visualization" data-celeb-name="justin-bieber"></div>');

    //document.body.appendChild(target);
    var el = document.createElement('script');
    el.setAttribute('type','application/dart');
    el.setAttribute('src','/dart-charts/build/web/charts/line/linechart.dart');
    document.body.appendChild(el);
    var el = document.createElement('script');
    el.setAttribute('src','/js/dart.js');
    document.body.appendChild(el);
  })


})(document);