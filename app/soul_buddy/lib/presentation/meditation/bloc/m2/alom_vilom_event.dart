import 'package:equatable/equatable.dart';

abstract class AlomVilomEvent extends Equatable {
  @override
  List<Object> get props => [];
}

class StartAlomVilom extends AlomVilomEvent {}

class StopAlomVilom extends AlomVilomEvent {}

class UpdateBreathing extends AlomVilomEvent {
  final BreathingPhase phase;
  UpdateBreathing(this.phase);

  @override
  List<Object> get props => [phase];
}

enum BreathingPhase {
  leftInhale,
  leftExhale,
  rightInhale,
  rightExhale,
}

class UpdateAlomVilomTimer extends AlomVilomEvent {
  final int remainingTime;
  UpdateAlomVilomTimer(this.remainingTime);

  @override
  List<Object> get props => [remainingTime];
}

class ToggleAlomVilomBreathing extends AlomVilomEvent {
  final bool isBreathingIn;
  ToggleAlomVilomBreathing(this.isBreathingIn);

  @override
  List<Object> get props => [isBreathingIn];
}

class UpdateTimer extends AlomVilomEvent {
  final Duration remainingTime;

  UpdateTimer(this.remainingTime);

  @override
  List<Object> get props => [remainingTime];
}
