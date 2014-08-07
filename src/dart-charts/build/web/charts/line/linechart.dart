import 'dart:html';
import 'package:js/js.dart' as js;
import 'dart:convert' show JSON;
import 'dart:async' show Future;

void drawVisualization() {
  var gviz = js.context.google.visualization;

  // Create and populate the data table.
  var ChartElement = querySelector('#visualization');
  var celeb = ChartElement.dataset['celeb-name'];
  
  print(celeb);
  
  Chart.loadFutureData(celeb)
      .then((_) {
        //on success
        var arrayData = js.array(Chart.data);
        //print(Chart.data);
        var tableData = gviz.arrayToDataTable(arrayData);
        var options = js.map({
          'title': 'Celebrity Daily Buzz Change ',
            'curveType': 'function',
            'legend': { 'position': 'bottom' }
        });
        // Create and draw the visualization.
        var chart = new js.Proxy(gviz.LineChart, querySelector('#visualization'));
        chart.draw(tableData, options);
        
      })
      .catchError((arrr) {
        print('Error loading data: $arrr');
      });
}

class Chart {
  static var data;
  static Future loadFutureData(String celeb) {
      //String path = 'data.json';
      return HttpRequest.getString('/buzz/' + celeb)
          .then(_cleanData);
    }
  static _cleanData(String jsonString) {
      data = JSON.decode(jsonString);
      print(data);
    }
}
main() {
  js.context.google.load('visualization', '1', js.map(
    {
      'packages': ['corechart'],
      'callback': drawVisualization,
    }));  
}
