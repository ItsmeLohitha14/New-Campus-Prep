
export interface CompanyData {
  id: string;
  name: string;
  logo: string;
  description: string;
  eligibility: string;
  visitDate: string;
  roles: string[];
}

export interface FAQData {
  id: string;
  question: string;
  answer: string;
  company: string;
  type: "technical" | "hr" | "aptitude";
}

export interface UpdateData {
  id: string;
  title: string;
  content: string;
  date: string;
  isNew: boolean;
}

export interface UserData {
  id?: string;
  username: string;
  email: string;
  department?: string;
  year?: string;
  role: string;
  rollNumber?: string;
  phone?: string;
  skills?: string;
  bio?: string;
  cgpa?: string;
}

// Local storage keys
const COMPANIES_KEY = "campusprep_companies";
const FAQS_KEY = "campusprep_faqs";
const UPDATES_KEY = "campusprep_updates";
const USERS_PREFIX = "user_";

// Generate a simple ID
const generateId = () => Math.random().toString(36).substring(2, 15);

// Initialize sample data
const initializeData = () => {
  // Sample companies
  if (!localStorage.getItem(COMPANIES_KEY)) {
    const sampleCompanies: CompanyData[] = [
      {
        id: generateId(),
        name: "Google",
        logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/1024px-Google_%22G%22_Logo.svg.png",
        description: "Leading technology company specializing in internet-related services and products.",
        eligibility: "CGPA ≥ 8.5, No backlogs",
        visitDate: "10 Jun 2025",
        roles: ["SDE", "Data Scientist", "Product Manager"]
      },
      {
        id: generateId(),
        name: "Microsoft",
        logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Microsoft_logo.svg/2048px-Microsoft_logo.svg.png",
        description: "Global technology corporation that develops, manufactures, licenses, and sells computer software.",
        eligibility: "CGPA ≥ 8.0, No backlogs",
        visitDate: "15 Jun 2025",
        roles: ["Software Engineer", "Cloud Engineer", "UX Designer"]
      },
      {
        id: generateId(),
        name: "Amazon",
        logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/2560px-Amazon_logo.svg.png",
        description: "American multinational tech company focusing on e-commerce, cloud computing, and AI.",
        eligibility: "CGPA ≥ 7.5, Max 2 backlogs",
        visitDate: "22 Jun 2025",
        roles: ["SDE", "Business Analyst", "Operations"]
      }
    ];
    localStorage.setItem(COMPANIES_KEY, JSON.stringify(sampleCompanies));
  }

  // Sample FAQs
  if (!localStorage.getItem(FAQS_KEY)) {
    const sampleFaqs: FAQData[] = [
      {
        id: generateId(),
        question: "What is the time complexity of QuickSort algorithm?",
        answer: "The average time complexity of QuickSort is O(n log n), but in the worst case, it can be O(n²).",
        company: "Google",
        type: "technical"
      },
      {
        id: generateId(),
        question: "Explain the difference between REST and GraphQL.",
        answer: "REST is an architectural style for designing networked applications using standard HTTP methods. GraphQL is a query language for APIs.",
        company: "Microsoft",
        type: "technical"
      },
      {
        id: generateId(),
        question: "Tell us about a challenging situation in a team project.",
        answer: "During my last internship, our team was working on a critical feature with a tight deadline...",
        company: "Amazon",
        type: "hr"
      }
    ];
    localStorage.setItem(FAQS_KEY, JSON.stringify(sampleFaqs));
  }

  // Sample Updates
  if (!localStorage.getItem(UPDATES_KEY)) {
    const sampleUpdates: UpdateData[] = [
      {
        id: generateId(),
        title: "Google Recruitment Drive Announced",
        content: "Google will be conducting an on-campus recruitment drive for 2025 batch students. Register before May 30.",
        date: "15 May 2025",
        isNew: true
      },
      {
        id: generateId(),
        title: "Pre-Placement Talk: Microsoft",
        content: "Microsoft will be conducting a pre-placement talk on June 5. Mandatory for all registered students.",
        date: "01 Jun 2025",
        isNew: true
      },
      {
        id: generateId(),
        title: "Resume Building Workshop",
        content: "Learn how to create an impressive resume that will catch the recruiter's eye.",
        date: "25 May 2025",
        isNew: false
      }
    ];
    localStorage.setItem(UPDATES_KEY, JSON.stringify(sampleUpdates));
  }
};

