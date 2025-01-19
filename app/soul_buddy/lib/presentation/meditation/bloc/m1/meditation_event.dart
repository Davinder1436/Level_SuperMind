import 'package:equatable/equatable.dart';

abstract class MeditationEvent extends Equatable {
  const MeditationEvent();

  @override
  List<Object> get props => [];
}

class StartMeditation extends MeditationEvent {}

class StopMeditation extends MeditationEvent {}

class UpdateMeditationTimer extends MeditationEvent {
  final int remainingTime;
  const UpdateMeditationTimer(this.remainingTime);

  @override
  List<Object> get props => [remainingTime];
}

class ToggleMeditationBreathing extends MeditationEvent {
  final bool isBreathingIn;
  const ToggleMeditationBreathing(this.isBreathingIn);

  @override
  List<Object> get props => [isBreathingIn];
}
