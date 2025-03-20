import React, { useState, useEffect, useCallback } from 'react';
import { Github, Linkedin, Mail, Code2, Globe, Database, Palette, ExternalLink, Menu, X } from 'lucide-react';

function App() {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [cursorVisible, setCursorVisible] = useState(true);

  // Handle cursor and trail effects
  useEffect(() => {
    const cursor = document.createElement('div');
    const cursorOutline = document.createElement('div');
    cursor.className = 'cursor-dot';
    cursorOutline.className = 'cursor-outline';
    document.body.appendChild(cursor);
    document.body.appendChild(cursorOutline);

    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
      cursor.style.left = e.clientX + 'px';
      cursor.style.top = e.clientY + 'px';
      cursorOutline.style.left = e.clientX + 'px';
      cursorOutline.style.top = e.clientY + 'px';

      // Create trail effect
      const trail = document.createElement('div');
      trail.className = 'trail';
      trail.style.left = e.clientX + 'px';
      trail.style.top = e.clientY + 'px';
      document.body.appendChild(trail);

      setTimeout(() => {
        document.body.removeChild(trail);
      }, 1000);
    };

    const handleMouseLeave = () => setCursorVisible(false);
    const handleMouseEnter = () => setCursorVisible(true);

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.body.removeChild(cursor);
      document.body.removeChild(cursorOutline);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['Home', 'Skills', 'Projects', 'About', 'Contact'];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Add mouse move effect for project cards
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const cards = document.querySelectorAll('.project-card');
      cards.forEach((card: Element) => {
        const rect = card.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        (card as HTMLElement).style.setProperty('--mouse-x', `${x}%`);
        (card as HTMLElement).style.setProperty('--mouse-y', `${y}%`);
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const projects = [
    {
      title: "Personal Blog Platform",
      description: "A modern blog platform built with React and Node.js",
      tech: ["React", "Node.js"],
      code: `const BlogPost = () => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    fetchPosts();
  }, []);
}`,
      link: "https://github.com/BvspSite"

    },
    {
      title: "E-Commerce Website",
      description: "Online store with payment integration",
      tech: ["Next.js", "Express", "MySQL"],
      code: `async function processPayment(order) {
  try {
    const result = await stripe.charges.create({
      amount: order.total,
      currency: 'usd'
    });
    return result;
  } catch (err) {
    console.error(err);
  }
}`,
      link: "https://github.com/BvspSite"
    },
    {
      title: "Portfolio Website",
      description: "Professional portfolio website with modern design",
      tech: ["React", "Tailwind CSS", "TypeScript"],
      code: `interface Project {
  title: string;
  description: string;
  tech: string[];
  link: string;
}`,
      link: "https://github.com/BvspSite"
    }
  ];

  const languages = [
     "HTML", "CSS", "PHP", "JavaScript", "Python", "SQL", "C#"
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      {/* Navigation */}
      <nav className="fixed w-full bg-gray-900/95 backdrop-blur-sm z-50 border-b border-gray-800">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <a href="#home" className="text-2xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-blue-400 text-transparent bg-clip-text glow">
              Pabril
            </a>
            
            {/* Mobile menu button */}
            <button onClick={() => setIsNavOpen(!isNavOpen)} className="md:hidden">
              {isNavOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-8">
              {['Home', 'Skills', 'Projects', 'About', 'Contact'].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className={`nav-link ${activeSection === item.toLowerCase() ? 'text-blue-400' : 'text-gray-300'}`}
                >
                  {item}
                </a>
              ))}
            </div>
          </div>

          {/* Mobile Navigation */}
          {isNavOpen && (
            <div className="md:hidden py-4">
              {['Home', 'Skills', 'Projects', 'About', 'Contact'].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="block py-2 text-gray-300 hover:text-white"
                  onClick={() => setIsNavOpen(false)}
                >
                  {item}
                </a>
              ))}
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <header id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-16">
        <div className="hero-bg" />
        <div className="container mx-auto px-4 z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-500 to-blue-400 text-transparent bg-clip-text glow">
              Pabril
            </h1>
            <div className="typing-effect inline-block text-xl md:text-2xl text-gray-300 mb-8">
              Web Dev
            </div>
            <div className="flex flex-wrap justify-center gap-3 mb-12">
              {languages.map((lang, index) => (
                <span
                  key={lang}
                  className="language-tag"
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  {lang}
                </span>
              ))}
            </div>
            <div className="flex justify-center gap-4 mb-12">
              <a href="https://github.com/BvspSite" className="text-gray-400 hover:text-white transition-colors transform hover:scale-110">
                <Github size={40} />
              </a>
              <a href="https://www.instagram.com/pabrilll_?igsh=MWtzdzF4ZXppdTcyOA==" className="text-gray-400 hover:text-white transition-colors transform hover:scale-110">
                <Linkedin size={40} />
              </a>
              <a href="Bvspsv@gmail.com" className="text-gray-400 hover:text-white transition-colors transform hover:scale-110">
                <Mail size={40} />
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Skills Section */}
      <section id="skills" className="py-20 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">My Skills</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="skill-card transform hover:-translate-y-2 transition-all duration-300">
              <Code2 className="w-12 h-12 mb-4 text-blue-400" />
              <h3 className="text-xl font-semibold mb-2">Frontend Development</h3>
              <p className="text-gray-300">HTML, CSS, JavaScript, React, TypeScript</p>
            </div>
            <div className="skill-card transform hover:-translate-y-2 transition-all duration-300">
              <Database className="w-12 h-12 mb-4 text-purple-400" />
              <h3 className="text-xl font-semibold mb-2">Backend Development</h3>
              <p className="text-gray-300">Node.js, Express, MySQL, MongoDB</p>
            </div>
            {/* <div className="skill-card transform hover:-translate-y-2 transition-all duration-300">
              <Globe className="w-12 h-12 mb-4 text-green-400" />
              <h3 className="text-xl font-semibold mb-2">Web Technologies</h3>
              <p className="text-gray-300">RESTful APIs, GraphQL, Web Security</p>
            </div> */}
            <div className="skill-card transform hover:-translate-y-2 transition-all duration-300">
              <Palette className="w-12 h-12 mb-4 text-yellow-400" />
              <h3 className="text-xl font-semibold mb-2">UI/UX Design</h3>
              <p className="text-gray-300">Responsive Design, Tailwind CSS, Figma</p>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">My Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <div key={index} className="project-card transform hover:scale-[1.02] transition-all duration-300">
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                  <p className="text-gray-400 mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map((tech, i) => (
                      <span key={i} className="px-3 py-1 bg-gray-700/50 rounded-full text-sm backdrop-blur-sm">
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="code-block mb-4">
                    <pre>
                      <code>{project.code}</code>
                    </pre>
                  </div>
                  <a
                    href={project.link}
                    className="inline-flex items-center text-blue-400 hover:text-blue-300"
                  >
                    View Project <ExternalLink size={16} className="ml-1" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Me Section */}
      <section id="about" className="py-20 relative">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-8 bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">About Me</h2>
            <div className="bg-gray-800/50 backdrop-blur-sm p-8 rounded-lg border border-gray-700/50">
              <p className="text-gray-300 mb-6">
                
                Hai Perkenalkan saya <br />
                FABRILIO VIGAS SATRIA PRADITO
                

              </p>

              <p className="text-gray-300">
              Saya adalah seorang yang memiliki ketertarikan mendalam pada dunia teknologi,
               khususnya dalam pengembangan web (web development) dan bahasa pemrograman C#. 
               Saya percaya bahwa teknologi dapat memberikan dampak positif bagi kehidupan manusia, 
               dan saya ingin menjadi bagian dari itu.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="py-20 relative">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-8 bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">Perjalanan dalam Web Development</h2>
            <div className="bg-gray-800/50 backdrop-blur-sm p-8 rounded-lg border border-gray-700/50">
              <p className="text-gray-300 mb-6">
              Ketertarikan saya pada web development dimulai ketika saya menyadari potensi besar internet untuk menghubungkan orang dan informasi.
               Saya mulai mempelajari dasar-dasar HTML, CSS, dan JavaScript untuk membangun antarmuka pengguna (user interface) 
               yang menarik dan interaktif. Seiring berjalannya waktu, saya juga mendalami framework JavaScript seperti React dan Vue.js 
               untuk mengembangkan aplikasi web yang lebih kompleks.
               <br />
               <br />

              Saya percaya bahwa web development bukan hanya tentang menulis kode, tetapi juga tentang memahami kebutuhan pengguna 
              dan menciptakan pengalaman yang menyenangkan bagi mereka. Oleh karena itu, saya selalu berusaha untuk mengikuti perkembangan
               tren desain dan teknologi terbaru agar dapat menghasilkan produk yang relevan dan berkualitas.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="py-20 relative">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-8 bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">TUJUAN</h2>
            <div className="bg-gray-800/50 backdrop-blur-sm p-8 rounded-lg border border-gray-700/50">
              <p className="text-gray-300 mb-6">
              Saya memiliki harapan besar untuk menjadi seorang pengembang web dan C# yang handal dan profesional.
               Saya ingin terus belajar dan mengembangkan diri agar dapat memberikan kontribusi yang berarti bagi dunia teknologi. 
               Saya juga ingin berbagi pengetahuan dan pengalaman saya dengan orang lain, terutama dengan para pemula yang ingin belajar
                web development dan C#.
                <br />

                Saya percaya bahwa dengan kerja keras, dedikasi, dan semangat pantang menyerah, 
                saya dapat mencapai tujuan saya dan menjadi orang yang berguna bagi orang lain.
                <br />
                <br />

                Terima kasih telah meluangkan waktu untuk membaca tentang saya. Mari kita bersama-sama membangun 
                masa depan yang lebih baik melalui teknologi.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="py-20 relative">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-8 bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text"></h2>
            <div className="bg-gray-800/50 backdrop-blur-sm p-8 rounded-lg border border-gray-700/50">
              <p className="text-gray-300 mb-6">
              Terima kasih telah meluangkan waktu untuk membaca tentang saya. Mari kita bersama-sama membangun 
              masa depan yang lebih baik melalui teknologi.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-8 bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">Let's Connect</h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
          Saya percaya bahwa kolaborasi dan jaringan adalah kunci untuk mencapai kesuksesan di era digital ini.
           Oleh karena itu, saya sangat terbuka untuk terhubung dengan Anda, baik itu untuk berdiskusi tentang teknologi, 
           berbagi pengalaman, atau bahkan bekerja sama dalam proyek-proyek menarik.
           <br />
           <br />

            Jika Anda memiliki pertanyaan, ide, atau tawaran kerjasama, jangan ragu untuk menghubungi saya.
             Saya selalu senang untuk bertemu dengan orang-orang baru dan menjalin hubungan yang saling menguntungkan.
          </p>
          <a
            href="https://wa.me/+62081338770049?text=HAI+PABRILER" 
            className="inline-block px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all duration-300 transform hover:scale-105"
          >
            Contact Me   ✆  
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 text-center text-gray-400">
        <p>© {new Date().getFullYear()} Pabril. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;