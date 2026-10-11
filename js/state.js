/**
 * TALL PINES SCHOOL — SHEIKHUPURA
 * Core Relational Database & State Store
 * Developer Credit Watermark: Design by Saima Mushtaq (saimbakar90@gmail.com)
 */

const STORAGE_KEY = 'TPS_SHEIKHUPURA_ERP_V2';

const DEFAULT_SCHOOL_SETTINGS = {
  name: 'TALL PINES SCHOOL',
  campus: 'HIRAN MINAR CAMPUS — SHEIKHUPURA',
  tagline: 'Excellence & Integrity — Hiran Minar Campus',
  address: 'Hiran Minar Road, Sheikhupura, Punjab, Pakistan',
  phone: '+92 56 3781200 / +92 300 8475910',
  email: 'info@tallpinesschool.edu.pk',
  website: 'www.tallpinesschool.edu.pk',
  regNo: 'SED-SKP/REG/2012-489',
  affiliation: 'Affiliated with BISE Lahore & Cambridge Assessment',
  logoUrl: 'assets/logo.png',
  stampUrl: 'assets/stamp.png',
  faviconUrl: 'assets/logo.png',
  primaryColor: '#1b2767',
  secondaryColor: '#2563eb',
  activeSession: '2026-2027',
  developerCredit: 'Design by Saima Mushtaq (saimbakar90@gmail.com)',
  letterhead: {
    fontFamily: 'Outfit, sans-serif',
    headerStyle: 'standard',
    watermarkOpacity: 0.05,
    marginMm: 15,
    showStamp: true,
    showSignature: true,
    principalName: 'Prof. Muhammad Arshad Nadeem',
    principalTitle: 'Principal & Head of Institution'
  },
  aiConfig: {
    provider: 'gemini',
    apiKey: '',
    modelName: 'gemini-flash-latest',
    temperature: 0.7
  }
};

const DEFAULT_USERS = [
  { id: 'usr-1', username: 'superadmin', name: 'Saima Mushtaq', role: 'Super Admin', email: 'saimbakar90@gmail.com', avatar: 'SM' },
  { id: 'usr-2', username: 'admin', name: 'Rana Zulfiqar Ali', role: 'School Admin', email: 'admin@tallpinesschool.edu.pk', avatar: 'ZA' },
  { id: 'usr-3', username: 'principal', name: 'Prof. Muhammad Arshad Nadeem', role: 'Principal', email: 'principal@tallpinesschool.edu.pk', avatar: 'AN' },
  { id: 'usr-4', username: 'vp', name: 'Mrs. Bushra Tahir', role: 'Vice Principal', email: 'vp@tallpinesschool.edu.pk', avatar: 'BT' },
  { id: 'usr-5', username: 'accountant', name: 'Malik Tanveer Ahmad', role: 'Accountant', email: 'accounts@tallpinesschool.edu.pk', avatar: 'TA' },
  { id: 'usr-6', username: 'teacher1', name: 'Sir Tariq Mahmood', role: 'Teacher', email: 'tariq@tallpinesschool.edu.pk', avatar: 'TM', subject: 'Mathematics' },
  { id: 'usr-7', username: 'teacher2', name: 'Ma\'am Sadia Khan', role: 'Teacher', email: 'sadia@tallpinesschool.edu.pk', avatar: 'SK', subject: 'English & Urdu' },
  { id: 'usr-8', username: 'student1', name: 'Muhammad Hamza Khan', role: 'Student', email: 'hamza.k@student.tallpines.edu.pk', avatar: 'HK', studentId: 'STD-1001' },
  { id: 'usr-9', username: 'parent1', name: 'Dr. Tariq Jamil Khan', role: 'Parent', email: 'tariq.khan@gmail.com', avatar: 'TJ', linkedStudentIds: ['STD-1001', 'STD-1004'] },
  { id: 'usr-10', username: 'reception', name: 'Fatima Zahra', role: 'Reception', email: 'frontdesk@tallpinesschool.edu.pk', avatar: 'FZ' },
  { id: 'usr-11', username: 'librarian', name: 'Syed Qasim Ali', role: 'Librarian', email: 'library@tallpinesschool.edu.pk', avatar: 'QA' },
  { id: 'usr-12', username: 'hr', name: 'Ammar Yasir', role: 'HR', email: 'hr@tallpinesschool.edu.pk', avatar: 'AY' }
];

