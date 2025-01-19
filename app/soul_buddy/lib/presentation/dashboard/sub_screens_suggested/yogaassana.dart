import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:soul_buddy/core/configs/themes/app_colors.dart';
import 'package:soul_buddy/core/configs/themes/app_theme.dart';

class YogaAsanasScreen extends StatelessWidget {
  const YogaAsanasScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.mystic,
      appBar: AppBar(
        title: Text(
          'Yoga Asanas',
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
          _buildAsana(
            title: 'Padmasana',
            subtitle: 'Lotus Pose - Simple',
            purpose:
                'To open the hips, improve flexibility in the ankles and knees, and promote a sense of calmness and stability. This is a classic meditative pose.',
            steps: [
              'Sit on the floor with your legs extended straight out in front of you',
              'Bend your right knee and gently place your right foot on your left thigh, as close to your left hip crease as possible',
              'Bend your left knee and gently place your left foot on your right thigh, as close to your right hip crease as possible',
              'Keep your spine straight, your chest open, and your hands resting on your knees in Gyan Mudra'
            ],
            tips: [
              'If you find it difficult to bring both feet onto your thighs, start with Ardha Padmasana (Half Lotus Pose)',
              'Use a cushion or blanket under your hips if needed to elevate them slightly',
              'Focus on keeping your spine straight and your breath even',
              'Relax your shoulders and face'
            ],
            donts: [
              'Don\'t force your knees or ankles if you feel pain',
              'Don\'t attempt this pose if you have knee, ankle, or hip injuries',
              'Don\'t round your back',
              'Don\'t hold the pose for too long initially'
            ],
          ),
          const SizedBox(height: 20),
          _buildAsana(
            title: 'Vajrasana',
            subtitle: 'Thunderbolt Pose',
            purpose:
                'To aid digestion, strengthen the thighs and calves, and calm the mind. This is the only asana that can be done immediately after meals.',
            steps: [
              'Kneel on the floor with your knees together',
              'Lower your buttocks onto your heels. Your big toes should touch',
              'Keep your spine straight, your shoulders relaxed, and your hands resting on your thighs'
            ],
            tips: [
              'If you experience discomfort in your ankles, place a rolled-up blanket under your ankles',
              'If you find it difficult to sit directly on your heels, place a cushion between your buttocks and heels',
              'Maintain a straight spine and relaxed shoulders'
            ],
            donts: [
              'Don\'t practice this pose if you have severe knee problems or ankle injuries',
              'Avoid this pose if you have recently undergone knee or ankle surgery',
              'Don\'t slouch or round your back'
            ],
          ),
          const SizedBox(height: 20),
          _buildAsana(
            title: 'Tadasana',
            subtitle: 'Mountain Pose',
            purpose:
                'To improve posture, strengthen the core and legs, and promote stability and grounding.',
            steps: [
              'Stand with your feet together, big toes touching, and heels slightly apart',
              'Distribute your weight evenly across both feet',
              'Engage your leg muscles and lift your kneecaps',
              'Draw your tailbone down and lengthen your spine upwards',
              'Roll your shoulders back and down',
              'Extend your arms down by your sides, palms facing inwards',
              'Keep your head level and your gaze forward'
            ],
            tips: [
              'Imagine a string pulling you up from the crown of your head',
              'Engage your core muscles to maintain stability',
              'Keep your breath even and relaxed',
              'Feel the connection between your feet and the ground'
            ],
            donts: [
              'Don\'t lock your knees',
              'Don\'t slouch or round your back',
              'Don\'t hyperextend your lower back',
              'Don\'t look down or up; keep your gaze straight ahead'
            ],
          ),
        ],
      ),
    );
  }

  Widget _buildAsana({
    required String title,
    required String subtitle,
    required String purpose,
    required List<String> steps,
    required List<String> tips,
    required List<String> donts,
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
                const SizedBox(height: 4),
                Text(
                  subtitle,
                  style: GoogleFonts.plusJakartaSans(
                    fontSize: 16,
                    color: Colors.grey[600],
                  ),
                ),
                const SizedBox(height: 12),
                Text(
                  purpose,
                  style: GoogleFonts.plusJakartaSans(
                    fontSize: 16,
                    color: Colors.grey[800],
                  ),
                ),
              ],
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
