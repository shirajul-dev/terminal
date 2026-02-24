import React from 'react';
import { Project, Skill, Social, FileSystemNode, Testimonial, Experience, Education } from './types';
import { Terminal, Cpu, Database, Cloud, Smartphone, Globe, Layers, Video, CreditCard } from 'lucide-react';

export const HOSTNAMES = [
  "shiraj_pc",
  "msi_core", 
  "islam_node",
  "dev_shiraj",
  "matrix_msi",
  "dhaka_server",
  "shiraj_term",
  "mainframe_si",
  "void_shiraj"
];

export const INTRO_SEQUENCE = [
  "BIOS Date 09/14/25 15:23:01 Ver: 1.0.2",
  "CPU: MSI Quantum Core i9 @ 5.2GHz",
  "Memory Test: 65536K OK",
  "Initializing Boot Agent...",
  "Loading Kernel [Laravel]... OK",
  "Loading Ramdisk [Flutter]... OK",
  "Mounting File System... RW",
  "Starting Services: [Docker, WS, MySQL, Redis]",
  "Establishing Secure Connection... SUCCESS",
  "User 'guest' authenticated.",
  "Welcome to SHIRAJ_OS v2.0."
];

export const PROJECTS: Project[] = [
  {
    name: "TeleChat",
    type: "System",
    description: "Real-time chat application with high-concurrency support.",
    stack: ["Laravel", "WebSockets", "Flutter", "Redis"],
    features: ["Broadcasting", "E2E Encryption", "File Sharing", "Group Channels"]
  },
  {
    name: "PW_Lotto",
    type: "Web",
    description: "Multi-regional lottery platform handling millions of transactions.",
    stack: ["Laravel", "Flutter", "MySQL", "Docker"],
    features: ["14 Languages", "8 Payment Gateways", "Automated Draws", "Real-time Odds"]
  },
  {
    name: "Piverr",
    type: "Mobile",
    description: "Freelance marketplace connecting services with clients.",
    stack: ["Flutter", "REST API", "Node.js", "Stripe"],
    features: ["Gig Management", "In-app Chat", "Escrow Payments", "Dispute System"]
  },
  {
    name: "PikPok",
    type: "Backend",
    description: "Scalable short-video platform clone with video processing pipeline.",
    stack: ["Laravel", "FFmpeg", "AWS S3", "CDN"],
    features: ["Video Transcoding", "Recommendation Algo", "Live Streaming", "Social Graph"]
  },
  {
    name: "nPay",
    type: "Mobile",
    description: "Digital wallet and payment ecosystem.",
    stack: ["Flutter", "Firebase", "Laravel", "NFC"],
    features: ["QR Payments", "P2P Transfers", "Bill Split", "Virtual Cards"]
  }
];

export const EXPERIENCES: Experience[] = [
    {
        role: "Senior Full Stack Engineer",
        company: "TechSolutions Inc.",
        period: "2023 - Present",
        description: [
            "Architected a scalable microservices ecosystem serving 50k+ daily users.",
            "Optimized database queries reducing latency by 40% using Redis caching.",
            "Led a team of 5 developers for the flagship Flutter mobile application."
        ],
        tech: ["Laravel", "Flutter", "Docker", "AWS"]
    },
    {
        role: "Backend Developer",
        company: "InnovateSoft",
        period: "2021 - 2023",
        description: [
            "Developed RESTful APIs for e-commerce platforms.",
            "Implemented real-time notification systems using WebSockets.",
            "Managed CI/CD pipelines and server deployments on Ubuntu VPS."
        ],
        tech: ["PHP", "MySQL", "Redis", "Linux"]
    },
    {
        role: "Junior App Developer",
        company: "Creative Labs",
        period: "2020 - 2021",
        description: [
            "Built cross-platform mobile apps using Flutter.",
            "Integrated payment gateways and third-party APIs.",
            "Collaborated with UI/UX designers to implement pixel-perfect interfaces."
        ],
        tech: ["Flutter", "Firebase", "Dart"]
    }
];

export const EDUCATION: Education[] = [
    {
        degree: "B.Sc. in Computer Science & Engineering",
        institution: "Dhaka University of Engineering & Technology",
        year: "2016 - 2020",
        details: "Focus on Distributed Systems, Algorithms, and Software Architecture. Graduated with Honors."
    },
    {
        degree: "Higher Secondary Certificate",
        institution: "Dhaka City College",
        year: "2014 - 2016",
        details: "Science Group. Achieved GPA 5.00."
    }
];