const DEFAULT_CLASSES = [
  { id: 'cls-1', name: 'Nursery', level: 'Early Years', sections: ['Pine A', 'Pine B'] },
  { id: 'cls-2', name: 'Prep', level: 'Early Years', sections: ['Pine A', 'Pine B'] },
  { id: 'cls-3', name: 'Grade 1', level: 'Primary', sections: ['Pine A', 'Cedar'] },
  { id: 'cls-4', name: 'Grade 2', level: 'Primary', sections: ['Pine A', 'Cedar'] },
  { id: 'cls-5', name: 'Grade 3', level: 'Primary', sections: ['Pine A', 'Cedar'] },
  { id: 'cls-6', name: 'Grade 4', level: 'Primary', sections: ['Pine A', 'Cedar'] },
  { id: 'cls-7', name: 'Grade 5', level: 'Primary', sections: ['Pine A', 'Cedar'] },
  { id: 'cls-8', name: 'Grade 6', level: 'Middle', sections: ['Pine A', 'Oak'] },
  { id: 'cls-9', name: 'Grade 7', level: 'Middle', sections: ['Pine A', 'Oak'] },
  { id: 'cls-10', name: 'Grade 8', level: 'Middle', sections: ['Pine A', 'Oak'] },
  { id: 'cls-11', name: 'Grade 9', level: 'Secondary (Matric)', sections: ['Science A', 'Science B'] },
  { id: 'cls-12', name: 'Grade 10', level: 'Secondary (Matric)', sections: ['Science A', 'Computer'] }
];

const DEFAULT_SUBJECTS = [
  { id: 'sub-1', name: 'English Language & Lit', code: 'ENG-101', marks: 100 },
  { id: 'sub-2', name: 'Urdu Literature', code: 'URD-102', marks: 100 },
  { id: 'sub-3', name: 'Mathematics', code: 'MTH-103', marks: 100 },
  { id: 'sub-4', name: 'General Science', code: 'SCI-104', marks: 100 },
  { id: 'sub-5', name: 'Physics', code: 'PHY-201', marks: 75 },
  { id: 'sub-6', name: 'Chemistry', code: 'CHM-202', marks: 75 },
  { id: 'sub-7', name: 'Biology', code: 'BIO-203', marks: 75 },
  { id: 'sub-8', name: 'Computer Science', code: 'CSC-204', marks: 75 },
  { id: 'sub-9', name: 'Islamiyat & Ethics', code: 'ISL-105', marks: 50 },
  { id: 'sub-10', name: 'Pakistan Studies', code: 'PST-106', marks: 50 }
];

