// meditation_screen.dart
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter_tts/flutter_tts.dart';
import 'package:audioplayers/audioplayers.dart';
import 'package:soul_buddy/common/widgets/containers/basic_animated_container.dart';
import 'package:soul_buddy/common/widgets/scaffold/custom_scaffold.dart';
import 'package:soul_buddy/core/configs/themes/app_colors.dart';
import 'package:soul_buddy/presentation/meditation/bloc/m1/meditation_bloc.dart';
import 'package:soul_buddy/presentation/meditation/bloc/m1/meditation_event.dart';
import 'package:soul_buddy/presentation/meditation/bloc/m1/meditation_state.dart';

class MeditationScreen extends StatefulWidget {
  const MeditationScreen({super.key});

  @override
  State<MeditationScreen> createState() => _MeditationScreenState();
}

class _MeditationScreenState extends State<MeditationScreen>
    with SingleTickerProviderStateMixin {
  late AnimationController _controller;
  late Animation<double> _animation;
  final FlutterTts flutterTts = FlutterTts();
  final AudioPlayer audioPlayer = AudioPlayer();

  @override
  void initState() {
    super.initState();
    _setupAnimation();
    _setupTTS();
  }

  void _setupAnimation() {
    _controller = AnimationController(
      duration: const Duration(seconds: 4),
      vsync: this,
    );

    _animation = Tween<double>(begin: 180, end: 250).animate(
      CurvedAnimation(parent: _controller, curve: Curves.easeInOut),
    );

    _controller.addStatusListener((status) {
      if (status == AnimationStatus.completed) {
        _speak("Now breathe out slowly");
        context
            .read<MeditationBloc>()
            .add(const ToggleMeditationBreathing(false));
        _controller.reverse();
      } else if (status == AnimationStatus.dismissed) {
        _speak("Breathe in deeply");
        context
            .read<MeditationBloc>()
            .add(const ToggleMeditationBreathing(true));
        _controller.forward();
      }
    });
  }

  Future<void> _setupTTS() async {
    await flutterTts.setLanguage("en-US");
    await flutterTts.setPitch(1.0);
    await flutterTts.setSpeechRate(0.5);
  }

  Future<void> _speak(String text) async {
    await flutterTts.speak(text);
  }

  void _startMeditation() {
    context.read<MeditationBloc>().add(StartMeditation());
    _speak(
        "Starting meditation session. Find a comfortable position and relax.");

    Future.delayed(const Duration(seconds: 2), () {
      _controller.forward();
    });
  }

  void _stopMeditation() {
    context.read<MeditationBloc>().add(StopMeditation());
    _controller.stop();
    _speak("Meditation session ended. Thank you for practicing mindfulness.");
  }

  @override
  void dispose() {
    _controller.dispose();
    flutterTts.stop();
    audioPlayer.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return CustomScaffold(
      appBar: AppBar(
        title: const Text('Pranayama Meditation'),
      ),
      body: BlocBuilder<MeditationBloc, MeditationState>(
        builder: (context, state) {
          return Center(
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                const SizedBox(height: 30),
                AnimatedBuilder(
                  animation: _animation,
                  builder: (context, child) {
                    return Container(
                      padding: const EdgeInsets.all(30),
                      width: _animation.value,
                      height: _animation.value,
                      decoration: BoxDecoration(
                        border: Border.all(
                          color: AppColors.woodsmoke,
                          width: 5,
                        ),
                        shape: BoxShape.circle,
                        color: AppColors.startship.withOpacity(1),
                      ),
                      child: Center(
                        child: Text(
                          state.isBreathingIn ? "Inhale" : "Exhale",
                          style: const TextStyle(
                            fontSize: 24,
                            fontWeight: FontWeight.bold,
                          ),
                        ),
                      ),
                    );
                  },
                ),
                const SizedBox(height: 40),
                Text(
                  "Time Remaining: ${state.remainingTime ~/ 60}:${(state.remainingTime % 60).toString().padLeft(2, '0')}",
                  style: const TextStyle(
                      fontSize: 24, fontWeight: FontWeight.bold),
                ),
                const SizedBox(height: 20),
                BasicAnimatedContainer(
                  onPressed:
                      state.isRunning ? _stopMeditation : _startMeditation,
                  customWidget: Text(
                    state.isRunning ? "Stop Meditation" : "Start Meditation",
                    style: const TextStyle(
                      fontSize: 18,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                ),
              ],
            ),
          );
        },
      ),
    );
  }
}
