import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:soul_buddy/common/widgets/scaffold/custom_scaffold.dart';
import 'package:soul_buddy/core/configs/themes/app_colors.dart';
import 'package:soul_buddy/core/configs/themes/app_theme.dart';

class LoginScreen extends StatefulWidget {
  const LoginScreen({super.key});

  @override
  State<LoginScreen> createState() => _LoginScreenState();
}

class _LoginScreenState extends State<LoginScreen> {
  bool _isFocused = false;

  @override
  Widget build(BuildContext context) {
    return CustomScaffold(
      body: SafeArea(
        child: Column(
          children: [
            Text('Sign Up',
                style: GoogleFonts.plusJakartaSans(
                  fontSize: 24,
                )),
            Form(
              child: Column(
                children: [
                  Padding(
                    padding: const EdgeInsets.symmetric(
                        horizontal: 20, vertical: 10),
                    child: Focus(
                      onFocusChange: (hasFocus) {
                        setState(() {
                          _isFocused = hasFocus;
                        });
                      },
                      child: AnimatedContainer(
                        duration: const Duration(milliseconds: 300),
                        decoration: BoxDecoration(
                            color: Colors.white,
                            borderRadius: BorderRadius.circular(
                                AppTheme.defaultHighBorderRadius),
                            boxShadow: [
                              BoxShadow(
                                color: AppColors.woodsmoke,
                                blurRadius: 0,
                                spreadRadius: 0,
                                offset:
                                    _isFocused ? Offset(1, 1) : Offset(3, 3),
                              ),
                            ]),
                        child: TextFormField(
                          decoration: InputDecoration(
                              hintText: 'Type here',
                              labelText: 'Email',
                              contentPadding: const EdgeInsets.all(20),
                              labelStyle: GoogleFonts.plusJakartaSans(
                                color:
                                    AppColors.woodsmoke, // Default label color
                              ),
                              focusedBorder: OutlineInputBorder(
                                borderRadius: BorderRadius.circular(
                                  AppTheme.defaultHighBorderRadius,
                                ),
                                borderSide: BorderSide(
                                  // color: AppColors.startship,
                                  color: AppColors.woodsmoke,
                                  width: AppTheme.defaultBorderWidth,
                                ),
                              ),
                              enabledBorder: OutlineInputBorder(
                                borderRadius: BorderRadius.circular(
                                  AppTheme.defaultHighBorderRadius,
                                ),
                                borderSide: BorderSide(
                                  color: AppColors.woodsmoke,
                                  width: AppTheme.defaultBorderWidth,
                                ),
                              ),
                              border: OutlineInputBorder()),
                        ),
                      ),
                    ),
                  )
                ],
              ),
            )
          ],
        ),
      ),
    );
  }
}
