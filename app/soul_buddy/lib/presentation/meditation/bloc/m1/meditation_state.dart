import 'package:equatable/equatable.dart';

class MeditationState extends Equatable {
  final bool isRunning;
  final int remainingTime;
  final bool isBreathingIn;

  const MeditationState({
    this.isRunning = false,
    this.remainingTime = 0,
    this.isBreathingIn = true,
  });

  MeditationState copyWith({
    bool? isRunning,
    int? remainingTime,
    bool? isBreathingIn,
  }) {
    return MeditationState(
      isRunning: isRunning ?? this.isRunning,
      remainingTime: remainingTime ?? this.remainingTime,
      isBreathingIn: isBreathingIn ?? this.isBreathingIn,
    );
  }

  @override
  List<Object> get props => [isRunning, remainingTime, isBreathingIn];
}
