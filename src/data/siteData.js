import {
  Bot,
  Brain,
  BriefcaseBusiness,
  Building2,
  Clock3,
  DollarSign,
  Eye,
  FileText,
  GraduationCap,
  HelpCircle,
  MessageCircle,
  Mic,
  Monitor,
  Rocket,
  Search,
  Shield,
  Sparkles,
  Target,
  Users,
} from "lucide-react";

export const navItems = [
  { label: "Home", path: "/" },
  { label: "Features", path: "/features" },
  { label: "Courses", path: "/courses" },
  { label: "About", path: "/about" },
];

export const heroWords = [
  "Interviews",
  "Resumes",
  "Career Moves",
  "Job Offers",
  "Salary Talks",
];

export const stats = [
  { label: "Learners Trained", value: "50K+" },
  { label: "Interview Success", value: "98%" },
  { label: "Avg Placement Time", value: "30 Days" },
  { label: "Learner Rating", value: "4.9/5" },
];

export const features = [
  {
    title: "Interview Copilot",
    desc: "Real-time answer hints, communication coaching, and confidence cues.",
    icon: Mic,
  },
  {
    title: "Mock Interview Arena",
    desc: "Role-based AI interview sessions with instant scoring and review.",
    icon: Bot,
  },
  {
    title: "Resume Optimizer",
    desc: "Build ATS-friendly resumes with measurable impact bullets.",
    icon: FileText,
  },
  {
    title: "Stealth Career Mode",
    desc: "Explore opportunities privately while protecting your current profile.",
    icon: Eye,
  },
  {
    title: "Material Generator",
    desc: "Generate personalized revision notes, cheat sheets, and mock tests.",
    icon: Sparkles,
  },
  {
    title: "AI Career Coach",
    desc: "Track goals and get next-step guidance based on your progress.",
    icon: Brain,
  },
  {
    title: "Recruiter Connect",
    desc: "Connect with mentors and recruiters through guided networking prompts.",
    icon: MessageCircle,
  },
  {
    title: "Salary Intelligence",
    desc: "Compare salary ranges, negotiation tips, and offer positioning insights.",
    icon: DollarSign,
  },
  {
    title: "Question Bank",
    desc: "Practice company-wise and skill-wise questions with model answers.",
    icon: HelpCircle,
  },
];

export const courses = [
  {
    title: "Data Science Launchpad",
    desc: "Python, SQL, ML, and analytics projects with interview prep built in.",
    duration: "20 Weeks",
    level: "Intermediate",
    icon: Brain,
  },
  {
    title: "Cloud Engineering Pro",
    desc: "AWS, Docker, Kubernetes, and deployment pipelines for real teams.",
    duration: "14 Weeks",
    level: "Intermediate",
    icon: Monitor,
  },
  {
    title: "AI and GenAI Specialist",
    desc: "Deep learning, prompt engineering, and product-focused AI workflows.",
    duration: "16 Weeks",
    level: "Advanced",
    icon: Sparkles,
  },
  {
    title: "Modern Web Development",
    desc: "Frontend and backend foundations with React, APIs, and scaling basics.",
    duration: "16 Weeks",
    level: "Beginner to Intermediate",
    icon: Search,
  },
];

export const pillars = [
  {
    title: "Placement Focus",
    desc: "Every lesson is mapped to practical hiring outcomes and role expectations.",
    icon: Target,
  },
  {
    title: "Mentor Community",
    desc: "Learn with a fast-growing network of peers, mentors, and alumni.",
    icon: Users,
  },
  {
    title: "Privacy and Trust",
    desc: "Your learning data is secure, encrypted, and fully under your control.",
    icon: Shield,
  },
  {
    title: "AI Native Workflow",
    desc: "Learn and apply AI-assisted methods used by modern product teams.",
    icon: Rocket,
  },
];

export const journeyCards = [
  { title: "Build Skills", icon: GraduationCap },
  { title: "Practice Daily", icon: Clock3 },
  { title: "Get Referred", icon: Building2 },
  { title: "Crack Interviews", icon: BriefcaseBusiness },
];
