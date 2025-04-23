export const getUser = (): string | boolean => {
  if (typeof window !== 'undefined') {
    const user = localStorage.getItem('user')
    if (user) {
      return JSON.parse(user)
    } else {
      return false
    }
  }
  return false
}

export const logout = () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('user')
  }
}

// export const deleteStudentInfo = (studentId: string) => {
//   if (typeof window !== 'undefined') {
//     const studentInfo = JSON.parse(localStorage.getItem('students') || '[]')

//     const updatedStudentInfo = studentInfo.filter((student: any) => student.id !== studentId)

//     localStorage.setItem('students', JSON.stringify(updatedStudentInfo))
//   }
// }
