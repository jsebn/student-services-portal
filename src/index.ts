// Student Model Interface
interface Student {
  id: number;
  name: string;
  email: string;
  status: "active" | "inactive";
}

// Formatting Function
function formatStudent(student: Student): string {
  return `${student.id} - ${student.name} (${student.status})`;
}

// Sample Student Object
const sampleStudent: Student = {
  id: 2021300243,
  name: "Johann Sebastian Nacua",
  email: "s.nacua.johannsebastian@cmu.edu.ph",
  status: "active",
};

// Display Output
console.log(formatStudent(sampleStudent));

// Generic API Response Type
interface ApiResponse<T> {
  success: boolean;
  data: T;
}

// Single Student Response Example
const singleStudentResponse: ApiResponse<Student> = {
  success: true,
  data: sampleStudent,
};

// Array of Students Response Example
const studentListResponse: ApiResponse<Student[]> = {
  success: true,
  data: [
    sampleStudent,
    {
      id: 2022300423,
      name: "Justine Mae Nacua",
      email: "s.justinemae@cmu.edu.ph",
      status: "inactive",
    },
  ],
};

console.log("Single Student Response:", singleStudentResponse);
console.log("Student List Response:", studentListResponse);

// Runtime Type Guard for Student
function isStudent(data: unknown): data is Student {
  if (typeof data !== "object" || data === null) {
    return false;
  }

  const candidate = data as Record<string, unknown>;

  return (
    typeof candidate.id === "number" &&
    typeof candidate.name === "string" &&
    typeof candidate.email === "string" &&
    (candidate.status === "active" || candidate.status === "inactive")
  );
}

// Test Case 1: Valid Student Object
const validStudent: unknown = {
  id: 103,
  name: "Carlos Gomez",
  email: "cgomez@university.edu",
  status: "active",
};

// Test Case 2: Invalid Object (Incorrect id - string instead of number)
const invalidStudentBadId: unknown = {
  id: "INVALID_104",
  name: "Ana Reyes",
  email: "areyes@university.edu",
  status: "active",
};

// Test Case 3: Invalid Object (Missing student name)
const invalidStudentMissingName: unknown = {
  id: 105,
  email: "unknown@university.edu",
  status: "inactive",
};

// Part 18: Student Status Formatter Implementation
type StudentStatus = "active" | "inactive";

function getStudentStatusLabel(status: StudentStatus | unknown): string {
  if (status === "active") {
    return "Active Student";
  }
  if (status === "inactive") {
    return "Inactive Student";
  }
  return "Unknown Status";
}

// Part 19: Test the Feature
console.log("\n--- Testing Student Status Formatter ---");
console.log("active ->", getStudentStatusLabel("active")); // Output: Active Student
console.log("inactive ->", getStudentStatusLabel("inactive")); // Output: Inactive Student
console.log("invalid ->", getStudentStatusLabel("suspended")); // Output: Unknown Status

console.log("\n--- Runtime Validation Tests ---");
console.log("Valid Student:", isStudent(validStudent)); // Expected: true
console.log("Invalid ID:", isStudent(invalidStudentBadId)); // Expected: false
console.log("Missing Name:", isStudent(invalidStudentMissingName)); // Expected: false
