import AddSchool from "./addSchool";
import DeleteShool from "./deleteSchool";
import UpdateSchool from "./updateSchool";

export const metadata = {
  title: "School",
};

type School = {
  id: number;
  schoolName: string;
  location: string;
  principalName: string;
};

async function getSchool() {
  const res = await fetch("http://localhost:9000/school", {
    cache: "no-store",
  });
  return res.json();
}

export default async function ProductList() {
  const school: School[] = await getSchool();
  return (
    <div className="py-10 px-10">
      <div className="py-2 grid justify-items-center">
        <div>
        <p className="font-bold text-4xl mb-8">Menu School</p>
        </div>
      </div>
     
      <div className="py-2">
        <AddSchool />
      </div>
      <table className="table w-full">
        <thead className="bg-blue">
          <tr>
            <th>#</th>
            <th>School Name</th>
            <th>Location</th>
            <th>Principal Name</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {school.map((school, index) => (
            <tr key={school.id} className="hover">
              <td>{index + 1}</td>
              <td>{school.schoolName}</td>
              <td>{school.location}</td>
              <td>{school.principalName}</td>
              <td className="flex">
                <div className="mr-1">
                  <UpdateSchool {...school} />
                </div>

                <DeleteShool {...school} />
              </td>
            </tr>
          ))}
          <div className="border-b-1" />
        </tbody>
      </table>
    </div>
  );
}
