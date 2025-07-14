import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TextPlugin } from 'gsap/TextPlugin';
import { Download, Github, Linkedin, Mail, ChevronDown, ArrowRight } from 'lucide-react';

gsap.registerPlugin(TextPlugin, ScrollTrigger);

const Hero: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const typewriterRef = useRef<HTMLSpanElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const sections = sectionsRef.current;
    const container = containerRef.current;

    if (!container || sections.length === 0) return;

    // Set up horizontal scrolling
    const totalWidth = sections.length * window.innerWidth;
    
    gsap.set(container, {
      width: totalWidth,
      height: '100vh',
      display: 'flex'
    });

    sections.forEach((section, index) => {
      gsap.set(section, {
        width: '100vw',
        height: '100vh',
        position: 'relative'
      });
    });

    // Create horizontal scroll animation
    const horizontalScroll = gsap.to(sections, {
      xPercent: -100 * (sections.length - 1),
      ease: 'none',
      scrollTrigger: {
        trigger: container,
        pin: true,
        scrub: 1,
        snap: 1 / (sections.length - 1),
        end: () => `+=${totalWidth - window.innerWidth}`,
        onUpdate: (self) => {
          // Update progress indicator
          const progress = self.progress * 100;
          gsap.to('.progress-bar', { width: `${progress}%`, duration: 0.3 });
        }
      }
    });

    // Hero entrance animation
    const tl = gsap.timeline({ delay: 0.5 });
    
    tl.fromTo('.hero-title',
      { opacity: 0, y: 100, rotationX: 90 },
      { opacity: 1, y: 0, rotationX: 0, duration: 1.2, ease: 'back.out(1.7)' }
    )
    .fromTo('.hero-subtitle',
      { opacity: 0, scale: 0 },
      { opacity: 1, scale: 1, duration: 0.8, ease: 'back.out(1.7)' }, '-=0.5'
    )
    .fromTo('.hero-description',
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 0.8 }, '-=0.3'
    )
    .fromTo('.hero-buttons',
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.6, stagger: 0.1 }, '-=0.2'
    )
    .fromTo('.hero-social',
      { opacity: 0, x: -50 },
      { opacity: 1, x: 0, duration: 0.6, stagger: 0.1 }, '-=0.4'
    );

    // Typewriter effect
    const roles = [
      'AI Engineer',
      'Full-Stack Developer', 
      'Cloud Architect',
      'ML Engineer'
    ];

    let currentRole = 0;
    const typewriterAnimation = () => {
      if (typewriterRef.current) {
        gsap.to(typewriterRef.current, {
          text: roles[currentRole],
          duration: 1.5,
          ease: 'none',
          onComplete: () => {
            setTimeout(() => {
              currentRole = (currentRole + 1) % roles.length;
              gsap.to(typewriterRef.current, {
                text: '',
                duration: 0.5,
                ease: 'none',
                onComplete: typewriterAnimation
              });
            }, 2000);
          }
        });
      }
    };

    setTimeout(typewriterAnimation, 2000);

    // Floating animation for profile image
    gsap.to('.hero-image', {
      y: -20,
      duration: 3,
      ease: 'power2.inOut',
      yoyo: true,
      repeat: -1
    });

    // Section-specific animations
    sections.forEach((section, index) => {
      const sectionElements = section.querySelectorAll('.animate-on-scroll');
      
      ScrollTrigger.create({
        trigger: section,
        start: 'left center',
        end: 'right center',
        onEnter: () => {
          gsap.fromTo(sectionElements, 
            { opacity: 0, y: 50 },
            { opacity: 1, y: 0, duration: 1, stagger: 0.2 }
          );
        }
      });
    });

    // Cleanup
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };

  }, []);

  const downloadResume = () => {
    const link = document.createElement('a');
    link.href = '/RenderCV_EngineeringResumes_Theme.pdf';
    link.download = 'Mohit_Soni_Resume.pdf';
    link.click();
  };

  const addToRefs = (el: HTMLDivElement | null) => {
    if (el && !sectionsRef.current.includes(el)) {
      sectionsRef.current.push(el);
    }
  };

  return (
    <div className="relative">
      {/* Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 bg-gray-800 z-50">
        <div className="progress-bar h-full bg-gradient-to-r from-cyan-400 to-purple-600 w-0"></div>
      </div>

      {/* Scroll Indicator */}
      <div className="fixed bottom-8 right-8 z-50 glass rounded-full p-4 md:block hidden">
        <div className="flex items-center space-x-2 text-sm">
          <span className="text-gray-400">Scroll horizontally</span>
          <ArrowRight size={16} className="text-cyan-400" />
        </div>
      </div>

      <div ref={containerRef} className="horizontal-container">
        {/* Section 1: Main Hero */}
        <div ref={addToRefs} className="hero-section flex items-center justify-center relative overflow-hidden">
          {/* Background Elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          </div>

          <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center relative z-10">
            {/* Left Content */}
            <div className="text-center lg:text-left">
              <div className="hero-title mb-6">
                <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold mb-4">
                  Hi, I'm{' '}
                  <span className="gradient-text">Mohit Soni</span>
                  <span className="wave ml-4 inline-block text-4xl md:text-6xl">👋</span>
                </h1>
              </div>

              <div className="hero-subtitle mb-6">
                <p className="text-xl md:text-2xl lg:text-3xl text-gray-300 font-light">
                  <span ref={typewriterRef} className="gradient-text font-semibold"></span>
                </p>
              </div>

              <div className="hero-description mb-8">
                <p className="text-lg md:text-xl text-gray-400 max-w-2xl leading-relaxed">
                  Crafting intelligent solutions that scale beyond imagination. 
                  Specializing in AI/ML engineering, full-stack development, and cloud-native applications.
                </p>
              </div>

              <div className="hero-buttons flex flex-col sm:flex-row gap-4 mb-8">
                <button 
                  onClick={downloadResume}
                  className="btn-primary flex items-center justify-center space-x-2 hover-lift"
                >
                  <Download size={20} />
                  <span>Download Resume</span>
                </button>
                <a 
                  href="/contact" 
                  className="btn-secondary flex items-center justify-center space-x-2 hover-lift"
                >
                  <Mail size={20} />
                  <span>Get In Touch</span>
                </a>
              </div>

              <div className="hero-social flex justify-center lg:justify-start space-x-6">
                <a 
                  href="https://github.com/xenonnoble69" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-3 glass rounded-full hover-lift hover:bg-white/20 transition-all duration-300"
                  title="GitHub Profile"
                >
                  <Github size={24} />
                </a>
                <a 
                  href="https://linkedin.com/in/mohit-soni-1b787136a" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-3 glass rounded-full hover-lift hover:bg-white/20 transition-all duration-300"
                  title="LinkedIn Profile"
                >
                  <Linkedin size={24} />
                </a>
                <a 
                  href="mailto:mohit.4019011622@ipu.ac.in"
                  className="p-3 glass rounded-full hover-lift hover:bg-white/20 transition-all duration-300"
                  title="Send Email"
                >
                  <Mail size={24} />
                </a>
              </div>
            </div>

            {/* Right Content - Profile Image */}
            <div className="flex justify-center lg:justify-end">
              <div className="hero-image relative">
                <div className="w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden glass p-2 hover-lift">
                  <img 
                    src="/profile.jpeg" 
                    alt="Mohit Soni" 
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
                {/* Decorative elements */}
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-r from-cyan-400 to-purple-600 rounded-full blur-xl opacity-60 animate-pulse"></div>
                <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full blur-xl opacity-40 animate-pulse" style={{ animationDelay: '1s' }}></div>
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: Skills Overview */}
        <div ref={addToRefs} className="skills-section flex items-center justify-center bg-gradient-to-br from-gray-900/50 to-purple-900/30">
          <div className="max-w-6xl mx-auto px-6 text-center">
            <h2 className="animate-on-scroll text-4xl md:text-5xl font-bold mb-12">
              <span className="gradient-text">Core Expertise</span>
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { title: 'AI & ML', icon: '🧠', desc: 'Deep Learning, Neural Networks' },
                { title: 'Full-Stack', icon: '💻', desc: 'React, Node.js, TypeScript' },
                { title: 'Cloud', icon: '☁️', desc: 'AWS, Docker, Kubernetes' },
                { title: 'Data', icon: '📊', desc: 'Analytics, Big Data Processing' }
              ].map((skill, index) => (
                <div key={index} className="animate-on-scroll glass rounded-2xl p-6 hover-lift">
                  <div className="text-4xl mb-4">{skill.icon}</div>
                  <h3 className="text-xl font-semibold mb-2">{skill.title}</h3>
                  <p className="text-gray-400">{skill.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Section 3: Featured Projects */}
        <div ref={addToRefs} className="projects-section flex items-center justify-center bg-gradient-to-br from-purple-900/30 to-cyan-900/30">
          <div className="max-w-6xl mx-auto px-6 text-center">
            <h2 className="animate-on-scroll text-4xl md:text-5xl font-bold mb-12">
              <span className="gradient-text">Featured Projects</span>
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { title: 'AI Code Assistant', tech: 'Python, TensorFlow' },
                { title: 'E-Commerce Platform', tech: 'React, Node.js' },
                { title: 'Computer Vision', tech: 'OpenCV, PyTorch' }
              ].map((project, index) => (
                <div key={index} className="animate-on-scroll glass rounded-2xl p-6 hover-lift">
                  <div className="h-32 bg-gradient-to-br from-cyan-400/20 to-purple-600/20 rounded-lg mb-4"></div>
                  <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                  <p className="text-gray-400 text-sm">{project.tech}</p>
                </div>
              ))}
            </div>
            
            <div className="animate-on-scroll mt-8">
              <a href="/projects" className="btn-primary inline-flex items-center space-x-2">
                <span>View All Projects</span>
                <ArrowRight size={20} />
              </a>
            </div>
          </div>
        </div>

        {/* Section 4: Contact CTA */}
        <div ref={addToRefs} className="contact-section flex items-center justify-center bg-gradient-to-br from-cyan-900/30 to-gray-900/50">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="animate-on-scroll text-4xl md:text-5xl font-bold mb-6">
              Let's Build Something <span className="gradient-text">Amazing</span>
            </h2>
            
            <p className="animate-on-scroll text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
              Ready to turn your ideas into reality? Let's collaborate and create innovative solutions together.
            </p>
            
            <div className="animate-on-scroll flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/contact" className="btn-primary flex items-center justify-center space-x-2">
                <Mail size={20} />
                <span>Start a Project</span>
              </a>
              <a href="/about" className="btn-secondary flex items-center justify-center space-x-2">
                <span>Learn More</span>
                <ArrowRight size={20} />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Scroll Indicator */}
      <div className="md:hidden fixed bottom-8 left-1/2 transform -translate-x-1/2 text-center z-50">
        <p className="text-sm text-gray-400 mb-2">Scroll to explore</p>
        <ChevronDown size={24} className="mx-auto animate-bounce text-cyan-400" />
      </div>
    </div>
  );
};

export default Hero;