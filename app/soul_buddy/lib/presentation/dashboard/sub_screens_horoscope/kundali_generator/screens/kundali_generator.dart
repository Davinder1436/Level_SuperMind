import 'package:flutter/material.dart';
import 'package:flutter_svg/flutter_svg.dart';
import 'package:soul_buddy/presentation/dashboard/sub_screens_horoscope/kundali_generator/services/kundali_service.dart';

class KundaliGeneratorScreen extends StatefulWidget {
  final int day;
  final int month;
  final int year;
  final int hour;
  final int min;
  final double lat;
  final double tzone;
  final double lon;
  const KundaliGeneratorScreen(
      {super.key,
      required this.day,
      required this.month,
      required this.year,
      required this.hour,
      required this.min,
      required this.lat,
      required this.tzone,
      required this.lon});

  @override
  _KundaliGeneratorScreenState createState() => _KundaliGeneratorScreenState();
}

class _KundaliGeneratorScreenState extends State<KundaliGeneratorScreen> {
  String? svgData;
  bool isLoading = false;
  final KundaliApiService _apiService = KundaliApiService();

  void fetchChart() async {
    print('Fetching chart');
    setState(() {
      isLoading = true;
    });

    try {
      // int day, int month, int year, int hour, int min,
      // double lat, double lon, double tzone
      final response = await _apiService.fetchSvgChart(
          widget.day,
          widget.month,
          widget.year,
          widget.hour,
          widget.min,
          widget.lat,
          widget.lon,
          widget.tzone);
      setState(() {
        svgData = response;
        print(svgData);
        isLoading = false;
      });
    } catch (e) {
      setState(() {
        isLoading = false;
      });
      ScaffoldMessenger.of(context)
          .showSnackBar(SnackBar(content: Text('Failed to load chart')));
    }
  }

  @override
  void initState() {
    super.initState();
    fetchChart();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('SVG Chart Viewer')),
      body: Center(
        child: isLoading
            ? CircularProgressIndicator(
                color: Colors.red,
              )
            : svgData != null
                ? Column(
                    children: [
                      SvgPicture.string(
                        svgData!,
                        width: 300,
                        height: 300,
                      ),
                    ],
                  )
                : ElevatedButton(
                    onPressed: fetchChart,
                    child: Text('Fetch Chart'),
                  ),
      ),
    );
  }
}