const DEFAULT_STUDENTS = [
  {
    id: 'STD-1001',
    admissionNo: 'TPS/2026/0142',
    rollNo: '10',
    name: 'Muhammad Hamza Khan',
    gender: 'Male',
    dob: '2011-04-12',
    bForm: '35401-8492019-3',
    fatherName: 'Dr. Tariq Jamil Khan',
    motherName: 'Dr. Samina Tariq',
    guardianContact: '0300-8472911',
    emergencyContact: '0321-4829104',
    address: 'House # 42, Civil Lines, Sheikhupura',
    class: 'Grade 9',
    section: 'Science A',
    session: '2026-2027',
    admissionDate: '2022-04-10',
    previousSchool: 'Army Public School',
    medicalInfo: 'No known allergies, spectacles for distant vision',
    bloodGroup: 'B+',
    status: 'Active',
    siblingIds: ['STD-1004'],
    attendancePercent: 96.4,
    photo: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80'
  },
  {
    id: 'STD-1002',
    admissionNo: 'TPS/2026/0143',
    rollNo: '12',
    name: 'Ayesha Fatima Sheikh',
    gender: 'Female',
    dob: '2012-08-19',
    bForm: '35401-9238471-4',
    fatherName: 'Sheikh Waqas Munir',
    motherName: 'Farzana Waqas',
    guardianContact: '0301-4928172',
    emergencyContact: '0333-8271629',
    address: 'Street # 5, Canal View Colony, Sheikhupura',
    class: 'Grade 9',
    section: 'Science A',
    session: '2026-2027',
    admissionDate: '2023-03-15',
    previousSchool: 'Beaconhouse Sheikhupura',
    medicalInfo: 'None',
    bloodGroup: 'O+',
    status: 'Active',
    siblingIds: [],
    attendancePercent: 98.2,
    photo: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80'
  },
  {
    id: 'STD-1003',
    admissionNo: 'TPS/2026/0144',
    rollNo: '15',
    name: 'Zain Ul Abideen',
    gender: 'Male',
    dob: '2011-11-05',
    bForm: '35401-4729103-1',
    fatherName: 'Chaudhry Riaz Gujjar',
    motherName: 'Nasreen Riaz',
    guardianContact: '0322-8192033',
    emergencyContact: '0300-9182736',
    address: 'Chaudhry Farmhouse, Lahore Road, Sheikhupura',
    class: 'Grade 9',
    section: 'Science A',
    session: '2026-2027',
    admissionDate: '2021-04-01',
    previousSchool: 'The Educators SKP',
    medicalInfo: 'Mild asthma in winter (inhaler available)',
    bloodGroup: 'A+',
    status: 'Active',
    siblingIds: [],
    attendancePercent: 91.5,
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80'
  },
  {
    id: 'STD-1004',
    admissionNo: 'TPS/2026/0198',
    rollNo: '04',
    name: 'Fatima Tariq Khan',
    gender: 'Female',
    dob: '2015-06-22',
    bForm: '35401-8492020-6',
    fatherName: 'Dr. Tariq Jamil Khan',
    motherName: 'Dr. Samina Tariq',
    guardianContact: '0300-8472911',
    emergencyContact: '0321-4829104',
    address: 'House # 42, Civil Lines, Sheikhupura',
    class: 'Grade 5',
    section: 'Pine A',
    session: '2026-2027',
    admissionDate: '2024-04-05',
    previousSchool: 'Tall Pines Nursery',
    medicalInfo: 'None',
    bloodGroup: 'B+',
    status: 'Active',
    siblingIds: ['STD-1001'],
    attendancePercent: 97.0,
    photo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80'
  },
  {
    id: 'STD-1005',
    admissionNo: 'TPS/2026/0201',
    rollNo: '08',
    name: 'Bilal Hassan Cheema',
    gender: 'Male',
    dob: '2010-02-14',
    bForm: '35401-6102938-5',
    fatherName: 'Hassan Cheema',
    motherName: 'Tahira Hassan',
    guardianContact: '0305-6718290',
    emergencyContact: '0300-4567890',
    address: 'Wapda Town Phase 1, Sheikhupura',
    class: 'Grade 10',
    section: 'Science A',
    session: '2026-2027',
    admissionDate: '2020-04-10',
    previousSchool: 'Tall Pines School',
    medicalInfo: 'None',
    bloodGroup: 'AB+',
    status: 'Active',
    siblingIds: [],
    attendancePercent: 88.0,
    photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80'
  },
  {
    id: 'STD-1006',
    admissionNo: 'TPS/2026/0205',
    rollNo: '18',
    name: 'Zoya Kashif Mir',
    gender: 'Female',
    dob: '2014-09-30',
    bForm: '35401-7890123-2',
    fatherName: 'Kashif Mir',
    motherName: 'Saima Mir',
    guardianContact: '0334-9081726',
    emergencyContact: '0321-7654321',
    address: 'Model Town, Gujranwala Road, Sheikhupura',
    class: 'Grade 6',
    section: 'Pine A',
    session: '2026-2027',
    admissionDate: '2023-04-10',
    previousSchool: 'Lahore Grammar School',
    medicalInfo: 'None',
    bloodGroup: 'O-',
    status: 'Active',
    siblingIds: [],
    attendancePercent: 95.8,
    photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80'
  }
];

