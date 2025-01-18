import 'package:flutter/material.dart';
import 'package:web_socket_channel/web_socket_channel.dart';
import 'dart:convert';
import 'package:http/http.dart' as http;

// Message model to handle different types of messages
class ChatMessage {
  final String text;
  final bool isUser;

  ChatMessage({required this.text, required this.isUser});
}

class Home extends StatefulWidget {
  const Home({Key? key}) : super(key: key);

  @override
  _HomeState createState() => _HomeState();
}

class _HomeState extends State<Home> {
  // State variables
  final List<ChatMessage> _messages = [];
  final TextEditingController _inputController = TextEditingController();
  bool _isExpanded = false;
  bool _isLoading = false;
  String? _error;
  String? _requestId;
  WebSocketChannel? _channel;
  final ScrollController _scrollController = ScrollController();
  bool _welcomeMessageShown = false;

  @override
  void initState() {
    super.initState();
    _connectWebSocket();
  }

  // Initialize WebSocket connection
  void _connectWebSocket() {
    _channel = WebSocketChannel.connect(
      Uri.parse('wss://8f07-13-51-196-191.ngrok-free.app'),
    );

    _channel?.stream.listen((message) {
      final data = jsonDecode(message);

      if (data['type'] == 'requestId') {
        setState(() => _requestId = data['requestId']);
      } else if (data['type'] == 'response') {
        setState(() {
          _messages.add(ChatMessage(text: data['message'], isUser: false));
          _isLoading = false;
        });
        _scrollToBottom();
      } else if (data['type'] == 'error') {
        setState(() {
          _error = data['message'];
          _isLoading = false;
        });
      }
    }, onError: (error) {
      setState(() {
        _error = 'WebSocket connection error';
        _isLoading = false;
      });
    });
  }

  // Show welcome message when chat is opened
  void _showWelcomeMessage() {
    if (!_welcomeMessageShown) {
      setState(() {
        _messages.add(
          ChatMessage(
            text:
                'Hello, I am your AI assistant to help you with your social media analytics',
            isUser: false,
          ),
        );
        _welcomeMessageShown = true;
      });
    }
  }

  // Send message to the server
  Future<void> _sendMessage() async {
    final message = _inputController.text.trim();
    if (message.isEmpty || _requestId == null || _isLoading) return;

    setState(() {
      _isLoading = true;
      _error = null;
      _messages.add(ChatMessage(text: message, isUser: true));
      _inputController.clear();
    });

    try {
      final response = await http.post(
        Uri.parse('https://8f07-13-51-196-191.ngrok-free.app/chat'),
        headers: {'Content-Type': 'application/json'},
        body: jsonEncode({
          'input_value': message,
          'requestId': _requestId,
        }),
      );

      if (response.statusCode != 200) {
        throw Exception('Failed to send message');
      }
    } catch (e) {
      setState(() {
        _error = e.toString();
        _isLoading = false;
      });
    }
  }

  void _scrollToBottom() {
    WidgetsBinding.instance.addPostFrameCallback((_) {
      if (_scrollController.hasClients) {
        _scrollController.animateTo(
          _scrollController.position.maxScrollExtent,
          duration: const Duration(milliseconds: 300),
          curve: Curves.easeOut,
        );
      }
    });
  }

  @override
  Widget build(BuildContext context) {
    if (!_isExpanded) {
      return Positioned(
        bottom: 24,
        right: 24,
        child: FloatingActionButton(
          backgroundColor: Colors.blue[600],
          child: const Icon(Icons.message, color: Colors.white),
          onPressed: () {
            setState(() {
              _isExpanded = true;
              _showWelcomeMessage();
            });
          },
        ),
      );
    }

    return Positioned(
      bottom: 24,
      right: 24,
      child: Card(
        elevation: 8,
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
        child: Container(
          width: 380,
          height: 600,
          decoration: BoxDecoration(
            borderRadius: BorderRadius.circular(12),
            color: Colors.white,
          ),
          child: Column(
            children: [
              // Header
              Container(
                padding:
                    const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
                decoration: BoxDecoration(
                  color: Colors.blue[600],
                  borderRadius:
                      const BorderRadius.vertical(top: Radius.circular(12)),
                ),
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    const Text(
                      'Analytics Assistant',
                      style: TextStyle(
                        color: Colors.white,
                        fontSize: 18,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                    IconButton(
                      icon: const Icon(Icons.close, color: Colors.white),
                      onPressed: () => setState(() => _isExpanded = false),
                    ),
                  ],
                ),
              ),

              // Chat messages
              Expanded(
                child: ListView.builder(
                  controller: _scrollController,
                  padding: const EdgeInsets.all(16),
                  itemCount: _messages.length,
                  itemBuilder: (context, index) {
                    final message = _messages[index];
                    return Align(
                      alignment: message.isUser
                          ? Alignment.centerRight
                          : Alignment.centerLeft,
                      child: Container(
                        margin: const EdgeInsets.only(bottom: 8),
                        padding: const EdgeInsets.symmetric(
                          horizontal: 16,
                          vertical: 10,
                        ),
                        decoration: BoxDecoration(
                          color: message.isUser
                              ? Colors.blue[600]
                              : Colors.grey[100],
                          borderRadius: BorderRadius.circular(12),
                        ),
                        constraints: BoxConstraints(
                          maxWidth: MediaQuery.of(context).size.width * 0.7,
                        ),
                        child: Text(
                          message.text,
                          style: TextStyle(
                            color: message.isUser ? Colors.white : Colors.black,
                          ),
                        ),
                      ),
                    );
                  },
                ),
              ),

              // Error message
              if (_error != null)
                Container(
                  margin: const EdgeInsets.all(8),
                  padding: const EdgeInsets.all(8),
                  decoration: BoxDecoration(
                    color: Colors.red[50],
                    borderRadius: BorderRadius.circular(8),
                    border: Border.all(color: Colors.red[200]!),
                  ),
                  child: Text(
                    _error!,
                    style: TextStyle(color: Colors.red[600], fontSize: 12),
                  ),
                ),

              // Loading indicator
              if (_isLoading)
                Container(
                  padding: const EdgeInsets.all(8),
                  child: Row(
                    mainAxisSize: MainAxisSize.min,
                    children: const [
                      SizedBox(
                        width: 16,
                        height: 16,
                        child: CircularProgressIndicator(strokeWidth: 2),
                      ),
                      SizedBox(width: 8),
                      Text('Processing...'),
                    ],
                  ),
                ),

              // Input field
              Container(
                padding: const EdgeInsets.all(8),
                decoration: BoxDecoration(
                  color: Colors.grey[50],
                  borderRadius: const BorderRadius.vertical(
                    bottom: Radius.circular(12),
                  ),
                ),
                child: Row(
                  children: [
                    Expanded(
                      child: TextField(
                        controller: _inputController,
                        decoration: const InputDecoration(
                          hintText: 'Ask about your analytics...',
                          border: OutlineInputBorder(),
                          contentPadding: EdgeInsets.symmetric(
                            horizontal: 12,
                            vertical: 8,
                          ),
                        ),
                        onSubmitted: (_) => _sendMessage(),
                      ),
                    ),
                    const SizedBox(width: 8),
                    IconButton(
                      icon: const Icon(Icons.send),
                      color: Colors.blue[600],
                      onPressed: _isLoading ? null : _sendMessage,
                    ),
                  ],
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }

  @override
  void dispose() {
    _inputController.dispose();
    _scrollController.dispose();
    _channel?.sink.close();
    super.dispose();
  }
}
