import { useStudentStore } from '@/stores'
import type { TStudent } from '@/types/types'
import type { FormInstance } from 'element-plus'
import { ErrorNotification, SuccessNotification } from './useNotification'
import { useProperName } from './useProperName'

// TODO: GET the logged in user info
export const getUser = (id: string | undefined) => {
  if (!id) return

  console.log(useStudentStore().students.map((item) => item.id === id))
  return useStudentStore().getStudents.map((item) => item.id === id)
}

// TODO: GET all registered students from local storage
export const getStudents = async (): Promise<TStudent[]> => {
  return new Promise((resolve, reject) => {
    const all_students = localStorage.getItem('students')
    if (!all_students) return reject('There is no students registered!')

    useStudentStore().setStudents([])
    useStudentStore().setLoading(true)
    setTimeout(() => {
      useStudentStore().setStudents([...JSON.parse(all_students)].reverse())
      useStudentStore().setLoading(false)
    }, 1000)
    return resolve(JSON.parse(all_students))
  })
}

// TODO: GET specific info of a student from local storage
export const getStudentInfo = (id: string) => {
  const all_students = localStorage.getItem('students')
  if (!all_students)
    return ErrorNotification({
      messageContent: 'Students not found!',
    })

  const foundStudent = JSON.parse(all_students).find((item: TStudent) => item.id === id)
  if (!foundStudent)
    return ErrorNotification({
      messageContent: 'Student not found!',
    })

  return foundStudent
}

// TODO: UPDATE student's info
export const editStudent = async (formE1: FormInstance | undefined) => {
  if (!formE1) return

  await formE1.validate((valid, fields) => {
    if (valid) {
      const formData = formE1.$props.model
      if (!formData) return

      const localStorage_students = localStorage.getItem('students')
      if (!localStorage_students)
        return ErrorNotification({
          messageContent: 'There is no students!',
        })

      const updatedStudents = JSON.parse(localStorage_students).map((item: TStudent) =>
        item.id === formData.id
          ? {
              id: item.id,
              firstName: formData.firstName
                .split(' ')
                .map((item: string) => useProperName(item))
                .join(' '),
              middleInitial: formData.middleInitial,
              lastName: formData.lastName
                .split(' ')
                .map((item: string) => useProperName(item))
                .join(' '),
              userName: formData.userName,
              password: formData.password,
              age: formData.age,
              birthDate: formData.birthDate,
              address: formData.address,
              course: formData.course,
            }
          : item,
      )
      useStudentStore().deleteStudent()
      localStorage.setItem('students', JSON.stringify(updatedStudents))
      useStudentStore().setStudents(updatedStudents)
      SuccessNotification({
        messageContent: 'User updated successfully!',
      })
    } else {
      ErrorNotification({
        messageContent: 'Failed to edit user information!',
      })
      console.log('error update!', fields)
    }
  })
}

// TODO: DELETE student's records
export const deleteStudent = (id: string | undefined) => {
  const all_students = localStorage.getItem('students')
  if (!all_students || !id)
    return ErrorNotification({
      messageContent: 'There is no students!',
    })

  // Filters the students without the deleted student and save to local storage
  const updatedStudents = JSON.parse(all_students).filter((item: TStudent) => item.id !== id)
  localStorage.setItem('students', JSON.stringify(updatedStudents))

  if (useStudentStore().getStudent?.id === id) {
    useStudentStore().deleteStudent()
  }

  useStudentStore().setStudents(updatedStudents)

  SuccessNotification({
    messageContent: 'User deleted successfully!',
  })
}

// TODO: Search students
export const SearchStudents = (search: string) => {
  const all_students = localStorage.getItem('students')
  if (!all_students) return

  const search_trim = search.trim().toLowerCase()
  useStudentStore().setStudents([])
  useStudentStore().setSearchLoading(true)

  setTimeout(() => {
    const search_students = JSON.parse(all_students).filter(
      (item: TStudent) =>
        item.firstName.toLowerCase().includes(search_trim) ||
        item.middleInitial.toLowerCase().includes(search_trim) ||
        item.lastName.toLowerCase().includes(search_trim),
    )

    // console.log(fullName);
    useStudentStore().setStudents(search_students)

    useStudentStore().setSearchLoading(false)
  }, 1000)

  return JSON.parse(all_students)
}

// TODO: ADD new student
export const addStudent = async (formE1: FormInstance | undefined) => {
  if (!formE1) return
  await formE1.validate((valid, fields) => {
    if (valid) {
      const formData = {
        id: (Math.random() * 10).toString(),
        firstName: useProperName(formE1.$props.model?.firstName),
        middleInitial: formE1.$props.model?.middleInitial,
        lastName: useProperName(formE1.$props.model?.lastName),
        age: formE1.$props.model?.age,
        birthDate: formE1.$props.model?.birthDate,
        address: formE1.$props.model?.address,
        course: formE1.$props.model?.course,
      }
      if (!formData) return

      // Save to local storage

      // get students in local storage
      const localStorageStudent = localStorage.getItem('students')

      // if there's no students, add the new student
      if (!localStorageStudent) {
        const updatedStudents = JSON.stringify([formData])
        localStorage.setItem('students', updatedStudents)
        return SuccessNotification({
          messageContent: 'Account created successfully',
        })
      }

      // if the student already exists, return error
      const foundUser = JSON.parse(localStorageStudent).find(
        (item: TStudent) =>
          item.firstName.toLowerCase() === formData.firstName.toLowerCase() &&
          item.lastName.toLowerCase() === formData.lastName.toLowerCase(),
      )
      if (foundUser) {
        return ErrorNotification({
          messageContent: 'User already exists!',
        })
      }

      // if new student and does not exists in local storage, add the student
      const updatedStudents = JSON.stringify(
        [...JSON.parse(localStorageStudent), formData].reverse(),
      )
      useStudentStore().setStudents(JSON.parse(updatedStudents))
      localStorage.setItem('students', updatedStudents)
      formE1.resetFields()
      SuccessNotification({
        messageContent: 'Account created successfully',
      })
    } else {
      ErrorNotification({
        messageContent: 'Failed to create account!',
      })
      console.log('error submit!', fields)
    }
  })
}
