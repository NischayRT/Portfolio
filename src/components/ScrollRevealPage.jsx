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

// --- PROJECT IMAGES IMPORTS ---
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

const PROJECTS_DATA = [
  {
    title: "Text Tone Picker",
    subtitle: "Tone and format changer",
    url: "https://text-tone-picker.netlify.app/",
    description:
      "Tone Picker Text Tool is an online app that utilizes the capabilities of Mistral AI to enable users to improve their writings.",
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
    url: "https://weather-now-aganitha.netlify.app/",
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
  // Entry Refs
  const heroWrapperRef = useRef(null); // Ref for the taller container
  const entryRef = useRef(null);
  const titleTopRef = useRef(null);
  const titleBottomRef = useRef(null);
  const profileCardRef = useRef(null);
  const featuredSkillRef = useRef(null);

  // Experience Refs
  const experienceWrapperRef = useRef(null);
  const experienceContainerRef = useRef(null);
  const experienceTitleRef = useRef(null);

  // Project Refs
  const projectsWrapperRef = useRef(null);
  const projectsContainerRef = useRef(null);
  const projectsTitleRef = useRef(null);

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

  // --- 1. HERO / ENTRY ANIMATION ---
  // --- 1. HERO / ENTRY ANIMATION ---
  useLayoutEffect(() => {
    const mm = gsap.matchMedia();

    mm.add("(min-width: 320px)", () => {
      const ctx = gsap.context(() => {
        // Initial States - Titles visible, card hidden
        gsap.set([titleTopRef.current, titleBottomRef.current], {
          opacity: 1,
          y: 0,
        });
        gsap.set(profileCardRef.current, {
          opacity: 0,
          scale: 0.8,
        });

        // Create timeline with scroll trigger
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: heroWrapperRef.current,
            start: "top top",
            end: "80% center",
            scrub: 1.2,
            pin: false,
          },
        });

        // Split animation - titles move apart vertically and fade
        tl.to(
          titleTopRef.current,
          {
            y: -250, // Move up
            opacity: 0,
            duration: 1,
            ease: "power2.in",
          },
          0
        )
          .to(
            titleBottomRef.current,
            {
              y: 250, // Move down
              opacity: 0,
              duration: 1,
              ease: "power2.in",
            },
            0
          )
          // Profile card fades in from center
          .to(
            profileCardRef.current,
            {
              opacity: 1,
              scale: 1,
              duration: 1.5,
              ease: "power2.out",
            },
            0.4
          );
      }, heroWrapperRef);
      return () => ctx.revert();
    });

    return () => mm.revert();
  }, []);

  // --- 2. SKILL ANIMATION ---
  useEffect(() => {
    if (activeSkill && featuredSkillRef.current) {
      gsap.fromTo(
        featuredSkillRef.current,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.3, ease: "power1.out" }
      );
    }
  }, [activeSkill]);

  // --- 3. EXPERIENCE SECTION (HORIZONTAL SCROLL) ---
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const wrapper = experienceWrapperRef.current;
      const container = experienceContainerRef.current;
      const title = experienceTitleRef.current;
      const cards = gsap.utils
        .toArray(container.children)
        .filter((child) => !child.classList.contains("w-[10vw]"));

      function getScrollAmount() {
        return -(container.scrollWidth - window.innerWidth);
      }

      // Initial Title Position (Centered)
      gsap.set(title, {
        position: "absolute",
        top: "50%",
        left: "50%",
        xPercent: -50,
        yPercent: -50,
        scale: 1.5,
        opacity: 1,
        zIndex: 50,
      });

      gsap.set(cards, { opacity: 0, y: 50 });

      const mm = gsap.matchMedia();

      mm.add(
        {
          isMobile: "(max-width: 767px)",
          isDesktop: "(min-width: 768px)",
        },
        (context) => {
          const { isMobile } = context.conditions;

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: wrapper,
              start: "top top",
              end: () =>
                `+=${Math.abs(getScrollAmount()) + window.innerHeight}`,
              pin: true,
              scrub: 1,
              invalidateOnRefresh: true,
            },
          });

          // Title Animation - Adjusted to be 20px higher
          tl.to(title, {
            // Mobile: calc(10% - 20px), Desktop: 2rem (approx 32px, vs previous 3.5rem/56px)
            top: isMobile ? "calc(10% - 20px)" : "2rem",
            left: isMobile ? "50%" : "2rem",
            xPercent: isMobile ? -50 : 0,
            yPercent: 0,
            scale: 1,
            duration: 0.5,
            ease: "power2.inOut",
          })
            .to(
              cards,
              {
                opacity: 1,
                y: 0,
                duration: 0.5,
                stagger: 0.1,
                ease: "power2.out",
              },
              "-=0.25"
            )
            .to(container, {
              x: getScrollAmount,
              duration: 3,
              ease: "none",
            });
        }
      );
    }, experienceWrapperRef);

    return () => ctx.revert();
  }, []);

  // --- 4. PROJECTS SECTION (HORIZONTAL SCROLL) ---
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const wrapper = projectsWrapperRef.current;
      const container = projectsContainerRef.current;
      const title = projectsTitleRef.current;
      const cards = gsap.utils
        .toArray(container.children)
        .filter((child) => !child.classList.contains("w-[10vw]"));

      function getScrollAmount() {
        return -(container.scrollWidth - window.innerWidth);
      }

      gsap.set(title, {
        position: "absolute",
        top: "50%",
        left: "50%",
        xPercent: -50,
        yPercent: -50,
        scale: 1.5,
        opacity: 1,
        zIndex: 50,
      });

      gsap.set(cards, { opacity: 0, y: 50 });

      const mm = gsap.matchMedia();

      mm.add(
        {
          isMobile: "(max-width: 767px)",
          isDesktop: "(min-width: 768px)",
        },
        (context) => {
          const { isMobile } = context.conditions;

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: wrapper,
              start: "top top",
              end: () =>
                `+=${Math.abs(getScrollAmount()) + window.innerHeight}`,
              pin: true,
              scrub: 1,
              invalidateOnRefresh: true,
            },
          });

          // Title Animation - Adjusted to be 20px higher
          tl.to(title, {
            // Mobile: calc(10% - 20px), Desktop: 2rem
            top: isMobile ? "calc(10% - 20px)" : "2rem",
            left: isMobile ? "50%" : "2rem",
            xPercent: isMobile ? -50 : 0,
            yPercent: 0,
            scale: 1,
            duration: 0.5,
            ease: "power2.inOut",
          })
            .to(
              cards,
              {
                opacity: 1,
                y: 0,
                duration: 0.5,
                stagger: 0.1,
                ease: "power2.out",
              },
              "-=0.25"
            )
            .to(container, {
              x: getScrollAmount,
              duration: 3,
              ease: "none",
            });
        }
      );
    }, projectsWrapperRef);

    return () => ctx.revert();
  }, []);

  const handleSkillEnter = useCallback((skill) => setActiveSkill(skill), []);
  const handleSkillLeave = useCallback(() => setActiveSkill(null), []);

  return (
    <div className="relative bg-black min-h-screen selection:bg-blue-500/30">
      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 5px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.02);
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.15);
          border-radius: 10px;
        }
      `}</style>

      {/* ===========================================
        SECTION 1: HERO (STICKY BEHIND CURTAIN) 
        ===========================================
        ADDED: Wrapper with h-[140vh]. 
        This provides a scroll track longer than the screen height.
        The inner content sticks for 100vh, but the extra 40vh 
        ensures the profile card stays visible before Section 2 overlaps.
      */}
      <div ref={heroWrapperRef} className="relative h-[200vh] w-full">
        <div
          ref={entryRef}
          className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden z-0"
        >
          {/* Background Effects */}
          <div className="absolute inset-0 w-full h-full pointer-events-none">
            <div className="blob n-left-vertical" />
            <div className="blob n-right-vertical" />
            <div className="blob n-diagonal-dark" />
            <div className="blob n-ambient" />
            <div className="overlay-blend" />
            <div className="noise-layer opacity-40" />
          </div>

          {/* Content */}
          <div className="relative z-10 w-full h-full flex flex-col items-center justify-center px-4 md:px-16">
            <div
              ref={titleTopRef}
              className="absolute top-[20%] md:top-[25%] text-center"
            >
              <p className="text-transparent bg-clip-text bg-gradient-to-br from-pink-500 via-orange-300 to-orange-600 text-sm font-bold tracking-[0.3em] italic uppercase mb-4 special-heading animate-pulse">
                {greeting}
              </p>
              <h1 className="text-4xl md:text-5xl lg:text-7xl font-sans font-thin leading-tight text-transparent bg-clip-text bg-gradient-to-br from-white via-blue-100 to-blue-300 opacity-90">
                MY NAME IS
              </h1>
            </div>

            <div
              ref={titleBottomRef}
              className="absolute bottom-[40%] md:bottom-[25%] text-center"
            >
              <h1 className="heading text-5xl md:text-7xl lg:text-8xl leading-tight drop-shadow-2xl shiny-silver p-4">
                Nischay Reddy
              </h1>
            </div>

            <div
              ref={profileCardRef}
              className="absolute top-1/2 pb-10 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-7xl px-4 md:px-16"
            >
              <div className="bg-white/5 backdrop-blur-md w-full border border-white/10 rounded-3xl p-6 md:p-8 flex flex-col md:flex-row gap-6 md:gap-8 items-center md:items-start hover:bg-white/10 transition-colors duration-500 shadow-2xl">
                <div className="relative flex-shrink-0">
                  <Image
                    src={profilePic}
                    alt="Nischay Reddy"
                    priority={true}
                    className="Profile rounded-2xl shadow-2xl ring-2 ring-white/20"
                  />
                </div>
                <div className="flex flex-col justify-center w-full">
                  <h3 className="text-xl md:text-2xl font-bold text-white mb-3">
                    Entry Level Software Engineer
                  </h3>
                  <p className="text-gray-300 leading-relaxed text-sm md:text-base mb-6">
                    A detail-oriented computer science undergraduate looking for
                    an entry-level Software Engineer position in a fast-growing
                    company to apply my expertise in software applications,
                    development, design, and contribute to innovative projects
                    that make tangible impacts.
                  </p>
                  <div className="flex flex-wrap gap-3 justify-center md:justify-start">
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
      </div>

      {/* ===========================================
        SECTION 2: CONTENT (SCROLLS OVER HERO) 
        ===========================================
      */}
      <section className="relative z-40 bg-black min-h-screen border-t border-white/10 box-shadow-2xl">
        <div className="sticky top-0 w-full h-screen overflow-hidden pointer-events-none">
          <div className="skill-blob skill-left" />
          <div className="skill-blob skill-right" />
          <div className="tech-grid" />
          <div className="noise-layer opacity-30" />
        </div>
        {/* Content Wrapper */}
        <div className="relative z-10 -mt-[70vh]">
          {/* 1. SKILLS */}
          <div className="min-h-screen flex items-center justify-center px-4">
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

          {/* 2. EXPERIENCE */}
          <div
            ref={experienceWrapperRef}
            className="h-screen overflow-hidden flex flex-col justify-center relative"
          >
            <h2
              ref={experienceTitleRef}
              className="absolute text-3xl md:text-4xl text-white opacity-0 drop-shadow-xl shiny-silver whitespace-nowrap z-50 pointer-events-none"
            >
              <div>My </div>
              <div>Experience</div>
            </h2>
            <div
              ref={experienceContainerRef}
              className="h-full flex flex-nowrap items-center pl-[5vw] md:pl-[10vw] pr-[20vw]"
              style={{ width: "fit-content" }}
            >
              {EXPERIENCE_DATA.map((exp, index) => (
                <div
                  key={index}
                  className="relative flex-shrink-0 w-[90vw] md:w-[60vw] lg:w-[45vw] h-[65vh] mr-8 md:mr-24"
                >
                  <div className="w-full h-full bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 md:p-12 flex flex-col shadow-2xl transition-transform duration-300 hover:scale-[1.02] group overflow-hidden">
                    <div className="flex-shrink-0 flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4 pb-4 border-b border-white/10 z-10 bg-transparent">
                      <div>
                        <h3 className="text-2xl md:text-4xl font-bold text-white mb-2">
                          {exp.company}
                        </h3>
                        <p className="text-lg md:text-xl text-blue-300 font-medium flex items-center gap-2">
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
                      <ul className="space-y-4 pb-12">
                        {exp.description.map((point, i) => (
                          <li
                            key={i}
                            className="flex items-start gap-3 text-gray-300 leading-relaxed font-light text-sm md:text-base"
                          >
                            <span className="mt-2 min-w-[6px] min-h-[6px] rounded-full bg-blue-500/80 shadow-[0_0_10px_rgba(59,130,246,0.6)]" />
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="absolute bottom-4 right-6 text-8xl md:text-9xl font-bold text-white/5 select-none pointer-events-none font-serif z-0">
                      0{index + 1}
                    </div>
                  </div>
                </div>
              ))}
              <div className="w-[10vw]"></div>
            </div>
          </div>

          {/* 3. PROJECTS */}
          <div
            ref={projectsWrapperRef}
            className="h-screen overflow-hidden flex flex-col justify-center relative"
          >
            <h2
              ref={projectsTitleRef}
              className="absolute text-3xl md:text-4xl text-white opacity-0 drop-shadow-xl shiny-silver whitespace-nowrap z-50 pointer-events-none"
            >
              <div>Featured</div> <div>Projects</div>
            </h2>
            <div
              ref={projectsContainerRef}
              className="h-full flex flex-nowrap items-center pl-[5vw] md:pl-[10vw] pr-[20vw]"
              style={{ width: "fit-content" }}
            >
              {PROJECTS_DATA.map((project, index) => (
                <div
                  key={index}
                  className="relative flex-shrink-0 w-[90vw] md:w-[50vw] h-[60vh] mr-8 md:mr-16"
                >
                  <div className="group w-full h-full bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 md:p-8 md:pt-4 flex flex-col justify-between shadow-2xl transition-all duration-500 hover:bg-white hover:text-black overflow-hidden relative">
                    <div className="flex flex-col h-full z-10 relative pointer-events-none group-hover:pointer-events-auto">
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
                      <h3 className="text-2xl md:text-5xl font-bold text-white mb-2 group-hover:text-black transition-colors duration-300 leading-tight">
                        {project.title}
                      </h3>
                      <p className="text-base md:text-lg text-blue-300 font-medium mb-4 md:mb-6 group-hover:text-gray-600 transition-colors duration-300">
                        {project.subtitle}
                      </p>
                      <div className="mt-auto">
                        <p className="text-gray-300 text-sm md:text-lg leading-relaxed font-light mb-6 md:mb-8 group-hover:text-gray-700 transition-colors duration-300 line-clamp-3 md:line-clamp-2 w-[100%]">
                          {project.description}
                        </p>
                        <div className="flex flex-wrap gap-2 md:gap-3">
                          {project.tech.map((TechIcon, i) => (
                            <div
                              key={i}
                              className="p-2 md:p-3 rounded-xl bg-white/10 border border-white/10 group-hover:bg-gray-100 group-hover:border-gray-200 transition-colors duration-300"
                            >
                              <TechIcon
                                size={20}
                                className="text-white group-hover:text-black transition-colors duration-300"
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                    {/* Image Preview (Desktop Only) */}
                    <div className="absolute top-1/2 -translate-y-1/2 -right-[15%] h-[120%] w-auto aspect-9/16 z-50 pointer-events-none opacity-0 translate-x-10 scale-90 rotate-6 group-hover:opacity-100 group-hover:translate-x-0 group-hover:scale-100 group-hover:rotate-0 transition-all duration-500 ease-out hidden md:block">
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
