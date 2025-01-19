// signup_screen.dart
import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:soul_buddy/common/global/service_locator.dart';
import 'package:soul_buddy/common/widgets/containers/basic_animated_container.dart';
import 'package:soul_buddy/common/widgets/text_field/custom_text_field.dart';
import 'package:soul_buddy/core/configs/themes/app_colors.dart';
import 'package:soul_buddy/core/configs/themes/app_theme.dart';
import 'package:soul_buddy/data/models/user/sign_up_request.dart';
import 'package:soul_buddy/entities/auth/signup_response.dart';
import 'package:soul_buddy/presentation/auth/widgets/image_carousel.dart';
import 'package:http/http.dart' as http;
import 'package:soul_buddy/presentation/dashboard/dashboard.dart';
import '../../../common/widgets/scaffold/custom_scaffold.dart';

class SignupScreen extends StatefulWidget {
  const SignupScreen({super.key});

  @override
  _SignupScreenState createState() => _SignupScreenState();
}

class _SignupScreenState extends State<SignupScreen> {
  final _formKey = GlobalKey<FormState>();
  final _nameController = TextEditingController();
  final _emailController = TextEditingController();
  final _passwordController = TextEditingController();
  DateTime? _selectedDate;
  TimeOfDay? _selectedTime;
  String? _selectedGender;
  String? _selectedState;
  String? _selectedCity;

  final List<String> _genders = ['male', 'female'];

