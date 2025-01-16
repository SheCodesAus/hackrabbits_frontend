export const allRoleModels = [
    {
      id: 1,
      name: "Sarah Chen",
      tagline: "Full Stack Developer & Community Builder",
      description: "Started coding at 35, now leading tech initiatives at major fintech company. Passionate about bringing more mid-career women into tech.",
      skills: ["JavaScript", "Python", "React", "Team Leadership"],
      current_role: "Senior Developer @ FinTech Co",
      image: "/api/placeholder/300/300",
      is_available_mentor: true,
      date_joined: "2023-09-15T14:28:23.382748Z",
      industry: "Software Development",
      location: "Melbourne"
    },
    {
      id: 2,
      name: "Maria Rodriguez",
      tagline: "AI Researcher & Tech Ethics Advocate",
      description: "PhD in Machine Learning. Working on making AI more accessible and ethical. Regular speaker at women in tech conferences.",
      skills: ["Machine Learning", "Python", "Data Ethics", "Public Speaking"],
      current_role: "Lead AI Researcher @ TechCorp",
      image: "/api/placeholder/300/300",
      is_available_mentor: true,
      date_joined: "2023-08-20T18:28:23.382748Z",
      industry: "Artificial Intelligence",
      location: "Sydney"
    },
    {
      id: 3,
      name: "Priya Patel",
      tagline: "Product Manager & Startup Founder",
      description: "Founded two successful tech startups. Mentoring young women entrepreneurs in the tech space.",
      skills: ["Product Strategy", "UX Design", "Team Building", "Entrepreneurship"],
      current_role: "CEO @ TechStartup",
      image: "/api/placeholder/300/300",
      is_available_mentor: false,
      date_joined: "2023-10-01T14:28:23.382748Z",
      industry: "Product Management",
      location: "Brisbane"
    },
    {
      id: 4,
      name: "Jessica Wong",
      tagline: "Cybersecurity Expert & STEM Educator",
      description: "15 years in cybersecurity. Runs weekend coding workshops for high school girls.",
      skills: ["Network Security", "Ethical Hacking", "Teaching", "Python"],
      current_role: "Security Architect @ SecureNet",
      image: "/api/placeholder/300/300",
      is_available_mentor: true,
      date_joined: "2023-07-12T14:28:23.382748Z",
      industry: "Cybersecurity",
      location: "Perth"
    },
    {
      id: 5,
      name: "Emily Taylor",
      tagline: "UX Designer & Accessibility Advocate",
      description: "Specializing in accessible design. Transformed from graphic designer to UX lead in 2 years.",
      skills: ["UI/UX Design", "Accessibility", "Figma", "User Research"],
      current_role: "UX Lead @ DesignFirst",
      image: "/api/placeholder/300/300",
      is_available_mentor: true,
      date_joined: "2023-11-05T12:28:23.382748Z",
      industry: "Design",
      location: "Adelaide"
    }
  ];
  
  export const roleModelDetails = {
    id: 1,
    name: "Sarah Chen",
    tagline: "Full Stack Developer & Community Builder",
    description: "Started coding at 35, now leading tech initiatives at major fintech company. Passionate about bringing more mid-career women into tech.",
    skills: ["JavaScript", "Python", "React", "Team Leadership"],
    current_role: "Senior Developer @ FinTech Co",
    image: "/api/placeholder/300/300",
    is_available_mentor: true,
    date_joined: "2023-09-15T14:28:23.382748Z",
    industry: "Software Development",
    location: "Melbourne",
    achievements: [
      {
        id: 1,
        title: "Women in Tech Mentor of the Year 2023",
        date: "2023-11-01",
      },
      {
        id: 2,
        title: "Led successful migration of legacy system to React",
        date: "2023-06-15",
      }
    ],
    mentorship_requests: [
      {
        id: 1,
        message: "Would love to learn about your career transition journey",
        topic: "Career Change",
        status: "Pending",
        requester_id: 3,
        date_requested: "2023-12-01T10:22:23.382748Z"
      }
    ],
    upcoming_events: [
      {
        id: 1,
        title: "Workshop: Breaking into Tech After 30",
        date: "2024-02-15",
        location: "Melbourne Tech Hub",
        type: "Workshop"
      }
    ]
  };