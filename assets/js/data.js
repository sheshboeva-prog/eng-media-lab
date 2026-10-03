/**
 * Site content.
 * Videos are YouTube lessons; the card links straight to the watch page.
 * Tests run in the page and are scored locally.
 * Games run on the engines in app.js: `kind` picks the engine, and the rest of the
 * fields are that engine's content. Photographs are public domain.
 */

export const videos = [
  {
    id: 'zarll9bx6FI',
    title: 'What Happens If a City Loses All Its Trees?',
    desc: 'A TED-Ed lesson on what urban trees actually do for air, heat and water.',
    topic: 'Environment', channel: 'TED-Ed', duration: '5:26',
  },
  {
    id: 'fKnAJCSGSdk',
    title: 'Urbanization and the Future of Cities',
    desc: 'How cities grew from small settlements into megacities, and where they go next.',
    topic: 'Cities', channel: 'TED-Ed', duration: '4:08',
  },
  {
    id: '-T__YWoq45I',
    title: 'Is AI the Most Important Technology of the Century?',
    desc: 'The promise and the risk of artificial intelligence, explained in five minutes.',
    topic: 'Technology', channel: 'TED-Ed', duration: '5:20',
  },
  {
    id: 'W4CHY-Pp3g4',
    title: 'Social Media Addiction and How to Break It',
    desc: 'Why the feed is so hard to put down, and what actually helps.',
    topic: 'Wellbeing', channel: 'Dr Christian Heim', duration: '13:15',
  },
  {
    id: 'Cg_GW7yhq20',
    title: 'Building a Healthy Lifestyle',
    desc: 'Small daily habits for sleep, food and movement that add up over time.',
    topic: 'Health', channel: 'Every Mind Matters', duration: '3:12',
  },
  {
    id: 'eCtKZJ9h2eo',
    title: 'Culture Shock: An English Conversation',
    desc: 'Everyday expressions for talking about living in an unfamiliar country.',
    topic: 'Culture', channel: 'Learn English Hamza Classroom', duration: '5:28',
  },
  {
    id: 'tdgWEEOgdrU',
    title: 'Ten Travel Destinations Worth Seeing',
    desc: 'A short tour of ten places around the world and what makes each one worth the trip.',
    topic: 'Travel', channel: 'GeoGeo', duration: '5:50',
  },
  {
    id: 'zhpcgpqWc1Q',
    title: 'How to Choose the Right Career Path',
    desc: 'Seven practical steps for deciding what kind of work suits you.',
    topic: 'Career', channel: 'CareerAddict', duration: '4:06',
  },
  {
    id: 'U20vo-PA3-k',
    title: 'What Is Globalization?',
    desc: 'A ninety-second explainer on how trade ties national economies together.',
    topic: 'Economy', channel: 'HBS Online', duration: '1:37',
  },
  {
    id: 'JJyLynh5d6M',
    title: 'How to Actually Start Your Own Business',
    desc: 'A plain-spoken walkthrough of the first steps of building a business.',
    topic: 'Business', channel: 'Rise Above Reality', duration: '11:01',
  },
];

