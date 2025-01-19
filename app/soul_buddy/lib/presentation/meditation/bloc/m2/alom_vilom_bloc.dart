import 'dart:async';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter_tts/flutter_tts.dart';
import 'package:soul_buddy/presentation/meditation/bloc/m2/alom_vilom_event.dart';
import 'package:soul_buddy/presentation/meditation/bloc/m2/alom_vilom_state.dart';

class AlomVilomBloc extends Bloc<AlomVilomEvent, AlomVilomState> {
  Timer? _breathingTimer;
  Timer? _sessionTimer;
  final FlutterTts flutterTts = FlutterTts();

  AlomVilomBloc() : super(AlomVilomState.initial()) {
    on<StartAlomVilom>(_onStartMeditation);
    on<StopAlomVilom>(_onStopMeditation);
    on<UpdateBreathing>(_onUpdateBreathing);
    // Add new event handler for timer updates
    on<UpdateTimer>(_onUpdateTimer);
  }

  Future<void> _onStartMeditation(
      StartAlomVilom event, Emitter<AlomVilomState> emit) async {
    emit(AlomVilomState.initial().copyWith(isPlaying: true));
    await _speak("Starting Anulom Vilom Pranayama. Get ready.");
    _startBreathingCycle(emit);
    _startSessionTimer();
  }

  void _onStopMeditation(StopAlomVilom event, Emitter<AlomVilomState> emit) {
    _breathingTimer?.cancel();
    _sessionTimer?.cancel();
    emit(AlomVilomState.initial());
  }

  void _onUpdateTimer(UpdateTimer event, Emitter<AlomVilomState> emit) {
    emit(state.copyWith(remainingTime: event.remainingTime));
  }

  Future<void> _onUpdateBreathing(
      UpdateBreathing event, Emitter<AlomVilomState> emit) async {
    emit(state.copyWith(
      currentPhase: event.phase,
      bubbleSize: _getBubbleSize(event.phase),
    ));
  }

  double _getBubbleSize(BreathingPhase phase) {
    switch (phase) {
      case BreathingPhase.leftInhale:
      case BreathingPhase.rightInhale:
        return 100;
      case BreathingPhase.leftExhale:
      case BreathingPhase.rightExhale:
        return 50;
    }
  }

  void _startBreathingCycle(Emitter<AlomVilomState> emit) {
    const breathDuration = Duration(seconds: 4);
    int phaseIndex = 0;

    // Initial phase
    add(UpdateBreathing(BreathingPhase.leftInhale));

    _breathingTimer = Timer.periodic(breathDuration, (timer) async {
      final phases = [
        BreathingPhase.leftInhale,
        BreathingPhase.leftExhale,
        BreathingPhase.rightInhale,
        BreathingPhase.rightExhale,
      ];

      phaseIndex = (phaseIndex + 1) % 4;
      final currentPhase = phases[phaseIndex];

      if (!state.isPlaying) {
        timer.cancel();
        return;
      }

      add(UpdateBreathing(currentPhase));

      switch (currentPhase) {
        case BreathingPhase.leftInhale:
          await _speak("Inhale through left nostril");
          break;
        case BreathingPhase.leftExhale:
          await _speak("Exhale through left nostril");
          break;
        case BreathingPhase.rightInhale:
          await _speak("Inhale through right nostril");
          break;
        case BreathingPhase.rightExhale:
          await _speak("Exhale through right nostril");
          break;
      }
    });
  }

  void _startSessionTimer() {
    const oneSecond = Duration(seconds: 1);
    _sessionTimer?.cancel();

    _sessionTimer = Timer.periodic(oneSecond, (timer) {
      if (!state.isPlaying) {
        timer.cancel();
        return;
      }

      final newDuration = state.remainingTime - oneSecond;

      if (newDuration.inSeconds <= 0) {
        timer.cancel();
        add(StopAlomVilom());
        _speak("Session completed. Well done!");
        return;
      }

      // Use event to update timer instead of direct emit
      add(UpdateTimer(newDuration));
    });
  }

  Future<void> _speak(String text) async {
    await flutterTts.speak(text);
  }

  @override
  Future<void> close() {
    _breathingTimer?.cancel();
    _sessionTimer?.cancel();
    flutterTts.stop();
    return super.close();
  }
}
