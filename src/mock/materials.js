import { STUDY_MODULES } from '../data/studyMaterials';

export const MOCK_MATERIALS = [
  ...STUDY_MODULES,
  {
    chapter: 18,
    name: "Moksha-Sannyasa Yoga (The Perfection of Renunciation)",
    shlokasCount: 78,
    summary: "The ultimate synthesis of the entire Gita. Lord Krishna clarifies the difference between Tyaga (renunciation of fruits) and Sannyasa (renunciation of actions), the three types of knowledge, action, worker, intellect, resolve, and happiness. Concludes with total surrender unto Him.",
    keyVerse: {
      ref: "BG 18.66",
      sanskrit: "सर्वधर्मान्परित्यज्य मामेकं शरणं व्रज। अहं त्वां सर्वपापेभ्यो मोक्षयिष्यामि मा शुचः॥",
      meaning: "Abandon all varieties of religion and just surrender unto Me alone. I shall deliver you from all sinful reactions. Do not fear."
    },
    topics: ["Five Factors of Action", "Three Modes in Work and Intellect", "Dharma and Supreme Surrender"]
  }
];

export const MOCK_DOWNLOADABLE_RESOURCES = [
  {
    id: "res-pdf-1",
    title: "Official GLC 2026 Comprehensive Study Syllabus & Mind Map (PDF)",
    category: "Syllabus Guide",
    fileSize: "4.8 MB",
    pages: 36,
    downloadCount: 18450,
    downloadUrl: "#glc-syllabus-2026.pdf"
  },
  {
    id: "res-pdf-2",
    title: "108 Essential Gita Shlokas with Sanskrit Chanting Audio Links",
    category: "Shloka Handbook",
    fileSize: "6.2 MB",
    pages: 54,
    downloadCount: 22100,
    downloadUrl: "#108-gita-shlokas.pdf"
  },
  {
    id: "res-pdf-3",
    title: "Past 5 Years Solved Olympiad Question Papers with Verse Citations",
    category: "Sample Papers",
    fileSize: "8.1 MB",
    pages: 88,
    downloadCount: 31200,
    downloadUrl: "#past-papers-2021-2025.pdf"
  },
  {
    id: "res-pdf-4",
    title: "Vedic Leadership & Time-Management Framework for Students",
    category: "Leadership Special",
    fileSize: "2.4 MB",
    pages: 24,
    downloadCount: 15300,
    downloadUrl: "#vedic-leadership-handbook.pdf"
  }
];