const DEFAULT_STAFF = [
  {
    id: 'STF-101',
    empNo: 'TPS-EMP-001',
    name: 'Prof. Muhammad Arshad Nadeem',
    role: 'Principal',
    department: 'Administration',
    designation: 'Principal & Executive Head',
    qualification: 'M.Phil Education, M.Sc Physics (Pb)',
    phone: '0300-8475910',
    email: 'principal@tallpinesschool.edu.pk',
    joiningDate: '2015-08-01',
    basicSalary: 185000,
    allowances: 35000,
    status: 'Active'
  },
  {
    id: 'STF-102',
    empNo: 'TPS-EMP-008',
    name: 'Mrs. Bushra Tahir',
    role: 'Vice Principal',
    department: 'Academics',
    designation: 'Vice Principal & Headmistress',
    qualification: 'M.A English, B.Ed (Gold Medalist)',
    phone: '0302-9847162',
    email: 'vp@tallpinesschool.edu.pk',
    joiningDate: '2017-02-15',
    basicSalary: 125000,
    allowances: 20000,
    status: 'Active'
  },
  {
    id: 'STF-103',
    empNo: 'TPS-EMP-014',
    name: 'Sir Tariq Mahmood',
    role: 'Teacher',
    department: 'Mathematics & Science',
    designation: 'Senior Master (Mathematics)',
    qualification: 'M.Sc Mathematics, B.Ed',
    phone: '0301-7649201',
    email: 'tariq@tallpinesschool.edu.pk',
    joiningDate: '2019-03-01',
    basicSalary: 85000,
    allowances: 12000,
    status: 'Active'
  },
  {
    id: 'STF-104',
    empNo: 'TPS-EMP-019',
    name: 'Ma\'am Sadia Khan',
    role: 'Teacher',
    department: 'Languages',
    designation: 'Senior Mistress (English)',
    qualification: 'M.A English Linguistics, CELTA',
    phone: '0321-6549870',
    email: 'sadia@tallpinesschool.edu.pk',
    joiningDate: '2020-09-01',
    basicSalary: 78000,
    allowances: 10000,
    status: 'Active'
  },
  {
    id: 'STF-105',
    empNo: 'TPS-EMP-022',
    name: 'Malik Tanveer Ahmad',
    role: 'Accountant',
    department: 'Finance & Accounts',
    designation: 'Chief Accountant & Bursar',
    qualification: 'M.Com, PIPFA',
    phone: '0300-4321987',
    email: 'accounts@tallpinesschool.edu.pk',
    joiningDate: '2018-06-10',
    basicSalary: 92000,
    allowances: 15000,
    status: 'Active'
  }
];

const DEFAULT_ADMISSIONS = [
  {
    id: 'ADM-2026-001',
    applicantName: 'Abdullah Rizwan',
    fatherName: 'Rizwan Ullah',
    applyingClass: 'Grade 6',
    contact: '0300-7612984',
    appliedDate: '2026-09-15',
    testScore: '88/100',
    interviewStatus: 'Passed',
    status: 'Selected',
    feeStatus: 'Challan Issued',
    remarks: 'Strong foundation in Mathematics and English'
  },
  {
    id: 'ADM-2026-002',
    applicantName: 'Eshal Mansoor',
    fatherName: 'Mansoor Haider',
    applyingClass: 'Nursery',
    contact: '0321-9874561',
    appliedDate: '2026-09-20',
    testScore: 'Evaluation Done',
    interviewStatus: 'Recommended',
    status: 'Approved',
    feeStatus: 'Paid',
    remarks: 'Admission confirmed; Roll No allocated'
  },
  {
    id: 'ADM-2026-003',
    applicantName: 'Daniyal Babar',
    fatherName: 'Babar Azam Ch',
    applyingClass: 'Grade 9 (Science)',
    contact: '0304-5678901',
    appliedDate: '2026-10-02',
    testScore: '74/100',
    interviewStatus: 'Scheduled (10 Oct 2026)',
    status: 'Pending',
    feeStatus: 'Unpaid',
    remarks: 'Awaiting formal interview with Vice Principal'
  }
];