  // Future<SignUpResponse> _sendDataToServer(UserData userData) async {
  //   final response = await http.post(
  //     Uri.parse(signupUrl),
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: json.encode({
  //       "name": userData.name,
  //       "email": userData.email,
  //       "password": userData.password,
  //       "dob": userData.dob,
  //       "time": userData.timeOfBirth.format(context),
  //       "gender": userData.gender,
  //       "state": userData.state,
  //       "city": userData.city,
  //     }),
  //   );

  //   if (response.statusCode == 200 || response.statusCode == 201) {
  //     final responseData = json.decode(response.body);
  //     print("signup succesfully");
  //     print(responseData);

  //     print('response data end');
  //     // Deserialize the response into SignUpResponse

  //     return SignUpResponse.fromJson(responseData);
  //   } else {
  //     print("signup failed");
  //     print(response.body);
  //     print(response.statusCode);
  //     throw Exception('Failed to sign up: ${response.body}');
  //   }
  // }

  // Future<void> _storeResponseLocally(SignUpResponse signUpResponse) async {
  //   final user = signUpResponse.user;
  //   final token = signUpResponse.token;

  //   // Parse longitude and latitude as doubles
  //   final double longitude = double.parse(user.longitude.toString());
  //   final double latitude = double.parse(user.latitude.toString());

  //   // Store the user data and token locally
  //   final userData = {
  //     'email': user.email,
  //     'name': user.name,
  //     'dob': user.dob,
  //     'time': user.time,
  //     'gender': user.gender,
  //     'state': user.state,
  //     'city': user.city,
  //     'longitude': longitude,
  //     'latitude': latitude,
  //     'timezone': user.timezone,
  //     // 'created_at': user.createdAt,
  //   };
  //   print("started to store locally");
  //   final prefs = await SharedPreferences.getInstance();
  //   await prefs.setString('user', json.encode(userData));
  //   await prefs.setString('token', signUpResponse.token);
  //   await prefs.setBool('log', true);
  //   print("Response stored locally.");
  // }

  // void _handleSignUp() async {
  //   if (_formKey.currentState?.validate() ?? false) {
  //     if (_selectedDate == null ||
  //         _selectedTime == null ||
  //         _selectedGender == null ||
  //         _selectedState == null ||
  //         _selectedCity == null) {
  //       ScaffoldMessenger.of(context).showSnackBar(
  //         const SnackBar(content: Text('Please fill in all fields')),
  //       );
  //       return;
  //     }

  //     final userData = UserData(
  //       email: _emailController.text,
  //       name: _nameController.text,
  //       dob: _selectedDate.toString(),
  //       timeOfBirth: _selectedTime!,
  //       gender: _selectedGender!,
  //       state: _selectedState!,
  //       city: _selectedCity!,
  //       password: _passwordController.text.trim(),
  //     );

  //     try {
  //       print('before response');
  //       final response = await _sendDataToServer(userData);
  //       print('after response');
  //       print('before locally');

  //       await _storeResponseLocally(response);
  //       print('after locally');

  //       ScaffoldMessenger.of(context).showSnackBar(
  //         const SnackBar(content: Text('Sign up successful')),
  //       );
  //     } catch (error) {
  //       print(error);
  //       ScaffoldMessenger.of(context).showSnackBar(
  //         SnackBar(content: Text('Error: $error')),
  //       );
  //     }
  //   }
  // }

  Future<Map<String, dynamic>> _sendDataToServer(UserData userData) async {
    final response = await http.post(
      Uri.parse(signupUrl),
      headers: {
        'Content-Type': 'application/json',
      },
      body: json.encode({
        "name": userData.name,
        "email": userData.email,
        "password": userData.password,
        "dob": userData.dob,
        "time": userData.timeOfBirth.format(context),
        "gender": userData.gender,
        "state": userData.state,
        "city": userData.city,
      }),
    );

    if (response.statusCode == 200 || response.statusCode == 201) {
      final responseData = json.decode(response.body);
      print("Signup successful");
      print(responseData);
      return responseData; // Directly returning the parsed map
    } else {
      print("Signup failed");
      print(response.body);
      print(response.statusCode);
      throw Exception('Failed to sign up: ${response.body}');
    }
  }

  Future<void> _storeResponseLocally(Map<String, dynamic> responseData) async {
    final user = responseData['user'];
    final token = responseData['token'];
    final imageToken = imageIndex;

    // Parse longitude and latitude as doubles
    final double longitude = double.parse(user['longitude'].toString());
    final double latitude = double.parse(user['latitude'].toString());

    // Store the user data and token locally
    final userData = {
      'email': user['email'],
      'name': user['name'],
      'dob': user['dob'],
      'time': user['time'],
      'gender': user['gender'],
      'state': user['state'],
      'city': user['city'],
      'longitude': longitude,
      'latitude': latitude,
      'timezone': user['timezone'],
    };

    print("Started to store locally");
    final prefs = await SharedPreferences.getInstance();
    await prefs.setString('user', json.encode(userData));
    await prefs.setString('token', token);
    await prefs.setInt('imageToken', imageToken);
    await prefs.setBool('log', true);
    print("Response stored locally.");
  }

  void _handleSignUp() async {
    if (_formKey.currentState?.validate() ?? false) {
      if (_selectedDate == null ||
          _selectedTime == null ||
          _selectedGender == null ||
          _selectedState == null ||
          _selectedCity == null) {
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(content: Text('Please fill in all fields')),
        );
        return;
      }

      final userData = UserData(
        email: _emailController.text,
        name: _nameController.text,
        dob: _selectedDate.toString(),
        timeOfBirth: _selectedTime!,
        gender: _selectedGender!,
        state: _selectedState!,
        city: _selectedCity!,
        password: _passwordController.text.trim(),
      );

      try {
        print('Before response');
        final responseData = await _sendDataToServer(userData);
        print('After response');
        print('Before locally');

        await _storeResponseLocally(responseData);
        print('After locally');
        print(responseData);

        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(content: Text('Sign up successful')),
        );
        Navigator.push(
            context,
            MaterialPageRoute(
                builder: (context) => Dashboard(
                        reponse: User(
                      email: responseData['user']['email'],
                      name: responseData['user']['name'],
                      dob: DateTime.parse(responseData['user']['dob']),
                      time: responseData['user']['time'],
                      gender: responseData['user']['gender'],
                      state: responseData['user']['state'],
                      city: responseData['user']['city'],
                      longitude: double.parse(
                          responseData['user']['longitude'].toString()),
                      latitude: double.parse(
                          responseData['user']['latitude'].toString()),
                      timezone: double.parse(
                          responseData['user']['timezone'].toString()),
                    ))));
      } catch (error) {
        print(error);
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text('Error: $error')),
        );
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    return CustomScaffold(
      appBar: AppBar(
        title: const Text('Sign Up'),
        backgroundColor: Colors.transparent,
        elevation: 0,
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16.0),
        child: Form(
          key: _formKey,
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              const SizedBox(height: 20),
              ImageCarousel(),
              const SizedBox(height: 32),
              CustomTextField(
                label: 'Full Name',
                controller: _nameController,
                validator: (value) =>
                    value?.isEmpty ?? true ? 'Please enter your name' : null,
              ),
              CustomTextField(
                label: 'Email',
                controller: _emailController,
                keyboardType: TextInputType.emailAddress,
                validator: (value) =>
                    value?.isEmpty ?? true ? 'Please enter your email' : null,
              ),
              CustomTextField(
                label: 'Password',
                controller: _passwordController,
                keyboardType: TextInputType.emailAddress,
                validator: (value) =>
                    value?.isEmpty ?? true ? 'Please enter your email' : null,
              ),
              _buildDatePicker(),
              _buildTimePicker(),
              _buildDropdown(
                label: 'Gender',
                value: _selectedGender,
                items: _genders,
                onChanged: (value) => setState(() => _selectedGender = value),
              ),
              _buildDropdown(
                label: 'State',
                value: _selectedState,
                items: states,
                onChanged: (value) {
                  setState(() {
                    _selectedState = value;
                    _selectedCity = null;
                  });
                },
              ),
              if (_selectedState != null)
                _buildDropdown(
                  label: 'City',
                  value: _selectedCity,
                  items: citiesByState[_selectedState]!,
                  onChanged: (value) => setState(() => _selectedCity = value),
                ),
              const SizedBox(height: 32),
              BasicAnimatedContainer(
                onPressed: _handleSignUp,
                customWidget: const Center(
                  child: Text(
                    'Sign Up',
                    style: TextStyle(
                      fontSize: 18,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildDatePicker() {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 8.0),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const Text(
            'Date of Birth',
            style: TextStyle(
              fontSize: 16,
              fontWeight: FontWeight.bold,
              color: AppColors.woodsmoke,
            ),
          ),
          const SizedBox(height: 8),
          BasicAnimatedContainer(
            onPressed: () async {
              final date = await showDatePicker(
                context: context,
                initialDate: DateTime(1990),
                firstDate: DateTime(1900),
                lastDate: DateTime.now(),
              );
              if (date != null) {
                setState(() => _selectedDate = date);
              }
            },
            customWidget: Padding(
              padding: const EdgeInsets.symmetric(vertical: 8.0),
              child: Text(
                _selectedDate != null
                    ? '${_selectedDate!.year}-${_selectedDate!.month.toString().padLeft(2, '0')}-${_selectedDate!.day.toString().padLeft(2, '0')}'
                    : 'Select Date',
              ),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildTimePicker() {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 8.0),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const Text(
            'Time of Birth',
            style: TextStyle(
              fontSize: 16,
              fontWeight: FontWeight.bold,
              color: AppColors.woodsmoke,
            ),
          ),
          const SizedBox(height: 8),
          BasicAnimatedContainer(
            onPressed: () async {
              final time = await showTimePicker(
                context: context,
                initialTime: TimeOfDay.now(),
              );
              if (time != null) {
                setState(() => _selectedTime = time);
              }
            },
            customWidget: Padding(
              padding: const EdgeInsets.symmetric(vertical: 8.0),
              child: Text(
                _selectedTime != null
                    ? '${_selectedTime!.hour.toString().padLeft(2, '0')}:${_selectedTime!.minute.toString().padLeft(2, '0')}'
                    : 'Select Time',
              ),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildDropdown({
    required String label,
    required String? value,
    required List<String> items,
    required void Function(String?)? onChanged,
  }) {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 8.0),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            label,
            style: const TextStyle(
              fontSize: 16,
              fontWeight: FontWeight.bold,
              color: AppColors.woodsmoke,
            ),
          ),
          const SizedBox(height: 8),
          Container(
            decoration: BoxDecoration(
              color: Colors.white,
              borderRadius:
                  BorderRadius.circular(AppTheme.defaultHighBorderRadius),
              border: Border.all(
                color: AppColors.woodsmoke,
                width: AppTheme.defaultBorderWidth,
              ),
            ),
            padding: const EdgeInsets.symmetric(horizontal: 16),
            child: DropdownButtonHideUnderline(
              child: DropdownButton<String>(
                value: value,
                isExpanded: true,
                hint: Text('Select $label'),
                items: items.map((String item) {
                  return DropdownMenuItem(
                    value: item,
                    child: Text(item),
                  );
                }).toList(),
                onChanged: onChanged,
              ),
            ),
          ),
        ],
      ),
    );
  }

  @override
  void dispose() {
    _nameController.dispose();
    _emailController.dispose();
    super.dispose();
  }
}
