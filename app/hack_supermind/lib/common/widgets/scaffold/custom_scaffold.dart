import 'package:flutter/material.dart';
import 'package:hack_supermind/core/configs/assets/app_images.dart';

class CustomScaffold extends StatelessWidget {
  final Widget body;
  final PreferredSizeWidget? appBar;
  final Widget? floatingActionButton;

  const CustomScaffold({
    super.key,
    required this.body,
    this.appBar,
    this.floatingActionButton,
  });

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: appBar,
      body: Stack(
        children: [
          Positioned.fill(
            child: Opacity(
              opacity: 0.1,
              child: Image.asset(
                AppImages.background2,
                fit: BoxFit.cover,
              ),
            ),
          ),
          SafeArea(child: body),
        ],
      ),
      floatingActionButton: floatingActionButton,
    );
  }
}
