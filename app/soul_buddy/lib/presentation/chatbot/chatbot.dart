// import 'package:flutter/material.dart';
// import 'package:web_socket_channel/web_socket_channel.dart';
// import 'dart:convert';
// import 'package:http/http.dart' as http;

// class ChatMessage {
//   final String text;
//   final bool isUser;

//   ChatMessage({required this.text, required this.isUser});
// }

// class ChatbotScreen extends StatefulWidget {
//   const ChatbotScreen({super.key});

//   @override
//   _ChatbotScreenState createState() => _ChatbotScreenState();
// }

// class _ChatbotScreenState extends State<ChatbotScreen> {
//   final List<ChatMessage> _messages = [];
//   final TextEditingController _inputController = TextEditingController();
//   bool _isExpanded = true;
//   bool _isLoading = false;
//   String? _error;
//   String? _requestId;
//   WebSocketChannel? _channel;
//   final ScrollController _scrollController = ScrollController();
//   bool _welcomeMessageShown = false;

//   @override
//   void initState() {
//     super.initState();
//     _connectWebSocket();
//     setState(() {
//       _messages.add(
//         ChatMessage(
//           text: '''
// ✨ Namaste and Welcome to SoulBuddy! ✨
// I’m here to guide you with insights from astrology, numerology, and spirituality.
// 🌟 Share your birth details or ask your questions, and let’s uncover the wisdom you need on your journey. 🙏
// How can I assist you today? 🌸''',
//           isUser: false,
//         ),
//       );
//       _welcomeMessageShown = true;
//     });
//   }

//   // Initialize WebSocket connection
//   void _connectWebSocket() {
//     try {
//       _channel = WebSocketChannel.connect(
//         Uri.parse('wss://a9ae-13-51-200-36.ngrok-free.app'),
//       );

//       _channel?.stream.listen((message) {
//         final data = jsonDecode(message);
//         print(data);

//         if (data['type'] == 'requestId') {
//           setState(() => _requestId = data['requestId']);
//         } else if (data['type'] == 'response') {
//           setState(() {
//             _messages.add(ChatMessage(text: data['message'], isUser: false));
//             _isLoading = false;
//           });
//           _scrollToBottom();
//         } else if (data['type'] == 'error') {
//           setState(() {
//             _error = data['message'];
//             _isLoading = false;
//           });
//         }
//       }, onError: (error) {
//         setState(() {
//           _error = 'WebSocket connection error: $error';
//           _isLoading = false;
//         });
//       });
//     } catch (e) {
//       setState(() {
//         _error = 'Failed to connect to WebSocket: $e';
//       });
//       _retryConnection();
//     }
//   }

//   // Retry WebSocket connection if failed
//   void _retryConnection() {
//     Future.delayed(Duration(seconds: 5), () {
//       if (_error != null) {
//         setState(() {
//           _error = null;
//         });
//       }
//       _connectWebSocket();
//     });
//   }

//   void _showWelcomeMessage() {
//     if (!_welcomeMessageShown) {}
//   }

//   // Send message to the server
//   Future<void> _sendMessage() async {
//     final message = _inputController.text.trim();
//     if (message.isEmpty || _requestId == null || _isLoading) return;

//     setState(() {
//       _isLoading = true;
//       _error = null;
//       _messages.add(ChatMessage(text: message, isUser: true));
//       _inputController.clear();
//     });

//     try {
//       final response = await http.post(
//         Uri.parse('https://a9ae-13-51-200-36.ngrok-free.app/api/chat'),
//         headers: {'Content-Type': 'application/json'},
//         body: jsonEncode({
//           'input_value': message,
//           'requestId': _requestId,
//         }),
//       );

//       if (response.statusCode != 200) {
//         throw Exception('Failed to send message');
//       }
//     } catch (e) {
//       setState(() {
//         _error = e.toString();
//         _isLoading = false;
//       });
//     }
//   }

//   void _scrollToBottom() {
//     WidgetsBinding.instance.addPostFrameCallback((_) {
//       if (_scrollController.hasClients) {
//         _scrollController.animateTo(
//           _scrollController.position.maxScrollExtent,
//           duration: const Duration(milliseconds: 300),
//           curve: Curves.easeOut,
//         );
//       }
//     });
//   }

