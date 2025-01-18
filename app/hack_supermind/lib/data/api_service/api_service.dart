import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:web_socket_channel/web_socket_channel.dart';
import 'package:http/http.dart' as http;

class ApiService extends ChangeNotifier {
  final String _webSocketUrl = 'wss://8f07-13-51-196-191.ngrok-free.app';
  late WebSocketChannel _channel;
  String? requestId;
  List<Map<String, String>> messages = [];
  bool isLoading = false;
  String? error;

  void connect() {
    _channel = WebSocketChannel.connect(Uri.parse(_webSocketUrl));

    _channel.stream.listen(
      (data) {
        final jsonData = jsonDecode(data);
        if (jsonData['type'] == 'requestId') {
          requestId = jsonData['requestId'];
        } else if (jsonData['type'] == 'response') {
          messages.add({'text': jsonData['message'], 'type': 'response'});
          isLoading = false;
        } else if (jsonData['type'] == 'error') {
          error = jsonData['message'];
          isLoading = false;
        }
        notifyListeners();
      },
      onError: (error) {
        // Handle the error
        print('Error: $error');
      },
      onDone: () {
        // Handle the connection being closed
        print('Connection closed');
      },
    );
  }

  void disconnect() {
    _channel.sink.close();
  }

  void sendMessage(String message) {
    _channel.sink.add(message);
  }

  Future<void> sendHttpMessage(String inputMessage) async {
    if (inputMessage.trim().isEmpty || requestId == null || isLoading) return;

    try {
      isLoading = true;
      error = null;
      messages.add({'text': inputMessage, 'type': 'user'});

      final response = await http.post(
        Uri.parse('https://8f07-13-51-196-191.ngrok-free.app/chat'),
        headers: {'Content-Type': 'application/json'},
        body: jsonEncode({'input_value': inputMessage, 'requestId': requestId}),
      );

      if (response.statusCode != 200) throw Exception('Failed to send message');
    } catch (err) {
      error = err.toString();
      isLoading = false;
      notifyListeners();
    }
  }
}
