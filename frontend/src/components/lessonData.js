export const lessons = [
  {
    id: 0,
    title: 'Lesson 1',
    description: 'STAR Method',
    tasks: [
      {
        id: 0,
        title: 'Learn about the STAR Method',
        description: 'Read slides 10-11',
        action: { type: 'showSlides', slideUrl: 'https://docs.google.com/presentation/d/1vb59YhqPn6r6TytgMiUz7S7uInRV654gJH_Fq7UND2k/edit#slide=id.gb54acdb262_0_114' },
      },
      {
        id: 1,
        title: 'Practice',
        description: 'Record a video answering the question using the STAR method',
        action: { type: 'redirect', path: '/self-recording' },
      },
      {
        id: 2,
        title: 'Feedback',
        description: 'Review two students recordings and leave feedback',
        action: { type: 'redirect', path: '/self-recording' },
      },
      {
        id: 3,
        title: 'Assess Your Skills',
        description: 'Take this quiz, you must get at least 80% to move on',
        action: { type: 'quiz' },
      },
    ],
  },
  {
    id: 1,
    title: 'Lesson 2',
    description: 'Tell me about yourself',
    tasks: [
      {
        id: 0,
        title: 'Introduction',
        description: 'Read slides 14-22',
        action: { type: 'showSlides', slideUrl: 'https://docs.google.com/presentation/d/1vb59YhqPn6r6TytgMiUz7S7uInRV654gJH_Fq7UND2k/edit#slide=id.gb54acdb262_0_114' },
      },
      {
        id: 1,
        title: 'Practice',
        description: 'Record a video introducing yourself',
        action: { type: 'redirect', path: '/self-recording' },
      },
      {
        id: 2,
        title: 'Feedback',
        description: 'Review two students recordings and leave feedback',
        action: { type: 'redirect', path: '/self-recording' },
      },
      {
        id: 3,
        title: 'Final Assessment',
        description: 'Take this quiz, you must get at least 80% to move on',
        action: { type: 'quiz' },
      },
    ],
  },
  {
    id: 2,
    title: 'Lesson 3',
    description: 'Why are you interested in this role/this company?',
    tasks: [
      {
        id: 0,
        title: 'Introduction',
        description: 'Read slides 24-26',
        action: { type: 'showSlides', slideUrl: 'https://docs.google.com/presentation/d/1vb59YhqPn6r6TytgMiUz7S7uInRV654gJH_Fq7UND2k/edit#slide=id.gb54acdb262_0_114' },
      },
      {
        id: 1,
        title: 'Practice',
        description: 'Record a video explaining why you are interested in this role/company',
        action: { type: 'redirect', path: '/self-recording' },
      },
      {
        id: 2,
        title: 'Feedback',
        description: 'Review two students recordings and leave feedback',
        action: { type: 'redirect', path: '/self-recording' },
      },
      {
        id: 3,
        title: 'Final Assessment',
        description: 'Take this quiz, you must get at least 80% to move on',
        action: { type: 'quiz' },
      },
    ],
  },
  {
    id: 3,
    title: 'Lesson 4',
    description: 'Tell me about your experience with…',
    tasks: [
      {
        id: 0,
        title: 'Introduction',
        description: 'Read slides 28-32',
        action: { type: 'showSlides', slideUrl: 'https://docs.google.com/presentation/d/1vb59YhqPn6r6TytgMiUz7S7uInRV654gJH_Fq7UND2k/edit#slide=id.gb54acdb262_0_114' },
      },
      {
        id: 1,
        title: 'Practice',
        description: 'Record a video discussing your experience with a specific skill or project',
        action: { type: 'redirect', path: '/self-recording' },
      },
      {
        id: 2,
        title: 'Feedback',
        description: 'Review two students recordings and leave feedback',
        action: { type: 'redirect', path: '/self-recording' },
      },
      {
        id: 3,
        title: 'Final Assessment',
        description: 'Take this quiz, you must get at least 80% to move on',
        action: { type: 'quiz' },
      },
    ],
  },
];
