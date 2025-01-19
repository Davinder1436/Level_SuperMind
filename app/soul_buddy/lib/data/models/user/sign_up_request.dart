import 'package:flutter/material.dart';

class UserData {
  final String email;
  final String name;
  final String dob;
  final TimeOfDay timeOfBirth;
  final String gender;
  final String state;
  final String city;
  final DateTime createdAt;
  final String password;

  UserData({
    required this.password,
    required this.email,
    required this.name,
    required this.dob,
    required this.timeOfBirth,
    required this.gender,
    required this.state,
    required this.city,
    DateTime? createdAt,
  }) : createdAt = createdAt ?? DateTime.now();

  Map<String, dynamic> toJson() {
    return {
      'email': email,
      'name': name,
      'dob': dob,
      'time':
          '${timeOfBirth.hour.toString().padLeft(2, '0')}:${timeOfBirth.minute.toString().padLeft(2, '0')}:00',
      'gender': gender,
      'state': state,
      'city': city,
      'created_at': createdAt.toIso8601String(),
    };
  }
}
