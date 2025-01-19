import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:soul_buddy/common/widgets/containers/basic_animated_container.dart';
import 'package:soul_buddy/common/widgets/scaffold/custom_scaffold.dart';
import 'package:soul_buddy/core/configs/themes/app_colors.dart';
import 'package:soul_buddy/core/configs/themes/app_theme.dart';
import 'package:soul_buddy/presentation/meditation/bloc/m2/alom_vilom_bloc.dart';
import 'package:soul_buddy/presentation/meditation/bloc/m2/alom_vilom_event.dart';
import 'package:soul_buddy/presentation/meditation/bloc/m2/alom_vilom_state.dart';

class AlomVilomScreen extends StatelessWidget {
  const AlomVilomScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return BlocProvider(
      create: (_) => AlomVilomBloc(),
      child: CustomScaffold(
        appBar: AppBar(
          title: const Text('Anulom Vilom Pranayama'),
        ),
        body: const AlomVilomView(),
      ),
    );
  }
}

class AlomVilomView extends StatelessWidget {
  const AlomVilomView({super.key});

  @override
  Widget build(BuildContext context) {
    return BlocBuilder<AlomVilomBloc, AlomVilomState>(
      builder: (context, state) {
        // Format minutes and seconds properly
        String minutes =
            state.remainingTime.inMinutes.toString().padLeft(2, '0');
        String seconds =
            (state.remainingTime.inSeconds % 60).toString().padLeft(2, '0');

        return Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Text(
              '$minutes:$seconds', // Updated time format
              style: Theme.of(context).textTheme.headlineLarge?.copyWith(
                    fontWeight: FontWeight.bold,
                    fontSize: 48, // Make timer more visible
                  ),
            ),
            const SizedBox(height: 40),
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceEvenly,
              children: [
                _buildBreathingBubble(
                  context,
                  state,
                  isLeft: true,
                ),
                _buildBreathingBubble(
                  context,
                  state,
                  isLeft: false,
                ),
              ],
            ),
            const SizedBox(height: 40),
            BasicAnimatedContainer(
              onPressed: () {
                if (!state.isPlaying) {
                  context.read<AlomVilomBloc>().add(StartAlomVilom());
                } else {
                  context.read<AlomVilomBloc>().add(StopAlomVilom());
                }
              },
              customWidget: Text(
                state.isPlaying ? 'Stop' : 'Start',
                style: const TextStyle(
                  fontSize: 20,
                  fontWeight: FontWeight.bold,
                ),
              ),
            ),
          ],
        );
      },
    );
  }

  Widget _buildBreathingBubble(BuildContext context, AlomVilomState state,
      {required bool isLeft}) {
    bool isActive = (isLeft &&
            (state.currentPhase == BreathingPhase.leftInhale ||
                state.currentPhase == BreathingPhase.leftExhale)) ||
        (!isLeft &&
            (state.currentPhase == BreathingPhase.rightInhale ||
                state.currentPhase == BreathingPhase.rightExhale));

    String breathingStatus = '';
    if (isActive) {
      if (isLeft) {
        breathingStatus = state.currentPhase == BreathingPhase.leftInhale
            ? 'Inhaling'
            : 'Exhaling';
      } else {
        breathingStatus = state.currentPhase == BreathingPhase.rightInhale
            ? 'Inhaling'
            : 'Exhaling';
      }
    }

    return Column(
      children: [
        Text(
          isLeft ? 'Left Nostril' : 'Right Nostril',
          style: Theme.of(context).textTheme.titleMedium,
        ),
        const SizedBox(height: 10),
        AnimatedContainer(
          duration: const Duration(milliseconds: 500),
          width: isActive ? state.bubbleSize : 50,
          height: isActive ? state.bubbleSize : 50,
          decoration: BoxDecoration(
            color: isActive
                ? AppColors.startship
                : AppColors.startship.withOpacity(0.5),
            shape: BoxShape.circle,
            border: Border.all(
              color: AppColors.woodsmoke,
              width: AppTheme.defaultBorderWidth,
            ),
          ),
        ),
        const SizedBox(height: 10),
        Text(
          breathingStatus,
          style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                fontWeight: isActive ? FontWeight.bold : FontWeight.normal,
              ),
        ),
      ],
    );
  }
}
