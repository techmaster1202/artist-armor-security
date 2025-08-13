import { Notification } from "../../constants/interface/notification";

export const notifications: Notification[] = [
  {
    createdAt: "2025-01-01T08:00:00Z",
    message: "Your frequest has been confirmed.",
    route: "/bookings/12345",
    seen: false,
    updatedAt: "2025-01-01T08:00:00Z",
    _id: "notif1",
  },
  {
    createdAt: "2025-01-01T09:15:30Z",
    message: "A new update is available for the app.",
    route: "/updates",
    seen: true,
    updatedAt: "2025-01-01T09:20:00Z",
    _id: "notif2",
  },
  {
    createdAt: "2025-01-01T10:45:00Z",
    message: "Your password has been successfully changed.",
    route: "/settings/security",
    seen: false,
    updatedAt: "2025-01-01T10:45:00Z",
    _id: "notif3",
  },
  {
    createdAt: "2025-01-01T11:30:00Z",
    message: "Your profile has been updated.",
    route: "/profile",
    seen: true,
    updatedAt: "2025-01-01T11:35:00Z",
    _id: "notif4",
  },
  {
    createdAt: "2025-01-01T12:00:00Z",
    message: "You have a new message from customer support.",
    route: "/messages/support",
    seen: false,
    updatedAt: "2025-01-01T12:05:00Z",
    _id: "notif5",
  },
];

// Review data type
export type Review = {
  id: string;
  customerCode: string;
  customerName: string;
  date: string;
  rating: number;
  comment: string;
  tags: string[];
  status: "archived" | "approved";
};

// Sample review data
export const reviews: Review[] = [
  {
    id: "C01234",
    customerCode: "#C01234",
    customerName: "James Sullivan",
    date: "26/04/2020, 12:42 AM",
    rating: 5.0,
    comment: "Josh, Luner and everyone at Just Property in Hastings deserved a big Thank You from us for moving us from Jakarta to Medan during the lockdown.",
    tags: ["EXCELLENT", "GREAT", "BEST SERVICE"],
    status: "archived",
  },
  {
    id: "C01235",
    customerCode: "#C01235",
    customerName: "Deborah Saragi",
    date: "26/04/2020, 12:42 AM",
    rating: 3.0,
    comment: "Dealing with Syamsudin and Balri was a joy. I got in touch with Just Property after seeing a couple of properties that caught my eye. Both Syamsudin and Balri strive to deliver a professional service and surpassed my expectations - they went not only help...",
    tags: ["BAD SERVICE", "UNEXPECTED"],
    status: "archived",
  },
  {
    id: "C01236",
    customerCode: "#C01236",
    customerName: "David Here",
    date: "26/04/2020, 12:42 AM",
    rating: 4.0,
    comment: "I viewed a number of properties with Just Property and found them to be professional, efficient, patient, courteous and helpful every time.",
    tags: ["BEST SERVICE", "EXCELLENT"],
    status: "approved",
  },
  {
    id: "C01237",
    customerCode: "#C01237",
    customerName: "Angela Moss",
    date: "26/04/2020, 12:42 AM",
    rating: 2.0,
    comment: "I used Just Property for the sale of my late mother's property. From the off they were very confident and enthusiastic about finding a buyer, and I wasn't disappointed - within a very short time of marketing the house they told me they had a buye...",
    tags: ["EXCELLENT", "GREAT", "BEST SERVICE"],
    status: "archived",
  },
  {
    id: "C01238",
    customerCode: "#C01238",
    customerName: "Jean Munaroh",
    date: "26/04/2020, 12:42 AM",
    rating: 4.0,
    comment: "I viewed a number of properties with Just Property and found them to be professional, efficient, patient, courteous and helpful every time.",
    tags: ["BEST SERVICE", "EXCELLENT"],
    status: "archived",
  },
  {
    id: "C01239",
    customerCode: "#C01239",
    customerName: "Michael Johnson",
    date: "27/04/2020, 10:15 AM",
    rating: 4.5,
    comment: "The team at Just Property made my first home purchase a breeze. They were responsive, knowledgeable, and guided me through every step of the process.",
    tags: ["EXCELLENT", "GREAT"],
    status: "approved",
  },
  {
    id: "C01240",
    customerCode: "#C01240",
    customerName: "Sarah Williams",
    date: "28/04/2020, 2:30 PM",
    rating: 3.5,
    comment: "Overall good experience with Just Property. There were some communication issues initially, but they were quickly resolved and the rest of the process went smoothly.",
    tags: ["GREAT"],
    status: "archived",
  },
  {
    id: "C01241",
    customerCode: "#C01241",
    customerName: "Robert Chen",
    date: "29/04/2020, 9:20 AM",
    rating: 5.0,
    comment: "Exceptional service from start to finish! The Just Property team went above and beyond to help me find my dream home. I couldn't be happier with my experience.",
    tags: ["EXCELLENT", "BEST SERVICE"],
    status: "approved",
  },
  {
    id: "C01242",
    customerCode: "#C01242",
    customerName: "Emily Parker",
    date: "30/04/2020, 4:45 PM",
    rating: 2.5,
    comment: "The property was not as described in the listing. There were several maintenance issues that weren't disclosed. The agent was helpful but the property itself was disappointing.",
    tags: ["UNEXPECTED", "BAD SERVICE"],
    status: "archived",
  },
  {
    id: "C01243",
    customerCode: "#C01243",
    customerName: "Thomas Wilson",
    date: "01/05/2020, 11:10 AM",
    rating: 4.0,
    comment: "Just Property provided excellent customer service throughout my rental process. They were always available to answer questions and address concerns.",
    tags: ["GREAT", "BEST SERVICE"],
    status: "approved",
  },
  {
    id: "C01244",
    customerCode: "#C01244",
    customerName: "Lisa Rodriguez",
    date: "02/05/2020, 3:25 PM",
    rating: 3.0,
    comment: "Average experience with Just Property. The process took longer than expected, but the staff was friendly and tried their best to accommodate our needs.",
    tags: ["UNEXPECTED"],
    status: "archived",
  },
  {
    id: "C01245",
    customerCode: "#C01245",
    customerName: "Daniel Kim",
    date: "03/05/2020, 10:50 AM",
    rating: 5.0,
    comment: "Just Property made selling my home a stress-free experience. Their market knowledge and negotiation skills helped me get the best possible price.",
    tags: ["EXCELLENT", "BEST SERVICE"],
    status: "approved",
  },
  {
    id: "C01246",
    customerCode: "#C01246",
    customerName: "Jennifer Lopez",
    date: "04/05/2020, 1:15 PM",
    rating: 1.5,
    comment: "Very disappointed with the service. Multiple showings were canceled last minute, and communication was poor throughout the entire process.",
    tags: ["BAD SERVICE"],
    status: "archived",
  },
  {
    id: "C01247",
    customerCode: "#C01247",
    customerName: "Christopher Davis",
    date: "05/05/2020, 9:30 AM",
    rating: 4.5,
    comment: "Just Property's team was professional and efficient. They understood exactly what I was looking for and found me the perfect property within my budget.",
    tags: ["EXCELLENT", "GREAT"],
    status: "approved",
  },
  {
    id: "C01248",
    customerCode: "#C01248",
    customerName: "Amanda Taylor",
    date: "06/05/2020, 2:40 PM",
    rating: 3.5,
    comment: "Decent experience with Just Property. The property viewing process was well-organized, but there were some delays with paperwork processing.",
    tags: ["GREAT", "UNEXPECTED"],
    status: "archived",
  },
  {
    id: "C01249",
    customerCode: "#C01249",
    customerName: "Matthew Brown",
    date: "07/05/2020, 11:05 AM",
    rating: 4.0,
    comment: "Just Property provided excellent guidance throughout my first rental experience. They were patient with all my questions and made the process easy to understand.",
    tags: ["BEST SERVICE", "GREAT"],
    status: "approved",
  },
  {
    id: "C01250",
    customerCode: "#C01250",
    customerName: "Olivia Martinez",
    date: "08/05/2020, 4:20 PM",
    rating: 2.0,
    comment: "The property management aspect of Just Property needs improvement. Maintenance requests took too long to address, and follow-up communication was lacking.",
    tags: ["BAD SERVICE", "UNEXPECTED"],
    status: "archived",
  },
  {
    id: "C01251",
    customerCode: "#C01251",
    customerName: "William Thompson",
    date: "09/05/2020, 10:35 AM",
    rating: 5.0,
    comment: "Just Property exceeded all my expectations! Their attention to detail and personalized service made my property search enjoyable and successful.",
    tags: ["EXCELLENT", "BEST SERVICE"],
    status: "approved",
  },
  {
    id: "C01252",
    customerCode: "#C01252",
    customerName: "Sophia Garcia",
    date: "10/05/2020, 3:55 PM",
    rating: 3.0,
    comment: "Mixed experience with Just Property. The initial consultation was great, but there were some inconsistencies in the information provided about the properties.",
    tags: ["UNEXPECTED", "GREAT"],
    status: "archived",
  },
  {
    id: "C01253",
    customerCode: "#C01253",
    customerName: "Andrew Wilson",
    date: "11/05/2020, 9:45 AM",
    rating: 4.5,
    comment: "Just Property's market knowledge is impressive. They helped me price my property correctly, resulting in a quick sale at a great price. Highly recommended!",
    tags: ["EXCELLENT", "BEST SERVICE"],
    status: "approved",
  }
];

