import { createSlice, nanoid } from "@reduxjs/toolkit";

const coursesSlice = createSlice({
  name: "courses",
  initialState: [
    {
      courseName: "GDPI WAT Cracker 2023",
      courseImageLink:
        "https://res.cloudinary.com/codemafia/image/upload/v1673077203/FontFiles/ptop7rdywo2k19xemnby.png",
      courseVariants: [
        {
          variantName: "Complete",
          variantDescription:
            "Acing GDPI-WAT is crucial for your MBA admissions and BTRIBE is here with India's finest mentors to help you come out with flying colors! We're deeply invested in your success as ours is dependent on it. Add something unique for Complete Course",
          variantMentorProfile:
            "Old IIM alumni, 99.5+%ilers! Currently working at aspirational companies(including MBB) with rich experience across domains",
          variantIncludes: [
            "10 Mock PIs with old IIM Alumni",
            "Weekly preparation sessions from 99.5+ %ilers in CAT/ XAT/ IIFT and old IIM alumni",
            "Guided interview answer preparation with old IIM mentors",
            "Personalized prep with industry experts",
            "Weekly Mock GDs / WAT / Domain-wise sessions",
            "GK Compendium updated with the most relevant and crisp articles",
            "Regular sessions on Why MBA/ Justifying Gap Years & Low Academics/ Economics/ Marketing/ Finance/ Consulting/ ProdMan/ Ops/ Careers after MBA/ Personality Interviews and many more...",
            "College-specific sessions & form filling assistance",
            "Dedicated group for members with mentors Recordings will be provided for all sessions",
          ],
          sessions: [],
          students: [],
          mentors: [],
          assignmentSubmissionLink: "", //Google form link
          variantCost: 6999,
          numOneToOneSlots: 10,
        },
        {
          variantName: "Crash",
          variantDescription:
            "Acing GDPI-WAT is crucial for your MBA admissions and BTRIBE is here with India's finest mentors to help you come out with flying colors! We're deeply invested in your success as ours is dependent on it. Add something unique for Crash Course",
          variantMentorProfile:
            "Old IIM alumni, 99.5+%ilers! Currently working at aspirational companies(including MBB) with rich experience across domains ",
          variantIncludes: [
            "5 Mock PIs with old IIM Alumni",
            "Weekly preparation sessions from 99.5+ %ilers in CAT/ XAT/ IIFT and old IIM alumni",
            "Guided interview answer preparation with old IIM mentors",
            "Personalized prep with industry experts",
            "Weekly Mock GDs / WAT / Domain-wise sessions",
            "GK Compendium updated with the most relevant and crisp articles",
            "Regular sessions on Why MBA/ Justifying Gap Years & Low Academics/ Economics/ Marketing/ Finance/ Consulting/ ProdMan/ Ops/ Careers after MBA/ Personality Interviews and many more...",
            "College-specific sessions & form filling assistance",
            "Dedicated group for members with mentors Recordings will be provided for all sessions",
          ],
          students: [],
          mentors: [],
          sessions: [],
          assignmentSubmissionLink: "",
          variantCost: 4999,
          numOneToOneSlots: 5,
        },
      ],
      courseId: "Zsbizbd-1yDKPghnFf0r7",
    },
  ],
  reducers: {
    addCourse(state, action) {
      state.push({ ...action.payload, courseId: nanoid() });
    },
    removeCourse(state, action) {
      state = state.filter((course) => {
        return course.courseId !== action.payload;
      });
    },
    updateCourse(state, action) {
      state = state.map((course) => {
        if (course.courseId === action.payload.courseId) {
          return action.payload;
        }
        return course;
      });
    },
  },
});

export const { addCourse, removeCourse, updateCourse } = coursesSlice.actions;
export const coursesReducer = coursesSlice.reducer;