//   @override
//   Widget build(BuildContext context) {
//     if (!_isExpanded) {
//       return Positioned(
//         bottom: 24,
//         right: 24,
//         child: FloatingActionButton(
//           backgroundColor: Colors.blue[600],
//           child: const Icon(Icons.message, color: Colors.white),
//           onPressed: () {
//             setState(() {
//               _isExpanded = true;
//               _showWelcomeMessage();
//             });
//           },
//         ),
//       );
//     }

//     return Positioned(
//       bottom: 24,
//       right: 24,
//       child: Card(
//         elevation: 8,
//         shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
//         child: Container(
//           width: 380,
//           height: 600,
//           decoration: BoxDecoration(
//             borderRadius: BorderRadius.circular(12),
//             color: Colors.white,
//           ),
//           child: Column(
//             children: [
//               // Header
//               Container(
//                 padding:
//                     const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
//                 decoration: BoxDecoration(
//                   color: Colors.blue[600],
//                   borderRadius:
//                       const BorderRadius.vertical(top: Radius.circular(12)),
//                 ),
//                 child: Row(
//                   mainAxisAlignment: MainAxisAlignment.spaceBetween,
//                   children: [
//                     const Text(
//                       'Analytics Assistant',
//                       style: TextStyle(
//                         color: Colors.white,
//                         fontSize: 18,
//                         fontWeight: FontWeight.bold,
//                       ),
//                     ),
//                     IconButton(
//                       icon: const Icon(Icons.close, color: Colors.white),
//                       onPressed: () => setState(() => _isExpanded = false),
//                     ),
//                   ],
//                 ),
//               ),

//               // Chat messages
//               Expanded(
//                 child: ListView.builder(
//                   controller: _scrollController,
//                   padding: const EdgeInsets.all(16),
//                   itemCount: _messages.length,
//                   itemBuilder: (context, index) {
//                     final message = _messages[index];
//                     return Align(
//                       alignment: message.isUser
//                           ? Alignment.centerRight
//                           : Alignment.centerLeft,
//                       child: Container(
//                         margin: const EdgeInsets.only(bottom: 8),
//                         padding: const EdgeInsets.symmetric(
//                           horizontal: 16,
//                           vertical: 10,
//                         ),
//                         decoration: BoxDecoration(
//                           color: message.isUser
//                               ? Colors.blue[600]
//                               : Colors.grey[100],
//                           borderRadius: BorderRadius.circular(12),
//                         ),
//                         constraints: BoxConstraints(
//                           maxWidth: MediaQuery.of(context).size.width * 0.7,
//                         ),
//                         child: Text(
//                           message.text,
//                           style: TextStyle(
//                             color: message.isUser ? Colors.white : Colors.black,
//                           ),
//                         ),
//                       ),
//                     );
//                   },
//                 ),
//               ),

//               // Error message
//               if (_error != null)
//                 Container(
//                   margin: const EdgeInsets.all(8),
//                   padding: const EdgeInsets.all(8),
//                   decoration: BoxDecoration(
//                     color: Colors.red[50],
//                     borderRadius: BorderRadius.circular(8),
//                     border: Border.all(color: Colors.red[200]!),
//                   ),
//                   child: SelectableText(
//                     _error!,
//                     style: TextStyle(color: Colors.red[600], fontSize: 12),
//                   ),
//                 ),

//               // Loading indicator
//               if (_isLoading)
//                 Container(
//                   padding: const EdgeInsets.all(8),
//                   child: Row(
//                     mainAxisSize: MainAxisSize.min,
//                     children: const [
//                       SizedBox(
//                         width: 16,
//                         height: 16,
//                         child: CircularProgressIndicator(strokeWidth: 2),
//                       ),
//                       SizedBox(width: 8),
//                       Text('Processing...'),
//                     ],
//                   ),
//                 ),

//               // Input field
//               Container(
//                 padding: const EdgeInsets.all(8),
//                 decoration: BoxDecoration(
//                   color: Colors.grey[50],
//                   borderRadius: const BorderRadius.vertical(
//                     bottom: Radius.circular(12),
//                   ),
//                 ),
//                 child: Row(
//                   children: [
//                     Expanded(
//                       child: TextField(
//                         controller: _inputController,
//                         decoration: const InputDecoration(
//                           hintText: 'Ask about your analytics...',
//                           border: OutlineInputBorder(),
//                           contentPadding: EdgeInsets.symmetric(
//                             horizontal: 12,
//                             vertical: 8,
//                           ),
//                         ),
//                         onSubmitted: (_) => _sendMessage(),
//                       ),
//                     ),
//                     const SizedBox(width: 8),
//                     IconButton(
//                       icon: const Icon(Icons.send),
//                       color: Colors.blue[600],
//                       onPressed: _isLoading ? null : _sendMessage,
//                     ),
//                   ],
//                 ),
//               ),
//             ],
//           ),
//         ),
//       ),
//     );
//   }

