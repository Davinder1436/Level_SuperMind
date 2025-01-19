import 'dart:convert';
import 'package:http/http.dart' as http;

class KundaliApiService {
  static const String userId = '636907';
  static const String apiKey = '62d455596d98a3409b38224d3a9849fd1b794105';
  static const String language = 'en'; // Default is 'en'
  static const String defaultChartID = 'D7'; // Default is 'en'

  Future<String> fetchSvgChart(int day, int month, int year, int hour, int min,
      double lat, double lon, double tzone) async {
    final String api = 'horo_chart_image/:$defaultChartID';
    final String apiUrl = 'https://json.astrologyapi.com/v1/$api';

    final data = {
      'day': day,
      'month': month,
      'year': year,
      'hour': hour,
      'min': min,
      'lat': lat,
      'lon': lon,
      'tzone': tzone,
    };
    final String auth = "Basic " + base64Encode(utf8.encode('$userId:$apiKey'));
    final response = await http.post(
      Uri.parse(apiUrl),
      headers: {
        'Authorization': auth,
        'Content-Type': 'application/json',
        'Accept-Language': language,
      },
      body: jsonEncode(data),
    );

    if (response.statusCode == 200) {
      final Map<String, dynamic> responseBody = jsonDecode(response.body);
      return responseBody['svg']; // Extract the "svg" field
    } else {
      throw Exception('Failed to load chart');
    }
  }
}