// Tag options for filtering
export const tagOptions = [
  { label: "BAD SERVICE", value: "BAD SERVICE" },
  { label: "UNEXPECTED", value: "UNEXPECTED" },
  { label: "GREAT", value: "GREAT" },
  { label: "EXCELLENT", value: "EXCELLENT" },
  { label: "BEST SERVICE", value: "BEST SERVICE" },
];

// Age options for filtering
export const ages = [
  { label: "18-25", value: "18-25" },
  { label: "26-35", value: "26-35" },
  { label: "36-45", value: "36-45" },
  { label: "46-55", value: "46-55" },
  { label: "56+", value: "56+" },
];

// Mock members data
export const members = [
  {
    _id: "1",
    name: "John Doe",
    email: "john.doe@example.com",
    role: "admin",
    status: "active" as const,
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
  },
  {
    _id: "2",
    name: "Jane Smith",
    email: "jane.smith@example.com",
    role: "user",
    status: "active" as const,
    createdAt: "2024-01-02T00:00:00Z",
    updatedAt: "2024-01-02T00:00:00Z",
  },
];

// Mock profile data
export const profileMockData = {
  _id: "1",
  name: "John Doe",
  fullName: "John Doe",
  email: "john.doe@example.com",
  avatar: "/path/to/avatar.jpg",
  bio: "Software developer with 5+ years of experience",
  location: "New York, NY",
  website: "https://johndoe.com",
  socialLinks: {
    twitter: "https://twitter.com/johndoe",
    linkedin: "https://linkedin.com/in/johndoe",
    github: "https://github.com/johndoe",
  },
  createdAt: "2024-01-01T00:00:00Z",
  updatedAt: "2024-01-01T00:00:00Z",
};