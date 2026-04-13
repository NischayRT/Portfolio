import {
  SiCplusplus,
  SiPython,
  SiHtml5,
  SiCss3,
  SiJavascript,
  SiMysql,
  SiGit,
  SiReact,
  SiSelenium,
  SiNextdotjs,
  SiTailwindcss,
  SiBootstrap,
  SiGoogle,
  SiWordpress,
  SiPhp,
  SiPostman,
  SiVite,
  SiVercel,
  SiNetlify,
  SiElectron,
  SiSupabase, 
} from "react-icons/si";
import { FaJava } from "react-icons/fa";
import image1 from "../../../assets/image1.webp";
import image2 from "../../../assets/image2.webp";
import image3 from "../../../assets/image3.webp";
import image4 from "../../../assets/image4.webp";
import image5 from "../../../assets/image5.webp";
export const SKILLS_DATA = [
  {
    name: "C/C++",
    icon: SiCplusplus,
    color: "#00599C",
    desc: "System Programming & Algorithms",
  },
  {
    name: "Python",
    icon: SiPython,
    color: "#3776AB",
    desc: "Automation, AI & Backend",
  },
  {
    name: "Core Java",
    icon: FaJava,
    color: "#007396",
    desc: "Object Oriented Programming",
  },
  {
    name: "HTML5",
    icon: SiHtml5,
    color: "#E34F26",
    desc: "Structural Web Markup",
  },
  {
    name: "CSS3",
    icon: SiCss3,
    color: "#1572B6",
    desc: "Responsive Design & Animations",
  },
  {
    name: "JavaScript",
    icon: SiJavascript,
    color: "#F7DF1E",
    desc: "Dynamic Web Interaction",
  },
  {
    name: "MySQL",
    icon: SiMysql,
    color: "#4479A1",
    desc: "Relational Database Management",
  },
  {
    name: "Git",
    icon: SiGit,
    color: "#F05032",
    desc: "Version Control System",
  },
  {
    name: "React.js",
    icon: SiReact,
    color: "#61DAFB",
    desc: "Frontend Library",
  },
  {
    name: "Selenium",
    icon: SiSelenium,
    color: "#43B02A",
    desc: "Web Testing Automation",
  },
  {
    name: "Next.js",
    icon: SiNextdotjs,
    color: "#FFFFFF",
    desc: "React Framework for Production",
  },
  {
    name: "Vite",
    icon: SiVite,
    color: "#646CFF",
    desc: "Next Generation Frontend Tooling",
  },
  {
    name: "Vercel",
    icon: SiVercel,
    color: "#FFFFFF",
    desc: "Deployment & Serverless Functions",
  },
  {
    name: "Netlify",
    icon: SiNetlify,
    color: "#00C7B7",
    desc: "Web Development Platform",
  },
  {
    name: "Tailwind",
    icon: SiTailwindcss,
    color: "#06B6D4",
    desc: "Utility-First CSS",
  },
  {
    name: "Bootstrap",
    icon: SiBootstrap,
    color: "#7952B3",
    desc: "Responsive Framework",
  },
  {
    name: "AppScript",
    icon: SiGoogle,
    color: "#4285F4",
    desc: "Google Workspace Automation",
  },
  {
    name: "Integrations",
    icon: SiPostman,
    color: "#FF6C37",
    desc: "API & System Connecting",
  },
  {
    name: "WordPress",
    icon: SiWordpress,
    color: "#21759B",
    desc: "CMS Development",
  },
  { name: "PHP", icon: SiPhp, color: "#777BB4", desc: "Server-Side Scripting" },
];

export const EXPERIENCE_DATA = [
  {
    company: "8 Views",
    role: "Full Stack Developer Intern",
    date: "<div>Oct 2025</div> <div style='display: flex;height: 10px;justify-content: center;align-items: center;'> - </div> Feb 2026",
    location: "Madhapur",
    description: [
      "Designed and optimized responsive web pages using HTML, CSS, Bootstrap, Tailwind, and JavaScript.",
      "Created and updated SEO-optimized WordPress blog pages, including slug and metadata management.",
      "Integrated Google Sheets API and PHP backend for automated lead collection processes.",
      "Optimized performance to achieve 80%+ scores on PageSpeed Insights.",
    ],
  },
  {
    company: "Edugene Technologies",
    role: "Software Developer Intern",
    date: "<div>Aug 2023</div> <div style='display: flex;height: 10px;justify-content: center;align-items: center;'> - </div> <div>Oct 2023</div>",
    location: "Hyderabad",
    description: [
      "Developed responsive UI components using HTML, CSS, and JavaScript.",
      "Implemented dynamic server-side rendering to convert design mockups into functional pages.",
      "Contributed to a 25% reduction in UI defects through structured testing.",
    ],
  },
  {
    company: "Swechha Organization",
    role: "Web Development Intern",
    date: "<div>May 2022</div><div style='display: flex;height: 10px;justify-content: center;align-items: center;'> - </div><div>Jun 2022</div>",
    location: "Hyderabad",
    description: [
      "Revamped the company blog interface with a fully responsive design.",
      "Incorporated social media integration and developed a dynamic search bar.",
      "Enhanced page usability leading to 30% quicker navigation.",
    ],
  },
];

export const PROJECTS_DATA = [
  {
    title: "Drsti",
    subtitle: "AI-Powered Focus Intelligence",
    url: "https://drsti.vercel.app/",
    description:
      "Built a desktop app with real-time AI gaze detection using MediaPipe FaceMesh, tracking 468 facial landmarks to measure focused vs away time across Pomodoro sessions.",
    tech: [SiElectron, SiPython, SiReact, SiNextdotjs, SiSupabase],
    image: image5,
},
{
    title: "Tone Shift",
    subtitle: "Tone and format changer",
    url: "https://text-tone-shift.vercel.app/",
    description:
      "Transform any text into platform-native formats instantly. No AI API. No data sent. Fully browser-side.",
    tech: [SiNextdotjs, SiTailwindcss, SiVercel],
    image: image1,
  },
  {
    title: "Electrify Hyderabad",
    subtitle: "Electric cars exhibition page",
    url: "https://electrify-hyd.com/",
    description:
      "Developed a quick and completely responsive promotional webpage using HTML and CSS for the CII Electric Car Exhibition.",
    tech: [SiHtml5, SiCss3, SiGoogle],
    image: image2,
  },
  {
    title: "SunnySide",
    subtitle: "A Weather App",
    url: "https://sunnyside-weather.netlify.app/",
    description:
      "Implemented with React and Vite, utilizing Open-Meteo API for real-time updates and graphical trends.",
    tech: [SiReact, SiVite, SiTailwindcss],
    image: image3,
  },
  {
    title: "Foodievery",
    subtitle: "A Food Delivery App",
    url: "https://foodievery.netlify.app/",
    description:
      "Developed a responsive web application for browsing restaurants, viewing menus, and online ordering.",
    tech: [SiReact, SiPostman, SiCss3],
    image: image4,
  },
];
