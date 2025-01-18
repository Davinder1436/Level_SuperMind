import 'package:flutter/material.dart';
import 'package:flutter_svg/svg.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:hack_supermind/common/widgets/containers/basic_animated_container.dart';
import 'package:hack_supermind/common/widgets/scaffold/custom_scaffold.dart';
import 'package:hack_supermind/core/configs/themes/app_theme.dart';
import 'package:hack_supermind/core/configs/assets/app_vector.dart';
import 'package:hack_supermind/core/configs/themes/app_colors.dart';
import 'package:hack_supermind/presentation/auth/signup.dart';
import 'dart:math' show pi;

import 'package:hack_supermind/presentation/onboard/onboarding_screen.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
        title: 'Supermind',
        theme: AppTheme.lightTheme,
        // home: const MyHomePage(title: 'Level Supermind'),
        home: OnboardingScreen());
  }
}

class MyHomePage extends StatefulWidget {
  const MyHomePage({super.key, required this.title});
  final String title;

  @override
  State<MyHomePage> createState() => _MyHomePageState();
}

class _MyHomePageState extends State<MyHomePage> {
  @override
  Widget build(BuildContext context) {
    return CustomScaffold(
      body: SafeArea(
        child: Center(
          child: Stack(
            // mainAxisAlignment: MainAxisAlignment.center,
            children: <Widget>[
              Align(
                alignment: Alignment.topLeft,
                child: SvgPicture.asset(
                  AppVector.mesh1,
                  width: 80,
                  height: 80,
                ),
              ),
              Transform.rotate(
                angle: pi / 3.5,
                child: Transform.translate(
                  offset: const Offset(-40, 20),
                  child: Opacity(
                    opacity: 0.4,
                    child: Align(
                      alignment: Alignment.centerRight,
                      child: SvgPicture.asset(
                        AppVector.star,
                        width: 20,
                        height: 20,
                      ),
                    ),
                  ),
                ),
              ),
              Align(
                alignment: Alignment.center,
                child: Align(
                    alignment: Alignment.center,
                    child: Column(
                      mainAxisSize: MainAxisSize.min,
                      mainAxisAlignment: MainAxisAlignment.end,
                      children: [
                        Container(
                          alignment: Alignment.center,
                          child: Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              Row(
                                mainAxisSize: MainAxisSize.min,
                                mainAxisAlignment: MainAxisAlignment.start,
                                children: [
                                  Text(
                                    'Buy',
                                    style: GoogleFonts.plusJakartaSans(
                                        fontWeight: FontWeight.w300,
                                        fontSize: 30),
                                  ),
                                  const SizedBox(
                                    width: 8,
                                  ),
                                  Text(
                                    'Random NFT',
                                    style: GoogleFonts.plusJakartaSans(
                                        fontWeight: FontWeight.w700,
                                        fontSize: 30),
                                  )
                                ],
                              ),
                              Row(
                                mainAxisSize: MainAxisSize.min,
                                mainAxisAlignment: MainAxisAlignment.start,
                                children: [
                                  Text(
                                    'Packs',
                                    style: GoogleFonts.plusJakartaSans(
                                        fontWeight: FontWeight.w700,
                                        fontSize: 30),
                                  ),
                                  const SizedBox(
                                    width: 8,
                                  ),
                                  Text(
                                    'Broaden',
                                    style: GoogleFonts.plusJakartaSans(
                                        fontWeight: FontWeight.w300,
                                        fontSize: 30),
                                  ),
                                ],
                              ),
                              Row(
                                mainAxisSize: MainAxisSize.min,
                                mainAxisAlignment: MainAxisAlignment.start,
                                children: [
                                  Text(
                                    'Your',
                                    style: GoogleFonts.plusJakartaSans(
                                        fontWeight: FontWeight.w300,
                                        fontSize: 30),
                                  ),
                                  const SizedBox(
                                    width: 8,
                                  ),
                                  Text(
                                    'Collection',
                                    style: GoogleFonts.plusJakartaSans(
                                        fontWeight: FontWeight.w700,
                                        fontSize: 30),
                                  )
                                ],
                              ),
                            ],
                          ),
                        ),
                        const SizedBox(height: 20),
                        BasicAnimatedContainer(
                            onPressed: () {
                              Navigator.push(
                                  context,
                                  MaterialPageRoute(
                                      builder: (context) => SignUp()));
                            },
                            customWidget: Text(
                              'Sign Up',
                              style: GoogleFonts.plusJakartaSans(
                                color: AppColors.woodsmoke,
                                fontWeight: FontWeight.w500,
                                fontSize: 18,
                              ),
                            )),
                      ],
                    )),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
