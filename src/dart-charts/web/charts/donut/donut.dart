import 'dart:html';
import 'package:js/js.dart' as js;
import 'dart:convert' show JSON;
import 'dart:async' show Future;

void drawVisualization() {
  var gviz = js.context.google.visualization;
  
  Chart.loadFutureData()
      .then((_) {
        //on success
        var arrayData = js.array(Chart.data);
        //print(Chart.data);
        var tableData = gviz.arrayToDataTable(arrayData);
        var options = js.map({
            'legend': 'none',
            'pieSliceText': 'none',
            'pieHole': 0.5,
            'slices': {0: {'color': '#D8D8D8'}, 1: {'color': '#9cbc82'}},
            'width': '160'
        });
        // Create and draw the visualization.
        var chart = new js.Proxy(gviz.PieChart, querySelector('#visualization'));
        chart.draw(tableData, options);
        
      })
      .catchError((arrr) {
        print('Error loading data: $arrr');
      });
}

class Chart {
  static var data;
  static Future loadFutureData() {
      String path = 'data.json';
      return HttpRequest.getString(path)
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
