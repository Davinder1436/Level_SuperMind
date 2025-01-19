import 'package:flutter/material.dart';
import 'package:soul_buddy/core/configs/themes/app_colors.dart';
import 'package:soul_buddy/core/configs/themes/app_theme.dart';

class BasicAnimatedContainer extends StatefulWidget {
  const BasicAnimatedContainer(
      {super.key,
      this.onPressed,
      required this.customWidget,
      this.color,
      this.lightOffset});
  final VoidCallback? onPressed;
  final Widget customWidget;
  final Color? color;
  final bool? lightOffset;
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
                  offset: (widget.lightOffset ?? false)
                      ? Offset(1, 1)
                      : (_isPressed ? const Offset(1, 1) : const Offset(3, 3))),
            ],
            color: widget.color ?? AppColors.startship,
            borderRadius:
                BorderRadius.circular(AppTheme.defaultHighBorderRadius),
            border: Border.all(
                color: AppColors.woodsmoke, width: AppTheme.defaultBorderWidth),
          ),
          child: widget.customWidget),
    );
  }
}
