import 'dart:math';

import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:introduction_screen/introduction_screen.dart';
import 'package:lottie/lottie.dart';
import 'package:soul_buddy/common/widgets/containers/cards.dart';
import 'package:soul_buddy/core/configs/themes/app_colors.dart';
import 'package:soul_buddy/presentation/auth/screens/signup.dart';
import 'package:soul_buddy/presentation/meditation/screens/alom_vilom.dart';
// import 'package:soul_buddy/presentation/meditation/screens/meditation_screen.dart';

class OnboardingScreen extends StatefulWidget {
  const OnboardingScreen({super.key});

  @override
  State<OnboardingScreen> createState() => _OnboardingScreenState();
}

class _OnboardingScreenState extends State<OnboardingScreen> {
  final introKey = GlobalKey<IntroductionScreenState>();
  void _onIntroEnd(context) {
    // Navigator.of(context).pushReplacement(
    //   MaterialPageRoute(builder: (_) => MeditationScreen()),
    // );
    Navigator.of(context).pushReplacement(
      MaterialPageRoute(builder: (_) => SignupScreen()),
    );
  }

  // Widget _buildFullscreenImage() {
  //   return Image.asset(
  //     'assets/fullscreen.jpg',
  //     fit: BoxFit.cover,
  //     height: double.infinity,
  //     width: double.infinity,
  //     alignment: Alignment.center,
  //   );
  // }

  Widget _buildImage(String assetName, [double width = 350]) {
    return Image.asset('assets/$assetName', width: width);
  }

