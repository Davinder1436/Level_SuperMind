import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:soul_buddy/common/global/service_locator.dart';
import 'package:soul_buddy/common/widgets/containers/basic_animated_container.dart';
import 'package:soul_buddy/common/widgets/scaffold/custom_scaffold.dart';
import 'package:soul_buddy/core/configs/themes/app_colors.dart';
import 'package:soul_buddy/core/configs/themes/app_theme.dart';
import 'package:soul_buddy/entities/auth/signup_response.dart';
import 'package:soul_buddy/presentation/chatbot/chatbot.dart';
import 'package:soul_buddy/presentation/dashboard/sub_screens_horoscope/kundali_generator/screens/kundali_generator.dart';
import 'package:soul_buddy/presentation/dashboard/sub_screens_horoscope/numerology/screens/numerology_generator.dart';
import 'package:soul_buddy/presentation/dashboard/sub_screens_suggested/diet.dart';
import 'package:soul_buddy/presentation/dashboard/sub_screens_suggested/gemstone_screen.dart';
import 'package:soul_buddy/presentation/dashboard/sub_screens_suggested/meditation_info.dart';
import 'package:soul_buddy/presentation/dashboard/sub_screens_suggested/pranayam_screen.dart';
import 'package:soul_buddy/presentation/dashboard/sub_screens_suggested/rituals.dart';
import 'package:soul_buddy/presentation/dashboard/sub_screens_suggested/yogaassana.dart';

// class DashboardZodiacWidget extends StatelessWidget {
//   final int day;
//   final int month;
//   final Map<String, dynamic> zodiacData;

//   const DashboardZodiacWidget({
//     Key? key,
//     required this.day,
//     required this.month,
//     required this.zodiacData,
//   }) : super(key: key);

//   String? getZodiacSign() {
//     try {
//       final entry = zodiacData.entries.firstWhere((entry) {
//         final dateRange = DateRange.fromString(entry.key);
//         return dateRange.containsDate(day, month);
//       });

//       final data = entry.value as Map<String, dynamic>;
//       return data['Zodiac Sign'] as String;
//     } catch (e) {
//       return null;
//     }
//   }

//   @override
//   Widget build(BuildContext context) {
//     final zodiacSign = getZodiacSign();

//     if (zodiacSign == null) {
//       return const SizedBox.shrink();
//     }

//     return Container(
//       margin: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
//       padding: const EdgeInsets.all(12),
//       decoration: BoxDecoration(
//         color: Colors.white,
//         borderRadius: BorderRadius.circular(AppTheme.defaultHighBorderRadius),
//         border: Border.all(
//           color: AppColors.woodsmoke,
//           width: AppTheme.defaultBorderWidth,
//         ),
//       ),
//       child: Row(
//         mainAxisAlignment: MainAxisAlignment.center,
//         children: [
//           Icon(
//             Icons.stars,
//             color: AppColors.startship,
//             size: 24,
//           ),
//           const SizedBox(width: 8),
//           Text(
//             'Zodiac Sign: $zodiacSign',
//             style: GoogleFonts.plusJakartaSans(
//               fontSize: 16,
//               fontWeight: FontWeight.bold,
//               color: AppColors.woodsmoke,
//             ),
//           ),
//         ],
//       ),
//     );
//   }
// }

class Dashboard extends StatefulWidget {
  final User reponse;
  const Dashboard({super.key, required this.reponse});

  @override
  _DashboardState createState() => _DashboardState();
}

