import json

# Define astrology data
planets = ["Sun", "Moon", "Mars", "Mercury", "Jupiter", "Venus", "Saturn", "Rahu", "Ketu"]
houses = list(range(1, 13))
signs = [
    "Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo", 
    "Libra", "Scorpio", "Sagittarius", "Capricorn", "Aquarius", "Pisces"
]

# Planetary dignities and traits
planet_traits = {
    "Sun": {"exalted": "Aries", "debilitated": "Libra", "traits": "Leadership, vitality, authority"},
    "Moon": {"exalted": "Taurus", "debilitated": "Scorpio", "traits": "Emotions, intuition, nurturing"},
    "Mars": {"exalted": "Capricorn", "debilitated": "Cancer", "traits": "Energy, aggression, courage"},
    "Mercury": {"exalted": "Virgo", "debilitated": "Pisces", "traits": "Communication, intellect, adaptability"},
    "Jupiter": {"exalted": "Cancer", "debilitated": "Capricorn", "traits": "Wisdom, spirituality, expansion"},
    "Venus": {"exalted": "Pisces", "debilitated": "Virgo", "traits": "Love, beauty, harmony"},
    "Saturn": {"exalted": "Libra", "debilitated": "Aries", "traits": "Discipline, karma, patience"},
    "Rahu": {"traits": "Ambition, innovation, material desires"},
    "Ketu": {"traits": "Detachment, spirituality, past karma"}
}

house_significance = {
    1: "Self, physical appearance, vitality",
    2: "Wealth, family, speech",
    3: "Communication, siblings, courage",
    4: "Home, mother, comfort",
    5: "Creativity, children, romance",
    6: "Health, enemies, service",
    7: "Partnerships, marriage, contracts",
    8: "Transformation, occult, hidden matters",
    9: "Luck, higher education, spirituality",
    10: "Career, status, public life",
    11: "Gains, friendships, aspirations",
    12: "Losses, spirituality, isolation"
}

# Function to generate detailed metrics
def generate_detailed_metrics(planet, house, sign):
    # Determine planetary strength
    if sign == planet_traits[planet].get("exalted"):
        strength = "exalted"
    elif sign == planet_traits[planet].get("debilitated"):
        strength = "debilitated"
    else:
        strength = "neutral"

    # Base suggestions
    career_advice = f"Focus on {house_significance[house].split(', ')[0]} to enhance career."
    relationship_advice = f"Develop traits aligned with {planet_traits[planet]['traits']} for better relationships."
    health_advice = f"Maintain {house_significance[house].split(', ')[1]} for overall well-being."
    spiritual_advice = "Practice mindfulness and rituals aligned with your planetary strength."

    # Adjust based on planetary strength
    if strength == "exalted":
        career_advice = f"Leverage the strong influence of {planet} in {sign} for leadership roles."
        relationship_advice = f"Your strong {planet} in {sign} brings harmony in relationships."
        health_advice = f"Enjoy robust health, but remain grounded with daily routines."
        spiritual_advice = "Engage in advanced spiritual practices to channel positivity."
    elif strength == "debilitated":
        career_advice = f"Work on improving self-discipline as {planet} in {sign} may cause challenges."
        relationship_advice = f"Be cautious of conflicts arising due to {planet} in {sign}."
        health_advice = f"Focus on improving {house_significance[house].split(', ')[2]} for balance."
        spiritual_advice = "Perform remedial rituals to strengthen planetary influence."

    # Additional details
    gemstone = {"Sun": "Ruby", "Moon": "Pearl", "Mars": "Red Coral", "Mercury": "Emerald",
                "Jupiter": "Yellow Sapphire", "Venus": "Diamond", "Saturn": "Blue Sapphire",
                "Rahu": "Hessonite", "Ketu": "Cat's Eye"}.get(planet, "None")

    rituals = [
        "Chant mantras daily specific to your planetary ruler.",
        "Offer light to your deity during sunrise and sunset.",
        "Wear the gemstone after proper consultation."
    ]

    # Return metrics
    return {
        "career": career_advice,
        "relationships": relationship_advice,
        "health": health_advice,
        "personal_growth": f"Emphasize traits like {planet_traits[planet]['traits']} to grow.",
        "spiritual_advice": spiritual_advice,
        "gemstone": gemstone,
        "rituals": rituals
    }

# Generate astrology dataset
def generate_astrology_dataset():
    dataset = {"astrology_suggestions": []}
    for planet in planets:
        for house in houses:
            for sign in signs:
                metrics = generate_detailed_metrics(planet, house, sign)
                dataset["astrology_suggestions"].append({
                    "scenario": {
                        "planet": planet,
                        "house": house,
                        "sign": sign
                    },
                    "metrics": metrics
                })
    return dataset

# Save dataset to JSON
astrology_dataset = generate_astrology_dataset()
with open("detailed_astrology_dataset.json", "w") as file:
    json.dump(astrology_dataset, file, indent=4)

print("Detailed astrology dataset generated!")
