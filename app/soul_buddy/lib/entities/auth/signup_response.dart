class User {
  final String email;
  final String name;
  final DateTime dob;
  final String time;
  final String gender;
  final String state;
  final String city;
  final double longitude;
  final double latitude;
  final double timezone;
  // final String createdAt;

  User({
    required this.email,
    required this.name,
    required this.dob,
    required this.time,
    required this.gender,
    required this.state,
    required this.city,
    required this.longitude,
    required this.latitude,
    required this.timezone,
    // required this.createdAt,
  });

  factory User.fromJson(Map<String, dynamic> json) {
    return User(
      email: json['email'],
      name: json['name'],
      dob: DateTime.parse(json['dob']),
      time: json['time'],
      gender: json['gender'],
      state: json['state'],
      city: json['city'],
      longitude: double.parse(json['longitude'].toString()),
      latitude: double.parse(json['latitude'].toString()),
      timezone: double.parse(json['timezone'].toString()),
      // createdAt: DateTime.parse(json['created_at']),
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'email': email,
      'name': name,
      'dob': dob.toIso8601String(),
      'time': time,
      'gender': gender,
      'state': state,
      'city': city,
      'longitude': longitude,
      'latitude': latitude,
      'timezone': timezone,
      // 'created_at': createdAt.toIso8601String(),
    };
  }
}

class SignUpResponse {
  final User user;
  final String token;

  SignUpResponse({required this.user, required this.token});

  factory SignUpResponse.fromJson(Map<String, dynamic> json) {
    return SignUpResponse(
      user: User.fromJson(json['user']),
      token: json['token'],
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'user': user.toJson(),
      'token': token,
    };
  }
}
