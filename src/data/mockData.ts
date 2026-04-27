export interface Fundraiser {
  id: number;
  title: string;
  organizer: string;
  category: string;
  description: string;
  story: string;
  imageUrl: string;
  goalAmount: number;
  raisedAmount: number;
  donations: Donation[];
  createdAt: string;
}

export interface Donation {
  id: number;
  donorName: string;
  amount: number;
  message?: string;
  date: string;
}

export const categories = [
  "Medical",
  "Education",
  "Emergency",
  "Animals",
  "Environment",
  "Community",
  "Sports",
  "Creative",
];

export const fundraisers: Fundraiser[] = [
  {
    id: 1,
    title: "Help Sarah Fight Cancer",
    organizer: "Michael Johnson",
    category: "Medical",
    description: "Sarah has been diagnosed with stage 3 breast cancer and needs financial help for treatment.",
    story: "Sarah, a loving mother of two, was recently diagnosed with stage 3 breast cancer. Her family is devastated but determined to fight. The treatment costs are overwhelming — chemotherapy, radiation, and potential surgery will cost over $50,000. Sarah has always been the rock of her community, volunteering at the local shelter and mentoring young women. Now it's our turn to support her. Every dollar brings her one step closer to recovery. The funds will go directly toward her medical bills, medication, and transportation to treatment centers. Sarah's strength inspires everyone around her, and with your help, she can focus on healing instead of worrying about finances.",
    imageUrl: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=800&h=500&fit=crop",
    goalAmount: 50000,
    raisedAmount: 35420,
    donations: [
      { id: 1, donorName: "Emily R.", amount: 500, message: "Stay strong, Sarah! 💪", date: "2024-01-15" },
      { id: 2, donorName: "David K.", amount: 200, message: "Praying for your recovery.", date: "2024-01-14" },
      { id: 3, donorName: "Anonymous", amount: 1000, message: "You've got this!", date: "2024-01-13" },
      { id: 4, donorName: "Lisa M.", amount: 150, date: "2024-01-12" },
      { id: 5, donorName: "James W.", amount: 300, message: "Our community is behind you.", date: "2024-01-11" },
    ],
    createdAt: "2024-01-01",
  },
  {
    id: 2,
    title: "Build a School in Rural Kenya",
    organizer: "Hope Foundation",
    category: "Education",
    description: "Help us build a primary school for 300 children in a remote Kenyan village.",
    story: "In the heart of rural Kenya, over 300 children walk more than 10 miles each day to reach the nearest school. Many drop out due to the distance and dangerous journey. Our mission is to build a fully equipped primary school right in their village. The school will include 8 classrooms, a library, clean water facilities, and solar power. We've already secured the land and building permits. Your donation will fund construction materials, teacher salaries for the first year, and educational supplies. Education is the most powerful tool we can give these children to break the cycle of poverty.",
    imageUrl: "https://images.unsplash.com/photo-1497486751825-1233686d5d80?w=800&h=500&fit=crop",
    goalAmount: 75000,
    raisedAmount: 48200,
    donations: [
      { id: 6, donorName: "Corporate Match", amount: 5000, message: "Happy to support education!", date: "2024-01-16" },
      { id: 7, donorName: "Sarah T.", amount: 250, message: "Every child deserves education.", date: "2024-01-15" },
      { id: 8, donorName: "Robert H.", amount: 100, date: "2024-01-14" },
    ],
    createdAt: "2023-12-15",
  },
  {
    id: 3,
    title: "Hurricane Relief for Florida Families",
    organizer: "Disaster Aid Network",
    category: "Emergency",
    description: "Providing immediate relief to families displaced by the recent hurricane.",
    story: "Hurricane Maria devastated the coastal communities of southern Florida, leaving thousands of families homeless. Homes were destroyed, businesses were leveled, and entire neighborhoods were submerged. We are on the ground providing emergency shelter, food, clean water, and medical supplies. The immediate needs are overwhelming. Your contribution will help us provide temporary housing, hot meals, hygiene kits, and emotional support services. We are working around the clock to ensure no family is left behind. Together, we can help these communities rebuild and recover from this catastrophic disaster.",
    imageUrl: "https://images.unsplash.com/photo-1446776877081-d282a0f896e2?w=800&h=500&fit=crop",
    goalAmount: 100000,
    raisedAmount: 87650,
    donations: [
      { id: 9, donorName: "Amanda P.", amount: 2000, message: "Thinking of all affected families.", date: "2024-01-17" },
      { id: 10, donorName: "Tech Corp Inc.", amount: 10000, message: "Our company stands with Florida.", date: "2024-01-16" },
      { id: 11, donorName: "Mark D.", amount: 75, date: "2024-01-15" },
    ],
    createdAt: "2024-01-10",
  },
  {
    id: 4,
    title: "Save the Sea Turtle Sanctuary",
    organizer: "Ocean Guardians",
    category: "Animals",
    description: "Help us protect and rehabilitate endangered sea turtles on the coast.",
    story: "Our sea turtle sanctuary has been protecting endangered species for over 15 years. We rescue injured turtles, rehabilitate them, and release them back into the ocean. This year, we face unprecedented challenges. Rising sea levels have damaged our facilities, and the number of injured turtles has doubled. We need to rebuild our rehabilitation pools, purchase new medical equipment, and hire additional marine biologists. Last year alone, we saved over 200 turtles and educated 5,000 students about ocean conservation. Help us continue this vital work for our ocean ecosystem.",
    imageUrl: "https://images.unsplash.com/photo-1437622368342-7a3d73a34c8f?w=800&h=500&fit=crop",
    goalAmount: 30000,
    raisedAmount: 18900,
    donations: [
      { id: 12, donorName: "Marine Bio Club", amount: 1500, message: "For the turtles! 🐢", date: "2024-01-14" },
      { id: 13, donorName: "Olivia S.", amount: 50, message: "Love what you do!", date: "2024-01-13" },
    ],
    createdAt: "2024-01-05",
  },
  {
    id: 5,
    title: "Community Garden for Downtown",
    organizer: "Green City Initiative",
    category: "Community",
    description: "Transform an abandoned lot into a thriving community garden for all residents.",
    story: "In the heart of downtown, there sits an abandoned lot that has been an eyesore for years. We want to transform it into a beautiful community garden where residents can grow fresh produce, host events, and build connections. The garden will feature 50 individual plots, a greenhouse, composting station, and a gathering area. We'll also run free gardening workshops and donate surplus produce to local food banks. This project will not only beautify our neighborhood but also address food insecurity and create a space for community bonding.",
    imageUrl: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800&h=500&fit=crop",
    goalAmount: 20000,
    raisedAmount: 12350,
    donations: [
      { id: 14, donorName: "City Council", amount: 3000, message: "Great initiative!", date: "2024-01-16" },
      { id: 15, donorName: "Patricia L.", amount: 100, message: "Can't wait to see it bloom!", date: "2024-01-15" },
    ],
    createdAt: "2024-01-03",
  },
  {
    id: 6,
    title: "Clean Water for Amazon Villages",
    organizer: "Pure Water Project",
    category: "Environment",
    description: "Install water purification systems in 10 remote Amazon villages.",
    story: "Deep in the Amazon rainforest, indigenous communities struggle daily to access clean drinking water. Contaminated water sources cause widespread illness, particularly among children and the elderly. Our project aims to install solar-powered water purification systems in 10 remote villages, providing clean water to over 2,000 people. Each system can purify 1,000 liters per day and lasts for 10 years with minimal maintenance. We'll also train local technicians to maintain the equipment. Clean water is a fundamental human right, and together we can make it a reality for these communities.",
    imageUrl: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&h=500&fit=crop",
    goalAmount: 45000,
    raisedAmount: 28750,
    donations: [
      { id: 16, donorName: "Water Foundation", amount: 5000, message: "Clean water saves lives.", date: "2024-01-17" },
      { id: 17, donorName: "Nathan G.", amount: 200, date: "2024-01-16" },
    ],
    createdAt: "2023-12-20",
  },
  {
    id: 7,
    title: "Youth Soccer League Equipment",
    organizer: "Coach Williams",
    category: "Sports",
    description: "Equip our inner-city youth soccer league with proper gear and uniforms.",
    story: "Our youth soccer league serves over 150 kids aged 6-16 from underserved neighborhoods. Many of these children don't have access to proper sports equipment. We need to purchase jerseys, cleats, shin guards, soccer balls, goal nets, and training cones. Beyond equipment, the funds will help us maintain our practice field and cover tournament entry fees. Sports teach discipline, teamwork, and resilience — values these kids carry with them forever. Help us give these young athletes the tools they need to succeed both on and off the field.",
    imageUrl: "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=800&h=500&fit=crop",
    goalAmount: 15000,
    raisedAmount: 9800,
    donations: [
      { id: 18, donorName: "Sports Store", amount: 2000, message: "Go team! ⚽", date: "2024-01-15" },
      { id: 19, donorName: "Parent Group", amount: 500, date: "2024-01-14" },
    ],
    createdAt: "2024-01-08",
  },
  {
    id: 8,
    title: "Independent Film: Voices Unheard",
    organizer: "Maya Chen Studios",
    category: "Creative",
    description: "Fund our documentary showcasing stories of immigrant communities in America.",
    story: "\"Voices Unheard\" is an independent documentary that tells the powerful stories of immigrant families building new lives in America. Over the past year, we've interviewed 50 families from 20 different countries. Now we need funding to complete post-production, including editing, color grading, original music scoring, and distribution. The film has already been selected for three film festival screenings. Our goal is to share these stories with the widest possible audience to foster understanding and empathy. Art has the power to bridge divides, and this film is our contribution to that mission.",
    imageUrl: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=800&h=500&fit=crop",
    goalAmount: 25000,
    raisedAmount: 16200,
    donations: [
      { id: 20, donorName: "Film Society", amount: 3000, message: "Can't wait to see this!", date: "2024-01-17" },
      { id: 21, donorName: "Alex R.", amount: 100, message: "Important stories need to be told.", date: "2024-01-16" },
    ],
    createdAt: "2024-01-02",
  },
];
