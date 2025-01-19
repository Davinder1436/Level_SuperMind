import 'package:flutter/material.dart';
import 'package:soul_buddy/common/global/service_locator.dart';
import 'package:soul_buddy/core/configs/themes/app_colors.dart';
import 'package:soul_buddy/core/configs/themes/app_theme.dart';

class ImageCarousel extends StatefulWidget {
  const ImageCarousel({Key? key}) : super(key: key);

  @override
  State<ImageCarousel> createState() => _ImageCarouselState();
}

class _ImageCarouselState extends State<ImageCarousel> {
  // Current image index
  int _currentIndex = 0;

  // List of image paths - replace these with your actual image paths
  final List<String> imagePaths = [
    'assets/avatars/a1.png',
    'assets/avatars/a2.png',
    'assets/avatars/a3.png',
    'assets/avatars/a4.png',
    'assets/avatars/a5.png',
    'assets/avatars/a6.png',
    'assets/avatars/a7.png',
    'assets/avatars/a8.png',
    'assets/avatars/a9.png',
    'assets/avatars/a10.png',
  ];

  void _refreshImage() {
    setState(() {
      _currentIndex = (_currentIndex + 1) % imagePaths.length;
      print('Current index: $_currentIndex');
      imageIndex = _currentIndex;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Column(
      mainAxisAlignment: MainAxisAlignment.center,
      children: [
        Center(
          child: Container(
            width: 100,
            height: 100,
            decoration: BoxDecoration(
              color: AppColors.startship.withOpacity(0.3),
              shape: BoxShape.circle,
              border: Border.all(
                color: AppColors.woodsmoke,
                width: AppTheme.defaultBorderWidth,
              ),
            ),
            child: ClipOval(
              child: Image.asset(
                imagePaths[_currentIndex],
                fit: BoxFit.cover,
                errorBuilder: (context, error, stackTrace) {
                  // Fallback to icon if image fails to load
                  return const Icon(Icons.person, size: 50);
                },
              ),
            ),
          ),
        ),
        const SizedBox(height: 16),
        InkWell(
          onTap: _refreshImage,
          child: Icon(
            (Icons.refresh),
          ),
        ),
      ],
    );
  }
}