/** Built from the YouTube id, so each video needs no extra links. */
export const youtubeWatchUrl = (id) => `https://www.youtube.com/watch?v=${id}`;
export const youtubeThumb    = (id) => `https://i.ytimg.com/vi/${id}/maxresdefault.jpg`;
export const youtubeThumbAlt = (id) => `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;

export const tests = [
  {
    "id": "environment",
    "title": "Environment",
    "topic": "Environment",
    "desc": "Pollution, climate change and renewable energy.",
    "questions": [
      {
        "q": "What is pollution?",
        "options": [
          "Protecting nature",
          "Planting trees",
          "Recycling materials",
          "Harmful substances entering the environment"
        ],
        "answer": 3
      },
      {
        "q": "Which action can help protect the environment?",
        "options": [
          "Recycling waste",
          "Wasting water",
          "Throwing plastic into rivers",
          "Cutting down forests"
        ],
        "answer": 0
      },
      {
        "q": "What is climate change?",
        "options": [
          "A type of sport",
          "A change in daily fashion",
          "Long-term changes in Earth's climate",
          "A short holiday"
        ],
        "answer": 2
      },
      {
        "q": "If people use less plastic, what may happen?",
        "options": [
          "Oceans will disappear",
          "Plastic pollution may decrease",
          "Temperatures will immediately fall",
          "Pollution will always increase"
        ],
        "answer": 1
      },
      {
        "q": "Which is a renewable energy source?",
        "options": [
          "Solar energy",
          "Coal",
          "Oil",
          "Natural gas"
        ],
        "answer": 0
      }
    ]
  },
  {
    "id": "urbanisation",
    "title": "Urbanisation",
    "topic": "Cities",
    "desc": "Why cities grow and what that growth costs.",
    "questions": [
      {
        "q": "What does “urbanisation” mean?",
        "options": [
          "The growth of forests",
          "The movement of people from cities to rural areas",
          "The growth of cities and the increasing number of people living in urban areas",
          "The development of agriculture"
        ],
        "answer": 2
      },
      {
        "q": "Why do many people move to cities?",
        "options": [
          "To find better job and education opportunities",
          "To live farther from services",
          "To avoid transportation",
          "To reduce access to healthcare"
        ],
        "answer": 0
      },
      {
        "q": "Which is a possible advantage of urbanisation?",
        "options": [
          "More traffic congestion",
          "Better access to education, healthcare and employment",
          "Increased air pollution",
          "Overcrowding"
        ],
        "answer": 1
      },
      {
        "q": "What can rapid urbanisation cause?",
        "options": [
          "More open rural land in cities",
          "Less demand for housing",
          "Overcrowding and pressure on public services",
          "Fewer transportation problems"
        ],
        "answer": 2
      },
      {
        "q": "What is one way to make urbanisation more sustainable?",
        "options": [
          "Building more efficient public transport systems",
          "Increasing traffic",
          "Reducing green spaces",
          "Ignoring waste management"
        ],
        "answer": 0
      }
    ]
  },
  {
    "id": "artificial-intelligence",
    "title": "Artificial Intelligence",
    "topic": "Technology",
    "desc": "What AI is, where it helps and where to be careful.",
    "questions": [
      {
        "q": "What is Artificial Intelligence (AI)?",
        "options": [
          "A social network",
          "A type of food",
          "Technology that can perform tasks requiring human-like intelligence",
          "A computer game only"
        ],
        "answer": 2
      },
      {
        "q": "Which is an example of AI?",
        "options": [
          "A voice assistant",
          "A paper dictionary",
          "A pencil",
          "A chair"
        ],
        "answer": 0
      },
      {
        "q": "How can AI help students?",
        "options": [
          "By attending classes for them",
          "By replacing textbooks completely",
          "By eliminating all learning",
          "By providing explanations and learning support"
        ],
        "answer": 3
      },
      {
        "q": "Why should students check AI-generated information?",
        "options": [
          "AI works only offline",
          "It can sometimes contain errors",
          "AI cannot write text",
          "AI never provides information"
        ],
        "answer": 1
      },
      {
        "q": "What skill is especially important when using AI?",
        "options": [
          "Blind acceptance",
          "Avoiding questions",
          "Critical evaluation",
          "Memorization only"
        ],
        "answer": 2
      }
    ]
  },
  {
    "id": "social-media",
    "title": "Social Media",
    "topic": "Wellbeing",
    "desc": "Sharing, misinformation and screen time.",
    "questions": [
      {
        "q": "What is social media mainly used for?",
        "options": [
          "Communication and sharing information",
          "Driving cars",
          "Measuring temperature",
          "Cooking food"
        ],
        "answer": 0
      },
      {
        "q": "Which information should you be careful about sharing online?",
        "options": [
          "Weather information",
          "General knowledge",
          "Public news",
          "Personal information"
        ],
        "answer": 3
      },
      {
        "q": "What is misinformation?",
        "options": [
          "Scientific evidence",
          "Correct information",
          "False or inaccurate information",
          "Personal experience"
        ],
        "answer": 2
      },
      {
        "q": "If a social media post has no reliable source, what should you do?",
        "options": [
          "Believe it",
          "Check the information first",
          "Share it immediately",
          "Delete all social media"
        ],
        "answer": 1
      },
      {
        "q": "What can excessive social media use cause?",
        "options": [
          "Increased screen time and distraction",
          "Better sleep",
          "More physical activity",
          "Better concentration in every case"
        ],
        "answer": 0
      }
    ]
  },
  {
    "id": "health-and-lifestyle",
    "title": "Health and Lifestyle",
    "topic": "Health",
    "desc": "Sleep, exercise and building better habits.",
    "questions": [
      {
        "q": "Which habit is generally good for health?",
        "options": [
          "Sleeping very little",
          "Regular physical activity",
          "Skipping every meal",
          "Drinking no water"
        ],
        "answer": 1
      },
      {
        "q": "Why is sleep important?",
        "options": [
          "It replaces exercise",
          "It prevents learning",
          "It helps the body and brain recover",
          "It reduces concentration"
        ],
        "answer": 2
      },
      {
        "q": "Which is a balanced lifestyle?",
        "options": [
          "Healthy food, exercise and sufficient sleep",
          "Working all day without rest",
          "Eating only fast food",
          "Avoiding physical activity"
        ],
        "answer": 0
      },
      {
        "q": "What can regular exercise improve?",
        "options": [
          "Stress in every situation",
          "Lack of sleep",
          "Screen time",
          "Physical fitness"
        ],
        "answer": 3
      },
      {
        "q": "If someone wants to improve their lifestyle, what is the best approach?",
        "options": [
          "Stop eating completely",
          "Make realistic changes gradually",
          "Change everything in one day",
          "Avoid professional advice"
        ],
        "answer": 1
      }
    ]
  },
  {
    "id": "culture-shock",
    "title": "Culture Shock",
    "topic": "Culture",
    "desc": "Adapting to unfamiliar customs and social rules.",
    "questions": [
      {
        "q": "What does “culture shock” mean?",
        "options": [
          "Learning a new language quickly",
          "Feeling confused or uncomfortable when experiencing a different culture",
          "Traveling with friends",
          "Enjoying traditional food"
        ],
        "answer": 1
      },
      {
        "q": "Which situation can cause culture shock?",
        "options": [
          "Experiencing unfamiliar social rules and customs",
          "Studying your usual subjects",
          "Meeting your classmates every day",
          "Watching your favorite film"
        ],
        "answer": 0
      },
      {
        "q": "A student moves to another country and feels lonely because everything seems unfamiliar. What is the student probably experiencing?",
        "options": [
          "Motivation",
          "Competition",
          "Success",
          "Culture shock"
        ],
        "answer": 3
      },
      {
        "q": "What can help a person adapt to a new culture?",
        "options": [
          "Avoiding everyone",
          "Criticizing unfamiliar traditions",
          "Learning about local customs and communicating with local people",
          "Refusing to try new things"
        ],
        "answer": 2
      },
      {
        "q": "Which statement about culture shock is TRUE?",
        "options": [
          "It happens only to tourists",
          "It can be a normal part of adapting to a new culture",
          "It always lasts forever",
          "It means a person dislikes all cultures"
        ],
        "answer": 1
      }
    ]
  },
  {
    "id": "travel",
    "title": "Travel",
    "topic": "Travel",
    "desc": "Planning a trip and travelling responsibly.",
    "questions": [
      {
        "q": "What is a destination?",
        "options": [
          "A place where someone is going",
          "A travel document",
          "A suitcase",
          "A hotel room"
        ],
        "answer": 0
      },
      {
        "q": "What should travelers usually check before a trip?",
        "options": [
          "Only their clothes",
          "Nothing",
          "Transport, accommodation and documents",
          "Only the weather"
        ],
        "answer": 2
      },
      {
        "q": "What does “local culture” mean?",
        "options": [
          "Hotel facilities",
          "Airport security",
          "International transport",
          "Traditions and ways of life of local people"
        ],
        "answer": 3
      },
      {
        "q": "Why can tourism benefit local communities?",
        "options": [
          "It stops communication",
          "It can create jobs and income",
          "It always damages nature",
          "It reduces employment"
        ],
        "answer": 1
      },
      {
        "q": "What is sustainable tourism?",
        "options": [
          "Tourism that considers environmental and local impacts",
          "Traveling as much as possible",
          "Ignoring local communities",
          "Using more natural resources"
        ],
        "answer": 0
      }
    ]
  },
  {
    "id": "career",
    "title": "Career",
    "topic": "Career",
    "desc": "Skills, lifelong learning and what a CV shows.",
    "questions": [
      {
        "q": "What is a career?",
        "options": [
          "A person's professional journey",
          "A university building",
          "A hobby",
          "A holiday"
        ],
        "answer": 0
      },
      {
        "q": "Which skill is important in most careers?",
        "options": [
          "Refusing to learn",
          "Avoiding teamwork",
          "Communication",
          "Ignoring feedback"
        ],
        "answer": 2
      },
      {
        "q": "Why is lifelong learning important?",
        "options": [
          "Education ends after graduation",
          "Job requirements and technologies change",
          "Skills never change",
          "Technology is not important"
        ],
        "answer": 1
      },
      {
        "q": "What can a CV/resume show?",
        "options": [
          "Only hobbies",
          "Only age",
          "Only personal opinions",
          "Education, experience and skills"
        ],
        "answer": 3
      },
      {
        "q": "If a student wants a successful career, what should they do?",
        "options": [
          "Develop relevant knowledge and skills",
          "Stop learning after graduation",
          "Avoid experience",
          "Ignore opportunities"
        ],
        "answer": 0
      }
    ]
  },
  {
    "id": "globalization",
    "title": "Globalization",
    "topic": "Economy",
    "desc": "How countries and economies connect, and the pressure it creates.",
    "questions": [
      {
        "q": "What does “globalization” mean?",
        "options": [
          "The separation of countries",
          "The reduction of international communication",
          "The increasing connection between countries, people and economies",
          "The development of one local community"
        ],
        "answer": 2
      },
      {
        "q": "Which is an example of globalization?",
        "options": [
          "People from different countries buying and selling products internationally",
          "A family cooking a traditional meal",
          "A student studying only at home",
          "A local shop serving only one customer"
        ],
        "answer": 0
      },
      {
        "q": "How can globalization affect education?",
        "options": [
          "Universities become completely isolated",
          "Students can access international information and educational resources",
          "Students can no longer communicate internationally",
          "Learning opportunities always decrease"
        ],
        "answer": 1
      },
      {
        "q": "What is one possible benefit of globalization?",
        "options": [
          "Complete disappearance of local cultures",
          "Less access to information",
          "Fewer communication opportunities",
          "Greater cultural exchange and international cooperation"
        ],
        "answer": 3
      },
      {
        "q": "What is one possible challenge of globalization?",
        "options": [
          "Technology stops developing",
          "International trade becomes impossible",
          "Local cultures and traditions may face pressure from global influences",
          "People have fewer opportunities to communicate"
        ],
        "answer": 2
      }
    ]
  },
  {
    "id": "business",
    "title": "Business",
    "topic": "Business",
    "desc": "Customers, marketing, profit and demand.",
    "questions": [
      {
        "q": "What is a business?",
        "options": [
          "A hobby only",
          "An organization that provides goods or services",
          "A social network",
          "A school subject only"
        ],
        "answer": 1
      },
      {
        "q": "What is a customer?",
        "options": [
          "A government official",
          "A company manager only",
          "A person who buys a product or service",
          "A teacher"
        ],
        "answer": 2
      },
      {
        "q": "Why is marketing important?",
        "options": [
          "It helps businesses communicate with customers",
          "It reduces information",
          "It prevents sales",
          "It eliminates competition"
        ],
        "answer": 0
      },
      {
        "q": "What is profit?",
        "options": [
          "Total expenses",
          "A company's debt",
          "Employee salary only",
          "Money left after costs are paid"
        ],
        "answer": 3
      },
      {
        "q": "If customer demand increases, what may happen to sales?",
        "options": [
          "Sales must decrease",
          "Sales may increase",
          "The business must close",
          "Prices must become zero"
        ],
        "answer": 1
      }
    ]
  }
];

export const games = [
  {
    "id": "environment-match",
    "title": "Environment",
    "type": "Picture match",
    "topic": "Environment",
    "cover": "sun",
    "kind": "match",
    "pictures": true,
    "intro": "Match each word to the photograph that shows it.",
    "pairs": [
      [
        "Pollution",
        "assets/img/env-pollution.jpg"
      ],
      [
        "Renewable energy",
        "assets/img/env-renewable.jpg"
      ],
      [
        "Deforestation",
        "assets/img/env-deforestation.jpg"
      ],
      [
        "Recycling",
        "assets/img/env-recycling.jpg"
      ],
      [
        "Emissions",
        "assets/img/env-emissions.jpg"
      ],
      [
        "Drought",
        "assets/img/env-drought.jpg"
      ]
    ],
    "cognitive": "Semantic memory, association",
    "language": "Vocabulary",
    "media": "Photographs"
  },
  {
    "id": "travel-sort",
    "title": "Travel",
    "type": "Picture sort",
    "topic": "Travel",
    "cover": "dusk",
    "kind": "sort",
    "pictures": true,
    "intro": "Put each photograph with the part of a trip it belongs to.",
    "groups": [
      "Getting there",
      "Where you stay",
      "What you pack"
    ],
    "items": [
      {
        "text": "Departure gate",
        "group": 0,
        "img": "assets/img/trv-gate.jpg"
      },
      {
        "text": "Train platform",
        "group": 0,
        "img": "assets/img/trv-platform.jpg"
      },
      {
        "text": "Aeroplane",
        "group": 0,
        "img": "assets/img/trv-plane.jpg"
      },
      {
        "text": "Hotel room",
        "group": 1,
        "img": "assets/img/trv-room.jpg"
      },
      {
        "text": "Hotel lobby",
        "group": 1,
        "img": "assets/img/trv-lobby.jpg"
      },
      {
        "text": "Swimming pool",
        "group": 1,
        "img": "assets/img/trv-pool.jpg"
      },
      {
        "text": "Passport",
        "group": 2,
        "img": "assets/img/trv-passport.jpg"
      },
      {
        "text": "Suitcase",
        "group": 2,
        "img": "assets/img/trv-suitcase.jpg"
      },
      {
        "text": "Map",
        "group": 2,
        "img": "assets/img/trv-map.jpg"
      }
    ],
    "cognitive": "Categorisation",
    "language": "Vocabulary",
    "media": "Photographs"
  },
  {
    "id": "spot-difference",
    "title": "Spot the Difference",
    "type": "Find the difference",
    "topic": "Media",
    "cover": "ink",
    "kind": "spot",
    "cognitive": "Attention, visual comparison",
    "language": "Vocabulary",
    "media": "Photographs",
    "intro": "Five things are in one photograph but not the other. Click each one you find, in either picture.",
    "scenes": [
      {
        "title": "A balloon festival",
        "a": "assets/img/diff-balloon-a.jpg",
        "b": "assets/img/diff-balloon-b.jpg",
        "spots": [
          {
            "x": 30.8,
            "y": 42.7,
            "rx": 6.4,
            "ry": 10.2
          },
          {
            "x": 89.4,
            "y": 43.3,
            "rx": 7.5,
            "ry": 13.3
          },
          {
            "x": 51.4,
            "y": 73.8,
            "rx": 5.5,
            "ry": 8.8
          },
          {
            "x": 68.9,
            "y": 59.0,
            "rx": 6.4,
            "ry": 10.2
          },
          {
            "x": 20.8,
            "y": 30.4,
            "rx": 5.5,
            "ry": 8.8
          }
        ]
      },
      {
        "title": "Flamingos in flight",
        "a": "assets/img/diff-birds-a.jpg",
        "b": "assets/img/diff-birds-b.jpg",
        "spots": [
          {
            "x": 39.1,
            "y": 45.0,
            "rx": 10.9,
            "ry": 9.6
          },
          {
            "x": 87.2,
            "y": 41.7,
            "rx": 9.7,
            "ry": 8.8
          },
          {
            "x": 72.0,
            "y": 45.4,
            "rx": 9.5,
            "ry": 8.8
          },
          {
            "x": 25.6,
            "y": 35.0,
            "rx": 9.4,
            "ry": 10.0
          },
          {
            "x": 11.6,
            "y": 48.1,
            "rx": 9.4,
            "ry": 7.7
          }
        ]
      },
      {
        "title": "Parasols on the beach",
        "a": "assets/img/diff-beach-a.jpg",
        "b": "assets/img/diff-beach-b.jpg",
        "spots": [
          {
            "x": 56.6,
            "y": 21.2,
            "rx": 5.0,
            "ry": 7.5
          },
          {
            "x": 78.8,
            "y": 21.2,
            "rx": 5.0,
            "ry": 7.5
          },
          {
            "x": 96.6,
            "y": 21.7,
            "rx": 5.0,
            "ry": 7.5
          },
          {
            "x": 41.9,
            "y": 21.2,
            "rx": 5.0,
            "ry": 7.5
          },
          {
            "x": 35.6,
            "y": 21.7,
            "rx": 5.0,
            "ry": 7.5
          }
        ]
      },
      {
        "title": "A harbour town",
        "a": "assets/img/diff-harbour-a.jpg",
        "b": "assets/img/diff-harbour-b.jpg",
        "spots": [
          {
            "x": 71.2,
            "y": 50.8,
            "rx": 5.6,
            "ry": 5.8
          },
          {
            "x": 19.8,
            "y": 53.5,
            "rx": 4.5,
            "ry": 5.4
          },
          {
            "x": 34.2,
            "y": 45.4,
            "rx": 5.5,
            "ry": 7.9
          },
          {
            "x": 57.2,
            "y": 46.7,
            "rx": 4.4,
            "ry": 5.8
          },
          {
            "x": 28.9,
            "y": 50.2,
            "rx": 7.7,
            "ry": 6.5
          }
        ]
      }
    ]
  },
  {
    "id": "predict-next",
    "title": "Predict the Next",
    "type": "Prediction",
    "topic": "Thinking",
    "cover": "ink",
    "kind": "predict",
    "cognitive": "Prediction, inference",
    "language": "Reading",
    "media": "Situations",
    "intro": "Read what has happened so far, then choose what follows.",
    "items": [
      {
        "scene": "A city removes the last of its street trees to widen the roads. Summer arrives.",
        "options": [
          "The streets grow hotter than the surrounding countryside",
          "Summer temperatures in the city fall",
          "Rainwater drains away more slowly",
          "Air quality improves across the city"
        ],
        "answer": 0,
        "why": "Trees shade surfaces and cool the air as they release water. Take them away and the stone and asphalt hold the heat."
      },
      {
        "scene": "A factory town closes its only plant. Within a year, most young workers have left for the capital.",
        "options": [
          "Housing demand in the town rises sharply",
          "Schools and shops in the town begin to close",
          "Wages in the town increase",
          "The capital loses population"
        ],
        "answer": 1,
        "why": "Fewer people means fewer customers and fewer pupils, so the services that depend on them close one by one."
      },
      {
        "scene": "A student watches two hours of short videos every night before bed, with the lights off.",
        "options": [
          "Falling asleep becomes easier",
          "Morning concentration improves",
          "Sleep gets shorter and lighter",
          "The habit has no measurable effect"
        ],
        "answer": 2,
        "why": "Late screen use pushes sleep later and breaks it up, so the night is both shorter and shallower."
      },
      {
        "scene": "A country lowers the tax on imported goods. Foreign products arrive more cheaply than local ones.",
        "options": [
          "Local producers face stronger competition",
          "Shoppers pay more for the same goods",
          "Trade between the countries falls",
          "Local producers raise their prices"
        ],
        "answer": 0,
        "why": "Cheaper imports take price pressure straight to the producers who were selling at the old price."
      },
      {
        "scene": "A post claiming a new health cure spreads quickly. No source is given and no study is named.",
        "options": [
          "The claim is probably reliable because many people shared it",
          "Sharing it further is the responsible thing to do",
          "It should be checked against a named source before anyone acts on it",
          "The number of shares shows the claim has been verified"
        ],
        "answer": 2,
        "why": "Popularity is not evidence. A claim with no source behind it has not been tested by anyone."
      },
      {
        "scene": "A traveller arrives in a country whose greetings, meals and working hours are unlike home. The first week is exhausting.",
        "options": [
          "The feeling means the traveller dislikes the country",
          "This is culture shock, and it usually eases with contact and routine",
          "The traveller should avoid local people until it passes",
          "The feeling will last for as long as the stay does"
        ],
        "answer": 1,
        "why": "Culture shock is a normal stage of adjusting. Learning the customs and meeting people shortens it."
      },
      {
        "scene": "A town builds a wide new road into the centre to ease the traffic. Driving in becomes quicker than before.",
        "options": [
          "Fewer people drive into the centre",
          "More people choose to drive, and the jams return",
          "Public transport use rises",
          "The centre becomes quieter"
        ],
        "answer": 1,
        "why": "Making driving easier invites more of it. Within a few years the new road fills up, which is why planners call it induced demand."
      },
      {
        "scene": "A student answers every practice test with the book open beside them. The scores are excellent.",
        "options": [
          "The scores predict how they will do in a closed-book exam",
          "The practice is building recall from memory",
          "The exam itself will feel much harder than the practice did",
          "There is nothing to change before the exam"
        ],
        "answer": 2,
        "why": "Recognising an answer on the page is far easier than retrieving it. The practice never tested the thing the exam will."
      },
      {
        "scene": "A hotel opens on a quiet stretch of coast. The following year, three more open beside it.",
        "options": [
          "The coast stays as quiet as it was",
          "Local jobs and prices both rise",
          "The hotels drive each other out of business",
          "Visitor numbers fall"
        ],
        "answer": 1,
        "why": "Tourism brings work and spending, and it pushes up what everything costs for the people already living there."
      },
      {
        "scene": "A news site changes nothing about its reporting but starts writing far more dramatic headlines.",
        "options": [
          "Clicks rise while trust in the site falls",
          "Readers trust the site more",
          "Reporting quality improves",
          "Clicks and trust both rise"
        ],
        "answer": 0,
        "why": "The headline wins the click, then the article underneath fails to deliver on it, and readers learn to discount the source."
      }
    ]
  },
  {
    "id": "business-match",
    "title": "Business",
    "type": "Match up",
    "topic": "Business",
    "cover": "ink",
    "kind": "match",
    "intro": "Pair each business word with what it means.",
    "pairs": [
      [
        "Revenue",
        "Everything a business takes in before costs"
      ],
      [
        "Profit",
        "What is left once every cost has been paid"
      ],
      [
        "Customer",
        "The person who buys the product or service"
      ],
      [
        "Marketing",
        "The work of telling people what a business offers"
      ],
      [
        "Supplier",
        "A company that provides the goods a business needs"
      ],
      [
        "Demand",
        "How much of a product people want to buy"
      ],
      [
        "Investment",
        "Money put into a business to help it grow"
      ],
      [
        "Competitor",
        "Another business selling to the same customers"
      ],
      [
        "Turnover",
        "The total value of what a business sells in a period"
      ],
      [
        "Stock",
        "The goods a business is holding, ready to sell"
      ]
    ],
    "cognitive": "Semantic memory",
    "language": "Vocabulary",
    "media": "Definitions"
  },
  {
    "id": "social-sort",
    "title": "Social Media",
    "type": "Group sort",
    "topic": "Wellbeing",
    "cover": "ink",
    "kind": "sort",
    "intro": "Decide where each one belongs.",
    "groups": [
      "Upside",
      "Downside"
    ],
    "items": [
      {
        "text": "Keeping up with friends who live far away",
        "group": 0
      },
      {
        "text": "Losing an evening to endless scrolling",
        "group": 1
      },
      {
        "text": "Finding people who share your interests",
        "group": 0
      },
      {
        "text": "Measuring your life against edited highlights",
        "group": 1
      },
      {
        "text": "Following the news as it happens",
        "group": 0
      },
      {
        "text": "Passing on a story nobody checked",
        "group": 1
      },
      {
        "text": "Showing your work to an audience",
        "group": 0
      },
      {
        "text": "Broken sleep from late-night screens",
        "group": 1
      },
      {
        "text": "Reading one source and treating it as the whole story",
        "group": 1
      },
      {
        "text": "Learning a skill from people who do it for a living",
        "group": 0
      },
      {
        "text": "Arguing with strangers who will never change their minds",
        "group": 1
      },
      {
        "text": "Keeping a record of work you are proud of",
        "group": 0
      },
      {
        "text": "Checking your phone the moment you wake up",
        "group": 1
      },
      {
        "text": "Finding a job through someone you have never met in person",
        "group": 0
      }
    ],
    "cognitive": "Evaluation, judgement",
    "language": "Reading",
    "media": "Statements"
  },
  {
    "id": "memory-challenge",
    "title": "Memory Challenge",
    "type": "Memory",
    "topic": "Thinking",
    "cover": "sun",
    "kind": "memory",
    "cognitive": "Attention, working memory",
    "language": "Vocabulary",
    "media": "Photographs",
    "intro": "Study the photographs, then pick out the ones you saw.",
    "seconds": 14,
    "shown": [
      {
        "text": "Wind turbines",
        "img": "assets/img/env-renewable.jpg"
      },
      {
        "text": "Cracked dry ground",
        "img": "assets/img/env-drought.jpg"
      },
      {
        "text": "Recycling sign",
        "img": "assets/img/env-recycling.jpg"
      },
      {
        "text": "Departure gate",
        "img": "assets/img/trv-gate.jpg"
      },
      {
        "text": "Hotel room",
        "img": "assets/img/trv-room.jpg"
      },
      {
        "text": "Passport",
        "img": "assets/img/trv-passport.jpg"
      },
      {
        "text": "Factory chimneys",
        "img": "assets/img/env-pollution.jpg"
      },
      {
        "text": "Cleared forest",
        "img": "assets/img/env-deforestation.jpg"
      }
    ],
    "extra": [
      {
        "text": "Exhaust pipe",
        "img": "assets/img/env-emissions.jpg"
      },
      {
        "text": "Train platform",
        "img": "assets/img/trv-platform.jpg"
      },
      {
        "text": "Swimming pool",
        "img": "assets/img/trv-pool.jpg"
      },
      {
        "text": "Suitcase",
        "img": "assets/img/trv-suitcase.jpg"
      },
      {
        "text": "Aeroplane",
        "img": "assets/img/trv-plane.jpg"
      },
      {
        "text": "Hotel lobby",
        "img": "assets/img/trv-lobby.jpg"
      },
      {
        "text": "Paper map",
        "img": "assets/img/trv-map.jpg"
      }
    ]
  },
  {
    "id": "media-detective",
    "title": "Media Detective",
    "type": "Group sort",
    "topic": "Media",
    "cover": "ink",
    "kind": "sort",
    "cognitive": "Critical thinking, evaluation",
    "language": "Reading",
    "media": "Statements",
    "intro": "Decide what each line really is.",
    "groups": [
      "Fact",
      "Opinion",
      "Unsupported claim"
    ],
    "items": [
      {
        "text": "Water boils at 100 degrees Celsius at sea level",
        "group": 0,
        "why": "It can be measured, and the measurement comes out the same every time."
      },
      {
        "text": "The city recorded 31 days above 35 degrees last summer",
        "group": 0,
        "why": "A counted record. Anyone can check it against the weather data."
      },
      {
        "text": "Three in four households in the survey owned a bicycle",
        "group": 0,
        "why": "It reports what a named survey found, so it can be verified."
      },
      {
        "text": "English has more speakers as a second language than as a first",
        "group": 0,
        "why": "A counted comparison that language statistics can confirm."
      },
      {
        "text": "The video lasts eleven minutes",
        "group": 0,
        "why": "A plain measurement of the thing in front of you."
      },
      {
        "text": "Winter is the most pleasant season of the year",
        "group": 1,
        "why": "Pleasant to whom? It states a preference, not something that can be measured."
      },
      {
        "text": "City life is far more interesting than village life",
        "group": 1,
        "why": "Interesting is a judgement. Someone else can disagree and neither is wrong."
      },
      {
        "text": "Learning English is easier than learning Spanish",
        "group": 1,
        "why": "Easier depends on the learner and their first language. It is a view."
      },
      {
        "text": "Films were better before streaming arrived",
        "group": 1,
        "why": "Better by whose standard? This is taste stated as if it were fact."
      },
      {
        "text": "Mornings are the only sensible time to study",
        "group": 1,
        "why": "A personal habit presented as a rule for everyone."
      },
      {
        "text": "This drink removes every toxin from your body in a day",
        "group": 2,
        "why": "A dramatic promise with no study, no measure and no source behind it."
      },
      {
        "text": "Scientists have proven that the new app doubles memory",
        "group": 2,
        "why": "Which scientists, and in what study? Naming nobody is the warning sign."
      },
      {
        "text": "Everybody knows that electric cars pollute more than petrol ones",
        "group": 2,
        "why": "Everybody knows is not evidence. The claim avoids saying where it came from."
      },
      {
        "text": "Nine out of ten teachers recommend this method",
        "group": 2,
        "why": "Ten out of which teachers, asked by whom? A number without a source proves nothing."
      },
      {
        "text": "Studies show that reading at night ruins your eyesight",
        "group": 2,
        "why": "Studies show is doing all the work here, and not one study is named."
      }
    ]
  },
  {
    "id": "health-wheel",
    "title": "Healthy Lifestyle",
    "type": "Spin the wheel",
    "topic": "Health",
    "cover": "leaf",
    "kind": "wheel",
    "intro": "Spin, then talk for a minute on whatever comes up.",
    "prompts": [
      "What did you eat yesterday? Would you change any of it?",
      "How many hours do you sleep, and how many do you need?",
      "Describe your ideal week of exercise.",
      "Name one habit you would like to drop, and why.",
      "How do you wind down after a difficult day?",
      "What does a balanced meal look like to you?",
      "Which is harder to change: what you eat or how you move?",
      "How much water do you really drink in a day?"
    ],
    "cognitive": "Recall, fluency",
    "language": "Speaking",
    "media": "Prompts"
  },
  {
    "id": "cities-cards",
    "title": "City Life",
    "type": "Speaking cards",
    "topic": "Cities",
    "cover": "dusk",
    "kind": "cards",
    "intro": "Take a card and answer it in two or three sentences.",
    "prompts": [
      "Describe the city you know best in three sentences.",
      "What makes a city worth living in?",
      "Would you rather live in the centre or outside it? Why?",
      "What is the worst thing about traffic where you live?",
      "Where should a growing city put its new arrivals?",
      "Which does a city need more: parks or parking?",
      "What would you change about public transport?",
      "Do people move to cities for work, for study, or for something else?"
    ],
    "cognitive": "Elaboration, fluency",
    "language": "Speaking",
    "media": "Prompts"
  },
  {
    "id": "cause-effect",
    "title": "Cause and Effect",
    "type": "Order the chain",
    "topic": "Thinking",
    "cover": "sun",
    "kind": "chain",
    "cognitive": "Causal reasoning, logic",
    "language": "Reading",
    "media": "Chains",
    "intro": "Put each chain back into the order it happens.",
    "chains": [
      {
        "title": "Globalization",
        "steps": [
          "Countries lower the barriers to trade",
          "Goods and services cross borders more freely",
          "People meet other cultures through what they buy and watch",
          "New opportunities to work and study abroad appear"
        ]
      },
      {
        "title": "Urbanisation",
        "steps": [
          "Work and study draw people towards the city",
          "The population of the city rises",
          "Demand for housing and transport outgrows the supply",
          "The city builds upwards and outwards to keep up"
        ]
      },
      {
        "title": "Emissions",
        "steps": [
          "More vehicles and factories burn fuel",
          "More greenhouse gas enters the atmosphere",
          "Average temperatures climb",
          "Droughts and heatwaves last longer than they used to"
        ]
      },
      {
        "title": "Deforestation",
        "steps": [
          "Forest is cleared for farmland and timber",
          "The soil loses the roots that were holding it together",
          "Heavy rain washes the topsoil into the rivers",
          "The land yields less with every season that passes"
        ]
      },
      {
        "title": "Social media",
        "steps": [
          "A feed learns which posts hold your attention longest",
          "It serves more of whatever kept you scrolling",
          "Time on the app climbs without you deciding to spend it",
          "Sleep and attention elsewhere start to suffer"
        ]
      }
    ]
  },
  {
    "id": "word-concept",
    "title": "Word and Concept",
    "type": "Match up",
    "topic": "Cities",
    "cover": "ink",
    "kind": "match",
    "cognitive": "Semantic memory, association",
    "language": "Vocabulary",
    "media": "Definitions",
    "intro": "Pair each term from the urbanisation lesson with its meaning.",
    "pairs": [
      [
        "Migration",
        "The movement of people from one place to another to live"
      ],
      [
        "Population density",
        "How many people live in each square kilometre"
      ],
      [
        "Infrastructure",
        "The roads, pipes, cables and transport a place runs on"
      ],
      [
        "Housing",
        "The homes available to the people who live in a place"
      ],
      [
        "Commuting",
        "Travelling regularly between home and work"
      ],
      [
        "Overcrowding",
        "More people in a space than it was built to hold"
      ],
      [
        "Suburb",
        "A residential area on the outer edge of a city"
      ],
      [
        "Public transport",
        "Buses, trams and trains shared by everyone"
      ],
      [
        "Green space",
        "Parks and gardens kept open inside a built-up area"
      ]
    ]
  }
];

