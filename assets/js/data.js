/**
 * Site content.
 * Videos are YouTube lessons; the card links straight to the watch page.
 * Tests run in the page and are scored locally.
 * Games are Wordwall activities embedded in the page — titles are left exactly
 * as their authors wrote them.
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
    "id": "af29c2c07ec648b48296b9fd30a977f1",
    "title": "Environment",
    "type": "Match up",
    "topic": "Environment",
    "thumb": "https://screens.cdn.wordwall.net/800/af29c2c07ec648b48296b9fd30a977f1_1"
  },
  {
    "id": "24d610bb510648179521b7a35af27325",
    "title": "Urbanization",
    "type": "Speaking cards",
    "topic": "Cities",
    "thumb": "https://screens.cdn.wordwall.net/800/24d610bb510648179521b7a35af27325_59"
  },
  {
    "id": "3f485e56e2d94290aaa88462ba922aee",
    "title": "Social Media (+ & -)",
    "type": "Group sort",
    "topic": "Wellbeing",
    "thumb": "https://screens.cdn.wordwall.net/800/3f485e56e2d94290aaa88462ba922aee_1"
  },
  {
    "id": "0ad59e2e4ee147fcab4b0e08309f620f",
    "title": "healthy lifestyle",
    "type": "Random wheel",
    "topic": "Health",
    "thumb": "https://screens.cdn.wordwall.net/800/0ad59e2e4ee147fcab4b0e08309f620f_28"
  },
  {
    "id": "d643d23e79964369af6fa0a84f0dcf33",
    "title": "Travelling and Transport",
    "type": "Group sort",
    "topic": "Travel",
    "thumb": "https://screens.cdn.wordwall.net/800/d643d23e79964369af6fa0a84f0dcf33_1"
  },
  {
    "id": "b5277c5cbf7a41e7be4d8fc2ac591410",
    "title": "Business Result Pre Unit 4",
    "type": "Match up",
    "topic": "Business",
    "thumb": "https://screens.cdn.wordwall.net/800/b5277c5cbf7a41e7be4d8fc2ac591410_1"
  }
];

/** Wordwall's own embed player, so the activity runs inside this page. */
export const wordwallEmbed = (id) => `https://wordwall.net/embed/${id}`;
