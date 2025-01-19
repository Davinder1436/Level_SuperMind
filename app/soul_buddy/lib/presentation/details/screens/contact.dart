import 'package:flutter/material.dart';
import 'package:soul_buddy/common/widgets/containers/basic_animated_container.dart';
import 'package:soul_buddy/common/widgets/scaffold/custom_scaffold.dart';
import 'package:soul_buddy/common/widgets/text_field/custom_text_field.dart';
import 'package:soul_buddy/core/configs/themes/app_colors.dart';
import 'package:soul_buddy/core/configs/themes/app_theme.dart';

class ContactScreen extends StatefulWidget {
  const ContactScreen({super.key});

  @override
  _ContactScreenState createState() => _ContactScreenState();
}

class _ContactScreenState extends State<ContactScreen> {
  final _formKey = GlobalKey<FormState>();
  final _nameController = TextEditingController();
  final _emailController = TextEditingController();
  final _messageController = TextEditingController();

  @override
  Widget build(BuildContext context) {
    return CustomScaffold(
      appBar: AppBar(
        title: const Text(
          'Contact Us',
          style: TextStyle(color: AppColors.woodsmoke),
        ),
        backgroundColor: Colors.transparent,
        elevation: 0,
        iconTheme: const IconThemeData(color: AppColors.woodsmoke),
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            _buildContactHeader(),
            const SizedBox(height: 32),
            _buildContactForm(),
            const SizedBox(height: 32),
            // _buildSocialLinks(),
          ],
        ),
      ),
    );
  }

  Widget _buildContactHeader() {
    return Column(
      children: [
        Container(
          width: 100,
          height: 100,
          decoration: BoxDecoration(
            color: AppColors.startship.withOpacity(0.2),
            shape: BoxShape.circle,
            border: Border.all(
              color: AppColors.woodsmoke,
              width: AppTheme.defaultBorderWidth,
            ),
          ),
          child: const Icon(
            Icons.mail_outline,
            size: 40,
            color: AppColors.woodsmoke,
          ),
        ),
        const SizedBox(height: 16),
        const Text(
          'Get in Touch',
          style: TextStyle(
            fontSize: 24,
            fontWeight: FontWeight.bold,
            color: AppColors.woodsmoke,
          ),
        ),
        const SizedBox(height: 8),
        const Text(
          'We\'re here to help you on your spiritual journey',
          textAlign: TextAlign.center,
          style: TextStyle(
            fontSize: 16,
            color: AppColors.woodsmoke,
          ),
        ),
      ],
    );
  }

  Widget _buildContactForm() {
    return Form(
      key: _formKey,
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          CustomTextField(
            label: 'Name',
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
          Padding(
            padding: const EdgeInsets.symmetric(vertical: 8.0),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                const Text(
                  'Message',
                  style: TextStyle(
                    fontSize: 16,
                    fontWeight: FontWeight.bold,
                    color: AppColors.woodsmoke,
                  ),
                ),
                const SizedBox(height: 8),
                TextFormField(
                  controller: _messageController,
                  maxLines: 5,
                  decoration: InputDecoration(
                    filled: true,
                    fillColor: Colors.white,
                    border: OutlineInputBorder(
                      borderRadius: BorderRadius.circular(
                          AppTheme.defaultHighBorderRadius),
                      borderSide: BorderSide(
                        color: AppColors.woodsmoke,
                        width: AppTheme.defaultBorderWidth,
                      ),
                    ),
                    enabledBorder: OutlineInputBorder(
                      borderRadius: BorderRadius.circular(
                          AppTheme.defaultHighBorderRadius),
                      borderSide: BorderSide(
                        color: AppColors.woodsmoke,
                        width: AppTheme.defaultBorderWidth,
                      ),
                    ),
                  ),
                  validator: (value) => value?.isEmpty ?? true
                      ? 'Please enter your message'
                      : null,
                ),
              ],
            ),
          ),
          const SizedBox(height: 16),
          BasicAnimatedContainer(
            onPressed: _handleSubmit,
            customWidget: const Center(
              child: Text(
                'Send Message',
                style: TextStyle(
                  fontSize: 18,
                  fontWeight: FontWeight.bold,
                ),
              ),
            ),
          ),
        ],
      ),
    );
  }

  // Widget _buildSocialLinks() {
  //   return Column(
  //     crossAxisAlignment: CrossAxisAlignment.center,
  //     children: [
  //       const Text(
  //         'Connect With Us',
  //         style: TextStyle(
  //           fontSize: 20,
  //           fontWeight: FontWeight.bold,
  //           color: AppColors.woodsmoke,
  //         ),
  //       ),
  //       const SizedBox(height: 16),
  //       Container(
  //         height: 70,
  //         child: GridView(
  //           gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
  //             crossAxisCount: 1, // Adjust the number of columns as needed
  //             mainAxisSpacing: 1.0,
  //             crossAxisSpacing: 1.0,
  //             childAspectRatio: 4.0, // Adjust the aspect ratio as needed
  //           ),
  //           children: [
  //             _buildSocialButton(Icons.facebook, 'Facebook'),
  //             const SizedBox(width: 16),
  //             _buildSocialButton(Icons.telegram, 'Telegram'),
  //             const SizedBox(width: 16),
  //             _buildSocialButton(Icons.one_x_mobiledata, 'Twitter'),
  //             const SizedBox(width: 16),
  //             _buildSocialButton(Icons.one_x_mobiledata, 'Linkedin'),
  //           ],
  //         ),
  //       ),
  //     ],
  //   );
  // }

  // Widget _buildSocialButton(IconData icon, String label) {
  //   return BasicAnimatedContainer(
  //     onPressed: () {
  //       // Handle social media link
  //     },
  //     customWidget: Padding(
  //       padding: const EdgeInsets.symmetric(horizontal: 16.0, vertical: 8.0),
  //       child: Row(
  //         mainAxisSize: MainAxisSize.min,
  //         children: [
  //           Icon(icon, size: 24),
  //           const SizedBox(width: 8),
  //           Text(label),
  //         ],
  //       ),
  //     ),
  //   );
  // }

  void _handleSubmit() {
    if (_formKey.currentState?.validate() ?? false) {
      // Handle form submission
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('Message sent successfully!')),
      );
    }
  }

  @override
  void dispose() {
    _nameController.dispose();
    _emailController.dispose();
    _messageController.dispose();
    super.dispose();
  }
}
