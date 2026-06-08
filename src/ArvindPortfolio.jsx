import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import arvinetimage from './images/Arvinet.jpg';
import teamdnaimg from './images/teamDNA.jpg';
import marketvalueimg from './images/Football.jpg';
gsap.registerPlugin(ScrollTrigger);

const ArvindPortfolio = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [scrollY, setScrollY] = useState(0);
  const [showContactForm, setShowContactForm] = useState(false);
  const navRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="bg-[#0a0a0a] text-[#f5f5f5]">
      {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}
      {!isLoading && (
        <>
          <Navbar scrollY={scrollY} navRef={navRef} onSayHiClick={() => setShowContactForm(true)} />
          <Hero onContactClick={() => setShowContactForm(true)} />
          <SelectedWorks />
          <About onContactClick={() => setShowContactForm(true)} />
          <Resume />
          <Contact onContactClick={() => setShowContactForm(true)} />
          <ContactFormModal isOpen={showContactForm} onClose={() => setShowContactForm(false)} />
        </>
      )}
    </div>
  );
};

// LOADING SCREEN
const LoadingScreen = ({ onComplete }) => {
  const [count, setCount] = useState(0);
  const words = ['Design', 'Create', 'Innovate'];
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    if (count >= 100) {
      setTimeout(onComplete, 400);
      return;
    }
    const interval = setInterval(() => {
      setCount(c => Math.min(c + Math.random() * 15, 100));
    }, 100);
    return () => clearInterval(interval);
  }, [count, onComplete]);

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex(i => (i + 1) % words.length);
    }, 900);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 z-[9999] bg-[#0a0a0a] flex flex-col items-center justify-center">
      <motion.div
        className="absolute top-8 left-8 text-xs text-[#888] uppercase tracking-[0.3em]"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        Portfolio
      </motion.div>

      <AnimatePresence mode="wait">
        <motion.div
          key={wordIndex}
          className="text-5xl md:text-7xl lg:text-8xl font-serif italic text-[#f5f5f5]/80 text-center"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -20, opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          {words[wordIndex]}
        </motion.div>
      </AnimatePresence>

      <motion.div
        className="absolute bottom-8 right-8 text-6xl md:text-8xl lg:text-9xl font-serif text-[#f5f5f5] tabular-nums"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        {String(Math.floor(count)).padStart(3, '0')}
      </motion.div>

      <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#1a1a1a]">
        <motion.div
          className="h-full bg-gradient-to-r from-[#89AACC] to-[#4E85BF]"
          style={{ scaleX: count / 100, transformOrigin: 'left' }}
          animate={{ boxShadow: `0 0 8px rgba(78, 133, 191, 0.35)` }}
        />
      </div>
    </div>
  );
};

// NAVBAR
const Navbar = ({ scrollY, navRef, onSayHiClick }) => {
  return (
    <motion.nav
      ref={navRef}
      className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-4 md:pt-6 px-4"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.8 }}
    >
      <div
        className={`inline-flex items-center rounded-full backdrop-blur-md border border-white/10 bg-[#1a1a1a] px-2 py-2 transition-all ${
          scrollY > 100 ? 'shadow-lg shadow-black/20' : ''
        }`}
      >
        {/* Logo */}
        <motion.div
          className="relative w-9 h-9 rounded-full border-2 border-transparent bg-gradient-to-r from-[#89AACC] to-[#4E85BF] p-[2px] flex items-center justify-center cursor-pointer hover:scale-110 transition-transform"
          whileHover={{ scale: 1.1 }}
        >
          <div className="w-full h-full rounded-full bg-[#0a0a0a] flex items-center justify-center">
            <span className="font-serif italic text-xs text-[#f5f5f5]">AS</span>
          </div>
        </motion.div>

        <div className="w-px h-5 bg-[#333] mx-1 hidden sm:block" />

        {/* Nav Links */}
        {['Home', 'Work', 'Resume'].map((link) => (
          <motion.a
            key={link}
            href={`#${link.toLowerCase()}`}
            className="text-xs sm:text-sm rounded-full px-3 sm:px-4 py-1.5 sm:py-2 mx-1 text-[#aaa] hover:text-[#f5f5f5] hover:bg-[#333] transition-all"
            whileHover={{ scale: 1.05 }}
          >
            {link}
          </motion.a>
        ))}

        <div className="w-px h-5 bg-[#333] mx-1 hidden sm:block" />

        {/* CTA Button - Now opens contact form */}
        <motion.button
          onClick={onSayHiClick}
          className="relative text-xs sm:text-sm px-4 py-1.5 sm:py-2 mx-1 rounded-full overflow-hidden group cursor-pointer"
          whileHover={{ scale: 1.05 }}
        >
          <motion.span
            className="absolute inset-[-2px] bg-gradient-to-r from-[#89AACC] to-[#4E85BF] rounded-full opacity-0 group-hover:opacity-100 blur-sm transition-opacity"
            initial={{ opacity: 0 }}
          />
          <span className="relative bg-[#1a1a1a] rounded-full px-3 py-1.5 block backdrop-blur-md">
            Say hi ↗
          </span>
        </motion.button>
      </div>
    </motion.nav>
  );
};

