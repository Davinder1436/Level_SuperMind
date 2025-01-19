import 'package:flutter/material.dart';
import 'package:soul_buddy/common/widgets/containers/basic_animated_container.dart';
import 'package:soul_buddy/core/configs/themes/app_colors.dart';
import 'package:soul_buddy/presentation/dashboard/sub_screens_horoscope/numerology/services/numerology_service.dart';

class NumerologyGenerator extends StatefulWidget {
  final String email;
  final String token;

  const NumerologyGenerator(
      {super.key, required this.email, required this.token});

  @override
  State<NumerologyGenerator> createState() => _NumerologyGeneratorState();
}

class _NumerologyGeneratorState extends State<NumerologyGenerator> {
  final NumerologyService _service = NumerologyService();
  Map<String, dynamic>? _response;
  bool _isLoading = false;

  // final Map<String, dynamic> _requestData = ;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Numerology Data'),
        backgroundColor: AppColors.startship,
      ),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: _isLoading
            ? const Center(child: CircularProgressIndicator())
            : _response == null
                ? Center(
                    child: BasicAnimatedContainer(
                      onPressed: _fetchData,
                      customWidget: const Text(
                        "Fetch Numerology Data",
                        style: TextStyle(
                          fontSize: 16,
                          color: AppColors.woodsmoke,
                        ),
                      ),
                    ),
                  )
                : ListView(
                    children: [
                      ..._response!.entries.map(
                        (entry) => Card(
                          color: AppColors.mystic,
                          margin: const EdgeInsets.symmetric(vertical: 8.0),
                          child: ListTile(
                            title: Text(
                              entry.key,
                              style: const TextStyle(
                                fontWeight: FontWeight.bold,
                                color: AppColors.woodsmoke,
                              ),
                            ),
                            subtitle: Text(
                              entry.value.toString(),
                              style:
                                  const TextStyle(color: AppColors.woodsmoke),
                            ),
                          ),
                        ),
                      ),
                      const SizedBox(height: 20),
                      BasicAnimatedContainer(
                        onPressed: _fetchData,
                        customWidget: const Text(
                          "Fetch Again",
                          style: TextStyle(
                            fontSize: 16,
                            color: AppColors.woodsmoke,
                          ),
                        ),
                      ),
                    ],
                  ),
      ),
    );
  }

  Future<void> _fetchData() async {
    setState(() {
      _isLoading = true;
    });

    try {
      final data =
          await _service.fetchNumerologyData(widget.email, widget.token);
      setState(() {
        _response = data;
      });
    } catch (error) {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text('Error: ${error.toString()}')),
      );
    } finally {
      setState(() {
        _isLoading = false;
      });
    }
  }
}
