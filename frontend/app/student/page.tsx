import AddStudent from "./addStudent";
import DeleteStudent from "./deleteStudent";
import UpdateStudent from "./updateStudent";

export const metadata = {
  title: "Student",
};

type Student = {
  id: number;
  name: string;
  age: number;
  gender: string;
  schoolId: number;
};

async function getStudent() {
  const res = await fetch("http://localhost:9000/student", {
    cache: "no-store",
  });
  return res.json();
}

export default async function StudentList() {
  const student: Student[] = await getStudent();
  return (
    <div className="py-10 px-10">
      <div className="py-2 grid justify-items-center">
        <div>
        <p className="font-bold text-4xl mb-8">Menu Student</p>
        </div>
      </div>
     
      <div className="py-2">
        <AddStudent />
      </div>
      <table className="table w-full border-b-2">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Age</th>
            <th>Gender</th>
            {/* <th>School Name</th> */}
            <th></th>
          </tr>
        </thead>
        <tbody>
          {student.map((student, index) => (
            <tr key={student.id}>
              <td>{index + 1}</td>
              <td>{student.name}</td>
              <td>{student.age}</td>
              <td>{student.gender}</td>
              <td className="flex">
                <div className="mr-1">
                  <UpdateStudent {...student} />
                </div>

                <DeleteStudent {...student} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
