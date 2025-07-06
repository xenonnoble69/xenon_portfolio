import React, { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Code, Database, Cloud, Brain, Award, Calendar } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const About: React.FC = () => {
  useEffect(() => {
    // Page entrance animation
    gsap.fromTo('.about-header',
      { opacity: 0, y: 100 },
      { opacity: 1, y: 0, duration: 1, ease: 'power2.out' }
    );

    // Skills animation with scroll trigger
    gsap.fromTo('.skill-card',
      { opacity: 0, y: 50, scale: 0.8 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        stagger: 0.2,
        ease: 'back.out(1.7)',
        scrollTrigger: {
          trigger: '.skills-section',
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse'
        }
      }
    );

    // Timeline animation
    gsap.fromTo('.timeline-item',
      { opacity: 0, x: -100 },
      {
        opacity: 1,
        x: 0,
        duration: 0.8,
        stagger: 0.3,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.timeline-section',
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse'
        }
      }
    );

    // Progress bars animation
    gsap.fromTo('.progress-bar',
      { width: '0%' },
      {
        width: (index, target) => target.getAttribute('data-width') + '%',
        duration: 1.5,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.skills-progress',
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse'
        }
      }
    );

  }, []);

  const skills = [
    {
      icon: Brain,
      title: 'AI & Machine Learning',
      description: 'Deep learning, neural networks, computer vision, NLP',
      technologies: ['TensorFlow', 'PyTorch', 'Scikit-learn', 'OpenCV']
    },
    {
      icon: Code,
      title: 'Full-Stack Development',
      description: 'Modern web applications with cutting-edge technologies',
      technologies: ['React', 'Node.js', 'TypeScript', 'Next.js']
    },
    {
      icon: Cloud,
      title: 'Cloud Architecture',
      description: 'Scalable cloud-native applications and microservices',
      technologies: ['AWS', 'Docker', 'Kubernetes', 'Terraform']
    },
    {
      icon: Database,
      title: 'Data Engineering',
      description: 'Big data processing and analytics pipelines',
      technologies: ['PostgreSQL', 'MongoDB', 'Apache Spark', 'Redis']
    }
  ];

  const timeline = [
    {
      year: '2024',
      title: 'AI Engineer',
      company: 'Tech Innovation Lab',
      description: 'Leading AI research and development projects, focusing on computer vision and natural language processing solutions.'
    },
    {
      year: '2023-2025',
      title: 'MLOps & DevOps Developer',
      company: 'Various Projects',
      description: 'Specialized in machine learning operations, continuous integration/deployment pipelines, and infrastructure automation for AI/ML systems.'
    },
    {
      year: '2023',
      title: 'Full-Stack Developer',
      company: 'Digital Solutions Inc.',
      description: 'Developed scalable web applications using modern frameworks and cloud technologies while pursuing AI/ML engineering studies.'
    },
    {
      year: '2022-2026',
      title: 'AI/ML Engineering Student',
      company: 'IPU University',
      description: 'Pursuing Bachelor\'s in Artificial Intelligence and Machine Learning Engineering with focus on deep learning, computer vision, and intelligent systems.'
    }
  ];

  const technicalSkills = [
    { name: 'Python', level: 95 },
    { name: 'JavaScript/TypeScript', level: 90 },
    { name: 'React/Next.js', level: 88 },
    { name: 'Machine Learning', level: 92 },
    { name: 'Cloud Platforms', level: 85 },
    { name: 'Database Design', level: 87 }
  ];

  return (
    <div className="min-h-screen pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="about-header text-center mb-20">
          <h1 className="text-5xl lg:text-6xl font-bold mb-6">
            About <span className="gradient-text">Me</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            I'm a passionate AI/ML engineering student and full-stack developer with a mission to create 
            intelligent solutions that make a real impact. Currently pursuing my degree in Artificial Intelligence 
            and Machine Learning Engineering while gaining hands-on experience in MLOps, DevOps, and modern web development.
          </p>
        </div>

        {/* Skills Section */}
        <div className="skills-section mb-20">
          <h2 className="text-4xl font-bold text-center mb-12">
            <span className="gradient-text">Core Expertise</span>
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {skills.map((skill, index) => {
              const Icon = skill.icon;
              return (
                <div key={index} className="skill-card glass rounded-2xl p-6 hover-lift">
                  <div className="w-16 h-16 bg-gradient-to-r from-cyan-400 to-purple-600 rounded-xl flex items-center justify-center mb-4 mx-auto">
                    <Icon size={32} className="text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-center">{skill.title}</h3>
                  <p className="text-gray-400 text-center mb-4">{skill.description}</p>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {skill.technologies.map((tech, techIndex) => (
                      <span 
                        key={techIndex}
                        className="px-3 py-1 bg-white/10 rounded-full text-sm text-cyan-400"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Technical Skills Progress */}
        <div className="skills-progress mb-20">
          <h2 className="text-4xl font-bold text-center mb-12">
            <span className="gradient-text">Technical Proficiency</span>
          </h2>
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
              {technicalSkills.map((skill, index) => (
                <div key={index} className="skill-progress">
                  <div className="flex justify-between mb-2">
                    <span className="text-lg font-medium">{skill.name}</span>
                    <span className="text-cyan-400">{skill.level}%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-3 overflow-hidden">
                    <div 
                      className="progress-bar h-full bg-gradient-to-r from-cyan-400 to-purple-600 rounded-full"
                      data-width={skill.level}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Timeline Section */}
        <div className="timeline-section">
          <h2 className="text-4xl font-bold text-center mb-12">
            <span className="gradient-text">Journey</span>
          </h2>
          <div className="max-w-4xl mx-auto">
            {timeline.map((item, index) => (
              <div key={index} className="timeline-item flex items-start mb-12 last:mb-0">
                <div className="flex-shrink-0 w-24 h-24 bg-gradient-to-r from-cyan-400 to-purple-600 rounded-full flex items-center justify-center mr-8">
                  <Calendar size={32} className="text-white" />
                </div>
                <div className="flex-grow glass rounded-2xl p-6 hover-lift">
                  <div className="flex items-center mb-2">
                    <span className="text-2xl font-bold text-cyan-400 mr-4">{item.year}</span>
                    <Award size={20} className="text-purple-400" />
                  </div>
                  <h3 className="text-xl font-semibold mb-1">{item.title}</h3>
                  <p className="text-purple-400 mb-3">{item.company}</p>
                  <p className="text-gray-400">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;