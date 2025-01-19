import 'package:flutter_bloc/flutter_bloc.dart';
import 'dart:async';
import 'meditation_event.dart';
import 'meditation_state.dart';

class MeditationBloc extends Bloc<MeditationEvent, MeditationState> {
  Timer? _timer;

  MeditationBloc() : super(const MeditationState()) {
    on<StartMeditation>(_onStartMeditation);
    on<StopMeditation>(_onStopMeditation);
    on<UpdateMeditationTimer>(_onUpdateTimer);
    on<ToggleMeditationBreathing>(_onToggleBreathing);
  }

  void _onStartMeditation(
      StartMeditation event, Emitter<MeditationState> emit) {
    _timer?.cancel();
    emit(state.copyWith(
      isRunning: true,
      remainingTime: 300, // 5 minutes
    ));

    _timer = Timer.periodic(const Duration(seconds: 1), (timer) {
      if (state.remainingTime > 0) {
        add(UpdateMeditationTimer(state.remainingTime - 1));
      } else {
        add(StopMeditation());
      }
    });
  }

  void _onStopMeditation(StopMeditation event, Emitter<MeditationState> emit) {
    _timer?.cancel();
    emit(state.copyWith(
      isRunning: false,
      remainingTime: 0,
    ));
  }

  void _onUpdateTimer(
      UpdateMeditationTimer event, Emitter<MeditationState> emit) {
    emit(state.copyWith(remainingTime: event.remainingTime));
  }

  void _onToggleBreathing(
      ToggleMeditationBreathing event, Emitter<MeditationState> emit) {
    emit(state.copyWith(isBreathingIn: event.isBreathingIn));
  }

  @override
  Future<void> close() {
    _timer?.cancel();
    return super.close();
  }
}
