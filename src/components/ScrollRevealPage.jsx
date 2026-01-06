"use client";
import "../app/MeshGradient.css";
import "../app/globals.css";
import React, {
  useEffect,
  useRef,
  useState,
  useMemo,
  useCallback,
  useLayoutEffect,
} from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import profilePic from "../../assets/Profile.webp";

// --- PROJECT IMAGES IMPORTS (Ensure these paths are correct) ---
import image1 from "../../assets/image1.webp";
import image2 from "../../assets/image2.webp";
import image3 from "../../assets/image3.webp";
import image4 from "../../assets/image4.webp";

// --- Icons Imports ---
import {
  Github,
  Linkedin,
  Briefcase,
  Calendar,
  MapPin,
  ExternalLink,
} from "lucide-react";
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
} from "react-icons/si";
import { FaJava, FaCode } from "react-icons/fa";

// Local Icons
import leetcode from "../../assets/icons/leetcode.png";
import codechef from "../../assets/icons/codechef.png";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// --- DATA CONFIGURATION ---
const SKILLS_DATA = [
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

const EXPERIENCE_DATA = [
  {
    company: "8 Views",
    role: "Full Stack Developer Intern",
    date: "<div>Oct 2025</div> <div style='display: flex;height: 10px;justify-content: center;align-items: center;'> - </div> Present",
    location: "Madhapur",
    description: [
      "Designed and optimized responsive web pages using HTML, CSS, Bootstrap, Tailwind, and JavaScript.",
      "Created and updated SEO-optimized WordPress blog pages, including slug and metadata management.",
      "Integrated Google Sheets API and PHP backend for automated lead collection processes.",
      "Optimized performance to achieve 80%+ scores on PageSpeed Insights.",
      "Applied UI/UX enhancements to improve user retention.",
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
      "Collaborated effectively on the project version control through GitHub.",
    ],
  },
];

const PROJECTS_DATA = [
  {
    title: "Text Tone Picker",
    subtitle: "Tone and format changer",
    url: "https://text-tone-picker.netlify.app/", // Actual URL (Example)
    description:
      "Tone Picker Text Tool is an online app that utilizes the capabilities of Mistral AI to enable users to improve their writings.",
    tech: [SiNextdotjs, SiTailwindcss, SiVercel],
    image: image1,
  },
  {
    title: "Electrify Hyderabad",
    subtitle: "Electric cars exhibition page",
    url: "https://electrify-hyd.com/", // Add actual URL here
    description:
      "Developed a quick and completely responsive promotional webpage using HTML and CSS for the CII Electric Car Exhibition.",
    tech: [SiHtml5, SiCss3, SiGoogle],
    image: image2,
  },
  {
    title: "SunnySide",
    subtitle: "A Weather App",
    url: "https://weather-now-aganitha.netlify.app/", // Add actual URL here
    description:
      "Implemented with React and Vite, utilizing Open-Meteo API for real-time updates and graphical trends.",
    tech: [SiReact, SiVite, SiTailwindcss],
    image: image3,
  },
  {
    title: "Foodievery",
    subtitle: "A Food Delivery App",
    url: "https://foodievery.netlify.app/", // Working URL
    description:
      "Developed a responsive web application for browsing restaurants, viewing menus, and online ordering.",
    tech: [SiReact, SiPostman, SiCss3],
    image: image4,
  },
];

// --- Sub Components ---
const LeetCodeIcon = ({ size, className }) => (
  <Image
    src={leetcode}
    alt="LeetCode"
    width={size}
    height={size}
    className={`${className} icon-logo invert brightness-0`}
  />
);
const CodeChefIcon = ({ size, className }) => (
  <Image
    src={codechef}
    alt="CodeChef"
    width={size}
    height={size}
    className={`${className} icon-logo invert brightness-0`}
  />
);

const SocialPill = React.memo(({ icon: Icon, label, link, color }) => (
  <a
    href={link}
    target="_blank"
    rel="noopener noreferrer"
    className="group/pill relative flex items-center justify-center w-12 h-12 rounded-full bg-white/10 border border-white/10 hover:w-32 hover:bg-[var(--hover-color)] transition-all duration-300 ease-in-out overflow-hidden shadow-lg"
    style={{ "--hover-color": color }}
  >
    <Icon
      size={20}
      className="text-white absolute transition-all duration-300 group-hover/pill:translate-y-3"
    />
    <span className="absolute opacity-0 translate-y-4 text-xs font-bold text-white uppercase tracking-wider transition-all duration-300 group-hover/pill:opacity-100 group-hover/pill:-translate-y-2">
      {label}
    </span>
  </a>
));
SocialPill.displayName = "SocialPill";

export default function ScrollRevealPage() {
  const topDoorRef = useRef(null);
  const bottomDoorRef = useRef(null);
  const contentRef = useRef(null);
  const featuredSkillRef = useRef(null);

  // Experience Refs
  const experienceWrapperRef = useRef(null);
  const experienceContainerRef = useRef(null);
  const experienceTitleRef = useRef(null);

  // Project Refs
  const projectsWrapperRef = useRef(null);
  const projectsContainerRef = useRef(null);
  const projectsTitleRef = useRef(null);

  const scrollData = useRef({ current: 0, target: 0 });
  const [greeting, setGreeting] = useState("");
  const [activeSkill, setActiveSkill] = useState(null);

  const calculateGreeting = useMemo(() => {
    const hour = new Date().getHours();
    return hour < 12
      ? "Good morning"
      : hour < 18
      ? "Good afternoon"
      : "Good evening";
  }, []);

  useEffect(() => {
    setGreeting(calculateGreeting);
  }, [calculateGreeting]);

  // Entry Animation
  useEffect(() => {
    let requestID;
    let ticking = false;
    const updateTransforms = () => {
      const p = scrollData.current.current;
      const splitDistance = p * 55;
      const contentScale = 0.9 + p * 0.1;
      const contentOpacity = Math.max(0, (p - 0.2) * 2);
      const contentY = (1 - p) * 100;

      if (topDoorRef.current)
        topDoorRef.current.style.transform = `translate3d(0, -${splitDistance}vh, 0)`;
      if (bottomDoorRef.current)
        bottomDoorRef.current.style.transform = `translate3d(0, ${splitDistance}vh, 0)`;
      if (contentRef.current) {
        contentRef.current.style.opacity = contentOpacity;
        contentRef.current.style.transform = `scale(${contentScale}) translate3d(0, ${contentY}px, 0)`;
      }
      ticking = false;
    };
    const animate = () => {
      const viewportHeight = window.innerHeight;
      const rawProgress = window.scrollY / viewportHeight;
      scrollData.current.target = Math.max(0, Math.min(rawProgress, 1));
      scrollData.current.current +=
        (scrollData.current.target - scrollData.current.current) * 0.5;
      if (!ticking) {
        ticking = true;
        updateTransforms();
      }
      requestID = requestAnimationFrame(animate);
    };
    animate();
    return () => {
      if (requestID) cancelAnimationFrame(requestID);
    };
  }, []);

  // Skill Icon Animation
  useEffect(() => {
    if (activeSkill && featuredSkillRef.current) {
      gsap.killTweensOf(featuredSkillRef.current);
      gsap.fromTo(
        featuredSkillRef.current,
        { opacity: 0, y: 15, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.3, ease: "back.out(1.7)" }
      );
    }
  }, [activeSkill]);

  // --- EXPERIENCE SECTION ANIMATION ---
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const wrapper = experienceWrapperRef.current;
      const races = experienceContainerRef.current;
      const title = experienceTitleRef.current;
      const cards = gsap.utils.toArray(races.children);

      function getScrollAmount() {
        let racesWidth = races.scrollWidth;
        return -(racesWidth - window.innerWidth);
      }

      gsap.set(title, {
        top: "50%",
        left: "50%",
        xPercent: -50,
        yPercent: -50,
        scale: 1.5,
        autoAlpha: 1,
      });
      gsap.set(cards, { autoAlpha: 0, y: 100 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapper,
          start: "top top",
          end: () => `+=${Math.abs(getScrollAmount()) + window.innerHeight}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });

      tl.to(title, {
        top: "3.5rem",
        left: "2rem",
        xPercent: 0,
        yPercent: 0,
        scale: 1,
        duration: 1,
        ease: "power2.inOut",
      })
        .to(cards, {
          autoAlpha: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.1,
          ease: "power2.out",
        })
        .to(races, {
          x: () => getScrollAmount(),
          duration: 3,
          ease: "none",
        });
    }, experienceWrapperRef);
    return () => ctx.revert();
  }, []);

  // --- PROJECTS SECTION ANIMATION (NEW) ---
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const wrapper = projectsWrapperRef.current;
      const races = projectsContainerRef.current;
      const title = projectsTitleRef.current;

      // Select direct children (cards)
      const cards = gsap.utils.toArray(races.children);

      function getScrollAmount() {
        let racesWidth = races.scrollWidth;
        return -(racesWidth - window.innerWidth);
      }

      // Initial States
      gsap.set(title, {
        top: "50%",
        left: "50%",
        xPercent: -50,
        yPercent: -50,
        scale: 2,
        autoAlpha: 1,
      });
      gsap.set(cards, { autoAlpha: 0, y: 100 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapper,
          start: "top top",
          end: () => `+=${Math.abs(getScrollAmount()) + window.innerHeight}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });

      // 1. Title Move
      tl.to(title, {
        top: "3.5rem",
        left: "2rem",
        xPercent: 0,
        yPercent: 0,
        scale: 1,
        duration: 1,
        ease: "power2.inOut",
      })
        // 2. Cards Fade In
        .to(cards, {
          autoAlpha: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.1,
          ease: "power2.out",
        })
        // 3. Horizontal Scroll
        .to(races, {
          x: () => getScrollAmount(),
          duration: 3,
          ease: "none",
        });
    }, projectsWrapperRef); // Scope to projects wrapper
    return () => ctx.revert();
  }, []);

  const handleSkillEnter = useCallback((skill) => setActiveSkill(skill), []);
  const handleSkillLeave = useCallback(() => setActiveSkill(null), []);

  return (
    <div className="relative bg-black min-h-screen">
      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 5px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.02);
          margin-top: 10px;
          margin-bottom: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.15);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.3);
        }
      `}</style>

      {/* --- ENTRY DOOR SECTIONS (Keep code same) --- */}
      <div
        ref={topDoorRef}
        className="fixed top-0 left-0 w-full z-40 overflow-hidden will-change-transform"
        style={{
          height: "46vh",
          marginTop: "5vh",
          transform: "translate3d(0, 0, 0)",
          contain: "layout style paint",
        }}
      >
        <div className="absolute inset-0 flex items-end justify-center px-4 md:px-16 pb-0">
          <div className="home-1 home flex flex-col items-center justify-end pb-2 relative overflow-hidden w-full max-w-7xl">
            <div className="absolute bottom-0 w-[60%] h-75 bg-blue-500/20 blur-[100px] rounded-full pointer-events-none" />
            <div className="relative z-10 text-center mb-2">
              <p className="text-transparent bg-clip-text bg-gradient-to-br from-pink-500 via-orange-300 to-orange-600 text-sm font-bold tracking-[0.3em] italic uppercase mb-4 min-h-5 special-heading animate-pulse">
                {greeting}
              </p>
              <h1 className="text-5xl md:text-7xl font-sans font-thin leading-tight text-transparent bg-clip-text bg-gradient-to-br from-white via-blue-100 to-blue-300 opacity-90">
                MY NAME IS
              </h1>
            </div>
          </div>
        </div>
      </div>

      <div
        ref={bottomDoorRef}
        className="fixed bottom-0 left-0 w-full z-40 overflow-hidden will-change-transform"
        style={{
          height: "45vh",
          marginBottom: "5vh",
          paddingBottom: "10px",
          transform: "translate3d(0, 0, 0)",
          contain: "layout style paint",
        }}
      >
        <div className="absolute inset-0 flex items-start justify-center px-4 md:px-16 pt-0">
          <div className="home home-2 flex flex-col items-center justify-start pt-2 relative overflow-hidden w-full max-w-7xl">
            <div className="absolute top-0 w-[60%] h-75 bg-indigo-500/20 blur-[100px] rounded-full pointer-events-none" />
            <div className="relative z-10 text-center">
              <h1 className="heading text-7xl md:text-8xl mt-0 leading-tight drop-shadow-2xl pt-2 pb-6 shiny-silver">
                Nischay Reddy
              </h1>
              <div className="mt-4 flex justify-center gap-4 opacity-60">
                <span className="h-px w-16 bg-white/50 self-center"></span>
                <span className="h-px w-16 bg-white/50 self-center"></span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="fixed inset-0 h-[120vh] w-full z-10 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 overflow-hidden">
          <div className="blob n-left-vertical" />{" "}
          <div className="blob n-right-vertical" />{" "}
          <div className="blob n-diagonal-dark" />{" "}
          <div className="blob n-ambient" /> <div className="overlay-blend" />{" "}
          <div className="noise-layer opacity-40" />
        </div>
        <div
          ref={contentRef}
          className="relative z-20 flex items-center justify-center h-full pointer-events-auto flex-col pb-40 px-4 md:px-16 will-change-transform"
          style={{ opacity: 0 }}
        >
          <div className="w-full flex justify-center mt-12 md:mt-0">
            <div className="md:col-span-8 bg-white/5 backdrop-blur-md w-full max-w-7xl border border-white/10 rounded-3xl p-6 md:p-8 flex flex-col md:flex-row gap-8 items-center md:items-start group hover:bg-white/10 transition-colors duration-500">
              <div className="relative shrink-0">
                <Image
                  src={profilePic}
                  alt="Nischay Reddy"
                  priority={true}
                  className="relative object-cover Profile rounded-2xl shadow-2xl ring-2 ring-white/20"
                />
              </div>
              <div className="flex flex-col justify-center h-full w-full">
                <h3 className="text-2xl font-bold text-white mb-3">
                  Entry Level Software Engineer
                </h3>
                <p className="text-gray-300 leading-relaxed text-sm md:text-base mb-6">
                  A detail-oriented computer science undergraduate looking for
                  an entry-level Software Engineer position in a fast-growing
                  company.
                </p>
                <div className="group flex flex-wrap gap-3 mt-auto justify-center md:justify-start">
                  <SocialPill
                    icon={Linkedin}
                    label="LinkedIn"
                    link="https://www.linkedin.com/in/nischayrt/"
                    color="#0077B5"
                  />
                  <SocialPill
                    icon={Github}
                    label="GitHub"
                    link="https://github.com/NischayRT"
                    color="#111111"
                  />
                  <SocialPill
                    icon={LeetCodeIcon}
                    label="LeetCode"
                    link="https://leetcode.com/u/user0322sl/"
                    color="#FFA116"
                  />
                  <SocialPill
                    icon={CodeChefIcon}
                    label="CodeChef"
                    link="https://www.codechef.com/users/nischayreddy"
                    color="#5B4638"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="h-[240vh]"></div>

      {/* =========================================================
          UNIFIED SECTION: SKILLS + EXPERIENCE + PROJECTS
      ========================================================= */}
      <section className="relative z-40 bg-black min-h-screen">
        <div className="sticky top-0 w-full h-screen overflow-hidden pointer-events-none">
          <div className="skill-blob skill-left" />{" "}
          <div className="skill-blob skill-right" />{" "}
          <div className="tech-grid" />{" "}
          <div className="noise-layer opacity-30" />
        </div>

        <div className="relative z-10 -mt-[100vh]">
          {/* 1. SKILLS CONTENT */}
          <div className="min-h-screen flex items-center justify-center py-20 px-4">
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 w-full max-w-6xl rounded-3xl p-8 md:p-12 flex flex-col md:flex-row gap-12 items-stretch shadow-2xl">
              <div className="w-full md:w-1/3 flex flex-col justify-center relative min-h-[300px] border-b md:border-b-0 md:border-r border-white/10 pt-8 md:pt-0 pr-0 md:pr-12">
                {activeSkill ? (
                  <>
                    <div
                      className="absolute inset-0 blur-[100px] opacity-20 transition-colors duration-700 pointer-events-none"
                      style={{ backgroundColor: activeSkill.color }}
                    />
                    <div
                      ref={featuredSkillRef}
                      className="relative z-10 flex flex-col items-center md:items-start text-center md:text-left"
                    >
                      <activeSkill.icon
                        size={80}
                        className="mb-6 drop-shadow-2xl transition-colors duration-500"
                        style={{ color: activeSkill.color }}
                      />
                      <h2 className="text-3xl md:text-5xl font-bold text-white mb-2 tracking-tight">
                        {activeSkill.name}
                      </h2>
                      <div
                        className="h-1 w-20 rounded-full mb-6"
                        style={{ backgroundColor: activeSkill.color }}
                      ></div>
                      <p className="text-lg text-gray-300 font-light">
                        {activeSkill.desc}
                      </p>
                    </div>
                  </>
                ) : (
                  <div className="flex flex-col items-center justify-center h-full">
                    <FaCode
                      size={60}
                      className="mb-4 animate-pulse text-white"
                    />
                    <h1 className="text-2xl text-white">My Tech Stack</h1>
                  </div>
                )}
              </div>
              <div className="w-full md:w-2/3">
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4">
                  {SKILLS_DATA.map((skill, index) => (
                    <div
                      key={index}
                      onMouseEnter={() => handleSkillEnter(skill)}
                      onMouseLeave={handleSkillLeave}
                      style={{ "--skill-color": skill.color }}
                      className="group relative flex flex-col items-center justify-center p-4 rounded-xl cursor-pointer transition-all duration-300 hover:bg-white/90 bg-gradient-to-b from-white/1 to-white/7 border border-white/5 hover:border-[var(--skill-color)]"
                    >
                      <skill.icon
                        size={32}
                        className="text-white group-hover:text-black group-hover:scale-110 transition-all duration-300"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* 2. EXPERIENCE CONTENT (SCROLLABLE) */}
          <div
            ref={experienceWrapperRef}
            className="h-screen overflow-hidden flex flex-col justify-center relative"
          >
            <h2
              ref={experienceTitleRef}
              className="absolute z-50 text-3xl md:text-4xl text-white opacity-0 drop-shadow-xl shiny-silver whitespace-nowrap"
              style={{
                top: "50%",
                left: "50%",
                transform: "translate(20%, -60%)",
              }}
            >
              <div>My</div>
              <div> Experience</div>
            </h2>
            <div
              ref={experienceContainerRef}
              className="h-full flex flex-nowrap items-center pl-[5vw] md:pl-[10vw] pr-[20vw]"
              style={{ width: "fit-content" }}
            >
              {EXPERIENCE_DATA.map((exp, index) => (
                <div
                  key={index}
                  className="relative flex-shrink-0 w-[90vw] md:w-[60vw] lg:w-[45vw] h-[70vh] mr-12 md:mr-24"
                >
                  <div className="w-full h-full bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-12 flex flex-col shadow-2xl transition-transform duration-300 hover:scale-[1.02] group overflow-hidden">
                    <div className="flex-shrink-0 flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-6 border-b border-white/10 z-10 bg-transparent">
                      <div>
                        <h3 className="text-3xl md:text-4xl font-bold text-white mb-2">
                          {exp.company}
                        </h3>
                        <p className="text-xl text-blue-300 font-medium flex items-center gap-2">
                          <Briefcase size={18} /> {exp.role}
                        </p>
                      </div>
                      <div className="flex flex-col items-start md:items-end gap-1 text-gray-400 text-sm font-mono w-auto">
                        <span className="flex items-center gap-2">
                          <Calendar size={14} />{" "}
                          <span
                            dangerouslySetInnerHTML={{ __html: exp.date }}
                          />
                        </span>
                        <span className="flex items-center gap-2 w-full">
                          <MapPin size={14} /> {exp.location}
                        </span>
                      </div>
                    </div>
                    <div className="flex-grow overflow-y-auto custom-scrollbar pr-2 relative z-10">
                      <ul className="space-y-4 pb-20">
                        {exp.description.map((point, i) => (
                          <li
                            key={i}
                            className="flex items-start gap-3 text-gray-300 leading-relaxed font-light"
                          >
                            <span className="mt-2 min-w-[6px] min-h-[6px] rounded-full bg-blue-500/80 shadow-[0_0_10px_rgba(59,130,246,0.6)]" />
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="absolute bottom-4 right-6 text-9xl font-bold text-white/5 select-none pointer-events-none font-serif z-0">
                      0{index + 1}
                    </div>
                  </div>
                </div>
              ))}
              <div className="w-[10vw]"></div>
            </div>
          </div>

          {/* 3. PROJECTS CONTENT (NEW SCROLLABLE SECTION) */}
          <div
            ref={projectsWrapperRef}
            className="h-screen overflow-hidden flex flex-col justify-center relative"
          >
            {/* Project Title (Animated) */}
            <h2
              ref={projectsTitleRef}
              className="absolute z-50 text-3xl md:text-4xl text-white opacity-0 drop-shadow-xl shiny-silver whitespace-nowrap"
              style={{
                top: "50%",
                left: "50%",
                transform: "translate(20%, -60%)",
              }}
            >
              <div>Featured</div>
              <div> Projects</div>
            </h2>

            <div
              ref={projectsContainerRef}
              className="h-full flex flex-nowrap items-center pl-[5vw] md:pl-[10vw] pr-[20vw]"
              style={{ width: "fit-content" }}
            >
              {PROJECTS_DATA.map((project, index) => (
                <div
                  key={index}
                  className="relative flex-shrink-0 w-[85vw] md:w-[50vw] h-[60vh] mr-12 md:mr-16"
                >
                  <div className="group w-full h-full bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-10 flex flex-col justify-between shadow-2xl transition-all duration-500 hover:bg-white hover:text-black overflow-visible relative">
                    {/* Left Side: Text Content */}
                    <div className="flex flex-col h-full z-10 relative pointer-events-none group-hover:pointer-events-auto">
                      {/* --- CLICKABLE LINK UPDATED HERE --- */}
                      <div className="flex items-center justify-between mb-2">
                        <a
                          href={project.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex gap-2 items-center cursor-pointer z-50 pointer-events-auto hover:opacity-70 transition-opacity"
                        >
                          <ExternalLink
                            size={20}
                            className="text-blue-400 group-hover:text-blue-600 transition-colors"
                          />
                        </a>
                      </div>
                      {/* ----------------------------------- */}

                      <h3 className="text-3xl md:text-5xl font-bold text-white mb-2 group-hover:text-black transition-colors duration-300 leading-tight">
                        {project.title}
                      </h3>
                      <p className="text-lg text-blue-300 font-medium mb-6 group-hover:text-blue-600 transition-colors duration-300">
                        {project.subtitle}
                      </p>

                      <div className="mt-auto">
                        {/* Rest of the card content... */}
                        <p className="text-gray-300 text-lg leading-relaxed font-light mb-8 group-hover:text-gray-700 transition-colors duration-300 line-clamp-2 md:truncate w-[80%]">
                          {project.description}
                        </p>

                        <div className="flex flex-wrap gap-3">
                          {project.tech.map((TechIcon, i) => (
                            <div
                              key={i}
                              className="p-3 rounded-xl bg-white/10 border border-white/10 group-hover:bg-gray-100 group-hover:border-gray-200 transition-colors duration-300"
                            >
                              <TechIcon
                                size={24}
                                className="text-white group-hover:text-black transition-colors duration-300"
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Right Side: Floating Image Preview (Keep this as is) */}
                    <div className="absolute top-1/2 -translate-y-1/2 -right-[15%] h-[120%] w-auto aspect-[9/16] z-50 pointer-events-none opacity-0 translate-x-10 scale-90 rotate-6 group-hover:opacity-100 group-hover:translate-x-0 group-hover:scale-100 group-hover:rotate-0 transition-all duration-500 ease-out hidden md:block">
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-contain drop-shadow-2xl"
                      />
                    </div>
                  </div>
                </div>
              ))}
              <div className="w-[10vw]"></div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