const DEFAULT_FEE_VOUCHERS = [
  {
    challanNo: 'CH-2026-1001',
    studentId: 'STD-1001',
    studentName: 'Muhammad Hamza Khan',
    class: 'Grade 9',
    section: 'Science A',
    month: 'October 2026',
    issueDate: '2026-10-01',
    dueDate: '2026-10-15',
    tuitionFee: 12500,
    annualCharges: 0,
    labExamFee: 1200,
    arrears: 0,
    discountSibling: 2500, // 20% sibling discount
    lateFine: 500,
    netPayable: 11200,
    status: 'Paid',
    paidDate: '2026-10-04',
    paymentMode: 'Bank Transfer (Meezan Bank)',
    receiptNo: 'REC-SKP-9081'
  },
  {
    challanNo: 'CH-2026-1002',
    studentId: 'STD-1002',
    studentName: 'Ayesha Fatima Sheikh',
    class: 'Grade 9',
    section: 'Science A',
    month: 'October 2026',
    issueDate: '2026-10-01',
    dueDate: '2026-10-15',
    tuitionFee: 12500,
    annualCharges: 0,
    labExamFee: 1200,
    arrears: 0,
    discountSibling: 0,
    lateFine: 500,
    netPayable: 13700,
    status: 'Pending',
    paidDate: null,
    paymentMode: null,
    receiptNo: null
  },
  {
    challanNo: 'CH-2026-1003',
    studentId: 'STD-1003',
    studentName: 'Zain Ul Abideen',
    class: 'Grade 9',
    section: 'Science A',
    month: 'October 2026',
    issueDate: '2026-10-01',
    dueDate: '2026-10-15',
    tuitionFee: 12500,
    annualCharges: 0,
    labExamFee: 1200,
    arrears: 13700, // Defaulter with 1 month arrears
    discountSibling: 0,
    lateFine: 500,
    netPayable: 27400,
    status: 'Defaulter',
    paidDate: null,
    paymentMode: null,
    receiptNo: null
  },
  {
    challanNo: 'CH-2026-1004',
    studentId: 'STD-1004',
    studentName: 'Fatima Tariq Khan',
    class: 'Grade 5',
    section: 'Pine A',
    month: 'October 2026',
    issueDate: '2026-10-01',
    dueDate: '2026-10-15',
    tuitionFee: 9500,
    annualCharges: 0,
    labExamFee: 800,
    arrears: 0,
    discountSibling: 1900,
    lateFine: 500,
    netPayable: 8400,
    status: 'Paid',
    paidDate: '2026-10-04',
    paymentMode: 'Cash (School Counter)',
    receiptNo: 'REC-SKP-9082'
  }
];

const DEFAULT_EXAMS = [
  {
    id: 'EXM-2026-MID',
    title: 'Mid-Term Examinations 2026',
    session: '2026-2027',
    startDate: '2026-10-20',
    endDate: '2026-10-31',
    status: 'Scheduled',
    classes: ['Grade 6', 'Grade 7', 'Grade 8', 'Grade 9', 'Grade 10']
  },
  {
    id: 'EXM-2026-TERM1',
    title: 'First Term Examination 2026',
    session: '2026-2027',
    startDate: '2026-06-05',
    endDate: '2026-06-15',
    status: 'Completed',
    classes: ['Grade 1', 'Grade 2', 'Grade 3', 'Grade 4', 'Grade 5', 'Grade 6', 'Grade 7', 'Grade 8', 'Grade 9', 'Grade 10']
  }
];