//   @override
//   void dispose() {
//     _inputController.dispose();
//     _scrollController.dispose();
//     _channel?.sink.close();
//     super.dispose();
//   }
// }

import 'package:flutter/material.dart';
import 'package:flutter_markdown/flutter_markdown.dart';
import 'package:soul_buddy/common/widgets/containers/basic_animated_container.dart';
import 'package:soul_buddy/common/widgets/scaffold/custom_scaffold.dart';
import 'package:web_socket_channel/web_socket_channel.dart';
import 'dart:convert';
import 'package:http/http.dart' as http;
import 'package:soul_buddy/core/configs/themes/app_colors.dart';
import 'package:soul_buddy/core/configs/themes/app_theme.dart';

class ChatMessage {
  final String text;
  final bool isUser;

  ChatMessage({required this.text, required this.isUser});
}

class ChatbotScreen extends StatefulWidget {
  final Map userData;

  const ChatbotScreen({super.key, required this.userData});

  @override
  _ChatbotScreenState createState() => _ChatbotScreenState();
}

class _ChatbotScreenState extends State<ChatbotScreen> {
  final List<ChatMessage> _messages = [];
  final TextEditingController _inputController = TextEditingController();
  bool _isExpanded = true;
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
    setState(() {
      _messages.add(
        ChatMessage(
          text: '''
✨ Namaste and Welcome to SoulBuddy! ✨
I'm here to guide you with insights from astrology, numerology, and spirituality. 
🌟 Share your birth details or ask your questions, and let's uncover the wisdom you need on your journey. 🙏
How can I assist you today? 🌸''',
          isUser: false,
        ),
      );
      _welcomeMessageShown = true;
    });
  }

  // Initialize WebSocket connection
  void _connectWebSocket() {
    try {
      _channel = WebSocketChannel.connect(
        Uri.parse('wss://fc20-13-51-196-191.ngrok-free.app'),
      );

      _channel?.stream.listen((message) {
        final data = jsonDecode(message);
        print(data);

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
          _error = 'WebSocket connection error: $error';
          _isLoading = false;
        });
      });
    } catch (e) {
      setState(() {
        _error = 'Failed to connect to WebSocket: $e';
      });
      _retryConnection();
    }
  }

  // Retry WebSocket connection if failed
  void _retryConnection() {
    Future.delayed(Duration(seconds: 5), () {
      if (_error != null) {
        setState(() {
          _error = null;
        });
      }
      _connectWebSocket();
    });
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
        Uri.parse('https://fc20-13-51-196-191.ngrok-free.app/chat'),
        headers: {'Content-Type': 'application/json'},
        body: jsonEncode({
          'input_value': '''$message + {}'name': ${widget.userData['name']},
                  'month_of_birth': ${widget.userData['month_of_birth']},
                  'date_of_birth': ${widget.userData['date_of_birth']},
                  'year_of_birth': ${widget.userData['year_of_birth']},
                  'latitude': ${widget.userData['latitude']},
                  'longitude': ${widget.userData['longitude']},
                  'timezone': ${widget.userData['timezone']},
}''',
          'requestId': _requestId,
        }),
      );

      if (response.statusCode != 200) {
        print(response.body);
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

  // Widget _buildChatInterface() {
  //   return SizedBox(
  //     height: MediaQuery.of(context).size.height,
  //     width: MediaQuery.of(context).size.width,
  //     child:
  //   );
  // }

  @override
  Widget build(BuildContext context) {
    return CustomScaffold(
      appBar: AppBar(
        backgroundColor: AppColors.startship,

        // title: const Text('SoulBuddy Assistant'),
        title: Container(
          padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
          decoration: BoxDecoration(
            color: AppColors.startship,
            borderRadius: BorderRadius.vertical(
              top: Radius.circular(AppTheme.defaultHighBorderRadius),
            ),
          ),
          child: const Text(
            'SoulBuddy Assistant',
            style: TextStyle(
              color: AppColors.woodsmoke,
              fontSize: 18,
              fontWeight: FontWeight.bold,
            ),
          ),
        ),
      ),
      body: Stack(
        children: [
          if (!_isExpanded)
            Positioned(
              bottom: 24,
              right: 24,
              child: BasicAnimatedContainer(
                color: AppColors.startship,
                customWidget:
                    const Icon(Icons.message, color: AppColors.woodsmoke),
                onPressed: () {
                  setState(() {
                    _isExpanded = true;
                    // _showWelcomeMessage();
                  });
                },
              ),
            )
          else
            Container(
              decoration: BoxDecoration(
                // borderRadius:
                //     BorderRadius.circular(AppTheme.defaultHighBorderRadius),
                color: AppColors.mystic,
                // border: Border.all(
                //   color: AppColors.woodsmoke,
                //   width: AppTheme.defaultBorderWidth,
                // ),
                boxShadow: const [
                  BoxShadow(
                    color: AppColors.woodsmoke,
                    offset: Offset(3, 3),
                    blurRadius: 0,
                    spreadRadius: 0,
                  ),
                ],
              ),
              child: Column(
                children: [
                  // Header

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
                            child: BasicAnimatedContainer(
                              color: message.isUser
                                  ? AppColors.startship
                                  : AppColors.mystic,
                              customWidget: Container(
                                constraints: BoxConstraints(
                                  maxWidth:
                                      MediaQuery.of(context).size.width * 0.7,
                                ),
                                child: message.isUser
                                    ? Text(
                                        message.text,
                                        style: TextStyle(
                                          color: AppColors.woodsmoke,
                                        ),
                                      )
                                    : MarkdownBody(
                                        data: message.text,
                                        styleSheet: MarkdownStyleSheet(
                                          p: TextStyle(
                                              color: AppColors.woodsmoke),
                                          // Customize other styles as needed
                                        ),
                                      ),
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
                        borderRadius: BorderRadius.circular(
                            AppTheme.defaultHighBorderRadius),
                        border: Border.all(color: Colors.red),
                      ),
                      child: SelectableText(
                        _error!,
                        style: const TextStyle(color: Colors.red, fontSize: 12),
                      ),
                    ),

                  // Loading indicator
                  if (_isLoading)
                    Container(
                      padding: const EdgeInsets.all(8),
                      child: Row(
                        mainAxisSize: MainAxisSize.min,
                        children: [
                          const SizedBox(
                            width: 16,
                            height: 16,
                            child: CircularProgressIndicator(
                              valueColor: AlwaysStoppedAnimation<Color>(
                                  AppColors.startship),
                              strokeWidth: 2,
                            ),
                          ),
                          const SizedBox(width: 8),
                          Text(
                            'Processing...',
                            style: TextStyle(color: AppColors.woodsmoke),
                          ),
                        ],
                      ),
                    ),

                  // Input field
                  Container(
                    padding: const EdgeInsets.all(8),
                    decoration: BoxDecoration(
                      color: AppColors.mystic,
                      borderRadius: BorderRadius.vertical(
                        bottom: Radius.circular(
                            AppTheme.defaultHighBorderRadius - 4),
                      ),
                    ),
                    child: Row(
                      children: [
                        Expanded(
                          child: BasicAnimatedContainer(
                            color: AppColors.mystic,
                            customWidget: TextField(
                              controller: _inputController,
                              decoration: const InputDecoration(
                                hintText: 'Ask SoulBuddy...',
                                border: InputBorder.none,
                                contentPadding: EdgeInsets.symmetric(
                                  horizontal: 12,
                                  vertical: 8,
                                ),
                              ),
                              style: TextStyle(color: AppColors.woodsmoke),
                              onSubmitted: (_) => _sendMessage(),
                            ),
                          ),
                        ),
                        const SizedBox(width: 8),
                        BasicAnimatedContainer(
                          color: AppColors.startship,
                          customWidget: Icon(
                            Icons.send,
                            color: AppColors.woodsmoke,
                          ),
                          onPressed: _isLoading ? null : _sendMessage,
                        ),
                      ],
                    ),
                  ),
                ],
              ),
            ),
          // Positioned(
          //   bottom: 24,
          //   right: 24,
          //   // child: _buildChatInterface(),
          // ),
        ],
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
