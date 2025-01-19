int imageIndex = 0;

const String signupUrl =
    'https://bb51-13-51-200-36.ngrok-free.app/api/auth/signup';

final List<String> states = [
  'Andhra Pradesh',
  'Arunachal Pradesh',
  'Assam',
  'Bihar',
  'Chhattisgarh',
  'Goa',
  'Gujarat',
  'Haryana',
  'Himachal Pradesh',
  'Jharkhand',
  'Karnataka',
  'Kerala',
  'Madhya Pradesh',
  'Maharashtra',
  'Manipur',
  'Meghalaya',
  'Mizoram',
  'Nagaland',
  'Odisha',
  'Punjab',
  'Rajasthan',
  'Sikkim',
  'Tamil Nadu',
  'Telangana',
  'Tripura',
  'Uttar Pradesh',
  'Uttarakhand',
  'West Bengal',
];

final Map<String, List<String>> citiesByState = {
  'Andhra Pradesh': [
    'Visakhapatnam',
    'Vijayawada',
    'Guntur',
    'Tirupati',
    'Nellore',
    'Kakinada',
    'Rajahmundry'
  ],
  'Arunachal Pradesh': ['Itanagar', 'Tawang', 'Ziro', 'Bomdila', 'Pasighat'],
  'Assam': ['Guwahati', 'Jorhat', 'Dibrugarh', 'Silchar', 'Tezpur', 'Nagaon'],
  'Bihar': ['Patna', 'Gaya', 'Bhagalpur', 'Muzaffarpur', 'Purnia', 'Nalanda'],
  'Chhattisgarh': [
    'Raipur',
    'Bilaspur',
    'Durg',
    'Korba',
    'Raigarh',
    'Jagdalpur'
  ],
  'Goa': ['Panaji', 'Margao', 'Vasco da Gama', 'Mapusa', 'Ponda'],
  'Gujarat': [
    'Ahmedabad',
    'Surat',
    'Vadodara',
    'Rajkot',
    'Bhavnagar',
    'Junagadh',
    'Anand'
  ],
  'Haryana': [
    'Chandigarh',
    'Faridabad',
    'Gurugram',
    'Ambala',
    'Sonipat',
    'Hisar'
  ],
  'Himachal Pradesh': [
    'Shimla',
    'Dharamshala',
    'Kullu',
    'Mandi',
    'Solan',
    'Una'
  ],
  'Jharkhand': [
    'Ranchi',
    'Jamshedpur',
    'Dhanbad',
    'Bokaro',
    'Hazaribagh',
    'Deoghar'
  ],
  'Karnataka': [
    'Bengaluru',
    'Mysuru',
    'Mangaluru',
    'Hubli',
    'Belagavi',
    'Tumakuru',
    'Davangere'
  ],
  'Kerala': [
    'Thiruvananthapuram',
    'Kochi',
    'Kozhikode',
    'Kollam',
    'Thrissur',
    'Malappuram'
  ],
  'Madhya Pradesh': [
    'Bhopal',
    'Indore',
    'Gwalior',
    'Ujjain',
    'Jabalpur',
    'Sagar',
    'Rewa'
  ],
  'Maharashtra': [
    'Mumbai',
    'Pune',
    'Nagpur',
    'Nashik',
    'Aurangabad',
    'Thane',
    'Solapur',
    'Kolhapur'
  ],
  'Manipur': ['Imphal', 'Churachandpur', 'Thoubal', 'Bishnupur', 'Kakching'],
  'Meghalaya': ['Shillong', 'Tura', 'Jowai', 'Nongstoin', 'Williamnagar'],
  'Mizoram': ['Aizawl', 'Lunglei', 'Champhai', 'Kolasib', 'Serchhip'],
  'Nagaland': ['Kohima', 'Dimapur', 'Mokokchung', 'Wokha', 'Mon'],
  'Odisha': [
    'Bhubaneswar',
    'Cuttack',
    'Rourkela',
    'Berhampur',
    'Sambalpur',
    'Balasore'
  ],
  'Punjab': [
    'Chandigarh',
    'Amritsar',
    'Ludhiana',
    'Jalandhar',
    'Patiala',
    'Bathinda'
  ],
  'Rajasthan': [
    'Jaipur',
    'Udaipur',
    'Jodhpur',
    'Ajmer',
    'Kota',
    'Bikaner',
    'Churu'
  ],
  'Sikkim': ['Gangtok', 'Namchi', 'Pakyong', 'Mangan'],
  'Tamil Nadu': [
    'Chennai',
    'Coimbatore',
    'Madurai',
    'Tiruchirappalli',
    'Salem',
    'Tirunelveli',
    'Vellore'
  ],
  'Telangana': [
    'Hyderabad',
    'Warangal',
    'Khammam',
    'Nizamabad',
    'Karimnagar',
    'Khammam'
  ],
  'Tripura': ['Agartala', 'Udaipur', 'Kailashahar', 'Sabroom'],
  'Uttar Pradesh': [
    'Lucknow',
    'Kanpur',
    'Varanasi',
    'Agra',
    'Meerut',
    'Allahabad',
    'Bareilly',
    'Ghaziabad'
  ],
  'Uttarakhand': [
    'Dehradun',
    'Haridwar',
    'Rishikesh',
    'Nainital',
    'Haldwani',
    'Roorkee'
  ],
  'West Bengal': [
    'Kolkata',
    'Siliguri',
    'Durgapur',
    'Asansol',
    'Howrah',
    'Kalyani',
    'Midnapore'
  ],
};