const DEFAULT_RESULTS = [
  {
    studentId: 'STD-1001',
    examId: 'EXM-2026-TERM1',
    class: 'Grade 9',
    section: 'Science A',
    scores: [
      { subject: 'English Language & Lit', totalMarks: 100, passMarks: 40, obtained: 92, grade: 'A+' },
      { subject: 'Urdu Literature', totalMarks: 100, passMarks: 40, obtained: 88, grade: 'A+' },
      { subject: 'Mathematics', totalMarks: 100, passMarks: 40, obtained: 98, grade: 'A+' },
      { subject: 'Physics', totalMarks: 75, passMarks: 30, obtained: 71, grade: 'A+' },
      { subject: 'Chemistry', totalMarks: 75, passMarks: 30, obtained: 68, grade: 'A+' },
      { subject: 'Biology', totalMarks: 75, passMarks: 30, obtained: 70, grade: 'A+' },
      { subject: 'Islamiyat & Ethics', totalMarks: 50, passMarks: 20, obtained: 48, grade: 'A+' },
      { subject: 'Pakistan Studies', totalMarks: 50, passMarks: 20, obtained: 47, grade: 'A+' }
    ],
    totalMarks: 625,
    obtainedMarks: 582,
    percentage: 93.12,
    grade: 'A+',
    gpa: 4.0,
    classPosition: '1st Position',
    attendanceRemarks: 'Exemplary Attendance (97%)',
    principalRemarks: 'Outstanding academic performance and conduct. Well done!',
    classTeacherRemarks: 'Diligent, highly analytical, and active participant in class discussions.'
  },
  {
    studentId: 'STD-1002',
    examId: 'EXM-2026-TERM1',
    class: 'Grade 9',
    section: 'Science A',
    scores: [
      { subject: 'English Language & Lit', totalMarks: 100, passMarks: 40, obtained: 94, grade: 'A+' },
      { subject: 'Urdu Literature', totalMarks: 100, passMarks: 40, obtained: 91, grade: 'A+' },
      { subject: 'Mathematics', totalMarks: 100, passMarks: 40, obtained: 92, grade: 'A+' },
      { subject: 'Physics', totalMarks: 75, passMarks: 30, obtained: 69, grade: 'A+' },
      { subject: 'Chemistry', totalMarks: 75, passMarks: 30, obtained: 66, grade: 'A' },
      { subject: 'Biology', totalMarks: 75, passMarks: 30, obtained: 72, grade: 'A+' },
      { subject: 'Islamiyat & Ethics', totalMarks: 50, passMarks: 20, obtained: 49, grade: 'A+' },
      { subject: 'Pakistan Studies', totalMarks: 50, passMarks: 20, obtained: 46, grade: 'A' }
    ],
    totalMarks: 625,
    obtainedMarks: 579,
    percentage: 92.64,
    grade: 'A+',
    gpa: 4.0,
    classPosition: '2nd Position',
    attendanceRemarks: 'Regular and Punctual (98%)',
    principalRemarks: 'Superb academic performance and creative presentation.',
    classTeacherRemarks: 'Remarkable aptitude and leadership qualities in group tasks.'
  }
];

const DEFAULT_HOMEWORK = [
  {
    id: 'HW-901',
    class: 'Grade 9',
    section: 'Science A',
    subject: 'Mathematics',
    teacher: 'Sir Tariq Mahmood',
    title: 'Quadratic Equations Exercise 2.3 (Q 1 to 5)',
    description: 'Solve problem set using the quadratic formula and verify roots. Show step-by-step discriminant analysis.',
    assignedDate: '2026-10-06',
    dueDate: '2026-10-09',
    totalSubmissions: 28,
    pendingReviews: 4
  },
  {
    id: 'HW-902',
    class: 'Grade 9',
    section: 'Science A',
    subject: 'Physics',
    teacher: 'Prof. Muhammad Arshad Nadeem',
    title: 'Newton\'s Third Law of Motion - Real World Applications',
    description: 'Write a 2-page illustrated essay illustrating rocket propulsion, recoil of gun, and swimming physics.',
    assignedDate: '2026-10-05',
    dueDate: '2026-10-08',
    totalSubmissions: 30,
    pendingReviews: 0
  }
];

const DEFAULT_NOTICES = [
  {
    id: 'NTC-01',
    title: 'Mid-Term Examination Schedule Announced (Session 2026-27)',
    target: 'All Students & Parents',
    date: '2026-10-05',
    badge: 'Urgent',
    content: 'The Mid-Term Examination 2026 commences on Monday, 20th October. Detailed date sheets and roll number slips are now available on the portal and with class teachers.'
  },
  {
    id: 'NTC-02',
    title: 'Parent-Teacher Meeting (PTM) for Grades 6–10 on Saturday',
    target: 'Parents',
    date: '2026-10-03',
    badge: 'Meeting',
    content: 'All respected parents are invited to attend the bi-monthly PTM between 9:00 AM and 1:00 PM. Please book your preferred slot via the Parent Portal.'
  },
  {
    id: 'NTC-03',
    title: 'Annual Science & Tech Fair 2026 Registrations Open',
    target: 'Students',
    date: '2026-09-28',
    badge: 'Event',
    content: 'Students from Grade 5 through 10 can submit innovative project abstracts to the Science Club coordinator before 15th October.'
  }
];