// HERO SECTION
const Hero = ({ onContactClick }) => {
  const roles = ['Researcher', 'Developer', 'Builder', 'Innovator'];
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex(i => (i + 1) % roles.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    gsap.timeline()
      .to('.hero-name', { opacity: 1, y: 0, duration: 1.2, ease: 'power3.out' }, 0.1)
      .to('.hero-blur', { opacity: 1, filter: 'blur(0px)', y: 0, duration: 1, stagger: 0.1 }, 0.3);
  }, []);

  return (
<section
  id="home"
  className="relative z-10 min-h-screen flex flex-col items-center justify-center pt-24 pb-12 px-4 overflow-hidden"
>      {/* Video Background */}
      <div className="absolute inset-0 -z-0">
        <video
          className="w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          src="https://videos.pexels.com/video-files/34255676/14515442_1920_1080_24fps.mp4"
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-[#0a0a0a] to-transparent" />
      </div>

      {/* Content */}
      <motion.div
        className="hero-blur relative z-10 text-center opacity-0"
        style={{ filter: 'blur(10px)', y: 20 }}
      >
      </motion.div>

      <motion.h1
        className="hero-name relative z-10 text-6xl md:text-8xl lg:text-9xl font-serif italic leading-[0.9] tracking-tight text-[#f5f5f5] mb-6 opacity-0"
        style={{ y: 50 }}
      >
        Arvind Singh
      </motion.h1>

      <motion.div className="relative z-10 text-lg md:text-2xl text-[#f5f5f5] mb-8 h-12 flex items-center justify-center">
        A{' '}
        <AnimatePresence mode="wait">
          <motion.span
            key={roleIndex}
            className="inline-block font-serif italic text-[#89AACC] mx-2"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.4 }}
          >
            {roles[roleIndex]}
          </motion.span>
        </AnimatePresence>
        {' '} in AI & ML
      </motion.div>

      <motion.p
        className="hero-blur relative z-10 text-sm md:text-base text-[#aaa] max-w-md mb-12 opacity-0"
        style={{ filter: 'blur(10px)', y: 20 }}
      >
        Hi! I am Arvind Singh, and I find myself in creating Machine Learning and Deep Learning model creation.
       </motion.p>

      {/* CTA Buttons */}
      <motion.div className="relative z-10 flex gap-4 flex-wrap justify-center">
        <motion.a
          href="#work"
          className="bg-[#f5f5f5] text-[#0a0a0a] rounded-full px-7 py-3.5 text-sm font-medium hover:bg-[#0a0a0a] hover:text-[#f5f5f5] hover:border-2 hover:border-[#4E85BF] transition-all"
          whileHover={{ scale: 1.05 }}
        >
          See My Work
        </motion.a>
        <motion.button
          onClick={onContactClick}
          className="border-2 border-[#333] bg-[#0a0a0a] text-[#f5f5f5] rounded-full px-7 py-3.5 text-sm hover:border-[#4E85BF] transition-all cursor-pointer"
          whileHover={{ scale: 1.05 }}
        >
          Reach out... ↗
        </motion.button>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-xs text-[#888] uppercase tracking-[0.2em]"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <span>Scroll</span>
        <div className="w-px h-10 bg-[#333]" />
      </motion.div>
    </section>
  );
};

