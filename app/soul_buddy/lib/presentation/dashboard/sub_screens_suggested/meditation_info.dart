import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:soul_buddy/core/configs/themes/app_colors.dart';
import 'package:soul_buddy/core/configs/themes/app_theme.dart';

class MeditationsInfo extends StatelessWidget {
  const MeditationsInfo({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.mystic,
      appBar: AppBar(
        title: Text(
          'Meditations',
          style: GoogleFonts.plusJakartaSans(
            color: AppColors.woodsmoke,
            fontWeight: FontWeight.bold,
          ),
        ),
        backgroundColor: AppColors.mystic,
        elevation: 0,
      ),
      body: ListView(
        padding: const EdgeInsets.all(16),
        children: [
          _buildMeditationCard(
            title: 'Mindfulness Meditation',
            purpose: 'To cultivate present moment awareness without judgment.',
            technique:
                'Focus on the breath, bodily sensations, thoughts, and emotions as they arise and pass, without getting carried away by them.',
            place: 'Any quiet place where you can sit or lie comfortably',
            time:
                'Any time of day, but consistency is key. Even 5-10 minutes daily can be beneficial.',
          ),
          const SizedBox(height: 20),
          _buildMeditationCard(
            title: 'Samatha-Vipassana Meditation',
            purpose:
                'To develop both tranquility (Samatha) and insight (Vipassana).',
            technique:
                'Starts with focusing on a single object (like the breath) to calm the mind (Samatha), then investigates the nature of reality through observation of the three characteristics of existence: impermanence, suffering, and non-self (Vipassana).',
            place: 'Quiet and secluded environment',
            time:
                'Longer sessions are recommended, ideally in the morning or evening.',
          ),
          const SizedBox(height: 20),
          _buildMeditationCard(
            title: 'Walking Meditation',
            purpose: 'To bring mindfulness to the act of walking.',
            technique:
                'Pay attention to the sensations of your feet making contact with the ground, the movement of your body, and the rhythm of your steps.',
            place: 'Any safe space where you can walk slowly and mindfully',
            time:
                'Can be practiced any time, especially helpful for those who find sitting meditation challenging.',
          ),
          const SizedBox(height: 20),
          _buildMeditationCard(
            title: 'Loving-Kindness Meditation (Metta)',
            purpose:
                'To cultivate feelings of love, compassion, and kindness towards oneself and others.',
            technique:
                'Recite or silently repeat phrases of loving-kindness, starting with yourself, then extending to loved ones, neutral persons, difficult persons, and finally all beings.',
            place: 'Any quiet place',
            time:
                'Can be practiced any time, especially helpful for cultivating positive emotions.',
          ),
          const SizedBox(height: 20),
          _buildMeditationCard(
            title: 'Transcendental Meditation (TM)',
            purpose:
                'To promote deep relaxation and inner peace through the use of a mantra.',
            technique:
                'A specific mantra is given by a certified TM teacher, and it is silently repeated during meditation.',
            place: 'Quiet environment',
            time: 'Usually practiced for 15-20 minutes twice a day.',
          ),
          const SizedBox(height: 20),
          _buildMeditationCard(
            title: 'Yoga Nidra (Yogic Sleep)',
            purpose:
                'To induce a state of deep relaxation and conscious awareness.',
            technique:
                'Guided meditation where you lie down and follow the instructions to systematically relax different parts of the body and mind.',
            place: 'Comfortable and quiet space where you can lie down',
            time:
                'Best practiced lying down, any time, but especially helpful before sleep.',
          ),
          const SizedBox(height: 20),
          _buildMeditationCard(
            title: 'Music Meditation',
            purpose: 'To use music as a focal point for meditation.',
            technique:
                'Listen attentively to calming or meditative music, focusing on the melody, rhythm, and instruments.',
            place: 'Any comfortable setting',
            time:
                'Any time of day, but avoid overly stimulating music before sleep.',
          ),
          const SizedBox(height: 20),
          _buildMeditationCard(
            title: 'Om Chanting Meditation',
            purpose:
                'To experience the vibrational resonance of the sacred sound "Om."',
            technique:
                'Chanting "Om" aloud or silently, focusing on the vibration in the body.',
            place: 'Quiet space',
            time: 'Any time of day.',
          ),
        ],
      ),
    );
  }

  Widget _buildMeditationCard({
    required String title,
    required String purpose,
    required String technique,
    required String place,
    required String time,
  }) {
    return Container(
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(AppTheme.defaultHighBorderRadius),
        border: Border.all(
          color: AppColors.woodsmoke,
          width: AppTheme.defaultBorderWidth,
        ),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Container(
            width: double.infinity,
            decoration: BoxDecoration(
              color: AppColors.startship,
              borderRadius: BorderRadius.vertical(
                top: Radius.circular(AppTheme.defaultHighBorderRadius),
              ),
            ),
            padding: const EdgeInsets.all(12),
            child: Text(
              title,
              style: GoogleFonts.plusJakartaSans(
                fontSize: 20,
                fontWeight: FontWeight.bold,
                color: AppColors.woodsmoke,
              ),
            ),
          ),
          Padding(
            padding: const EdgeInsets.all(16),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                _buildMeditationDetail('Purpose:', purpose),
                const SizedBox(height: 12),
                _buildMeditationDetail('Technique:', technique),
                const SizedBox(height: 12),
                _buildMeditationDetail('Suggested Place:', place),
                const SizedBox(height: 12),
                _buildMeditationDetail('Suggested Time:', time),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildMeditationDetail(String heading, String detail) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          heading,
          style: GoogleFonts.plusJakartaSans(
            fontSize: 18,
            fontWeight: FontWeight.bold,
            color: AppColors.woodsmoke,
          ),
        ),
        const SizedBox(height: 8),
        Text(
          detail,
          style: GoogleFonts.plusJakartaSans(
            fontSize: 16,
            color: Colors.grey[800],
          ),
        ),
      ],
    );
  }
}
