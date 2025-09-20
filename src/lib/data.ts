import type { Project, Student } from './types';

export const students: Student[] = [
  {
    id: 'ana-garcia',
    name: 'Ana Garcia',
    email: 'ana.garcia@university.edu',
    college: 'Stanford University',
    bio: 'CS student passionate about AI and machine learning. Eager to apply my skills to solve real-world problems and contribute to innovative projects.',
    skills: ['Python', 'TensorFlow', 'PyTorch', 'Data Analysis', 'NLP'],
    avatarUrl: 'https://picsum.photos/seed/student1/200/200',
  },
  {
    id: 'james-smith',
    name: 'James Smith',
    email: 'james.smith@stateu.edu',
    college: 'MIT',
    bio: 'Frontend developer with a keen eye for design and user experience. Proficient in React and modern JavaScript frameworks.',
    skills: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Figma'],
    avatarUrl: 'https://picsum.photos/seed/student2/200/200',
  },
  {
    id: 'priya-patel',
    name: 'Priya Patel',
    email: 'priya.patel@tech.edu',
    college: 'Carnegie Mellon University',
    bio: 'Backend engineering enthusiast specializing in distributed systems and cloud computing. Always ready for a challenge.',
    skills: ['Go', 'Docker', 'Kubernetes', 'AWS', 'PostgreSQL'],
    avatarUrl: 'https://picsum.photos/seed/student3/200/200',
  },
];

export const projects: Project[] = [
  {
    id: 'p1',
    title: 'AI-Powered Content Summarizer',
    description: 'Develop a web service that uses a large language model to summarize long articles and documents. The user should be able to input text or a URL and receive a concise summary.',
    deadline: '2024-12-15',
    reward: '$2,500',
    requirements: ['Python', 'NLP', 'API Development', 'LLM Integration'],
    companyName: 'Innovate AI',
    companyLogoUrl: 'https://picsum.photos/seed/logo1/40/40',
  },
  {
    id: 'p2',
    title: 'E-commerce Website Redesign',
    description: 'Redesign our e-commerce platform for a modern, responsive user experience. Focus on improving navigation, product discovery, and checkout flow.',
    deadline: '2024-11-30',
    reward: '$3,000',
    requirements: ['React', 'Next.js', 'UI/UX Design', 'Tailwind CSS'],
    companyName: 'ShopSphere',
    companyLogoUrl: 'https://picsum.photos/seed/logo2/40/40',
  },
  {
    id: 'p3',
    title: 'Cloud Infrastructure Automation',
    description: 'Create a set of scripts to automate the deployment and scaling of our microservices on Kubernetes. The goal is to improve reliability and reduce manual overhead.',
    deadline: '2025-01-10',
    reward: '$3,500',
    requirements: ['Go', 'Kubernetes', 'Docker', 'CI/CD'],
    companyName: 'ScaleGrid',
    companyLogoUrl: 'https://picsum.photos/seed/logo3/40/40',
  },
  {
    id: 'p4',
    title: 'Data Visualization Dashboard',
    description: 'Build an interactive dashboard to visualize our sales data. The dashboard should allow filtering by date, region, and product category, providing actionable insights for the sales team.',
    deadline: '2024-12-01',
    reward: '$2,000',
    requirements: ['Data Analysis', 'React', 'D3.js', 'TypeScript'],
    companyName: 'Data Insights Inc.',
    companyLogoUrl: 'https://picsum.photos/seed/logo4/40/40',
  },
];
