require('dotenv').config();
const mongoose = require('mongoose');
const Admin = require('./models/Admin');
const Profile = require('./models/Profile');
const Project = require('./models/Project');
const Skill = require('./models/Skill');
const Achievement = require('./models/Achievement');
const Education = require('./models/Education');

async function seed() {
  await mongoose.connect(process.env.MONGODB_URI);
  console.log('Connected to MongoDB');

  // ── Admin ──────────────────────────────────────────────────────────────────
  const existingAdmin = await Admin.findOne({ email: process.env.ADMIN_EMAIL });
  if (!existingAdmin) {
    await Admin.create({ email: process.env.ADMIN_EMAIL, password: process.env.ADMIN_PASSWORD });
    console.log('Admin created:', process.env.ADMIN_EMAIL);
  } else {
    console.log('Admin already exists, skipping');
  }

  // ── Profile ────────────────────────────────────────────────────────────────
  const existingProfile = await Profile.findOne();
  if (!existingProfile) {
    await Profile.create({
      name: 'Pintu Kumar',
      title: 'Full Stack Developer | MERN Stack | Strong in Data Structures & Algorithms',
      intro: 'Computer Science undergraduate focused on building scalable full-stack applications with secure authentication, RESTful APIs, and clean architecture principles. Solved 900+ Data Structures & Algorithms problems across multiple platforms, strengthening problem-solving depth and system-level thinking.',
      about: {
        paragraphs: [
          "I'm a Full Stack Developer with a strong foundation in Data Structures & Algorithms. Solving 900+ problems has strengthened my problem-solving approach and helped me think systematically about performance, scalability, and clean logic.",
          "I apply this algorithmic mindset to building real-world MERN stack applications. I've designed RESTful APIs, implemented JWT-based authentication systems, integrated payment gateways, and structured backend logic using clean, modular architecture.",
          "I'm particularly interested in backend scalability and system design. I focus on writing maintainable code, designing efficient database schemas, and building applications that can evolve with product requirements.",
        ],
        stats: [
          { label: 'DSA Problems Solved', value: '900+' },
          { label: 'Full Stack Development', value: 'MERN' },
          { label: 'Expected Graduation', value: '2027' },
        ],
      },
      email: 'ipintu4143@gmail.com',
      location: 'India',
      resumeUrl: '/Pintu_Kumar_Resume.pdf',
      socialLinks: {
        github: 'https://github.com/intensity4143',
        linkedin: 'https://linkedin.com/in/intensity4143',
        leetcode: 'https://leetcode.com/pintu_sharma',
        geeksforgeeks: 'https://auth.geeksforgeeks.org/user/intensity4143',
        codeforces: 'https://codeforces.com/profile/ipintu4143',
        codechef: 'https://www.codechef.com/users/intens',
      },
      siteTitle: 'Pintu Kumar – Full Stack Developer',
      siteDescription: 'Personal portfolio of Pintu Kumar, Full Stack Developer specializing in MERN stack.',
    });
    console.log('Profile seeded');
  } else {
    console.log('Profile already exists, skipping');
  }

  // ── Projects ───────────────────────────────────────────────────────────────
  const projectCount = await Project.countDocuments();
  if (projectCount === 0) {
    await Project.insertMany([
      {
        title: 'E-Commerce Platform (ongoing)',
        description: 'Full-stack MERN e-commerce platform with secure authentication, role-based admin dashboard, and multi-gateway payment integration.',
        highlights: [
          'Implemented JWT authentication with role-based access control (RBAC)',
          'Integrated Stripe & Razorpay with secure webhook verification',
          'Designed RESTful APIs using MVC architecture',
          'Built cart, wishlist, and order management system',
          'Optimized MongoDB queries with indexing & pagination',
        ],
        techStack: ['React', 'Node.js', 'Express', 'MongoDB', 'Stripe', 'Razorpay', 'JWT', 'Tailwind CSS'],
        github: 'https://github.com/intensity4143/E-Commerce-',
        demo: '#',
        featured: true,
        order: 1,
      },
      {
        title: 'Task Management Web App',
        description: 'Full-stack task management application with secure authentication, task filtering, and user profile management.',
        highlights: [
          'Implemented JWT-based authentication with protected routes',
          'Developed task CRUD operations with filtering, prioritization, and status tracking',
          'Integrated Cloudinary for secure image upload and profile picture management',
          'Designed standardized API responses with validation middleware',
          'Built user profile management with password and display picture update',
        ],
        techStack: ['React', 'Node.js', 'Express', 'MongoDB', 'JWT', 'Multer', 'Tailwind CSS'],
        github: 'https://github.com/intensity4143/Task-Manager',
        demo: 'https://task-manager-rfo2.onrender.com',
        featured: true,
        order: 2,
      },
      {
        title: 'Weather Web App',
        description: 'Responsive weather application integrating real-time API data and geolocation services.',
        highlights: [
          'Integrated browser Geolocation API with fallback support',
          'Connected third-party Weather API with async handling',
          'Implemented error handling & loading states',
          'Integrated Google Maps API for location search',
          'Optimized API calls with caching strategy',
        ],
        techStack: ['React', 'Google Maps API', 'Weather API', 'Tailwind CSS'],
        github: 'https://github.com/intensity4143/weather-app-built-using-HTML-CSS-and-JS',
        demo: 'https://intensity4143.github.io/weather-app-built-using-HTML-CSS-and-JS/',
        featured: false,
        order: 3,
      },
    ]);
    console.log('Projects seeded');
  } else {
    console.log('Projects already exist, skipping');
  }

  // ── Skills ─────────────────────────────────────────────────────────────────
  const skillCount = await Skill.countDocuments();
  if (skillCount === 0) {
    await Skill.insertMany([
      { name: 'C', category: 'Languages', icon: 'SiC', order: 1 },
      { name: 'C++', category: 'Languages', icon: 'SiCplusplus', order: 2 },
      { name: 'JavaScript', category: 'Languages', icon: 'SiJavascript', order: 3 },
      { name: 'Python', category: 'Languages', icon: 'SiPython', order: 4 },
      { name: 'React', category: 'Frontend', icon: 'SiReact', order: 1 },
      { name: 'Tailwind CSS', category: 'Frontend', icon: 'SiTailwindcss', order: 2 },
      { name: 'HTML5', category: 'Frontend', icon: 'SiHtml5', order: 3 },
      { name: 'CSS3', category: 'Frontend', icon: 'SiCss3', order: 4 },
      { name: 'Node.js', category: 'Backend', icon: 'SiNodedotjs', order: 1 },
      { name: 'Express.js', category: 'Backend', icon: 'SiExpress', order: 2 },
      { name: 'REST APIs', category: 'Backend', icon: 'TbApi', order: 3 },
      { name: 'JWT Auth', category: 'Backend', icon: 'FaServer', order: 4 },
      { name: 'MongoDB', category: 'Databases', icon: 'SiMongodb', order: 1 },
      { name: 'MySQL', category: 'Databases', icon: 'SiMysql', order: 2 },
      { name: 'SQL', category: 'Databases', icon: 'FaDatabase', order: 3 },
      { name: 'Data Structures & Algorithms', category: 'Core CS', icon: null, order: 1 },
      { name: 'Object-Oriented Programming', category: 'Core CS', icon: null, order: 2 },
      { name: 'Database Management Systems', category: 'Core CS', icon: null, order: 3 },
      { name: 'Operating Systems', category: 'Core CS', icon: null, order: 4 },
    ]);
    console.log('Skills seeded');
  } else {
    console.log('Skills already exist, skipping');
  }

  // ── Achievements ───────────────────────────────────────────────────────────
  const achCount = await Achievement.countDocuments();
  if (achCount === 0) {
    await Achievement.insertMany([
      {
        title: '900+ Problems Solved',
        description: 'Solved over 900 Data Structures & Algorithms problems across multiple competitive programming platforms',
        highlight: 'Strong foundation in algorithmic thinking',
        order: 1,
      },
      {
        title: 'LeetCode Max Rating: 1709',
        description: 'Achieved a maximum rating of 1709 on LeetCode, demonstrating consistent problem-solving skills',
        highlight: 'Top percentile performer',
        organization: 'LeetCode',
        url: 'https://leetcode.com/pintu_sharma',
        order: 2,
      },
      {
        title: 'Advanced DSA Expertise',
        description: 'Deep understanding of complex data structures and algorithms including trees, graphs, dynamic programming, and greedy algorithms',
        highlight: 'Strong theoretical and practical knowledge',
        order: 3,
      },
      {
        title: 'Complexity Optimization',
        description: 'Focus on time and space complexity optimization, writing efficient solutions that scale',
        highlight: 'Performance-oriented approach',
        order: 4,
      },
    ]);
    console.log('Achievements seeded');
  } else {
    console.log('Achievements already exist, skipping');
  }

  // ── Education ──────────────────────────────────────────────────────────────
  const eduCount = await Education.countDocuments();
  if (eduCount === 0) {
    await Education.create({
      institution: 'University / College',
      degree: "Bachelor's of Technology",
      fieldOfStudy: 'Computer Science & Engineering',
      startYear: '2023',
      endYear: '2027',
      description: 'Computer Science undergraduate with focus on full-stack development and algorithms.',
      order: 1,
    });
    console.log('Education seeded');
  } else {
    console.log('Education already exists, skipping');
  }

  console.log('\nSeed complete!');
  process.exit(0);
}

seed().catch((err) => {
  console.error('Seed failed:', err);
  process.exit(1);
});