class _DashboardState extends State<Dashboard>
    with SingleTickerProviderStateMixin {
  late TabController _tabController;
  String? _token;
  int? _imageToken;
  @override
  void initState() {
    super.initState();
    _loadUserData();
    // print();
    // print(widget.reponse.dob.year);
    _tabController = TabController(length: 2, vsync: this);
  }

  @override
  void dispose() {
    _tabController.dispose();
    super.dispose();
  }

  Future<void> _loadUserData() async {
    final prefs = await SharedPreferences.getInstance();
    final imageToken = prefs.getInt('imageToken') ?? 1;
    final token = prefs.getString('token');

    setState(() {
      _token = token;
      _imageToken = imageToken;
    });
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

  @override
  Widget build(BuildContext context) {
    return CustomScaffold(
      body: Column(
        children: [
          _buildProfileHeader(),
          _buildStats(),
          Row(
            children: [
              _buildChatGuruButton(),
              _buildOptionsButton(),
            ],
          ),
          _buildTabs(),
          Expanded(
            child: TabBarView(
              controller: _tabController,
              children: [
                _buildSuggestedGrid(),
                _buildHoroscopeGrid(),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildProfileHeader() {
    return Container(
      padding: const EdgeInsets.all(16.0),
      child: Column(
        children: [
          Container(
            width: 100,
            height: 100,
            decoration: BoxDecoration(
              color: Colors.white,
              borderRadius: BorderRadius.circular(20),
              border: Border.all(
                color: AppColors.woodsmoke,
                width: AppTheme.defaultBorderWidth,
              ),
              image: DecorationImage(
                image: AssetImage('assets/avatars/a$_imageToken.png'),
                fit: BoxFit.cover,
              ),
            ),
          ),
          const SizedBox(height: 12),
          Row(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Text(
                widget.reponse.name,
                style: GoogleFonts.plusJakartaSans(
                  fontSize: 20,
                  fontWeight: FontWeight.bold,
                  color: AppColors.woodsmoke,
                ),
              ),
              SizedBox(width: 4),
              Icon(Icons.verified, color: AppColors.startship, size: 20),
            ],
          ),
          const SizedBox(height: 8),
          // Text(
          //   '@LewWebNFTs',
          //   style: GoogleFonts.plusJakartaSans(
          //     fontSize: 14,
          //     color: Colors.grey,
          //   ),
          // ),
        ],
      ),
    );
  }

  Widget _buildStats() {
    final zodiacSign = findZodiacInfo(
        widget.reponse.dob.day, widget.reponse.dob.month, zodiacData);
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 32),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          _buildStatItem('Zodiac Sign', '${zodiacSign?.zodiacSign}'),
          _buildStatItem('Ruling planet', '${zodiacSign?.rulingPlanet}'),
        ],
      ),
    );
  }

  Widget _buildStatItem(String label, String value) {
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 5),
      child: BasicAnimatedContainer(
        lightOffset: true,
        color: Colors.white,
        customWidget: Column(
          children: [
            Text(
              value,
              style: GoogleFonts.plusJakartaSans(
                fontSize: 18,
                fontWeight: FontWeight.bold,
                color: AppColors.woodsmoke,
              ),
            ),
            const SizedBox(height: 4),
            Text(
              label,
              style: GoogleFonts.plusJakartaSans(
                fontSize: 14,
                color: Colors.grey,
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildChatGuruButton() {
    return Padding(
      padding: const EdgeInsets.all(16.0),
      child: BasicAnimatedContainer(
        onPressed: () {
          Navigator.push(context, MaterialPageRoute(builder: (context) {
            return ChatbotScreen(
              userData: {
                'name': widget.reponse.name,
                'email': widget.reponse.email,
                'month_of_birth': widget.reponse.dob.month,
                'date_of_birth': widget.reponse.dob.day,
                'year_of_birth': widget.reponse.dob.year,
                'latitude': widget.reponse.latitude,
                'longitude': widget.reponse.longitude,
                'timezone': widget.reponse.timezone,
              },
            );
          }));
        },
        customWidget: Center(
          child: Text(
            'Start chatting with e Guru',
            style: GoogleFonts.plusJakartaSans(
              fontSize: 16,
              fontWeight: FontWeight.bold,
            ),
          ),
        ),
      ),
    );
  }

  Widget _buildOptionsButton() {
    return Container(
      decoration: BoxDecoration(
        boxShadow: [
          BoxShadow(
              color: AppColors.woodsmoke,
              blurRadius: 0,
              spreadRadius: 0,
              offset: const Offset(1, 1))
        ],
        color: Colors.white,
        borderRadius: BorderRadius.circular(AppTheme.defaultHighBorderRadius),
        border: Border.all(
            color: AppColors.woodsmoke, width: AppTheme.defaultBorderWidth),
      ),
      child: PopupMenuButton<String>(
        onSelected: (String result) {
          // Handle the selected option
        },
        itemBuilder: (BuildContext context) => <PopupMenuEntry<String>>[
          PopupMenuItem<String>(
            value: 'Option1',
            child: Text(
              'Option 1',
              style: GoogleFonts.plusJakartaSans(),
            ),
          ),
          PopupMenuItem<String>(
            value: 'Option2',
            child: Text(
              'Option 2',
              style: GoogleFonts.plusJakartaSans(),
            ),
          ),
          PopupMenuItem<String>(
            value: 'Option3',
            child: Text(
              'Option 3',
              style: GoogleFonts.plusJakartaSans(),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildTabs() {
    return Container(
      decoration: const BoxDecoration(
        border: Border(
          bottom: BorderSide(
            color: Colors.grey,
            width: 0.5,
          ),
        ),
      ),
      child: TabBar(
        controller: _tabController,
        labelColor: AppColors.woodsmoke,
        unselectedLabelColor: Colors.grey,
        indicatorColor: AppColors.startship,
        tabs: const [
          Tab(text: 'Suggested'),
          Tab(text: 'Horoscope'),
        ],
      ),
    );
  }

  Widget _buildSuggestedGrid() {
    return SizedBox(
      height: MediaQuery.of(context).size.height,
      child: GridView(
        shrinkWrap: true,
        // physics: const NeverScrollableScrollPhysics(),
        padding: const EdgeInsets.all(16),
        gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
          crossAxisCount: 2,
          crossAxisSpacing: 16,
          mainAxisSpacing: 16,
          childAspectRatio: 1,
        ),
        children: [
          GestureDetector(
            onTap: () {
              Navigator.push(
                context,
                MaterialPageRoute(
                  builder: (context) => ZodiacDisplayScreen(
                    day: widget.reponse.dob.day,
                    month: widget.reponse.dob.month,
                  ),
                ),
              );
            },
            child: _buildGridItem(
                title: 'Gem Stones',
                subtitle: 'subtitle',
                // imagePath: 'assets/feed_cards/gemstone_anime.jpg'
                imageIcon: Icons.diamond_outlined,
                backgroundColor: Color.fromARGB(255, 244, 232, 255),
                iconColor: Color.fromARGB(255, 155, 39, 176)),
          ),
          GestureDetector(
            onTap: () {
              Navigator.push(context, MaterialPageRoute(builder: (context) {
                return RitualsScreen();
              }));
            },
            child: _buildGridItem(
                title: 'Rituals',
                subtitle: 'subtitle',
                // imagePath: 'assets/feed_cards/rituals_anime.jpg'),
                imageIcon: Icons.person_2,
                backgroundColor: Color.fromARGB(255, 255, 232, 236),
                iconColor: Color.fromARGB(255, 255, 105, 180)),
          ),
          GestureDetector(
            onTap: () {
              Navigator.push(context, MaterialPageRoute(builder: (context) {
                return PranayamaScreen();
              }));
            },
            child: _buildGridItem(
                title: 'Pranayama',
                subtitle: 'subtitle',
                imageIcon: Icons.auto_awesome,
                // imagePath: 'assets/feed_cards/breathing_anime.jpg'
                backgroundColor: Color.fromARGB(255, 255, 255, 232),
                iconColor: Color.fromARGB(255, 214, 243, 47)),
          ),
          GestureDetector(
            onTap: () {
              Navigator.push(context, MaterialPageRoute(builder: (context) {
                return YogaAsanasScreen();
              }));
            },
            child: _buildGridItem(
                title: 'Yogaasan',
                subtitle: 'subtitle',
                imageIcon: Icons.auto_awesome,
                backgroundColor: Color.fromARGB(255, 232, 244, 255),
                iconColor: Color.fromARGB(255, 77, 166, 255)),
          ),
          GestureDetector(
            onTap: () {
              Navigator.push(context, MaterialPageRoute(builder: (context) {
                return MeditationsInfo();
              }));
            },
            child: _buildGridItem(
                title: 'Meditation',
                subtitle: 'subtitle',
                // imageIcon: 'assets/feed_cards/meditation_anime.jpg'
                imageIcon: Icons.auto_awesome,
                backgroundColor: Color.fromARGB(255, 232, 255, 232),
                iconColor: Color.fromARGB(255, 76, 175, 79)),
          ),
          GestureDetector(
            onTap: () {
              Navigator.push(context, MaterialPageRoute(builder: (context) {
                return DietScreen();
              }));
            },
            child: _buildGridItem(
                title: 'Diet',
                subtitle: 'subtitle',
                // imageIcon: 'assets/feed_cards/diet.jpg'
                imageIcon: Icons.food_bank_outlined,
                backgroundColor: Color.fromARGB(255, 255, 244, 232),
                iconColor: Color.fromARGB(255, 255, 153, 0)),
          )
        ],
      ),
    );
  }

  Widget _buildHoroscopeGrid() {
    return SizedBox(
      height: MediaQuery.of(context).size.height,
      child: GridView(
        shrinkWrap: true,
        // physics: const NeverScrollableScrollPhysics(),
        padding: const EdgeInsets.all(16),
        gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
          crossAxisCount: 2,
          crossAxisSpacing: 16,
          mainAxisSpacing: 16,
          childAspectRatio: 1,
        ),
        children: [
          GestureDetector(
            onTap: () {
              Navigator.push(context, MaterialPageRoute(builder: (context) {
                return KundaliGeneratorScreen(
                  day: widget.reponse.dob.day,
                  month: widget.reponse.dob.month,
                  year: widget.reponse.dob.year,
                  hour: widget.reponse.dob.hour,
                  min: widget.reponse.dob.minute,
                  lat: widget.reponse.latitude,
                  tzone: widget.reponse.timezone,
                  lon: widget.reponse.longitude,
                );
              }));
            },
            child: _buildHoroscopeItem(
                title: 'Kundali Generator',
                subtitle: 'subtitle',
                // imagePath: 'assets/feed_cards/gemstone_anime.jpg'
                imageIcon: Icons.engineering,
                backgroundColor: Color.fromARGB(255, 244, 232, 255),
                iconColor: Color.fromARGB(255, 155, 39, 176)),
          ),
          GestureDetector(
            onTap: () {
              Navigator.push(context, MaterialPageRoute(builder: (context) {
                return NumerologyGenerator(
                  token: _token!,
                  email: widget.reponse.email,
                );
              }));
            },
            child: _buildHoroscopeItem(
                title: 'Numerology',
                subtitle: 'subtitle',
                // imagePath: 'assets/feed_cards/rituals_anime.jpg'),
                imageIcon: Icons.format_list_numbered_rtl_sharp,
                backgroundColor: Color.fromARGB(255, 255, 232, 236),
                iconColor: Color.fromARGB(255, 255, 105, 180)),
          ),
          GestureDetector(
            onTap: () {
              Navigator.push(context, MaterialPageRoute(builder: (context) {
                return PranayamaScreen();
              }));
            },
            child: _buildHoroscopeItem(
                title: 'Daily Horoscope',
                subtitle: 'subtitle',
                imageIcon: Icons.auto_awesome,
                // imagePath: 'assets/feed_cards/breathing_anime.jpg'
                backgroundColor: Color.fromARGB(255, 255, 255, 232),
                iconColor: Color.fromARGB(255, 214, 243, 47)),
          ),
          GestureDetector(
            onTap: () {
              Navigator.push(context, MaterialPageRoute(builder: (context) {
                return YogaAsanasScreen();
              }));
            },
            child: _buildHoroscopeItem(
                title: 'Month Horoscope',
                subtitle: 'subtitle',
                imageIcon: Icons.auto_awesome,
                backgroundColor: Color.fromARGB(255, 232, 244, 255),
                iconColor: Color.fromARGB(255, 77, 166, 255)),
          ),
          GestureDetector(
            onTap: () {
              Navigator.push(context, MaterialPageRoute(builder: (context) {
                return MeditationsInfo();
              }));
            },
            child: _buildHoroscopeItem(
                title: 'Meditation',
                subtitle: 'subtitle',
                // imageIcon: 'assets/feed_cards/meditation_anime.jpg'
                imageIcon: Icons.auto_awesome,
                backgroundColor: Color.fromARGB(255, 232, 255, 232),
                iconColor: Color.fromARGB(255, 76, 175, 79)),
          ),
          GestureDetector(
            onTap: () {
              Navigator.push(context, MaterialPageRoute(builder: (context) {
                return DietScreen();
              }));
            },
            child: _buildHoroscopeItem(
                title: 'Diet',
                subtitle: 'subtitle',
                // imageIcon: 'assets/feed_cards/diet.jpg'
                imageIcon: Icons.food_bank_outlined,
                backgroundColor: Color.fromARGB(255, 255, 244, 232),
                iconColor: Color.fromARGB(255, 255, 153, 0)),
          )
        ],
      ),
    );
  }

  Widget _buildGridItem(
      {required String title,
      required String subtitle,
      required IconData imageIcon,
      required Color backgroundColor,
      required Color iconColor}) {
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
          Expanded(
            child: Container(
              decoration: BoxDecoration(
                color: AppColors.startship.withOpacity(0.1),
                borderRadius: const BorderRadius.only(
                  topLeft: Radius.circular(12),
                  topRight: Radius.circular(12),
                ),
              ),
              clipBehavior: Clip.hardEdge,
              child: Container(
                color: backgroundColor, // Set the background color for the icon
                child: Center(
                  child: Icon(
                    imageIcon, // Replace with your desired icon
                    size: 40,
                    color: iconColor,
                  ),
                ),
              ),
            ),
          ),
          // Expanded(
          //   child: Container(
          //     decoration: BoxDecoration(
          //       color: AppColors.startship.withOpacity(0.1),
          //       borderRadius: const BorderRadius.only(
          //         topLeft: Radius.circular(12),
          //         topRight: Radius.circular(12),
          //       ),
          //     ),
          //     clipBehavior: Clip.hardEdge,
          //     child: AspectRatio(
          //       aspectRatio: 1.0, // Ensures the container remains square
          //       child: Image.asset(
          //         imagePath,
          //         width: double.infinity,
          //         height: double.infinity,
          //         fit: BoxFit.cover,
          //       ),
          //     ),
          //   ),
          // ),
          Padding(
            padding: const EdgeInsets.all(8.0),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  title,
                  style: GoogleFonts.plusJakartaSans(
                    fontWeight: FontWeight.bold,
                    color: AppColors.woodsmoke,
                  ),
                ),
                const SizedBox(height: 4),
                Text(
                  subtitle,
                  style: GoogleFonts.plusJakartaSans(
                    fontSize: 12,
                    color: Colors.grey[600],
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildHoroscopeItem(
      {required String title,
      required String subtitle,
      required IconData imageIcon,
      required Color backgroundColor,
      required Color iconColor}) {
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
          Expanded(
            child: Container(
              decoration: BoxDecoration(
                color: AppColors.startship.withOpacity(0.1),
                borderRadius: const BorderRadius.only(
                  topLeft: Radius.circular(12),
                  topRight: Radius.circular(12),
                ),
              ),
              clipBehavior: Clip.hardEdge,
              child: Container(
                color: backgroundColor, // Set the background color for the icon
                child: Center(
                  child: Icon(
                    imageIcon, // Replace with your desired icon
                    size: 40,
                    color: iconColor,
                  ),
                ),
              ),
            ),
          ),
          Padding(
            padding: const EdgeInsets.all(8.0),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  title,
                  style: GoogleFonts.plusJakartaSans(
                    fontWeight: FontWeight.bold,
                    color: AppColors.woodsmoke,
                  ),
                ),
                const SizedBox(height: 4),
                Text(
                  subtitle,
                  style: GoogleFonts.plusJakartaSans(
                    fontSize: 12,
                    color: Colors.grey[600],
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
