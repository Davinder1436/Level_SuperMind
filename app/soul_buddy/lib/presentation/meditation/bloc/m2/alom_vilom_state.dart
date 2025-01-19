import 'package:equatable/equatable.dart';
import 'package:soul_buddy/presentation/meditation/bloc/m2/alom_vilom_event.dart';

class AlomVilomState extends Equatable {
  final bool isPlaying;
  final Duration remainingTime;
  final BreathingPhase currentPhase;
  final double bubbleSize;

  const AlomVilomState({
    required this.isPlaying,
    required this.remainingTime,
    required this.currentPhase,
    required this.bubbleSize,
  });

  factory AlomVilomState.initial() => const AlomVilomState(
        isPlaying: false,
        remainingTime: Duration(minutes: 5),
        currentPhase: BreathingPhase.leftInhale,
        bubbleSize: 50,
      );

  AlomVilomState copyWith({
    bool? isPlaying,
    Duration? remainingTime,
    BreathingPhase? currentPhase,
    double? bubbleSize,
  }) {
    return AlomVilomState(
      isPlaying: isPlaying ?? this.isPlaying,
      remainingTime: remainingTime ?? this.remainingTime,
      currentPhase: currentPhase ?? this.currentPhase,
      bubbleSize: bubbleSize ?? this.bubbleSize,
    );
  }

  @override
  List<Object> get props =>
      [isPlaying, remainingTime, currentPhase, bubbleSize];
}
