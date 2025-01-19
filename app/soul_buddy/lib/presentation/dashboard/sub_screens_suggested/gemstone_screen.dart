import 'package:flutter/material.dart';
import 'package:soul_buddy/common/global/service_locator.dart';
import 'package:soul_buddy/core/configs/themes/app_colors.dart';
import 'package:soul_buddy/core/configs/themes/app_theme.dart';

class ZodiacInfo {
  final String zodiacSign;
  final String rulingPlanet;
  final List<GemstoneInfo> gemstones;
  final String imagePath; // Added new field for SVG path

  ZodiacInfo({
    required this.zodiacSign,
    required this.rulingPlanet,
    required this.gemstones,
    required this.imagePath,
  });
}

String getZodiacImagePath(String zodiacSign) {
  final Map<String, String> zodiacImages = {
    'Aries': 'assets/zodiac/zaries-svgrepo-com.svg',
    'Taurus': 'assets/zodiac/taurus-svgrepo-com.svg',
    'Gemini': 'assets/zodiac/gemini-svgrepo-com.svg',
    'Cancer': 'assets/zodiac/cancer-svgrepo-com.svg',
    'Leo': 'assets/zodiac/leo-svgrepo-com.svg',
    'Virgo': 'assets/zodiac/virgo-svgrepo-com.svg',
    'Libra': 'assets/zodiac/libra-svgrepo-com.svg',
    'Scorpio': 'assets/zodiac/scorpio-svgrepo-com.svg',
    'Sagittarius': 'assets/zodiac/sigittarius-svgrepo-com.svg',
    'Capricorn': 'assets/zodiac/capricorn-svgrepo-com.svg',
    'Aquarius': 'assets/images/aquarius-svgrepo-com.svg',
    'Pisces': 'assets/images/pisces-svgrepo-com.svg',
  };

  return zodiacImages[zodiacSign] ?? 'assets/images/zodiac/default.svg';
}

class GemstoneInfo {
  final String name;
  final String description;

  GemstoneInfo({
    required this.name,
    required this.description,
  });
}

class DateRange {
  final int startDay;
  final int startMonth;
  final int endDay;
  final int endMonth;

  DateRange({
    required this.startDay,
    required this.startMonth,
    required this.endDay,
    required this.endMonth,
  });

  // Parse date range from string like "19.2-20.3"
  factory DateRange.fromString(String range) {
    final parts = range.split('-');
    final startParts = parts[0].split('.');
    final endParts = parts[1].split('.');

    return DateRange(
      startDay: int.parse(startParts[0]),
      startMonth: int.parse(startParts[1]),
      endDay: int.parse(endParts[0]),
      endMonth: int.parse(endParts[1]),
    );
  }

  bool containsDate(int day, int month) {
    // Handle cases where date range spans across year end
    if (startMonth > endMonth) {
      return (month >= startMonth && day >= startDay) ||
          (month <= endMonth && day <= endDay);
    }

    // Handle cases within same month
    if (startMonth == endMonth) {
      return month == startMonth && day >= startDay && day <= endDay;
    }

    // Handle normal cases
    return (month > startMonth && month < endMonth) ||
        (month == startMonth && day >= startDay) ||
        (month == endMonth && day <= endDay);
  }
}

ZodiacInfo? findZodiacInfo(
    int day, int month, Map<String, dynamic> zodiacData) {
  try {
    final entry = zodiacData.entries.firstWhere((entry) {
      final dateRange = DateRange.fromString(entry.key);
      return dateRange.containsDate(day, month);
    });

    final data = entry.value as Map<String, dynamic>;
    final zodiacSign = data['Zodiac Sign'] as String;
    final gemstones = (data['Gemstones'] as List)
        .map((g) => GemstoneInfo(
              name: g['Gemstone'] as String,
              description: g['Description'] as String,
            ))
        .toList();

    return ZodiacInfo(
      zodiacSign: zodiacSign,
      rulingPlanet: data['Ruling Planet'] as String,
      gemstones: gemstones,
      imagePath: getZodiacImagePath(zodiacSign),
    );
  } catch (e) {
    return null;
  }
}

// Flutter UI Card Widget
class ZodiacCard extends StatelessWidget {
  final ZodiacInfo zodiacInfo;

  const ZodiacCard({super.key, required this.zodiacInfo});

  @override
  Widget build(BuildContext context) {
    return Container(
      decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(AppTheme.defaultHighBorderRadius),
        border: Border.all(
          color: AppColors.woodsmoke,
          width: AppTheme.defaultBorderWidth,
        ),
      ),
      margin: const EdgeInsets.all(16),
      child: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Container(
              padding: const EdgeInsets.symmetric(vertical: 10),
              alignment: Alignment.center,
              decoration: BoxDecoration(
                color: AppColors.startship.withOpacity(0.5),
                borderRadius:
                    BorderRadius.circular(AppTheme.defaultHighBorderRadius),
              ),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.center,
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Text(
                    zodiacInfo.zodiacSign,
                    style: Theme.of(context).textTheme.headlineSmall?.copyWith(
                          fontWeight: FontWeight.bold,
                        ),
                  ),
                  const SizedBox(height: 8),
                  Text(
                    'Ruling Planet: ${zodiacInfo.rulingPlanet}',
                    style: Theme.of(context).textTheme.titleMedium,
                  ),
                ],
              ),
            ),
            const SizedBox(height: 16),
            Text(
              'Gemstones:',
              style: Theme.of(context).textTheme.titleMedium?.copyWith(
                    fontWeight: FontWeight.bold,
                  ),
            ),
            const SizedBox(height: 8),
            ...zodiacInfo.gemstones.map((gemstone) => Padding(
                  padding: const EdgeInsets.only(bottom: 8),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        gemstone.name,
                        style: const TextStyle(fontWeight: FontWeight.w700),
                      ),
                      Text(gemstone.description),
                    ],
                  ),
                )),
          ],
        ),
      ),
    );
  }
}

class ZodiacDisplayScreen extends StatelessWidget {
  final int day;
  final int month;

  const ZodiacDisplayScreen({
    Key? key,
    required this.day,
    required this.month,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final zodiacInfo = findZodiacInfo(day, month, zodiacData);
    return Scaffold(
      appBar: AppBar(
        backgroundColor: AppColors.mystic,
        // title: const Text('Your personalized gemstones'),
      ),
      body: zodiacInfo != null
          ? SingleChildScrollView(
              child: Column(
                children: [
                  Text(
                    'Your personalized gemstones',
                    textAlign: TextAlign.center,
                    style: TextStyle(
                      fontSize: 35,
                      fontWeight: FontWeight.bold,
                      color: AppColors.woodsmoke,
                    ),
                  ),
                  const SizedBox(
                    height: 20,
                  ),
                  ZodiacCard(zodiacInfo: zodiacInfo),
                ],
              ),
            )
          : const Center(
              child: Text('No zodiac information found for this date'),
            ),
    );
  }
}
