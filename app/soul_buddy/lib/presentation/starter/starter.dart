import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:soul_buddy/common/widgets/containers/basic_animated_container.dart';
import 'package:soul_buddy/common/widgets/scaffold/custom_scaffold.dart';
import 'package:soul_buddy/core/configs/themes/app_colors.dart';
import 'package:soul_buddy/presentation/auth/screens/login.dart';
import 'package:soul_buddy/presentation/auth/screens/signup.dart';
import 'package:soul_buddy/presentation/details/screens/about.dart';
import 'package:soul_buddy/presentation/details/screens/contact.dart';
import 'package:soul_buddy/presentation/meditation/screens/alom_vilom.dart';
import 'package:soul_buddy/presentation/meditation/screens/meditation_screen.dart';
import 'package:soul_buddy/presentation/onboard/onboarding_screen.dart';

class Starter extends StatelessWidget {
  const Starter({super.key});

  @override
  Widget build(BuildContext context) {
    return CustomScaffold(
      appBar: AppBar(
        title: const Text('Starter'),
      ),
      body: Column(
        children: [
          const SizedBox(height: 20),
          BasicAnimatedContainer(
              onPressed: () {
                Navigator.push(context, MaterialPageRoute(builder: (context) {
                  return SignupScreen();
                }));
              },
              customWidget: Text(
                'Sign Up',
                style: GoogleFonts.plusJakartaSans(
                  color: AppColors.woodsmoke,
                  fontWeight: FontWeight.w500,
                  fontSize: 18,
                ),
              )),
          const SizedBox(height: 20),
          BasicAnimatedContainer(
              onPressed: () {
                Navigator.push(context, MaterialPageRoute(builder: (context) {
                  return const LoginScreen();
                }));
              },
              customWidget: Text(
                'Sign In',
                style: GoogleFonts.plusJakartaSans(
                  color: AppColors.woodsmoke,
                  fontWeight: FontWeight.w500,
                  fontSize: 18,
                ),
              )),
          const SizedBox(height: 20),
          BasicAnimatedContainer(
              onPressed: () {
                Navigator.push(context, MaterialPageRoute(builder: (context) {
                  return const ContactScreen();
                }));
              },
              customWidget: Text(
                'Contact',
                style: GoogleFonts.plusJakartaSans(
                  color: AppColors.woodsmoke,
                  fontWeight: FontWeight.w500,
                  fontSize: 18,
                ),
              )),
          const SizedBox(height: 20),
          BasicAnimatedContainer(
              onPressed: () {
                Navigator.push(context, MaterialPageRoute(builder: (context) {
                  return const AboutScreen();
                }));
              },
              customWidget: Text(
                'About',
                style: GoogleFonts.plusJakartaSans(
                  color: AppColors.woodsmoke,
                  fontWeight: FontWeight.w500,
                  fontSize: 18,
                ),
              )),
          const SizedBox(height: 20),
          BasicAnimatedContainer(
              onPressed: () {
                Navigator.push(context, MaterialPageRoute(builder: (context) {
                  return const AlomVilomScreen();
                }));
              },
              customWidget: Text(
                'Alom Vilom',
                style: GoogleFonts.plusJakartaSans(
                  color: AppColors.woodsmoke,
                  fontWeight: FontWeight.w500,
                  fontSize: 18,
                ),
              )),
          const SizedBox(height: 20),
          BasicAnimatedContainer(
              onPressed: () {
                Navigator.push(context, MaterialPageRoute(builder: (context) {
                  return const MeditationScreen();
                }));
              },
              customWidget: Text(
                'Meditation',
                style: GoogleFonts.plusJakartaSans(
                  color: AppColors.woodsmoke,
                  fontWeight: FontWeight.w500,
                  fontSize: 18,
                ),
              )),
          const SizedBox(height: 20),
          BasicAnimatedContainer(
              onPressed: () {
                Navigator.push(context, MaterialPageRoute(builder: (context) {
                  return const MeditationScreen();
                }));
              },
              customWidget: Text(
                'Meditation',
                style: GoogleFonts.plusJakartaSans(
                  color: AppColors.woodsmoke,
                  fontWeight: FontWeight.w500,
                  fontSize: 18,
                ),
              )),
          const SizedBox(height: 20),
          // BasicAnimatedContainer(
          //     onPressed: () {
          //       Navigator.push(context, MaterialPageRoute(builder: (context) {
          //         return const Dashboard(
          //           reponse:
          //         );
          //       }));
          //     },
          //     customWidget: Text(
          //       'Dashboard',
          //       style: GoogleFonts.plusJakartaSans(
          //         color: AppColors.woodsmoke,
          //         fontWeight: FontWeight.w500,
          //         fontSize: 18,
          //       ),
          //     )),
          const SizedBox(height: 20),
          BasicAnimatedContainer(
              onPressed: () {
                Navigator.push(context, MaterialPageRoute(builder: (context) {
                  return const OnboardingScreen();
                }));
              },
              customWidget: Text(
                'Onboard',
                style: GoogleFonts.plusJakartaSans(
                  color: AppColors.woodsmoke,
                  fontWeight: FontWeight.w500,
                  fontSize: 18,
                ),
              )),
        ],
      ),
    );
  }
}
