export const technologyTrends = [
  { name: 'React', postings: 85 },
  { name: 'Python', postings: 72 },
  { name: 'Next.js', postings: 68 },
  { name: 'Go', postings: 55 },
  { name: 'TypeScript', postings: 51 },
  { name: 'UI/UX', postings: 45 },
  { name: 'Docker', postings: 42 },
  { name: 'NLP', postings: 31 },
  { name: 'Kubernetes', postings: 28 },
];

export const trendingRoles = [
  'Web Developer',
  'AI/ML Engineer',
  'DevOps Specialist',
  'UI/UX Designer',
];

type CareerPath = {
  title: string;
  description: string;
  steps: { title: string; description: string }[];
};

export const careerPaths: { [key: string]: CareerPath } = {
  'Web Developer': {
    title: 'Web Developer',
    description: 'Build and maintain websites and web applications. This path focuses on both front-end (user interface) and back-end (server logic) development.',
    steps: [
      {
        title: 'Master the Basics',
        description: 'Get proficient in HTML, CSS, and JavaScript, the core technologies of the web.',
      },
      {
        title: 'Learn a Framework',
        description: 'Pick up a modern front-end framework like React or Next.js to build complex interfaces efficiently.',
      },
      {
        title: 'Understand Back-End',
        description: 'Learn a server-side language like Node.js, Python, or Go to handle databases and server logic.',
      },
      {
        title: 'Gain Experience',
        description: 'Take on projects from Skill Share Hub to build your portfolio and apply your skills to real-world problems.',
      },
    ],
  },
  'AI/ML Engineer': {
    title: 'AI/ML Engineer',
    description: 'Design and build artificial intelligence models and systems. This path requires a strong foundation in mathematics, statistics, and programming.',
    steps: [
      {
        title: 'Strengthen Math & Stats',
        description: 'Focus on linear algebra, calculus, and probability as they are fundamental to machine learning concepts.',
      },
      {
        title: 'Master Python & Libraries',
        description: 'Become an expert in Python and its data science libraries like NumPy, Pandas, TensorFlow, and PyTorch.',
      },
      {
        title: 'Learn Core ML Concepts',
        description: 'Study supervised, unsupervised, and reinforcement learning, as well as neural networks and deep learning.',
      },
      {
        title: 'Specialize and Practice',
        description: 'Choose an area like NLP or Computer Vision. Work on projects to build practical skills.',
      },
    ],
  },
  'DevOps Specialist': {
    title: 'DevOps Specialist',
    description: 'Bridge the gap between software development and IT operations. This role focuses on automation, infrastructure, and deployment pipelines.',
    steps: [
      {
        title: 'Learn Linux & Scripting',
        description: 'Get comfortable with the command line and scripting languages like Bash or Python.',
      },
      {
        title: 'Understand CI/CD',
        description: 'Learn about Continuous Integration and Continuous Deployment pipelines using tools like Jenkins or GitHub Actions.',
      },
      {
        title: 'Master Containerization',
        description: 'Gain expertise in Docker for packaging applications and Kubernetes for orchestrating them.',
      },
      {
        title: 'Explore Cloud Platforms',
        description: 'Get hands-on experience with a major cloud provider like AWS, Google Cloud, or Azure.',
      },
    ],
  },
   'UI/UX Designer': {
    title: 'UI/UX Designer',
    description: 'Focus on creating user-friendly and visually appealing interfaces for websites and applications. This path combines creativity with user-centric research.',
    steps: [
      {
        title: 'Learn Design Principles',
        description: 'Study the fundamentals of visual design, color theory, typography, and layout.',
      },
      {
        title: 'Master Design Tools',
        description: 'Become proficient in industry-standard tools like Figma, Sketch, or Adobe XD.',
      },
      {
        title: 'Understand User Research',
        description: 'Learn how to conduct user interviews, create personas, and map user journeys to inform your designs.',
      },
      {
        title: 'Build a Portfolio',
        description: 'Create case studies for your design projects, showcasing your process from research to final mockups.',
      },
    ],
  },
};