const DEFAULT_EXPENSES = [
  { id: 'EXP-101', date: '2026-10-02', category: 'Utility Bills', description: 'LESCO Electricity Bill for Main Campus', amount: 94500, paidTo: 'LESCO SKP', status: 'Approved' },
  { id: 'EXP-102', date: '2026-10-03', category: 'Stationery & Printing', description: 'Mid-term answer scripts, exam question paper reams', amount: 42000, paidTo: 'Urdu Bazaar Lahore', status: 'Approved' },
  { id: 'EXP-103', date: '2026-10-05', category: 'Maintenance & Upkeep', description: 'Computer Lab AC servicing and hardware replacement', amount: 28500, paidTo: 'Al-Madina Tech SKP', status: 'Approved' },
  { id: 'EXP-104', date: '2026-10-06', category: 'Sports & Activities', description: 'Football, cricket kits, and badminton nets', amount: 18000, paidTo: 'Sialkot Sports Emporium', status: 'Approved' }
];

const DEFAULT_LIBRARY = [
  { id: 'BK-101', isbn: '978-0199123451', title: 'Oxford English Dictionary for Schools', author: 'Oxford Press', category: 'Reference', rack: 'A-12', copies: 14, available: 12 },
  { id: 'BK-102', isbn: '978-9694200891', title: 'Kulliyat-e-Iqbal (Complete Works)', author: 'Allama Muhammad Iqbal', category: 'Urdu Literature', rack: 'B-04', copies: 8, available: 7 },
  { id: 'BK-103', isbn: '978-0470484753', title: 'Principles of Physics (Halliday & Resnick)', author: 'Jearl Walker', category: 'Science', rack: 'C-08', copies: 10, available: 6 },
  { id: 'BK-104', isbn: '978-0262033848', title: 'Introduction to Algorithms', author: 'Cormen, Leiserson, Rivest', category: 'Computer Science', rack: 'D-02', copies: 5, available: 4 }
];

const DEFAULT_INVENTORY = [
  { id: 'INV-101', name: 'Dell OptiPlex Core i7 Workstations', category: 'Computer Lab', qty: 45, unitCost: 85000, condition: 'Excellent', location: 'Lab 1 & 2' },
  { id: 'INV-102', name: 'Interactive Smart Touch Boards (75")', category: 'Smart Classrooms', qty: 8, unitCost: 280000, condition: 'Working', location: 'High School Wings' },
  { id: 'INV-103', name: 'Student Dual-Desk & Chairs', category: 'Furniture', qty: 320, unitCost: 6500, condition: 'Good', location: 'All Classrooms' },
  { id: 'INV-104', name: 'Physics Optical Benches & Prism Sets', category: 'Science Equipment', qty: 24, unitCost: 4500, condition: 'Good', location: 'Physics Lab' }
];

const DEFAULT_PTM = [
  { id: 'PTM-01', parentName: 'Dr. Tariq Jamil Khan', studentName: 'Muhammad Hamza Khan (Grade 9)', teacherName: 'Sir Tariq Mahmood', timeSlot: '09:30 AM - 09:45 AM', date: '2026-10-11', status: 'Confirmed', notes: 'Discuss Olympiad participation and advanced mathematics tracking' },
  { id: 'PTM-02', parentName: 'Sheikh Waqas Munir', studentName: 'Ayesha Fatima (Grade 9)', teacherName: 'Ma\'am Sadia Khan', timeSlot: '10:00 AM - 10:15 AM', date: '2026-10-11', status: 'Confirmed', notes: 'Feedback on English essay competition and debate society leadership' }
];

const DEFAULT_AUDIT_LOGS = [
  { id: 'LOG-1001', timestamp: '2026-10-07 08:15:20', user: 'Malik Tanveer Ahmad', action: 'Fee Voucher Paid', detail: 'Received PKR 11,200 for STD-1001 (Challan # CH-2026-1001)' },
  { id: 'LOG-1002', timestamp: '2026-10-07 08:30:14', user: 'Sir Tariq Mahmood', action: 'Attendance Marked', detail: 'Marked daily attendance for Grade 9 Science A (31/32 Present)' },
  { id: 'LOG-1003', timestamp: '2026-10-07 09:12:45', user: 'Prof. Muhammad Arshad Nadeem', action: 'Notice Published', detail: 'Published Mid-Term Examination Schedule circular to students and parents' },
  { id: 'LOG-1004', timestamp: '2026-10-07 09:45:00', user: 'Saima Mushtaq', action: 'System Config Checked', detail: 'System health verified. Developer watermark validated: Design by Saima Mushtaq' }
];