final zodiacData = {
  "21.3-19.4": {
    "Zodiac Sign": "Aries",
    "Ruling Planet": "Mars",
    "Gemstones": [
      {
        "Gemstone": "Red Coral",
        "Description": "Enhances courage and vitality."
      },
      {
        "Gemstone": "Bloodstone",
        "Description": "Promotes strength and endurance."
      }
    ]
  },
  "20.4-20.5": {
    "Zodiac Sign": "Taurus",
    "Ruling Planet": "Venus",
    "Gemstones": [
      {"Gemstone": "Emerald", "Description": "Brings prosperity and harmony."},
      {
        "Gemstone": "Lapis Lazuli",
        "Description": "Encourages wisdom and truth."
      }
    ]
  },
  "21.5-20.6": {
    "Zodiac Sign": "Gemini",
    "Ruling Planet": "Mercury",
    "Gemstones": [
      {
        "Gemstone": "Agate",
        "Description": "Improves communication and intellect."
      },
      {
        "Gemstone": "Citrine",
        "Description": "Stimulates creativity and mental clarity."
      }
    ]
  },
  "21.6-22.7": {
    "Zodiac Sign": "Cancer",
    "Ruling Planet": "Moon",
    "Gemstones": [
      {
        "Gemstone": "Pearl",
        "Description": "Enhances emotional balance and intuition."
      },
      {
        "Gemstone": "Moonstone",
        "Description": "Promotes inner growth and strength."
      }
    ]
  },
  "23.7-22.8": {
    "Zodiac Sign": "Leo",
    "Ruling Planet": "Sun",
    "Gemstones": [
      {"Gemstone": "Ruby", "Description": "Boosts confidence and vitality."},
      {
        "Gemstone": "Peridot",
        "Description": "Encourages abundance and prosperity."
      }
    ]
  },
  "23.8-22.9": {
    "Zodiac Sign": "Virgo",
    "Ruling Planet": "Mercury",
    "Gemstones": [
      {
        "Gemstone": "Sapphire",
        "Description": "Enhances wisdom and mental clarity."
      },
      {
        "Gemstone": "Carnelian",
        "Description": "Promotes creativity and motivation."
      }
    ]
  },
  "23.9-22.10": {
    "Zodiac Sign": "Libra",
    "Ruling Planet": "Venus",
    "Gemstones": [
      {"Gemstone": "Opal", "Description": "Encourages love and passion."},
      {"Gemstone": "Peridot", "Description": "Brings harmony and balance."}
    ]
  },
  "23.10-21.11": {
    "Zodiac Sign": "Scorpio",
    "Ruling Planet": "Mars",
    "Gemstones": [
      {"Gemstone": "Topaz", "Description": "Enhances strength and courage."},
      {
        "Gemstone": "Aquamarine",
        "Description": "Promotes emotional healing and clarity."
      }
    ]
  },
  "22.11-21.12": {
    "Zodiac Sign": "Sagittarius",
    "Ruling Planet": "Jupiter",
    "Gemstones": [
      {
        "Gemstone": "Turquoise",
        "Description": "Encourages optimism and good fortune."
      },
      {
        "Gemstone": "Amethyst",
        "Description": "Promotes spiritual growth and tranquility."
      }
    ]
  },
  "22.12-19.1": {
    "Zodiac Sign": "Capricorn",
    "Ruling Planet": "Saturn",
    "Gemstones": [
      {
        "Gemstone": "Garnet",
        "Description": "Enhances determination and perseverance."
      },
      {"Gemstone": "Onyx", "Description": "Provides strength and support."}
    ]
  },
  "20.1-18.2": {
    "Zodiac Sign": "Aquarius",
    "Ruling Planet": "Uranus",
    "Gemstones": [
      {
        "Gemstone": "Amethyst",
        "Description": "Promotes spiritual awareness and intuition."
      },
      {"Gemstone": "Garnet", "Description": "Encourages passion and energy."}
    ]
  },
  "19.2-20.3": {
    "Zodiac Sign": "Pisces",
    "Ruling Planet": "Neptune",
    "Gemstones": [
      {
        "Gemstone": "Aquamarine",
        "Description": "Enhances intuition and emotional healing."
      },
      {"Gemstone": "Jade", "Description": "Promotes serenity and balance."}
    ]
  }
};
