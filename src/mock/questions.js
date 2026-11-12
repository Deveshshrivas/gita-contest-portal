import { INITIAL_QUESTION_BANK } from '../data/questionBank';

// Enrich and export
export const MOCK_QUESTIONS = [
  ...INITIAL_QUESTION_BANK,
  {
    id: "q-13",
    chapter: 18,
    verse: "18.66",
    difficulty: "Medium",
    type: "MCQ",
    marks: 2,
    negativeMarks: 0.5,
    shlokaText: "सर्वधर्मान्परित्यज्य मामेकं शरणं व्रज। अहं त्वां सर्वपापेभ्यो मोक्षयिष्यामि मा शुचः॥",
    question: "What is Lord Krishna's ultimate instruction to Arjuna in the concluding chapter (BG 18.66)?",
    questionHindi: "अंतिम अध्याय (१८.६६) में भगवान श्रीकृष्ण का अर्जुन को परम उपदेश क्या है?",
    options: [
      { key: "A", text: "Abandon all varieties of religion and just surrender unto Me alone" },
      { key: "B", text: "Perform rigorous physical penances in the forest" },
      { key: "C", text: "Renounce all worldly duties immediately without fighting" },
      { key: "D", text: "Worship only demigods for material prosperity" }
    ],
    correctAnswer: "A",
    explanation: "In Chapter 18 Verse 66 (Charama Shloka), Krishna instructs: 'Abandon all varieties of religion and just surrender unto Me alone. I shall deliver you from all sinful reactions. Do not fear.'"
  },
  {
    id: "q-14",
    chapter: 3,
    verse: "3.21",
    difficulty: "Medium",
    type: "MCQ",
    marks: 2,
    negativeMarks: 0.5,
    shlokaText: "यद्यदाचरति श्रेष्ठस्तत्तदेवेतरो जनः। स यत्प्रमाणं कुरुते लोकस्तदनुवर्तते॥",
    question: "According to BG 3.21, why must a leader act with exemplary responsibility?",
    questionHindi: "भगवद्गीता ३.२१ के अनुसार, श्रेष्ठ पुरुष (नेता) को आदर्श आचरण क्यों करना चाहिए?",
    options: [
      { key: "A", text: "To earn high taxes from the public" },
      { key: "B", text: "Whatever action a great man performs, common men follow; and whatever standards he sets, the world pursues" },
      { key: "C", text: "To prove intellectual superiority over others" },
      { key: "D", text: "To avoid physical exertion in administration" }
    ],
    correctAnswer: "B",
    explanation: "BG 3.21 highlights the supreme principle of leadership by example (Yad yad acarati sresthah...). Leaders set the cultural and ethical standards for society."
  },
  {
    id: "q-15",
    chapter: 12,
    verse: "12.13-14",
    difficulty: "Hard",
    type: "TrueFalse",
    marks: 2,
    negativeMarks: 0.5,
    shlokaText: "अद्वेष्टा सर्वभूतानां मैत्रः करुण एव च। निर्ममो निरहङ्कारः समदुःखसुखः क्षमी॥",
    question: "True or False: In BG 12.13, Krishna declares that a person who is non-envious, a kind friend to all living entities, free from possessiveness and false ego, and equipoised in happiness and distress is very dear to Him.",
    questionHindi: "सत्य या असत्य: भगवद्गीता १२.१३ में श्रीकृष्ण कहते हैं कि जो किसी से द्वेष नहीं करता, सबका मित्र व दयालु है, अहंकार रहित है, वह उन्हें अत्यंत प्रिय है।",
    options: [
      { key: "A", text: "True" },
      { key: "B", text: "False" }
    ],
    correctAnswer: "A",
    explanation: "True. Krishna specifically enumerates these 35 divine qualities of a devotee across verses 12.13 to 12.20 as characteristics of one who is dearest to Him."
  }
];
