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
    ]
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
      ]
    ]
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
    ]
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
    ]
  }
];

