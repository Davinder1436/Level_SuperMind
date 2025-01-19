import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:soul_buddy/common/widgets/containers/basic_animated_container.dart';
import 'package:soul_buddy/core/configs/themes/app_colors.dart';
import 'package:soul_buddy/core/configs/themes/app_theme.dart';
import 'package:soul_buddy/presentation/meditation/screens/alom_vilom.dart';
import 'package:soul_buddy/presentation/meditation/screens/meditation_screen.dart';

class PranayamaScreen extends StatelessWidget {
  const PranayamaScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.mystic,
      appBar: AppBar(
        title: Text(
          'Pranayama Techniques',
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
          _buildTechnique(
            route: MaterialPageRoute(
                builder: (context) => const MeditationScreen()),
            context,
            title: 'Deep Breathing',
            subtitle: 'Simple technique for beginners',
            steps: [
              'Find a comfortable position, either sitting or lying down',
              'Place one hand on your chest and the other on your abdomen',
              'Inhale slowly and deeply through your nose',
              'Exhale slowly through your mouth',
              'Repeat for 5-10 minutes'
            ],
            tips: [
              'Focus on the rise and fall of your abdomen',
              'Imagine filling your lungs completely with air',
              'Exhale completely to remove stale air',
              'Maintain a slow and steady rhythm',
              'Close your eyes to enhance focus'
            ],
            donts: [
              'Don\'t force your breath',
              'Don\'t raise your shoulders while inhaling',
              'Don\'t hold your breath unless specifically instructed',
              'Don\'t practice immediately after a heavy meal'
            ],
          ),
          const SizedBox(height: 20),
          _buildTechnique(
            route: MaterialPageRoute(
                builder: (context) => const AlomVilomScreen()),
            context,
            title: 'Anulom Vilom',
            subtitle: 'Alternate Nostril Breathing',
            steps: [
              'Sit comfortably with your spine straight',
              'Make a Vishnu Mudra with your right hand',
              'Close your right nostril with your right thumb',
              'Inhale slowly through your left nostril',
              'Close left nostril, release right, exhale through right',
              'Inhale through right nostril',
              'Close right nostril, release left, exhale through left',
              'Repeat for 5-10 minutes'
            ],
            tips: [
              'Keep the breath smooth and controlled',
              'Don\'t force the breath',
              'Maintain a steady rhythm',
              'Focus on the flow of breath through each nostril',
              'Start with a few rounds and gradually increase duration'
            ],
            donts: [
              'Don\'t practice if you have a cold or blocked nose',
              'Don\'t hold your breath between breaths unless instructed',
              'Don\'t practice immediately after a heavy meal'
            ],
          ),
          const SizedBox(height: 20),
          _buildTechnique(
            context,
            route: MaterialPageRoute(
                builder: (context) => const MeditationScreen()),
            title: 'Surya Bhedi',
            subtitle: 'Right Nostril Breathing',
            steps: [
              'Sit comfortably with your spine straight',
              'Make a Vishnu Mudra with your right hand',
              'Close your left nostril with your ring finger',
              'Inhale deeply through your right nostril',
              'Close right nostril, exhale through left',
              'Repeat for 5-10 minutes'
            ],
            tips: [
              'Keep the breath smooth and controlled',
              'Focus on the flow of breath through the right nostril',
              'Start with a few rounds and gradually increase duration'
            ],
            donts: [
              'Don\'t practice if you have high blood pressure or heart problems',
              'Don\'t practice during hot weather or fever',
              'Don\'t practice if feeling anxious or agitated',
              'Don\'t practice immediately after a heavy meal',
              'Avoid practicing at night'
            ],
          ),
        ],
      ),
    );
  }

  Widget _buildTechnique(
    context, {
    required String title,
    required String subtitle,
    required List<String> steps,
    required List<String> tips,
    required List<String> donts,
    required MaterialPageRoute route,
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
            alignment: Alignment.center,
            padding: const EdgeInsets.all(16),
            decoration: BoxDecoration(
              color: AppColors.startship.withOpacity(0.1),
              borderRadius: const BorderRadius.only(
                topLeft: Radius.circular(12),
                topRight: Radius.circular(12),
              ),
            ),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  title,
                  style: GoogleFonts.plusJakartaSans(
                    fontSize: 24,
                    fontWeight: FontWeight.bold,
                    color: AppColors.woodsmoke,
                  ),
                ),
                Text(
                  subtitle,
                  style: GoogleFonts.plusJakartaSans(
                    fontSize: 16,
                    color: Colors.grey[600],
                  ),
                ),
              ],
            ),
          ),
          const SizedBox(
            height: 20,
          ),
          Align(
            alignment: Alignment.center,
            child: BasicAnimatedContainer(
              onPressed: () {
                Navigator.push(
                  context,
                  route,
                );
              },
              customWidget: Text(
                'Start',
                style: GoogleFonts.plusJakartaSans(
                  fontSize: 18,
                  fontWeight: FontWeight.bold,
                  color: AppColors.woodsmoke,
                ),
              ),
            ),
          ),
          _buildSection(title: 'Steps', items: steps),
          _buildSection(title: 'Tips', items: tips),
          _buildSection(title: 'Don\'ts', items: donts, isLast: true),
        ],
      ),
    );
  }

  Widget _buildSection({
    required String title,
    required List<String> items,
    bool isLast = false,
  }) {
    return Container(
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        border: isLast
            ? null
            : Border(
                bottom: BorderSide(
                  color: Colors.grey[300]!,
                  width: 1,
                ),
              ),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            title,
            style: GoogleFonts.plusJakartaSans(
              fontSize: 18,
              fontWeight: FontWeight.bold,
              color: AppColors.woodsmoke,
            ),
          ),
          const SizedBox(height: 8),
          ...items.map((item) => Padding(
                padding: const EdgeInsets.symmetric(vertical: 4),
                child: Row(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    const Text('• ', style: TextStyle(fontSize: 16)),
                    Expanded(
                      child: Text(
                        item,
                        style: GoogleFonts.plusJakartaSans(
                          fontSize: 16,
                          color: Colors.grey[800],
                        ),
                      ),
                    ),
                  ],
                ),
              )),
        ],
      ),
    );
  }
}
