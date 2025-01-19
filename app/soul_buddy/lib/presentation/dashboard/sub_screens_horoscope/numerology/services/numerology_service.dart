import 'dart:convert';
import 'package:http/http.dart' as http;

class NumerologyService {
  static const String apiUrl =
      "https://bb51-13-51-200-36.ngrok-free.app/api/numero_table";

  Future<Map<String, dynamic>> fetchNumerologyData(
      String userId, String token) async {
    final headers = {
      "Authorization": "Bearer $token",
      "Content-Type": "application/json",
    };

    // Convert the userId into query parameters
    final uri = Uri.parse(apiUrl).replace(
      queryParameters: {
        "userId": userId,
      },
    );

    final response = await http.get(
      uri,
      headers: headers,
    );

    if (response.statusCode == 200) {
      print(response.body);
      return jsonDecode(response.body);
    } else {
      print('Error: ${response.statusCode}');
      print('Response body: ${response.body}');
      throw Exception(
          'Failed to fetch numerology data: ${response.statusCode}');
    }
  }
}
// import 'dart:convert';
// import 'package:http/http.dart' as http;

// class NumerologyService {
//   static const String apiUrl =
//       "https://bb51-13-51-200-36.ngrok-free.app/api/numero_table";

//   Future<Map<String, dynamic>> fetchNumerologyData(
//       Map<String, String> data, String token) async {
//     print(token);

//     final headers = {
//       "Authorization": "Bearer $token",
//       "Content-Type": "application/json",
//     };

//     // Add query parameters to the URI
//     final uri = Uri.parse(apiUrl).replace(queryParameters: data);

//     try {
//       final response = await http.get(uri, headers: headers);

//       if (response.statusCode == 200) {
//         return jsonDecode(response.body);
//       } else {
//         throw Exception(
//           'Failed to fetch numerology data: ${response.statusCode} - ${response.body}',
//         );
//       }
//     } catch (e) {
//       throw Exception('An error occurred: $e');
//     }
//   }
// }
