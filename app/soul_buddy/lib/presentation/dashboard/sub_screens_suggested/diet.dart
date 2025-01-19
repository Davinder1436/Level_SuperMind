import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:soul_buddy/core/configs/themes/app_colors.dart';
import 'package:soul_buddy/core/configs/themes/app_theme.dart';

class DietScreen extends StatelessWidget {
  const DietScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.mystic,
      appBar: AppBar(
        title: Text(
          'Diet',
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
          _buildDietCard(
            title: 'Fire Element (Aries, Leo, Sagittarius)',
            tendencies:
                'Can be prone to inflammation, acidity, and overheating. May experience anger, irritability, or impulsiveness.',
            suggestions: [
              'Cooling foods: Include fresh fruits (melons, berries), vegetables (cucumber, leafy greens), and cooling beverages',
              'Hydrating foods: Focus on water-rich foods to stay hydrated',
              'Moderate spices: Use spices in moderation, favoring cooling spices like coriander and fennel',
              'Reduce: Limit red meat, excessive oil, and spicy foods',
            ],
          ),
          const SizedBox(height: 20),
          _buildDietCard(
            title: 'Earth Element (Taurus, Virgo, Capricorn)',
            tendencies:
                'Can be prone to sluggishness, digestive issues, and weight gain. May experience worry, overthinking, or stubbornness.',
            suggestions: [
              'Light and easily digestible foods: Favor whole grains, fresh fruits, and vegetables',
              'Warming spices: Include spices like ginger, cumin, and black pepper to aid digestion',
              'Regular meals: Establish regular eating patterns to support digestion',
              'Reduce: Limit heavy, oily, and processed foods',
            ],
          ),
          const SizedBox(height: 20),
          _buildDietCard(
            title: 'Air Element (Gemini, Libra, Aquarius)',
            tendencies:
                'Can be prone to anxiety, nervousness, and restlessness. May experience scattered thoughts or difficulty focusing.',
            suggestions: [
              'Nourishing and grounding foods: Include healthy fats, whole grains, and lean protein',
              'Warm and cooked foods: Favor warm meals to promote grounding',
              'Hydrating foods: Stay well-hydrated with water and herbal teas',
              'Reduce: Limit caffeine, processed foods, and sugary drinks',
            ],
          ),
          const SizedBox(height: 20),
          _buildDietCard(
            title: 'Water Element (Cancer, Scorpio, Pisces)',
            tendencies:
                'Can be prone to emotional imbalances, fluid retention, and low immunity. May experience sensitivity, mood swings, or emotional eating.',
            suggestions: [
              'Light and easily digestible foods: Favor fresh fruits, vegetables, and light soups',
              'Warming spices: Include spices like ginger, turmeric, and cinnamon',
              'Hydrating foods: Stay hydrated with water, herbal teas, and broths',
              'Reduce: Limit heavy, oily, and processed foods',
            ],
          ),
          const SizedBox(height: 20),
          _buildAdditionalConsiderations(),
        ],
      ),
    );
  }

  Widget _buildDietCard({
    required String title,
    required String tendencies,
    required List<String> suggestions,
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
                Text(
                  'Tendencies:',
                  style: GoogleFonts.plusJakartaSans(
                    fontSize: 18,
                    fontWeight: FontWeight.bold,
                    color: AppColors.woodsmoke,
                  ),
                ),
                const SizedBox(height: 8),
                Text(
                  tendencies,
                  style: GoogleFonts.plusJakartaSans(
                    fontSize: 16,
                    color: Colors.grey[800],
                  ),
                ),
                const SizedBox(height: 12),
                Text(
                  'Dietary Suggestions:',
                  style: GoogleFonts.plusJakartaSans(
                    fontSize: 18,
                    fontWeight: FontWeight.bold,
                    color: AppColors.woodsmoke,
                  ),
                ),
                const SizedBox(height: 8),
                ...suggestions.map((suggestion) => Padding(
                      padding: const EdgeInsets.symmetric(vertical: 4),
                      child: Row(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          const Text('• ', style: TextStyle(fontSize: 16)),
                          Expanded(
                            child: Text(
                              suggestion,
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
          ),
        ],
      ),
    );
  }

  Widget _buildAdditionalConsiderations() {
    return Container(
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(AppTheme.defaultHighBorderRadius),
        border: Border.all(
          color: AppColors.woodsmoke,
          width: AppTheme.defaultBorderWidth,
        ),
      ),
      child: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              'Additional Considerations:',
              style: GoogleFonts.plusJakartaSans(
                fontSize: 20,
                fontWeight: FontWeight.bold,
                color: AppColors.woodsmoke,
              ),
            ),
            const SizedBox(height: 12),
            Text(
              '• Planetary influences: Specific planetary placements in a birth chart can further refine dietary suggestions.',
              style: GoogleFonts.plusJakartaSans(
                fontSize: 16,
                color: Colors.grey[800],
              ),
            ),
            const SizedBox(height: 8),
            Text(
              '• Ayurvedic principles: Consider individual constitutions (doshas) for more personalized recommendations.',
              style: GoogleFonts.plusJakartaSans(
                fontSize: 16,
                color: Colors.grey[800],
              ),
            ),
          ],
        ),
      ),
    );
  }
}
