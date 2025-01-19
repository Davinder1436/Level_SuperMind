import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';
import 'package:soul_buddy/core/configs/themes/app_colors.dart';
import 'package:soul_buddy/core/configs/themes/app_theme.dart';

class CustomTextField extends StatelessWidget {
  final String label;
  final TextEditingController controller;
  final String? Function(String?)? validator;
  final bool isPassword;
  final TextInputType? keyboardType;

  const CustomTextField({
    Key? key,
    required this.label,
    required this.controller,
    this.validator,
    this.isPassword = false,
    this.keyboardType,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 8.0),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            label,
            style: const TextStyle(
              fontSize: 16,
              fontWeight: FontWeight.bold,
              color: AppColors.woodsmoke,
            ),
          ),
          const SizedBox(height: 8),
          TextFormField(
            controller: controller,
            validator: validator,
            obscureText: isPassword,
            keyboardType: keyboardType,
            decoration: InputDecoration(
              filled: true,
              fillColor: Colors.white,
              border: OutlineInputBorder(
                borderRadius:
                    BorderRadius.circular(AppTheme.defaultHighBorderRadius),
                borderSide: BorderSide(
                  color: AppColors.woodsmoke,
                  width: AppTheme.defaultBorderWidth,
                ),
              ),
              enabledBorder: OutlineInputBorder(
                borderRadius:
                    BorderRadius.circular(AppTheme.defaultHighBorderRadius),
                borderSide: const BorderSide(
                  color: AppColors.woodsmoke,
                  width: AppTheme.defaultBorderWidth,
                ),
              ),
            ),
          ),
        ],
      ),
    );
  }
}