// Company operations
export const getCompanies = (): CompanyData[] => {
  initializeData();
  return JSON.parse(localStorage.getItem(COMPANIES_KEY) || "[]");
};

export const addCompany = (company: Omit<CompanyData, "id">): CompanyData => {
  const companies = getCompanies();
  const newCompany = { ...company, id: generateId() };
  companies.push(newCompany);
  localStorage.setItem(COMPANIES_KEY, JSON.stringify(companies));
  return newCompany;
};

export const getCompanyById = (id: string): CompanyData | undefined => {
  const companies = getCompanies();
  return companies.find(c => c.id === id);
};

export const deleteCompany = (id: string): boolean => {
  const companies = getCompanies();
  const filteredCompanies = companies.filter(c => c.id !== id);
  localStorage.setItem(COMPANIES_KEY, JSON.stringify(filteredCompanies));
  return filteredCompanies.length !== companies.length;
};

// FAQ operations
export const getFaqs = (): FAQData[] => {
  initializeData();
  return JSON.parse(localStorage.getItem(FAQS_KEY) || "[]");
};

export const addFaq = (faq: Omit<FAQData, "id">): FAQData => {
  const faqs = getFaqs();
  const newFaq = { ...faq, id: generateId() };
  faqs.push(newFaq);
  localStorage.setItem(FAQS_KEY, JSON.stringify(faqs));
  return newFaq;
};

export const deleteFaq = (id: string): boolean => {
  const faqs = getFaqs();
  const filteredFaqs = faqs.filter(f => f.id !== id);
  localStorage.setItem(FAQS_KEY, JSON.stringify(filteredFaqs));
  return filteredFaqs.length !== faqs.length;
};

// Update operations
export const getUpdates = (): UpdateData[] => {
  initializeData();
  return JSON.parse(localStorage.getItem(UPDATES_KEY) || "[]");
};

export const addUpdate = (update: Omit<UpdateData, "id">): UpdateData => {
  const updates = getUpdates();
  const newUpdate = { ...update, id: generateId() };
  updates.push(newUpdate);
  localStorage.setItem(UPDATES_KEY, JSON.stringify(updates));
  return newUpdate;
};

export const deleteUpdate = (id: string): boolean => {
  const updates = getUpdates();
  const filteredUpdates = updates.filter(u => u.id !== id);
  localStorage.setItem(UPDATES_KEY, JSON.stringify(filteredUpdates));
  return filteredUpdates.length !== updates.length;
};

// User operations
export const getAllUsers = (): UserData[] => {
  const users: UserData[] = [];
  
  // Admin user is not included in the returned list
  // Get all user_ keys
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key && key.startsWith(USERS_PREFIX)) {
      try {
        const userData = JSON.parse(localStorage.getItem(key) || "");
        if (userData && userData.role === "student") {
          users.push(userData);
        }
      } catch (e) {
        console.error("Error parsing user data:", e);
      }
    }
  }
  
  return users;
};

export const getUserById = (id: string): UserData | null => {
  try {
    const userData = localStorage.getItem(`${USERS_PREFIX}${id}`);
    return userData ? JSON.parse(userData) : null;
  } catch (e) {
    console.error("Error getting user:", e);
    return null;
  }
};

export const addUser = (user: UserData): UserData => {
  const id = user.id || generateId();
  const newUser = { ...user, id };
  localStorage.setItem(`${USERS_PREFIX}${id}`, JSON.stringify(newUser));
  return newUser;
};

export const deleteUser = (id: string): boolean => {
  try {
    localStorage.removeItem(`${USERS_PREFIX}${id}`);
    return true;
  } catch (e) {
    console.error("Error deleting user:", e);
    return false;
  }
};

// Initialize data
initializeData();