// SELECTED WORKS
const SelectedWorks = () => {
  const projects = [
    {
      id: 1,
      title: 'ArviNet',
      description: 'Custom ResNet-inspired CNN with 11M parameters achieving 86% accuracy on CIFAR-10. Advanced computer vision backbone with transfer learning capabilities.',
      fullDescription: 'Built a production-grade convolutional neural network inspired by ResNet architecture, featuring residual connections for improved gradient flow. Implemented custom data augmentation pipelines, learning rate scheduling, and regularization techniques. Achieved strong generalization across multiple datasets with extensive ablation studies documenting architectural choices.',
      tech: ['PyTorch', 'CNN', 'Computer Vision', 'CIFAR-100', 'CIFAR-10'],
      link: 'https://github.com/arvindmatharoo/ArviNET',
      aspect: 'md:col-span-7',
      image: arvinetimage,
      category: 'Deep Learning',
      stats: ['11M', 'Parameters', '86%', 'Accuracy'],
    },
    {
      id: 2,
      title: 'TACTIX AI',
      description: 'Multi-model ensemble for football tactical intelligence. Real-time match prediction with 90%+ accuracy via Streamlit & Android app.',
      fullDescription: 'Engineered multi-model ensemble leveraging tactical features from European Soccer Database. Built 7 analytical modules including match prediction, tactical formation analysis, head-to-head team comparison. Deployed via Docker & Streamlit Community Cloud for 24/7 inference.',
      tech: ['Streamlit', 'TensorFlow', 'Docker', 'XGBoost'],
      link: 'https://tactix-ai.streamlit.app/',
      aspect: 'md:col-span-5',
      image: 'tactix_ai.jpg',
      category: 'Full Stack ML',
      stats: ['90%', 'Accuracy', '7', 'Modules'],
    },
    {
      id: 3,
      title: 'Customer Segmentation',
      description: 'RFM clustering platform segmenting 4,339+ customers into behavioral groups. FastAPI REST API with real-time segmentation.',
      fullDescription: 'Conducted exploratory data analysis identifying behavioral patterns across recency, frequency, and monetary dimensions. Applied StandardScaler normalization and determined optimal cluster count via elbow method. Engineered Dockerized production pipeline with Joblib serialization.',
      tech: ['Python', 'Scikit-learn', 'FastAPI', 'KMeans', 'Docker', 'Pandas'],
      link: 'https://github.com/arvindmatharoo/Customer-Segmentation',
      aspect: 'md:col-span-5',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80',
      category: 'Data Science',
      stats: ['4,339', 'Customers', '3', 'Clusters'],
    },
    {
      id: 4,
      title: 'TeamDNA',
      description: 'StatsBomb football analytics with 50K+ match events. Interactive Streamlit app with passing networks, heatmaps, xG analysis.',
      fullDescription: 'Processed 50,000+ match events from StatsBomb Open Data. Implemented sophisticated network analysis for passing patterns with node centrality measures. Created dynamic heatmaps showing player positioning density. Deployed on Streamlit Cloud for remote access.',
      tech: ['Python', 'Streamlit', 'Plotly', 'Matplotlib', 'NetworkX', 'Pandas'],
      link: 'https://github.com/arvindmatharoo/TeamDNA',
      aspect: 'md:col-span-7',
      image: teamdnaimg,
      category: 'Data Visualization',
      stats: ['50K+', 'Events', '7', 'Analytics'],
    },
    {
      id: 5,
      title: 'Football Market Value Predictor',
      description: 'Ensemble model predicting transfer values for 2,029 players. 90.4% accuracy with FastAPI deployment for scouting decisions.',
      fullDescription: 'Comprehensive EDA across 2,029+ professional players identifying critical market value drivers. Applied quantile-based binning creating balanced target distribution. Implemented 5-fold cross-validation with hyperparameter tuning. Built FastAPI endpoint returning market classifications.',
      tech: ['Python', 'XGBoost', 'Scikit-learn', 'FastAPI', 'Feature Engineering', 'EDA'],
      link: 'https://github.com/arvindmatharoo/Football-Player-Value-Predictor',
      aspect: 'md:col-span-12',
      image : marketvalueimg, 
      category: 'Predictive Modeling',
      stats: ['2,029', 'Players', '90.4%', 'Accuracy'],
    },
  ];

  return (
    <section id="work" className="bg-[#0a0a0a] py-16 md:py-24 px-4 md:px-10">
      <div className="max-w-[1400px] mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
          viewport={{ once: true, margin: '-100px' }}
          className="mb-20"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-px bg-[#4E85BF]/50" />
            <p className="text-xs text-[#888] uppercase tracking-[0.3em] font-semibold">Selected Works</p>
          </div>
          <h2 className="text-5xl md:text-7xl font-serif italic mb-6 leading-tight">
            Featured <span className="text-[#89AACC]">Projects</span>
          </h2>
          <p className="text-[#aaa] max-w-2xl text-lg">
            A selection of AI/ML projects spanning deep learning, full-stack development, and intelligent systems. Each project demonstrates technical depth, production-ready code, and real-world impact.
          </p>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8">
          {projects.map((project, idx) => (
            <motion.a
              key={project.id}
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className={`${project.aspect} group relative bg-[#1a1a1a] border border-[#333] rounded-3xl overflow-hidden h-[380px] md:h-[480px] cursor-pointer hover:border-[#4E85BF] hover:shadow-[0_0_40px_rgba(78,133,191,0.2)] transition-all duration-500`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.12 }}
              viewport={{ once: true, margin: '-50px' }}
            >
              {/* Background Image with Parallax Effect */}
              <motion.img
                src={project.image}
                alt={project.title}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              
              {/* Gradient Overlay - Dark at bottom, lighter at top */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/50 to-black/95 group-hover:via-black/60 transition-all duration-500" />

              {/* Top Section - Category & Stats */}
              <div className="absolute top-6 right-6 left-6 z-20 flex justify-between items-start">
                <div className="inline-block px-3 py-1.5 rounded-full bg-[#4E85BF]/20 border border-[#4E85BF]/60 backdrop-blur-md">
                  <span className="text-xs font-bold text-[#89AACC] uppercase tracking-wider">{project.category}</span>
                </div>
                <div className="hidden md:grid grid-cols-2 gap-4 text-right">
                  {project.stats && project.stats.map((stat, i) => (
                    i % 2 === 0 && (
                      <div key={i} className="text-right">
                        <div className="text-lg font-bold text-[#89AACC]">{stat}</div>
                        <div className="text-xs text-[#aaa]">{project.stats[i + 1]}</div>
                      </div>
                    )
                  ))}
                </div>
              </div>

              {/* Bottom Section - Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 z-20 space-y-4">
                <div>
                  <h3 className="text-3xl md:text-4xl font-serif italic text-[#f5f5f5] mb-3 leading-tight group-hover:text-[#89AACC] transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-sm md:text-base text-[#ddd] leading-relaxed line-clamp-2 group-hover:line-clamp-none transition-all">
                    {project.description}
                  </p>
                </div>
                
                {/* Tech Tags */}
                <div className="flex flex-wrap gap-2 pt-2">
                  {project.tech.slice(0, 3).map((t) => (
                    <span key={t} className="text-xs px-2.5 py-1.5 rounded-full bg-[#0a0a0a]/70 border border-[#4E85BF]/50 text-[#89AACC] backdrop-blur-md font-medium">
                      {t}
                    </span>
                  ))}
                  {project.tech.length > 3 && (
                    <span className="text-xs px-2.5 py-1.5 rounded-full bg-[#0a0a0a]/70 border border-[#4E85BF]/50 text-[#89AACC] backdrop-blur-md font-medium">
                      +{project.tech.length - 3}
                    </span>
                  )}
                </div>
              </div>

              {/* Hover CTA */}
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center z-30">
                <motion.div
                  className="px-7 py-3.5 rounded-full border-2 border-[#89AACC] bg-[#0a0a0a]/95 text-[#89AACC] font-semibold backdrop-blur-lg"
                  initial={{ scale: 0.8, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.1 }}
                >
                  View Full Project ↗
                </motion.div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};

// ABOUT SECTION
const About = ({ onContactClick }) => {
  const skills = {
    'Programming': ['Python', 'C', 'C++', 'SQL'],
    'ML & DL': ['Classification', 'Regression', 'CNN', 'Feature Engineering', 'Hyperparameter Tuning'],
    'Tools & Frameworks': ['scikit-learn', 'TensorFlow', 'Keras', 'PyTorch', 'pandas', 'NumPy', 'Jupyter'],
    'Full Stack': ['FastAPI', 'Docker', 'Streamlit', 'GitHub', 'Linux', 'HTML/CSS'],
  };

  const certifications = [
    { name: 'Machine Learning', issuer: 'Kaggle', year: '2024' },
    { name: 'Neural Networks and Deep Learning', issuer: 'Coursera', year: '2024' },
    { name: 'Improving Deep Neural Networks', issuer: 'Coursera', year: '2024' },
  ];

  return (
    <section className="bg-[#0a0a0a] py-16 md:py-24 px-4 md:px-10">
      <div className="max-w-[1200px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true, margin: '-100px' }}
        >
          <h2 className="text-4xl md:text-5xl font-serif italic mb-8">About Me</h2>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            {/* Left Column - Professional Info */}
            <div className="lg:col-span-2 space-y-8 text-[#aaa] leading-relaxed">
              <div>
                <h3 className="text-lg font-semibold text-[#f5f5f5] mb-3">Professional Profile</h3>
                <p>
                  I'm a 3rd-year B.Tech Computer Science student at Punjabi University, Patiala (CGPA: 8.3+), with a deep passion for Machine Learning, Deep Learning, and Data Science. My expertise spans exploratory data analysis, supervised learning, feature engineering, and model evaluation using Python and scikit-learn.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-[#f5f5f5] mb-3">Current Work</h3>
                <p>
                  As a University Resource Manager at <strong>Nishchit.in</strong> (Jun 2025–Present), I initiate brainstorming sessions and lead cross-functional student teams, driving 40% increase in idea generation. I'm actively developing production-grade ML projects including ArviNet (CNN architecture), TACTIX AI (football tactical intelligence), and customer segmentation systems using ensemble techniques and FastAPI.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-[#f5f5f5] mb-3">GATE 2027 & Masters Goals</h3>
                <p>
                  Preparing intensively for <strong>GATE CSE 2027</strong> (target: 80+ score) with a structured phased plan balancing college exams, projects, and targeted preparation using resources like Abdul Bari DSA lectures, Gate Smashers, and PYQs. My ultimate goal is pursuing an <strong>MS in Computer Science</strong> at a top institution, with strong interest in both research and industry roles in AI/ML.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-[#f5f5f5] mb-3">Academic Background</h3>
                <ul className="space-y-2 text-sm">
                  <li><strong>B.Tech CSE</strong> — Punjabi University Patiala (2023–Present) | CGPA: 7.9+</li>
                  <li><strong>Class XII</strong> — BCM School, Ludhiana (CBSE) | 89% (Excellence in PCM)</li>
                  <li><strong>Class X</strong> — BCM School, Ludhiana (CBSE) | 95% (Academic Distinction)</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-[#f5f5f5] mb-3">Beyond Coding</h3>
                <p>
                  Passionate about football—both playing regularly and analyzing the sport through data. Gaming enthusiast with strong fundamentals in DSA, system design, and competitive problem-solving. Committed to continuous learning and building impactful, production-grade solutions.
                </p>
              </div>
            </div>

            {/* Right Column - Resume & Skills */}
            <div className="lg:col-span-1 space-y-6">
              {/* Resume Download Card */}
              <div className="p-6 bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border border-[#4E85BF]/30 rounded-2xl sticky top-24">
                <h3 className="text-[#89AACC] font-serif italic text-lg mb-4">Resume</h3>
                <p className="text-sm text-[#999] mb-4">Download my full resume with detailed project descriptions and experience.</p>
                <motion.a
                  href="https://drive.google.com/uc?export=download&id=1aOAytnJor1aN5wBEwO7j2UxT8pFekkX7"
                  download="Arvind_Singh_Resume.pdf"
                  className="w-full px-4 py-3 rounded-full bg-gradient-to-r from-[#89AACC] to-[#4E85BF] text-[#0a0a0a] font-semibold hover:shadow-lg hover:shadow-[#4E85BF]/30 transition-all inline-block text-center"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  📄 Download Resume
                </motion.a>
                <p className="text-xs text-[#666] mt-3 text-center">
                  PDF • ~200 KB • Updated May 2025
                </p>
              </div>

              {/* Certifications Card */}
              <div className="p-6 bg-[#1a1a1a] border border-[#333] rounded-2xl">
                <h3 className="text-[#89AACC] font-semibold mb-4 text-sm uppercase tracking-wide">Certifications</h3>
                <div className="space-y-3">
                  {certifications.map((cert, idx) => (
                    <div key={idx} className="pb-3 border-b border-[#333] last:border-b-0">
                      <p className="text-sm font-medium text-[#f5f5f5]">{cert.name}</p>
                      <p className="text-xs text-[#666]">{cert.issuer} • {cert.year}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Languages Card */}
              <div className="p-6 bg-[#1a1a1a] border border-[#333] rounded-2xl">
                <h3 className="text-[#89AACC] font-semibold mb-4 text-sm uppercase tracking-wide">Languages</h3>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-[#aaa]">English</span>
                    <span className="text-xs text-[#666]">Fluent</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-[#aaa]">Hindi</span>
                    <span className="text-xs text-[#666]">Native</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-[#aaa]">Punjabi</span>
                    <span className="text-xs text-[#666]">Native</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Skills Grid */}
          <div className="mt-12 pt-12 border-t border-[#333]">
            <h3 className="text-2xl font-serif italic mb-6 text-[#f5f5f5]">Technical Skills</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(skills).map(([category, items]) => (
                <motion.div
                  key={category}
                  className="p-5 bg-[#1a1a1a] rounded-xl border border-[#333] hover:border-[#4E85BF]/50 transition-all"
                  whileHover={{ scale: 1.02 }}
                >
                  <h4 className="font-semibold text-[#89AACC] mb-3 text-sm uppercase tracking-wide">{category}</h4>
                  <p className="text-sm text-[#aaa] leading-relaxed">{items.join(', ')}</p>
                </motion.div>
              ))}
            </div>
          </div>

          <motion.button
            onClick={onContactClick}
            className="inline-block mt-12 px-6 py-3 rounded-full border-2 border-[#4E85BF] text-[#4E85BF] hover:bg-[#4E85BF] hover:text-[#0a0a0a] transition-all font-medium cursor-pointer"
            whileHover={{ scale: 1.05 }}
          >
            Let's Build Something Together
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

// RESUME SECTION
const Resume = () => {
  return (
    <section id="resume" className="bg-[#0a0a0a] py-16 md:py-24 px-4 md:px-10 border-t border-[#222]">
      <div className="max-w-[1000px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true, margin: '-100px' }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-serif italic mb-4">Resume & Experience</h2>
          <p className="text-[#aaa] text-lg mb-8">
            Download my complete resume or explore my detailed professional background below.
          </p>
          
          {/* Resume Download Buttons */}
          <div className="flex gap-4 justify-center flex-wrap mb-12">
            <motion.a
              href="https://drive.google.com/uc?export=download&id=1aOAytnJor1aN5wBEwO7j2UxT8pFekkX7"
              download="Arvind_Singh_Resume.pdf"
              className="px-6 py-3 rounded-full bg-gradient-to-r from-[#89AACC] to-[#4E85BF] text-[#0a0a0a] font-semibold hover:shadow-lg transition-all"
              whileHover={{ scale: 1.05 }}
            >
              📄 Download PDF
            </motion.a>
            <motion.a
              href="https://drive.google.com/file/d/1aOAytnJor1aN5wBEwO7j2UxT8pFekkX7/view"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-full border-2 border-[#4E85BF] text-[#4E85BF] hover:bg-[#4E85BF] hover:text-[#0a0a0a] transition-all font-semibold"
              whileHover={{ scale: 1.05 }}
            >
              👁️ View Online
            </motion.a>
          </div>
        </motion.div>

        {/* Experience & Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Experience */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="p-6 md:p-8 bg-[#1a1a1a] border border-[#333] rounded-2xl"
          >
            <h3 className="text-2xl font-serif italic text-[#89AACC] mb-6">Experience</h3>
            <div className="space-y-6">
              <div className="border-l-2 border-[#4E85BF] pl-4">
                <h4 className="text-lg font-semibold text-[#f5f5f5]">University Resource Manager</h4>
                <p className="text-sm text-[#aaa] mb-2">Nishchit.in • Jun 2025 – Present</p>
                <p className="text-[#ddd]">Led brainstorming sessions, increased idea generation by 40%, driving two successful initiatives with cross-functional teams.</p>
              </div>
            </div>
          </motion.div>

          {/* Education */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="p-6 md:p-8 bg-[#1a1a1a] border border-[#333] rounded-2xl"
          >
            <h3 className="text-2xl font-serif italic text-[#89AACC] mb-6">Education</h3>
            <div className="space-y-6">
              <div className="border-l-2 border-[#4E85BF] pl-4">
                <h4 className="text-lg font-semibold text-[#f5f5f5]">B.Tech Computer Science</h4>
                <p className="text-sm text-[#aaa] mb-2">Punjabi University Patiala • 2023 – Present</p>
                <p className="text-[#ddd]"><strong>CGPA:</strong> 7.9+</p>
              </div>
              <div className="border-l-2 border-[#4E85BF] pl-4">
                <h4 className="text-lg font-semibold text-[#f5f5f5]">Class XII (PCM)</h4>
                <p className="text-sm text-[#aaa] mb-2">BCM School, Ludhiana (CBSE) • 2008–2023</p>
                <p className="text-[#ddd]"><strong>Score:</strong> 89% • Excellence in PCM</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Skills Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="p-6 md:p-8 bg-[#1a1a1a] border border-[#333] rounded-2xl"
        >
          <h3 className="text-2xl font-serif italic text-[#89AACC] mb-6">Key Skills</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { label: 'Programming', items: 'Python, C, C++, SQL' },
              { label: 'ML & DL', items: 'CNN, Classification, Regression, Feature Engineering' },
              { label: 'Frameworks', items: 'PyTorch, TensorFlow, scikit-learn, Keras' },
              { label: 'Tools', items: 'Streamlit, FastAPI, Docker, Git' },
              { label: 'Data Science', items: 'pandas, NumPy, Matplotlib, Seaborn, Plotly' },
              { label: 'Deployment', items: 'Docker, Streamlit Cloud, REST APIs' },
            ].map((skill, idx) => (
              <div key={idx} className="p-4 bg-[#0a0a0a] rounded-lg border border-[#333]">
                <h4 className="text-[#89AACC] font-semibold mb-2">{skill.label}</h4>
                <p className="text-sm text-[#aaa]">{skill.items}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const Contact = ({ onContactClick }) => {
  const socials = [
    { name: 'GitHub', url: 'https://github.com/arvindmatharoo', icon: '→' },
    { name: 'LinkedIn', url: 'https://linkedin.com/in/arvindmatharoo/', icon: '→' },
    { name: 'Twitter', url: 'https://x.com/arvindmatharoo', icon: '→' },
    { name: 'Instagram', url: 'https://instagram.com/arvindmatharoo', icon: '→' },
  ];

  return (
    <section className="bg-[#0a0a0a] py-20 md:py-28 px-4 md:px-10 border-t border-[#222]">
      <div className="max-w-[900px] mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-serif italic mb-6">Let's Connect</h2>
          <p className="text-[#aaa] mb-12 text-lg">
            Open for internships, research collaborations, and full-time AI/ML roles. Let's build intelligent solutions together.
          </p>

          {/* Primary CTA */}
          <motion.button
            onClick={onContactClick}
            className="inline-block px-8 py-4 rounded-full bg-gradient-to-r from-[#89AACC] to-[#4E85BF] text-[#0a0a0a] font-semibold hover:shadow-lg hover:shadow-[#4E85BF]/30 transition-all mb-8 cursor-pointer"
            whileHover={{ scale: 1.05 }}
          >
            ✉️ Email: arvindmatharoo95@gmail.com
          </motion.button>

          {/* Resume Download Button */}
          <motion.div
            className="mb-12"
            whileHover={{ scale: 1.05 }}
          >
            <a
              href="https://drive.google.com/uc?export=download&id=1aOAytnJor1aN5wBEwO7j2UxT8pFekkX7"
              download="Arvind_Singh_Resume.pdf"
              className="inline-block px-6 py-3 rounded-full border-2 border-[#4E85BF] text-[#4E85BF] hover:bg-[#4E85BF] hover:text-[#0a0a0a] transition-all font-medium"
            >
              📄 Download Resume
            </a>
          </motion.div>

          {/* Social Links */}
          <div className="flex justify-center gap-4 mb-12 flex-wrap">
            {socials.map((social) => (
              <motion.a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-full border border-[#333] text-[#aaa] hover:border-[#4E85BF] hover:text-[#4E85BF] transition-all"
                whileHover={{ scale: 1.05 }}
              >
                {social.name} {social.icon}
              </motion.a>
            ))}
          </div>

          {/* Status */}
          <div className="flex items-center justify-center gap-2 text-sm text-[#888] mb-8">
            <div className="w-2 h-2 rounded-full bg-[#4E85BF] animate-pulse" />
            Available for internships, research roles & full-time positions
          </div>

          {/* Footer */}
          <div className="mt-16 pt-8 border-t border-[#222] text-xs text-[#666] space-y-2">
            <p>© 2026 Arvind Singh. Built with React, Tailwind, GSAP & Framer Motion.</p>
            <p>Punjabi University, Patiala | Ludhiana, Punjab, India</p>
            <p>📧 arvindmatharoo95@gmail.com | 📱 +91 97794 24647</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// CONTACT FORM MODAL
const ContactFormModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Create mailto link with form data
    const mailtoLink = `mailto:arvindmatharoo95@gmail.com?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    )}`;

    window.location.href = mailtoLink;

    // Reset form after a delay
    setTimeout(() => {
      setFormData({ name: '', email: '', subject: '', message: '' });
      setIsSubmitting(false);
      onClose();
    }, 500);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 20, stiffness: 300 }}
          >
            <motion.div
              className="bg-[#1a1a1a] border border-[#333] rounded-3xl p-8 md:p-10 max-w-lg w-full shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-serif italic text-[#f5f5f5]">Say Hi!</h2>
                <button
                  onClick={onClose}
                  className="text-[#888] hover:text-[#f5f5f5] text-2xl transition-colors"
                >
                  ✕
                </button>
              </div>

              <p className="text-[#aaa] mb-8">Fill in your details and let's connect!</p>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Name */}
                <div>
                  <label className="block text-sm text-[#aaa] mb-2">Your Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="John Doe"
                    className="w-full px-4 py-3 bg-[#0a0a0a] border border-[#333] rounded-lg text-[#f5f5f5] placeholder-[#666] focus:border-[#4E85BF] focus:outline-none transition-colors"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm text-[#aaa] mb-2">Your Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="john@example.com"
                    className="w-full px-4 py-3 bg-[#0a0a0a] border border-[#333] rounded-lg text-[#f5f5f5] placeholder-[#666] focus:border-[#4E85BF] focus:outline-none transition-colors"
                  />
                </div>

                {/* Subject */}
                <div>
                  <label className="block text-sm text-[#aaa] mb-2">Subject</label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    placeholder="e.g., Project Collaboration"
                    className="w-full px-4 py-3 bg-[#0a0a0a] border border-[#333] rounded-lg text-[#f5f5f5] placeholder-[#666] focus:border-[#4E85BF] focus:outline-none transition-colors"
                  />
                </div>

                {/* Message */}
                <div>
                  <label className="block text-sm text-[#aaa] mb-2">Message</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    placeholder="Tell me about your idea or collaboration proposal..."
                    rows="4"
                    className="w-full px-4 py-3 bg-[#0a0a0a] border border-[#333] rounded-lg text-[#f5f5f5] placeholder-[#666] focus:border-[#4E85BF] focus:outline-none transition-colors resize-none"
                  />
                </div>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 rounded-full bg-gradient-to-r from-[#89AACC] to-[#4E85BF] text-[#0a0a0a] font-semibold hover:shadow-lg hover:shadow-[#4E85BF]/30 transition-all disabled:opacity-70"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {isSubmitting ? 'Sending...' : 'Hi! 👋'}
                </motion.button>

                {/* Close Button */}
                <button
                  type="button"
                  onClick={onClose}
                  className="w-full py-3 rounded-full border-2 border-[#333] text-[#aaa] hover:text-[#f5f5f5] hover:border-[#4E85BF] font-semibold transition-all"
                >
                  Close
                </button>
              </form>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ArvindPortfolio;
