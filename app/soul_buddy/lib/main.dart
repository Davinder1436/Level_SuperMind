import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:soul_buddy/core/configs/themes/app_theme.dart';
// import 'package:soul_buddy/data/models/user/sign_up_request.dart';
import 'package:soul_buddy/entities/auth/signup_response.dart';
import 'package:soul_buddy/presentation/dashboard/dashboard.dart';
import 'package:soul_buddy/presentation/meditation/bloc/m1/meditation_bloc.dart';
import 'package:soul_buddy/presentation/meditation/bloc/m2/alom_vilom_bloc.dart';
import 'package:soul_buddy/presentation/onboard/onboarding_screen.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatefulWidget {
  const MyApp({super.key});

  @override
  State<MyApp> createState() => _MyAppState();
}

class _MyAppState extends State<MyApp> {
  User? _user;
  String? _token;
  bool? _logStatus;
  bool _isLoading = true; // Track loading state

  @override
  void initState() {
    super.initState();
    _loadData();
  }

  Future<void> _loadData() async {
    final prefs = await SharedPreferences.getInstance();

    final userData = prefs.getString('user');
    final tokenData = prefs.getString('token');
    final logStatus = prefs.getBool('log');

    if (userData != null && tokenData != null) {
      final userJson = json.decode(userData);
      final user = User.fromJson(userJson);
      setState(() {
        _user = user;
        _token = tokenData;
        _logStatus = logStatus ?? false;
        _isLoading = false; // Set loading to false after data is loaded
      });

      print('User Data Loaded: ${_user?.name}');
      print('Token: $_token');
    } else {
      print('No data found');
      setState(() {
        _logStatus = false;
        _isLoading = false; // Stop loading if no data is found
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    return MultiBlocProvider(
        providers: [
          BlocProvider(
            create: (context) => MeditationBloc(),
          ),
          BlocProvider(
            create: (context) => AlomVilomBloc(),
          ),
        ],
        child: MaterialApp(
          debugShowCheckedModeBanner: false,
          title: 'Supermind',
          theme: AppTheme.lightTheme,
          home: _isLoading
              ? const CircularProgressIndicator() // Show loading spinner while loading data
              : _logStatus == false
                  ? const OnboardingScreen()
                  : Dashboard(reponse: _user!),
        ));
  }
}

// class MyHomePage extends StatefulWidget {
//   const MyHomePage({super.key, required this.title});
//   final String title;

//   @override
//   State<MyHomePage> createState() => _MyHomePageState();
// }

// class _MyHomePageState extends State<MyHomePage> {
//   @override
//   Widget build(BuildContext context) {
//     return CustomScaffold(
//       body: SafeArea(
//         child: Center(
//           child: Stack(
//             // mainAxisAlignment: MainAxisAlignment.center,
//             children: <Widget>[
//               Align(
//                 alignment: Alignment.topLeft,
//                 child: SvgPicture.asset(
//                   AppVector.mesh1,
//                   width: 80,
//                   height: 80,
//                 ),
//               ),
//               Transform.rotate(
//                 angle: pi / 3.5,
//                 child: Transform.translate(
//                   offset: const Offset(-40, 20),
//                   child: Opacity(
//                     opacity: 0.4,
//                     child: Align(
//                       alignment: Alignment.centerRight,
//                       child: SvgPicture.asset(
//                         AppVector.star,
//                         width: 20,
//                         height: 20,
//                       ),
//                     ),
//                   ),
//                 ),
//               ),
//               Align(
//                 alignment: Alignment.center,
//                 child: Align(
//                     alignment: Alignment.center,
//                     child: Column(
//                       mainAxisSize: MainAxisSize.min,
//                       mainAxisAlignment: MainAxisAlignment.end,
//                       children: [
//                         Container(
//                           alignment: Alignment.center,
//                           child: Column(
//                             crossAxisAlignment: CrossAxisAlignment.start,
//                             children: [
//                               Row(
//                                 mainAxisSize: MainAxisSize.min,
//                                 mainAxisAlignment: MainAxisAlignment.start,
//                                 children: [
//                                   Text(
//                                     'Buy',
//                                     style: GoogleFonts.plusJakartaSans(
//                                         fontWeight: FontWeight.w300,
//                                         fontSize: 30),
//                                   ),
//                                   const SizedBox(
//                                     width: 8,
//                                   ),
//                                   Text(
//                                     'Random NFT',
//                                     style: GoogleFonts.plusJakartaSans(
//                                         fontWeight: FontWeight.w700,
//                                         fontSize: 30),
//                                   )
//                                 ],
//                               ),
//                               Row(
//                                 mainAxisSize: MainAxisSize.min,
//                                 mainAxisAlignment: MainAxisAlignment.start,
//                                 children: [
//                                   Text(
//                                     'Packs',
//                                     style: GoogleFonts.plusJakartaSans(
//                                         fontWeight: FontWeight.w700,
//                                         fontSize: 30),
//                                   ),
//                                   const SizedBox(
//                                     width: 8,
//                                   ),
//                                   Text(
//                                     'Broaden',
//                                     style: GoogleFonts.plusJakartaSans(
//                                         fontWeight: FontWeight.w300,
//                                         fontSize: 30),
//                                   ),
//                                 ],
//                               ),
//                               Row(
//                                 mainAxisSize: MainAxisSize.min,
//                                 mainAxisAlignment: MainAxisAlignment.start,
//                                 children: [
//                                   Text(
//                                     'Your',
//                                     style: GoogleFonts.plusJakartaSans(
//                                         fontWeight: FontWeight.w300,
//                                         fontSize: 30),
//                                   ),
//                                   const SizedBox(
//                                     width: 8,
//                                   ),
//                                   Text(
//                                     'Collection',
//                                     style: GoogleFonts.plusJakartaSans(
//                                         fontWeight: FontWeight.w700,
//                                         fontSize: 30),
//                                   )
//                                 ],
//                               ),
//                             ],
//                           ),
//                         ),
//                       ],
//                     )),
//               ),
//             ],
//           ),
//         ),
//       ),
//     );
//   }
// }
