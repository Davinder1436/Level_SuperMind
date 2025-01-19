import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:soul_buddy/core/configs/themes/app_colors.dart';
import 'package:soul_buddy/core/configs/themes/app_theme.dart';

class RitualsScreen extends StatelessWidget {
  const RitualsScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.mystic,
      appBar: AppBar(
        title: Text(
          'Rituals',
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
          _buildRitualCard(
            title: 'Shiva Puja',
            purpose:
                'To invoke Lord Shiva for blessings of strength, protection, and spiritual growth.',
            mantras: [
              'Panchakshari Mantra: Om Namah Shivaya',
              'Rudra Mantra: Om Namo Bhagwate Rudraay',
              'Shiva Gayatri Mantra: Om Tatpurushaya Vidmahe Mahadevaya Dhimahi Tanno Rudrah Prachodayat',
            ],
            suggestedPlace: 'Shiva temple or home altar with a Shiva Lingam',
            suggestedTime:
                'Pradosh Kaal (twilight), Mondays, or during Mahashivratri',
          ),
          const SizedBox(height: 20),
          _buildRitualCard(
            title: 'Hanuman Puja',
            purpose:
                'To seek Lord Hanuman\'s blessings for courage, devotion, and overcoming obstacles.',
            mantras: [
              'Mool Mantra: Om Han Hanumate Namah',
              'Hanuman Chalisa: A devotional hymn dedicated to Lord Hanuman',
            ],
            suggestedPlace:
                'Hanuman temple or home altar with a picture or idol of Hanuman',
            suggestedTime:
                'Tuesdays or Saturdays, especially in the morning or evening',
          ),
          const SizedBox(height: 20),
          _buildRitualCard(
            title: 'Vishnu Puja',
            purpose:
                'To invoke Lord Vishnu for blessings of peace, prosperity, and preservation.',
            mantras: [
              'Vishnu Mool Mantra: Om Namo Narayanaya',
              'Vishnu Gayatri Mantra: Om Narayanaya Vidmahe Vasudevaya Dhimahi Tanno Vishnuh Prachodayat',
            ],
            suggestedPlace:
                'Vishnu temple or home altar with a picture or idol of Vishnu',
            suggestedTime: 'Thursdays or Ekadashi, especially in the morning',
          ),
          const SizedBox(height: 20),
          _buildRitualCard(
            title: 'Lakshmi Puja',
            purpose:
                'To invoke Goddess Lakshmi for blessings of wealth, prosperity, and abundance.',
            mantras: [
              'Lakshmi Beej Mantra: Om Shreem Hreem Shreem Kamale Kamalalaye Praseed Praseed Shreem Hreem Shreem Om Mahalakshmye Namah',
              'Lakshmi Gayatri Mantra: Om Mahalakshmyai Vidmahe Vishnu Patnyai Dhimahi Tanno Lakshmih Prachodayat',
            ],
            suggestedPlace:
                'Home altar, especially the northeast corner, or Lakshmi temple',
            suggestedTime:
                'Fridays or during Diwali, especially in the evening',
          ),
          const SizedBox(height: 20),
          _buildRitualCard(
            title: 'Saraswati Puja',
            purpose:
                'To invoke Goddess Saraswati for blessings of knowledge, wisdom, and arts.',
            mantras: [
              'Saraswati Mantra: Om Aim Saraswatyai Namah',
              'Saraswati Gayatri Mantra: Om Saraswatyai Vidmahe Brahmaputryai Dhimahi Tanno Devi Prachodayat',
            ],
            suggestedPlace:
                'Home altar, especially near books or study area, or Saraswati temple',
            suggestedTime:
                'Vasant Panchami or Wednesdays, especially in the morning',
          ),
        ],
      ),
    );
  }

  Widget _buildRitualCard({
    required String title,
    required String purpose,
    required List<String> mantras,
    required String suggestedPlace,
    required String suggestedTime,
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
              color: AppColors.startship.withOpacity(0.5),
              borderRadius: BorderRadius.vertical(
                top: Radius.circular(AppTheme.defaultHighBorderRadius),
              ),
            ),
            padding: const EdgeInsets.all(12),
            child: Column(
              children: [
                Text(
                  title,
                  style: GoogleFonts.plusJakartaSans(
                    fontSize: 24,
                    fontWeight: FontWeight.bold,
                    color: AppColors.woodsmoke,
                  ),
                ),
                const SizedBox(height: 8),
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
          Padding(
            padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
            child: Column(
              children: [
                const SizedBox(height: 12),
                _buildSection(title: 'Mantras', items: mantras),
                const SizedBox(height: 12),
                _buildDetailRow('Suggested Place:', suggestedPlace),
                const SizedBox(height: 4),
                _buildDetailRow('Suggested Time:', suggestedTime),
              ],
            ),
          )
        ],
      ),
    );
  }

  Widget _buildSection({required String title, required List<String> items}) {
    return Column(
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
    );
  }

  Widget _buildDetailRow(String label, String detail) {
    return Row(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          '$label ',
          style: GoogleFonts.plusJakartaSans(
            fontSize: 16,
            fontWeight: FontWeight.bold,
            color: AppColors.woodsmoke,
          ),
        ),
        Expanded(
          child: Text(
            detail,
            style: GoogleFonts.plusJakartaSans(
              fontSize: 16,
              color: Colors.grey[800],
            ),
          ),
        ),
      ],
    );
  }
}
