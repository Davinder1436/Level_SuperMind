import 'package:flutter/material.dart';
import 'package:hack_supermind/core/configs/themes/app_theme.dart';
import 'package:hack_supermind/core/configs/themes/app_colors.dart';

class BasicAnimatedContainer extends StatefulWidget {
  const BasicAnimatedContainer(
      {super.key, this.onPressed, required this.customWidget});
  final VoidCallback? onPressed;
  final Widget customWidget;
  @override
  State<BasicAnimatedContainer> createState() => _BasicAnimatedContainerState();
}

class _BasicAnimatedContainerState extends State<BasicAnimatedContainer> {
  bool _isPressed = false;
  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTapDown: (_) {
        setState(() {
          _isPressed = true;
        });
      },
      onTapUp: (_) {
        setState(() {
          _isPressed = false;
        });
      },
      onTapCancel: () {
        setState(() {
          _isPressed = false;
        });
      },
      onTap: widget.onPressed ?? () {},
      child: AnimatedContainer(
          duration: const Duration(milliseconds: 100),
          padding: _isPressed
              ? const EdgeInsets.symmetric(horizontal: 18, vertical: 8)
              : const EdgeInsets.symmetric(horizontal: 20, vertical: 10),
          decoration: BoxDecoration(
            boxShadow: [
              BoxShadow(
                color: AppColors.woodsmoke,
                blurRadius: 0,
                spreadRadius: 0,
                offset: _isPressed ? const Offset(1, 1) : const Offset(3, 3),
              ),
            ],
            color: AppColors.startship,
            borderRadius:
                BorderRadius.circular(AppTheme.defaultHighBorderRadius),
            border: Border.all(
                color: AppColors.woodsmoke, width: AppTheme.defaultBorderWidth),
          ),
          child: widget.customWidget),
    );
  }
}
