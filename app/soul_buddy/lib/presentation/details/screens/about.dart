import 'package:flutter/material.dart';
import 'package:soul_buddy/common/widgets/scaffold/custom_scaffold.dart';
import 'package:soul_buddy/core/configs/themes/app_colors.dart';
import 'package:soul_buddy/core/configs/themes/app_theme.dart';

class AboutScreen extends StatelessWidget {
  const AboutScreen({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return CustomScaffold(
      appBar: AppBar(
        title: const Text(
          'About SoulBuddy',
          style: TextStyle(color: AppColors.woodsmoke),
        ),
        backgroundColor: Colors.transparent,
        elevation: 0,
        iconTheme: const IconThemeData(color: AppColors.woodsmoke),
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Center(
              child: Container(
                width: 120,
                height: 120,
                decoration: BoxDecoration(
                  color: AppColors.startship.withOpacity(0.2),
                  shape: BoxShape.circle,
                  border: Border.all(
                    color: AppColors.woodsmoke,
                    width: AppTheme.defaultBorderWidth,
                  ),
                ),
                child: const Icon(
                  Icons.self_improvement,
                  size: 60,
                  color: AppColors.woodsmoke,
                ),
              ),
            ),
            const SizedBox(height: 32),
            _buildSection(
              title: 'Your Personal Spiritual Guide',
              content:
                  'SoulBuddy combines ancient wisdom with modern AI to provide personalized spiritual guidance tailored to your unique cosmic blueprint.',
            ),
            _buildFeatureCard(
              icon: Icons.auto_graph,
              title: 'Kundali Analysis',
              description:
                  'Detailed birth chart analysis covering all 12 houses of your spiritual journey.',
            ),
            _buildFeatureCard(
              icon: Icons.diamond,
              title: 'Personalized Recommendations',
              description:
                  'Get customized gemstone and ritual suggestions aligned with your cosmic energy.',
            ),
            _buildFeatureCard(
              icon: Icons.person,
              title: 'Spiritual Practices',
              description:
                  'Access meditation and wellness content tailored to your astrological profile.',
            ),
            _buildFeatureCard(
              icon: Icons.chat_bubble_outline,
              title: 'AI Spiritual Chat',
              description:
                  'Connect with our intelligent chatbot for instant spiritual guidance and clarity.',
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildSection({required String title, required String content}) {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 16.0),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            title,
            style: const TextStyle(
              fontSize: 24,
              fontWeight: FontWeight.bold,
              color: AppColors.woodsmoke,
            ),
          ),
          const SizedBox(height: 8),
          Text(
            content,
            style: const TextStyle(
              fontSize: 16,
              color: AppColors.woodsmoke,
              height: 1.5,
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildFeatureCard({
    required IconData icon,
    required String title,
    required String description,
  }) {
    return Container(
      margin: const EdgeInsets.symmetric(vertical: 8.0),
      padding: const EdgeInsets.all(16.0),
      decoration: BoxDecoration(
        color: AppColors.mystic,
        borderRadius: BorderRadius.circular(AppTheme.defaultHighBorderRadius),
        border: Border.all(
          color: AppColors.woodsmoke,
          width: AppTheme.defaultBorderWidth,
        ),
        boxShadow: [
          BoxShadow(
            color: AppColors.woodsmoke.withOpacity(0.1),
            blurRadius: 10,
            offset: const Offset(3, 3),
          ),
        ],
      ),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Icon(
            icon,
            size: 32,
            color: AppColors.woodsmoke,
          ),
          const SizedBox(width: 16),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  title,
                  style: const TextStyle(
                    fontSize: 18,
                    fontWeight: FontWeight.bold,
                    color: AppColors.woodsmoke,
                  ),
                ),
                const SizedBox(height: 4),
                Text(
                  description,
                  style: const TextStyle(
                    fontSize: 14,
                    color: AppColors.woodsmoke,
                    height: 1.4,
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}