  Widget _screenOneCards() {
    return Padding(
      padding: const EdgeInsets.only(top: 20.0),
      child: Stack(
        children: [
          Transform.rotate(
              angle: pi / 6,
              child: BasicCards(
                  title: 'Gemstones',
                  subtitle: 'Look at your gemstones',
                  color: Color.fromARGB(255, 232, 244, 255),
                  iconColor: Color.fromARGB(255, 182, 225, 255),
                  icon: Icons.diamond)),
          Transform.rotate(
              angle: -pi / 6,
              child: BasicCards(
                  title: 'title',
                  subtitle: 'subtitle',
                  color: Color.fromARGB(255, 255, 244, 232),
                  iconColor: Color.fromARGB(255, 255, 153, 0),
                  icon: Icons.diamond)),
          BasicCards(
              title: 'title',
              subtitle: 'subtitle',
              color: Color.fromARGB(255, 255, 232, 236),
              iconColor: Color.fromARGB(255, 255, 105, 180),
              icon: Icons.diamond),

          // BasicCards(title: 'title', subtitle: 'subtitle', color: Color(0x), iconColor: Color(0x), icon: Icons.diamond),
        ],
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    PageDecoration pageDecoration = PageDecoration(
      titleTextStyle: TextStyle(fontSize: 28.0, fontWeight: FontWeight.w700),
      bodyTextStyle: GoogleFonts.plusJakartaSans(fontSize: 19),
      bodyPadding: EdgeInsets.fromLTRB(16.0, 0.0, 16.0, 16.0),
      pageColor: AppColors.mystic,
      imagePadding: EdgeInsets.zero,
    );
    return Scaffold(
      appBar: AppBar(
        toolbarHeight: 20,
        automaticallyImplyLeading: false,
        backgroundColor: AppColors.mystic,
      ),
      body: IntroductionScreen(
        key: introKey,
        globalBackgroundColor: AppColors.mystic,
        allowImplicitScrolling: true,
        autoScrollDuration: 3000,
        infiniteAutoScroll: true,
        // globalFooter: SizedBox(
        //   width: double.infinity,
        //   height: 60,
        //   child: ElevatedButton(
        //     child: const Text(
        //       'Let\'s go right away!',
        //       style: TextStyle(fontSize: 16.0, fontWeight: FontWeight.bold),
        //     ),
        //     onPressed: () => _onIntroEnd(context),
        //   ),
        // ),
        pages: [
          PageViewModel(
            bodyWidget: _bodyWidgetScreenOne(),
            // title: "",
            titleWidget: SizedBox(
              height: 20,
            ),
            // body:
            //     "Instead of having to buy an entire share, invest any amount you want.",
            image: Padding(
              padding: const EdgeInsets.symmetric(horizontal: 10.0),
              child: Lottie.asset(
                'assets/lottie/init.json', // Replace with your Lottie file path
                width: 250,
                height: 250,
                fit: BoxFit.cover,
              ),
            ),
            decoration: pageDecoration,
          ),
          PageViewModel(
            bodyWidget: _bodyWidgetScreenTwo(),
            title: "",
            // body:
            //     "Download the Stockpile app and master the market with our mini-lesson.",
            // image: _buildImage('img2.jpg'),
            image: ClipOval(
              child: Lottie.asset(
                'assets/lottie/guru.json', // Replace with your Lottie file path
                width: 400,
                height: 400,
                fit: BoxFit.cover,
              ),
            ),
          ),
          PageViewModel(
            bodyWidget: _bodyWidgetScreenThree(),
            title: "",
            // body:
            //     "Kids and teens can track their stocks 24/7 and place trades that you approve.",
            image: Lottie.asset(
              'assets/lottie/rocket.json', // Replace with your Lottie file path
              width: 400,
              height: 400,
              fit: BoxFit.cover,
            ),
            decoration: pageDecoration,
          ),
        ],
        onDone: () => _onIntroEnd(context),
        onSkip: () => _onIntroEnd(context), // You can override onSkip callback
        showSkipButton: true,
        skipOrBackFlex: 0,
        nextFlex: 0,
        showBackButton: false,
        //rtl: true, // Display as right-to-left
        back: const Icon(Icons.arrow_back),
        skip: const Text('Skip', style: TextStyle(fontWeight: FontWeight.w600)),
        next: const Icon(Icons.arrow_forward),
        done: const Text('Done', style: TextStyle(fontWeight: FontWeight.w600)),
        curve: Curves.fastLinearToSlowEaseIn,
        controlsMargin: const EdgeInsets.all(16),
        controlsPadding: const EdgeInsets.fromLTRB(8.0, 4.0, 8.0, 4.0),
        dotsDecorator: const DotsDecorator(
          size: Size(10.0, 10.0),
          color: Color(0xFFBDBDBD),
          activeSize: Size(22.0, 10.0),
          activeShape: RoundedRectangleBorder(
            borderRadius: BorderRadius.all(Radius.circular(25.0)),
          ),
        ),
        dotsContainerDecorator: const ShapeDecoration(
          color: Colors.black87,
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.all(Radius.circular(8.0)),
          ),
        ),
      ),
    );
  }

  Widget _bodyWidgetScreenOne() {
    return Align(
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
                          'Soul',
                          style: GoogleFonts.plusJakartaSans(
                              fontWeight: FontWeight.w300, fontSize: 30),
                        ),
                        const SizedBox(
                          width: 8,
                        ),
                        Text(
                          'Buddy',
                          style: GoogleFonts.plusJakartaSans(
                              fontWeight: FontWeight.w700, fontSize: 30),
                        )
                      ],
                    ),
                    Row(
                      mainAxisSize: MainAxisSize.min,
                      mainAxisAlignment: MainAxisAlignment.start,
                      children: [
                        Text(
                          'Guiding',
                          style: GoogleFonts.plusJakartaSans(
                              fontWeight: FontWeight.w700, fontSize: 30),
                        ),
                        const SizedBox(
                          width: 8,
                        ),
                        Text(
                          'Your spirit,',
                          style: GoogleFonts.plusJakartaSans(
                              fontWeight: FontWeight.w300, fontSize: 30),
                        ),
                      ],
                    ),
                    Row(
                      mainAxisSize: MainAxisSize.min,
                      mainAxisAlignment: MainAxisAlignment.start,
                      children: [
                        Text(
                          'One star',
                          style: GoogleFonts.plusJakartaSans(
                              fontWeight: FontWeight.w300, fontSize: 30),
                        ),
                        const SizedBox(
                          width: 8,
                        ),
                        Text(
                          'at a time',
                          style: GoogleFonts.plusJakartaSans(
                              fontWeight: FontWeight.w700, fontSize: 30),
                        )
                      ],
                    ),
                  ],
                ),
              ),
            ],
          )),
    );
  }

  Widget _bodyWidgetScreenTwo() {
    return Align(
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
                          'All',
                          style: GoogleFonts.plusJakartaSans(
                              fontWeight: FontWeight.w300, fontSize: 30),
                        ),
                        const SizedBox(
                          width: 8,
                        ),
                        Text(
                          'Your',
                          style: GoogleFonts.plusJakartaSans(
                              fontWeight: FontWeight.w700, fontSize: 30),
                        )
                      ],
                    ),
                    Row(
                      mainAxisSize: MainAxisSize.min,
                      mainAxisAlignment: MainAxisAlignment.start,
                      children: [
                        Text(
                          'Horoscope',
                          style: GoogleFonts.plusJakartaSans(
                              fontWeight: FontWeight.w700, fontSize: 30),
                        ),
                        const SizedBox(
                          width: 8,
                        ),
                        Text(
                          'Needs',
                          style: GoogleFonts.plusJakartaSans(
                              fontWeight: FontWeight.w300, fontSize: 30),
                        ),
                      ],
                    ),
                    // Row(
                    //   mainAxisSize: MainAxisSize.min,
                    //   mainAxisAlignment: MainAxisAlignment.start,
                    //   children: [
                    //     Text(
                    //       'At one',
                    //       style: GoogleFonts.plusJakartaSans(
                    //           fontWeight: FontWeight.w300, fontSize: 30),
                    //     ),
                    //     const SizedBox(
                    //       width: 8,
                    //     ),
                    //     Text(
                    //       'Place',
                    //       style: GoogleFonts.plusJakartaSans(
                    //           fontWeight: FontWeight.w700, fontSize: 30),
                    //     )
                    //   ],
                    // ),
                  ],
                ),
              ),
            ],
          )),
    );
  }

  Widget _bodyWidgetScreenThree() {
    return Align(
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
                          'Your',
                          style: GoogleFonts.plusJakartaSans(
                              fontWeight: FontWeight.w300, fontSize: 30),
                        ),
                        const SizedBox(
                          width: 8,
                        ),
                        Text(
                          'Personalized',
                          style: GoogleFonts.plusJakartaSans(
                              fontWeight: FontWeight.w700, fontSize: 30),
                        )
                      ],
                    ),
                    Row(
                      mainAxisSize: MainAxisSize.min,
                      mainAxisAlignment: MainAxisAlignment.start,
                      children: [
                        Text(
                          'Wellness',
                          style: GoogleFonts.plusJakartaSans(
                              fontWeight: FontWeight.w700, fontSize: 30),
                        ),
                        const SizedBox(
                          width: 8,
                        ),
                        Text(
                          'Activites',
                          style: GoogleFonts.plusJakartaSans(
                              fontWeight: FontWeight.w300, fontSize: 30),
                        ),
                      ],
                    ),
                    Row(
                      mainAxisSize: MainAxisSize.min,
                      mainAxisAlignment: MainAxisAlignment.start,
                      children: [
                        Text(
                          'At one',
                          style: GoogleFonts.plusJakartaSans(
                              fontWeight: FontWeight.w300, fontSize: 30),
                        ),
                        const SizedBox(
                          width: 8,
                        ),
                        Text(
                          'Place',
                          style: GoogleFonts.plusJakartaSans(
                              fontWeight: FontWeight.w700, fontSize: 30),
                        )
                      ],
                    ),
                  ],
                ),
              ),
            ],
          )),
    );
  }
}
