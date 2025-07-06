import React, { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Github, ExternalLink, Star, GitFork } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Projects: React.FC = () => {
  useEffect(() => {
    // Page entrance animation
    gsap.fromTo('.projects-header',
      { opacity: 0, y: 100 },
      { opacity: 1, y: 0, duration: 1, ease: 'power2.out' }
    );

    // Project cards animation
    gsap.fromTo('.project-card',
      { opacity: 0, y: 100, rotationY: 45 },
      {
        opacity: 1,
        y: 0,
        rotationY: 0,
        duration: 1,
        stagger: 0.2,
        ease: 'back.out(1.7)',
        scrollTrigger: {
          trigger: '.projects-grid',
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse'
        }
      }
    );

    // Hover animations for project cards
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
      card.addEventListener('mouseenter', () => {
        gsap.to(card, {
          scale: 1.05,
          rotationY: 5,
          z: 50,
          duration: 0.3,
          ease: 'power2.out'
        });
      });

      card.addEventListener('mouseleave', () => {
        gsap.to(card, {
          scale: 1,
          rotationY: 0,
          z: 0,
          duration: 0.3,
          ease: 'power2.out'
        });
      });
    });

  }, []);

  const projects = [
    {
      title: 'AI-Powered Code Assistant',
      description: 'An intelligent code completion and review system using transformer models and natural language processing.',
      image: 'https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg?auto=compress&cs=tinysrgb&w=800',
      technologies: ['Python', 'TensorFlow', 'React', 'FastAPI', 'Docker'],
      github: 'https://github.com/xenonnoble69',
      demo: '#',
      stars: 234,
      forks: 45,
      category: 'AI/ML'
    },
    {
      title: 'Cloud-Native E-Commerce Platform',
      description: 'Scalable microservices-based e-commerce solution with real-time analytics and AI-driven recommendations.',
      image: 'https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=800',
      technologies: ['Node.js', 'React', 'MongoDB', 'AWS', 'Kubernetes'],
      github: 'https://github.com/xenonnoble69',
      demo: '#',
      stars: 189,
      forks: 32,
      category: 'Full-Stack'
    },
    {
      title: 'Computer Vision Security System',
      description: 'Real-time object detection and facial recognition system for enhanced security monitoring.',
      image: 'https://images.pexels.com/photos/442150/pexels-photo-442150.jpeg?auto=compress&cs=tinysrgb&w=800',
      technologies: ['Python', 'OpenCV', 'PyTorch', 'Flask', 'Redis'],
      github: 'https://github.com/xenonnoble69',
      demo: '#',
      stars: 156,
      forks: 28,
      category: 'AI/ML'
    },
    {
      title: 'Real-Time Chat Application',
      description: 'Modern chat application with end-to-end encryption, file sharing, and AI-powered message suggestions.',
      image: 'https://images.pexels.com/photos/267350/pexels-photo-267350.jpeg?auto=compress&cs=tinysrgb&w=800',
      technologies: ['React', 'Socket.io', 'Node.js', 'PostgreSQL', 'WebRTC'],
      github: 'https://github.com/xenonnoble69',
      demo: '#',
      stars: 98,
      forks: 19,
      category: 'Full-Stack'
    },
    {
      title: 'Predictive Analytics Dashboard',
      description: 'Interactive dashboard for business intelligence with machine learning-powered forecasting capabilities.',
      image: 'https://images.pexels.com/photos/590020/pexels-photo-590020.jpeg?auto=compress&cs=tinysrgb&w=800',
      technologies: ['Python', 'Streamlit', 'Pandas', 'Scikit-learn', 'Plotly'],
      github: 'https://github.com/xenonnoble69',
      demo: '#',
      stars: 142,
      forks: 25,
      category: 'Data Science'
    },
    {
      title: 'Blockchain Voting System',
      description: 'Secure and transparent voting system built on blockchain technology with smart contracts.',
      image: 'https://images.pexels.com/photos/8369648/pexels-photo-8369648.jpeg?auto=compress&cs=tinysrgb&w=800',
      technologies: ['Solidity', 'Web3.js', 'React', 'Ethereum', 'IPFS'],
      github: 'https://github.com/xenonnoble69',
      demo: '#',
      stars: 87,
      forks: 16,
      category: 'Blockchain'
    }
  ];

  const categories = ['All', 'AI/ML', 'Full-Stack', 'Data Science', 'Blockchain'];
  const [selectedCategory, setSelectedCategory] = React.useState('All');

  const filteredProjects = selectedCategory === 'All' 
    ? projects 
    : projects.filter(project => project.category === selectedCategory);

  return (
    <div className="min-h-screen pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="projects-header text-center mb-20">
          <h1 className="text-5xl lg:text-6xl font-bold mb-6">
            My <span className="gradient-text">Projects</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed mb-8">
            A showcase of my technical expertise through innovative projects spanning 
            AI/ML, full-stack development, and emerging technologies.
          </p>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-3 rounded-full transition-all duration-300 ${
                  selectedCategory === category
                    ? 'bg-gradient-to-r from-cyan-500 to-purple-600 text-white'
                    : 'glass text-gray-300 hover:text-white hover:bg-white/10'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="projects-grid grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <div key={index} className="project-card glass rounded-2xl overflow-hidden hover-lift">
              {/* Project Image */}
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute top-4 right-4">
                  <span className="px-3 py-1 bg-purple-600 text-white text-sm rounded-full">
                    {project.category}
                  </span>
                </div>
              </div>

              {/* Project Content */}
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-3">{project.title}</h3>
                <p className="text-gray-400 mb-4 line-clamp-3">{project.description}</p>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech, techIndex) => (
                    <span 
                      key={techIndex}
                      className="px-2 py-1 bg-white/10 rounded text-xs text-cyan-400"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Stats */}
                <div className="flex items-center justify-between mb-4 text-sm text-gray-400">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                      <Star size={16} className="text-yellow-400" />
                      <span>{project.stars}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <GitFork size={16} className="text-gray-400" />
                      <span>{project.forks}</span>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-3">
                  <a 
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center space-x-2 py-2 px-4 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
                    title="View Source Code"
                  >
                    <Github size={16} />
                    <span>Code</span>
                  </a>
                  <a 
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center space-x-2 py-2 px-4 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-lg hover:opacity-90 transition-opacity"
                    title="View Live Demo"
                  >
                    <ExternalLink size={16} />
                    <span>Demo</span>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* GitHub CTA */}
        <div className="text-center mt-16">
          <p className="text-gray-400 mb-6">Want to see more of my work?</p>
          <a 
            href="https://github.com/xenonnoble69"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary inline-flex items-center space-x-2 hover-lift"
            title="Visit GitHub Profile"
          >
            <Github size={20} />
            <span>View All Projects on GitHub</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Projects;