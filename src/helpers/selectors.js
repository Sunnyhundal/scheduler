// export function getAppointmentsForDay(state, day) {
//   const found = state.days.find(d => day === d.name);

//   if (state.days.length === 0 || found === undefined) return [];

//   return found.appointments.map(id => state.appointments[id]);
// }

// export function getInterviewersForDay(state, day) {
//   const found = state.days.find(d => day === d.name);

//   if (state.days.length === 0 || found === undefined) return [];

//   return found.interviewers.map(id => state.interviewers[id]);
// }

// export function getInterview(state, interview) {
//   return (
//     interview && {
//       ...interview,
//       interviewer: state.interviewers[interview.interviewer]
//     }
//   );
// }

export function getAppointmentsForDay(state, day) {
  let dayAppointmentsId = [];
  for (const dayObj of state.days) {
    if (dayObj.name === day) dayAppointmentsId = [...dayObj.appointments];
  }

  let appointmentsArray = [];
  for (const appointmentId of dayAppointmentsId) {
    appointmentsArray.push(state.appointments[appointmentId]);
  }

  return appointmentsArray;
}

export function getInterview(state, interview) {
  if (!interview) return null;
  const interviewerId = interview.interviewer;
  const result = {
    student: interview.student,
    interviewer: {
      ...state.interviewers[interviewerId],
    },
  };
  return result;
}

export function getInterviewersForDay(state, day) {
  let interviewersIdArray = [];
  for (const dayObj of state.days) {
    if (dayObj.name === day) interviewersIdArray = [...dayObj.interviewers];
  }

  let interviewersArray = [];
  for (const interviewerId of interviewersIdArray) {
    interviewersArray.push(state.interviewers[interviewerId]);
  }

  return interviewersArray;
}