class StateManager {
  constructor() {
    this.data = this.loadState();
    this.currentUser = DEFAULT_USERS[0]; // Default Super Admin
    this.currentLanguage = 'en'; // 'en' or 'ur'
    this.listeners = [];
  }

  loadState() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (!parsed.settings) parsed.settings = JSON.parse(JSON.stringify(DEFAULT_SCHOOL_SETTINGS));
        if (!parsed.settings.aiConfig || parsed.settings.aiConfig.provider === 'local-intelligent') {
          parsed.settings.aiConfig = JSON.parse(JSON.stringify(DEFAULT_SCHOOL_SETTINGS.aiConfig));
        } else if (parsed.settings.aiConfig.provider === 'gemini') {
          parsed.settings.aiConfig.modelName = 'gemini-flash-latest';
        }
        return parsed;
      }
    } catch (e) {
      console.warn('Could not read localStorage:', e);
    }
    return this.getDefaultState();
  }

  getDefaultState() {
    return {
      settings: JSON.parse(JSON.stringify(DEFAULT_SCHOOL_SETTINGS)),
      users: JSON.parse(JSON.stringify(DEFAULT_USERS)),
      classes: JSON.parse(JSON.stringify(DEFAULT_CLASSES)),
      subjects: JSON.parse(JSON.stringify(DEFAULT_SUBJECTS)),
      students: JSON.parse(JSON.stringify(DEFAULT_STUDENTS)),
      staff: JSON.parse(JSON.stringify(DEFAULT_STAFF)),
      admissions: JSON.parse(JSON.stringify(DEFAULT_ADMISSIONS)),
      feeVouchers: JSON.parse(JSON.stringify(DEFAULT_FEE_VOUCHERS)),
      exams: JSON.parse(JSON.stringify(DEFAULT_EXAMS)),
      results: JSON.parse(JSON.stringify(DEFAULT_RESULTS)),
      homework: JSON.parse(JSON.stringify(DEFAULT_HOMEWORK)),
      notices: JSON.parse(JSON.stringify(DEFAULT_NOTICES)),
      expenses: JSON.parse(JSON.stringify(DEFAULT_EXPENSES)),
      library: JSON.parse(JSON.stringify(DEFAULT_LIBRARY)),
      inventory: JSON.parse(JSON.stringify(DEFAULT_INVENTORY)),
      ptm: JSON.parse(JSON.stringify(DEFAULT_PTM)),
      auditLogs: JSON.parse(JSON.stringify(DEFAULT_AUDIT_LOGS))
    };
  }

  save() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.data));
    } catch (e) {
      console.error('Error saving state:', e);
    }
    this.notify();
  }

  reset() {
    this.data = this.getDefaultState();
    this.save();
  }

  subscribe(callback) {
    this.listeners.push(callback);
    return () => {
      this.listeners = this.listeners.filter(l => l !== callback);
    };
  }

  notify() {
    for (const cb of this.listeners) {
      try { cb(this.data); } catch (e) { console.error(e); }
    }
  }

  logAction(action, detail) {
    const log = {
      id: 'LOG-' + Date.now(),
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
      user: this.currentUser ? this.currentUser.name : 'System',
      action,
      detail
    };
    this.data.auditLogs.unshift(log);
    if (this.data.auditLogs.length > 200) this.data.auditLogs.pop();
    this.save();
  }

  setCurrentUser(userId) {
    const user = this.data.users.find(u => u.id === userId);
    if (user) {
      this.currentUser = user;
      this.logAction('User Switched Role', `Switched active session to: ${user.name} (${user.role})`);
      this.notify();
    }
  }

  // Export & Import
  exportJSON() {
    return JSON.stringify(this.data, null, 2);
  }

  importJSON(jsonString) {
    try {
      const parsed = JSON.parse(jsonString);
      if (parsed.settings && parsed.students) {
        this.data = parsed;
        this.save();
        return true;
      }
    } catch (e) {
      console.error('Failed to parse database backup:', e);
    }
    return false;
  }
}

// Global State Instance
window.TPS_STATE = new StateManager();
