// @/constants.ts
export interface SkillType {
  skill_name: string;
  Image: string;
  width: number;
  height: number;
  percent: number;
  category: string;
  color: string; // New color property
}

export const All_Skills: SkillType[] = [
  // Programming Languages
  {
    skill_name: "Python",
    Image: "/skills/python.png",
    width: 80,
    height: 80,
    percent: 90,
    category: "Languages",
    color: "from-[#3776AB] to-[#FFD43B]" // Python blue to yellow
  },
  {
    skill_name: "JavaScript",
    Image: "/skills/js.png",
    width: 80,
    height: 80,
    percent: 95,
    category: "Languages",
    color: "from-[#F7DF1E] to-[#000000]"
  },
  {
    skill_name: "TypeScript",
    Image: "/skills/ts.png",
    width: 80,
    height: 80,
    percent: 85,
    category: "Languages",
    color: "from-[#3178C6] to-[#FFFFFF]"
  },
{
    skill_name: "React",
    Image: "/skills/react.png",
    width: 80,
    height: 80,
    percent: 92,
    category: "Languages",
    color: "from-[#3178C6] to-[#FFFFFF]"
  },
  // Frontend
  {
    skill_name: "HTML",
    Image: "/skills/html.png",
    width: 80,
    height: 80,
    percent: 100,
    category: "Frontend",
    color: "from-[#61DAFB] to-[#282C34]"
  },
  {
    skill_name: "Next.js",
    Image: "/skills/next.png",
    width: 80,
    height: 80,
    percent: 85,
    category: "Frontend",
    color: "from-[#000000] to-[#FFFFFF]"
  },
  {
    skill_name: "Tailwind CSS",
    Image: "/skills/tailwind.png",
    width: 80,
    height: 80,
    percent: 95,
    category: "Frontend",
    color: "from-[#06B6D4] to-[#3B82F6]"
  },

  // Backend
  {
    skill_name: "Node.js",
    Image: "/skills/node-js.png",
    width: 80,
    height: 80,
    percent: 85,
    category: "Backend",
    color: "from-[#339933] to-[#FFFFFF]"
  },
  {
    skill_name: "Express",
    Image: "/skills/express.png",
    width: 80,
    height: 80,
    percent: 80,
    category: "Backend",
    color: "from-[#000000] to-[#FFFFFF]"
  },
  {
    skill_name: "Django",
    Image: "/skills/django.png",
    width: 80,
    height: 80,
    percent: 80,
    category: "Backend",
    color: "from-[#092E20] to-[#FFFFFF]"
  },
  {
    skill_name: "PHP",
    Image: "/skills/php.svg",
    width: 80,
    height: 80,
    percent: 80,
    category: "Backend",
    color: "from-[#092E20] to-[#FFFFFF]"
  },

  // Databases
  {
    skill_name: "MongoDB",
    Image: "/skills/mongodb.png",
    width: 80,
    height: 80,
    percent: 85,
    category: "Database",
    color: "from-[#47A248] to-[#FFFFFF]"
  },
  {
    skill_name: "PostgreSQL",
    Image: "/skills/postger.png",
    width: 80,
    height: 80,
    percent: 80,
    category: "Database",
    color: "from-[#336791] to-[#FFFFFF]"
  },
  {
    skill_name: "mysql",
    Image: "/skills/mysql.png",
    width: 80,
    height: 80,
    percent: 80,
    category: "Database",
    color: "from-[#336791] to-[#FFFFFF]"
  },

  // DevOps
  {
    skill_name: "Docker",
    Image: "/skills/docker.webp",
    width: 80,
    height: 80,
    percent: 85,
    category: "DevOps",
    color: "from-[#2496ED] to-[#FFFFFF]"
  },
  {
    skill_name: "AWS",
    Image: "/skills/ams.png",
    width: 80,
    height: 80,
    percent: 75,
    category: "DevOps",
    color: "from-[#FF9900] to-[#232F3E]"
  },

  // AI/ML
  {
    skill_name: "PyTorch",
    Image: "/skills/pytorch.png",
    width: 80,
    height: 80,
    percent: 75,
    category: "AI/ML",
    color: "from-[#EE4C2C] to-[#FFFFFF]"
  },
  {
    skill_name: "TensorFlow",
    Image: "/skills/TensorFlow.png",
    width: 80,
    height: 80,
    percent: 70,
    category: "AI/ML",
    color: "from-[#FF6F00] to-[#FFFFFF]"
  }
];