export const SKILLS: Skill[] = [
  { name: "Laravel", level: 98, category: "Backend", processId: 1024, cpu: 12.5, mem: 256 },
  { name: "Flutter", level: 95, category: "Frontend", processId: 1025, cpu: 15.2, mem: 512 },
  { name: "WebSockets", level: 90, category: "Backend", processId: 1080, cpu: 8.4, mem: 128 },
  { name: "Docker", level: 85, category: "DevOps", processId: 1102, cpu: 4.1, mem: 1024 },
  { name: "MySQL", level: 92, category: "Database", processId: 1337, cpu: 18.3, mem: 2048 },
  { name: "Cloudflare", level: 85, category: "DevOps", processId: 1404, cpu: 1.2, mem: 64 },
  { name: "FFmpeg", level: 80, category: "Backend", processId: 1550, cpu: 45.0, mem: 4096 },
  { name: "Linux", level: 90, category: "DevOps", processId: 8822, cpu: 2.5, mem: 512 },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    name: "Alex R.",
    role: "CTO",
    company: "Fintech Startup",
    text: "Shirajul is a machine. Delivered the real-time socket architecture 2 weeks ahead of schedule. The code quality is immaculate.",
    rating: 5
  },
  {
    name: "Sarah J.",
    role: "Product Manager",
    company: "E-Comm Inc.",
    text: "The Flutter app performance is unreal. He managed to give us a native feel with cross-platform efficiency. Highly recommended.",
    rating: 5
  },
  {
    name: "David K.",
    role: "DevOps Lead",
    company: "CloudSystems",
    text: "Solved a server bottleneck we had for months in just 2 days. His understanding of Linux and Docker is production-grade.",
    rating: 5
  },
  {
    name: "Michael B.",
    role: "Founder",
    company: "SocialStream",
    text: "Built our entire video processing pipeline from scratch. FFmpeg implementation was flawless.",
    rating: 5
  }
];

export const TECH_STACK_ICONS = [
  { name: "Laravel", icon: <Layers size={20} className="text-red-500" /> },
  { name: "Flutter", icon: <Smartphone size={20} className="text-blue-400" /> },
  { name: "Docker", icon: <Cloud size={20} className="text-blue-600" /> },
  { name: "MySQL", icon: <Database size={20} className="text-orange-400" /> },
  { name: "Linux", icon: <Terminal size={20} className="text-yellow-400" /> },
  { name: "WebSockets", icon: <Cpu size={20} className="text-purple-400" /> },
  { name: "REST API", icon: <Globe size={20} className="text-green-400" /> },
  { name: "Video", icon: <Video size={20} className="text-pink-400" /> },
  { name: "Payments", icon: <CreditCard size={20} className="text-emerald-400" /> },
];

export const SOCIALS: Social[] = [
  { platform: "GitHub", url: "https://github.com/", user: "@shirajul" },
  { platform: "LinkedIn", url: "https://linkedin.com/", user: "Md Shirajul Islam" },
  { platform: "Email", url: "mailto:contact@shirajul.dev", user: "contact@shirajul.dev" },
];

export const HELP_TEXT = `
SHIRAJ-OS Shell Command List:

 Shortcuts:
  about        - View profile info
  skills       - System metrics & capabilities
  projects     - Navigate to projects directory
  experience   - Professional career log
  education    - Academic records
  contact      - Secure communication channel
  testimonials - Decrypt client feedback

 Navigation:
  ls           - List directory contents
  cd <dir>     - Change directory
  cat <file>   - Print file content
  ./<name>     - Launch executable (e.g., ./TeleChat)

 System:
  clear        - Clear terminal screen
  theme <name> - Change UI (green, amber, blue, pink)
  whoami       - Current user info
  help         - Show this message
`;

// Helper to build file system dynamically
const buildFileSystem = () => {
    const projectFiles: { [key: string]: FileSystemNode } = {};
    
    // Create executable nodes for each project
    PROJECTS.forEach(proj => {
        projectFiles[proj.name] = { 
            type: "exec", 
            description: proj.description 
        };
    });

    // Add readme to projects
    projectFiles["README.md"] = { 
        type: "file", 
        content: "To view project details, run the executable:\nUsage: ./<ProjectName>\nExample: ./TeleChat" 
    };

    return {
      "~": {
        type: "dir",
        children: {
          "projects": {
            type: "dir",
            children: projectFiles
          },
          "skills": {
             type: "dir",
             children: {
                 "backend.json": { type: "file", content: "Laravel, Node, Python, Go" },
                 "frontend.json": { type: "file", content: "Flutter, React, Vue" },
                 "infrastructure.log": { type: "file", content: "Docker, K8s, AWS, DigitalOcean" },
                 "run_metrics.sh": { type: "file", content: "Run 'top' to view visualized metrics." }
             }
          },
          "about.txt": { type: "file", content: "ABOUT_CONTENT_PLACEHOLDER" },
          "contact.md": { type: "file", content: "CONTACT_CONTENT_PLACEHOLDER" },
          "experience.log": { type: "file", content: "EXPERIENCE_CONTENT_PLACEHOLDER" },
          "education.txt": { type: "file", content: "EDUCATION_CONTENT_PLACEHOLDER" },
          "testimonials.log": { type: "file", content: "TESTIMONIALS_CONTENT_PLACEHOLDER" },
          "secret.log": { type: "file", content: "Access Denied: Encrypted content." },
        }
      }
    } as { [key: string]: FileSystemNode };
};

// Virtual File System Structure (Dynamic)
export const FILE_SYSTEM = buildFileSystem();