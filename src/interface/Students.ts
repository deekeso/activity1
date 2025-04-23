/**
 *
 * Global interface of Student
 * Represents the structure of student data
 *
 */

export interface Student {
  id?: Number;
  firstName: string;
  middleName: string;
  lastName: string;
  birthdate: string;
  address: string;
  course: string;
  age: Number;
}
