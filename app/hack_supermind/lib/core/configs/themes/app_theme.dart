import 'package:flutter/material.dart';
import 'package:hack_supermind/core/configs/themes/app_colors.dart';

class AppTheme {
  static final lightTheme = ThemeData(
    brightness: Brightness.light,
    fontFamily: 'Gilroy',
    scaffoldBackgroundColor: AppColors.mystic,
    primaryColor: AppColors.startship,
    colorScheme: ColorScheme.light(
      primary: AppColors.startship,
      secondary: AppColors.startship,
    ),
  );

  static const double defaultBorderWidth = 4.0;
  static const double defaultHighBorderRadius = 16.0;
}
